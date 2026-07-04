import styled, { css, keyframes } from "styled-components";
import {
  TooltipOverlayProps,
  TooltipContentProps,
  TooltipArrowProps,
  TooltipPlacement,
} from "./Tooltip.types";

// =====================================
// ANIMATIONS
// =====================================

// Animación fade in/out
const tooltipFadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

// Animación slide según placement
const tooltipSlideIn = (placement: TooltipPlacement) => {
  const offset = "8px";
  
  switch (placement) {
    case "top":
    case "topLeft":
    case "topRight":
      return keyframes`
        from { transform: translateY(${offset}); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      `;
    case "bottom":
    case "bottomLeft":
    case "bottomRight":
      return keyframes`
        from { transform: translateY(-${offset}); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      `;
    case "left":
    case "leftTop":
    case "leftBottom":
      return keyframes`
        from { transform: translateX(${offset}); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      `;
    case "right":
    case "rightTop":
    case "rightBottom":
      return keyframes`
        from { transform: translateX(-${offset}); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      `;
    default:
      return tooltipFadeIn;
  }
};

// =====================================
// HELPER FUNCTIONS
// =====================================

// Obtener dimensiones basadas en tamaño
const getTooltipDimensions = (size: string = "md") => {
  switch (size) {
    case "xs":
      return {
        padding: { vertical: 2, horizontal: 6 },
        fontSize: 10,
        maxWidth: 150,
        arrowSize: 4,
        borderRadius: 2,
      };
    case "sm":
      return {
        padding: { vertical: 4, horizontal: 8 },
        fontSize: 12,
        maxWidth: 200,
        arrowSize: 5,
        borderRadius: 4,
      };
    case "md":
      return {
        padding: { vertical: 6, horizontal: 12 },
        fontSize: 14,
        maxWidth: 300,
        arrowSize: 6,
        borderRadius: 6,
      };
    case "lg":
      return {
        padding: { vertical: 8, horizontal: 16 },
        fontSize: 16,
        maxWidth: 400,
        arrowSize: 8,
        borderRadius: 8,
      };
    default:
      return {
        padding: { vertical: 6, horizontal: 12 },
        fontSize: 14,
        maxWidth: 300,
        arrowSize: 6,
        borderRadius: 6,
      };
  }
};

// Obtener colores basados en variante
const getTooltipColors = (variant: string = "dark", theme: any) => {
  const colors = theme?.colors || {};
  
  switch (variant) {
    case "primary":
      return {
        background: colors.primary?.[500] || "#007bff",
        color: "#ffffff",
        border: colors.primary?.[600] || "#0056b3",
        shadow: "0 4px 12px rgba(0, 123, 255, 0.15)",
      };
    case "secondary":
      return {
        background: colors.secondary?.[500] || "#6c757d",
        color: "#ffffff",
        border: colors.secondary?.[600] || "#545862",
        shadow: "0 4px 12px rgba(108, 117, 125, 0.15)",
      };
    case "success":
      return {
        background: colors.success?.[500] || "#28a745",
        color: "#ffffff",
        border: colors.success?.[600] || "#218838",
        shadow: "0 4px 12px rgba(40, 167, 69, 0.15)",
      };
    case "warning":
      return {
        background: colors.warning?.[500] || "#ffc107",
        color: "#000000",
        border: colors.warning?.[600] || "#e0a800",
        shadow: "0 4px 12px rgba(255, 193, 7, 0.15)",
      };
    case "error":
      return {
        background: colors.error?.[500] || "#dc3545",
        color: "#ffffff",
        border: colors.error?.[600] || "#c82333",
        shadow: "0 4px 12px rgba(220, 53, 69, 0.15)",
      };
    case "info":
      return {
        background: colors.info?.[500] || "#17a2b8",
        color: "#ffffff",
        border: colors.info?.[600] || "#138496",
        shadow: "0 4px 12px rgba(23, 162, 184, 0.15)",
      };
    case "light":
      return {
        background: colors.background?.card || "#ffffff",
        color: colors.text?.primary || "#212529",
        border: colors.border?.normal || "#ced4da",
        shadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      };
    case "inverse":
      return {
        background: colors.text?.inverse || "#ffffff",
        color: colors.text?.primary || "#212529",
        border: colors.border?.light || "#dee2e6",
        shadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      };
    case "dark":
    default:
      return {
        background: "#000000",
        color: "#ffffff",
        border: "#333333",
        shadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      };
  }
};

