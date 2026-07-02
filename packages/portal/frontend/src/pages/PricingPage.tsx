import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled, { css, keyframes } from "styled-components";
import { PLANS } from '@factory/shared/config/plans';
import { globals } from '@factory/shared/i18n';
import type { PlanId } from '@factory/shared/types/plan';
import { RootState } from "../store/store";
import { useCreateCheckoutMutation } from "../services/api/licenseService";
import { showError } from "../store/slices/notificationSlice";
import { AnimatedBackground } from "../components/AnimatedBackground";
import { useTranslation } from "../i18n/I18nProvider";
import RegisterModal from "../components/RegisterModal";
import { ZnIcon } from "@design-sys/atoms/ZnIcon";
import { LoadingOutlined } from "@ant-design/icons";

const FEATURE_KEY_MAP: Record<string, string> = {
  'Lector de texto seleccionado': 'pages.plans.featureLector',
  'Subtítulos cinéticos': 'pages.plans.featureSubtitulos',
  'Dictado ilimitado': 'pages.plans.featureDictado',
  'Comandos de voz (puntuación)': 'pages.plans.featureVozPuntuacion',
  'Narrador de página completa': 'pages.plans.featureNarrador',
  'Resaltar texto al leer': 'pages.plans.featureResaltar',
  'Leer en PDF': 'pages.plans.featurePDF',
  'Pantalla flotante (Always-on-Top)': 'pages.plans.featurePip',
};

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(168, 85, 247, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(168, 85, 247, 0); }
  100% { box-shadow: 0 0 0 0 rgba(168, 85, 247, 0); }
`;

const Container = styled.div`
  min-height: 100vh;
  background: transparent;
  color: ${({ theme }) => theme.colors?.text?.primary || "#f4f4f5"};
  font-family: "Outfit", "Inter", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 1.5rem;
  overflow-x: hidden;
  position: relative;
  z-index: 1;

  @media (max-height: 800px) {
    padding: 2rem 1.5rem;
  }
  @media (max-height: 700px) {
    padding: 1rem 1.5rem;
  }
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  max-width: 700px;
  animation: ${fadeIn} 0.8s ease-out;

  @media (max-height: 800px) {
    margin-bottom: 2rem;
  }
  @media (max-height: 700px) {
    margin-bottom: 1rem;
  }
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  background: ${({ theme }) => theme.gradients?.brand || "linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #f472b6 100%)"};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
  letter-spacing: -0.05em;

  @media (max-height: 800px) {
    font-size: 2.5rem;
  }
  @media (max-height: 700px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors?.text?.tertiary || "#a1a1aa"};
  line-height: 1.6;

  @media (max-height: 800px) {
    font-size: 1.1rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 2.5rem;
  width: 100%;
  max-width: 1100px;
  animation: ${fadeIn} 1s ease-out;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const CardSilverBorder = css`
  background:
    linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%) padding-box,
    linear-gradient(135deg,
      rgba(192,192,192,0.25),
      rgba(255,255,255,0.45),
      rgba(160,160,160,0.2),
      rgba(212,212,212,0.35),
      rgba(255,255,255,0.3)
    ) padding-box,
    #0e111a padding-box,
    linear-gradient(135deg,
      rgba(192,192,192,0.4),
      rgba(255,255,255,0.6),
      rgba(160,160,160,0.3),
      rgba(212,212,212,0.5),
      rgba(255,255,255,0.4)
    ) border-box;
  border: 3px solid transparent;
  box-shadow:
    0 0 0 3px rgba(192,192,192,0.6),
    0 0 0 6px rgba(255,255,255,0.08),
    0 0 50px rgba(192,192,192,0.2),
    inset 0 1px 0 rgba(255,255,255,0.1);
`;

const CardGoldBorder = css`
  background:
    linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%) padding-box,
    linear-gradient(135deg,
      rgba(191,149,63,0.3),
      rgba(252,246,186,0.45),
      rgba(179,135,40,0.2),
      rgba(251,245,183,0.35),
      rgba(170,119,28,0.2)
    ) padding-box,
    #0e111a padding-box,
    linear-gradient(135deg,
      rgba(191,149,63,0.5),
      rgba(252,246,186,0.7),
      rgba(179,135,40,0.3),
      rgba(251,245,183,0.5),
      rgba(170,119,28,0.3)
    ) border-box;
  border: 3px solid transparent;
  box-shadow:
    0 0 0 3px rgba(191,149,63,0.7),
    0 0 0 6px rgba(255,215,0,0.1),
    0 0 50px rgba(255,215,0,0.25),
    inset 0 1px 0 rgba(255,215,0,0.15);
`;

const Card = styled.div<{ $popular?: boolean; $bestValue?: boolean }>`
  border-radius: 1.5rem;
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  color: #fff;

  @media (max-height: 800px) {
    padding: 1.5rem 1.2rem;
    border-radius: 1rem;
  }
  @media (max-height: 700px) {
    padding: 1rem 1rem;
  }


  ${({ $popular, $bestValue, theme }) =>
    $popular ? CardSilverBorder :
      $bestValue ? CardGoldBorder : `
      background: ${theme.effects?.glassBackground || "rgba(15, 23, 42, 0.45)"};
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid ${theme.effects?.glassBorder || "rgba(255, 255, 255, 0.08)"};
    `}

  &:hover {
    transform: ${(props) => (props.$popular ? "scale(1.08)" : "translateY(-8px)")};
    ${({ $popular, $bestValue }) =>
    $popular
      ? "box-shadow: 0 0 0 3px rgba(192,192,192,0.6), 0 0 0 6px rgba(255,255,255,0.08), 0 0 60px rgba(192,192,192,0.3);"
      : $bestValue
        ? "box-shadow: 0 0 0 3px rgba(191,149,63,0.7), 0 0 0 6px rgba(255,215,0,0.1), 0 0 60px rgba(255,215,0,0.35);"
        : "box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.5); border-color: rgba(59, 130, 246, 0.5);"}
  }
`;

const PopularBadge = styled.span`
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
  box-shadow: 0 2px 12px rgba(192,192,192,0.4);
`;

const BestValueBadge = styled.span`
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
  box-shadow: 0 2px 16px rgba(212,168,67,0.5);
`;

const PlanName = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors?.text?.primary || "white"};

  @media (max-height: 800px) {
    font-size: 1.1rem;
    margin-bottom: 0.2rem;
  }
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: baseline;
  margin: 1.5rem 0;

  @media (max-height: 800px) {
    margin: 0.6rem 0;
  }
  @media (max-height: 700px) {
    margin: 0.3rem 0;
  }
