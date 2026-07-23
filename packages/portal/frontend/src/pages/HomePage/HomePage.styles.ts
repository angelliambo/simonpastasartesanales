import styled, { css } from "styled-components";
import Button from '@design-sys/atoms/Button';
import { Row, Col } from '@design-sys/atoms/Grid';

export const VhSection = styled.section<{
  $visible?: boolean;
  $variant?: "default" | "alternate" | "accent";
}>`
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  
  /* Agregamos una separación lateral base para que NADA toque el borde de la pantalla */
  padding: 20px 24px; 
  
  position: relative;
  z-index: 1;
  background: ${({ $variant, theme }) => {
    if ($variant === "alternate") {
      return theme.colors.background.secondary || "#f8f9fa";
    }
    if ($variant === "accent") {
      return theme.colors.background.tertiary || "#e0e0e0";
    }
    return theme.colors.background.primary || "#ffffff";
  }};
  color: ${({ theme }) => theme.colors.text.primary};

  @media (max-height: 800px) {
    padding: 10px 24px;
  }
  @media (max-height: 700px) {
    padding: 5px 24px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    min-height: 100dvh;
    padding: 20px 16px; /* Separación lateral ligeramente más compacta en celulares */
  }
`;

export const HeroContent = styled.div`
  max-width: 640px;
  width: 100%;
  text-align: center;
`;

export const LogoWrapper = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 0 auto ${({ theme }) => theme.spacing.xxl};
  width: 100%;
  max-width: 380px;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 340px;
    height: 340px;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      rgba(173, 114, 49, 0.25) 0%,
      rgba(245, 242, 235, 0.15) 60%,
      transparent 100%
    );
    filter: blur(24px);
    z-index: 0;
    pointer-events: none;

    @media (max-height: 800px) {
      width: 260px;
      height: 260px;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      width: 220px;
      height: 220px;
      filter: blur(16px);
    }
  }
`;

export const Logo = styled.img`
  width: 280px;
  height: 280px;
  position: relative;
  z-index: 1;
  border-radius: 0;
  object-fit: contain;

  @media (max-height: 800px) {
    width: 220px;
    height: 220px;
  }
  @media (max-height: 700px) {
    width: 180px;
    height: 180px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 200px;
    height: 200px;
  }
`;

export const HeroTitle = styled.h1`
  font-size: 52px;
  font-weight: 800;
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
  line-height: 1.1;
  color: ${({ theme }) => theme.colors.text.primary};

  span {
    background: ${({ theme }) =>
    theme.gradients?.brand ||
    "linear-gradient(135deg, #60a5fa, #a78bfa, #f472b6)"};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  @media (max-height: 800px) {
    font-size: 38px;
    margin-bottom: 4px;
  }
  @media (max-height: 700px) {
    font-size: 30px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 36px;
  }
`;

export const HeroSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 18px;
  margin: 0 auto ${({ theme }) => theme.spacing.xl};
  max-width: 480px;
  line-height: 1.6;

  @media (max-height: 800px) {
    font-size: 15px;
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
  @media (max-height: 700px) {
    font-size: 14px;
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 16px;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

export const HeroActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: center;
  flex-wrap: wrap;
`;

const gradientBtnMixin = css`
  background: ${({ theme }) => theme.gradients.premium};
  color: #fff;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 14px 32px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  min-width: 180px;
  font-family: inherit;
  line-height: 1.4;
  box-shadow: ${({ theme }) =>
    theme.effects?.glow?.premium || "0 4px 12px rgba(168, 85, 247, 0.4)"};
  position: relative;
  overflow: hidden;

  @media (max-height: 800px) {
    padding: 10px 24px;
    font-size: 14px;
    min-width: 140px;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.15),
      transparent
    );
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${({ theme }) =>
    `0 8px 20px ${theme.effects?.glow?.premium || "rgba(168, 85, 247, 0.6)"}`};
    &::before {
      animation: shimmer 0.5s ease-out;
    }
  }
  &:active {
    transform: translateY(0);
  }

  @keyframes shimmer {
    from {
      left: -100%;
    }
    to {
      left: 100%;
    }
  }
`;

export const HeroOutlinedButton = styled(Button)`
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 14px 32px;
  font-size: 16px;
  font-weight: 600;
  min-width: 180px;
  font-family: inherit;
  line-height: 1.4;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  @media (max-height: 800px) {
    padding: 10px 24px;
    font-size: 14px;
    min-width: 140px;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.6);
    transform: translateY(-2px);
  }
`;

export const HeroPrimaryButton = styled(Button)`
  ${gradientBtnMixin}
`;

export const FeaturesInner = styled.div`
  width: 100%;
  
  /* Limitamos el ancho en pantallas grandes para que las cards no se estiren al infinito */
  max-width: 1200px;
  
  /* Centramos el bloque entero en medio del navegador */
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;
`;

export const FeaturesRow = styled(Row)`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin: 0;
`;

export const FeatureCol = styled(Col)`
  display: flex;
`;

export const CardInnerWrapper = styled.div`
  flex: 1;
  display: flex;
`;

export const CtaButtonContent = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
`;

export const MapContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
  width: 100%;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
`;

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};
  width: 100%;
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

