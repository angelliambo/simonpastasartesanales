import { existsSync, unlinkSync, statSync } from "fs";
import { join } from "path";
import sharp from "sharp";

const PUBLIC_DIR = join(__dirname, "../public");
const PNG_PATH = join(PUBLIC_DIR, "og-image.png");
const JPG_PATH = join(PUBLIC_DIR, "og-image.jpg");

const TARGET_WIDTH = 1200;
const TARGET_HEIGHT = 630;
const MAX_SIZE_KB = 250;

async function optimizeImage() {
  console.log("🚀 [OG-OPTIMIZE] Iniciando optimización de la imagen OG...");

  let sourcePath = "";
  let shouldDeletePng = false;

  if (existsSync(PNG_PATH)) {
    console.log("📌 [OG-OPTIMIZE] Se detectó una nueva imagen PNG en public/og-image.png");
    sourcePath = PNG_PATH;
    shouldDeletePng = true;
  } else if (existsSync(JPG_PATH)) {
    const stats = statSync(JPG_PATH);
    const sizeKB = stats.size / 1024;
    console.log(`📌 [OG-OPTIMIZE] og-image.jpg ya existe con un peso de ${sizeKB.toFixed(2)} KB.`);
    if (sizeKB > MAX_SIZE_KB) {
      console.log(`⚠️ [OG-OPTIMIZE] El archivo supera los ${MAX_SIZE_KB} KB. Se procederá a comprimirlo.`);
      sourcePath = JPG_PATH;
    } else {
      console.log("✅ [OG-OPTIMIZE] La imagen ya está optimizada y pesa menos del límite.");
      return;
    }
  } else {
    console.error("❌ [OG-OPTIMIZE] Error: No se encontró ni og-image.png ni og-image.jpg en public/");
    process.exit(1);
  }

  try {
    const image = sharp(sourcePath);
    const metadata = await image.metadata();

    console.log(`📐 [OG-OPTIMIZE] Dimensiones originales: ${metadata.width}x${metadata.height} (${metadata.format})`);

    // Procesar la imagen con sharp
    let pipeline = image
      .resize({
        width: TARGET_WIDTH,
        height: TARGET_HEIGHT,
        fit: "cover",
        position: "center",
      })
      .jpeg({
        quality: 80,
        progressive: true,
        mozjpeg: true,
      });

    // Guardar temporalmente para verificar peso
    let buffer = await pipeline.toBuffer();
    let sizeKB = buffer.length / 1024;

    // Si aún supera el límite, ajustar calidad
    let quality = 80;
    while (sizeKB > MAX_SIZE_KB && quality > 50) {
      quality -= 5;
      console.log(`📉 [OG-OPTIMIZE] El tamaño de ${sizeKB.toFixed(2)} KB sigue siendo alto. Reduciendo calidad a ${quality}...`);
      buffer = await sharp(sourcePath)
        .resize({ width: TARGET_WIDTH, height: TARGET_HEIGHT, fit: "cover" })
        .jpeg({ quality, progressive: true, mozjpeg: true })
        .toBuffer();
      sizeKB = buffer.length / 1024;
    }

    // Escribir el archivo final
    await sharp(buffer).toFile(JPG_PATH);
    console.log(`🎉 [OG-OPTIMIZE] Imagen optimizada guardada en: public/og-image.jpg`);
    console.log(`   - Dimensiones finales: ${TARGET_WIDTH}x${TARGET_HEIGHT}`);
    console.log(`   - Peso final: ${sizeKB.toFixed(2)} KB (Calidad: ${quality}%)`);

    // Eliminar el PNG original si es necesario
    if (shouldDeletePng && existsSync(PNG_PATH)) {
      unlinkSync(PNG_PATH);
      console.log("🗑️ [OG-OPTIMIZE] Archivo og-image.png original eliminado con éxito.");
    }
  } catch (error) {
    console.error("❌ [OG-OPTIMIZE] Error procesando la imagen:", error);
    process.exit(1);
  }
}

optimizeImage();
