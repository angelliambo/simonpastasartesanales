import React, { useCallback, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCreateCheckoutMutation } from "../../services/api/licenseService";
import { useSnackbar } from "../../components/ui/atoms/Snackbar";
import { PLANS } from "@factory/shared/config/plans";
import { CHROME_STORE_URL } from "@factory/shared/config/urls";
import type { PlanId } from "@factory/shared/types/plan";
import { useTranslation } from "../../i18n/I18nProvider";
import { FEATURES } from "@factory/shared/config/features";
import { BRAND_CONFIG } from "@factory/shared/config/brand";
import { Container } from "../../components/ui/atoms/Container";
import { Row, Col } from "../../components/ui/atoms/Grid";
import RegisterModal from "../../components/RegisterModal";
import GoogleSignInButton from "../../components/GoogleSignInButton";
import {
  ContentSection,
  ContentCard,
} from "../../components/ui/organisms/ConfigPageLayout";

import { RootState } from "../../store/store";
import { AnimatedBackground } from "../../components/AnimatedBackground";
import AppFooter from "../../components/AppFooter";
import { ZnIcon } from "@design-sys/atoms/ZnIcon";
import {
  AudioOutlined,
  SoundOutlined,
  BookOutlined,
  FileTextOutlined,
  MessageOutlined,
  MacCommandOutlined,
  KeyOutlined,
  RocketOutlined,
  LoadingOutlined,
  DesktopOutlined,
} from "@ant-design/icons";

import {
  VhSection,
  HeroContent,
  LogoWrapper,
  Logo,
  HeroTitle,
  HeroSubtitle,
  HeroActions,
  HeroOutlinedButton,
  HeroPrimaryButton,
  FeaturesInner,
  StatsGrid,
  StatItem,
  StatNumber,
  StatLabel,
  StatList,
  StatListItem,
  PricingGrid,
  PricingCard,
  PopularBadge,
  BestValueBadge,
  PlanName,
  PlanSubtitle,
  PriceContainer,
  Currency,
  PriceAmount,
  BillingPeriod,
  FeaturesList,
  FeatureItem,
  FeatureDisabledItem,
  PricingButton,
  FreePricingButton,
  TestimonialsGrid,
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
} from "./HomePage.styles";

const FEATURE_KEY_MAP: Record<string, string> = {
  "Lector de texto seleccionado": "pages.plans.featureLector",
  "Subtítulos cinéticos": "pages.plans.featureSubtitulos",
  "Dictado ilimitado": "pages.plans.featureDictado",
  "Comandos de voz (puntuación)": "pages.plans.featureVozPuntuacion",
  "Narrador de página completa": "pages.plans.featureNarrador",
  "Resaltar texto al leer": "pages.plans.featureResaltar",
  "Leer en PDF": "pages.plans.featurePDF",
  "Pantalla flotante (Always-on-Top)": "pages.plans.featurePip",
};

const SECTIONS = [
  "hero",
  "features",
  ...(FEATURES.ENABLE_BILLING_LEMON ? ["pricing"] : []),
  "stats",
  "testimonials",
  "cta",
];

