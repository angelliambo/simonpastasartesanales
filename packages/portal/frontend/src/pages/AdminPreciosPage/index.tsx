import React, { useEffect, useState, useMemo } from "react";
import { createPortal } from "react-dom";
import { Helmet } from "react-helmet-async";
import type { Product, ProductPresentation } from "@factory/shared/types/products";
import { ZnIcon } from "@design-sys/atoms/ZnIcon";
import { useTranslation } from "../../i18n/I18nProvider";
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
import { Button } from "@design-sys/atoms/Button";
import {
  PinModal,
  PinInput,
  Input,
  RequiredAsterisk,
  FormGrid,
  ModalBody,
  ModalFooter,
  FormModalDialog,
  ThumbImage,
  Table,
  CategoryBadge,
  ItemBadge,
  VarietyTag,
  CategoryRemoveTagBtn,
  TagRemoveBtn,
  ActionsCellContainer,
  ModalCloseIconButton,
  Label,
  TextArea,
  AdminContainer,
  HeaderSection,
  Title,
  HeaderActions,
  SecondaryBtnLink,
  PrimaryBtn,
  SaveAllBtn,
  CancelBtn,
  DangerBtn,
  IconBtn,
  SearchCard,
  SearchInput,
  CategorySelect,
  TableContainer,
  StyledTable,
  Th,
  Tr,
  Td,
  ProductThumb,
  InlineInput,
  PriceInputGroup,
  PriceInput,
  CategoryTag,
  ModalOverlay,
  ModalDialog,
  ModalHeader,
  ModalTitle,
  FormGroup,
  FormLabel,
  FormInput,
  FormTextArea,
  SectionSubTitle,
  PresentationRow,
  ImageGrid,
  ImagePreviewCard,
  PreviewImage,
  ImageDeletingOverlay,
  ImageDeleteBtn,
  ConfirmDialog,
  DeleteProductCardPreview,
  SnackbarContainer,
  SnackbarCloseBtn,
} from "./AdminPreciosPage.styles";

const NO_IMAGE_PLACEHOLDER =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'><rect width='300' height='300' fill='%23f3f4f6'/><g fill='%239ca3af' transform='translate(100, 70)'><rect x='10' y='10' width='80' height='80' rx='8' fill='none' stroke='%239ca3af' stroke-width='4'/><circle cx='35' cy='35' r='8'/><path d='M20 75 L45 45 L60 60 L75 45 L80 75 Z'/></g><text x='150' y='200' font-size='16' font-weight='600' font-family='sans-serif' fill='%236b7280' text-anchor='middle'>Sin Imagen</text></svg>";

