import { Router, Request, Response } from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import type { Product, ProductPresentation } from "@factory/shared/types/products";
import ProductModel from "../models/productModel";

const router = Router();

// Configuración de Cloudinary (Leída estrictamente desde variables de entorno)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer memory storage para subida directa a Cloudinary
const upload = multer({ storage: multer.memoryStorage() });

// Middleware para verificar clave/PIN de Admin (Leída estrictamente desde process.env.ADMIN_PIN)
const checkAdminAuth = (req: Request, res: Response, next: () => void) => {
  const adminPinHeader = req.headers["x-admin-pin"];
  const expectedPin = process.env.ADMIN_PIN;

  if (expectedPin && adminPinHeader === expectedPin) {
    next();
  } else {
    res.status(401).json({ success: false, message: "PIN de administrador no válido." });
  }
};

/**
 * Extrae el public_id de Cloudinary a partir de una URL completa
 */
const getPublicIdFromUrl = (url: string): string | null => {
  if (!url || typeof url !== "string" || !url.includes("cloudinary.com")) return null;
  try {
    const parts = url.split("/upload/");
    if (parts.length < 2) return null;
    let path = parts[1];
    path = path.replace(/^v\d+\//, "");
    const lastDotIndex = path.lastIndexOf(".");
    const publicId = lastDotIndex !== -1 ? path.substring(0, lastDotIndex) : path;
    return publicId || null;
  } catch (err) {
    return null;
  }
};

/**
 * Elimina un recurso físicamente de Cloudinary por su URL
 */
const deleteCloudinaryImageByUrl = async (url: string) => {
  const publicId = getPublicIdFromUrl(url);
  if (publicId) {
    try {
      const result = await cloudinary.uploader.destroy(publicId);
      console.log(`🗑️ Recurso eliminado: "${publicId}":`, result);
      return result;
    } catch (err) {
      console.error(`❌ Error al eliminar recurso ("${publicId}"):`, err);
    }
  }
  return null;
};

const mapDocumentToProduct = (p: any): Product => {
  const presentaciones: ProductPresentation[] =
    Array.isArray(p.presentaciones) && p.presentaciones.length > 0
      ? p.presentaciones.map((pr: any) => ({
          presentacion: String(pr.presentacion || "Unidad"),
          precio: Number(pr.precio) || 0,
        }))
      : [{ presentacion: p.presentacion || "Unidad", precio: Number(p.precio) || 0 }];

  const rawImagenes = Array.isArray(p.imagenes) ? p.imagenes.filter(Boolean) : [];
  const imagenes = rawImagenes.length > 0 ? rawImagenes.slice(0, 3) : (p.imagen ? [p.imagen] : []);
  const primaryImage = imagenes[0] || p.imagen || null;

  const rawCategorias = Array.isArray(p.categorias) ? p.categorias.filter(Boolean) : (p.categoria ? [p.categoria] : []);
  const categorias = rawCategorias.length > 0 ? rawCategorias : [];
  const primaryCategory = categorias[0] || p.categoria || null;

  return {
    id: p.id,
    titulo: p.titulo,
    categoria: primaryCategory,
    categorias,
    descripcion: p.descripcion || "",
    imagen: primaryImage,
    imagenes,
    variedades: Array.isArray(p.variedades) ? p.variedades : [],
    presentaciones,
    disponible: p.disponible !== false,
    orden: p.orden ?? 0,
    precio: presentaciones[0]?.precio ?? 0,
    presentacion: presentaciones[0]?.presentacion ?? "Unidad",
  };
};

// POST /api/products/verify-pin (Admin - Valida el PIN ingresado contra la variable de entorno)
router.post("/verify-pin", checkAdminAuth, (_req: Request, res: Response) => {
  res.json({ success: true, message: "PIN verificado correctamente." });
});

// GET /api/products (Público - Consulta de catálogo)
router.get("/", async (_req: Request, res: Response) => {
  try {
    const products = await ProductModel.find().sort({ orden: 1, createdAt: -1 }).lean();
    const formattedProducts: Product[] = products.map(mapDocumentToProduct);

    res.json({ success: true, data: formattedProducts });
  } catch (error: any) {
    console.error("❌ Error al obtener productos:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener la lista de precios de la base de datos.",
      error: error?.message,
    });
  }
});