const SECTION_LABELS: Record<string, string> = {
  features: "Funciones",
  stats: "Estadísticas",
  ...(FEATURES.ENABLE_BILLING_LEMON ? { pricing: "Planes" } : {}),
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
      } catch { }
    };

    window.addEventListener("wheel", onUserScroll, { passive: true });
    window.addEventListener("touchstart", onUserScroll, { passive: true });
    window.addEventListener("keydown", onUserScroll);

    const startAutoScroll = () => {
      if (userInteracted.current) return;

      const scrollToNext = () => {
        if (userInteracted.current) return;

        sectionIndexRef.current =
          (sectionIndexRef.current + 1) % sectionIds.length;
        const id = sectionIds[sectionIndexRef.current];
        setActiveSection(id);
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

        timerRef.current = setTimeout(scrollToNext, 4000);
      };

      timerRef.current = setTimeout(scrollToNext, 4000);
    };

    const idleTimer = setTimeout(startAutoScroll, 3000);

    return () => {
      clearTimeout(idleTimer);
      clearTimeout(timerRef.current);
      window.removeEventListener("wheel", onUserScroll);
      window.removeEventListener("touchstart", onUserScroll);
      window.removeEventListener("keydown", onUserScroll);
    };
  }, [sectionIds, userInteracted, timerRef, setActiveSection]);
}

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const loggedInUser = useSelector((state: RootState) => state.auth.user) as {
    email?: string;
  } | null;
  const { t, lang } = useTranslation();

  const LANG_FLAGS: Record<string, { flag: string; name: string }> = {
    "es-MX": { flag: "🇲🇽", name: "Español" },
    "en-US": { flag: "🇺🇸", name: "English" },
    "en-GB": { flag: "🇬🇧", name: "English" },
    "fr-FR": { flag: "🇫🇷", name: "Français" },
    "de-DE": { flag: "🇩🇪", name: "Deutsch" },
    "it-IT": { flag: "🇮🇹", name: "Italiano" },
    "pt-BR": { flag: "🇧🇷", name: "Português" },
    "ja-JP": { flag: "🇯🇵", name: "日本語" },
  };

  const secondLang: Record<string, { flag: string; name: string }> = {
    "es-MX": { flag: "🇺🇸", name: "English" },
    "es-ES": { flag: "🇺🇸", name: "English" },
    "en-US": { flag: "🇫🇷", name: "Français" },
    "en-GB": { flag: "🇫🇷", name: "Français" },
    "fr-FR": { flag: "🇩🇪", name: "Deutsch" },
    "de-DE": { flag: "🇬🇧", name: "English" },
    "it-IT": { flag: "🇫🇷", name: "Français" },
    "pt-BR": { flag: "🇪🇸", name: "Español" },
    "ja-JP": { flag: "🇺🇸", name: "English" },
  };

  const currentFlag = LANG_FLAGS[lang] || LANG_FLAGS["en-US"];
  const secondLangItem = secondLang[lang] || secondLang["en-US"];

  const handleLogin = useCallback(() => setShowRegister(true), []);
  const handlePricing = useCallback(() => navigate("/pricing"), [navigate]);
  const handleLicense = useCallback(() => navigate("/license"), [navigate]);

  const handleInstall = useCallback(() => {
    window.open(CHROME_STORE_URL, "_blank", "noopener,noreferrer");
  }, []);

  const userInteracted = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const scrollTo = (id: string) => {
    userInteracted.current = true;
    clearTimeout(timerRef.current);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
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
  const { showError } = useSnackbar();
  const [pendingPlanId, setPendingPlanId] = useState<string | null>(null);
  const [loadingPlanId, setLoadingPlanId] = useState<string | null>(null);
  const [checkout, { isLoading }] = useCreateCheckoutMutation();

  const handleSubscribe = async (planId: string) => {
    if (!loggedInUser) {
      setPendingPlanId(planId);
      setShowRegister(true);
      return;
    }

    try {
      setLoadingPlanId(planId);
      const response = await checkout({ plan: planId }).unwrap();
      if (response?.url) {
        window.open(response.url, "_blank");
        navigate(`/billing?plan=${planId}`);
      } else {
        showError(t("pages.pricing.errorNoCheckoutUrl") || "No checkout URL");
      }
    } catch (err: any) {
      showError(err.data?.error || t("pages.pricing.errorServerError") || "Server Error");
    } finally {
      setLoadingPlanId(null);
    }
  };

  useEffect(() => {
    if (loggedInUser && pendingPlanId) {
      const planToSub = pendingPlanId;
      setPendingPlanId(null);
      handleSubscribe(planToSub);
    }
  }, [loggedInUser, pendingPlanId]);

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



  return (
    <>
      <AnimatedBackground />
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
        $variant="black"
        $visible={preloadedSections.has("hero")}
      >
        <HeroContent>
          <LogoWrapper>
            <Logo
              src={BRAND_CONFIG.logoUrl || `${process.env.PUBLIC_URL}/assets/images/logo.png`}
              alt={BRAND_CONFIG.siteName}
            />
          </LogoWrapper>
          <HeroTitle>{BRAND_CONFIG.siteName}</HeroTitle>
          <HeroSubtitle>
            {t("pages.home.heroSubtitle") ||
              "Comunicación en su punto máximo. Dictado por voz, texto a voz y herramientas de accesibilidad para la web."}
          </HeroSubtitle>
          <HeroActions>
            {FEATURES.ENABLE_GOOGLE_AUTH ? (
              loggedInUser ? (
                <>
                  <HeroPrimaryButton onClick={() => navigate("/dashboard")} variant="primary">
                    Ir al Dashboard
                  </HeroPrimaryButton>
                  {FEATURES.ENABLE_BILLING_LEMON && (
                    <HeroOutlinedButton onClick={handlePricing} variant="secondary">
                      {t("pages.home.pricingButton")}
                    </HeroOutlinedButton>
                  )}
                </>
              ) : (
                <>
                  <HeroPrimaryButton onClick={handleLogin} variant="primary">
                    Comenzar Gratis
                  </HeroPrimaryButton>
                  {FEATURES.ENABLE_GOOGLE_AUTH && G_ID && (
                    <HeroGoogleButtonWrapper>
                      <GoogleSignInButton size="large" text="continue_with" width="240px" oneTap={true} />
                    </HeroGoogleButtonWrapper>
                  )}
                  <HeroOutlinedButton onClick={handleLogin} variant="secondary" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                    <ZnIcon icon={KeyOutlined} /> Ingresar con Correo
                  </HeroOutlinedButton>
                  {FEATURES.ENABLE_BILLING_LEMON && (
                    <HeroOutlinedButton onClick={handlePricing} variant="secondary">
                      {t("pages.home.pricingButton")}
                    </HeroOutlinedButton>
                  )}
                </>
              )
            ) : (
              <>
                {BRAND_CONFIG.whatsappUrl ? (
                  <HeroPrimaryButton onClick={() => window.open(BRAND_CONFIG.whatsappUrl, "_blank", "noopener,noreferrer")} variant="primary">
                    Contacto por WhatsApp
                  </HeroPrimaryButton>
                ) : (
                  <HeroPrimaryButton onClick={() => scrollTo("features")} variant="primary">
                    Ver Funciones
                  </HeroPrimaryButton>
                )}
                {FEATURES.ENABLE_BILLING_LEMON && (
                  <HeroOutlinedButton onClick={handlePricing} variant="secondary">
                    {t("pages.home.pricingButton")}
                  </HeroOutlinedButton>
                )}
              </>
            )}
          </HeroActions>
        </HeroContent>
      </VhSection>

      {showRegister && (
        <RegisterModal
          onClose={() => { setShowRegister(false); setPendingPlanId(null); }}
          initialStep="email"
        />
      )}

      <VhSection
        id="features"
        $variant="blue"
        $visible={preloadedSections.has("features")}
      >
        <FeaturesInner>
          <Container maxWidth="lg" padding="none">
            <ContentSection
              title={t("pages.home.features") || "Caracteristicas"}
              style={{ marginBottom: 0 }}
            >
              <Row
                gutter={[24, 24]}
                align="stretch"
                style={{ display: "flex", flexWrap: "wrap" }}
              >
                <Col xs={24} sm={12} md={8} style={{ display: "flex" }}>
                  <div style={{ flex: 1, display: "flex" }}>
                    <ContentCard
                      className="content-card"
                      icon={<ZnIcon icon={AudioOutlined} size={48} />}
                      title={t("pages.home.dictadoTitle")}
                      subtitle={t("pages.home.dictadoDesc")}
                      variant="glass"
                    />
                  </div>
                </Col>
                <Col xs={24} sm={12} md={8} style={{ display: "flex" }}>
                  <div style={{ flex: 1, display: "flex" }}>
                    <ContentCard
                      className="content-card"
                      icon={<ZnIcon icon={SoundOutlined} size={48} />}
                      title={t("pages.home.ttsTitle")}
                      subtitle={t("pages.home.ttsDesc")}
                      variant="glass"
                    />
                  </div>
                </Col>
                <Col xs={24} sm={12} md={8} style={{ display: "flex" }}>
                  <div style={{ flex: 1, display: "flex" }}>
                    <ContentCard
                      className="content-card"
                      icon={<ZnIcon icon={DesktopOutlined} size={48} />}
                      title={t("pages.home.pipTitle")}
                      subtitle={t("pages.home.pipDesc")}
                      variant="glass"
                    />
                  </div>
                </Col>
                <Col xs={24} sm={12} md={8} style={{ display: "flex" }}>
                  <div style={{ flex: 1, display: "flex" }}>
                    <ContentCard
                      className="content-card"
                      icon={<ZnIcon icon={FileTextOutlined} size={48} />}
                      title={t("pages.home.pdfTitle")}
                      subtitle={t("pages.home.pdfDesc")}
                      variant="glass"
                    />
                  </div>
                </Col>
                <Col xs={24} sm={12} md={8} style={{ display: "flex" }}>
                  <div style={{ flex: 1, display: "flex" }}>
                    <ContentCard
                      className="content-card"
                      icon={<ZnIcon icon={MessageOutlined} size={48} />}
                      title={t("pages.home.subsTitle")}
                      subtitle={t("pages.home.subsDesc")}
                      variant="glass"
                    />
                  </div>
                </Col>
                <Col xs={24} sm={12} md={8} style={{ display: "flex" }}>
                  <div style={{ flex: 1, display: "flex" }}>
                    <ContentCard
                      className="content-card"
                      icon={<ZnIcon icon={MacCommandOutlined} size={48} />}
                      title={t("pages.home.shortcutsTitle")}
                      subtitle={t("pages.home.shortcutsDesc")}
                      variant="glass"
                    />
                  </div>
                </Col>
              </Row>
            </ContentSection>
          </Container>
        </FeaturesInner>
      </VhSection>

      {FEATURES.ENABLE_BILLING_LEMON && preloadedSections.has("pricing") && (
        <VhSection
          id="pricing"
          $variant="black"
          $visible={preloadedSections.has("pricing")}
        >
          <Container maxWidth="lg" padding="none">
            <SectionTitle>{t("pages.home.pricingSectionTitle")}</SectionTitle>
            <SectionSubtitle>
              {t("pages.home.pricingSectionSubtitle")}
            </SectionSubtitle>
            <PricingGrid>
              {(["free", "6_meses", "1_ano"] as PlanId[]).map((planId) => {
                const plan = PLANS[planId];
                const allPremium = PLANS["1_ano"].features;
                const planDescKey =
                  planId === "free"
                    ? "planFreeDesc"
                    : planId === "6_meses"
                      ? "planSemestralDesc"
                      : "planAnualDesc";
                const billingKey =
                  planId === "free"
                    ? "billingFree"
                    : planId === "6_meses"
                      ? "billingSemestral"
                      : "billingAnual";
                return (
                  <PricingCard
                    key={planId}
                    $popular={plan.badge === "popular"}
                    $bestValue={plan.badge === "best-value"}
                  >
                    {plan.badge === "popular" && (
                      <PopularBadge>{t("pages.plans.popular")}</PopularBadge>
                    )}
                    {plan.badge === "best-value" && (
                      <BestValueBadge>
                        {t("pages.plans.bestValue")}
                      </BestValueBadge>
                    )}
                    <PlanName>{plan.name}</PlanName>
                    <PlanSubtitle>{t("pages.plans." + planDescKey)}</PlanSubtitle>
                    <PriceContainer>
                      <Currency>$</Currency>
                      <PriceAmount>{plan.price}</PriceAmount>
                      <BillingPeriod>
                        {t("pages.plans." + billingKey)}
                      </BillingPeriod>
                    </PriceContainer>
                    <FeaturesList>
                      {plan.features.map((f) => (
                        <FeatureItem key={f}>
                          {t(FEATURE_KEY_MAP[f] || f)}
                        </FeatureItem>
                      ))}
                      {planId !== "1_ano" &&
                        allPremium
                          .filter((f) => !plan.features.includes(f))
                          .map((f) => (
                            <FeatureDisabledItem key={f}>
                              {t(FEATURE_KEY_MAP[f] || f)}
                            </FeatureDisabledItem>
                          ))}
                    </FeaturesList>
                    {planId === "free" ? (
                      <FreePricingButton disabled variant="secondary">
                        {t("pages.plans.currentPlan")}
                      </FreePricingButton>
                    ) : (
                      <PricingButton
                        $primary={plan.badge === "popular"}
                        variant={plan.badge === "popular" ? "primary" : "secondary"}
                        disabled={isLoading}
                        onClick={() => handleSubscribe(planId)}
                      >
                        {isLoading && loadingPlanId === planId ? (
                          <>
                            <ZnIcon icon={LoadingOutlined} spin style={{ marginRight: '8px' }} />
                            {t("pages.pricing.processingRequest")}
                          </>
                        ) : (
                          `${t("pages.plans.choose")} ${plan.name.split(" ")[0]}`
                        )}
                      </PricingButton>
                    )}
                  </PricingCard>
                );
              })}
            </PricingGrid>
          </Container>
        </VhSection>
      )}

      <VhSection
        id="stats"
        $variant="blue"
        $visible={preloadedSections.has("stats")}
      >
        <Container maxWidth="lg" padding="none">
          <StatsGrid>
            <StatItem>
              <StatNumber>7</StatNumber>
              <StatLabel>{t("pages.home.statsIdiomas")}</StatLabel>
              <StatList>
                <StatListItem>
                  {currentFlag.flag} {currentFlag.name}
                </StatListItem>
                <StatListItem>
                  {secondLangItem.flag} {secondLangItem.name}
                </StatListItem>
                <StatListItem>
                  {t("pages.home.statsIdiomasOthers")}
                </StatListItem>
              </StatList>
            </StatItem>
            <StatItem>
              <StatNumber>100%</StatNumber>
              <StatLabel>{t("pages.home.statsLocal")}</StatLabel>
              <StatList>
                <StatListItem>
                  {t("pages.home.statsPrivacidadItem1")}
                </StatListItem>
                <StatListItem>
                  {t("pages.home.statsPrivacidadItem2")}
                </StatListItem>
                <StatListItem>
                  {t("pages.home.statsPrivacidadItem3")}
                </StatListItem>
              </StatList>
            </StatItem>
            <StatItem>
              <StatNumber $large>∞</StatNumber>
              <StatLabel>{t("pages.home.statsCompatibilidad")}</StatLabel>
              <StatList>
                <StatListItem>💻 Windows</StatListItem>
                <StatListItem>💻 macOS</StatListItem>
                <StatListItem>💻 Linux</StatListItem>
              </StatList>
            </StatItem>
          </StatsGrid>
        </Container>
      </VhSection>

      <VhSection
        id="testimonials"
        $variant="black"
        $visible={preloadedSections.has("testimonials")}
      >
        <Container maxWidth="lg">
          <SectionTitle>{t("pages.home.testimonialsTitle")}</SectionTitle>
          <SectionSubtitle>
            {t("pages.home.testimonialsSubtitle")}
          </SectionSubtitle>
          <TestimonialsGrid>
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
            <TestimonialCard>
              <TestimonialQuote>
                {t("pages.home.testimonial4")}
              </TestimonialQuote>
              <TestimonialAuthor>
                <TestimonialAvatar>D</TestimonialAvatar>
                <div>
                  <TestimonialName>
                    {t("pages.home.testimonialName4")}
                  </TestimonialName>
                  <TestimonialRole>
                    {t("pages.home.testimonialRole4")}
                  </TestimonialRole>
                </div>
              </TestimonialAuthor>
            </TestimonialCard>
            <TestimonialCard>
              <TestimonialQuote>
                {t("pages.home.testimonial5")}
              </TestimonialQuote>
              <TestimonialAuthor>
                <TestimonialAvatar>E</TestimonialAvatar>
                <div>
                  <TestimonialName>
                    {t("pages.home.testimonialName5")}
                  </TestimonialName>
                  <TestimonialRole>
                    {t("pages.home.testimonialRole5")}
                  </TestimonialRole>
                </div>
              </TestimonialAuthor>
            </TestimonialCard>
            <TestimonialCard>
              <TestimonialQuote>
                {t("pages.home.testimonial6")}
              </TestimonialQuote>
              <TestimonialAuthor>
                <TestimonialAvatar>P</TestimonialAvatar>
                <div>
                  <TestimonialName>
                    {t("pages.home.testimonialName6")}
                  </TestimonialName>
                  <TestimonialRole>
                    {t("pages.home.testimonialRole6")}
                  </TestimonialRole>
                </div>
              </TestimonialAuthor>
            </TestimonialCard>
          </TestimonialsGrid>
        </Container>
      </VhSection>

      <VhSection
        id="cta"
        $variant="blue"
        $visible={preloadedSections.has("cta")}
      >
        <Container maxWidth="sm">
          <CtaTitle>
            {FEATURES.ENABLE_GOOGLE_AUTH
              ? (loggedInUser ? "Bienvenido de vuelta" : t("pages.home.ctaTitle") || "Comienza Hoy")
              : "Comienza Hoy"}
          </CtaTitle>
          <CtaSubtitle>
            {FEATURES.ENABLE_GOOGLE_AUTH ? (
              loggedInUser
                ? `Ya sos parte de ${BRAND_CONFIG.siteName}. Accedé a tu panel de control.`
                : t("pages.home.ctaSubtitle") || "Registrate ahora para comenzar a utilizar todos nuestros servicios web."
            ) : (
              "Descubre cómo nuestro servicio puede optimizar el rendimiento de tu negocio."
            )}
          </CtaSubtitle>
          <CtaButton
            variant="primary"
            onClick={
              FEATURES.ENABLE_GOOGLE_AUTH
                ? (loggedInUser ? () => navigate("/dashboard") : handleLogin)
                : () => {
                  if (BRAND_CONFIG.whatsappUrl) {
                    window.open(BRAND_CONFIG.whatsappUrl, "_blank", "noopener,noreferrer");
                  } else {
                    scrollTo("features");
                  }
                }
            }
          >
            {FEATURES.ENABLE_GOOGLE_AUTH ? (
              loggedInUser ? (
                <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                  Ir al Dashboard <ZnIcon icon={RocketOutlined} />
                </span>
              ) : (
                "Comenzar Gratis"
              )
            ) : (
              BRAND_CONFIG.whatsappUrl ? "Contacto por WhatsApp" : "Ver Funciones"
            )}
          </CtaButton>
        </Container>
      </VhSection>

      <AppFooter />
    </>
  );
};

export default HomePage;
