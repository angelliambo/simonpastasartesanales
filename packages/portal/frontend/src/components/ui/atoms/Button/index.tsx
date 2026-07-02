import React from "react";
import { ButtonProps } from "./Button.types";
import { StyledButton, LoadingSpinner, ButtonIcon } from "./Button.styles";
import { usePersonalization } from "../../../../contexts/PersonalizationContext";
import { useThemeColors } from "../../../../hooks/useThemeColors";
import { mapButtonSize, mapButtonVariant } from "../shared";

/**
 * Button Component - Componente de botón unificado y accesible
 *
 * Combina las mejores características de las 3 versiones anteriores:
 * - Accesibilidad integrada (de atoms/Button.tsx)
 * - LoadingSpinner animado (de ui/Button.tsx)
 * - Sistema de colores unificado (useThemeColors)
 * - Soporte completo de variantes y tamaños
 * - Props de accesibilidad avanzadas
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  fullWidth = false,
  className,
  style,
  onClick,
  type = "button",
  icon,
  iconPosition = "left",
  id,
  accessibility: accessibilityProp,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
  "aria-disabled": ariaDisabled,
  ...rest
}) => {
  // Hooks para accesibilidad y colores
  const { accessibility: contextAccessibility } = usePersonalization();
  const colors = useThemeColors();

  // 🎯 MAPEAR PROPS CON SISTEMA UNIFICADO
  const mappedSize = mapButtonSize(size || "md"); // "small" → "sm", xxl → "xl"
  const mappedVariant = mapButtonVariant(variant || "primary"); // "danger" → "error"

  // Combinar props de accesibilidad
  const accessibility = {
    ...contextAccessibility,
    ...accessibilityProp,
  };

  // Manejar click
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && !loading && onClick) {
      onClick(event);
    }
  };

  // Aplicar estilos de accesibilidad dinámicos
  const getAccessibilityStyles = (): React.CSSProperties => {
    const styles: React.CSSProperties = {};

    // Font size multiplier del contexto de personalización
    if (
      accessibility.fontSizeMultiplier &&
      accessibility.fontSizeMultiplier !== 1
    ) {
      styles.fontSize = `${accessibility.fontSizeMultiplier * 16}px`;
    }

    // Increased spacing
    if (accessibility.increasedSpacing) {
      const multiplier = accessibility.spacingMultiplier || 1.5;

      // Ajustar padding basado en el tamaño actual
      const basePadding = {
        xs: { vertical: 4, horizontal: 8 },
        sm: { vertical: 6, horizontal: 12 },
        md: { vertical: 8, horizontal: 16 },
        lg: { vertical: 12, horizontal: 20 },
        xl: { vertical: 16, horizontal: 24 },
      }[mappedSize] || { vertical: 8, horizontal: 16 };

      styles.padding = `${basePadding.vertical * multiplier}px ${
        basePadding.horizontal * multiplier
      }px`;
    }

    return styles;
  };

  // Renderizar icono
  const renderIcon = () => {
    if (!icon || loading) return null;

      return (
        <ButtonIcon size={mappedSize} position={iconPosition}>
          {icon}
        </ButtonIcon>
      );
  };

  // Renderizar loading spinner
  const renderLoadingSpinner = () => {
    if (!loading) return null;

    return (
      <LoadingSpinner size={mappedSize} reducedMotion={accessibility.reducedMotion} />
    );
  };

  const finalId = id ? `button-${id}` : undefined;

  return (
    <StyledButton
      id={finalId}
      className={className}
      style={{
        ...getAccessibilityStyles(),
        ...style,
      }}
      onClick={handleClick}
      disabled={disabled || loading}
      type={type}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-disabled={ariaDisabled || disabled || loading}
      data-speak={accessibility.textToSpeech ? (children ?? "")?.toString() : undefined}
      $variant={mappedVariant}
      $size={mappedSize}
      $disabled={disabled || loading}
      $loading={loading}
      $fullWidth={fullWidth}
      colors={colors}
      accessibility={accessibility}
      {...rest}
    >
      {/* Icono a la izquierda */}
      {iconPosition === "left" && renderIcon()}

      {/* Loading spinner */}
      {renderLoadingSpinner()}

      {/* Contenido del botón */}
      <span style={{ opacity: loading ? 0.7 : 1 }}>{children}</span>

      {/* Icono a la derecha */}
      {iconPosition === "right" && renderIcon()}
    </StyledButton>
  );
};

// Componentes predefinidos para facilitar el uso (de atoms/Button.tsx)
export const PrimaryButton: React.FC<Omit<ButtonProps, "variant">> = (
  props
) => <Button variant="primary" {...props} />;

export const SecondaryButton: React.FC<Omit<ButtonProps, "variant">> = (
  props
) => <Button variant="secondary" {...props} />;

export const TertiaryButton: React.FC<Omit<ButtonProps, "variant">> = (
  props
) => <Button variant="tertiary" {...props} />;

export const SuccessButton: React.FC<Omit<ButtonProps, "variant">> = (
  props
) => <Button variant="success" {...props} />;

export const WarningButton: React.FC<Omit<ButtonProps, "variant">> = (
  props
) => <Button variant="warning" {...props} />;

export const ErrorButton: React.FC<Omit<ButtonProps, "variant">> = (props) => (
  <Button variant="error" {...props} />
);

export const InfoButton: React.FC<Omit<ButtonProps, "variant">> = (props) => (
  <Button variant="info" {...props} />
);

export const GhostButton: React.FC<Omit<ButtonProps, "variant">> = (props) => (
  <Button variant="ghost" {...props} />
);

export const LinkButton: React.FC<Omit<ButtonProps, "variant">> = (props) => (
  <Button variant="link" {...props} />
);

// Export por defecto
export default Button;