// PUT /api/products (Admin - Guardado completo de catálogo)
router.put("/", checkAdminAuth, async (req: Request, res: Response) => {
  try {
    const newProducts: Product[] = req.body;
    if (!Array.isArray(newProducts)) {
      return res
        .status(400)
        .json({ success: false, message: "Formato de datos no válido. Se esperaba una lista de productos." });
    }

    // 1. Recopilar todas las imágenes existentes previamente
    const previousProducts = await ProductModel.find().lean();
    const previousImageUrls = new Set<string>();
    previousProducts.forEach((p: any) => {
      if (p.imagen) previousImageUrls.add(p.imagen);
      if (Array.isArray(p.imagenes)) {
        p.imagenes.forEach((img: string) => img && previousImageUrls.add(img));
      }
    });

    const currentIds = newProducts.map((p) => p.id).filter(Boolean);

    // 2. Recopilar todas las imágenes presentes en la nueva lista que se va a guardar
    const currentNewImageUrls = new Set<string>();
    newProducts.forEach((p) => {
      if (p.imagen) currentNewImageUrls.add(p.imagen);
      if (Array.isArray(p.imagenes)) {
        p.imagenes.forEach((img: string) => img && currentNewImageUrls.add(img));
      }
    });

    // 3. Detectar imágenes huérfanas y borrarlas
    const orphanUrls = Array.from(previousImageUrls).filter((url) => !currentNewImageUrls.has(url));
    for (const orphanUrl of orphanUrls) {
      await deleteCloudinaryImageByUrl(orphanUrl);
    }

    // 4. Eliminar productos retirados de la lista
    if (currentIds.length > 0) {
      await ProductModel.deleteMany({ id: { $nin: currentIds } });
    } else {
      await ProductModel.deleteMany({});
    }

    // 5. Upsert de cada producto
    for (const [idx, prod] of newProducts.entries()) {
      const presentaciones: ProductPresentation[] =
        Array.isArray(prod.presentaciones) && prod.presentaciones.length > 0
          ? prod.presentaciones
          : [{ presentacion: prod.presentacion || "Unidad", precio: Number(prod.precio) || 0 }];

      const rawImagenes = Array.isArray(prod.imagenes) ? prod.imagenes.filter(Boolean) : (prod.imagen ? [prod.imagen] : []);
      const imagenes = rawImagenes.slice(0, 3);
      const primaryImage = imagenes[0] || null;

      const rawCategorias = Array.isArray(prod.categorias) ? prod.categorias.filter(Boolean) : (prod.categoria ? [prod.categoria] : []);
      const categorias = rawCategorias;
      const primaryCategory = categorias[0] || prod.categoria || null;

      await ProductModel.findOneAndUpdate(
        { id: prod.id },
        {
          id: prod.id,
          titulo: prod.titulo,
          categoria: primaryCategory,
          categorias,
          descripcion: prod.descripcion || "",
          imagen: primaryImage,
          imagenes,
          variedades: Array.isArray(prod.variedades) ? prod.variedades : [],
          presentaciones,
          disponible: prod.disponible !== false,
          orden: prod.orden ?? idx + 1,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    }

    // 6. Obtener catálogo actualizado
    const updatedProducts = await ProductModel.find().sort({ orden: 1, createdAt: -1 }).lean();
    const formattedProducts: Product[] = updatedProducts.map(mapDocumentToProduct);

    res.json({
      success: true,
      data: formattedProducts,
      message: "¡Listado de precios guardado exitosamente!",
    });
  } catch (error: any) {
    console.error("❌ Error al guardar productos:", error);
    res.status(500).json({
      success: false,
      message: "Error al guardar el listado de precios. Por favor intente de nuevo.",
      error: error?.message,
    });
  }
});

// DELETE /api/products/image (Admin - Eliminar imagen individual)
router.post("/delete-image", checkAdminAuth, async (req: Request, res: Response) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ success: false, message: "URL de la imagen no proporcionada." });
    }

    await deleteCloudinaryImageByUrl(url);
    res.json({ success: true, message: "Imagen eliminada correctamente." });
  } catch (error: any) {
    console.error("❌ Error eliminando imagen:", error);
    res.status(500).json({ success: false, message: "Error al eliminar la imagen.", error: error?.message });
  }
});

// DELETE /api/products/:id (Admin - Eliminar producto individual y sus fotos)
router.delete("/:id", checkAdminAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const prod = await ProductModel.findOne({ id });

    if (!prod) {
      return res.status(404).json({ success: false, message: "Producto no encontrado." });
    }

    // Recopilar y eliminar todas las imágenes del producto
    const imagesToDelete = new Set<string>();
    if (prod.imagen) imagesToDelete.add(prod.imagen);
    if (Array.isArray(prod.imagenes)) {
      prod.imagenes.forEach((img: string) => img && imagesToDelete.add(img));
    }

    for (const imgUrl of Array.from(imagesToDelete)) {
      await deleteCloudinaryImageByUrl(imgUrl);
    }

    await ProductModel.findOneAndDelete({ id });

    res.json({ success: true, message: "Producto y sus fotos eliminados correctamente." });
  } catch (error: any) {
    console.error("❌ Error eliminando producto:", error);
    res.status(500).json({ success: false, message: "Error al eliminar el producto.", error: error?.message });
  }
});

// POST /api/products/upload (Admin - Subida estructurada de imágenes)
router.post("/upload", checkAdminAuth, upload.single("image"), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No se proporcionó ningún archivo de imagen." });
    }

    const rawCategory = req.body.categoria || "general";
    const sanitizeFolderName = (str: string) =>
      str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");

    const folderCategoryName = sanitizeFolderName(rawCategory) || "general";
    const targetFolder = `simonpastas/productos/${folderCategoryName}`;

    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const dataURI = "data:" + req.file.mimetype + ";base64," + b64;

    const uploadResponse = await cloudinary.uploader.upload(dataURI, {
      folder: targetFolder,
      resource_type: "image",
      format: "webp",
      transformation: [{ quality: "auto", fetch_format: "webp" }],
    });

    res.json({
      success: true,
      url: uploadResponse.secure_url,
      public_id: uploadResponse.public_id,
    });
  } catch (error: any) {
    console.error("Error subiendo imagen:", error);
    res.status(500).json({ success: false, message: "Error al subir la imagen. Por favor intente nuevamente.", error: error?.message });
  }
});

export default router;
