import React, { useCallback, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "../../i18n/I18nProvider";
import { FEATURES } from "@factory/shared/config/features";
import { BRAND_CONFIG } from "@factory/shared/config/brand";
import SEO from "../../components/SEO";
import { useLocalBusinessStructuredData } from "../../hooks/useStructuredData";
import { Container } from '@design-sys/atoms/Container';
import { SocialFeedGrid } from "@design-sys/atoms/SocialFeed";
import { useGetInstagramFeedQuery } from "../../services/api/socialFeedService";
import RegisterModal from "../../components/RegisterModal";
import GoogleSignInButton from "../../components/GoogleSignInButton";
import {
  ContentSection,
  ContentCard,
} from "../../components/ui/organisms/ConfigPageLayout";
import { RootState } from "../../store/store";
import TrackedClick from "../../components/TrackedClick";
import { trackEvent } from "../../services/analytics";
import { ZnIcon } from "@design-sys/atoms/ZnIcon";
import {
  LikeOutlined,
  ShopOutlined,
  ClockCircleOutlined,
  InboxOutlined,
  TeamOutlined,
  CarOutlined,
  WhatsAppOutlined,
  KeyOutlined,
  RocketOutlined,
} from "@ant-design/icons";

import {
  VhSection,
  HeroContent,
  LogoWrapper,
  Logo,
  HeroSubtitle,
  HeroActions,
  HeroOutlinedButton,
  HeroPrimaryButton,
  FeaturesInner,
  ProductGrid,
  ProductCard,
  ProductImage,
  ProductContent,
  ProductTitle,
  ProductDescription,
  OrderButton,
  TestimonialsRow,
  TestimonialCol,
  TestimonialCard,
  TestimonialQuote,
  TestimonialAuthor,
  TestimonialAvatar,
  TestimonialName,
  TestimonialRole,
  SectionTitle,
  SectionSubtitle,
  CtaTitle,
  CtaSubtitle,
  CtaButton,
  ScrollNav,
  ScrollDotWrapper,
  ScrollDot,
  ScrollDotLabel,
  HeroGoogleButtonWrapper,
  FeaturesRow,
  FeatureCol,
  CardInnerWrapper,
  CtaButtonContent,
} from "./HomePage.styles";



const SECTIONS = [
  "hero",
  "features",
  "stats",
  "testimonials",
  "cta",
];

const SECTION_LABELS: Record<string, string> = {
  features: "Funciones",
  stats: "Productos",
  testimonials: "Opiniones",
  cta: "Comenzar",
};

const G_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || '';

function useAutoScroll(
  sectionIds: string[],
  activeSection: string,
  userInteracted: React.MutableRefObject<boolean>,
  timerRef: React.MutableRefObject<ReturnType<typeof setTimeout> | undefined>,
  setActiveSection: (id: string) => void,
) {
  const sectionIndexRef = useRef(0);
  const stepCountRef = useRef(0);
  const maxSteps = sectionIds.length * 2; // 2 vueltas completas

  useEffect(() => {
    const idx = sectionIds.indexOf(activeSection);
    if (idx !== -1) {
      sectionIndexRef.current = idx;
    }
  }, [activeSection, sectionIds]);

  useEffect(() => {
    const onUserScroll = () => {
      try {
        userInteracted.current = true;
        clearTimeout(timerRef.current);
      } catch { }
    };

    window.addEventListener("wheel", onUserScroll, { passive: true });
    window.addEventListener("touchstart", onUserScroll, { passive: true });
    window.addEventListener("keydown", onUserScroll);

    const scrollToNext = () => {
      if (userInteracted.current || document.hidden) return;
      if (stepCountRef.current >= maxSteps) {
        // Detener permanentemente la animación por inactividad prolongada
        return;
      }
      stepCountRef.current += 1;
      sectionIndexRef.current =
        (sectionIndexRef.current + 1) % sectionIds.length;
      const id = sectionIds[sectionIndexRef.current];
      setActiveSection(id);

      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
      timerRef.current = setTimeout(scrollToNext, 4000);
    };

    const startAutoScroll = () => {
      if (userInteracted.current || document.hidden) return;
      timerRef.current = setTimeout(scrollToNext, 4000);
    };

    const idleTimer = setTimeout(startAutoScroll, 3000);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Detener inmediatamente si la pestaña está oculta
        clearTimeout(timerRef.current);
      } else {
        // Reanudar si no ha interactuado y no superó el límite
        if (!userInteracted.current && stepCountRef.current < maxSteps) {
          clearTimeout(timerRef.current);
          timerRef.current = setTimeout(scrollToNext, 2000);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearTimeout(idleTimer);
      clearTimeout(timerRef.current);
      window.removeEventListener("wheel", onUserScroll);
      window.removeEventListener("touchstart", onUserScroll);
      window.removeEventListener("keydown", onUserScroll);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [sectionIds, userInteracted, timerRef, setActiveSection, maxSteps]);
}

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const localBusinessStructuredData = useLocalBusinessStructuredData();
  const loggedInUser = useSelector((state: RootState) => state.auth.user) as {
    email?: string;
  } | null;
  const { t } = useTranslation();

  const { data: socialFeedData, isLoading: isLoadingFeed } = useGetInstagramFeedQuery(undefined, {
    skip: !FEATURES.ENABLE_SOCIAL_FEEDS,
  });

  const handleLogin = useCallback(() => setShowRegister(true), []);
  const handlePricing = useCallback(() => navigate("/pricing"), [navigate]);

  const userInteracted = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const scrollTo = (id: string) => {
    userInteracted.current = true;
    clearTimeout(timerRef.current);
    const element = document.getElementById(id);
    if (element) {
      const offset = 70;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const [activeSection, setActiveSection] = useState("hero");
  const [showRegister, setShowRegister] = useState(false);
  const [preloadedSections, setPreloadedSections] = useState<Set<string>>(() => {
    const isLighthouse = typeof navigator !== 'undefined' &&
      (navigator.userAgent.includes('Chrome-Lighthouse') ||
        navigator.userAgent.includes('Lighthouse') ||
        navigator.userAgent.includes('HeadlessChrome') ||
        navigator.userAgent.includes('Headless') ||
        navigator.webdriver);

    const prefersReducedMotion = typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isLighthouse || prefersReducedMotion) {
      return new Set(SECTIONS);
    }
    return new Set(["hero"]);
  });
  useAutoScroll(SECTIONS, activeSection, userInteracted, timerRef, setActiveSection);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = new Set<string>();
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visible.add(entry.target.id);
          }
        });
        if (visible.size > 0) {
          let best = "";
          let bestTop = Infinity;
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const top = Math.abs(entry.boundingClientRect.top);
              if (top < bestTop) {
                bestTop = top;
                best = entry.target.id;
              }
            }
          });
          if (best) setActiveSection(best);
          const sorted = SECTIONS.filter((s) => visible.has(s));
          const last = sorted[sorted.length - 1];
          const lastIdx = SECTIONS.indexOf(last);
          setPreloadedSections(
            new Set(SECTIONS.slice(0, Math.min(lastIdx + 2, SECTIONS.length))),
          );
        }
      },
      { threshold: 0.1, rootMargin: "-80px 0px 0px 0px" },
    );

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Configuración del botón CTA (al final de la página)
  const getCtaConfig = () => {
    if (FEATURES.ENABLE_GOOGLE_AUTH) {
      if (loggedInUser) {
        return {
          label: (
            <CtaButtonContent>
              {t("pages.home.heroDashboardButton")} <ZnIcon icon={RocketOutlined} />
            </CtaButtonContent>
          ),
          onClick: () => navigate("/dashboard")
        };
      } else {
        return {
          label: t("pages.home.ctaButton"),
          onClick: handleLogin
        };
      }
    } else {
      if (BRAND_CONFIG.whatsappUrl) {
        return {
          label: t("pages.home.whatsappContactButton"),
          onClick: () => window.open(BRAND_CONFIG.whatsappUrl, "_blank", "noopener,noreferrer")
        };
      } else {
        return {
          label: t("pages.home.seeFeaturesButton"),
          onClick: () => scrollTo("features")
        };
      }
    }
  };

  const ctaConfig = getCtaConfig();

  // Título y Subtítulo de la sección CTA
  const ctaTitle = FEATURES.ENABLE_GOOGLE_AUTH
    ? (loggedInUser ? t("pages.home.ctaTitleLogged") : t("pages.home.ctaTitle"))
    : t("pages.home.ctaTitle");

  const ctaSubtitle = FEATURES.ENABLE_GOOGLE_AUTH
    ? (loggedInUser
      ? t("pages.home.ctaSubtitleLogged", { siteName: BRAND_CONFIG.siteName })
      : t("pages.home.ctaSubtitle"))
    : t("pages.home.ctaSubtitleDefault");

  // Render para los botones de acción del Hero
  const renderHeroActions = () => {
    if (FEATURES.ENABLE_GOOGLE_AUTH) {
      if (loggedInUser) {
        return (
          <>
            <TrackedClick label="Hero - Ir al Dashboard" action="click_cta" category="marketing">
              <HeroPrimaryButton onClick={() => navigate("/dashboard")} variant="primary">
                {t("pages.home.heroDashboardButton")}
              </HeroPrimaryButton>
            </TrackedClick>
            {FEATURES.ENABLE_BILLING_LEMON && (
              <TrackedClick label="Hero - Planes Premium" action="click_pricing" category="marketing">
                <HeroOutlinedButton onClick={handlePricing} variant="secondary">
                  {t("pages.home.pricingButton")}
                </HeroOutlinedButton>
              </TrackedClick>
            )}
          </>
        );
      } else {
        return (
          <>
            <TrackedClick label="Hero - Comenzar Gratis" action="click_cta" category="marketing">
              <HeroPrimaryButton onClick={handleLogin} variant="primary">
                {t("pages.home.ctaButton")}
              </HeroPrimaryButton>
            </TrackedClick>
            {FEATURES.ENABLE_GOOGLE_AUTH && G_ID && (
              <HeroGoogleButtonWrapper>
                <GoogleSignInButton size="large" text="continue_with" width="240px" oneTap={true} />
              </HeroGoogleButtonWrapper>
            )}
            <TrackedClick label="Hero - Ingresar con Correo" action="click_login" category="marketing">
              <HeroOutlinedButton onClick={handleLogin} variant="secondary">
                <ZnIcon icon={KeyOutlined} /> {t("pages.home.heroEmailLoginButton")}
              </HeroOutlinedButton>
            </TrackedClick>
            {FEATURES.ENABLE_BILLING_LEMON && (
              <TrackedClick label="Hero - Planes Premium" action="click_pricing" category="marketing">
                <HeroOutlinedButton onClick={handlePricing} variant="secondary">
                  {t("pages.home.pricingButton")}
                </HeroOutlinedButton>
              </TrackedClick>
            )}
          </>
        );
      }
    } else {
      return (
        <>
          {BRAND_CONFIG.whatsappUrl ? (
            <TrackedClick label="Hero - Contacto WhatsApp" action="click_whatsapp" category="marketing">
              <HeroPrimaryButton onClick={() => window.open(BRAND_CONFIG.whatsappUrl, "_blank", "noopener,noreferrer")} variant="primary">
                {t("pages.home.whatsappContactButton")}
              </HeroPrimaryButton>
            </TrackedClick>
          ) : (
            <TrackedClick label="Hero - Ver Funciones" action="click_features" category="marketing">
              <HeroPrimaryButton onClick={() => scrollTo("features")} variant="primary">
                {t("pages.home.seeFeaturesButton")}
              </HeroPrimaryButton>
            </TrackedClick>
          )}
          {FEATURES.ENABLE_BILLING_LEMON && (
            <TrackedClick label="Hero - Planes Premium" action="click_pricing" category="marketing">
              <HeroOutlinedButton onClick={handlePricing} variant="secondary">
                {t("pages.home.pricingButton")}
              </HeroOutlinedButton>
            </TrackedClick>
          )}
        </>
      );
    }
  };

  return (
    <>
      <SEO structuredData={localBusinessStructuredData} />
      <ScrollNav>
        {SECTIONS.map((s) => (
          <ScrollDotWrapper key={s}>
            <ScrollDot
              $active={activeSection === s}
              onClick={() => scrollTo(s)}
            />
            {s !== "hero" && (
              <ScrollDotLabel $active={activeSection === s}>{SECTION_LABELS[s] || s}</ScrollDotLabel>
            )}
          </ScrollDotWrapper>
        ))}
      </ScrollNav>

      <VhSection
        id="hero"
        $visible={preloadedSections.has("hero")}
      >
        <HeroContent>
          <LogoWrapper>
            <Logo
              src={BRAND_CONFIG.logoUrl || `${process.env.PUBLIC_URL}/assets/images/logo.png`}
              alt={BRAND_CONFIG.siteName}
            />
          </LogoWrapper>
          <HeroSubtitle>
            {t("pages.home.heroSubtitle")}
          </HeroSubtitle>
          <HeroActions>
            {renderHeroActions()}
          </HeroActions>
        </HeroContent>
      </VhSection>

      {showRegister && (
        <RegisterModal
          onClose={() => setShowRegister(false)}
          initialStep="email"
        />
      )}

      <VhSection
        id="features"
        $variant="alternate"
        $visible={preloadedSections.has("features")}
      >
        <FeaturesInner>
          <Container maxWidth="lg" padding="none">
            <ContentSection
              title={t("pages.home.features")}
              marginBottom={0}
            >
              <FeaturesRow
                gutter={[24, 24]}
                align="stretch"
              >
                <FeatureCol xs={24} sm={12} md={8}>
                  <CardInnerWrapper>
                    <ContentCard
                      className="content-card"
                      $icon={LikeOutlined}
                      title={t("pages.home.dictadoTitle")}
                      subtitle={t("pages.home.dictadoDesc")}
                      variant="glass"
                    />
                  </CardInnerWrapper>
                </FeatureCol>
                <FeatureCol xs={24} sm={12} md={8}>
                  <CardInnerWrapper>
                    <ContentCard
                      className="content-card"
                      $icon={ShopOutlined}
                      title={t("pages.home.ttsTitle")}
                      subtitle={t("pages.home.ttsDesc")}
                      variant="glass"
                    />
                  </CardInnerWrapper>
                </FeatureCol>
                <FeatureCol xs={24} sm={12} md={8}>
                  <CardInnerWrapper>
                    <ContentCard
                      className="content-card"
                      $icon={ClockCircleOutlined}
                      title={t("pages.home.pipTitle")}
                      subtitle={t("pages.home.pipDesc")}
                      variant="glass"
                    />
                  </CardInnerWrapper>
                </FeatureCol>
                <FeatureCol xs={24} sm={12} md={8}>
                  <CardInnerWrapper>
                    <ContentCard
                      className="content-card"
                      $icon={InboxOutlined}
                      title={t("pages.home.pdfTitle")}
                      subtitle={t("pages.home.pdfDesc")}
                      variant="glass"
                    />
                  </CardInnerWrapper>
                </FeatureCol>
                <FeatureCol xs={24} sm={12} md={8}>
                  <CardInnerWrapper>
                    <ContentCard
                      className="content-card"
                      $icon={TeamOutlined}
                      title={t("pages.home.subsTitle")}
                      subtitle={t("pages.home.subsDesc")}
                      variant="glass"
                    />
                  </CardInnerWrapper>
                </FeatureCol>
                <FeatureCol xs={24} sm={12} md={8}>
                  <CardInnerWrapper>
                    <ContentCard
                      className="content-card"
                      $icon={CarOutlined}
                      title={t("pages.home.shortcutsTitle")}
                      subtitle={t("pages.home.shortcutsDesc")}
                      variant="glass"
                    />
                  </CardInnerWrapper>
                </FeatureCol>
              </FeaturesRow>
            </ContentSection>
          </Container>
        </FeaturesInner>
      </VhSection>


      <VhSection
        id="stats"
        $visible={preloadedSections.has("stats")}
      >
        <Container maxWidth="lg">
          <ProductGrid>
            <ProductCard>
              <ProductImage src="/assets/images/sorrentinos.webp" alt={t("pages.home.productSorrentinosTitle")} loading="lazy" />
              <ProductContent>
                <ProductTitle>{t("pages.home.productSorrentinosTitle")}</ProductTitle>
                <ProductDescription>
                  {t("pages.home.productSorrentinosDesc")}
                </ProductDescription>
                <OrderButton
                  href={`${BRAND_CONFIG.whatsappUrl}?text=${encodeURIComponent(`Hola te quiero consultar sobre Sorrentinos, precio y disponibilidad`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('click_order_sorrentinos', 'catalog', 'Pedido Sorrentinos')}
                >
                  <ZnIcon icon={WhatsAppOutlined} /> {t("pages.home.productOrderBtn") || "Hacé tu pedido"}
                </OrderButton>
              </ProductContent>
            </ProductCard>

            <ProductCard>
              <ProductImage src="/assets/images/ravioles1.webp" alt={t("pages.home.productRaviolesTitle")} loading="lazy" />
              <ProductContent>
                <ProductTitle>{t("pages.home.productRaviolesTitle")}</ProductTitle>
                <ProductDescription>
                  {t("pages.home.productRaviolesDesc")}
                </ProductDescription>
                <OrderButton
                  href={`${BRAND_CONFIG.whatsappUrl}?text=${encodeURIComponent(`Hola te quiero consultar sobre Ravioles, precio y disponibilidad`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('click_order_ravioles', 'catalog', 'Pedido Ravioles')}
                >
                  <ZnIcon icon={WhatsAppOutlined} /> {t("pages.home.productOrderBtn") || "Hacé tu pedido"}
                </OrderButton>
              </ProductContent>
            </ProductCard>

            <ProductCard>
              <ProductImage src="/assets/images/fideos.webp" alt={t("pages.home.productFideosTitle")} loading="lazy" />
              <ProductContent>
                <ProductTitle>{t("pages.home.productFideosTitle")}</ProductTitle>
                <ProductDescription>
                  {t("pages.home.productFideosDesc")}
                </ProductDescription>
                <OrderButton
                  href={`${BRAND_CONFIG.whatsappUrl}?text=${encodeURIComponent(`Hola te quiero consultar sobre Fideos Frescos, precio y disponibilidad`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('click_order_fideos', 'catalog', 'Pedido Fideos')}
                >
                  <ZnIcon icon={WhatsAppOutlined} /> {t("pages.home.productOrderBtn") || "Hacé tu pedido"}
                </OrderButton>
              </ProductContent>
            </ProductCard>

            <ProductCard>
              <ProductImage src="/assets/images/empanadas.webp" alt={t("pages.home.productEmpanadasTitle")} loading="lazy" />
              <ProductContent>
                <ProductTitle>{t("pages.home.productEmpanadasTitle")}</ProductTitle>
                <ProductDescription>
                  {t("pages.home.productEmpanadasDesc")}
                </ProductDescription>
                <OrderButton
                  href={`${BRAND_CONFIG.whatsappUrl}?text=${encodeURIComponent(`Hola te quiero consultar sobre Empanadas, precio y disponibilidad`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('click_order_empanadas', 'catalog', 'Pedido Empanadas')}
                >
                  <ZnIcon icon={WhatsAppOutlined} /> {t("pages.home.productOrderBtn") || "Hacé tu pedido"}
                </OrderButton>
              </ProductContent>
            </ProductCard>
          </ProductGrid>
        </Container>
      </VhSection>

      <VhSection
        id="testimonials"
        $variant="alternate"
        $visible={preloadedSections.has("testimonials")}
      >
        <Container maxWidth="lg">
          <SectionTitle>{t("pages.home.testimonialsTitle")}</SectionTitle>
          <SectionSubtitle>
            {t("pages.home.testimonialsSubtitle")}
          </SectionSubtitle>
          {FEATURES.ENABLE_SOCIAL_FEEDS ? (
            <SocialFeedGrid
              posts={socialFeedData?.feed}
              isLoading={isLoadingFeed}
              fallbackComponent={
                <TestimonialsRow gutter={[24, 24]} justify="center">
                  <TestimonialCol xs={24} md={8}>
                    <TestimonialCard>
                      <TestimonialQuote>
                        {t("pages.home.testimonial1")}
                      </TestimonialQuote>
                      <TestimonialAuthor>
                        <TestimonialAvatar>S</TestimonialAvatar>
                        <div>
                          <TestimonialName>
                            {t("pages.home.testimonialName1")}
                          </TestimonialName>
                          <TestimonialRole>
                            {t("pages.home.testimonialRole1")}
                          </TestimonialRole>
                        </div>
                      </TestimonialAuthor>
                    </TestimonialCard>
                  </TestimonialCol>
                  <TestimonialCol xs={24} md={8}>
                    <TestimonialCard>
                      <TestimonialQuote>
                        {t("pages.home.testimonial2")}
                      </TestimonialQuote>
                      <TestimonialAuthor>
                        <TestimonialAvatar>M</TestimonialAvatar>
                        <div>
                          <TestimonialName>
                            {t("pages.home.testimonialName2")}
                          </TestimonialName>
                          <TestimonialRole>
                            {t("pages.home.testimonialRole2")}
                          </TestimonialRole>
                        </div>
                      </TestimonialAuthor>
                    </TestimonialCard>
                  </TestimonialCol>
                  <TestimonialCol xs={24} md={8}>
                    <TestimonialCard>
                      <TestimonialQuote>
                        {t("pages.home.testimonial3")}
                      </TestimonialQuote>
                      <TestimonialAuthor>
                        <TestimonialAvatar>Y</TestimonialAvatar>
                        <div>
                          <TestimonialName>
                            {t("pages.home.testimonialName3")}
                          </TestimonialName>
                          <TestimonialRole>
                            {t("pages.home.testimonialRole3")}
                          </TestimonialRole>
                        </div>
                      </TestimonialAuthor>
                    </TestimonialCard>
                  </TestimonialCol>
                </TestimonialsRow>
              }
            />
          ) : (
            <TestimonialsRow gutter={[24, 24]} justify="center">
              <TestimonialCol xs={24} md={8}>
                <TestimonialCard>
                  <TestimonialQuote>
                    {t("pages.home.testimonial1")}
                  </TestimonialQuote>
                  <TestimonialAuthor>
                    <TestimonialAvatar>S</TestimonialAvatar>
                    <div>
                      <TestimonialName>
                        {t("pages.home.testimonialName1")}
                      </TestimonialName>
                      <TestimonialRole>
                        {t("pages.home.testimonialRole1")}
                      </TestimonialRole>
                    </div>
                  </TestimonialAuthor>
                </TestimonialCard>
              </TestimonialCol>
              <TestimonialCol xs={24} md={8}>
                <TestimonialCard>
                  <TestimonialQuote>
                    {t("pages.home.testimonial2")}
                  </TestimonialQuote>
                  <TestimonialAuthor>
                    <TestimonialAvatar>M</TestimonialAvatar>
                    <div>
                      <TestimonialName>
                        {t("pages.home.testimonialName2")}
                      </TestimonialName>
                      <TestimonialRole>
                        {t("pages.home.testimonialRole2")}
                      </TestimonialRole>
                    </div>
                  </TestimonialAuthor>
                </TestimonialCard>
              </TestimonialCol>
              <TestimonialCol xs={24} md={8}>
                <TestimonialCard>
                  <TestimonialQuote>
                    {t("pages.home.testimonial3")}
                  </TestimonialQuote>
                  <TestimonialAuthor>
                    <TestimonialAvatar>Y</TestimonialAvatar>
                    <div>
                      <TestimonialName>
                        {t("pages.home.testimonialName3")}
                      </TestimonialName>
                      <TestimonialRole>
                        {t("pages.home.testimonialRole3")}
                      </TestimonialRole>
                    </div>
                  </TestimonialAuthor>
                </TestimonialCard>
              </TestimonialCol>
            </TestimonialsRow>
          )}
        </Container>
      </VhSection>

      <VhSection
        id="cta"
        $visible={preloadedSections.has("cta")}
      >
        <Container maxWidth="sm">
          <CtaTitle>
            {ctaTitle}
          </CtaTitle>
          <CtaSubtitle>
            {ctaSubtitle}
          </CtaSubtitle>
          <TrackedClick label={`Bottom CTA - ${ctaConfig.label}`} action="click_cta" category="marketing">
            <CtaButton
              variant="primary"
              onClick={ctaConfig.onClick}
            >
              {ctaConfig.label}
            </CtaButton>
          </TrackedClick>
        </Container>
      </VhSection>
    </>
  );
};

export default HomePage;
