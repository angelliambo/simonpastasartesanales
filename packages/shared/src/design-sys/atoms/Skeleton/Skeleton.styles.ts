import styled, { css, keyframes } from "styled-components";
import {
  StyledSkeletonProps,
  SkeletonTitleProps,
  SkeletonParagraphProps,
} from "./Skeleton.types";
import { createShouldForwardProp } from '../../utils/shouldForwardProp';

// =====================================
// ANIMACIONES
// =====================================

// Animación wave (onda)
const waveAnimation = keyframes`
  0% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

// Animación pulse (pulso)
const pulseAnimation = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
`;

// =====================================
// HELPER FUNCTIONS
// =====================================

// Obtener dimensiones basadas en tamaño
const getSkeletonDimensions = (size: string = "md") => {
  switch (size) {
    case "xs":
      return {
        borderRadius: 2,
        titleHeight: 12,
        paragraphHeight: 12,
        paragraphMargin: 8,
      };
    case "sm":
      return {
        borderRadius: 3,
        titleHeight: 14,
        paragraphHeight: 14,
        paragraphMargin: 10,
      };
    case "md":
      return {
        borderRadius: 4,
        titleHeight: 16,
        paragraphHeight: 14,
        paragraphMargin: 12,
      };
    case "lg":
      return {
        borderRadius: 5,
        titleHeight: 18,
        paragraphHeight: 16,
        paragraphMargin: 14,
      };
    case "xl":
      return {
        borderRadius: 6,
        titleHeight: 20,
        paragraphHeight: 18,
        paragraphMargin: 16,
      };
    default:
      return {
        borderRadius: 4,
        titleHeight: 16,
        paragraphHeight: 14,
        paragraphMargin: 12,
      };
  }
};

// Obtener colores del tema
const getSkeletonColors = (accessibility?: any) => {
  // Base colors - usar colores del sistema de diseño
  const baseColor = "#f0f0f0";
  const highlightColor = "#e8e8e8";
  
  // Si hay reduced motion, usar colores más simples
  if (accessibility?.reducedMotion) {
    return {
      base: baseColor,
      highlight: highlightColor,
    };
  }
  
  return {
    base: baseColor,
    highlight: highlightColor,
  };
};

// =====================================
// SKELETON BASE
// =====================================

const shouldForwardProp = createShouldForwardProp([
  "$size",
  "$active",
  "$animation",
  "$width",
  "$height",
  "$round",
  "accessibility",
]);

export const StyledSkeleton = styled.div.withConfig({
  shouldForwardProp,
})<StyledSkeletonProps>`
  display: inline-block;
  position: relative;
  overflow: hidden;
  background-color: ${({ accessibility }) =>
    getSkeletonColors(accessibility).base};
  border-radius: ${({ $size, $round }) => {
    const dims = getSkeletonDimensions($size);
    return $round ? "50%" : `${dims.borderRadius}px`;
  }};
  width: ${({ $width }) =>
    typeof $width === "number" ? `${$width}px` : $width || "100%"};
  height: ${({ $height }) =>
    typeof $height === "number" ? `${$height}px` : $height || "auto"};

  ${({ $active, $animation, accessibility }) => {
    if (!$active || $animation === "none") {
      return "";
    }

    const colors = getSkeletonColors(accessibility);

    if ($animation === "wave") {
      return css`
        &::after {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          transform: translateX(-100%);
          background: linear-gradient(
            90deg,
            transparent,
            ${colors.highlight},
            transparent
          );
          animation: ${waveAnimation} 1.6s ease-in-out infinite;
          content: "";
        }
      `;
    }

    if ($animation === "pulse") {
      return css`
        animation: ${pulseAnimation} 1.5s ease-in-out infinite;
      `;
    }

    return "";
  }}

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    animation: none !important;
    
    &::after {
      animation: none !important;
    }
  }

  ${({ accessibility }) =>
    accessibility?.reducedMotion &&
    css`
      animation: none !important;
      
      &::after {
        animation: none !important;
      }
    `}
`;

// =====================================
// SKELETON TITLE
// =====================================

const shouldForwardPropTitle = createShouldForwardProp([
  "$size",
  "$width",
  "$active",
  "$animation",
  "accessibility",
]);

export const SkeletonTitle = styled.div.withConfig({
  shouldForwardProp: shouldForwardPropTitle,
})<SkeletonTitleProps>`
  height: ${({ $size }) => getSkeletonDimensions($size).titleHeight}px;
  width: ${({ $width }) =>
    typeof $width === "number" ? `${$width}px` : $width || "60%"};
  margin-bottom: ${({ $size }) => getSkeletonDimensions($size).paragraphMargin}px;
  background-color: ${({ accessibility }) =>
    getSkeletonColors(accessibility).base};
  border-radius: ${({ $size }) => getSkeletonDimensions($size).borderRadius}px;

  ${({ $active, $animation, accessibility }) => {
    if (!$active || $animation === "none") {
      return "";
    }

    const colors = getSkeletonColors(accessibility);

    if ($animation === "wave") {
      return css`
        position: relative;
        overflow: hidden;
        &::after {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          transform: translateX(-100%);
          background: linear-gradient(
            90deg,
            transparent,
            ${colors.highlight},
            transparent
          );
          animation: ${waveAnimation} 1.6s ease-in-out infinite;
          content: "";
        }
      `;
    }

    if ($animation === "pulse") {
      return css`
        animation: ${pulseAnimation} 1.5s ease-in-out infinite;
      `;
    }

    return "";
  }}

  @media (prefers-reduced-motion: reduce) {
    animation: none !important;
    
    &::after {
      animation: none !important;
    }
  }

  ${({ accessibility }) =>
    accessibility?.reducedMotion &&
    css`
      animation: none !important;
      
      &::after {
        animation: none !important;
      }
    `}
`;

