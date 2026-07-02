import React, { useState, useEffect } from "react";
import {
  ToggleContainer,
  ToggleButton,
  ToggleLabel,
  Icon,
} from "../styles/darkModeToggle.mixins";

interface DarkModeToggleProps {
  className?: string;
  style?: React.CSSProperties;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  onToggle?: (isDark: boolean) => void;
  /** ID único del componente (opcional) - se concatena con "dark-mode-toggle-" */
  id?: string;
}

export const DarkModeToggle: React.FC<DarkModeToggleProps> = ({
  className,
  style,
  size = "md",
  showLabel = true,
  onToggle,
  id,
}) => {
  const [isDark, setIsDark] = useState(false);

  // Cargar estado inicial del localStorage del usuario
  useEffect(() => {
    const savedTheme = localStorage.getItem("zn-portal-user-theme");
    let initialTheme = false; // Por defecto light mode

    if (savedTheme) {
      try {
        const themeConfig = JSON.parse(savedTheme);
        initialTheme = themeConfig.theme === "dark";
      } catch {
        // Si hay error, usar light mode por defecto
      }
    }
    // NO usar preferencia del sistema automáticamente

    setIsDark(initialTheme);
    applyDarkMode(initialTheme);
  }, []);

  // Aplicar dark mode al DOM
  const applyDarkMode = (isDarkMode: boolean) => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
      document.body.classList.add("dark-mode");

      // Variables CSS para dark mode
      document.documentElement.style.setProperty(
        "--color-bg-primary",
        "#1a1a1a"
      );
      document.documentElement.style.setProperty(
        "--color-bg-secondary",
        "#2d2d2d"
      );
      document.documentElement.style.setProperty("--color-bg-card", "#3a3a3a");
      document.documentElement.style.setProperty(
        "--color-text-primary",
        "#ffffff"
      );
      document.documentElement.style.setProperty(
        "--color-text-secondary",
        "#b3b3b3"
      );
      document.documentElement.style.setProperty("--color-border", "#404040");
    } else {
      document.documentElement.classList.remove("dark-mode");
      document.body.classList.remove("dark-mode");

      // Variables CSS para light mode
      document.documentElement.style.setProperty(
        "--color-bg-primary",
        "#ffffff"
      );
      document.documentElement.style.setProperty(
        "--color-bg-secondary",
        "#f5f5f5"
      );
      document.documentElement.style.setProperty("--color-bg-card", "#ffffff");
      document.documentElement.style.setProperty(
        "--color-text-primary",
        "#262626"
      );
      document.documentElement.style.setProperty(
        "--color-text-secondary",
        "#8c8c8c"
      );
      document.documentElement.style.setProperty("--color-border", "#d9d9d9");
    }
  };

  const handleToggle = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);
    applyDarkMode(newDarkMode);

    // Guardar en la nueva clave de localStorage
    const themeConfig = {
      theme: newDarkMode ? "dark" : "light",
      accessibility: "default",
    };
    localStorage.setItem("zn-portal-user-theme", JSON.stringify(themeConfig));

    // Callback opcional
    if (onToggle) {
      onToggle(newDarkMode);
    }
  };

  // Tamaños del toggle
  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return {
          toggleWidth: "36px",
          toggleHeight: "18px",
          knobSize: "14px",
          fontSize: "12px",
        };
      case "lg":
        return {
          toggleWidth: "60px",
          toggleHeight: "30px",
          knobSize: "26px",
          fontSize: "16px",
        };
      default: // md
        return {
          toggleWidth: "48px",
          toggleHeight: "24px",
          knobSize: "20px",
          fontSize: "14px",
        };
    }
  };

  const sizeStyles = getSizeStyles();

  const finalId = id ? `dark-mode-toggle-${id}` : undefined;

  return (
    <ToggleContainer
      id={finalId}
      $isDark={isDark}
      className={className}
      style={style}
      onClick={handleToggle}
      role="switch"
      aria-checked={isDark}
      aria-label={`Cambiar a modo ${isDark ? "claro" : "oscuro"}`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleToggle();
        }
      }}
    >
      <Icon style={{ fontSize: sizeStyles.fontSize }}>
        {isDark ? "🌙" : "☀️"}
      </Icon>

      <ToggleButton
        $isDark={isDark}
        style={{
          width: sizeStyles.toggleWidth,
          height: sizeStyles.toggleHeight,
        }}
        aria-hidden="true"
      >
        <span
          style={{
            position: "absolute",
            top: "2px",
            left: isDark
              ? `calc(${sizeStyles.toggleWidth} - ${sizeStyles.knobSize} - 2px)`
              : "2px",
            width: sizeStyles.knobSize,
            height: sizeStyles.knobSize,
            borderRadius: "50%",
            background: "white",
            transition: "all 0.3s ease",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        />
      </ToggleButton>

      {showLabel && (
        <ToggleLabel $isDark={isDark} style={{ fontSize: sizeStyles.fontSize }}>
          {isDark ? "Oscuro" : "Claro"}
        </ToggleLabel>
      )}
    </ToggleContainer>
  );
};

export default DarkModeToggle;
