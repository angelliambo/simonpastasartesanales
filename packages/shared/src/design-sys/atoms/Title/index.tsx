import React from "react";
import { Text } from "../Text";

export interface TitleProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  /** ID único del componente (opcional) - se concatena con "title-" */
  id?: string;
}

const levelToVariant: Record<number, "h1" | "h2" | "h3" | "h4" | "h5" | "h6"> =
  {
    1: "h1",
    2: "h2",
    3: "h3",
    4: "h4",
    5: "h5",
    6: "h6",
  };

const Title: React.FC<TitleProps> = ({
  level = 1,
  children,
  style,
  className,
  id,
}) => {
  const variant = levelToVariant[level] || "h1";
  const finalId = id ? `title-${id}` : undefined;
  return (
    <Text
      id={finalId}
      variant={variant}
      weight="semibold"
      style={style}
      className={className}
    >
      {children}
    </Text>
  );
};

export default Title;