`;

const Currency = styled.span`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors?.text?.tertiary || "#a1a1aa"};
`;

const PriceAmount = styled.span`
  font-size: 3.5rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors?.text?.primary || "white"};
  letter-spacing: -0.02em;

  @media (max-height: 800px) {
    font-size: 2.2rem;
  }
  @media (max-height: 700px) {
    font-size: 1.8rem;
  }
`;

const BillingPeriod = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors?.text?.tertiary || "#71717a"};
  margin-left: 0.5rem;
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 2rem 0;
  flex-grow: 1;

  @media (max-height: 800px) {
    margin: 0.8rem 0;
  }
  @media (max-height: 700px) {
    margin: 0.4rem 0;
  }
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors?.text?.secondary || "#d4d4d8"};
  margin-bottom: 1rem;

  &::before {
    content: "✓";
    color: ${({ theme }) => theme.colors?.success?.[500] || "#10b981"};
    font-weight: bold;
    font-size: 1.1rem;
    margin-right: 0.75rem;
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

const FeatureDisabledItem = styled.li`
  display: flex;
  align-items: center;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors?.text?.tertiary || "#52525b"};
  margin-bottom: 1rem;

  &::before {
    content: "✕";
    color: ${({ theme }) => theme.colors?.error?.[500] || "#ef4444"};
    font-weight: bold;
    font-size: 1rem;
    margin-right: 0.75rem;
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


const ActionButton = styled.button<{ $primary?: boolean }>`
  width: 100%;
  background: ${(props) =>
    props.$primary
      ? props.theme.gradients?.premium || "linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)"
      : "rgba(255, 255, 255, 0.08)"};
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 1rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  margin-top: 1.5rem;
  box-sizing: border-box;
  animation: ${(props) => (props.$primary ? pulse : "none")} 2s infinite;

  @media (max-height: 800px) {
    padding: 0.6rem;
    margin-top: 0.8rem;
    font-size: 0.85rem;
    border-radius: 0.6rem;
  }
  @media (max-height: 700px) {
    padding: 0.4rem;
    margin-top: 0.4rem;
  }

  &:hover {
    background: ${(props) =>
    props.$primary
      ? "linear-gradient(135deg, #b967ff 0%, #8b5cf6 100%)"
      : "rgba(255, 255, 255, 0.15)"};
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    animation: none;
  }
`;

const FreePlanButton = styled(ActionButton)`
  &:disabled {
    background: rgba(255,255,255,0.03);
    color: ${({ theme }) => theme.colors?.text?.tertiary || "#71717a"};
  }
`;

const FooterNote = styled.p`
  margin-top: 4rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors?.text?.tertiary || "#52525b"};
  text-align: center;
`;

const PricingPage: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedInUser = useSelector((state: RootState) => state.auth.user) as { email?: string } | null;

  const [showRegister, setShowRegister] = useState(false);
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
        dispatch(showError(t('pages.pricing.errorNoCheckoutUrl')));
      }
    } catch (err: any) {
      dispatch(showError(err.data?.error || t('pages.pricing.errorServerError')));
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

  return (
    <>
      <AnimatedBackground />
      <Container>
        <HeaderSection>
          <Title>{t('pages.pricing.title', { nombreSitio: globals.nombreSitio })}</Title>
          <Subtitle>
            {t('pages.pricing.subtitle')}
          </Subtitle>
        </HeaderSection>

        <Grid>
          {(['free', '6_meses', '1_ano'] as PlanId[]).map((planId) => {
            const plan = PLANS[planId];
            const allPremiumFeatures = PLANS['1_ano'].features;
            return (
              <Card key={planId} $popular={plan.badge === 'popular'} $bestValue={plan.badge === 'best-value'}>
                {plan.badge === 'popular' && <PopularBadge>{t('pages.plans.popular')}</PopularBadge>}
                {plan.badge === 'best-value' && <BestValueBadge>{t('pages.plans.bestValue')}</BestValueBadge>}
                <PlanName>{plan.name}</PlanName>
                <Subtitle>{t('pages.plans.plan' + (planId === 'free' ? 'Free' : planId === '6_meses' ? 'Semestral' : 'Anual') + 'Desc')}</Subtitle>
                <PriceContainer>
                  <Currency>$</Currency>
                  <PriceAmount>{plan.price}</PriceAmount>
                  <BillingPeriod>{t('pages.plans.billing' + (planId === 'free' ? 'Free' : planId === '6_meses' ? 'Semestral' : 'Anual'))}</BillingPeriod>
                </PriceContainer>
                <FeaturesList>
                  {plan.features.map((f) => (
                    <FeatureItem key={f}>{t(FEATURE_KEY_MAP[f] || f)}</FeatureItem>
                  ))}
                  {planId !== '1_ano' && allPremiumFeatures.filter(f => !plan.features.includes(f)).map((f) => (
                    <FeatureDisabledItem key={f}>{t(FEATURE_KEY_MAP[f] || f)}</FeatureDisabledItem>
                  ))}
                </FeaturesList>

                {planId === 'free' ? (
                  <FreePlanButton disabled>
                    {t('pages.plans.currentPlan')}
                  </FreePlanButton>
                ) : (
                  <ActionButton
                    $primary={plan.badge === 'popular'}
                    disabled={isLoading}
                    onClick={() => handleSubscribe(planId)}
                  >
                    {isLoading && loadingPlanId === planId ? (
                      <>
                        <ZnIcon icon={LoadingOutlined} spin style={{ marginRight: '8px' }} />
                        {t('pages.pricing.processingRequest')}
                      </>
                    ) : !loggedInUser ? (
                      t('pages.pricing.loginToBuy')
                    ) : (
                      `${t('pages.plans.choose')} ${plan.name.split(' ')[0]}`
                    )}
                  </ActionButton>
                )}
              </Card>
            );
          })}
        </Grid>

        {showRegister && (
          <RegisterModal onClose={() => { setShowRegister(false); setPendingPlanId(null); }} />
        )}

        <FooterNote>
          {t('pages.plans.footerNote')}
        </FooterNote>
      </Container>
    </>
  );
};

export default PricingPage;