// =====================================
// SKELETON PARAGRAPH
// =====================================

const shouldForwardPropParagraph = createShouldForwardProp([
  "$size",
  "$rows",
  "$widths",
  "$active",
  "$animation",
  "accessibility",
]);

export const SkeletonParagraph = styled.div.withConfig({
  shouldForwardProp: shouldForwardPropParagraph,
})<SkeletonParagraphProps>`
  display: flex;
  flex-direction: column;
  gap: ${({ $size }) => getSkeletonDimensions($size).paragraphMargin}px;
`;

export interface SkeletonParagraphRowProps extends SkeletonParagraphProps {
  $rowIndex?: number;
}

const shouldForwardPropRow = createShouldForwardProp([
  "$size",
  "$rows",
  "$widths",
  "$rowIndex",
  "$active",
  "$animation",
  "accessibility",
]);

export const SkeletonParagraphRow = styled.div.withConfig({
  shouldForwardProp: shouldForwardPropRow,
})<SkeletonParagraphRowProps>`
  height: ${({ $size }) => getSkeletonDimensions($size).paragraphHeight}px;
  width: ${({ $widths, $rowIndex = 0 }) => {
    if (!$widths || !Array.isArray($widths)) {
      return "100%";
    }
    const width = $widths[$rowIndex] || $widths[$widths.length - 1] || "100%";
    return typeof width === "number" ? `${width}px` : width;
  }};
  background-color: ${({ accessibility }) =>
    getSkeletonColors(accessibility).base};
  border-radius: ${({ $size }) => getSkeletonDimensions($size).borderRadius}px;

  ${({ $active, $animation, accessibility, $rowIndex = 0 }) => {
    if (!$active || $animation === "none") {
      return "";
    }

    const colors = getSkeletonColors(accessibility);
    const delay = $rowIndex * 0.1;

    if ($animation === "wave") {
      return css`
        position: relative;
        overflow: hidden;
        &::after {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          transform: translateX(-100%);
          background: linear-gradient(
            90deg,
            transparent,
            ${colors.highlight},
            transparent
          );
          animation: ${waveAnimation} 1.6s ease-in-out infinite;
          animation-delay: ${delay}s;
          content: "";
        }
      `;
    }

    if ($animation === "pulse") {
      return css`
        animation: ${pulseAnimation} 1.5s ease-in-out infinite;
        animation-delay: ${delay}s;
      `;
    }

    return "";
  }}

  @media (prefers-reduced-motion: reduce) {
    animation: none !important;
    
    &::after {
      animation: none !important;
    }
  }

  ${({ accessibility }) =>
    accessibility?.reducedMotion &&
    css`
      animation: none !important;
      
      &::after {
        animation: none !important;
      }
    `}
`;

// =====================================
// SKELETON BUTTON
// =====================================

export const SkeletonButton = styled(StyledSkeleton)`
  height: ${({ $size }) => {
    switch ($size) {
      case "xs":
        return "24px";
      case "sm":
        return "32px";
      case "md":
        return "40px";
      case "lg":
        return "48px";
      case "xl":
        return "56px";
      default:
        return "40px";
    }
  }};
  border-radius: ${({ $size }) => getSkeletonDimensions($size).borderRadius}px;
`;

// =====================================
// SKELETON INPUT
// =====================================

export const SkeletonInput = styled(StyledSkeleton)`
  height: ${({ $size }) => {
    switch ($size) {
      case "xs":
        return "24px";
      case "sm":
        return "32px";
      case "md":
        return "40px";
      case "lg":
        return "48px";
      case "xl":
        return "56px";
      default:
        return "40px";
    }
  }};
  border-radius: ${({ $size }) => getSkeletonDimensions($size).borderRadius}px;
`;

// =====================================
// SKELETON AVATAR
// =====================================

export const SkeletonAvatar = styled(StyledSkeleton)<{
  $shape?: "circle" | "square";
}>`
  width: ${({ $size }) => {
    switch ($size) {
      case "xs":
        return "24px";
      case "sm":
        return "32px";
      case "md":
        return "40px";
      case "lg":
        return "56px";
      case "xl":
        return "80px";
      default:
        return "40px";
    }
  }};
  height: ${({ $size }) => {
    switch ($size) {
      case "xs":
        return "24px";
      case "sm":
        return "32px";
      case "md":
        return "40px";
      case "lg":
        return "56px";
      case "xl":
        return "80px";
      default:
        return "40px";
    }
  }};
  border-radius: ${({ $shape, $size }) => {
    const dims = getSkeletonDimensions($size);
    return $shape === "circle" ? "50%" : `${dims.borderRadius}px`;
  }};
`;

// =====================================
// SKELETON IMAGE
// =====================================

export const SkeletonImage = styled(StyledSkeleton)`
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: ${({ $size }) => getSkeletonDimensions($size).borderRadius}px;
`;

