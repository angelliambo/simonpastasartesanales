// frontend/src/components/ui/StatCard.tsx
import React from "react";
import Card from "../../atoms/Card";
import { useAccessibilityPreferences } from "../../../../hooks/accessibility/useAccessibilityPreferences";
import { useThemeColors } from "../../../../hooks/useThemeColors";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  description?: string;
  color?: "primary" | "secondary" | "success" | "warning" | "error" | string;
  /** ID único del componente (opcional) */
  id?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  description,
  color = "primary",
  id,
}) => {
  const { preferences } = useAccessibilityPreferences();
  const colors = useThemeColors();
  const largeText = preferences?.largeText || false;

  const getColorStyles = () => {
    // Si es un color personalizado (string), usarlo directamente
    if (
      typeof color === "string" &&
      !["primary", "secondary", "success", "warning", "error"].includes(color)
    ) {
      return color;
    }

    const colorMap = {
      primary: colors.primary[500],
      secondary: colors.text.secondary,
      success: colors.success[500],
      warning: colors.warning[500],
      error: colors.error[500],
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.primary;
  };

  const primaryColor = getColorStyles();

  const finalId = id ? `stat-card-${id}` : undefined;

  return (
    <Card
      id={finalId}
      variant="default"
      size="small"
      interactive={false}
      className="stat-card"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "12px",
        }}
      >
        <h3
          style={{
            fontSize: largeText ? "16px" : "14px",
            fontWeight: 600,
            margin: 0,
            color: colors.text.primary,
          }}
        >
          {title}
        </h3>
        {icon && (
          <div
            style={{
              fontSize: largeText ? "24px" : "20px",
              color: primaryColor,
            }}
          >
            {icon}
          </div>
        )}
      </div>

      <div
        style={{
          fontSize: largeText ? "32px" : "28px",
          fontWeight: 700,
          color: primaryColor,
          marginBottom: "8px",
          lineHeight: 1,
        }}
      >
        {value}
      </div>

      {trend && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            fontSize: largeText ? "14px" : "12px",
            color: trend.isPositive ? colors.success[500] : colors.error[500],
            fontWeight: 500,
          }}
        >
          <span>{trend.isPositive ? "↗" : "↘"}</span>
          <span>{Math.abs(trend.value)}%</span>
        </div>
      )}

      {description && (
        <p
          style={{
            fontSize: largeText ? "14px" : "12px",
            color: colors.text.secondary,
            margin: "8px 0 0 0",
            lineHeight: 1.4,
          }}
        >
          {description}
        </p>
      )}
    </Card>
  );
};

export default StatCard;
