import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SEO from "../../components/SEO";
import type { Product } from "@factory/shared/types/products";

import { BRAND_CONFIG } from "@factory/shared/config/brand";
import { ZnIcon } from "@design-sys/atoms/ZnIcon";
import { LockOutlined, WhatsAppOutlined, ZoomInOutlined, CloseOutlined, InfoCircleOutlined } from "@ant-design/icons";



const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.lg};
  min-height: 80vh;
`;

const HeroSection = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xl};
  padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.md};
  background: ${props => props.theme.gradients.glass};
  background-color: ${props => props.theme.colors.background.card};
  border-radius: ${props => props.theme.borderRadius.xl};
  border: 1px solid ${props => props.theme.colors.border.normal};
  box-shadow: ${props => props.theme.shadows.medium};
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: ${props => props.theme.spacing.xs};
  font-weight: ${props => props.theme.typography.fontWeight.bold};

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.text.secondary};
  max-width: 600px;
  margin: 0 auto;
`;

const AdminBadgeLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: ${props => props.theme.colors.primary[50]};
  color: ${props => props.theme.colors.primary[700]};
  border-radius: ${props => props.theme.borderRadius.xl};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  text-decoration: none;
  border: 1px solid ${props => props.theme.colors.primary[300]};
  transition: all ${props => props.theme.transitions.normal};

  &:hover {
    background-color: ${props => props.theme.colors.primary[100]};
  }
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const SearchInput = styled.input`
  width: 100%;
  max-width: 450px;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  border: 1px solid ${props => props.theme.colors.border.normal};
  background-color: ${props => props.theme.colors.background.card};
  color: ${props => props.theme.colors.text.primary};
  border-radius: 30px;
  font-size: 1rem;
  outline: none;
  box-shadow: ${props => props.theme.shadows.light};
  transition: all ${props => props.theme.transitions.normal};

  &:focus {
    border-color: ${props => props.theme.colors.primary[500]};
    box-shadow: ${props => props.theme.effects.glow.primary};
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${props => props.theme.spacing.lg};
`;

const ProductCard = styled.div`
  background: ${props => props.theme.colors.background.card};
  border: 1px solid ${props => props.theme.colors.border.normal};
  border-radius: ${props => props.theme.borderRadius.lg};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: ${props => props.theme.shadows.light};
  transition: transform ${props => props.theme.transitions.normal}, box-shadow ${props => props.theme.transitions.normal};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.medium};
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 240px;
  background-color: ${props => props.theme.colors.background.secondary};
  overflow: hidden;
  border-top-left-radius: ${props => props.theme.borderRadius.lg};
  border-top-right-radius: ${props => props.theme.borderRadius.lg};
  cursor: pointer;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease-in-out;

  @media (min-width: 769px) {
    ${ImageContainer}:hover & {
      transform: scale(1.6);
      transform-origin: center center;
    }
  }
`;

const ZoomIconButton = styled.button`
  position: absolute;
  bottom: 12px;
  right: 12px;
  background-color: rgba(0, 0, 0, 0.65);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);
  transition: all 0.2s ease;
  z-index: 2;

  &:hover {
    background-color: ${props => props.theme.colors.primary[500]};
    transform: scale(1.1);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: ${props => props.theme.spacing.md};
  backdrop-filter: blur(6px);
  animation: fadeIn 0.2s ease-in-out;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const ModalContent = styled.div`
  position: relative;
  max-width: 90vw;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalImage = styled.img`
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: -45px;
  right: 0;
  background: rgba(255, 255, 255, 0.2);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.theme.colors.error[500]};
    border-color: ${props => props.theme.colors.error[500]};
  }
`;

const ModalTitle = styled.h3`
  color: #ffffff;
  margin-top: ${props => props.theme.spacing.md};
  font-size: 1.2rem;
  text-align: center;
`;


const CardContent = styled.div`
  padding: ${props => props.theme.spacing.md};
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const ProductHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${props => props.theme.spacing.xs};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const ProductTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text.primary};
  margin: 0;
`;

