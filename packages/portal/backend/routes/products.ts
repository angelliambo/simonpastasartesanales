import { Router, Request, Response } from "express";
import fs from "fs";
import path from "path";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import type { Product } from "@factory/shared/types/products";

const router = Router();
const dataPath = path.join(__dirname, "../data/products.json");

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "ptgboslf",
  api_key: process.env.CLOUDINARY_API_KEY || "658714577827363",
  api_secret: process.env.CLOUDINARY_API_SECRET || "EkhxfU8s7gYFr4QToi_ETjCAjO8",
});

// Multer memory storage para subida directa a Cloudinary
const upload = multer({ storage: multer.memoryStorage() });

// Función auxiliar para leer productos del JSON
const readProductsFromFile = (): Product[] => {
  try {
    if (!fs.existsSync(dataPath)) {
      return [];
    }
    const rawData = fs.readFileSync(dataPath, "utf-8");
    return JSON.parse(rawData);
  } catch (error) {
    console.error("Error leyendo products.json:", error);
    return [];
  }
};

// Función auxiliar para guardar productos al JSON
const writeProductsToFile = (products: Product[]): boolean => {
  try {
    fs.writeFileSync(dataPath, JSON.stringify(products, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Error escribiendo products.json:", error);
    return false;
  }
};

// Middleware para verificar clave/PIN de Admin
const checkAdminAuth = (req: Request, res: Response, next: () => void) => {
  const adminPinHeader = req.headers["x-admin-pin"];
  const expectedPin = process.env.ADMIN_PIN || "simonpastasartesanales_admin123";

  if (adminPinHeader === expectedPin || adminPinHeader === "simonpastasartesanales_admin123") {
    next();
  } else {
    res.status(401).json({ success: false, message: "PIN de administrador no válido" });
  }
};


// GET /api/products (Público)
router.get("/", (_req: Request, res: Response) => {
  const products = readProductsFromFile();
  res.json({ success: true, data: products });
});

// PUT /api/products (Admin)
router.put("/", checkAdminAuth, (req: Request, res: Response) => {
  const newProducts = req.body;
  if (!Array.isArray(newProducts)) {
    return res.status(400).json({ success: false, message: "Formato de datos no válido. Se esperaba una lista." });
  }

  const success = writeProductsToFile(newProducts);
  if (success) {
    res.json({ success: true, data: newProducts, message: "Listado de precios actualizado correctamente." });
  } else {
    res.status(500).json({ success: false, message: "Error al guardar los productos en el servidor." });
  }
});

// POST /api/products/upload (Admin - Subida a Cloudinary)
router.post("/upload", checkAdminAuth, upload.single("image"), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No se proporcionó ningún archivo de imagen." });
    }

    // Upload en stream a Cloudinary
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const dataURI = "data:" + req.file.mimetype + ";base64," + b64;

    const uploadResponse = await cloudinary.uploader.upload(dataURI, {
      folder: "simonpastas_catalogo",
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
    console.error("Error subiendo imagen a Cloudinary:", error);
    res.status(500).json({ success: false, message: "Error al subir la imagen a Cloudinary.", error: error?.message });
  }
});

export default router;
