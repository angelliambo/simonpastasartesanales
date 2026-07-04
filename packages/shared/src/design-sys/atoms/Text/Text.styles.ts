import styled, { css } from "styled-components";
import { StyledTextProps, VARIANT_MAPPING, FONT_WEIGHTS } from "./Text.types";

// Helper para obtener variante normalizada
const getNormalizedVariant = (variant?: string) => {
  if (!variant) return "body1";
  return VARIANT_MAPPING[variant] || variant;
};

// Styled Text principal (combinando mejores características de las 3 versiones)
export const StyledText = styled.span.withConfig({
  shouldForwardProp: (prop) =>
    ![
      "$variant",
      "$color",
      "$weight",
      "$align",
      "$size",
      "$lineHeight",
      "$fullWidth",
      "$truncate",
      "$uppercase",
      "$lowercase",
      "$capitalize",
      "$italic",
      "$underline",
      "$strikethrough",
      "$strong",
      "$disabled",
      "accessibility",
      "intensity",
      "copyable",
      "editable",
      "ellipsis",
      "margin",
      "padding",
      "code",
      "keyboard",
      "mark",
      "delete",
    ].includes(prop),
})<StyledTextProps>`
  /* Base styles */
  font-family: ${({ theme }) =>
    theme.typography?.fontFamily?.primary ||
    `var(--font-family-primary, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif)`};
  margin: 0;
  padding: 0;
  transition: ${({ accessibility }) =>
    accessibility?.reducedMotion ? "none" : "color 0.3s ease"};

  /* Typography variants (de atoms/Text.tsx mejorada) */
  ${({ theme, $variant = "body1", $size, accessibility }) => {
    const normalizedVariant = getNormalizedVariant($variant);
    const fontSize = theme.typography?.fontSize || {};
    const textMultiplier = accessibility?.largeText ? 1.25 : 1;

    // Si se especifica size, usarlo directamente
    if ($size && fontSize[$size]) {
      const baseSize = parseFloat(fontSize[$size]) || 16;
      return css`
        font-size: ${baseSize * textMultiplier}px;
      `;
    }

    // Tamaños por defecto según variant (expandidos)
    const variantSizes: { [key: string]: string } = {
      h1: fontSize.xxxl || "32px",
      h2: fontSize.xxl || "28px",
      h3: fontSize.xl || "24px",
      h4: fontSize.lg || "20px",
      h5: fontSize.md || "18px",
      h6: fontSize.sm || "16px",
      body1: fontSize.md || "16px",
      body2: fontSize.sm || "14px",
      caption: fontSize.xs || "12px",
      overline: fontSize.xs || "10px",
    };

    const baseSize = parseFloat(variantSizes[normalizedVariant] || "16px");
    return css`
      font-size: ${baseSize * textMultiplier}px;
    `;
  }}

  /* Font weight (combinado de todas las versiones) */
  ${({ theme, $weight = "normal" }) => {
    const weights = theme.typography?.fontWeight || FONT_WEIGHTS;
    const weightValue =
      weights[$weight as keyof typeof weights] || FONT_WEIGHTS.normal;
    return css`
      font-weight: ${weightValue};
    `;
  }}
  
  /* Colors (expandido combinando todas las versiones) */
  ${({ theme, $color, accessibility, intensity = "500" }) => {
    const colors = theme.colors || {};
    const highContrast = accessibility?.highContrast;

    // Sistema de colores con intensidad (de typography/)
    const getColorWithIntensity = (colorFamily: any, defaultColor: string) => {
      if (
        colorFamily &&
        typeof colorFamily === "object" &&
        colorFamily[intensity]
      ) {
        return colorFamily[intensity];
      }
      return defaultColor;
    };

    switch ($color) {
      case "primary":
        return css`
          color: ${highContrast
            ? "#000000"
            : getColorWithIntensity(
                colors.primary,
                colors.text?.primary || "#212529"
              )};
        `;
      case "secondary":
        return css`
          color: ${highContrast
            ? "#333333"
            : getColorWithIntensity(
                colors.secondary,
                colors.text?.secondary || "#6c757d"
              )};
        `;
      case "tertiary":
        return css`
          color: ${highContrast
            ? "#666666"
            : getColorWithIntensity(
                colors.tertiary,
                colors.text?.tertiary || "#868e96"
              )};
        `;
      case "inverse":
        return css`
          color: ${highContrast
            ? "#ffffff"
            : colors.text?.inverse || "#ffffff"};
        `;
      case "success":
        return css`
          color: ${getColorWithIntensity(
            colors.success,
            colors.success?.[600] || "#28a745"
          )};
        `;
      case "warning":
        return css`
          color: ${getColorWithIntensity(
            colors.warning,
            colors.warning?.[600] || "#ffc107"
          )};
        `;
      case "error":
        return css`
          color: ${getColorWithIntensity(
            colors.error,
            colors.error?.[600] || "#dc3545"
          )};
        `;
      case "info":
        return css`
          color: ${getColorWithIntensity(
            colors.info,
            colors.info?.[600] || "#17a2b8"
          )};
        `;
      default:
        return css`
          color: ${colors.text?.primary || "#212529"};
        `;
    }
  }}
  
  /* Text alignment */
  ${({ $align = "left" }) => css`
    text-align: ${$align};
  `}
  
  /* Line height */
  ${({ theme, $lineHeight = "normal" }) => {
    const lineHeights = theme.typography?.lineHeight || {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.8,
    };

    return css`
      line-height: ${lineHeights[$lineHeight] || 1.5};
    `;
  }}
  
  /* Variant-specific styles (de atoms/ y ui/) */
  ${({ $variant }) => {
    const normalizedVariant = getNormalizedVariant($variant);

    switch (normalizedVariant) {
      case "h1":
      case "h2":
      case "h3":
      case "h4":
      case "h5":
      case "h6":
        return css`
          display: block;
          line-height: 1.2;
          margin-bottom: ${({ theme }) => theme.spacing?.md || "16px"};
          font-weight: ${({ theme }) =>
            theme.typography?.fontWeight?.semibold || 600};
        `;
      case "overline":
        return css`
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: ${({ theme }) =>
            theme.typography?.fontWeight?.medium || 500};
        `;
      case "caption":
        return css`
          font-style: italic;
          opacity: 0.8;
        `;
      default:
        return css``;
    }
  }}
  
  /* Text modifiers (de typography/) */
  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
      display: block;
    `}
  
  ${({ $truncate }) =>
    $truncate &&
    css`
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `}
  
  ${({ $uppercase }) =>
    $uppercase &&
    css`
      text-transform: uppercase;
    `}
  
  ${({ $lowercase }) =>
    $lowercase &&
    css`
      text-transform: lowercase;
    `}
  
  ${({ $capitalize }) =>
    $capitalize &&
    css`
      text-transform: capitalize;
    `}
  
  ${({ $italic }) =>
    $italic &&
    css`
      font-style: italic;
    `}
  
  ${({ $underline }) =>
    $underline &&
    css`
      text-decoration: underline;
    `}
  
  ${({ $strikethrough }) =>
    $strikethrough &&
    css`
      text-decoration: line-through;
    `}
  
  ${({ $strong }) =>
    $strong &&
    css`
      font-weight: ${({ theme }) => theme.typography?.fontWeight?.bold || 700};
    `}
  
  /* States */
  ${({ $disabled }) =>
    $disabled &&
    css`
      opacity: 0.6;
      cursor: not-allowed;
      user-select: none;
    `}
  
  /* Interactive */
  ${({ onClick }) =>
    onClick &&
    css`
      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }

      &:active {
        opacity: 0.9;
      }
    `}
  
  /* Accessibility focus */
  &:focus-visible {
    outline: 2px solid
      ${({ theme, accessibility }) =>
        accessibility?.highContrast
          ? "#000000"
          : theme.colors?.primary?.[500] || "#007bff"};
    outline-offset: 2px;
  }