const PresentationBadge = styled.span`
  background-color: ${props => props.theme.colors.primary[50]};
  color: ${props => props.theme.colors.primary[700]};
  font-size: 0.8rem;
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  padding: 4px 8px;
  border-radius: ${props => props.theme.borderRadius.sm};
  white-space: nowrap;
`;

const ProductDescription = styled.p`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: ${props => props.theme.spacing.md};
  flex-grow: 1;
  line-height: 1.4;
`;

const ProductFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: ${props => props.theme.spacing.xs};
  border-top: 1px solid ${props => props.theme.colors.border.normal};
`;

const PriceTag = styled.div`
  font-size: 1.4rem;
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.primary[500]};
`;

const WhatsAppBtn = styled.a`
  background-color: #25d366;
  color: #ffffff;
  padding: 8px 14px;
  border-radius: 20px;
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #128c7e;
  }
`;

const LoadingText = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.xl};
  font-size: 1.2rem;
  color: ${props => props.theme.colors.text.secondary};
`;

const LegalDisclaimerCard = styled.div`
  margin-top: ${props => props.theme.spacing.xl};
  padding: ${props => props.theme.spacing.lg};
  background-color: ${props => props.theme.colors.background.card};
  border: 1px solid ${props => props.theme.colors.border.normal};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.small};
`;

const LegalDisclaimerTitle = styled.h4`
  font-size: 0.95rem;
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: ${props => props.theme.spacing.xs};
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LegalDisclaimerText = styled.p`
  font-size: 0.825rem;
  color: ${props => props.theme.colors.text.secondary};
  line-height: 1.6;
  margin: 0;
`;

const LegalLink = styled.a`
  color: ${props => props.theme.colors.primary[500]};
  text-decoration: underline;
  margin-left: 4px;
  font-weight: 500;
  &:hover {
    color: ${props => props.theme.colors.primary[700]};
  }
