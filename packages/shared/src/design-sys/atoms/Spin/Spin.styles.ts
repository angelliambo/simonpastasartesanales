import styled, { css, keyframes } from "styled-components";
import {
  StyledSpinProps,
  SpinIndicatorProps,
  SpinOverlayProps,
  SpinContentProps,
  SpinTipProps,
  ANIMATION_CONFIGS,
} from "./Spin.types";
import { createShouldForwardProp } from '../../utils/shouldForwardProp';

// =====================================
// ANIMATIONS POR TIPO DE INDICADOR
// =====================================

// Spinner circular clásico
const spinnerRotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// Dots pulsantes
const dotsAnimation = keyframes`
  0%, 80%, 100% { 
    transform: scale(0);
    opacity: 0.5;
  }
  40% { 
    transform: scale(1);
    opacity: 1;
  }
`;

// Bars animadas
const barsAnimation = keyframes`
  0%, 40%, 100% { 
    transform: scaleY(0.4);
    opacity: 0.5;
  }
  20% { 
    transform: scaleY(1.0);
    opacity: 1;
  }
`;

// Pulse expansivo
const pulseAnimation = keyframes`
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
`;

// Bounce suave
const bounceAnimation = keyframes`
  0%, 80%, 100% { 
    transform: scale(0);
  }
  40% { 
    transform: scale(1);
  }
`;

// =====================================
// HELPER FUNCTIONS
// =====================================

// Obtener dimensiones basadas en tamaño
const getSpinDimensions = (size: string = "md") => {
  switch (size) {
    case "xs":
      return {
        size: 16,
        borderWidth: 2,
        dotSize: 3,
        barWidth: 2,
        barHeight: 12,
        tipFontSize: 10,
      };
    case "sm":
      return {
        size: 20,
        borderWidth: 2,
        dotSize: 4,
        barWidth: 3,
        barHeight: 16,
        tipFontSize: 12,
      };
    case "md":
      return {
        size: 24,
        borderWidth: 3,
        dotSize: 5,
        barWidth: 4,
        barHeight: 20,
        tipFontSize: 14,
      };
    case "lg":
      return {
        size: 32,
        borderWidth: 4,
        dotSize: 6,
        barWidth: 5,
        barHeight: 24,
        tipFontSize: 16,
      };
    case "xl":
      return {
        size: 40,
        borderWidth: 4,
        dotSize: 8,
        barWidth: 6,
        barHeight: 30,
        tipFontSize: 18,
      };
    default:
      return {
        size: 24,
        borderWidth: 3,
        dotSize: 5,
        barWidth: 4,
        barHeight: 20,
        tipFontSize: 14,
      };
  }
};

// Obtener colores del spinner
const getSpinColors = (theme: any) => {
  return {
    primary: theme?.colors?.primary?.[500] || "#007bff",
    secondary: theme?.colors?.primary?.[200] || "#90caf9",
    text: theme?.colors?.text?.secondary || "#6c757d",
    overlay: "rgba(255, 255, 255, 0.8)",
  };
};

// =====================================
// MAIN SPIN CONTAINER
// =====================================

export const StyledSpin = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    ![
      "$spinning",
      "$size",
      "$indicator",
      "$hasChildren",
      "accessibility",
    ].includes(prop),
})<StyledSpinProps>`
  position: ${({ $hasChildren }) =>
    $hasChildren ? "relative" : "inline-block"};
  display: ${({ $hasChildren }) => ($hasChildren ? "contents" : "inline-flex")};
  align-items: center;
  justify-content: center;
  flex-direction: column;

  /* Cuando envuelve contenido */
  ${({ $hasChildren }) =>
    $hasChildren &&
    css`
      width: 100%;
      min-height: 60px;
    `}
`;

// =====================================
// SPIN OVERLAY (cuando envuelve contenido)
// =====================================

export const SpinOverlay = styled.div.withConfig({
  shouldForwardProp: createShouldForwardProp(["$spinning", "accessibility"]),
})<SpinOverlayProps>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  /* Background overlay */
  ${({ theme }) => {
    const colors = getSpinColors(theme);
    return css`
      background-color: ${colors.overlay};
    `;
  }}

  /* Z-index para estar encima del contenido */
  z-index: 10;

  /* Visibilidad */
  opacity: ${({ $spinning }) => ($spinning ? 1 : 0)};
  visibility: ${({ $spinning }) => ($spinning ? "visible" : "hidden")};

  /* Transiciones */
  ${({ accessibility }) =>
    accessibility?.reducedMotion
      ? css`
          transition: none;
        `
      : css`
          transition: opacity 0.3s ease, visibility 0.3s ease;
        `}
`;

// =====================================
// SPIN CONTENT (contenido envuelto)
// =====================================

export const SpinContent = styled.div.withConfig({
  shouldForwardProp: createShouldForwardProp(["$spinning", "accessibility"]),
})<SpinContentProps>`
  /* Blur effect cuando está spinning */
  ${({ $spinning, accessibility }) =>
    $spinning &&
    !accessibility?.reducedMotion &&
    css`
      filter: blur(0.5px);
      pointer-events: none;
      user-select: none;
    `}

  /* Transición del blur */
  ${({ accessibility }) =>
    accessibility?.reducedMotion
      ? css`
          transition: none;
        `
      : css`
          transition: filter 0.3s ease;
        `}
