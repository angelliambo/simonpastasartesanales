import React from "react";
import Title from "./atoms/Title";
import Text from "./atoms/Text";
import { useThemeColors } from "../../hooks";

interface ThemedTypographyProps {
  variant?: "primary" | "secondary" | "tertiary" | "accent";
}

interface ThemedTitleProps extends ThemedTypographyProps {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5;
  style?: React.CSSProperties;
}

interface ThemedTextProps extends ThemedTypographyProps {
  children: React.ReactNode;
  strong?: boolean;
  style?: React.CSSProperties;
}

interface ThemedParagraphProps extends ThemedTypographyProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const ThemedTitle: React.FC<ThemedTitleProps> = ({
  style = {},
  variant = "primary",
  level = 1,
  children,
}) => {
  const colors = useThemeColors();

  const getTextColor = () => {
    switch (variant) {
      case "primary":
        return colors.text.primary;
      case "secondary":
        return colors.text.secondary;
      case "tertiary":
        return colors.text.tertiary;
      case "accent":
        return colors.primary[600];
      default:
        return colors.text.primary;
    }
  };

  return (
    <Title
      level={level}
      style={{
        color: getTextColor(),
        ...style,
      }}
    >
      {children}
    </Title>
  );
};

const ThemedText: React.FC<ThemedTextProps> = ({
  style = {},
  variant = "primary",
  strong = false,
  children,
}) => {
  const colors = useThemeColors();

  const getTextColor = () => {
    switch (variant) {
      case "primary":
        return colors.text.primary;
      case "secondary":
        return colors.text.secondary;
      case "tertiary":
        return colors.text.tertiary;
      case "accent":
        return colors.primary[600];
      default:
        return colors.text.primary;
    }
  };

  return (
    <Text
      weight={strong ? "semibold" : "normal"}
      style={{
        color: getTextColor(),
        ...style,
      }}
    >
      {children}
    </Text>
  );
};

const ThemedParagraph: React.FC<ThemedParagraphProps> = ({
  style = {},
  variant = "primary",
  children,
}) => {
  const colors = useThemeColors();

  const getTextColor = () => {
    switch (variant) {
      case "primary":
        return colors.text.primary;
      case "secondary":
        return colors.text.secondary;
      case "tertiary":
        return colors.text.tertiary;
      case "accent":
        return colors.primary[600];
      default:
        return colors.text.primary;
    }
  };

  return (
    <Text
      variant="body1"
      style={{
        color: getTextColor(),
        ...style,
      }}
    >
      {children}
    </Text>
  );
};

export { ThemedTitle, ThemedText, ThemedParagraph };
