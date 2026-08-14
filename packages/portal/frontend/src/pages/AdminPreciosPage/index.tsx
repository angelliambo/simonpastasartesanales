import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import type { Product } from "@factory/shared/types/products";
import { ZnIcon } from "@design-sys/atoms/ZnIcon";
import {
  LockOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
  SaveOutlined,
  CloseOutlined,
  LoadingOutlined,
} from "@ant-design/icons";

const AdminContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.md};
  min-height: 80vh;

  @media (min-width: 768px) {
    padding: ${props => props.theme.spacing.lg};
  }
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.lg};
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.md};
`;

const Title = styled.h1`
  font-size: 1.5rem;
  color: ${props => props.theme.colors.textPrimary};
  margin: 0;

  @media (min-width: 768px) {
    font-size: 1.8rem;
  }
`;

const PinModal = styled.div`
  max-width: 420px;
  margin: 40px auto;
  padding: ${props => props.theme.spacing.xl};
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);

  @media (max-width: 480px) {
    padding: ${props => props.theme.spacing.lg};
    margin: 20px 10px;
  }
`;

const PinInput = styled.input`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  margin: ${props => props.theme.spacing.md} 0;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  font-size: 1.1rem;
  text-align: center;
  outline: none;

  &:focus {
    border-color: ${props => props.theme.colors.primary};
  }
`;

const Button = styled.button<{ $variant?: "primary" | "secondary" | "danger" }>`
  padding: 10px 16px;
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  font-size: ${props => props.theme.typography.fontSize.sm};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: ${props =>
    props.$variant === "danger"
      ? props.theme.colors.error[500]
      : props.$variant === "secondary"
      ? props.theme.colors.neutral[600]
      : props.theme.colors.primary[500]};
  color: ${props => props.theme.colors.text.inverse || "#ffffff"};
  box-shadow: ${props => props.theme.shadows.light};
  transition: all ${props => props.theme.transitions.normal};

  &:hover {
    background: ${props =>
      props.$variant === "danger"
        ? props.theme.colors.error[600]
        : props.$variant === "secondary"
        ? props.theme.colors.neutral[700]
        : props.theme.colors.primary[600]};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;


const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  background: ${props => props.theme.colors.surface};
  border-radius: 12px;
  border: 1px solid ${props => props.theme.colors.border};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
`;

const Th = styled.th`
  text-align: left;
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.background.secondary};
  border-bottom: 1px solid ${props => props.theme.colors.border.normal};
  color: ${props => props.theme.colors.text.primary};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
`;

const Td = styled.td`
  padding: ${props => props.theme.spacing.md};
  border-bottom: 1px solid ${props => props.theme.colors.border.normal};
  color: ${props => props.theme.colors.text.primary};
  vertical-align: middle;
  font-size: ${props => props.theme.typography.fontSize.sm};
`;

const ThumbImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: ${props => props.theme.borderRadius.md};
  border: 1px solid ${props => props.theme.colors.border.normal};
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.background.card};
  padding: ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.lg};
  border: 1px solid ${props => props.theme.colors.border.normal};
  margin-bottom: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.medium};

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const FormGroup = styled.div<{ $fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 6px;
  grid-column: ${props => (props.$fullWidth ? "1 / -1" : "auto")};
`;

const Label = styled.label`
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.text.primary};
`;

const Input = styled.input`
  padding: 10px 12px;
  border: 1px solid ${props => props.theme.colors.border.normal};
  background-color: ${props => props.theme.colors.background.surface};
  color: ${props => props.theme.colors.text.primary};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.typography.fontSize.sm};
  outline: none;
  transition: border-color ${props => props.theme.transitions.fast};

  &:focus {
    border-color: ${props => props.theme.colors.primary[500]};
  }
`;

const TextArea = styled.textarea`
  padding: 10px 12px;
  border: 1px solid ${props => props.theme.colors.border.normal};
  background-color: ${props => props.theme.colors.background.surface};
  color: ${props => props.theme.colors.text.primary};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.typography.fontSize.sm};
  min-height: 80px;
  outline: none;

  &:focus {
    border-color: ${props => props.theme.colors.primary[500]};
  }
`;

