import React from "react";
import { AvatarProps } from "./Avatar.types";
import { StyledAvatar, AvatarImage, AvatarIcon } from "./Avatar.styles";
import { usePersonalization } from "../../../../contexts/PersonalizationContext";
import { mapSizeToAvailable, STANDARD_SIZES } from "../shared";

/**
 * Avatar Component - Muestra imagen de usuario, icono o iniciales
 */
export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  icon,
  size = "md",
  shape = "circle",
  children,
  className,
  style,
  id,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
  onClick,
}) => {
  const { accessibility } = usePersonalization();

  // Mapear tamaño usando shared systems
  const mappedSize = mapSizeToAvailable(size, STANDARD_SIZES);

  // Determinar qué mostrar
  const hasImage = !!src;
  const hasIcon = !!icon;
  const hasChildren = !!children;
  const hasContent = hasImage || hasIcon || hasChildren;

  const finalId = id ? `avatar-${id}` : undefined;

  return (
    <StyledAvatar
      id={finalId}
      $size={mappedSize}
      $shape={shape}
      $hasImage={hasImage}
      $clickable={!!onClick}
      accessibility={accessibility}
      className={className}
      style={style}
      onClick={onClick}
      aria-label={ariaLabel || alt}
      aria-describedby={ariaDescribedBy}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e: React.KeyboardEvent) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      {hasImage && <AvatarImage src={src} alt={alt || ""} />}
      {!hasImage && hasIcon && <AvatarIcon>{icon}</AvatarIcon>}
      {!hasImage && !hasIcon && hasChildren && <span>{children}</span>}
      {!hasContent && <span aria-hidden="true">👤</span>}
    </StyledAvatar>
  );
};

export default Avatar;