`;

// =====================================
// SPIN INDICATORS
// =====================================

// Base para todos los indicadores
const BaseSpinIndicator = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !["$size", "$indicator", "accessibility"].includes(prop),
})<SpinIndicatorProps>`
  ${({ $size = "md" }) => {
    const dims = getSpinDimensions($size);
    return css`
      width: ${dims.size}px;
      height: ${dims.size}px;
    `;
  }}
`;

// Spinner circular
export const SpinnerIndicator = styled(BaseSpinIndicator)`
  border: ${({ $size = "md", theme }) => {
    const dims = getSpinDimensions($size);
    const colors = getSpinColors(theme);
    return `${dims.borderWidth}px solid ${colors.secondary}`;
  }};

  border-top: ${({ $size = "md", theme }) => {
    const dims = getSpinDimensions($size);
    const colors = getSpinColors(theme);
    return `${dims.borderWidth}px solid ${colors.primary}`;
  }};

  border-radius: 50%;

  /* Animación */
  ${({ accessibility }) =>
    accessibility?.reducedMotion
      ? css`
          /* Fallback para reduced motion */
          &::after {
            content: "⏳";
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 0.8em;
          }
        `
      : css`
          animation: ${spinnerRotate} ${ANIMATION_CONFIGS.spinner.duration}
            ${ANIMATION_CONFIGS.spinner.easing}
            ${ANIMATION_CONFIGS.spinner.iterationCount};
        `}
`;

// Dots pulsantes
export const DotsIndicator = styled(BaseSpinIndicator)`
  display: flex;
  align-items: center;
  justify-content: space-between;

  /* Crear 3 dots */
  &::before,
  &::after,
  & {
    ${({ $size = "md", theme }) => {
      const dims = getSpinDimensions($size);
      const colors = getSpinColors(theme);
      return css`
        width: ${dims.dotSize}px;
        height: ${dims.dotSize}px;
        background-color: ${colors.primary};
        border-radius: 50%;
      `;
    }}
  }

  &::before,
  &::after {
    content: "";
    display: block;
  }

  /* Animación escalonada */
  ${({ accessibility }) =>
    accessibility?.reducedMotion
      ? css`
          /* Mostrar puntos estáticos */
          &::before,
          &::after,
          & {
            opacity: 0.6;
          }
        `
      : css`
          &::before {
            animation: ${dotsAnimation} ${ANIMATION_CONFIGS.dots.duration}
              ${ANIMATION_CONFIGS.dots.easing}
              ${ANIMATION_CONFIGS.dots.iterationCount};
          }

          & {
            animation: ${dotsAnimation} ${ANIMATION_CONFIGS.dots.duration}
              ${ANIMATION_CONFIGS.dots.easing} 0.16s
              ${ANIMATION_CONFIGS.dots.iterationCount};
          }

          &::after {
            animation: ${dotsAnimation} ${ANIMATION_CONFIGS.dots.duration}
              ${ANIMATION_CONFIGS.dots.easing} 0.32s
              ${ANIMATION_CONFIGS.dots.iterationCount};
          }
        `}
`;

// Bars animadas
export const BarsIndicator = styled(BaseSpinIndicator)`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  /* Crear 4 barras */
  &::before,
  &::after {
    content: "";
    display: block;
  }

  &::before,
  &::after,
  & > span:nth-child(1),
  & > span:nth-child(2) {
    ${({ $size = "md", theme }) => {
      const dims = getSpinDimensions($size);
      const colors = getSpinColors(theme);
      return css`
        width: ${dims.barWidth}px;
        height: ${dims.barHeight}px;
        background-color: ${colors.primary};
        margin: 0 1px;
      `;
    }}

    transform-origin: bottom;
  }

  /* Crear spans adicionales via React */
  & > span {
    display: block;
  }

  /* Animación escalonada */
  ${({ accessibility }) =>
    accessibility?.reducedMotion
      ? css`
          &::before,
          &::after,
          & > span {
            opacity: 0.6;
            transform: scaleY(0.7);
          }
        `
      : css`
          &::before {
            animation: ${barsAnimation} ${ANIMATION_CONFIGS.bars.duration}
              ${ANIMATION_CONFIGS.bars.easing}
              ${ANIMATION_CONFIGS.bars.iterationCount};
          }

          & > span:nth-child(1) {
            animation: ${barsAnimation} ${ANIMATION_CONFIGS.bars.duration}
              ${ANIMATION_CONFIGS.bars.easing} 0.1s
              ${ANIMATION_CONFIGS.bars.iterationCount};
          }

          & > span:nth-child(2) {
            animation: ${barsAnimation} ${ANIMATION_CONFIGS.bars.duration}
              ${ANIMATION_CONFIGS.bars.easing} 0.2s
              ${ANIMATION_CONFIGS.bars.iterationCount};
          }

          &::after {
            animation: ${barsAnimation} ${ANIMATION_CONFIGS.bars.duration}
              ${ANIMATION_CONFIGS.bars.easing} 0.3s
              ${ANIMATION_CONFIGS.bars.iterationCount};
          }
        `}
