import React, { useState, useCallback, useMemo } from "react";
import {
  TagProps,
  TAG_DEFAULTS,
  SIZE_MAPPING_TAG,
  VARIANT_MAPPING_TAG,
  TagSize,
  TagVariant,
  getTagAccessibleDescription,
  getTagRole,
  getTagAriaProps,
  generateCategoryColor,
  FilterTagProps,
  StatusTagProps,
  CategoryTagProps,
  SkillTagProps,
} from "./Tag.types";
import {
  StyledTag,
  TagContent,
  TagClose,
  ElevatedTag,
  BouncyTag,
  GradientTag,
  RoundedTag,
  SquareTag,
  PulsingTag,
  FilterTag,
  StatusTag,
  SkillTag,
  CategoryTag,
} from "./Tag.styles";
import { usePersonalization } from '../../contexts/PersonalizationContext';

// =====================================
// HELPER FUNCTIONS
// =====================================

// 🎯 Mapear AllSize a TagSize usando shared system
const mapTagSize = (size: TagProps["size"]): TagSize => {
  if (!size) return "md";

  const mapped = SIZE_MAPPING_TAG[size];
  return mapped || "md";
};

// 🎯 Mapear AllVariant a TagVariant usando shared system
const mapTagVariant = (variant: TagProps["variant"]): TagVariant => {
  if (!variant) return "primary";

  const mapped = VARIANT_MAPPING_TAG[variant];
  return mapped || "primary";
};

// =====================================
// TAG COMPONENT
// =====================================

/**
 * Tag Component - Componente de etiquetas unificado y accesible
 *
 * 🎯 APLICANDO SHARED SYSTEMS:
 * - ✅ size acepta AllSize con mapeo automático
 * - ✅ variant acepta AllVariant con mapeo automático
 * - ✅ 4 estilos visuales: filled, outlined, ghost, light
 * - ✅ Estados interactivos: checkable, closable, disabled
 * - ✅ Color personalizado override variant
 * - ✅ Accesibilidad integrada con usePersonalization
 * - ✅ Compatible 100% con Ant Design Tag
 *
 * Reemplazo directo de Ant Design Tag con sistema unificado.
 */
