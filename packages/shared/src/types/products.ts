export interface Product {
  id: string;
  titulo: string;
  descripcion: string;
  presentacion: string;
  precio: number;
  imagen: string;
  disponible?: boolean;
  orden?: number;
}
