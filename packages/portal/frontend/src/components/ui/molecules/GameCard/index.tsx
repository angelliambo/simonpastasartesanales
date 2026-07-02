import React from "react";
import Card from "../../atoms/Card";
import Tag from "../../atoms/Tag";
import Text from "../../atoms/Text";
import { useThemeColors } from "../../../../hooks";
import { getGradient } from "../../../../styles/themes";

interface GameCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  estimatedTime: number;
  minAge: number;
  maxAge: number;
  skills: string[];
  progress?: {
    completed: number;
    total: number;
  };
  isRecommended?: boolean;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  /** ID único del componente (opcional) - se concatena con "game-card-" */
  id?: string;
}

const GameCard: React.FC<GameCardProps> = ({
  icon,
  title,
  description,
  difficulty,
  estimatedTime,
  minAge,
  maxAge,
  skills,
  progress,
  isRecommended = false,
  onClick,
  className,
  style,
  id,
}) => {
  const colors = useThemeColors();

  const getDifficultyColor = () => {
    switch (difficulty) {
      case "easy":
        return colors.success[500];
      case "medium":
        return colors.warning[500];
      case "hard":
        return colors.error[500];
      default:
        return colors.text.secondary;
    }
  };

  const getDifficultyLabel = () => {
    switch (difficulty) {
      case "easy":
        return "FÁCIL";
      case "medium":
        return "MEDIO";
      case "hard":
        return "DIFÍCIL";
      default:
        return "NORMAL";
    }
  };

  const finalId = id ? `game-card-${id}` : undefined;

  return (
    <Card
      id={finalId}
      interactive={!!onClick}
      onClick={onClick}
      className={className}
      style={{
        borderRadius: "16px",
        border: isRecommended
          ? `3px solid ${colors.primary[500]}`
          : `1px solid ${colors.border.normal}`,
        boxShadow: isRecommended ? colors.shadow.heavy : colors.shadow.medium,
        height: "100%",
        background: isRecommended ? getGradient("card") : colors.gradients.card,
        cursor: onClick ? "pointer" : "default",
        transition: "all 0.3s ease",
        opacity: isRecommended ? 1 : 0.85,
        transform: isRecommended ? "scale(1.02)" : "scale(1)",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        ...style,
      }}
    >
      <div style={{ textAlign: "center", position: "relative" }}>
        {isRecommended && (
          <div
            style={{
              position: "absolute",
              top: "-8px",
              right: "-8px",
              background: colors.primary[500],
              color: "white",
              borderRadius: "50%",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px",
              fontWeight: "bold",
              zIndex: 1,
              boxShadow: colors.shadow.medium,
            }}
          >
            ⭐
          </div>
        )}
        <div
          style={{
            fontSize: "48px",
            marginBottom: "16px",
            filter: isRecommended
              ? "drop-shadow(0 4px 8px rgba(0,0,0,0.1))"
              : "none",
          }}
        >
          {icon}
        </div>
        <h4
          style={{
            color: colors.text.primary,
            marginBottom: "12px",
            display: "block",
            fontSize: "18px",
            fontWeight: 600,
            margin: "0 0 12px 0",
          }}
        >
          {title}
        </h4>
        <Text
          size="sm"
          style={{
            color: colors.text.secondary,
            display: "block",
            marginBottom: "16px",
          }}
        >
          {description}
        </Text>
      </div>

      <div style={{ marginTop: "auto" }}>
        {/* Difficulty Badge */}
        <div style={{ textAlign: "center", marginBottom: "16px" }}>
          <Tag
            color={getDifficultyColor()}
            style={{
              fontSize: "12px",
              fontWeight: 600,
              padding: "4px 12px",
              borderRadius: "12px",
            }}
          >
            {getDifficultyLabel()}
          </Tag>
          {isRecommended && (
            <Tag
              color={colors.primary[500]}
              style={{
                marginLeft: "8px",
                fontSize: "12px",
                fontWeight: 700,
                padding: "6px 16px",
                borderRadius: "16px",
                border: `2px solid ${colors.primary[500]}`,
                background: `${colors.primary[500]}20`,
                color: colors.primary[600],
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              🌟 Recomendado
            </Tag>
          )}
        </div>

        {/* Game Details */}
        <div style={{ marginBottom: "12px" }}>
          <Text
            style={{
              color: colors.text.secondary,
              fontSize: "13px",
              display: "block",
              marginBottom: "4px",
            }}
          >
            ⏱️ {estimatedTime} min | 👶 {minAge}-{maxAge} años
          </Text>
          <Text
            style={{
              color: colors.text.secondary,
              fontSize: "13px",
              display: "block",
              marginBottom: "4px",
            }}
          >
            🎯 Habilidades: {skills.join(", ")}
          </Text>
        </div>

        {/* Progress */}
        {progress && progress.total > 0 && (
          <div style={{ textAlign: "center" }}>
            <Text
              style={{
                color: colors.primary[500],
                fontSize: "13px",
                fontWeight: 500,
              }}
            >
              📈 Progreso: {progress.completed}/{progress.total} completados
            </Text>
          </div>
        )}
      </div>
    </Card>
  );
};

export default GameCard;
