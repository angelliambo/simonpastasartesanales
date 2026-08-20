import React, { useEffect, useState, useMemo } from "react";
import { createPortal } from "react-dom";
import styled, { keyframes } from "styled-components";
import { Helmet } from "react-helmet-async";
import type { Product, ProductPresentation } from "@factory/shared/types/products";
import { ZnIcon } from "@design-sys/atoms/ZnIcon";
import {
  LockOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SaveOutlined,
  CloseOutlined,
  LoadingOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  TagOutlined,
  DollarOutlined,
  PictureOutlined,
  FolderOutlined,
} from "@ant-design/icons";

const NO_IMAGE_PLACEHOLDER =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'><rect width='300' height='300' fill='%23f3f4f6'/><g fill='%239ca3af' transform='translate(100, 70)'><rect x='10' y='10' width='80' height='80' rx='8' fill='none' stroke='%239ca3af' stroke-width='4'/><circle cx='35' cy='35' r='8'/><path d='M20 75 L45 45 L60 60 L75 45 L80 75 Z'/></g><text x='150' y='200' font-size='16' font-weight='600' font-family='sans-serif' fill='%236b7280' text-anchor='middle'>Sin Imagen</text></svg>";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
`;

const AdminContainer = styled.div`
  max-width: 1100px;
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
  padding: 8px 14px;
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  font-size: ${props => props.theme.typography.fontSize.sm};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  white-space: nowrap;
  background: ${props =>
    props.$variant === "danger"
      ? props.theme.colors.error[500]
      : props.$variant === "secondary"
      ? props.theme.colors.neutral[600]
      : props.theme.colors.primary[500]};
  color: ${props => props.theme.colors.text.inverse || "#ffffff"};
  box-shadow: ${props => props.theme.shadows.light};
  transition: all ${props => props.theme.transitions.normal};

  &:hover:not(:disabled) {
    background: ${props =>
      props.$variant === "danger"
        ? props.theme.colors.error[600]
        : props.$variant === "secondary"
        ? props.theme.colors.neutral[700]
        : props.theme.colors.primary[600]};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  background: ${props => props.theme.colors.background.card};
  border-radius: 12px;
  border: 1px solid ${props => props.theme.colors.border.normal};
  box-shadow: ${props => props.theme.shadows.medium};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 750px;
`;

const Th = styled.th`
  text-align: left;
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.background.secondary};
  border-bottom: 2px solid ${props => props.theme.colors.border.normal};
  color: ${props => props.theme.colors.text.primary};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
`;

const Tr = styled.tr<{ $isDeleting?: boolean; $isEditing?: boolean }>`
  transition: background-color 0.2s ease;
  background-color: ${props =>
    props.$isDeleting
      ? "#fff1f0"
      : props.$isEditing
      ? props.theme.colors.primary[50]
      : "transparent"};

  &:hover {
    background-color: ${props =>
      props.$isDeleting
        ? "#ffe5e5"
        : props.$isEditing
        ? props.theme.colors.primary[100]
        : props.theme.colors.background.secondary};
  }
`;

const Td = styled.td`
  padding: ${props => props.theme.spacing.md};
  border-bottom: 1px solid ${props => props.theme.colors.border.normal};
  color: ${props => props.theme.colors.text.primary};
  vertical-align: middle;
  font-size: ${props => props.theme.typography.fontSize.sm};
`;

const ActionsCellContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: nowrap;
`;

const ThumbImage = styled.img`
  width: 54px;
  height: 54px;
  object-fit: cover;
  border-radius: ${props => props.theme.borderRadius.md};
  border: 1px solid ${props => props.theme.colors.border.normal};
  background-color: ${props => props.theme.colors.background.secondary};
`;

const ItemBadge = styled.span`
  display: inline-block;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 700;
  background-color: ${props => props.theme.colors.primary[50]};
  color: ${props => props.theme.colors.primary[700]};
  margin-right: 6px;
`;

const CategoryBadge = styled.span`
  display: inline-block;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  background-color: ${props => props.theme.colors.primary[100]};
  color: ${props => props.theme.colors.primary[800]};
  margin-right: 4px;
  margin-bottom: 4px;
`;

const CategoryRemoveTagBtn = styled.button`
  background: transparent;
  border: none;
  color: ${props => props.theme.colors.error[500]};
  cursor: pointer;
  font-weight: bold;
  font-size: 0.8rem;
  line-height: 1;
  padding: 0 2px;
  margin-left: 4px;
  &:hover {
    color: ${props => props.theme.colors.error[700]};
  }
`;