export const ProductCard = styled.div`
  background: ${({ theme }) => theme.colors.background.secondary || "#f5f2eb"};
  border: 1px solid ${({ theme }) => theme.effects?.glassBorder || "rgba(0, 0, 0, 0.05)"};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
  }
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;

  @media (max-height: 800px) {
    height: 160px;
  }
  @media (max-height: 700px) {
    height: 130px;
  }
`;

export const ProductContent = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const ProductTitle = styled.h3`
  font-family: 'Playfair Display', 'Lora', serif;
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary?.[500] || "#193220"};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const ProductDescription = styled.p`
  font-size: 13px;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  flex-grow: 1;
`;

export const OrderButton = styled.a`
  width: 100%;
  background: ${({ theme }) => theme.colors.primary?.[500]};
  color: #fff !important;
  border: none;
  font-weight: 600;
  padding: 12px 16px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-decoration: none;
  transition: background 0.2s ease, transform 0.1s ease;
  line-height: 1;

  &:hover {
    background: ${({ theme }) => theme.colors.primary?.[600] || "#14291a"};
    color: #fff !important;
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1000px;
  width: 100%;
  margin: ${({ theme }) => theme.spacing.xl} auto 0;
  align-items: stretch;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const PricingCardSilverBorder = css`
  background:
    linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.06) 0%,
        rgba(255, 255, 255, 0.02) 100%
      )
      padding-box,
    linear-gradient(
        135deg,
        rgba(192, 192, 192, 0.25),
        rgba(255, 255, 255, 0.45),
        rgba(160, 160, 160, 0.2),
        rgba(212, 212, 212, 0.35),
        rgba(255, 255, 255, 0.3)
      )
      padding-box,
    ${({ theme }) => theme.colors.background.card || "#0e111a"} padding-box,
    linear-gradient(
        135deg,
        rgba(192, 192, 192, 0.4),
        rgba(255, 255, 255, 0.6),
        rgba(160, 160, 160, 0.3),
        rgba(212, 212, 212, 0.5),
        rgba(255, 255, 255, 0.4)
      )
      border-box;
  border: 3px solid transparent;
  box-shadow:
    0 0 0 3px rgba(192, 192, 192, 0.6),
    0 0 0 6px rgba(255, 255, 255, 0.08),
    0 0 50px rgba(192, 192, 192, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
`;

const PricingCardGoldBorder = css`
  background:
    linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.06) 0%,
        rgba(255, 255, 255, 0.02) 100%
      )
      padding-box,
    linear-gradient(
        135deg,
        rgba(191, 149, 63, 0.3),
        rgba(252, 246, 186, 0.45),
        rgba(179, 135, 40, 0.2),
        rgba(251, 245, 183, 0.35),
        rgba(170, 119, 28, 0.2)
      )
      padding-box,
    ${({ theme }) => theme.colors.background.card || "#0e111a"} padding-box,
    linear-gradient(
        135deg,
        rgba(191, 149, 63, 0.5),
        rgba(252, 246, 186, 0.7),
        rgba(179, 135, 40, 0.3),
        rgba(251, 245, 183, 0.5),
        rgba(170, 119, 28, 0.3)
      )
      border-box;
  border: 3px solid transparent;
  box-shadow:
    0 0 0 3px rgba(191, 149, 63, 0.7),
    0 0 0 6px rgba(255, 215, 0, 0.1),
    0 0 50px rgba(255, 215, 0, 0.25),
    inset 0 1px 0 rgba(255, 215, 0, 0.15);
`;

export const PricingCard = styled.div<{ $popular?: boolean; $bestValue?: boolean }>`
  border-radius: 1.5rem;
  padding: 2.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  transform: none;
  height: 100%;
  color: #fff;

  @media (max-height: 800px) {
    padding: 1.2rem 1rem;
    border-radius: 1rem;
  }
  @media (max-height: 700px) {
    padding: 0.8rem 0.8rem;
  }

  ${({ $popular, $bestValue, theme }) =>
    $popular
      ? PricingCardSilverBorder
      : $bestValue
        ? PricingCardGoldBorder
        : `
      background: ${theme.colors.background.card || "#ffffff"};
      border: 1px solid ${theme.colors.border.light || "#dee2e6"};
    `}

  &:hover {
    transform: translateY(-8px);
    ${({ $popular, $bestValue }) =>
    $popular
      ? "box-shadow: 0 0 0 3px rgba(192,192,192,0.6), 0 0 0 6px rgba(255,255,255,0.08), 0 0 60px rgba(192,192,192,0.3);"
      : $bestValue
        ? "box-shadow: 0 0 0 3px rgba(191,149,63,0.7), 0 0 0 6px rgba(255,215,0,0.1), 0 0 60px rgba(255,215,0,0.35);"
        : "box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.5); border-color: rgba(59,130,246,0.5);"}
  }
`;

export const PopularBadge = styled.span`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  background: linear-gradient(135deg, #a0a0a0, #d4d4d4, #c0c0c0);
  color: #1a1a1a;
  padding: 0.4rem 1.2rem;
  border-radius: 9999px;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  box-shadow: 0 2px 12px rgba(192, 192, 192, 0.4);
`;

export const BestValueBadge = styled.span`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  background: linear-gradient(135deg, #d4a843, #f7d875, #a67c28);
  color: #1a1200;
  padding: 0.4rem 1.2rem;
  border-radius: 9999px;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  box-shadow: 0 2px 16px rgba(212, 168, 67, 0.5);
`;

export const PlanName = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.3rem;
  color: ${({ theme }) => theme.colors.text.primary};

  @media (max-height: 800px) {
    font-size: 1.1rem;
    margin-bottom: 0.2rem;
  }
`;

export const PlanSubtitle = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;

  @media (max-height: 800px) {
    font-size: 0.8rem;
  }
`;

export const PriceContainer = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: center;
  margin: 1.5rem 0;

  @media (max-height: 800px) {
    margin: 0.6rem 0;
  }
  @media (max-height: 700px) {
    margin: 0.3rem 0;
  }
`;

export const Currency = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const PriceAmount = styled.span`
  font-size: 2.8rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text.primary};
  letter-spacing: -0.02em;

  @media (max-height: 800px) {
    font-size: 2rem;
  }
  @media (max-height: 700px) {
    font-size: 1.6rem;
  }
