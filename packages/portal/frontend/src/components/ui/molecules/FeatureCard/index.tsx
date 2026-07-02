// frontend/src/components/ui/FeatureCard.tsx
import React from "react";
import Card from "../../atoms/Card";
import Button from "../../atoms/Button";
import { useAccessibilityPreferences } from "../../../../hooks/accessibility/useAccessibilityPreferences";
import { useThemeColors } from "../../../../hooks/useThemeColors";

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
  const colors = useThemeColors();
  const largeText = preferences?.largeText || false;

  const finalId = id ? `feature-card-${id}` : undefined;

  return (
    <Card
      id={finalId}
      variant={variant === "highlighted" ? "elevated" : "default"}
      size="medium"
      interactive={false}
      className="feature-card"
      style={{
        backgroundColor:
          variant === "highlighted" ? colors.background.secondary : undefined,
        border:
          variant === "highlighted"
            ? `2px solid ${colors.primary[500]}`
            : undefined,
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            fontSize: largeText ? "48px" : "40px",
            marginBottom: "16px",
            color:
              variant === "highlighted"
                ? colors.primary[500]
                : colors.text.secondary,
          }}
        >
          {icon}
        </div>

        <h3
          style={{
            fontSize: largeText ? "20px" : "18px",
            fontWeight: 600,
            margin: "0 0 8px 0",
            color: colors.text.primary,
            lineHeight: 1.3,
          }}
        >
          {title}
        </h3>

        <p
          style={{
            fontSize: largeText ? "16px" : "14px",
            color: colors.text.secondary,
            lineHeight: 1.5,
            margin: 0,
          }}
        >
          {description}
        </p>
      </div>

      <div
        style={{
          marginBottom: "20px",
        }}
      >
        <h4
          style={{
            fontSize: largeText ? "16px" : "14px",
            fontWeight: 600,
            margin: "0 0 12px 0",
            color: colors.text.primary,
          }}
        >
          Características:
        </h4>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
          }}
        >
          {features.map((feature, index) => (
            <li
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "8px",
                fontSize: largeText ? "14px" : "12px",
                color: colors.text.secondary,
              }}
            >
              <span
                style={{
                  color:
                    variant === "highlighted"
                      ? colors.primary[500]
                      : colors.success[500],
                }}
              >
                ✓
              </span>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {onLearnMore && (
        <div style={{ textAlign: "center" }}>
          <Button
            variant={variant === "highlighted" ? "primary" : "secondary"}
            size="md"
            onClick={onLearnMore}
            icon="ℹ️"
          >
            Saber más
          </Button>
        </div>
      )}
    </Card>
  );
};

export default FeatureCard;