const VarietyTag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  background-color: ${props => props.theme.colors.background.secondary};
  border: 1px solid ${props => props.theme.colors.border.normal};
  color: ${props => props.theme.colors.text.secondary};
  margin: 2px;
`;

const TagRemoveBtn = styled.button`
  background: transparent;
  border: none;
  color: ${props => props.theme.colors.error[500]};
  cursor: pointer;
  font-weight: bold;
  font-size: 0.8rem;
  line-height: 1;
  padding: 0 2px;
  &:hover {
    color: ${props => props.theme.colors.error[700]};
  }
`;

/* Overlay genérico para modales flotantes (React Portal) */
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999999;
  padding: ${props => props.theme.spacing.md};
  backdrop-filter: blur(6px);
`;

const FormModalDialog = styled.div`
  background: ${props => props.theme.colors.background.card};
  border: 1px solid ${props => props.theme.colors.border.normal};
  border-radius: ${props => props.theme.borderRadius.lg};
  max-width: 700px;
  width: 100%;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.4);
  overflow: hidden;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid ${props => props.theme.colors.border.normal};
  background-color: ${props => props.theme.colors.background.card};
  position: sticky;
  top: 0;
  z-index: 10;
`;

const ModalTitle = styled.h2`
  font-size: 1.15rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text.primary};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ModalCloseIconButton = styled.button`
  background: transparent;
  border: none;
  color: ${props => props.theme.colors.text.secondary};
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.theme.colors.background.secondary};
    color: ${props => props.theme.colors.text.primary};
  }
`;

const ModalBody = styled.div`
  padding: 20px 24px;
  overflow-y: auto;
  flex: 1;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  padding: 14px 24px;
  border-top: 1px solid ${props => props.theme.colors.border.normal};
  background-color: ${props => props.theme.colors.background.card};
  position: sticky;
  bottom: 0;
  z-index: 10;
`;

const RequiredAsterisk = styled.span`
  color: ${props => props.theme.colors.error[500] || "#ff4d4f"};
  margin-left: 4px;
  font-weight: bold;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${props => props.theme.spacing.md};

  @media (min-width: 600px) {
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

const SectionSubTitle = styled.h4`
  font-size: 0.95rem;
  margin: 16px 0 8px 0;
  color: ${props => props.theme.colors.text.primary};
  display: flex;
  align-items: center;
  gap: 6px;
`;

const PresentationRow = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 8px;
`;

/* Styled Components para las fotos (hasta 3 fotos por producto) */
const ImageGrid = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 10px;
`;

const ImagePreviewCard = styled.div`
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid ${props => props.theme.colors.border.normal};
  background-color: ${props => props.theme.colors.background.secondary};
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImageDeletingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 1.2rem;
`;

const ImageDeleteBtn = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  background-color: #ff4d4f;
  color: #ffffff;
  border: none;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.75rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  transition: transform 0.15s ease;

  &:hover {
    transform: scale(1.15);
    background-color: #cf1322;
  }
`;

/* Modal de Confirmación de Borrado */
const ConfirmDialog = styled.div`
  background: ${props => props.theme.colors.background.card};
  border: 1px solid ${props => props.theme.colors.border.normal};
  border-radius: ${props => props.theme.borderRadius.lg};
  max-width: 480px;
  width: 100%;
  padding: ${props => props.theme.spacing.xl};
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.4);
  text-align: center;
`;

const DeleteProductCardPreview = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: ${props => props.theme.colors.background.secondary};
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  border: 1px solid ${props => props.theme.colors.border.normal};
  margin: ${props => props.theme.spacing.md} 0;
  text-align: left;
`;

const SnackbarContainer = styled.div<{ $error?: boolean }>`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 999999;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 24px;
  background-color: ${props => (props.$error ? props.theme.colors.error[600] : props.theme.colors.success[600])};
  color: #ffffff;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
  font-weight: 600;
  font-size: 0.875rem;
  animation: ${fadeIn} 0.25s ease-out;

  @media (max-width: 480px) {
    bottom: 16px;
    right: 16px;
    left: 16px;
    justify-content: space-between;
  }
`;

const SnackbarCloseBtn = styled.button`
  background: transparent;
  border: none;
  color: #ffffff;
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  padding: 2px;
  opacity: 0.85;
  margin-left: 4px;
  &:hover {
    opacity: 1;
  }
`;