export const Tag: React.FC<TagProps> = ({
  children,
  icon,
  size = TAG_DEFAULTS.size,
  variant = TAG_DEFAULTS.variant,
  tagStyle = TAG_DEFAULTS.tagStyle,
  closable = TAG_DEFAULTS.closable,
  checkable = TAG_DEFAULTS.checkable,
  checked: checkedProp,
  defaultChecked = TAG_DEFAULTS.defaultChecked,
  disabled = TAG_DEFAULTS.disabled,
  color,
  bordered = TAG_DEFAULTS.bordered,
  className,
  style,
  accessibility: accessibilityProp,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
  role: roleProp,
  htmlTitle,
  id,
  onClose,
  onClick,
  onCheck,
  onMouseEnter,
  onMouseLeave,
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
  const mappedSize = mapTagSize(size);
  const mappedVariant = mapTagVariant(variant);

  // Estado interno para checked (solo si checkable)
  const [internalChecked, setInternalChecked] = useState(
    checkedProp !== undefined ? checkedProp : defaultChecked
  );

  // Estado para animación de removal
  const [isRemoving, setIsRemoving] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  // Valor efectivo de checked
  const isChecked = checkedProp !== undefined ? checkedProp : internalChecked;

  // Determinar si es interactivo
  const isInteractive = !disabled && (checkable || closable || !!onClick);

  // Determinar role apropiado
  const role = roleProp || getTagRole({ checkable, closable, onClick });

  // Generar props ARIA
  const ariaProps = getTagAriaProps({
    checkable,
    checked: isChecked,
    disabled,
    closable,
  });

  // Generar descripción accesible
  const accessibleDescription = useMemo(() => {
    return getTagAccessibleDescription({
      children,
      closable,
      checkable,
      checked: isChecked,
      disabled,
    });
  }, [children, closable, checkable, isChecked, disabled]);

  // Manejar click general
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (disabled) return;

      // Si es checkable, toggle checked state
      if (checkable) {
        const newChecked = !isChecked;

        if (checkedProp === undefined) {
          setInternalChecked(newChecked);
        }

        // Animación de checking
        if (!accessibility.reducedMotion) {
          setIsChecking(true);
          setTimeout(() => setIsChecking(false), 300);
        }

        onCheck?.(newChecked, e);
      }

      // Ejecutar onClick general
      onClick?.(e);
    },
    [
      disabled,
      checkable,
      isChecked,
      checkedProp,
      accessibility.reducedMotion,
      onCheck,
      onClick,
    ]
  );

  // Manejar close
  const handleClose = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();

      if (disabled) return;

      // Animación de removal
      if (!accessibility.reducedMotion) {
        setIsRemoving(true);
        // Llamar onClose después de la animación
        setTimeout(() => onClose?.(e), 200);
      } else {
        onClose?.(e);
      }
    },
    [disabled, accessibility.reducedMotion, onClose]
  );

  // Renderizar botón de cerrar
  const renderCloseButton = () => {
    if (!closable) return null;

    return (
      <TagClose
        $size={mappedSize}
        $disabled={disabled}
        accessibility={accessibility}
        onClick={handleClose}
        aria-label="Cerrar etiqueta"
        tabIndex={-1} // El tag principal maneja el focus
      />
    );
  };

  // Si se está removiendo, no renderizar nada (después de animación)
  if (isRemoving && accessibility.reducedMotion) {
    return null;
  }

  const finalId = id ? `tag-${id}` : undefined;

  return (
    <StyledTag
      className={`
        ${className || ""} 
        ${isChecking ? "checking" : ""} 
        ${isRemoving ? "removing" : ""}
      `.trim()}
      style={style}
      role={role}
      aria-label={ariaLabel || accessibleDescription}
      aria-describedby={ariaDescribedBy}
      title={htmlTitle}
      id={finalId}
      onClick={isInteractive ? handleClick : undefined}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      tabIndex={isInteractive ? 0 : undefined}
      data-speak={
        accessibility.textToSpeech ? accessibleDescription : undefined
      }
      // 🎯 STYLED PROPS USANDO SHARED SYSTEMS
      $size={mappedSize}
      $variant={mappedVariant}
      $tagStyle={tagStyle}
      $checkable={checkable}
      $checked={isChecked}
      $disabled={disabled}
      $closable={closable}
      $customColor={color}
      $bordered={bordered}
      $interactive={isInteractive}
      accessibility={accessibility}
      // Props ARIA generadas
      {...ariaProps}
      {...rest}
    >
      {/* Contenido principal */}
      <TagContent
        $size={mappedSize}
        $disabled={disabled}
        accessibility={accessibility}
      >
        {icon && <span style={{ marginRight: children ? "4px" : "0", display: "inline-flex", alignItems: "center" }}>{icon}</span>}
        {children}
      </TagContent>

      {/* Botón de cerrar */}
      {renderCloseButton()}
    </StyledTag>
  );
};

// =====================================
// COMPONENTES PREDEFINIDOS - VARIANTS
// =====================================

// Tag primario
export const PrimaryTag: React.FC<Omit<TagProps, "variant">> = (props) => (
  <Tag variant="primary" {...props} />
);

// Tag de éxito
export const SuccessTag: React.FC<Omit<TagProps, "variant">> = (props) => (
  <Tag variant="success" {...props} />
);

// Tag de advertencia
export const WarningTag: React.FC<Omit<TagProps, "variant">> = (props) => (
  <Tag variant="warning" {...props} />
);

// Tag de error
export const ErrorTag: React.FC<Omit<TagProps, "variant">> = (props) => (
  <Tag variant="error" {...props} />
);

// Tag de información
export const InfoTag: React.FC<Omit<TagProps, "variant">> = (props) => (
  <Tag variant="info" {...props} />
);

// Tag secundario
export const SecondaryTag: React.FC<Omit<TagProps, "variant">> = (props) => (
  <Tag variant="secondary" {...props} />
);

// =====================================
// COMPONENTES PREDEFINIDOS - TAMAÑOS
// =====================================

// Tag extra pequeño
export const TinyTag: React.FC<Omit<TagProps, "size">> = (props) => (
  <Tag size="xs" {...props} />
);

// Tag pequeño
export const SmallTag: React.FC<Omit<TagProps, "size">> = (props) => (
  <Tag size="sm" {...props} />
);

// Tag grande
export const LargeTag: React.FC<Omit<TagProps, "size">> = (props) => (
  <Tag size="lg" {...props} />
);

// =====================================
// COMPONENTES PREDEFINIDOS - ESTILOS
// =====================================

// Tag relleno (por defecto)
export const FilledTag: React.FC<Omit<TagProps, "tagStyle">> = (props) => (
  <Tag tagStyle="filled" {...props} />
);

