import React from "react";
import { TextProps, VARIANT_MAPPING, HTML_ELEMENT_MAP } from "./Text.types";
import { StyledText, CodeText, KeyboardText, MarkText } from "./Text.styles";
import { usePersonalization } from "../../../../contexts/PersonalizationContext";

/**
 * Text Component - Componente de texto unificado y accesible
 *
 * Combina las mejores características de las 3 versiones anteriores:
 * - Sistema completo de variantes tipográficas (h1-h6, body1-2, caption, overline)
 * - Accesibilidad avanzada (usePersonalization, dislexia, alto contraste)
 * - Colores expandidos (8 colores + sistema de intensidad)
 * - Modificadores de texto (uppercase, italic, underline, etc.)
 * - Props semánticas (strong, code, mark, keyboard)
 * - 10 componentes predefinidos incluidos
 */
export const Text: React.FC<TextProps> = ({
  children,
  variant = "body1",
  color,
  weight = "normal",
  align = "left",
  size,
  lineHeight = "normal",
  intensity = "500",
  fullWidth = false,
  truncate = false,
  uppercase = false,
  lowercase = false,
  capitalize = false,
  italic = false,
  underline = false,
  strikethrough = false,
  strong = false,
  mark = false,
  code = false,
  keyboard = false,
  delete: isDelete = false,
  disabled = false,
  margin,
  padding,
  className,
  style,
  id,
  onClick,
  accessibility: accessibilityProp,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
  role,
  copyable = false,
  editable = false,
  ellipsis = false,
  ...rest
}) => {
  // Hooks para accesibilidad y personalización
  const { accessibility: contextAccessibility } = usePersonalization();

  // Combinar props de accesibilidad
  const accessibility = {
    ...contextAccessibility,
    ...accessibilityProp,
  };

  // Normalizar variante para compatibilidad
  const normalizedVariant = (VARIANT_MAPPING[variant] || variant) as
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "body1"
    | "body2"
    | "caption"
    | "overline";

  // Determinar elemento HTML apropiado
  const htmlElement = HTML_ELEMENT_MAP[normalizedVariant] || "span";

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

    // Soporte para dislexia (de atoms/Text.tsx)
    if (accessibility.dyslexiaSupport) {
      styles.fontFamily = "'OpenDyslexic', sans-serif";
    }

    // Spacing personalizado
    if (margin) {
      styles.margin = typeof margin === "number" ? `${margin}px` : margin;
    }

    if (padding) {
      styles.padding = typeof padding === "number" ? `${padding}px` : padding;
    }

    return styles;
  };

  // Renderizar contenido con wrappers semánticos
  const renderContent = () => {
    let content = children;

    // Aplicar wrappers semánticos en orden de prioridad
    if (mark) {
      content = <MarkText>{content}</MarkText>;
    }

    if (code) {
      content = <CodeText>{content}</CodeText>;
    }

    if (keyboard) {
      content = <KeyboardText>{content}</KeyboardText>;
    }

    if (isDelete) {
      content = <del>{content}</del>;
    }

    return content;
  };

  const finalId = id ? `text-${id}` : undefined;

  return (
    <StyledText
      id={finalId}
      as={htmlElement}
      className={className}
      style={{
        ...getAccessibilityStyles(),
        ...style,
      }}
      onClick={onClick}
      role={role}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      data-speak={
        accessibility.textToSpeech ? (children ?? "")?.toString() : undefined
      }
      // Styled props individuales
      $variant={normalizedVariant}
      $color={color}
      $weight={strong ? "bold" : weight}
      $align={align}
      $size={size}
      $lineHeight={lineHeight}
      $fullWidth={fullWidth}
      $truncate={truncate}
      $uppercase={uppercase}
      $lowercase={lowercase}
      $capitalize={capitalize}
      $italic={italic}
      $underline={underline}
      $strikethrough={strikethrough}
      $strong={strong}
      $disabled={disabled}
      accessibility={accessibility}
      intensity={intensity}
      {...rest}
    >
      {renderContent()}
    </StyledText>
  );
};

// Componentes predefinidos para facilitar el uso (de atoms/Text.tsx expandidos)
export const Heading1: React.FC<Omit<TextProps, "variant">> = (props) => (
  <Text variant="h1" {...props} />
);

export const Heading2: React.FC<Omit<TextProps, "variant">> = (props) => (
  <Text variant="h2" {...props} />
);

export const Heading3: React.FC<Omit<TextProps, "variant">> = (props) => (
  <Text variant="h3" {...props} />
);

export const Heading4: React.FC<Omit<TextProps, "variant">> = (props) => (
  <Text variant="h4" {...props} />
);

export const Heading5: React.FC<Omit<TextProps, "variant">> = (props) => (
  <Text variant="h5" {...props} />
);

export const Heading6: React.FC<Omit<TextProps, "variant">> = (props) => (
  <Text variant="h6" {...props} />
);

export const Body1: React.FC<Omit<TextProps, "variant">> = (props) => (
  <Text variant="body1" {...props} />
);

export const Body2: React.FC<Omit<TextProps, "variant">> = (props) => (
  <Text variant="body2" {...props} />
);

export const Caption: React.FC<Omit<TextProps, "variant">> = (props) => (
  <Text variant="caption" {...props} />
);

export const Overline: React.FC<Omit<TextProps, "variant">> = (props) => (
  <Text variant="overline" {...props} />
);

// Componentes semánticos adicionales
export const Strong: React.FC<Omit<TextProps, "strong">> = (props) => (
  <Text strong={true} {...props} />
);

export const Code: React.FC<Omit<TextProps, "code">> = (props) => (
  <Text code={true} {...props} />
);

export const Keyboard: React.FC<Omit<TextProps, "keyboard">> = (props) => (
  <Text keyboard={true} {...props} />
);

export const Mark: React.FC<Omit<TextProps, "mark">> = (props) => (
  <Text mark={true} {...props} />
);

export const Deleted: React.FC<Omit<TextProps, "delete">> = (props) => (
  <Text delete={true} {...props} />
);

// Componentes de colores para conveniencia
export const PrimaryText: React.FC<Omit<TextProps, "color">> = (props) => (
  <Text color="primary" {...props} />
);

export const SecondaryText: React.FC<Omit<TextProps, "color">> = (props) => (
  <Text color="secondary" {...props} />
);

export const SuccessText: React.FC<Omit<TextProps, "color">> = (props) => (
  <Text color="success" {...props} />
);

export const WarningText: React.FC<Omit<TextProps, "color">> = (props) => (
  <Text color="warning" {...props} />
);

export const ErrorText: React.FC<Omit<TextProps, "color">> = (props) => (
  <Text color="error" {...props} />
);

export const InfoText: React.FC<Omit<TextProps, "color">> = (props) => (
  <Text color="info" {...props} />
);

// Export por defecto
export default Text;