export const AdminPreciosPage: React.FC = () => {
  const [pin, setPin] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [newVarietyInput, setNewVarietyInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [toast, setToast] = useState<{ text: string; error?: boolean } | null>(null);
  const [uploading, setUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingImageIndex, setDeletingImageIndex] = useState<number | null>(null);
  const [isDeletingProduct, setIsDeletingProduct] = useState(false);

  const showToast = (text: string, error = false) => {
    setToast({ text, error });
  };

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(timer);
  }, [toast]);

  const fetchProducts = () => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setProducts(data.data);
        }
      })
      .catch((err) => console.error("Error obteniendo catálogo:", err));
  };

  // Extraer lista global de categorías existentes de forma dinámica
  const existingCategoriesList = useMemo(() => {
    const set = new Set<string>([
      "Pastas Rellenas",
      "Pastas Largas",
      "Pastas Cortas",
      "Salsas y Acompañamientos",
      "Empanadas y Canastitas",
      "Postres y Especialidades",
    ]);
    products.forEach((p) => {
      if (p.categorias && Array.isArray(p.categorias)) {
        p.categorias.forEach((c) => c && set.add(c.trim()));
      } else if (p.categoria && p.categoria.trim()) {
        set.add(p.categoria.trim());
      }
    });
    return Array.from(set);
  }, [products]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin.trim()) return;

    try {
      const res = await fetch("/api/products/verify-pin", {
        method: "POST",
        headers: {
          "X-Admin-Pin": pin.trim(),
        },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        fetchProducts();
        showToast("¡Acceso concedido!");
      } else {
        showToast("PIN incorrecto", true);
      }
    } catch (err) {
      showToast("Error de conexión", true);
    }
  };

  const handleSaveAll = async (newProductsList: Product[]) => {
    setIsSaving(true);
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
        showToast("¡Guardado!");
      } else {
        showToast("Error al guardar", true);
      }
    } catch (err) {
      showToast("Error de conexión", true);
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const currentImages = editingProduct?.imagenes || (editingProduct?.imagen ? [editingProduct.imagen] : []);
    if (currentImages.length >= 3) {
      showToast("Máximo 3 fotos", true);
      return;
    }

    const mainCategory = editingProduct?.categorias?.[0] || editingProduct?.categoria || "general";
    const formData = new FormData();
    formData.append("image", file);
    formData.append("categoria", mainCategory);

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
        const updatedImages = [...currentImages, data.url].slice(0, 3);
        setEditingProduct((prev) => ({
          ...prev,
          imagenes: updatedImages,
          imagen: updatedImages[0] || null,
        }));
        showToast("¡Foto cargada!");
      } else {
        showToast("Error al subir foto", true);
      }
    } catch (err) {
      showToast("Error al subir foto", true);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = async (indexToRemove: number) => {
    const currentImages = editingProduct?.imagenes || (editingProduct?.imagen ? [editingProduct.imagen] : []);
    const imageToRemoveUrl = currentImages[indexToRemove];

    setDeletingImageIndex(indexToRemove);
    if (imageToRemoveUrl) {
      try {
        await fetch("/api/products/delete-image", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Admin-Pin": pin,
          },
          body: JSON.stringify({ url: imageToRemoveUrl }),
        });
      } catch (err) {
        console.error("Error al notificar eliminación de imagen:", err);
      }
    }

    const updatedImages = currentImages.filter((_, idx) => idx !== indexToRemove);
    setEditingProduct((prev) => ({
      ...prev,
      imagenes: updatedImages,
      imagen: updatedImages[0] || null,
    }));
    setDeletingImageIndex(null);
    showToast("Foto eliminada");
  };

  const openNewProductModal = () => {
    setEditingProduct({
      titulo: "",
      categoria: "Pastas Rellenas",
      categorias: ["Pastas Rellenas"],
      descripcion: "",
      imagen: null,
      imagenes: [],
      variedades: [],
      presentaciones: [{ presentacion: "Unidad", precio: 0 }],
    });
    setNewVarietyInput("");
    setCategoryInput("");
  };

  const handleAddCategory = (catToAdd: string) => {
    const cat = catToAdd.trim();
    if (!cat) return;
    const current = editingProduct?.categorias || (editingProduct?.categoria ? [editingProduct.categoria] : []);
    if (!current.includes(cat)) {
      const updated = [...current, cat];
      setEditingProduct((prev) => ({
        ...prev,
        categorias: updated,
        categoria: updated[0] || null,
      }));
    }
    setCategoryInput("");
  };

  const handleRemoveCategory = (catToRemove: string) => {
    const current = editingProduct?.categorias || (editingProduct?.categoria ? [editingProduct.categoria] : []);
    const updated = current.filter((c) => c !== catToRemove);
    setEditingProduct((prev) => ({
      ...prev,
      categorias: updated,
      categoria: updated[0] || null,
    }));
  };

  const handleAddVariety = () => {
    if (!newVarietyInput.trim()) return;
    const current = editingProduct?.variedades || [];
    if (!current.includes(newVarietyInput.trim())) {
      setEditingProduct((prev) => ({
        ...prev,
        variedades: [...(prev?.variedades || []), newVarietyInput.trim()],
      }));
    }
    setNewVarietyInput("");
  };

  const handleRemoveVariety = (variety: string) => {
    setEditingProduct((prev) => ({
      ...prev,
      variedades: (prev?.variedades || []).filter((v) => v !== variety),
    }));
  };

  const handleAddPresentation = () => {
    const current = editingProduct?.presentaciones || [];
    setEditingProduct((prev) => ({
      ...prev,
      presentaciones: [...current, { presentacion: "", precio: 0 }],
    }));
  };

  const handleUpdatePresentation = (index: number, field: keyof ProductPresentation, value: any) => {
    const current = [...(editingProduct?.presentaciones || [])];
    if (current[index]) {
      current[index] = { ...current[index], [field]: value };
      setEditingProduct((prev) => ({ ...prev, presentaciones: current }));
    }
  };

  const handleRemovePresentation = (index: number) => {
    const current = (editingProduct?.presentaciones || []).filter((_, i) => i !== index);
    setEditingProduct((prev) => ({ ...prev, presentaciones: current }));
  };

  // Validación en tiempo real del formulario
  const isTitleValid = Boolean(editingProduct?.titulo?.trim());
  const isPresentationsValid = Boolean(
    editingProduct?.presentaciones &&
      editingProduct.presentaciones.length > 0 &&
      editingProduct.presentaciones.some((p) => p.presentacion.trim() !== "" && p.precio >= 0)
  );
  const isFormValid = isTitleValid && isPresentationsValid;

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || !editingProduct || isSaving) return;

    const presentaciones = (editingProduct.presentaciones || []).filter(
      (p) => p.presentacion.trim() !== ""
    );

    const currentImages = editingProduct.imagenes || (editingProduct.imagen ? [editingProduct.imagen] : []);
    const currentCategories = editingProduct.categorias || (editingProduct.categoria ? [editingProduct.categoria] : []);

    let updatedList: Product[];
    if (editingProduct.id) {
      updatedList = products.map((p) =>
        p.id === editingProduct.id
          ? ({
              ...p,
              ...editingProduct,
              presentaciones,
              imagenes: currentImages,
              imagen: currentImages[0] || null,
              categorias: currentCategories,
              categoria: currentCategories[0] || null,
            } as Product)
          : p
      );
    } else {
      const newProd: Product = {
        id: `prod-${Date.now()}`,
        titulo: editingProduct.titulo || "",
        categoria: currentCategories[0] || null,
        categorias: currentCategories,
        descripcion: editingProduct.descripcion || "",
        presentaciones,
        imagenes: currentImages,
        imagen: currentImages[0] || null,
        variedades: editingProduct.variedades || [],
        disponible: true,
        orden: products.length + 1,
      };
      updatedList = [...products, newProd];
    }

    handleSaveAll(updatedList);
    setEditingProduct(null);
  };

  const confirmDeleteProduct = async () => {
    if (!deleteTarget || isDeletingProduct) return;

    setIsDeletingProduct(true);
    try {
      const res = await fetch(`/api/products/${deleteTarget.id}`, {
        method: "DELETE",
        headers: {
          "X-Admin-Pin": pin,
        },
      });
      const data = await res.json();
      if (data.success) {
        fetchProducts();
        showToast("Producto eliminado");
      } else {
        const updatedList = products.filter((p) => p.id !== deleteTarget.id);
        handleSaveAll(updatedList);
      }
    } catch (err) {
      const updatedList = products.filter((p) => p.id !== deleteTarget.id);
      handleSaveAll(updatedList);
    } finally {
      setIsDeletingProduct(false);
      setDeleteTarget(null);
    }
  };

  const getPortalTarget = (): Element => {
    return document.getElementById("floating-elements") || document.body;
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
            Ingresa la clave de administrador para gestionar la lista de precios:
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
        </PinModal>

        {toast &&
          createPortal(
            <SnackbarContainer $error={toast.error}>
              <ZnIcon icon={toast.error ? ExclamationCircleOutlined : CheckCircleOutlined} />
              <span>{toast.text}</span>
              <SnackbarCloseBtn onClick={() => setToast(null)}>
                <ZnIcon icon={CloseOutlined} />
              </SnackbarCloseBtn>
            </SnackbarContainer>,
            getPortalTarget()
          )}
      </AdminContainer>
    );
  }

  const currentEditingImages = editingProduct?.imagenes || (editingProduct?.imagen ? [editingProduct.imagen] : []);
  const currentEditingCategories = editingProduct?.categorias || (editingProduct?.categoria ? [editingProduct.categoria] : []);

  return (
    <AdminContainer>
      <Helmet>
        <title>Panel de Edición de Precios | Simón Pastas</title>
      </Helmet>

      <HeaderSection>
        <div>
          <Title>Panel de Administración de Precios</Title>
          <small style={{ color: "#666" }}>Total de productos en catálogo: {products.length}</small>
        </div>
        <Button onClick={openNewProductModal}>
          <ZnIcon icon={PlusOutlined} /> Agregar Nueva Pasta
        </Button>
      </HeaderSection>

      <TableContainer>
        <Table>
          <thead>
            <tr>
              <Th style={{ width: "80px" }}>Fotos</Th>
              <Th>Categorías Asignadas</Th>
              <Th>Título, Descripción y Variedades</Th>
              <Th>Presentaciones y Precios</Th>
              <Th style={{ width: "180px" }}>Acciones</Th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod, index) => {
              const isDeleting = deleteTarget?.id === prod.id;
              const isEditing = editingProduct?.id === prod.id;
              const mainPrice = prod.presentaciones?.[0]?.precio ?? prod.precio ?? 0;
              const prodImages = prod.imagenes && prod.imagenes.length > 0 ? prod.imagenes : (prod.imagen ? [prod.imagen] : []);
              const prodCategories = prod.categorias && prod.categorias.length > 0 ? prod.categorias : (prod.categoria ? [prod.categoria] : []);

              return (
                <Tr key={prod.id} $isDeleting={isDeleting} $isEditing={isEditing}>
                  <Td>
                    <div style={{ display: "flex", gap: 4 }}>
                      {prodImages.length > 0 ? (
                        <ThumbImage
                          src={prodImages[0]}
                          alt={prod.titulo}
                          onError={(e) => {
                            e.currentTarget.src = NO_IMAGE_PLACEHOLDER;
                          }}
                        />
                      ) : (
                        <ThumbImage src={NO_IMAGE_PLACEHOLDER} alt="Sin Imagen" />
                      )}
                      {prodImages.length > 1 && (
                        <span
                          style={{
                            fontSize: "0.7rem",
                            fontWeight: "bold",
                            alignSelf: "flex-end",
                            backgroundColor: "#eee",
                            padding: "2px 4px",
                            borderRadius: "4px",
                          }}
                        >
                          +{prodImages.length - 1}
                        </span>
                      )}
                    </div>
                  </Td>
                  <Td>
                    {prodCategories.length > 0 ? (
                      prodCategories.map((c, cIdx) => <CategoryBadge key={cIdx}>{c}</CategoryBadge>)
                    ) : (
                      <small style={{ color: "#999" }}>Sin Categoría</small>
                    )}
                  </Td>
                  <Td>
                    <div>
                      <ItemBadge>#{index + 1}</ItemBadge>
                      <strong style={{ fontSize: "1rem" }}>{prod.titulo}</strong>
                    </div>
                    <small style={{ color: "#666" }}>{prod.descripcion}</small>

                    {prod.variedades && prod.variedades.length > 0 && (
                      <div style={{ marginTop: 6 }}>
                        <small style={{ color: "#888", fontWeight: 600 }}>Variedades: </small>
                        {prod.variedades.map((v, idx) => (
                          <VarietyTag key={idx}>{v}</VarietyTag>
                        ))}
                      </div>
                    )}
                  </Td>
                  <Td>
                    {prod.presentaciones && prod.presentaciones.length > 0 ? (
                      prod.presentaciones.map((p, pIdx) => (
                        <div key={pIdx} style={{ marginBottom: 4 }}>
                          <strong>{p.presentacion}</strong>: ${p.precio.toLocaleString("es-AR")}
                        </div>
                      ))
                    ) : (
                      <div>
                        <strong>{prod.presentacion || "Unidad"}</strong>: ${mainPrice.toLocaleString("es-AR")}
                      </div>
                    )}
                  </Td>
                  <Td>
                    <ActionsCellContainer>
                      <Button onClick={() => setEditingProduct({ ...prod })}>
                        <ZnIcon icon={EditOutlined} /> Editar
                      </Button>
                      <Button $variant="danger" onClick={() => setDeleteTarget(prod)}>
                        <ZnIcon icon={DeleteOutlined} /> Eliminar
                      </Button>
                    </ActionsCellContainer>
                  </Td>
                </Tr>
              );
            })}
          </tbody>
        </Table>
      </TableContainer>

      {/* Modal de Edición y Creación de Producto */}
      {editingProduct &&
        createPortal(
          <ModalOverlay onClick={() => !isSaving && setEditingProduct(null)}>
            <FormModalDialog onClick={(e) => e.stopPropagation()}>
              <ModalHeader>
                <ModalTitle>
                  <ZnIcon icon={editingProduct.id ? EditOutlined : PlusOutlined} />
                  {editingProduct.id
                    ? `Editar Pasta: "${editingProduct.titulo || "Sin título"}"`
                    : "Agregar Nueva Pasta al Catálogo"}
                </ModalTitle>
                <ModalCloseIconButton type="button" aria-label="Cerrar modal" onClick={() => !isSaving && setEditingProduct(null)}>
                  <ZnIcon icon={CloseOutlined} />
                </ModalCloseIconButton>
              </ModalHeader>

              <form onSubmit={handleSaveForm} style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
                <ModalBody>
                  <FormGrid>
                    <FormGroup $fullWidth>
                      <Label>
                        Nombre / Título de la Pasta
                        <RequiredAsterisk>*</RequiredAsterisk>
                      </Label>
                      <Input
                        type="text"
                        required
                        placeholder="Ej: Ravioles Artesanales, Sorrentinos"
                        value={editingProduct.titulo || ""}
                        onChange={(e) => setEditingProduct({ ...editingProduct, titulo: e.target.value })}
                      />
                    </FormGroup>

                    {/* Selector Autocomplete & Creador de Categorías */}
                    <FormGroup $fullWidth style={{ borderTop: "1px dashed #ddd", paddingTop: 12 }}>
                      <SectionSubTitle>
                        <ZnIcon icon={FolderOutlined} /> Categorías Asignadas (Puede pertenecer a más de una)
                      </SectionSubTitle>

                      <datalist id="category-options">
                        {existingCategoriesList.map((cat, idx) => (
                          <option key={idx} value={cat} />
                        ))}
                      </datalist>

                      <div style={{ display: "flex", gap: 8 }}>
                        <Input
                          type="text"
                          list="category-options"
                          placeholder="Selecciona una categoría o escribe una nueva..."
                          value={categoryInput}
                          onChange={(e) => setCategoryInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddCategory(categoryInput);
                            }
                          }}
                        />
                        <Button
                          type="button"
                          onClick={() => handleAddCategory(categoryInput)}
                          disabled={!categoryInput.trim()}
                        >
                          <ZnIcon icon={PlusOutlined} /> Asignar Categoría
                        </Button>
                      </div>

                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
                        {currentEditingCategories.map((cat, idx) => (
                          <CategoryBadge key={idx} style={{ display: "inline-flex", alignItems: "center" }}>
                            {cat}
                            <CategoryRemoveTagBtn type="button" onClick={() => handleRemoveCategory(cat)}>
                              ✕
                            </CategoryRemoveTagBtn>
                          </CategoryBadge>
                        ))}
                        {currentEditingCategories.length === 0 && (
                          <small style={{ color: "#999" }}>Sin categorías asignadas aún.</small>
                        )}
                      </div>
                    </FormGroup>

                    <FormGroup $fullWidth>
                      <Label>Descripción de la Pasta</Label>
                      <TextArea
                        placeholder="Breve descripción de la elaboración e ingredientes..."
                        value={editingProduct.descripcion || ""}
                        onChange={(e) => setEditingProduct({ ...editingProduct, descripcion: e.target.value })}
                      />
                    </FormGroup>

                    {/* Sección de Variedades / Sabores */}
                    <FormGroup $fullWidth style={{ borderTop: "1px dashed #ddd", paddingTop: 12 }}>
                      <SectionSubTitle>
                        <ZnIcon icon={TagOutlined} /> Variedades / Sabores Disponibles
                      </SectionSubTitle>
                      <div style={{ display: "flex", gap: 8 }}>
                        <Input
                          type="text"
                          placeholder="Ej: Espinaca y Ricota, Jamón y Queso..."
                          value={newVarietyInput}
                          onChange={(e) => setNewVarietyInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddVariety();
                            }
                          }}
                        />
                        <Button type="button" onClick={handleAddVariety}>
                          <ZnIcon icon={PlusOutlined} /> Agregar
                        </Button>
                      </div>

                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
                        {(editingProduct.variedades || []).map((v, idx) => (
                          <VarietyTag key={idx}>
                            {v}
                            <TagRemoveBtn type="button" onClick={() => handleRemoveVariety(v)}>
                              ✕
                            </TagRemoveBtn>
                          </VarietyTag>
                        ))}
                        {(editingProduct.variedades || []).length === 0 && (
                          <small style={{ color: "#999" }}>No se agregaron variedades aún (Opcional).</small>
                        )}
                      </div>
                    </FormGroup>

                    {/* Sección de Presentaciones y Precios Múltiples */}
                    <FormGroup $fullWidth style={{ borderTop: "1px dashed #ddd", paddingTop: 12 }}>
                      <SectionSubTitle>
                        <ZnIcon icon={DollarOutlined} /> Presentaciones y Precios
                        <RequiredAsterisk>*</RequiredAsterisk>
                      </SectionSubTitle>

                      {(editingProduct.presentaciones || []).map((p, pIdx) => (
                        <PresentationRow key={pIdx}>
                          <Input
                            type="text"
                            placeholder="Ej: Caja x 48 u, Bolsa x 500g"
                            style={{ flex: 2 }}
                            value={p.presentacion}
                            onChange={(e) => handleUpdatePresentation(pIdx, "presentacion", e.target.value)}
                          />
                          <Input
                            type="number"
                            placeholder="Precio ($)"
                            style={{ flex: 1 }}
                            value={p.precio}
                            onChange={(e) =>
                              handleUpdatePresentation(pIdx, "precio", Number(e.target.value))
                            }
                          />
                          {(editingProduct.presentaciones || []).length > 1 && (
                            <Button type="button" $variant="danger" onClick={() => handleRemovePresentation(pIdx)}>
                              <ZnIcon icon={CloseOutlined} />
                            </Button>
                          )}
                        </PresentationRow>
                      ))}

                      <Button type="button" $variant="secondary" style={{ marginTop: 6, alignSelf: "flex-start" }} onClick={handleAddPresentation}>
                        <ZnIcon icon={PlusOutlined} /> Agregar otra presentación
                      </Button>
                    </FormGroup>

                    {/* Galería de Fotos (Hasta 3 imágenes por producto) */}
                    <FormGroup $fullWidth style={{ borderTop: "1px dashed #ddd", paddingTop: 12 }}>
                      <SectionSubTitle>
                        <ZnIcon icon={PictureOutlined} /> Galería de Fotos (Hasta 3 fotos)
                      </SectionSubTitle>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploading || currentEditingImages.length >= 3}
                      />
                      <small style={{ color: "#666", fontSize: "0.8rem", marginTop: 4 }}>
                        💡 Recomendación: Sube imágenes cuadradas (1:1) o 4:3 (mínimo 600x600 px en JPG, PNG o WebP) para una visualización completa sin recortes.
                      </small>
                      {uploading && (
                        <span
                          style={{
                            fontSize: "0.85rem",
                            color: "#666",
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            marginTop: 4,
                          }}
                        >
                          <ZnIcon icon={LoadingOutlined} /> Subiendo foto...
                        </span>
                      )}

                      <ImageGrid>
                        {currentEditingImages.map((imgUrl, imgIdx) => (
                          <ImagePreviewCard key={imgIdx}>
                            <PreviewImage
                              src={imgUrl}
                              alt={`Foto ${imgIdx + 1}`}
                              onError={(e) => {
                                e.currentTarget.src = NO_IMAGE_PLACEHOLDER;
                              }}
                            />
                            {deletingImageIndex === imgIdx ? (
                              <ImageDeletingOverlay>
                                <ZnIcon icon={LoadingOutlined} />
                              </ImageDeletingOverlay>
                            ) : (
                              <ImageDeleteBtn
                                type="button"
                                title="Eliminar esta foto"
                                aria-label="Eliminar esta foto"
                                onClick={() => handleRemoveImage(imgIdx)}
                              >
                                ✕
                              </ImageDeleteBtn>
                            )}
                          </ImagePreviewCard>
                        ))}
                      </ImageGrid>

                      {currentEditingImages.length === 0 && (
                        <small style={{ color: "#888", marginTop: 6, display: "block" }}>
                          Sin fotos cargadas. Se mostrará el gráfico neutro "Sin Imagen".
                        </small>
                      )}
                    </FormGroup>
                  </FormGrid>
                </ModalBody>

                <ModalFooter>
                  <Button type="button" $variant="secondary" onClick={() => setEditingProduct(null)} disabled={isSaving}>
                    <ZnIcon icon={CloseOutlined} /> Cancelar
                  </Button>
                  <Button type="submit" disabled={!isFormValid || isSaving}>
                    <ZnIcon icon={isSaving ? LoadingOutlined : SaveOutlined} />
                    {isSaving ? "Guardando..." : "Guardar Cambios"}
                  </Button>
                </ModalFooter>
              </form>
            </FormModalDialog>
          </ModalOverlay>,
          getPortalTarget()
        )}

      {/* Modal de Confirmación de Borrado */}
      {deleteTarget &&
        createPortal(
          <ModalOverlay onClick={() => !isDeletingProduct && setDeleteTarget(null)}>
            <ConfirmDialog onClick={(e) => e.stopPropagation()}>
              <ZnIcon icon={ExclamationCircleOutlined} style={{ fontSize: "2.5rem", color: "#ff4d4f" }} />
              <h3 style={{ margin: "12px 0 6px 0" }}>¿Confirmar eliminación de la pasta?</h3>
              <p style={{ color: "#666", fontSize: "0.9rem", margin: 0 }}>
                Estás a punto de borrar definitivamente este producto del catálogo:
              </p>

              <DeleteProductCardPreview>
                <ThumbImage
                  src={deleteTarget.imagen || (deleteTarget.imagenes && deleteTarget.imagenes[0]) || NO_IMAGE_PLACEHOLDER}
                  alt={deleteTarget.titulo}
                  onError={(e) => {
                    e.currentTarget.src = NO_IMAGE_PLACEHOLDER;
                  }}
                />
                <div>
                  <strong style={{ fontSize: "1rem" }}>{deleteTarget.titulo}</strong>
                  <br />
                  <small style={{ color: "#666" }}>
                    {deleteTarget.presentaciones?.[0]?.presentacion || deleteTarget.presentacion || "Unidad"} — $
                    {(deleteTarget.presentaciones?.[0]?.precio ?? deleteTarget.precio ?? 0).toLocaleString("es-AR")}
                  </small>
                </div>
              </DeleteProductCardPreview>

              <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 16 }}>
                <Button $variant="secondary" onClick={() => setDeleteTarget(null)} disabled={isDeletingProduct}>
                  <ZnIcon icon={CloseOutlined} /> Cancelar
                </Button>
                <Button $variant="danger" onClick={confirmDeleteProduct} disabled={isDeletingProduct}>
                  <ZnIcon icon={isDeletingProduct ? LoadingOutlined : DeleteOutlined} />
                  {isDeletingProduct ? "Eliminando..." : "Eliminar Pasta"}
                </Button>
              </div>
            </ConfirmDialog>
          </ModalOverlay>,
          getPortalTarget()
        )}

      {/* Snackbar Notification Toast */}
      {toast &&
        createPortal(
          <SnackbarContainer $error={toast.error}>
            <ZnIcon icon={toast.error ? ExclamationCircleOutlined : CheckCircleOutlined} />
            <span>{toast.text}</span>
            <SnackbarCloseBtn onClick={() => setToast(null)}>
              <ZnIcon icon={CloseOutlined} />
            </SnackbarCloseBtn>
          </SnackbarContainer>,
          getPortalTarget()
        )}
    </AdminContainer>
  );
};

export default AdminPreciosPage;