// Tag con borde
export const OutlinedTag: React.FC<Omit<TagProps, "tagStyle">> = (props) => (
  <Tag tagStyle="outlined" {...props} />
);

// Tag fantasma
export const GhostTag: React.FC<Omit<TagProps, "tagStyle">> = (props) => (
  <Tag tagStyle="ghost" {...props} />
);

// Tag suave
export const LightTag: React.FC<Omit<TagProps, "tagStyle">> = (props) => (
  <Tag tagStyle="light" {...props} />
);

// =====================================
// COMPONENTES PREDEFINIDOS - ESTADOS
// =====================================

// Tag cerrable
export const ClosableTag: React.FC<Omit<TagProps, "closable">> = (props) => (
  <Tag closable {...props} />
);

// Tag seleccionable
export const CheckableTag: React.FC<Omit<TagProps, "checkable">> = (props) => (
  <Tag checkable {...props} />
);

// Tag deshabilitado
export const DisabledTag: React.FC<Omit<TagProps, "disabled">> = (props) => (
  <Tag disabled {...props} />
);

// =====================================
// COMPONENTES PREDEFINIDOS - STYLED VARIANTS
// =====================================

// Tag elevado
export const ElevatedTagLayout: React.FC<TagProps> = (props) => (
  <ElevatedTag as={Tag} {...props} />
);

// Tag con bounce
export const BouncyTagLayout: React.FC<TagProps> = (props) => (
  <BouncyTag as={Tag} {...props} />
);

// Tag con gradiente
export const GradientTagLayout: React.FC<TagProps> = (props) => (
  <GradientTag as={Tag} {...props} />
);

// Tag redondeado
export const RoundedTagLayout: React.FC<TagProps> = (props) => (
  <RoundedTag as={Tag} {...props} />
);

// Tag cuadrado
export const SquareTagLayout: React.FC<TagProps> = (props) => (
  <SquareTag as={Tag} {...props} />
);

// Tag pulsante
export const PulsingTagLayout: React.FC<TagProps> = (props) => (
  <PulsingTag as={Tag} {...props} />
);

// =====================================
// CASOS DE USO ESPECÍFICOS
// =====================================

// Tag para filtros
export const Filter: React.FC<FilterTagProps> = ({
  active = false,
  count,
  onFilter,
  children,
  ...props
}) => {
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const newActive = !active;
      onFilter?.(newActive);
      props.onClick?.(e);
    },
    [active, onFilter, props.onClick]
  );

  const displayText = useMemo(() => {
    if (count !== undefined && count > 0) {
      return `${children} (${count})`;
    }
    return children;
  }, [children, count]);

  return (
    <FilterTag
      as={Tag}
      checkable
      checked={active}
      onClick={handleClick}
      {...props}
    >
      {displayText}
    </FilterTag>
  );
};

// Tag para status
export const StatusIndicatorTag: React.FC<StatusTagProps> = ({
  status,
  showDot = true,
  ...props
}) => {
  const statusVariant = useMemo(() => {
    switch (status) {
      case "online":
        return "success";
      case "busy":
        return "error";
      case "away":
        return "warning";
      case "offline":
      case "invisible":
      default:
        return "secondary";
    }
  }, [status]);

  const statusText = useMemo(() => {
    const statusLabels = {
      online: "En línea",
      offline: "Desconectado",
      busy: "Ocupado",
      away: "Ausente",
      invisible: "Invisible",
    };
    return statusLabels[status];
  }, [status]);

  return (
    <StatusTag
      as={Tag}
      variant={statusVariant}
      $variant={statusVariant}
      {...props}
    >
      {statusText}
    </StatusTag>
  );
};

// Tag para categorías
export const Category: React.FC<CategoryTagProps> = ({
  category,
  colorScheme = "random",
  onCategoryClick,
  ...props
}) => {
  const categoryColor = useMemo(() => {
    return colorScheme === "random"
      ? generateCategoryColor(category)
      : undefined;
  }, [category, colorScheme]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      onCategoryClick?.(category);
      props.onClick?.(e);
    },
    [category, onCategoryClick, props.onClick]
  );

  return (
    <CategoryTag
      as={Tag}
      color={categoryColor}
      $customColor={categoryColor}
      onClick={handleClick}
      {...props}
    >
      {category}
    </CategoryTag>
  );
};

