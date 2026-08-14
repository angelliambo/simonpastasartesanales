import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import type { Product } from "@factory/shared/types/products";
import { BRAND_CONFIG } from "@factory/shared/config/brand";
import { ZnIcon } from "@design-sys/atoms/ZnIcon";
import { LockOutlined, WhatsAppOutlined } from "@ant-design/icons";


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

const ImageWrapper = styled.div`
  width: 100%;
  height: 200px;
  background-color: ${props => props.theme.colors.background.secondary};
  position: relative;
  overflow: hidden;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
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


export const PreciosPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

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

  return (
    <PageContainer>
      <Helmet>
        <title>Lista de Precios | {BRAND_CONFIG.siteName}</title>
        <meta
          name="description"
          content="Consulte la lista oficial de precios y productos artesanales de Simón Pastas. Sorrentinos, ravioles, ñoquis y tallarines frescos."
        />
      </Helmet>

      <HeroSection>
        <Title>Lista de Precios Oficial</Title>
        <Subtitle>
          Pastas frescas artesanales elaboradas día a día con ingredientes seleccionados.
        </Subtitle>
        <div style={{ marginTop: 20 }}>
          <AdminBadgeLink href="/admin/precios">
            <ZnIcon icon={LockOutlined} /> Acceso Administrador (Editar Precios / Fotos)
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


            return (
              <ProductCard key={product.id}>
                <ImageWrapper>
                  <ProductImage
                    src={product.imagen || "https://res.cloudinary.com/ptgboslf/image/upload/v1700000000/simonpastas/default.jpg"}
                    alt={product.titulo}
                    loading="lazy"
                  />
                </ImageWrapper>
                <CardContent>
                  <ProductHeader>
                    <ProductTitle>{product.titulo}</ProductTitle>
                    <PresentationBadge>{product.presentacion}</PresentationBadge>
                  </ProductHeader>
                  <ProductDescription>{product.descripcion}</ProductDescription>
                  <ProductFooter>
                    <PriceTag>${product.precio.toLocaleString("es-AR")}</PriceTag>
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
    </PageContainer>
  );
};

export default PreciosPage;
