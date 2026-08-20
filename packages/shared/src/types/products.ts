export interface ProductPresentation {
  presentacion: string;
  precio: number;
}

export interface Product {
  id: string;
  titulo: string;
  categoria?: string | null;
  categorias?: string[];
  descripcion: string;
  imagen: string | null;
  imagenes?: string[];
  variedades?: string[];
  presentaciones: ProductPresentation[];
  disponible?: boolean;
  orden?: number;
  precio?: number;
  presentacion?: string;
}
