import React from "react";
import { DividerProps } from "./Divider.types";
import { StyledDivider, DividerText } from "./Divider.styles";
import { usePersonalization } from '../../contexts/PersonalizationContext';
import { mapSizeToAvailable, STANDARD_SIZES } from "../shared";

/**
 * Divider Component - Separador visual horizontal o vertical
 *
 * Compatible con Ant Design Divider API
 */
export const Divider: React.FC<DividerProps> = ({
  orientation = "horizontal",
  children,
  type = "solid",
  plain = false,
  size = "md",
  className,
  style,
  orientationMargin,
  "aria-label": ariaLabel,
  role = "separator",
  id,
}) => {
  const { accessibility } = usePersonalization();

  // Mapear tamaño usando shared systems
  const mappedSize = mapSizeToAvailable(size, STANDARD_SIZES);

  const hasText = !!children;

  const finalId = id ? `divider-${id}` : undefined;

  // Aplicar margin basado en orientationMargin
  const marginStyle: React.CSSProperties = style || {};
  if (orientationMargin && typeof orientationMargin === "number") {
    if (orientation === "horizontal") {
      marginStyle.marginLeft = `${orientationMargin}px`;
      marginStyle.marginRight = `${orientationMargin}px`;
    } else {
      marginStyle.marginTop = `${orientationMargin}px`;
      marginStyle.marginBottom = `${orientationMargin}px`;
    }
  } else if (orientationMargin && typeof orientationMargin === "string") {
    if (orientation === "horizontal") {
      marginStyle.marginLeft = orientationMargin;
      marginStyle.marginRight = orientationMargin;
    } else {
      marginStyle.marginTop = orientationMargin;
      marginStyle.marginBottom = orientationMargin;
    }
  }

  return (
    <StyledDivider
      id={finalId}
      $orientation={orientation}
      $type={type}
      $size={mappedSize}
      $hasText={hasText}
      $plain={plain}
      $accessibility={accessibility}
      className={className}
      style={marginStyle}
      role={role}
      aria-label={ariaLabel || (hasText ? undefined : "Separador")}
      aria-orientation={orientation}
    >
      {hasText && (
        <DividerText $plain={plain} $accessibility={accessibility}>
          {children}
        </DividerText>
      )}
    </StyledDivider>
  );
};

export default Divider;
