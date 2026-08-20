import mongoose, { Schema, Document } from "mongoose";
import type { Product, ProductPresentation } from "@factory/shared/types/products";

export interface IProductDocument extends Omit<Product, "id">, Document {
  id: string;
  titulo: string;
  categoria: string | null;
  categorias: string[];
  descripcion: string;
  imagen: string | null;
  imagenes: string[];
  variedades: string[];
  presentaciones: ProductPresentation[];
  disponible: boolean;
  orden: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProductPresentationSchema = new Schema<ProductPresentation>(
  {
    presentacion: { type: String, required: true, trim: true },
    precio: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

const ProductSchema = new Schema<IProductDocument>(
  {
    id: { type: String, required: true, unique: true, index: true },
    titulo: { type: String, required: true, trim: true },
    categoria: { type: String, default: null, trim: true },
    categorias: { type: [String], default: [] },
    descripcion: { type: String, default: "", trim: true },
    imagen: { type: String, default: null },
    imagenes: { type: [String], default: [] },
    variedades: { type: [String], default: [] },
    presentaciones: { type: [ProductPresentationSchema], default: [] },
    disponible: { type: Boolean, default: true },
    orden: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    bufferCommands: false,
  }
);

const ProductModel =
  mongoose.models.Product || mongoose.model<IProductDocument>("Product", ProductSchema);

export default ProductModel;