`;

export const BillingPeriod = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.text.tertiary};
  margin-left: 0.4rem;
`;

export const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
  flex-grow: 1;

  @media (max-height: 800px) {
    margin: 0.8rem 0;
  }
  @media (max-height: 700px) {
    margin: 0.4rem 0;
  }
`;

export const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 0.8rem;

  &::before {
    content: "✓";
    color: #22c55e;
    font-weight: bold;
    margin-right: 0.6rem;
    flex-shrink: 0;
  }

  @media (max-height: 800px) {
    margin-bottom: 0.4rem;
    font-size: 0.8rem;
  }
  @media (max-height: 700px) {
    margin-bottom: 0.2rem;
    font-size: 0.75rem;
  }
`;

export const FeatureDisabledItem = styled.li`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text.tertiary};
  margin-bottom: 0.8rem;

  &::before {
    content: "✕";
    color: #ef4444;
    font-weight: bold;
    margin-right: 0.6rem;
    flex-shrink: 0;
  }

  @media (max-height: 800px) {
    margin-bottom: 0.4rem;
    font-size: 0.8rem;
  }
  @media (max-height: 700px) {
    margin-bottom: 0.2rem;
    font-size: 0.75rem;
  }
`;

export const PricingButton = styled(Button) <{ $primary?: boolean }>`
  width: 100%;
  background: ${({ $primary, theme }) =>
    $primary
      ? (theme.gradients?.premium || "linear-gradient(135deg, #a855f7, #7c3aed)")
      : "rgba(255,255,255,0.08)"};
  color: #fff;
  border: none;
  padding: 0.85rem;
  border-radius: 1rem;
  font-size: 0.95rem;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  margin-top: auto;
  box-sizing: border-box;

  @media (max-height: 800px) {
    padding: 0.6rem;
    font-size: 0.85rem;
    border-radius: 0.6rem;
  }
  @media (max-height: 700px) {
    padding: 0.4rem;
  }

  &:hover {
    background: ${({ $primary, theme }) =>
    $primary
      ? (theme.gradients?.brand || "linear-gradient(135deg, #b967ff, #8b5cf6)")
      : "rgba(255,255,255,0.15)"};
    transform: translateY(-2px);
  }
`;