`;

// Pulse expansivo
export const PulseIndicator = styled(BaseSpinIndicator)`
  position: relative;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;

    ${({ theme }) => {
      const colors = getSpinColors(theme);
      return css`
        border: 2px solid ${colors.primary};
      `;
    }}
  }

  /* Animación de pulsos múltiples */
  ${({ accessibility }) =>
    accessibility?.reducedMotion
      ? css`
          &::before {
            opacity: 0.6;
            transform: scale(0.8);
          }
        `
      : css`
          &::before {
            animation: ${pulseAnimation} ${ANIMATION_CONFIGS.pulse.duration}
              ${ANIMATION_CONFIGS.pulse.easing}
              ${ANIMATION_CONFIGS.pulse.iterationCount};
          }

          &::after {
            animation: ${pulseAnimation} ${ANIMATION_CONFIGS.pulse.duration}
              ${ANIMATION_CONFIGS.pulse.easing} 1s
              ${ANIMATION_CONFIGS.pulse.iterationCount};
          }
        `}
`;

// Bounce suave
export const BounceIndicator = styled(BaseSpinIndicator)`
  display: flex;
  align-items: center;
  justify-content: space-between;

  /* Crear 3 círculos */
  &::before,
  &::after,
  & > span {
    ${({ $size = "md", theme }) => {
      const dims = getSpinDimensions($size);
      const colors = getSpinColors(theme);
      return css`
        width: ${dims.dotSize}px;
        height: ${dims.dotSize}px;
        background-color: ${colors.primary};
        border-radius: 50%;
      `;
    }}
  }

  &::before,
  &::after {
    content: "";
    display: block;
  }

  & > span {
    display: block;
  }

  /* Animación bounce escalonada */
  ${({ accessibility }) =>
    accessibility?.reducedMotion
      ? css`
          &::before,
          &::after,
          & > span {
            opacity: 0.6;
          }
        `
      : css`
          &::before {
            animation: ${bounceAnimation} ${ANIMATION_CONFIGS.bounce.duration}
              ${ANIMATION_CONFIGS.bounce.easing}
              ${ANIMATION_CONFIGS.bounce.iterationCount};
          }

          & > span {
            animation: ${bounceAnimation} ${ANIMATION_CONFIGS.bounce.duration}
              ${ANIMATION_CONFIGS.bounce.easing} 0.2s
              ${ANIMATION_CONFIGS.bounce.iterationCount};
          }

          &::after {
            animation: ${bounceAnimation} ${ANIMATION_CONFIGS.bounce.duration}
              ${ANIMATION_CONFIGS.bounce.easing} 0.4s
              ${ANIMATION_CONFIGS.bounce.iterationCount};
          }
        `}
`;

// =====================================
// SPIN TIP (texto debajo)
// =====================================

export const SpinTip = styled.div.withConfig({
  shouldForwardProp: createShouldForwardProp(["$size", "accessibility"]),
})<SpinTipProps>`
  margin-top: 8px;
  text-align: center;
  line-height: 1.4;

  /* Typography */
  ${({ $size = "md", theme, accessibility }) => {
    const dims = getSpinDimensions($size);
    const colors = getSpinColors(theme);
    const textMultiplier = accessibility?.largeText ? 1.25 : 1;

    return css`
      font-size: ${dims.tipFontSize * textMultiplier}px;
      color: ${colors.text};
    `;
  }}

  /* Spacing adjustment */
  ${({ accessibility }) => {
    const spacingMultiplier = accessibility?.increasedSpacing
      ? accessibility.spacingMultiplier || 1.5
      : 1;

    return css`
      margin-top: ${8 * spacingMultiplier}px;
    `;
  }}
  
  /* Accesibilidad */
  ${({ accessibility }) =>
    accessibility?.textToSpeech &&
    css`
      speak: always;
    `}
`;

// =====================================
// VARIANTS PREDEFINIDAS
// =====================================

// Spin centrado en página completa
export const FullPageSpin = styled(StyledSpin)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex !important;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 9999;
`;

// Spin inline pequeño
export const InlineSpin = styled(StyledSpin)`
  display: inline-flex !important;
  vertical-align: middle;
  margin: 0 8px;
`;

// Spin en botón
export const ButtonSpin = styled(StyledSpin)`
  display: inline-flex !important;
  vertical-align: middle;
  margin-right: 8px;
`;

// =====================================
// HELPERS EXPORTADOS
// =====================================

export {
  getSpinDimensions,
  getSpinColors,
  spinnerRotate,
  dotsAnimation,
  barsAnimation,
  pulseAnimation,
  bounceAnimation,
};
