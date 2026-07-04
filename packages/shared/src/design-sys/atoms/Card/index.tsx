import React from "react";
import { CardProps, SIZE_MAPPING } from "./Card.types";
import {
  StyledCard,
  CardHeader,
  CardHeaderContent,
  CardExtra,
  CardTitle,
  CardSubtitle,
  CardIcon,
  CardContent,
} from "./Card.styles";
import { usePersonalization } from '../../contexts/PersonalizationContext';

/**
 * Card Component - Componente de tarjeta unificado y accesible
 *
 * Combina las mejores características de las 3 versiones anteriores:
 * - Accesibilidad integrada (de atoms/Card.tsx)
 * - Interactividad completa (de ui/Card.tsx)
 * - Sistema de colores unificado
 * - Soporte para iconos y headers
 * - Compatibilidad con tamaños legacy y nuevos
 */
export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  variant = "default",
  size = "md",
  className,
  style,
  onClick,
  interactive,
  selected = false,
  role,
  icon,
  extra,
  id,
  accessibility: accessibilityProp,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
  tabIndex: tabIndexProp,
  onKeyDown,
  ...rest
}) => {
  // Hooks para accesibilidad
  const { accessibility: contextAccessibility } = usePersonalization();

  // Combinar props de accesibilidad
  const accessibility = {
    ...contextAccessibility,
    ...accessibilityProp,
  };

  // Normalizar size para compatibilidad
  const normalizedSize = (SIZE_MAPPING[size] || "md") as
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl";

  // Determinar si es interactivo
  const isInteractive = interactive || !!onClick;

  // Manejar click
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isInteractive && onClick) {
      onClick(event);
    }
  };

  // Manejar keyboard (de ui/Card.tsx)
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (isInteractive) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onClick?.(event as any);
      }
    }

    // Llamar handler personalizado si existe
    if (onKeyDown) {
      onKeyDown(event);
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
      const basePadding =
        {
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
          xl: 40,
        }[normalizedSize] || 24;

      styles.padding = `${basePadding * multiplier}px`;
    }

    return styles;
  };

  // Determinar tabIndex
  const tabIndex =
    tabIndexProp !== undefined ? tabIndexProp : isInteractive ? 0 : undefined;

  // Determinar role
  const cardRole = role || (isInteractive ? "button" : undefined);

  const finalId = id ? `card-${id}` : undefined;

  return (
    <StyledCard
      id={finalId}
      className={className}
      style={{
        ...getAccessibilityStyles(),
        ...style,
      }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role={cardRole}
      tabIndex={tabIndex}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-pressed={isInteractive && selected ? true : undefined}
      data-speak={accessibility.textToSpeech ? title : undefined}
      // Styled props (con prefijo $ para evitar que se pasen al DOM)
      $variant={variant}
      $size={normalizedSize}
      $interactive={isInteractive}
      $selected={selected}
      accessibility={accessibility}
      {...rest}
    >
      {/* Header con title, subtitle, icon y extra */}
      {(title || subtitle || icon || extra) && (
        <CardHeader $size={normalizedSize}>
          <CardHeaderContent>
            {(title || icon) && (
              <CardTitle $size={normalizedSize} accessibility={accessibility}>
                {icon && <CardIcon $size={normalizedSize}>{icon}</CardIcon>}
                {title}
              </CardTitle>
            )}

            {subtitle && (
              <CardSubtitle
                $size={normalizedSize}
                accessibility={accessibility}
              >
                {subtitle}
              </CardSubtitle>
            )}
          </CardHeaderContent>

          {extra && <CardExtra>{extra}</CardExtra>}
        </CardHeader>
      )}

      {/* Contenido principal */}
      <CardContent accessibility={accessibility}>{children}</CardContent>
    </StyledCard>
  );
};

// Componentes predefinidos para facilitar el uso (de atoms/Card.tsx)
export const DefaultCard: React.FC<Omit<CardProps, "variant">> = (props) => (
  <Card variant="default" {...props} />
);

export const ElevatedCard: React.FC<Omit<CardProps, "variant">> = (props) => (
  <Card variant="elevated" {...props} />
);

export const OutlinedCard: React.FC<Omit<CardProps, "variant">> = (props) => (
  <Card variant="outlined" {...props} />
);

export const FilledCard: React.FC<Omit<CardProps, "variant">> = (props) => (
  <Card variant="filled" {...props} />
);

// Componentes por tamaño para conveniencia
export const SmallCard: React.FC<Omit<CardProps, "size">> = (props) => (
  <Card size="sm" {...props} />
);

export const MediumCard: React.FC<Omit<CardProps, "size">> = (props) => (
  <Card size="md" {...props} />
);

export const LargeCard: React.FC<Omit<CardProps, "size">> = (props) => (
  <Card size="lg" {...props} />
);

// Export por defecto
export default Card;
