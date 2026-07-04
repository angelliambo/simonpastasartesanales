import React from "react";
import {
  SkeletonProps,
  SKELETON_DEFAULTS,
  SIZE_MAPPING_SKELETON,
  SkeletonSize,
  ACCESSIBILITY_MESSAGES,
  SkeletonButtonProps,
  SkeletonInputProps,
  SkeletonAvatarProps,
  SkeletonImageProps,
} from "./Skeleton.types";
import {
  StyledSkeleton,
  SkeletonTitle,
  SkeletonParagraph,
  SkeletonParagraphRow,
  SkeletonButton as StyledSkeletonButton,
  SkeletonInput as StyledSkeletonInput,
  SkeletonAvatar as StyledSkeletonAvatar,
  SkeletonImage as StyledSkeletonImage,
} from "./Skeleton.styles";
import { usePersonalization } from "../../contexts/PersonalizationContext";
import { AllSize } from "../shared";

// =====================================
// HELPER FUNCTIONS
// =====================================

// Mapear AllSize a SkeletonSize usando shared system
const mapSkeletonSize = (size: AllSize | undefined): SkeletonSize => {
  if (!size) return "md";
  const mapped = SIZE_MAPPING_SKELETON[size];
  return mapped || "md";
};

// Normalizar paragraph props
const normalizeParagraph = (
  paragraph?: boolean | { rows?: number; width?: number | string | Array<number | string> }
) => {
  if (!paragraph) return null;
  if (typeof paragraph === "boolean") {
    return { rows: 3, widths: ["100%"] };
  }
  const rows = paragraph.rows || 3;
  let widths: Array<number | string> = [];
  
  if (Array.isArray(paragraph.width)) {
    widths = paragraph.width;
  } else if (paragraph.width) {
    widths = [paragraph.width];
  } else {
    widths = ["100%"];
  }
  
  // Asegurar que hay suficientes widths para todas las filas
  while (widths.length < rows) {
    widths.push(widths[widths.length - 1] || "100%");
  }
  
  return { rows, widths };
};

// Normalizar title props
const normalizeTitle = (title?: boolean | { width?: number | string }) => {
  if (!title) return null;
  if (typeof title === "boolean") {
    return { width: "60%" };
  }
  return { width: title.width || "60%" };
};

// =====================================
// SKELETON COMPONENT
// =====================================

/**
 * Skeleton Component - Componente de placeholder unificado y accesible
 *
 * 🎯 APLICANDO SHARED SYSTEMS:
 * - ✅ size acepta AllSize con mapeo automático
 * - ✅ Animaciones: wave, pulse, none
 * - ✅ Soporte para reduced motion
 * - ✅ Accesibilidad integrada con useSafePersonalization
 * - ✅ Compatible con uso de Ant Design Skeleton
 *
 * Reemplazo directo de Ant Design Skeleton con sistema unificado.
 */
export const Skeleton: React.FC<SkeletonProps> = ({
  active = SKELETON_DEFAULTS.active,
  animation = SKELETON_DEFAULTS.animation,
  size = SKELETON_DEFAULTS.size,
  width,
  height,
  round = SKELETON_DEFAULTS.round,
  title = SKELETON_DEFAULTS.title,
  paragraph = SKELETON_DEFAULTS.paragraph,
  className,
  style,
  accessibility: accessibilityProp,
  "aria-label": ariaLabel,
  "aria-busy": ariaBusy,
  id,
  ...rest
}) => {
  // 🎯 HOOKS PARA ACCESIBILIDAD (OBLIGATORIO)
  const { accessibility: contextAccessibility } = usePersonalization();

  // Combinar props de accesibilidad
  const accessibility = {
    ...contextAccessibility,
    ...accessibilityProp,
  };

  // 🎯 MAPEO CON SHARED SYSTEMS (OBLIGATORIO)
  const mappedSize = mapSkeletonSize(size);

  // Normalizar animación según reduced motion
  const finalAnimation =
    accessibility.reducedMotion || accessibilityProp?.reducedMotion
      ? "none"
      : animation;

  // Normalizar props de title y paragraph
  const titleProps = normalizeTitle(title);
  const paragraphProps = normalizeParagraph(paragraph);

  const finalId = id ? `skeleton-${id}` : undefined;

  // Obtener mensaje de accesibilidad
  const getAccessibilityMessage = () => {
    if (accessibility.ariaLabel || accessibilityProp?.ariaLabel) {
      return accessibility.ariaLabel || accessibilityProp?.ariaLabel;
    }
    if (ariaLabel) {
      return ariaLabel;
    }
    return ACCESSIBILITY_MESSAGES.es.loading;
  };

  // Si solo tiene width/height sin title/paragraph, renderizar skeleton simple
  if ((width || height) && !title && !paragraph) {
    return (
      <StyledSkeleton
        className={className}
        style={style}
        $size={mappedSize}
        $active={active}
        $animation={finalAnimation}
        $width={width}
        $height={height}
        $round={round}
        accessibility={accessibility}
        aria-label={getAccessibilityMessage()}
        aria-busy={ariaBusy !== undefined ? ariaBusy : active}
        id={finalId}
        data-speak={
          accessibility.textToSpeech ? getAccessibilityMessage() : undefined
        }
        {...rest}
      />
    );
  }

  // Renderizar skeleton completo con title y paragraph
  return (
    <div
      className={className}
      style={style}
      aria-label={getAccessibilityMessage()}
      aria-busy={ariaBusy !== undefined ? ariaBusy : active}
      id={finalId}
      {...rest}
    >
      {titleProps && (
        <SkeletonTitle
          $size={mappedSize}
          $width={titleProps.width}
          $active={active}
          $animation={finalAnimation}
          accessibility={accessibility}
        />
      )}

      {paragraphProps && (
        <SkeletonParagraph
          $size={mappedSize}
          $rows={paragraphProps.rows}
          $widths={paragraphProps.widths}
          $active={active}
          $animation={finalAnimation}
          accessibility={accessibility}
        >
          {Array.from({ length: paragraphProps.rows }).map((_, index) => (
            <SkeletonParagraphRow
              key={index}
              $size={mappedSize}
              $widths={paragraphProps.widths}
              $rowIndex={index}
              $active={active}
              $animation={finalAnimation}
              accessibility={accessibility}
            />
          ))}
        </SkeletonParagraph>
      )}
    </div>
  );
};