export const FreePricingButton = styled(PricingButton)`
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const TestimonialsRow = styled(Row)`
  max-width: 1000px;
  width: 100%;
  margin: ${({ theme }) => theme.spacing.xl} auto 0;

  @media (max-height: 800px) {
    margin-top: 1rem;
  }
`;

export const TestimonialCol = styled(Col)`
  display: flex;
`;

export const TestimonialCard = styled.div`
  flex: 1;
  background: ${({ theme }) => theme.colors.background.card || "#ffffff"};
  border: 1px solid ${({ theme }) => theme.colors.border.light || "#eef0f2"};
  border-radius: 16px;
  padding: ${({ theme }) => theme.spacing.lg};
  text-align: left;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-height: 800px) {
    padding: ${({ theme }) => theme.spacing.sm};
    border-radius: 12px;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
  }
`;

export const TestimonialQuote = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.7;
  margin: 0 0 ${({ theme }) => theme.spacing.md};
  font-style: italic;

  @media (max-height: 800px) {
    font-size: 12px;
    line-height: 1.5;
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }

  &::before {
    content: '"';
  }
  &::after {
    content: '"';
  }
`;

export const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const TestimonialAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1, #a855f7);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
`;

export const TestimonialName = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const TestimonialRole = styled.p`
  margin: 0;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.tertiary};
`;

export const SectionTitle = styled.h2`
  font-size: 32px;
  font-weight: 700;
  background: ${({ theme }) =>
    theme.gradients?.brand ||
    "linear-gradient(135deg, #60a5fa, #a78bfa, #f472b6)"};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 auto ${({ theme }) => theme.spacing.sm};
  text-align: center;

  @media (max-height: 800px) {
    font-size: 24px;
    margin-bottom: 4px;
  }
  @media (max-height: 700px) {
    font-size: 20px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 24px;
  }
`;

export const SectionSubtitle = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 500px;
  margin: 0 auto;
  text-align: center;

  @media (max-height: 800px) {
    font-size: 14px;
  }
  @media (max-height: 700px) {
    font-size: 12px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 14px;
    margin-bottom: 24px;
    padding: 0 16px;
  }
`;

export const CtaTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: inherit;
  margin: 0 auto ${({ theme }) => theme.spacing.sm};
  text-align: center;

  @media (max-height: 800px) {
    font-size: 22px;
  }
