import React from "react";
import Button from '@design-sys/atoms/Button';
import { useAccessibilityPreferences } from "../../../../hooks/accessibility/useAccessibilityPreferences";
import {
  StyledCard,
  CardHeader,
  IconWrapper,
  CardTitle,
  CardDescription,
  FeaturesContainer,
  FeaturesTitle,
  FeaturesList,
  FeatureItem,
  CheckIcon,
  ButtonWrapper,
} from "./FeatureCard.styles";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  features: string[];
  onLearnMore?: () => void;
  variant?: "default" | "highlighted";
  /** ID único del componente (opcional) - se concatena con "feature-card-" */
  id?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  features,
  onLearnMore,
  variant = "default",
  id,
}) => {
  const { preferences } = useAccessibilityPreferences();
  const largeText = preferences?.largeText || false;

  const finalId = id ? `feature-card-${id}` : undefined;

  return (
    <StyledCard
      id={finalId}
      variant={variant === "highlighted" ? "elevated" : "default"}
      size="medium"
      interactive={false}
      className="feature-card"
      $variant={variant}
    >
      <CardHeader>
        <IconWrapper $variant={variant} $largeText={largeText}>
          {icon}
        </IconWrapper>

        <CardTitle $largeText={largeText}>
          {title}
        </CardTitle>

        <CardDescription $largeText={largeText}>
          {description}
        </CardDescription>
      </CardHeader>

      <FeaturesContainer>
        <FeaturesTitle $largeText={largeText}>
          Características:
        </FeaturesTitle>
        <FeaturesList>
          {features.map((feature, index) => (
            <FeatureItem key={index} $largeText={largeText}>
              <CheckIcon $variant={variant}>
                ✓
              </CheckIcon>
              {feature}
            </FeatureItem>
          ))}
        </FeaturesList>
      </FeaturesContainer>

      {onLearnMore && (
        <ButtonWrapper>
          <Button
            variant={variant === "highlighted" ? "primary" : "secondary"}
            size="md"
            onClick={onLearnMore}
            icon="ℹ️"
          >
            Saber más
          </Button>
        </ButtonWrapper>
      )}
    </StyledCard>
  );
};

export default FeatureCard;
