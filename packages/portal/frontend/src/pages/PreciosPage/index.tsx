import React, { useEffect, useState, useMemo } from "react";
import { createPortal } from "react-dom";
import { Helmet } from "react-helmet-async";
import type { Product, ProductPresentation } from "@factory/shared/types/products";
import { ZnIcon } from "@design-sys/atoms/ZnIcon";
import SEO from "../../components/SEO";
import { BRAND_CONFIG } from "@factory/shared/config/brand";
import { useTranslation } from "../../i18n/I18nProvider";
import {
  LockOutlined,
  SearchOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
  WhatsAppOutlined,
  ShareAltOutlined,
  LeftOutlined,
  RightOutlined,
  InfoCircleOutlined,
  CloseOutlined,
  FacebookOutlined,
  TwitterOutlined,
  SendOutlined,
  DownloadOutlined,
  CopyOutlined,
  CheckCircleOutlined,
  ZoomInOutlined,
  TagOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import {
  PageContainer,
  HeroSection,
  Title,
  Subtitle,
  AdminBadgeLink,
  ControlsBar,
  TopSearchRow,
  SearchInput,
  ControlsRight,
  SelectSort,
  ViewToggleGroup,
  ViewToggleButton,
  CategoryPillsBar,
  CategoryPill,
  CategoryGroupSection,
  CategoryGroupHeader,
  ProductsGrid,
  ProductCard,
  SkeletonCard,
  SkeletonBox,
  ImageContainer,
  ProductImage,
  GalleryThumbBar,
  GalleryThumbBtn,
  ZoomIconButton,
  ShareIconButton,
  ListShareBtn,
  CardContent,
  CategoryTagsContainer,
  CategoryTag,
  ProductTitle,
  ProductDescription,
  VarietiesContainer,
  VarietiesTitle,
  VarietyBadge,
  PresentationsList,
  PresentationRowItem,
  PresentationName,
  PresentationPrice,
  ActionRowGrid,
  WhatsAppBtn,
  ListViewContainer,
  ListTable,
  ListTh,
  ListTr,
  ListTd,
  PaginationContainer,
  PaginationControls,
  PageButton,
  PageSizeSelect,
  EmptyStateContainer,
  ModalOverlay,
  ModalContent,
  ModalImage,
  ModalCloseButton,
  ModalTitleText,
  ShareDialog,
  ShareHeader,
  ShareTitle,
  ShareCardPreview,
  ShareCardThumb,
  ShareCardInfo,
  ShareGrid,
  ShareOptionBtn,
  CopyBox,
  LegalDisclaimerCard,
  LegalDisclaimerTitle,
  LegalDisclaimerText,
  LegalLink,
  SnackbarContainer,
} from "./PreciosPage.styles";

const NO_IMAGE_PLACEHOLDER =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'><rect width='300' height='300' fill='%23f3f4f6'/><g fill='%239ca3af' transform='translate(100, 70)'><rect x='10' y='10' width='80' height='80' rx='8' fill='none' stroke='%239ca3af' stroke-width='4'/><circle cx='35' cy='35' r='8'/><path d='M20 75 L45 45 L60 60 L75 45 L80 75 Z'/></g><text x='150' y='200' font-size='16' font-weight='600' font-family='sans-serif' fill='%236b7280' text-anchor='middle'>Sin Imagen</text></svg>";

const ProductCardItem: React.FC<{
  product: Product;
  onOpenLightbox: (url: string, title: string) => void;
  onShare: (product: Product) => void;
}> = ({ product, onOpenLightbox, onShare }) => {
  const { t } = useTranslation();
  const imagenes = product.imagenes && product.imagenes.length > 0 ? product.imagenes : (product.imagen ? [product.imagen] : []);
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  const currentImg = imagenes[activeImgIndex] || product.imagen || NO_IMAGE_PLACEHOLDER;
  const presentaciones =
    product.presentaciones && product.presentaciones.length > 0
      ? product.presentaciones
      : [{ presentacion: product.presentacion || t("pages.precios.unitPresentation"), precio: product.precio ?? 0 }];

  const prodCategories = product.categorias && product.categorias.length > 0 ? product.categorias : (product.categoria ? [product.categoria] : []);

  const waMessage = encodeURIComponent(
    `Hola! Quisiera realizar un pedido de: ${product.titulo}`
  );
  const waLink = `${BRAND_CONFIG.whatsappUrl}?text=${waMessage}`;

  return (
    <ProductCard>
      <ImageContainer onClick={() => onOpenLightbox(currentImg, product.titulo)}>
        <ProductImage
          src={currentImg}
          alt={product.titulo}
          loading="lazy"
          decoding="async"
          onError={(e) => {
            e.currentTarget.src = NO_IMAGE_PLACEHOLDER;
          }}
        />
        <ZoomIconButton
          type="button"
          title="Ampliar imagen"
          onClick={(e) => {
            e.stopPropagation();
            onOpenLightbox(currentImg, product.titulo);
          }}
        >
          <ZnIcon icon={ZoomInOutlined} />
        </ZoomIconButton>
        <ShareIconButton
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onShare(product);
          }}
          title="Compartir producto"
        >
          <ZnIcon icon={ShareAltOutlined} />
        </ShareIconButton>
      </ImageContainer>

      {imagenes.length > 1 && (
        <GalleryThumbBar>
          {imagenes.map((imgUrl, idx) => (
            <GalleryThumbBtn
              key={idx}
              $active={idx === activeImgIndex}
              onClick={() => setActiveImgIndex(idx)}
            >
              <img src={imgUrl} alt={`Miniatura ${idx + 1}`} />
            </GalleryThumbBtn>
          ))}
        </GalleryThumbBar>
      )}

      <CardContent>
        {prodCategories.length > 0 && (
          <CategoryTagsContainer>
            {prodCategories.map((cat, cIdx) => (
              <CategoryTag key={cIdx}>{cat}</CategoryTag>
            ))}
          </CategoryTagsContainer>
        )}

        <ProductTitle>{product.titulo}</ProductTitle>
        <ProductDescription>{product.descripcion}</ProductDescription>

        {product.variedades && product.variedades.length > 0 && (
          <VarietiesContainer>
            <VarietiesTitle>
              <ZnIcon icon={TagOutlined} /> {t("pages.precios.availableVarieties")}
            </VarietiesTitle>
            {product.variedades.map((v, vIdx) => (
              <VarietyBadge key={vIdx}>{v}</VarietyBadge>
            ))}
          </VarietiesContainer>
        )}

        <PresentationsList>
          {presentaciones.map((p, pIdx) => (
            <PresentationRowItem key={pIdx}>
              <PresentationName>{p.presentacion}</PresentationName>
              <PresentationPrice>${p.precio.toLocaleString("es-AR")}*</PresentationPrice>
            </PresentationRowItem>
          ))}
        </PresentationsList>

        <ActionRowGrid>
          <WhatsAppBtn href={waLink} target="_blank" rel="noopener noreferrer">
            <ZnIcon icon={WhatsAppOutlined} /> {t("pages.precios.orderWhatsApp")}
          </WhatsAppBtn>
          <ListShareBtn type="button" onClick={() => onShare(product)} title="Compartir">
            <ZnIcon icon={ShareAltOutlined} />
          </ListShareBtn>
        </ActionRowGrid>
      </CardContent>
    </ProductCard>
  );
};