const StatusMessage = styled.div<{ $error?: boolean }>`
  padding: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  background-color: ${props => (props.$error ? props.theme.colors.error[50] : props.theme.colors.success[50])};
  color: ${props => (props.$error ? props.theme.colors.error[700] : props.theme.colors.success[700])};
  border: 1px solid ${props => (props.$error ? props.theme.colors.error[500] : props.theme.colors.success[500])};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
`;


export const AdminPreciosPage: React.FC = () => {
  const [pin, setPin] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [statusMsg, setStatusMsg] = useState<{ text: string; error?: boolean } | null>(null);
  const [uploading, setUploading] = useState(false);

  const fetchProducts = () => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setProducts(data.data);
      });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === "simonpastasartesanales_admin123") {
      setIsAuthenticated(true);
      fetchProducts();
    } else {
      setStatusMsg({ text: "Clave/PIN incorrecto. Intenta de nuevo.", error: true });
    }
  };


  const handleSaveAll = async (newProductsList: Product[]) => {
    try {
      const res = await fetch("/api/products", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Admin-Pin": pin,
        },
        body: JSON.stringify(newProductsList),
      });
      const data = await res.json();
      if (data.success) {
        setProducts(data.data);
        setStatusMsg({ text: "¡Listado de precios guardado con éxito!" });
      } else {
        setStatusMsg({ text: data.message || "Error al guardar los cambios", error: true });
      }
    } catch (err) {
      setStatusMsg({ text: "Error de conexión con el servidor", error: true });
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    setUploading(true);
    try {
      const res = await fetch("/api/products/upload", {
        method: "POST",
        headers: {
          "X-Admin-Pin": pin,
        },
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        setEditingProduct((prev) => {
          const updated = { ...prev, imagen: data.url };
          // Si estamos editando un producto existente en la lista, actualizamos su imagen en tiempo real
          if (prev?.id) {
            setProducts((currentList) =>
              currentList.map((p) => (p.id === prev.id ? { ...p, imagen: data.url } : p))
            );
          }
          return updated;
        });
        setStatusMsg({ text: "¡Imagen convertida a WebP y subida exitosamente a Cloudinary!" });
      } else {
        setStatusMsg({ text: "Error al subir la imagen", error: true });
      }
    } catch (err) {
      setStatusMsg({ text: "Error al comunicarse con Cloudinary", error: true });
    } finally {
      setUploading(false);
    }
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct?.titulo || !editingProduct?.precio) {
      setStatusMsg({ text: "Completa el título y precio", error: true });
      return;
    }

    let updatedList: Product[];
    if (editingProduct.id) {
      updatedList = products.map((p) => (p.id === editingProduct.id ? (editingProduct as Product) : p));
    } else {
      const newProd: Product = {
        id: Date.now().toString(),
        titulo: editingProduct.titulo || "",
        descripcion: editingProduct.descripcion || "",
        presentacion: editingProduct.presentacion || "Unidad",
        precio: Number(editingProduct.precio) || 0,
        imagen: editingProduct.imagen || "https://res.cloudinary.com/ptgboslf/image/upload/v1700000000/simonpastas/default.jpg",
        disponible: true,
      };
      updatedList = [...products, newProd];
    }

    handleSaveAll(updatedList);
    setEditingProduct(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("¿Seguro que deseas eliminar esta pasta del listado?")) {
      const updatedList = products.filter((p) => p.id !== id);
      handleSaveAll(updatedList);
    }
  };

  if (!isAuthenticated) {
    return (
      <AdminContainer>
        <Helmet>
          <title>Admin - Gestión de Precios</title>
        </Helmet>
        <PinModal>
          <h2 style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <ZnIcon icon={LockOutlined} /> Acceso Panel de Precios
          </h2>
          <p style={{ color: "#666", fontSize: "0.95rem" }}>
            Ingresa la clave de administrador para gestionar las pastas:
          </p>
          <form onSubmit={handleLogin}>
            <PinInput
              type="password"
              placeholder="Clave Admin Secreta"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              autoFocus
            />
            <Button type="submit" style={{ width: "100%" }}>
              <ZnIcon icon={LockOutlined} /> Ingresar al Panel
            </Button>
          </form>
          {statusMsg?.error && <StatusMessage $error style={{ marginTop: 16 }}>{statusMsg.text}</StatusMessage>}
        </PinModal>
      </AdminContainer>
    );
  }

  return (
    <AdminContainer>
      <Helmet>
        <title>Panel de Edición de Precios | Simón Pastas</title>
      </Helmet>

      <HeaderSection>
        <Title>Panel de Administración de Precios</Title>
        <Button onClick={() => setEditingProduct({ presentacion: "Caja x 12 u", precio: 0 })}>
          <ZnIcon icon={PlusOutlined} /> Agregar Nueva Pasta
        </Button>
      </HeaderSection>

      {statusMsg && <StatusMessage $error={statusMsg.error}>{statusMsg.text}</StatusMessage>}

      {editingProduct && (
        <FormGrid as="form" onSubmit={handleSaveForm}>
          <FormGroup>
            <Label>Título / Nombre de la Pasta</Label>
            <Input
              type="text"
              required
              value={editingProduct.titulo || ""}
              onChange={(e) => setEditingProduct({ ...editingProduct, titulo: e.target.value })}
            />
          </FormGroup>

          <FormGroup>
            <Label>Presentación (Ej: Caja x 12, Kilo)</Label>
            <Input
              type="text"
              required
              value={editingProduct.presentacion || ""}
              onChange={(e) => setEditingProduct({ ...editingProduct, presentacion: e.target.value })}
            />
          </FormGroup>

          <FormGroup>
            <Label>Precio ($ ARS)</Label>
            <Input
              type="number"
              required
              value={editingProduct.precio || 0}
              onChange={(e) => setEditingProduct({ ...editingProduct, precio: Number(e.target.value) })}
            />
          </FormGroup>

          <FormGroup>
            <Label>Foto (Subir a Cloudinary como .webp)</Label>
            <Input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
            {uploading && (
              <span style={{ fontSize: "0.85rem", color: "#666", display: "flex", alignItems: "center", gap: 6 }}>
                <ZnIcon icon={LoadingOutlined} /> Convirtiendo a WebP y subiendo...
              </span>
            )}
            {editingProduct.imagen && (
              <ThumbImage src={editingProduct.imagen} alt="Vista previa" style={{ marginTop: 8 }} />
            )}
          </FormGroup>

          <FormGroup $fullWidth>
            <Label>Descripción de la Pasta</Label>
            <TextArea
              value={editingProduct.descripcion || ""}
              onChange={(e) => setEditingProduct({ ...editingProduct, descripcion: e.target.value })}
            />
          </FormGroup>

          <FormGroup $fullWidth style={{ flexDirection: "row", gap: 12 }}>
            <Button type="submit">
              <ZnIcon icon={SaveOutlined} /> Guardar Producto
            </Button>
            <Button type="button" $variant="secondary" onClick={() => setEditingProduct(null)}>
              <ZnIcon icon={CloseOutlined} /> Cancelar
            </Button>
          </FormGroup>
        </FormGrid>
      )}

      <TableContainer>
        <Table>
          <thead>
            <tr>
              <Th>Imagen</Th>
              <Th>Título</Th>
              <Th>Presentación</Th>
              <Th>Precio</Th>
              <Th>Acciones</Th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod.id}>
                <Td>
                  <ThumbImage src={prod.imagen} alt={prod.titulo} />
                </Td>
                <Td>
                  <strong>{prod.titulo}</strong>
                  <br />
                  <small style={{ color: "#666" }}>{prod.descripcion}</small>
                </Td>
                <Td>{prod.presentacion}</Td>
                <Td>${prod.precio.toLocaleString("es-AR")}</Td>
                <Td style={{ display: "flex", gap: 8 }}>
                  <Button onClick={() => setEditingProduct(prod)}>
                    <ZnIcon icon={EditOutlined} /> Editar
                  </Button>
                  <Button $variant="danger" onClick={() => handleDelete(prod.id)}>
                    <ZnIcon icon={DeleteOutlined} /> Eliminar
                  </Button>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </AdminContainer>
  );
};

export default AdminPreciosPage;