// =====================================
// TOOLTIP OVERLAY (POSICIONADO)
// =====================================

export const TooltipOverlay = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    ![
      "$placement",
      "$size",
      "$variant",
      "$visible",
      "accessibility",
      "zIndex",
    ].includes(prop),
})<TooltipOverlayProps>`
  position: absolute;
  z-index: ${({ zIndex = 1060 }) => zIndex};
  
  /* Visibility control */
  ${({ $visible = false }) =>
    $visible
      ? css`
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
        `
      : css`
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        `}
  
  /* 🎯 Animaciones usando placement */
  ${({ accessibility, $placement = "top" }) =>
    accessibility?.reducedMotion
      ? css`
          transition: opacity 0.1s ease;
        `
      : css`
          animation: ${tooltipSlideIn($placement)} 0.15s ease-out;
          transition: opacity 0.15s ease, visibility 0.15s ease;
        `}
  
  /* Transform origin según placement */
  ${({ $placement = "top" }) => {
    switch ($placement) {
      case "top":
      case "topLeft":
      case "topRight":
        return css`transform-origin: bottom center;`;
      case "bottom":
      case "bottomLeft":
      case "bottomRight":
        return css`transform-origin: top center;`;
      case "left":
      case "leftTop":
      case "leftBottom":
        return css`transform-origin: right center;`;
      case "right":
      case "rightTop":
      case "rightBottom":
        return css`transform-origin: left center;`;
      default:
        return css`transform-origin: center;`;
    }
  }}
  
  /* Accesibilidad - Alto contraste */
  ${({ accessibility }) =>
    accessibility?.highContrast &&
    css`
      filter: contrast(1.2);
      border: 2px solid #000000 !important;
    `}
`;

// =====================================
// TOOLTIP CONTENT
// =====================================

export const TooltipContent = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !["$size", "$variant", "accessibility"].includes(prop),
})<TooltipContentProps>`
  position: relative;
  word-wrap: break-word;
  
  /* 🎯 Dimensions usando shared systems */
  ${({ $size = "md", accessibility }) => {
    const dims = getTooltipDimensions($size);
    const spacingMultiplier = accessibility?.increasedSpacing
      ? accessibility.spacingMultiplier || 1.5
      : 1;
    const textMultiplier = accessibility?.largeText ? 1.25 : 1;
    
    return css`
      padding: ${dims.padding.vertical * spacingMultiplier}px 
                ${dims.padding.horizontal * spacingMultiplier}px;
      font-size: ${dims.fontSize * textMultiplier}px;
      max-width: ${dims.maxWidth}px;
      border-radius: ${dims.borderRadius}px;
    `;
  }}
  
  /* 🎯 Colors usando variant system */
  ${({ theme, $variant = "dark", accessibility }) => {
    const tooltipColors = getTooltipColors($variant, theme);
    
    return css`
      background-color: ${tooltipColors.background};
      color: ${tooltipColors.color};
      border: 1px solid ${tooltipColors.border};
      box-shadow: ${tooltipColors.shadow};
      
      ${accessibility?.highContrast &&
      css`
        background-color: ${tooltipColors.color === "#ffffff" ? "#000000" : "#ffffff"};
        color: ${tooltipColors.color === "#ffffff" ? "#ffffff" : "#000000"};
        border: 2px solid #000000;
      `}
    `;
  }}
  
  /* Typography */
  font-weight: ${({ theme }) => theme?.typography?.fontWeight?.medium || 500};
  line-height: 1.4;
  text-align: center;
  
  /* Accesibilidad - Text to speech */
  ${({ accessibility }) =>
    accessibility?.textToSpeech &&
    css`
      speak: always;
    `}
`;

// =====================================
// TOOLTIP ARROW
// =====================================