export const PreciosPage: React.FC = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"cards" | "list">("cards");
  const [selectedCategory, setSelectedCategory] = useState<string>("Todas");
  const [sortBy, setSortBy] = useState<string>("orden");
  const [selectedImage, setSelectedImage] = useState<{ url: string; title: string } | null>(null);
  const [shareProduct, setShareProduct] = useState<Product | null>(null);

  // Estados de Paginación y Renderizado Optimizados
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(12); // 12 por defecto para carga ultrarrápida en mobile

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setProducts(data.data);
        }
      })
      .catch((err) => console.error("Error cargando productos:", err))
      .finally(() => setLoading(false));
  }, []);

  // Resetear a la página 1 cuando cambia algún filtro
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategory, sortBy, pageSize]);

  // Lista dinámica de categorías únicas existentes en la BBD
  const categoriesList = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      if (p.categorias && Array.isArray(p.categorias)) {
        p.categorias.forEach((c) => c && set.add(c.trim()));
      } else if (p.categoria && p.categoria.trim()) {
        set.add(p.categoria.trim());
      }
    });
    return ["Todas", ...Array.from(set)];
  }, [products]);

  // Filtrado y Ordenamiento Combinado
  const processedProducts = useMemo(() => {
    let result = products.filter((p) => p.disponible !== false);

    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.titulo.toLowerCase().includes(q) ||
          p.descripcion.toLowerCase().includes(q) ||
          (p.categoria && p.categoria.toLowerCase().includes(q)) ||
          (p.categorias && p.categorias.some((c) => c.toLowerCase().includes(q))) ||
          (p.variedades && p.variedades.some((v) => v.toLowerCase().includes(q)))
      );
    }

    if (selectedCategory !== "Todas") {
      result = result.filter((p) => {
        if (p.categorias && Array.isArray(p.categorias) && p.categorias.length > 0) {
          return p.categorias.includes(selectedCategory);
        }
        return p.categoria === selectedCategory;
      });
    }

    return [...result].sort((a, b) => {
      const priceA = a.presentaciones?.[0]?.precio ?? a.precio ?? 0;
      const priceB = b.presentaciones?.[0]?.precio ?? b.precio ?? 0;

      if (sortBy === "precio-asc") return priceA - priceB;
      if (sortBy === "precio-desc") return priceB - priceA;
      if (sortBy === "nombre") return a.titulo.localeCompare(b.titulo);
      if (sortBy === "categoria") return (a.categoria || "").localeCompare(b.categoria || "");
      return (a.orden ?? 0) - (b.orden ?? 0);
    });
  }, [products, search, selectedCategory, sortBy]);

  // Cálculo de Paginación
  const totalItems = processedProducts.length;
  const totalPages = pageSize > 0 ? Math.ceil(totalItems / pageSize) : 1;

  const paginatedProducts = useMemo(() => {
    if (pageSize <= 0) return processedProducts;
    const startIndex = (currentPage - 1) * pageSize;
    return processedProducts.slice(startIndex, startIndex + pageSize);
  }, [processedProducts, currentPage, pageSize]);

  // Agrupamiento por Categorías para los productos paginados
  const groupedProducts = useMemo(() => {
    if (selectedCategory !== "Todas") {
      return { [selectedCategory]: paginatedProducts };
    }
    const groups: { [key: string]: Product[] } = {};
    paginatedProducts.forEach((p) => {
      const mainCat = p.categorias?.[0] || p.categoria || "Especialidades";
      if (!groups[mainCat]) groups[mainCat] = [];
      groups[mainCat].push(p);
    });
    return groups;
  }, [paginatedProducts, selectedCategory]);

  const getPortalTarget = (): Element => {
    return document.getElementById("floating-elements") || document.body;
  };

  const getShareText = (prod: Product) => {
    const presentacionesStr = (prod.presentaciones || [])
      .map((p) => `${p.presentacion}: $${p.precio.toLocaleString("es-AR")}`)
      .join(" | ");

    const variedadesStr =
      prod.variedades && prod.variedades.length > 0 ? ` (Sabores: ${prod.variedades.join(", ")})` : "";

    return `🍝 *${prod.titulo}* - Simón Pastas Artesanales\n${prod.descripcion}${variedadesStr}\n💰 Precios: ${presentacionesStr}\n📍 Catálogo y Pedidos: ${window.location.origin}/precios`;
  };

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showShareToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCopyText = (textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy);
    showShareToast("¡Ficha copiada! Lista para pegar.");
  };

  const handleDownloadImage = async (imgUrl: string, title: string) => {
    try {
      showShareToast("Descargando imagen...");
      const res = await fetch(imgUrl);
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      const fileName = `${title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "-")}.webp`;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
      showShareToast("¡Foto descargada a tu dispositivo!");
    } catch (err) {
      window.open(imgUrl, "_blank");
    }
  };

  const handleNativeShare = async (prod: Product) => {
    const imgUrl = (prod.imagenes && prod.imagenes[0]) || prod.imagen;
    const text = getShareText(prod);

    if (navigator.share) {
      try {
        if (imgUrl && navigator.canShare) {
          const response = await fetch(imgUrl);
          const blob = await response.blob();
          const file = new File([blob], `${prod.titulo.toLowerCase().replace(/[^a-z0-9]/g, "-")}.webp`, {
            type: blob.type || "image/webp",
          });

          if (navigator.canShare({ files: [file] })) {
            await navigator.share({
              title: `${prod.titulo} | Simón Pastas`,
              text: text,
              files: [file],
            });
            return;
          }
        }
        await navigator.share({
          title: `${prod.titulo} | Simón Pastas`,
          text: text,
          url: `${window.location.origin}/precios`,
        });
      } catch (err) {
        // Ignorar cancelación del usuario
      }
    }
  };

  const structuredCatalogData = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "name": "Lista Oficial de Precios - Simón Pastas Artesanales",
    "url": "https://simonpastasartesanales.com.ar/precios",
    "numberOfItems": products.length,
    "itemListElement": products.map((prod, idx) => ({
      "@type": "Offer",
      "position": idx + 1,
      "price": prod.presentaciones?.[0]?.precio ?? prod.precio ?? 0,
      "priceCurrency": "ARS",
      "availability": prod.disponible !== false ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "itemOffered": {
        "@type": "Product",
        "name": prod.titulo,
        "description": prod.descripcion,
        "image": prod.imagen || undefined,
      },
    })),
  };

  return (
    <PageContainer>
      <SEO
        title={`Lista de Precios de Pastas Frescas y Mayorista | Sorrentinos, Ravioles & Empanadas | ${BRAND_CONFIG.siteName}`}
        description="Catálogo oficial y lista de precios de fábrica de pastas artesanales. Sorrentinos caseros, ravioles, ñoquis del 29, panzottis, fideos al huevo y empanadas. Venta minorista, delivery y distribución al por mayor para restaurantes en Zona Sur."
        keywords={[
          "lista de precios pastas",
          "precios sorrentinos",
          "ravioles bernal precios",
          "venta de pastas al por mayor",
          "proveedor de pastas para restaurantes",
          "fábrica de pastas quilmes",
          "comprar pastas artesanales",
          "delivery de pastas frescas",
          "ñoquis del 29",
        ]}
        structuredData={structuredCatalogData}
      />

      <HeroSection>
        <Title>{t("pages.precios.badge")}</Title>
        <Subtitle>
          {t("pages.precios.heroSubtitle")}
        </Subtitle>
        <div style={{ marginTop: 20 }}>
          <AdminBadgeLink href="/admin/precios">
            <ZnIcon icon={LockOutlined} /> {t("pages.precios.adminBadge")}
          </AdminBadgeLink>
        </div>
      </HeroSection>

      <ControlsBar>
        <TopSearchRow>
          <SearchInput
            type="text"
            placeholder={t("pages.precios.searchPlaceholder")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <ControlsRight>
            <SelectSort value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="orden">{t("pages.precios.sortDefault")}</option>
              <option value="precio-asc">{t("pages.precios.sortPriceAsc")}</option>
              <option value="precio-desc">{t("pages.precios.sortPriceDesc")}</option>
              <option value="nombre">{t("pages.precios.sortTitleAsc")}</option>
              <option value="categoria">{t("pages.precios.categoryColumn")}</option>
            </SelectSort>

            <ViewToggleGroup>
              <ViewToggleButton $active={viewMode === "cards"} onClick={() => setViewMode("cards")}>
                <ZnIcon icon={AppstoreOutlined} /> {t("pages.precios.viewCards")}
              </ViewToggleButton>
              <ViewToggleButton $active={viewMode === "list"} onClick={() => setViewMode("list")}>
                <ZnIcon icon={UnorderedListOutlined} /> {t("pages.precios.viewList")}
              </ViewToggleButton>
            </ViewToggleGroup>
          </ControlsRight>
        </TopSearchRow>

        {/* Barra de Pills de Categorías Dinámicas */}
        {categoriesList.length > 1 && (
          <CategoryPillsBar>
            {categoriesList.map((cat, idx) => (
              <CategoryPill
                key={idx}
                $active={selectedCategory === cat}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat === "Todas" ? t("pages.precios.filterAll") : cat}
              </CategoryPill>
            ))}
          </CategoryPillsBar>
        )}
      </ControlsBar>

      {/* SKELETON LOADER EN CASO DE CARGA INICIAL (Cero Parpadeos) */}
      {loading ? (
        viewMode === "cards" ? (
          <ProductsGrid>
            {[1, 2, 3, 4, 5, 6].map((key) => (
              <SkeletonCard key={key}>
                <SkeletonBox $h="180px" />
                <SkeletonBox $h="20px" $w="70%" />
                <SkeletonBox $h="14px" $w="90%" />
                <SkeletonBox $h="14px" $w="50%" />
                <SkeletonBox $h="40px" style={{ marginTop: "auto" }} />
              </SkeletonCard>
            ))}
          </ProductsGrid>
        ) : (
          <ListViewContainer>
            <div style={{ padding: 24, textAlign: "center", color: "#888" }}>
              <ZnIcon icon={LoadingOutlined} style={{ fontSize: "1.8rem", marginBottom: 8 }} />
              <br />
              Cargando catálogo oficial de pastas...
            </div>
          </ListViewContainer>
        )
      ) : processedProducts.length === 0 ? (
        <EmptyStateContainer>
          <InfoCircleOutlined style={{ fontSize: "2.5rem", color: "#ccc", marginBottom: 12 }} />
          <h3>No se encontraron productos</h3>
          <p style={{ margin: 0 }}>Intenta modificar los términos de búsqueda o cambiar de categoría.</p>
        </EmptyStateContainer>
      ) : viewMode === "cards" ? (
        /* VISTA DE TARJETAS (CARDS VIEW) */
        <div>
          {Object.entries(groupedProducts).map(([catTitle, groupProds]) => (
            <CategoryGroupSection key={catTitle}>
              {selectedCategory === "Todas" && (
                <CategoryGroupHeader>
                  {catTitle} <small style={{ fontSize: "0.85rem", color: "#888", fontWeight: 500 }}>({groupProds.length})</small>
                </CategoryGroupHeader>
              )}
              <ProductsGrid>
                {groupProds.map((product) => (
                  <ProductCardItem
                    key={product.id}
                    product={product}
                    onOpenLightbox={(url, title) => setSelectedImage({ url, title })}
                    onShare={(prod) => setShareProduct(prod)}
                  />
                ))}
              </ProductsGrid>
            </CategoryGroupSection>
          ))}
        </div>
      ) : (
        /* VISTA DE LISTA MENÚ RÁPIDO */
        <ListViewContainer>
          <ListTable>
            <thead>
              <tr>
                <ListTh style={{ width: "160px" }}>{t("pages.precios.categoryColumn")}</ListTh>
                <ListTh>{t("pages.precios.productAndDescColumn")}</ListTh>
                <ListTh>{t("pages.precios.varietiesColumn")}</ListTh>
                <ListTh>{t("pages.precios.presentationsAndPricesColumn")}</ListTh>
                <ListTh style={{ width: "180px", textAlign: "center" }}>{t("pages.precios.actionColumn")}</ListTh>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.map((product) => {
                const presentaciones =
                  product.presentaciones && product.presentaciones.length > 0
                    ? product.presentaciones
                    : [{ presentacion: product.presentacion || t("pages.precios.unitPresentation"), precio: product.precio ?? 0 }];

                const prodCategories = product.categorias && product.categorias.length > 0 ? product.categorias : (product.categoria ? [product.categoria] : []);

                const waMessage = encodeURIComponent(
                  `Hola! Quisiera realizar un pedido de: ${product.titulo}`
                );
                const waLink = `${BRAND_CONFIG.whatsappUrl}?text=${waMessage}`;

                return (
                  <ListTr key={product.id}>
                    <ListTd>
                      {prodCategories.length > 0 ? (
                        <CategoryTagsContainer>
                          {prodCategories.map((c: string, cIdx: number) => (
                            <CategoryTag key={cIdx}>{c}</CategoryTag>
                          ))}
                        </CategoryTagsContainer>
                      ) : (
                        <small style={{ color: "#999" }}>{t("pages.precios.generalCategory")}</small>
                      )}
                    </ListTd>
                    <ListTd>
                      <div>
                        <strong style={{ fontSize: "1rem" }}>{product.titulo}</strong>
                      </div>
                      <small style={{ color: "#666" }}>{product.descripcion}</small>
                    </ListTd>
                    <ListTd>
                      {product.variedades && product.variedades.length > 0 ? (
                        product.variedades.map((v: string, vIdx: number) => <VarietyBadge key={vIdx}>{v}</VarietyBadge>)
                      ) : (
                        <small style={{ color: "#888" }}>{t("pages.precios.traditionalVariety")}</small>
                      )}
                    </ListTd>
                    <ListTd>
                      {presentaciones.map((p: ProductPresentation, pIdx: number) => (
                        <div key={pIdx} style={{ marginBottom: 4 }}>
                          <strong>{p.presentacion}</strong>: ${p.precio.toLocaleString("es-AR")}*
                        </div>
                      ))}
                    </ListTd>
                    <ListTd style={{ textAlign: "center" }}>
                      <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
                        <WhatsAppBtn href={waLink} target="_blank" rel="noopener noreferrer">
                          <ZnIcon icon={WhatsAppOutlined} /> {t("pages.precios.orderBtn")}
                        </WhatsAppBtn>
                        <ListShareBtn
                          type="button"
                          onClick={() => setShareProduct(product)}
                          title="Compartir producto"
                        >
                          <ZnIcon icon={ShareAltOutlined} />
                        </ListShareBtn>
                      </div>
                    </ListTd>
                  </ListTr>
                );
              })}
            </tbody>
          </ListTable>
        </ListViewContainer>
      )}

      {/* BARRA DE PAGINACIÓN Y CONTROL DE PRODUCTOS POR PÁGINA */}
      {!loading && processedProducts.length > 0 && (
        <PaginationContainer>
          <div style={{ fontSize: "0.875rem", color: "#666", fontWeight: 500 }}>
            Mostrando {pageSize > 0 ? `${(currentPage - 1) * pageSize + 1} - ${Math.min(currentPage * pageSize, totalItems)}` : totalItems} de {totalItems} pastas
          </div>

          {totalPages > 1 && (
            <PaginationControls>
              <PageButton
                type="button"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                aria-label="Página anterior"
              >
                <ZnIcon icon={LeftOutlined} />
              </PageButton>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <PageButton
                  key={pageNum}
                  type="button"
                  $active={pageNum === currentPage}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </PageButton>
              ))}

              <PageButton
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                aria-label="Página siguiente"
              >
                <ZnIcon icon={RightOutlined} />
              </PageButton>
            </PaginationControls>
          )}

          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.85rem", color: "#666" }}>
            <span>Mostrar por página:</span>
            <PageSizeSelect
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              <option value={12}>12 productos</option>
              <option value={24}>24 productos</option>
              <option value={48}>48 productos</option>
              <option value={0}>Ver Todos</option>
            </PageSizeSelect>
          </div>
        </PaginationContainer>
      )}

      {/* Tarjeta de Aviso Legal */}
      <LegalDisclaimerCard>
        <LegalDisclaimerTitle>
          <ZnIcon icon={InfoCircleOutlined} /> {t("pages.precios.legalDisclaimerTitle")}
        </LegalDisclaimerTitle>
        <LegalDisclaimerText>
          {t("pages.precios.legalDisclaimerText")} Consulte nuestros <LegalLink href="/legal/terms">Términos y Condiciones</LegalLink>.
        </LegalDisclaimerText>
      </LegalDisclaimerCard>

      {/* Modal Lightbox */}
      {selectedImage &&
        createPortal(
          <ModalOverlay onClick={() => setSelectedImage(null)}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <ModalCloseButton type="button" onClick={() => setSelectedImage(null)}>
                <ZnIcon icon={CloseOutlined} />
              </ModalCloseButton>
              <ModalImage src={selectedImage.url} alt={selectedImage.title} />
              <ModalTitleText>{selectedImage.title}</ModalTitleText>
            </ModalContent>
          </ModalOverlay>,
          getPortalTarget()
        )}

      {/* Modal de Compartir en Redes Sociales */}
      {shareProduct &&
        createPortal(
          <ModalOverlay onClick={() => setShareProduct(null)}>
            <ShareDialog onClick={(e) => e.stopPropagation()}>
              <ShareHeader>
                <ShareTitle>
                  <ZnIcon icon={ShareAltOutlined} /> {t("pages.precios.shareTitle")}
                </ShareTitle>
                <ModalCloseButton
                  type="button"
                  onClick={() => setShareProduct(null)}
                  style={{ position: "static", color: "#666", fontSize: "1.2rem" }}
                >
                  <ZnIcon icon={CloseOutlined} />
                </ModalCloseButton>
              </ShareHeader>

              <ShareCardPreview>
                <ShareCardThumb
                  src={
                    (shareProduct.imagenes && shareProduct.imagenes[0]) ||
                    shareProduct.imagen ||
                    NO_IMAGE_PLACEHOLDER
                  }
                  alt={shareProduct.titulo}
                  onError={(e) => {
                    e.currentTarget.src = NO_IMAGE_PLACEHOLDER;
                  }}
                />
                <ShareCardInfo>
                  <strong style={{ fontSize: "1rem" }}>{shareProduct.titulo}</strong>
                  <small style={{ color: "#666" }}>
                    {shareProduct.presentaciones?.[0]?.presentacion || shareProduct.presentacion || t("pages.precios.unitPresentation")} — $
                    {(shareProduct.presentaciones?.[0]?.precio ?? shareProduct.precio ?? 0).toLocaleString("es-AR")}
                  </small>
                </ShareCardInfo>
              </ShareCardPreview>

              <ShareGrid>
                {/* 1. WhatsApp */}
                <ShareOptionBtn
                  $bg="#25d366"
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(getShareText(shareProduct))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ZnIcon icon={WhatsAppOutlined} /> {t("pages.precios.shareWhatsApp")}
                </ShareOptionBtn>

                {/* 2. Facebook */}
                <ShareOptionBtn
                  $bg="#1877f2"
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    `${window.location.origin}/precios`
                  )}&quote=${encodeURIComponent(getShareText(shareProduct))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ZnIcon icon={FacebookOutlined} /> {t("pages.precios.shareFacebook")}
                </ShareOptionBtn>

                {/* 3. Threads */}
                <ShareOptionBtn
                  $bg="#000000"
                  href={`https://threads.net/intent/post?text=${encodeURIComponent(getShareText(shareProduct))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ZnIcon icon={SendOutlined} /> {t("pages.precios.shareThreads")}
                </ShareOptionBtn>

                {/* 4. X (Twitter) */}
                <ShareOptionBtn
                  $bg="#1da1f2"
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(getShareText(shareProduct))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ZnIcon icon={TwitterOutlined} /> {t("pages.precios.shareTwitter")}
                </ShareOptionBtn>

                {/* 5. Telegram */}
                <ShareOptionBtn
                  $bg="#0088cc"
                  href={`https://t.me/share/url?url=${encodeURIComponent(
                    `${window.location.origin}/precios`
                  )}&text=${encodeURIComponent(getShareText(shareProduct))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ZnIcon icon={SendOutlined} /> {t("pages.precios.shareTelegram")}
                </ShareOptionBtn>
              </ShareGrid>

              {/* Botón de Compartir Nativo Mobile (Foto + Texto adjunto) si está disponible */}
              {typeof navigator !== "undefined" && typeof navigator.share === "function" && (
                <div style={{ marginBottom: 12 }}>
                  <ShareOptionBtn
                    $bg="#722ed1"
                    onClick={() => handleNativeShare(shareProduct)}
                    style={{ width: "100%" }}
                  >
                    <ZnIcon icon={ShareAltOutlined} /> {t("pages.precios.shareMobileNative")}
                  </ShareOptionBtn>
                </div>
              )}

              {/* Botón de 1-Click para Descargar la Imagen */}
              <div style={{ marginBottom: 12 }}>
                <ShareOptionBtn
                  $bg="#eb2f96"
                  onClick={() =>
                    handleDownloadImage(
                      (shareProduct.imagenes && shareProduct.imagenes[0]) ||
                        shareProduct.imagen ||
                        NO_IMAGE_PLACEHOLDER,
                      shareProduct.titulo
                    )
                  }
                  style={{ width: "100%" }}
                >
                  <ZnIcon icon={DownloadOutlined} /> {t("pages.precios.shareDownloadImg")}
                </ShareOptionBtn>
              </div>

              {/* Vista Previa del Texto y Botón de Copiar para Instagram / Historias */}
              <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#666", marginBottom: 4, display: "block" }}>
                Ficha lista para copiar y pegar:
              </label>
              <CopyBox>{getShareText(shareProduct)}</CopyBox>

              <ShareOptionBtn
                $bg="#fa8c16"
                onClick={() => handleCopyText(getShareText(shareProduct))}
                style={{ width: "100%" }}
              >
                <ZnIcon icon={CopyOutlined} /> {t("pages.precios.shareCopyText")}
              </ShareOptionBtn>
            </ShareDialog>
          </ModalOverlay>,
          getPortalTarget()
        )}

      {/* Snackbar Toast dinámico */}
      {toastMessage &&
        createPortal(
          <SnackbarContainer>
            <ZnIcon icon={CheckCircleOutlined} />
            <span>{toastMessage}</span>
          </SnackbarContainer>,
          getPortalTarget()
        )}
    </PageContainer>
  );
};

export default PreciosPage;
