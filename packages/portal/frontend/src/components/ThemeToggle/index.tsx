import React from "react";
import Tooltip from "@design-sys/atoms/Tooltip";
import { ZnIcon } from "@design-sys/atoms/ZnIcon";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";
import { useTheme } from "../../styles/ThemeProvider";
import { IconButton, RowButton, ModeLabel } from "./ThemeToggle.styles";

interface ThemeToggleProps {
  variant?: "icon" | "row";
  showLabel?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = "icon",
  showLabel = false,
  className,
  style,
}) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const title = isDark ? "Cambiar a Modo Claro" : "Cambiar a Modo Oscuro";

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    toggleTheme();
  };

  if (variant === "row") {
    return (
      <RowButton
        $isDark={isDark}
        onClick={handleClick}
        className={className}
        style={style}
        title={title}
        aria-label={title}
        type="button"
      >
        <ZnIcon icon={isDark ? SunOutlined : MoonOutlined} />
        <ModeLabel>{isDark ? "Modo Oscuro" : "Modo Claro"}</ModeLabel>
      </RowButton>
    );
  }

  return (
    <IconButton
      $isDark={isDark}
      onClick={handleClick}
      className={className}
      style={style}
      title={title}
      aria-label={title}
      type="button"
    >
      <ZnIcon icon={isDark ? SunOutlined : MoonOutlined} />
      {showLabel && <ModeLabel style={{ marginLeft: 6 }}>{isDark ? "Oscuro" : "Claro"}</ModeLabel>}
    </IconButton>
  );
};

export default ThemeToggle;