`;

// Text wrapper para diferentes elementos HTML
export const TextWrapper = styled.div<{
  $as?: keyof React.JSX.IntrinsicElements;
}>`
  display: contents;
`;

// Styled components para variantes específicas (de typography/)
export const CodeText = styled.code`
  font-family: ${({ theme }) =>
    theme.typography?.fontFamily?.mono ||
    `"Fira Code", "Monaco", "Consolas", monospace`};
  background-color: ${({ theme }) =>
    theme.colors?.background?.secondary || "#f8f9fa"};
  padding: 2px 4px;
  border-radius: 4px;
  font-size: 0.9em;
`;

export const KeyboardText = styled.kbd`
  font-family: ${({ theme }) =>
    theme.typography?.fontFamily?.mono ||
    `"Fira Code", "Monaco", "Consolas", monospace`};
  background-color: ${({ theme }) =>
    theme.colors?.background?.secondary || "#f8f9fa"};
  border: 1px solid ${({ theme }) => theme.colors?.border?.normal || "#dee2e6"};
  border-radius: 4px;
  padding: 2px 6px;
  font-size: 0.85em;
  box-shadow: inset 0 -1px 0 ${({ theme }) => theme.colors?.border?.light || "#e9ecef"};
`;

export const MarkText = styled.mark`
  background-color: ${({ theme }) =>
    (theme.colors?.warning as any)?.[200] || "#fff3cd"};
  padding: 1px 2px;
  border-radius: 2px;
`;