`;


export const PreciosPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<{ url: string; title: string } | null>(null);

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

  const filteredProducts = products.filter(
    (p) =>
      p.disponible !== false &&
      (p.titulo.toLowerCase().includes(search.toLowerCase()) ||
        p.descripcion.toLowerCase().includes(search.toLowerCase()))
  );

  const structuredCatalogData = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "name": "Lista Oficial de Precios - Simón Pastas Artesanales",
    "url": "https://simonpastasartesanales.com.ar/precios",
    "numberOfItems": products.length,
    "itemListElement": products.map((prod, idx) => ({
      "@type": "Offer",
      "position": idx + 1,
      "price": prod.precio,
      "priceCurrency": "ARS",
      "availability": prod.disponible !== false ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "itemOffered": {
        "@type": "Product",
        "name": prod.titulo,
        "description": prod.descripcion,
        "image": prod.imagen
      }
    }))
  };

  return (
    <PageContainer>
      <SEO
        title={`Lista de Precios de Pastas Frescas y Mayorista | Sorrentinos, Ravioles & Empanadas | ${BRAND_CONFIG.siteName}`}
        description="Catálogo oficial y lista de precios de fábrica de pastas artesanales. Sorrentinos caseros, ravioles, ñoquis del 29, panzottis, fideos al huevo y empanadas. Venta minorista, delivery y distribución al por mayor para restaurantes en Zona Sur."
        keywords={["lista de precios pastas", "precios sorrentinos", "ravioles bernal precios", "venta de pastas al por mayor", "proveedor de pastas para restaurantes", "fábrica de pastas quilmes", "comprar pastas artesanales", "delivery de pastas frescas", "ñoquis del 29"]}
        structuredData={structuredCatalogData}
      />


      <HeroSection>
        <Title>Lista de Precios Oficial</Title>
        <Subtitle>
          Pastas frescas artesanales elaboradas día a día con ingredientes seleccionados.
        </Subtitle>
        <div style={{ marginTop: 20 }}>
          <AdminBadgeLink href="/admin/precios">
            <ZnIcon icon={LockOutlined} /> Administrador
          </AdminBadgeLink>
        </div>
      </HeroSection>

      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Buscar pasta por nombre o ingrediente..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </SearchContainer>

      {loading ? (
        <LoadingText>Cargando listado de precios de Simón Pastas...</LoadingText>
      ) : filteredProducts.length === 0 ? (
        <LoadingText>No se encontraron productos disponibles.</LoadingText>
      ) : (
        <ProductsGrid>
          {filteredProducts.map((product) => {
            const waMessage = encodeURIComponent(
              `Hola! Quisiera consultar/encargar: ${product.titulo} (${product.presentacion})`
            );
            const waLink = `${BRAND_CONFIG.whatsappUrl}?text=${waMessage}`;
            const imageUrl = product.imagen || "https://res.cloudinary.com/ptgboslf/image/upload/v1700000000/simonpastas/default.jpg";

            return (
              <ProductCard key={product.id}>
                <ImageContainer onClick={() => setSelectedImage({ url: imageUrl, title: product.titulo })}>
                  <ProductImage
                    src={imageUrl}
                    alt={product.titulo}
                    loading="lazy"
                  />
                  <ZoomIconButton
                    type="button"
                    aria-label="Ver imagen ampliada"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage({ url: imageUrl, title: product.titulo });
                    }}
                  >
                    <ZnIcon icon={ZoomInOutlined} />
                  </ZoomIconButton>
                </ImageContainer>

                <CardContent>
                  <ProductHeader>
                    <ProductTitle>{product.titulo}</ProductTitle>
                    <PresentationBadge>{product.presentacion}</PresentationBadge>
                  </ProductHeader>
                  <ProductDescription>{product.descripcion}</ProductDescription>
                  <ProductFooter>
                    <PriceTag>${product.precio.toLocaleString("es-AR")}*</PriceTag>
                    <WhatsAppBtn href={waLink} target="_blank" rel="noopener noreferrer">
                      <ZnIcon icon={WhatsAppOutlined} /> Pedir
                    </WhatsAppBtn>
                  </ProductFooter>
                </CardContent>
              </ProductCard>
            );
          })}
        </ProductsGrid>
      )}

      {/* Tarjeta de Aviso Legal y Exención de Responsabilidad de Precios */}
      <LegalDisclaimerCard>
        <LegalDisclaimerTitle>
          <ZnIcon icon={InfoCircleOutlined} /> * Aviso Legal y Variación de Precios
        </LegalDisclaimerTitle>
        <LegalDisclaimerText>
          Los precios, presentaciones, promociones y disponibilidad de productos exhibidos en esta lista oficial están sujetos a modificaciones y ajustes sin previo aviso debido a variaciones de costos de insumos y mercado. Fábrica de Pastas Simón y la administración de la plataforma quedan exentas de toda responsabilidad civil, comercial o legal por eventuales errores tipográficos, desactualizaciones temporales o imponderables de stock. Para confirmar valores vigentes, cotizaciones especiales o pedidos mayoristas, consulte vía WhatsApp antes de concretar su compra. Consulte nuestros <LegalLink href="/legal/terms">Términos y Condiciones</LegalLink>.
        </LegalDisclaimerText>
      </LegalDisclaimerCard>

      {/* Modal Lightbox para ver la imagen en pantalla completa */}
      {selectedImage && (
        <ModalOverlay onClick={() => setSelectedImage(null)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalCloseButton type="button" onClick={() => setSelectedImage(null)}>
              <ZnIcon icon={CloseOutlined} />
            </ModalCloseButton>
            <ModalImage src={selectedImage.url} alt={selectedImage.title} />
            <ModalTitle>{selectedImage.title}</ModalTitle>
          </ModalContent>
        </ModalOverlay>
      )}
    </PageContainer>
  );
};

export default PreciosPage;

