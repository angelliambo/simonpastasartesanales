import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import ProductModel from "../models/productModel";

const INITIAL_GENERIC_PRODUCT = {
  id: "prod-generico-001",
  titulo: "Artículo de Prueba",
  categoria: "General",
  categorias: ["General"],
  descripcion: "Descripción del artículo de prueba",
  imagen: null,
  imagenes: [],
  variedades: ["Espinaca y Ricota", "Pollo y Verdura", "Coliflor"],
  presentaciones: [
    {
      presentacion: "Unidad de prueba",
      precio: 0,
    },
    {
      presentacion: "Cajas x 10 KG",
      precio: 1500,
    },
  ],
  disponible: true,
  orden: 1,
};

async function seedDatabase(mongoUri: string, envName: string) {
  if (!mongoUri) {
    console.error(`⚠️ [SEED - ${envName}] Omitido: No se definió la variable BBD.`);
    return;
  }
  try {
    console.log(`📡 [SEED - ${envName}] Conectando a MongoDB...`);
    await mongoose.connect(mongoUri);

    console.log(`🧹 [SEED - ${envName}] Borrando todos los productos existentes...`);
    await ProductModel.deleteMany({});

    console.log(`🌱 [SEED - ${envName}] Insertando 1 único producto de prueba esquelético...`);
    await ProductModel.create(INITIAL_GENERIC_PRODUCT);

    console.log(`✅ [SEED - ${envName}] ¡Base de datos reiniciada con éxito (1 producto creado)!`);
    await mongoose.disconnect();
  } catch (err: any) {
    console.error(`💥 [SEED - ${envName}] Error seeding MongoDB:`, err?.message || err);
  }
}

async function runSeed() {
  const devEnvFile = path.resolve(__dirname, "../.env.development");
  const prodEnvFile = path.resolve(__dirname, "../.env.production");

  dotenv.config({ path: devEnvFile });
  const devUri = process.env.BBD;

  dotenv.config({ path: prodEnvFile, override: true });
  const prodUri = process.env.BBD;

  console.log("🚀 Iniciando Seeding de Limpieza y Producto de Prueba Esquelético en MongoDB...");

  if (devUri) {
    await seedDatabase(devUri, "DESARROLLO (/test)");
  }
  if (prodUri) {
    await seedDatabase(prodUri, "PRODUCCIÓN (/prod)");
  }

  console.log("🎉 Seeding completado exitosamente en ambas bases de datos.");
  process.exit(0);
}

runSeed();