`;

export const CtaSubtitle = styled.p`
  font-size: 16px;
  color: inherit;
  opacity: 0.8;
  margin: 0 auto ${({ theme }) => theme.spacing.lg};
  max-width: 400px;
  text-align: center;

  @media (max-height: 800px) {
    font-size: 13px;
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

export const CtaButton = styled(Button)`
  ${gradientBtnMixin}
  min-width: 240px;
  margin: 0 auto;
  display: block;

  @media (max-height: 800px) {
    padding: 10px 24px;
    font-size: 14px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    min-width: 240px;
    width: auto;
    max-width: 100%;
  }
`;

export const ScrollNav = styled.nav`
  position: fixed;
  right: 24px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

export const ScrollDotWrapper = styled.div`
  position: relative;
`;

export const ScrollDot = styled.button<{ $active?: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid
    ${({ $active, theme }) => {
      if ($active) return theme.colors.primary[500];
      const bg = theme.colors?.background?.primary || "";
      const text = theme.colors?.text?.primary || "";
      const isDark = bg === "#111214" || bg === "#171717" || bg === "#0f172a" || text === "#fafafa" || text === "#ffffff" || text === "#f8fafc";
      return isDark ? "rgba(255, 255, 255, 0.4)" : "rgba(0,0,0,0.25)";
    }};
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primary[500] : "transparent"};
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  padding: 0;
  transform: ${({ $active }) => ($active ? "scale(1.4)" : "scale(1)")};
  box-shadow: ${({ $active, theme }) =>
    $active
      ? `0 0 8px ${theme.colors.primary[500]}99, 0 0 16px ${theme.colors.primary[500]}4D`
      : "none"};

  &:hover {
    background: ${({ $active, theme }) => {
      if ($active) return theme.colors.primary[500];
      const bg = theme.colors?.background?.primary || "";
      const text = theme.colors?.text?.primary || "";
      const isDark = bg === "#111214" || bg === "#171717" || bg === "#0f172a" || text === "#fafafa" || text === "#ffffff" || text === "#f8fafc";
      return isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0,0,0,0.08)";
    }};
    border-color: ${({ $active, theme }) => {
      if ($active) return theme.colors.primary[500];
      const bg = theme.colors?.background?.primary || "";
      const text = theme.colors?.text?.primary || "";
      const isDark = bg === "#111214" || bg === "#171717" || bg === "#0f172a" || text === "#fafafa" || text === "#ffffff" || text === "#f8fafc";
      return isDark ? "rgba(255, 255, 255, 0.7)" : "rgba(0,0,0,0.4)";
    }};
  }
`;

export const ScrollDotLabel = styled.span<{ $active?: boolean }>`
  position: absolute;
  right: 22px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 10px;
  color: ${({ $active, theme }) =>
    $active ? theme.colors.primary[500] : theme.colors.text.secondary};
  white-space: nowrap;
  pointer-events: none;
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  transition: opacity 0.2s;

  ${ScrollDot}:hover + & {
    opacity: 1;
  }
`;

export const HeroGoogleButtonWrapper = styled.div`
  display: inline-flex;
  align-self: center;
`;

export const MapFallback = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background.card || '#10141f'};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border || 'rgba(255, 255, 255, 0.1)'};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 16px;
  
  @media (max-width: 768px) {
    aspect-ratio: 4 / 3;
  }
`;

export const StatsRow = styled(Row)`
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
`;

export const StatCol = styled(Col)`
  display: flex;
  justify-content: center;
`;

export const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      rgba(96, 165, 250, 0.3) 0%,
      transparent 70%
    );
    pointer-events: none;
    z-index: 0;
  }

  > * {
    position: relative;
    z-index: 1;
  }
`;

export const StatNumber = styled.span<{ $large?: boolean }>`
  font-size: 42px;
  font-weight: 800;
  background: ${({ theme }) =>
    theme.gradients?.brand ||
    "linear-gradient(135deg, #60a5fa, #a78bfa, #f472b6)"};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.1;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  filter: drop-shadow(0 0 18px rgba(96, 165, 250, 0.4));
  ${({ $large }) =>
    $large &&
    `
    display: inline-block;
    transform: scale(1.8);
  `}

  @media (max-height: 800px) {
    font-size: 32px;
  }
  @media (max-height: 700px) {
    font-size: 26px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 32px;
    ${({ $large }) => $large && `transform: scale(1.5);`}
  }
`;

export const StatLabel = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
  text-transform: uppercase;
  letter-spacing: 1px;

  @media (max-height: 800px) {
    font-size: 12px;
  }
`;

export const StatList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  margin-top: 10px;

  @media (max-height: 800px) {
    margin-top: 4px;
    gap: 2px;
  }
`;

export const StatListItem = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.tertiary};
  display: flex;
  align-items: center;
  gap: 6px;
`;


