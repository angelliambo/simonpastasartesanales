import React from 'react';
import { Modal } from '../../atoms/Modal';
import { Button } from '../../atoms/Button';
import { PLANS } from '../../../config/plans';
import type { PlanId } from '../../../types/plan';
import { ZnIcon } from '../../atoms/ZnIcon';
import { BookOutlined, RocketOutlined, ThunderboltOutlined } from '@ant-design/icons';
import {
  Wrapper, Header, Title, Subtitle,
  PlansGrid, Card, PopularBadge,
  PlanHeader, PlanIcon, PlanName, PlanPrice,
  FeaturesList, FeatureItem, FeatureBlocked,
} from './PricingModal.styles';

type VisiblePlanId = Exclude<PlanId, 'god_mode' | 'trial'>;
type TFunction = (key: string, params?: Record<string, string | number>) => string;

export interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: TFunction;
  onBuyPlan: (variantId: number) => Promise<void>;
  currentPlan?: PlanId;
  isPremium?: boolean;
  userName?: string;
}

const FEATURE_KEY_MAP: Record<string, string> = {
  'Lector de texto seleccionado': 'pages.plans.featureLector',
  'Subtítulos cinéticos': 'pages.plans.featureSubtitulos',
  'Dictado ilimitado': 'pages.plans.featureDictado',
  'Comandos de voz (puntuación)': 'pages.plans.featureVozPuntuacion',
  'Narrador de página completa': 'pages.plans.featureNarrador',
  'Resaltar texto al leer': 'pages.plans.featureResaltar',
  'Leer en PDF': 'pages.plans.featurePDF',
  'Soporte VIP prioritario': 'pages.plans.featureSoporteVIP',
  'Acceso anticipado a betas': 'pages.plans.featureAccesoBeta',
};

const PLAN_IDS: VisiblePlanId[] = ['free', '6_meses', '1_ano'];

export const PricingModal: React.FC<PricingModalProps> = ({
  isOpen, onClose, t, onBuyPlan, currentPlan = 'free', isPremium = false, userName,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} $wide>
      <Wrapper>
        <Header>
          <Title>
            {userName ? `Hey ${userName}, ` : ''}
            {t('pages.popup.pricingTitle') || 'ZenithNexus Premium'}
          </Title>
          <Subtitle>{t('pages.popup.pricingSubtitle') || 'Unlock the power of voice'}</Subtitle>
        </Header>

        <PlansGrid>
          {PLAN_IDS.map(planId => {
            const plan = PLANS[planId];
            const isCurrent = planId === currentPlan || (planId === 'free' && !isPremium);
            const premiumFeatures = planId === 'free' ? PLANS['6_meses'].features : [];
            const isPopular = plan.badge === 'popular';
            const isBestValue = plan.badge === 'best-value';

            return (
              <Card key={planId} $popular={isPopular || isBestValue}>
                {isPopular && <PopularBadge>{t('pages.plans.popular') || 'Popular'}</PopularBadge>}
                {isBestValue && <PopularBadge>{t('pages.plans.bestValue') || 'Best Value'}</PopularBadge>}
                <PlanHeader>
                  <PlanIcon>
                    <ZnIcon icon={planId === 'free' ? BookOutlined : planId === '6_meses' ? RocketOutlined : ThunderboltOutlined} />
                  </PlanIcon>
                  <PlanName>{plan.name}</PlanName>
                </PlanHeader>
                <PlanPrice>
                  {plan.price === 0
                    ? t('pages.popup.pricingGratis') || 'Free'
                    : `$${plan.price}`}
                </PlanPrice>
                <FeaturesList>
                  {plan.features.map((f: string) => (
                    <FeatureItem key={f}>{t(FEATURE_KEY_MAP[f] || f)}</FeatureItem>
                  ))}
                  {premiumFeatures.map((f: string) => (
                    <FeatureBlocked key={f}>{t(FEATURE_KEY_MAP[f] || f)}</FeatureBlocked>
                  ))}
                </FeaturesList>
                <Button
                  variant={planId !== 'free' ? 'premium' : 'secondary'}
                  size="small"
                  $fullWidth
                  disabled={isCurrent}
                  onClick={() => { if (planId !== 'free') onBuyPlan(plan.variantId); }}
                >
                  {isCurrent
                    ? t('pages.popup.pricingCurrent') || 'Your Current Plan'
                    : t('pages.popup.pricingChoose', { plan: plan.name.split(' ')[0] }) || 'Choose'}
                </Button>
              </Card>
            );
          })}
        </PlansGrid>
      </Wrapper>
    </Modal>
  );
};

export default PricingModal;