export const TooltipArrow = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !["$placement", "$size", "$variant", "accessibility"].includes(prop),
})<TooltipArrowProps>`
  position: absolute;
  
  /* 🎯 Arrow size usando shared systems */
  ${({ $size = "md" }) => {
    const dims = getTooltipDimensions($size);
    return css`
      width: ${dims.arrowSize * 2}px;
      height: ${dims.arrowSize * 2}px;
    `;
  }}
  
  /* Arrow positioning según placement */
  ${({ $placement = "top", $size = "md" }) => {
    const dims = getTooltipDimensions($size);
    const arrowSize = dims.arrowSize;
    
    switch ($placement) {
      case "top":
        return css`
          bottom: -${arrowSize}px;
          left: 50%;
          transform: translateX(-50%) rotate(45deg);
        `;
      case "topLeft":
        return css`
          bottom: -${arrowSize}px;
          left: ${arrowSize * 2}px;
          transform: rotate(45deg);
        `;
      case "topRight":
        return css`
          bottom: -${arrowSize}px;
          right: ${arrowSize * 2}px;
          transform: rotate(45deg);
        `;
      case "bottom":
        return css`
          top: -${arrowSize}px;
          left: 50%;
          transform: translateX(-50%) rotate(45deg);
        `;
      case "bottomLeft":
        return css`
          top: -${arrowSize}px;
          left: ${arrowSize * 2}px;
          transform: rotate(45deg);
        `;
      case "bottomRight":
        return css`
          top: -${arrowSize}px;
          right: ${arrowSize * 2}px;
          transform: rotate(45deg);
        `;
      case "left":
        return css`
          right: -${arrowSize}px;
          top: 50%;
          transform: translateY(-50%) rotate(45deg);
        `;
      case "leftTop":
        return css`
          right: -${arrowSize}px;
          top: ${arrowSize * 2}px;
          transform: rotate(45deg);
        `;
      case "leftBottom":
        return css`
          right: -${arrowSize}px;
          bottom: ${arrowSize * 2}px;
          transform: rotate(45deg);
        `;
      case "right":
        return css`
          left: -${arrowSize}px;
          top: 50%;
          transform: translateY(-50%) rotate(45deg);
        `;
      case "rightTop":
        return css`
          left: -${arrowSize}px;
          top: ${arrowSize * 2}px;
          transform: rotate(45deg);
        `;
      case "rightBottom":
        return css`
          left: -${arrowSize}px;
          bottom: ${arrowSize * 2}px;
          transform: rotate(45deg);
        `;
      default:
        return css`
          bottom: -${arrowSize}px;
          left: 50%;
          transform: translateX(-50%) rotate(45deg);
        `;
    }
  }}
  
  /* Arrow colors heredadas del content */
  ${({ theme, $variant = "dark", accessibility }) => {
    const tooltipColors = getTooltipColors($variant, theme);
    
    return css`
      background-color: ${tooltipColors.background};
      border: 1px solid ${tooltipColors.border};
      
      ${accessibility?.highContrast &&
      css`
        background-color: ${tooltipColors.color === "#ffffff" ? "#000000" : "#ffffff"};
        border: 2px solid #000000;
      `}
    `;
  }}
  
  /* Arrow shadow clipping */
  &::before {
    content: "";
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    background: inherit;
    border: inherit;
    z-index: -1;
  }
`;

// =====================================
// VARIANTS PREDEFINIDAS
// =====================================

// Tooltip con sombra elevada
export const ElevatedTooltip = styled(TooltipContent)`
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.08);
`;

// Tooltip minimalista sin borde
export const MinimalTooltip = styled(TooltipContent)`
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

// Tooltip con border grueso
export const BorderedTooltip = styled(TooltipContent)`
  border-width: 2px;
  border-style: solid;
`;

// Tooltip compacto (padding reducido)
export const CompactTooltip = styled(TooltipContent)`
  ${({ $size = "md" }) => {
    const dims = getTooltipDimensions($size);
    return css`
      padding: ${dims.padding.vertical / 2}px ${dims.padding.horizontal / 2}px;
      font-size: ${dims.fontSize - 1}px;
    `;
  }}
`;

// =====================================
// TOOLTIP WRAPPER PARA POSITIONING
// =====================================

export const TooltipWrapper = styled.div`
  display: inline-block;
  position: relative;
`;

// =====================================
// LOADING TOOLTIP
// =====================================

export const TooltipLoading = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  
  &::before {
    content: "";
    width: 12px;
    height: 12px;
    border: 2px solid transparent;
    border-top: 2px solid currentColor;
    border-radius: 50%;
    animation: ${keyframes`
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    `} 1s linear infinite;
  }
`;

// =====================================
// HELPERS EXPORTADOS
// =====================================

export { getTooltipDimensions, getTooltipColors, tooltipSlideIn };