export const AdminPreciosPage: React.FC = () => {
  const { t } = useTranslation();
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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.trim() === "1234" || pin.trim() === "admin") {
      setIsAuthenticated(true);
      fetchProducts();
    } else {
      showToast(t("pages.precios.invalidPin"), true);
    }
  };

  const handleSaveAll = async (updatedProductsList: Product[]) => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/products/batch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Admin-Pin": pin,
        },
        body: JSON.stringify({ products: updatedProductsList }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(t("pages.precios.saveSuccess"));
        fetchProducts();
      } else {
        showToast(data.message || t("pages.precios.saveError"), true);
      }
    } catch (err) {
      showToast(t("pages.precios.saveError"), true);
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

  const handleAddCategory = (catToAdd?: string) => {
    const cat = (typeof catToAdd === "string" ? catToAdd : categoryInput).trim();
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
          <title>{t("pages.precios.adminPanelTitle")}</title>
        </Helmet>
        <PinModal>
          <h2 style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <ZnIcon icon={LockOutlined} /> {t("pages.precios.accessPanelTitle")}
          </h2>
          <p style={{ color: "#666", fontSize: "0.95rem" }}>
            {t("pages.precios.pinPrompt")}
          </p>
          <form onSubmit={handleLogin}>
            <PinInput
              type="password"
              placeholder={t("pages.precios.pinPlaceholder")}
              value={pin}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPin(e.target.value)}
              autoFocus
            />
            <Button type="submit" style={{ width: "100%" }}>
              <ZnIcon icon={LockOutlined} /> {t("pages.precios.loginBtn")}
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
        <title>{t("pages.precios.adminPanelTitle")}</title>
      </Helmet>

      <HeaderSection>
        <div>
          <Title>{t("pages.precios.adminPanelTitle")}</Title>
          <small style={{ color: "#666" }}>{t("pages.precios.adminTotalProducts")} {products.length}</small>
        </div>
        <Button onClick={openNewProductModal}>
          <ZnIcon icon={PlusOutlined} /> {t("pages.precios.addProduct")}
        </Button>
      </HeaderSection>

      <TableContainer>
        <Table>
          <thead>
            <tr>
              <Th style={{ width: "80px" }}>{t("pages.precios.photosColumn")}</Th>
              <Th>{t("pages.precios.categoriesColumn")}</Th>
              <Th>{t("pages.precios.titleDescVarietiesColumn")}</Th>
              <Th>{t("pages.precios.presentationsAndPricesColumn")}</Th>
              <Th style={{ width: "180px" }}>{t("pages.precios.actionColumn")}</Th>
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
                          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
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
                      prodCategories.map((c: string, cIdx: number) => <CategoryBadge key={cIdx}>{c}</CategoryBadge>)
                    ) : (
                      <small style={{ color: "#999" }}>{t("pages.precios.generalCategory")}</small>
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
                        <small style={{ color: "#888", fontWeight: 600 }}>{t("pages.precios.varietiesColumn")}: </small>
                        {prod.variedades.map((v: string, idx: number) => (
                          <VarietyTag key={idx}>{v}</VarietyTag>
                        ))}
                      </div>
                    )}
                  </Td>
                  <Td>
                    {prod.presentaciones && prod.presentaciones.length > 0 ? (
                      prod.presentaciones.map((p: ProductPresentation, pIdx: number) => (
                        <div key={pIdx} style={{ marginBottom: 4 }}>
                          <strong>{p.presentacion}</strong>: ${p.precio.toLocaleString("es-AR")}
                        </div>
                      ))
                    ) : (
                      <div>
                        <strong>{prod.presentacion || t("pages.precios.unitPresentation")}</strong>: ${mainPrice.toLocaleString("es-AR")}
                      </div>
                    )}
                  </Td>
                  <Td>
                    <ActionsCellContainer>
                      <Button onClick={() => setEditingProduct({ ...prod })}>
                        <ZnIcon icon={EditOutlined} /> {t("pages.precios.editBtn")}
                      </Button>
                      <Button variant="danger" onClick={() => setDeleteTarget(prod)}>
                        <ZnIcon icon={DeleteOutlined} /> {t("pages.precios.deleteBtn")}
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
            <FormModalDialog onClick={(e: React.MouseEvent) => e.stopPropagation()}>
              <ModalHeader>
                <ModalTitle>
                  <ZnIcon icon={editingProduct.id ? EditOutlined : PlusOutlined} />
                  {editingProduct.id
                    ? `${t("pages.precios.editModalTitle")} "${editingProduct.titulo || ""}"`
                    : t("pages.precios.addModalTitle")}
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
                        {t("pages.precios.fieldTitleLabel")}
                        <RequiredAsterisk>*</RequiredAsterisk>
                      </Label>
                      <Input
                        type="text"
                        required
                        placeholder={t("pages.precios.fieldTitlePlaceholder")}
                        value={editingProduct.titulo || ""}
                        onChange={(e) => setEditingProduct({ ...editingProduct, titulo: e.target.value })}
                      />
                    </FormGroup>

                    {/* Selector Autocomplete & Creador de Categorías */}
                    <FormGroup $fullWidth style={{ borderTop: "1px dashed #ddd", paddingTop: 12 }}>
                      <SectionSubTitle>
                        <ZnIcon icon={FolderOutlined} /> {t("pages.precios.fieldCategoryLabel")}
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
                          placeholder={t("pages.precios.fieldCategoryPlaceholder")}
                          value={categoryInput}
                          onChange={(e) => setCategoryInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === ",") {
                              e.preventDefault();
                              handleAddCategory();
                            }
                          }}
                        />
                        <Button type="button" variant="secondary" onClick={() => handleAddCategory()}>
                          {t("pages.precios.fieldAddCategoryBtn")}
                        </Button>
                      </div>

                      <div style={{ marginTop: 8 }}>
                        {currentEditingCategories.map((cat, idx) => (
                          <CategoryBadge key={idx} style={{ display: "inline-flex", alignItems: "center" }}>
                            {cat}
                            <CategoryRemoveTagBtn type="button" onClick={() => handleRemoveCategory(cat)}>
                              ✕
                            </CategoryRemoveTagBtn>
                          </CategoryBadge>
                        ))}
                      </div>
                    </FormGroup>

                    {/* Descripción Corta */}
                    <FormGroup $fullWidth>
                      <Label>{t("pages.precios.fieldDescLabel")}</Label>
                      <TextArea
                        placeholder={t("pages.precios.fieldDescPlaceholder")}
                        value={editingProduct.descripcion || ""}
                        onChange={(e) => setEditingProduct({ ...editingProduct, descripcion: e.target.value })}
                      />
                    </FormGroup>

                    {/* Variedades y Sabores Disponibles */}
                    <FormGroup $fullWidth style={{ borderTop: "1px dashed #ddd", paddingTop: 12 }}>
                      <SectionSubTitle>
                        <ZnIcon icon={TagOutlined} /> {t("pages.precios.fieldVarietiesLabel")}
                      </SectionSubTitle>

                      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                        <Input
                          type="text"
                          placeholder={t("pages.precios.fieldVarietyPlaceholder")}
                          value={newVarietyInput}
                          onChange={(e) => setNewVarietyInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === ",") {
                              e.preventDefault();
                              handleAddVariety();
                            }
                          }}
                        />
                        <Button type="button" variant="secondary" onClick={handleAddVariety}>
                          {t("pages.precios.fieldAddVarietyBtn")}
                        </Button>
                      </div>

                      <div>
                        {(editingProduct.variedades || []).map((v, idx) => (
                          <VarietyTag key={idx}>
                            {v}
                            <TagRemoveBtn type="button" onClick={() => handleRemoveVariety(v)}>
                              ✕
                            </TagRemoveBtn>
                          </VarietyTag>
                        ))}
                        {(editingProduct.variedades || []).length === 0 && (
                          <small style={{ color: "#999" }}>{t("pages.precios.noVarietiesYet")}</small>
                        )}
                      </div>
                    </FormGroup>

                    {/* Sección de Presentaciones y Precios Múltiples */}
                    <FormGroup $fullWidth style={{ borderTop: "1px dashed #ddd", paddingTop: 12 }}>
                      <SectionSubTitle>
                        <ZnIcon icon={DollarOutlined} /> {t("pages.precios.presentationsTitle")}
                        <RequiredAsterisk>*</RequiredAsterisk>
                      </SectionSubTitle>

                      {(editingProduct.presentaciones || []).map((p, pIdx) => (
                        <PresentationRow key={pIdx}>
                          <Input
                            type="text"
                            placeholder={t("pages.precios.presentationPlaceholder")}
                            style={{ flex: 2 }}
                            value={p.presentacion}
                            onChange={(e) => handleUpdatePresentation(pIdx, "presentacion", e.target.value)}
                          />
                          <Input
                            type="number"
                            placeholder={t("pages.precios.pricePlaceholder")}
                            style={{ flex: 1 }}
                            value={p.precio}
                            onChange={(e) =>
                              handleUpdatePresentation(pIdx, "precio", Number(e.target.value))
                            }
                          />
                          {(editingProduct.presentaciones || []).length > 1 && (
                            <Button type="button" variant="danger" onClick={() => handleRemovePresentation(pIdx)}>
                              <ZnIcon icon={CloseOutlined} />
                            </Button>
                          )}
                        </PresentationRow>
                      ))}

                      <Button type="button" variant="secondary" style={{ marginTop: 6, alignSelf: "flex-start" }} onClick={handleAddPresentation}>
                        <ZnIcon icon={PlusOutlined} /> {t("pages.precios.addPresentationBtn")}
                      </Button>
                    </FormGroup>

                    {/* Galería de Fotos (Hasta 3 imágenes por producto) */}
                    <FormGroup $fullWidth style={{ borderTop: "1px dashed #ddd", paddingTop: 12 }}>
                      <SectionSubTitle>
                        <ZnIcon icon={PictureOutlined} /> {t("pages.precios.galleryTitle")}
                      </SectionSubTitle>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploading || currentEditingImages.length >= 3}
                      />
                      <small style={{ color: "#666", fontSize: "0.8rem", marginTop: 4 }}>
                        {t("pages.precios.galleryRecommendation")}
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
                          <ZnIcon icon={LoadingOutlined} /> {t("pages.precios.savingBtn")}
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
                          {t("pages.precios.noPhotosLoaded")}
                        </small>
                      )}
                    </FormGroup>
                  </FormGrid>
                </ModalBody>

                <ModalFooter>
                  <Button type="button" variant="secondary" onClick={() => setEditingProduct(null)} disabled={isSaving}>
                    <ZnIcon icon={CloseOutlined} /> {t("pages.precios.cancelBtn")}
                  </Button>
                  <Button type="submit" disabled={!isFormValid || isSaving}>
                    <ZnIcon icon={isSaving ? LoadingOutlined : SaveOutlined} />
                    {isSaving ? t("pages.precios.savingBtn") : t("pages.precios.saveBtn")}
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
              <h3 style={{ margin: "12px 0 6px 0" }}>{t("pages.precios.confirmDeleteTitle")}</h3>
              <p style={{ color: "#666", fontSize: "0.9rem", margin: 0 }}>
                {t("pages.precios.confirmDeleteText")}
              </p>

              <DeleteProductCardPreview>
                <ThumbImage
                  src={deleteTarget.imagen || (deleteTarget.imagenes && deleteTarget.imagenes[0]) || NO_IMAGE_PLACEHOLDER}
                  alt={deleteTarget.titulo}
                  onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                    e.currentTarget.src = NO_IMAGE_PLACEHOLDER;
                  }}
                />
                <div>
                  <strong style={{ fontSize: "1rem" }}>{deleteTarget.titulo}</strong>
                  <br />
                  <small style={{ color: "#666" }}>
                    {deleteTarget.presentaciones?.[0]?.presentacion || deleteTarget.presentacion || t("pages.precios.unitPresentation")} — $
                    {(deleteTarget.presentaciones?.[0]?.precio ?? deleteTarget.precio ?? 0).toLocaleString("es-AR")}
                  </small>
                </div>
              </DeleteProductCardPreview>

              <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 16 }}>
                <Button variant="secondary" onClick={() => setDeleteTarget(null)} disabled={isDeletingProduct}>
                  <ZnIcon icon={CloseOutlined} /> {t("pages.precios.cancelBtn")}
                </Button>
                <Button variant="danger" onClick={confirmDeleteProduct} disabled={isDeletingProduct}>
                  <ZnIcon icon={isDeletingProduct ? LoadingOutlined : DeleteOutlined} />
                  {isDeletingProduct ? t("pages.precios.deletingBtn") : t("pages.precios.confirmDeleteBtn")}
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