// =====================================
// COMPONENTES ESPECIALIZADOS
// =====================================

// Skeleton.Button
export const SkeletonButton: React.FC<SkeletonButtonProps> = ({
  size = "md",
  block = false,
  active = true,
  animation = "wave",
  className,
  style,
  accessibility: accessibilityProp,
  ...rest
}) => {
  const { accessibility: contextAccessibility } = usePersonalization();
  const accessibility = {
    ...contextAccessibility,
    ...accessibilityProp,
  };
  const mappedSize = mapSkeletonSize(size);
  const finalAnimation =
    accessibility.reducedMotion || accessibilityProp?.reducedMotion
      ? "none"
      : animation;

  return (
    <StyledSkeletonButton
      className={className}
      style={{
        ...style,
        display: block ? "block" : "inline-block",
        width: block ? "100%" : style?.width || "auto",
      }}
      $size={mappedSize}
      $active={active}
      $animation={finalAnimation}
      accessibility={accessibility}
      {...rest}
    />
  );
};

// Skeleton.Input
export const SkeletonInput: React.FC<SkeletonInputProps> = ({
  size = "md",
  block = false,
  active = true,
  animation = "wave",
  className,
  style,
  accessibility: accessibilityProp,
  ...rest
}) => {
  const { accessibility: contextAccessibility } = usePersonalization();
  const accessibility = {
    ...contextAccessibility,
    ...accessibilityProp,
  };
  const mappedSize = mapSkeletonSize(size);
  const finalAnimation =
    accessibility.reducedMotion || accessibilityProp?.reducedMotion
      ? "none"
      : animation;

  return (
    <StyledSkeletonInput
      className={className}
      style={{
        ...style,
        display: block ? "block" : "inline-block",
        width: block ? "100%" : style?.width || "200px",
      }}
      $size={mappedSize}
      $active={active}
      $animation={finalAnimation}
      accessibility={accessibility}
      {...rest}
    />
  );
};

// Skeleton.Avatar
export const SkeletonAvatar: React.FC<SkeletonAvatarProps> = ({
  size = "md",
  shape = "circle",
  active = true,
  animation = "wave",
  className,
  style,
  accessibility: accessibilityProp,
  ...rest
}) => {
  const { accessibility: contextAccessibility } = usePersonalization();
  const accessibility = {
    ...contextAccessibility,
    ...accessibilityProp,
  };
  const mappedSize = mapSkeletonSize(size);
  const finalAnimation =
    accessibility.reducedMotion || accessibilityProp?.reducedMotion
      ? "none"
      : animation;

  return (
    <StyledSkeletonAvatar
      className={className}
      style={style}
      $size={mappedSize}
      $shape={shape}
      $active={active}
      $animation={finalAnimation}
      $round={shape === "circle"}
      accessibility={accessibility}
      {...rest}
    />
  );
};

// Skeleton.Image
export const SkeletonImage: React.FC<SkeletonImageProps> = ({
  size = "md",
  active = true,
  animation = "wave",
  className,
  style,
  accessibility: accessibilityProp,
  ...rest
}) => {
  const { accessibility: contextAccessibility } = usePersonalization();
  const accessibility = {
    ...contextAccessibility,
    ...accessibilityProp,
  };
  const mappedSize = mapSkeletonSize(size);
  const finalAnimation =
    accessibility.reducedMotion || accessibilityProp?.reducedMotion
      ? "none"
      : animation;

  return (
    <StyledSkeletonImage
      className={className}
      style={style}
      $size={mappedSize}
      $active={active}
      $animation={finalAnimation}
      accessibility={accessibility}
      {...rest}
    />
  );
};

// Agregar métodos estáticos al componente principal
(Skeleton as any).Button = SkeletonButton;
(Skeleton as any).Input = SkeletonInput;
(Skeleton as any).Avatar = SkeletonAvatar;
(Skeleton as any).Image = SkeletonImage;

// Export por defecto
export default Skeleton;