// Tag para habilidades
export const Skill: React.FC<SkillTagProps> = ({
  skill,
  level = 1,
  showLevel = true,
  ...props
}) => {
  const displayText = useMemo(() => {
    if (showLevel) {
      return skill;
    }
    return skill;
  }, [skill, showLevel]);

  return (
    <SkillTag
      as={Tag}
      htmlTitle={`${skill} - Nivel ${level}/5`}
      style={{ "--skill-level": level } as React.CSSProperties}
      {...props}
    >
      {displayText}
    </SkillTag>
  );
};

// Tag para colores
export const ColorTag: React.FC<TagProps & { colorValue: string }> = ({
  colorValue,
  children,
  ...props
}) => (
  <Tag color={colorValue} style={{ borderRadius: "4px" }} {...props}>
    <span
      style={{
        display: "inline-block",
        width: "12px",
        height: "12px",
        backgroundColor: colorValue,
        borderRadius: "2px",
        marginRight: "6px",
        border: "1px solid rgba(0,0,0,0.1)",
      }}
    />
    {children || colorValue}
  </Tag>
);

// Tag para números/counts
export const CountTag: React.FC<TagProps & { count: number }> = ({
  count,
  children,
  ...props
}) => (
  <Tag variant="primary" size="sm" {...props}>
    {children} {count > 0 && `(${count})`}
  </Tag>
);

// Tag para hot/trending
export const HotTag: React.FC<TagProps> = (props) => (
  <PulsingTag as={Tag} variant="error" size="xs" {...props}>
    🔥 HOT
  </PulsingTag>
);

// Tag para nuevo
export const NewTag: React.FC<TagProps> = (props) => (
  <Tag variant="success" size="xs" tagStyle="filled" {...props}>
    NUEVO
  </Tag>
);

// Tag para beta
export const BetaTag: React.FC<TagProps> = (props) => (
  <Tag variant="warning" size="xs" tagStyle="outlined" {...props}>
    BETA
  </Tag>
);

// Tag para premium
export const PremiumTag: React.FC<TagProps> = (props) => (
  <GradientTag as={Tag} variant="warning" size="sm" {...props}>
    ⭐ PREMIUM
  </GradientTag>
);

// =====================================
// EJEMPLOS DE USO CON SHARED SYSTEMS
// =====================================

/**
 * EJEMPLOS DE USO:
 *
 * // Básico con mapeo automático
 * <Tag size="large" variant="danger">
 *   Etiqueta
 * </Tag>
 * // "large" → "lg", "danger" → "error" automáticamente
 *
 * // Tag closable
 * <Tag closable onClose={() => console.log("Cerrado")}>
 *   Cerrable
 * </Tag>
 *
 * // Tag checkable
 * <Tag
 *   checkable
 *   checked={isSelected}
 *   onCheck={(checked) => setIsSelected(checked)}
 * >
 *   Seleccionable
 * </Tag>
 *
 * // Diferentes estilos
 * <Tag tagStyle="outlined">Outlined</Tag>
 * <Tag tagStyle="ghost">Ghost</Tag>
 * <Tag tagStyle="light">Light</Tag>
 *
 * // Componentes predefinidos
 * <SuccessTag>Éxito</SuccessTag>
 * <ErrorTag closable>Error</ErrorTag>
 * <WarningTag checkable>Advertencia</WarningTag>
 *
 * // Casos específicos
 * <Filter
 *   active={filterActive}
 *   count={25}
 *   onFilter={(active) => setFilterActive(active)}
 * >
 *   JavaScript
 * </Filter>
 *
 * <StatusIndicatorTag status="online" />
 * <StatusIndicatorTag status="busy" />
 *
 * <Category
 *   category="Frontend"
 *   colorScheme="random"
 *   onCategoryClick={(cat) => console.log(cat)}
 * />
 *
 * <Skill
 *   skill="React"
 *   level={4}
 *   showLevel={true}
 * />
 *
 * <ColorTag colorValue="#ff6b6b">
 *   Rojo coral
 * </ColorTag>
 *
 * <CountTag count={15}>
 *   Mensajes
 * </CountTag>
 *
 * // Tags especiales
 * <HotTag />
 * <NewTag />
 * <BetaTag />
 * <PremiumTag />
 *
 * // Styled variants
 * <ElevatedTagLayout>
 *   Elevado
 * </ElevatedTagLayout>
 *
 * <GradientTagLayout variant="primary">
 *   Con gradiente
 * </GradientTagLayout>
 */

// Export por defecto
export default Tag;
