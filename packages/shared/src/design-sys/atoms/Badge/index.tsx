import React, { useState, useEffect, useMemo } from "react";
import {
  BadgeProps,
  BADGE_DEFAULTS,
  SIZE_MAPPING_BADGE,
  VARIANT_MAPPING_BADGE,
  BadgeSize,
  BadgeVariant,
  formatBadgeCount,
  getBadgeAccessibleDescription,
  LiveBadgeProps,
  NotificationBadgeProps,
  StatusIndicatorProps,
} from "./Badge.types";
import {
  BadgeWrapper,
  StyledBadge,
  BadgeContent,
  ElevatedBadge,
  OutlinedBadge,
  SquareBadge,
  RoundedBadge,
  GradientBadge,
  PulsingBadge,
  NotificationBadge,
  OnlineIndicator,
} from "./Badge.styles";
import { usePersonalization } from '../../contexts/PersonalizationContext';

// =====================================
// HELPER FUNCTIONS
// =====================================

// 🎯 Mapear AllSize a BadgeSize usando shared system
const mapBadgeSize = (size: BadgeProps["size"]): BadgeSize => {
  if (!size) return "md";

  const mapped = SIZE_MAPPING_BADGE[size];
  return mapped || "md";
};

// 🎯 Mapear AllVariant a BadgeVariant usando shared system
const mapBadgeVariant = (variant: BadgeProps["variant"]): BadgeVariant => {
  if (!variant) return "primary";

  const mapped = VARIANT_MAPPING_BADGE[variant];
  return mapped || "primary";
};

// =====================================
// BADGE COMPONENT
// =====================================

/**
 * Badge Component - Componente de badge unificado y accesible
 *
 * 🎯 APLICANDO SHARED SYSTEMS:
 * - ✅ size acepta AllSize con mapeo automático
 * - ✅ variant acepta AllVariant con mapeo automático
 * - ✅ Placement system para posicionamiento sobre elementos
 * - ✅ Status badges para indicadores de estado
 * - ✅ Overflow handling (99+ para números altos)
 * - ✅ Dot mode para indicadores simples
 * - ✅ Accesibilidad integrada con usePersonalization
 * - ✅ Compatible 100% con Ant Design Badge
 *
 * Reemplazo directo de Ant Design Badge con sistema unificado.
 */
export const Badge: React.FC<BadgeProps> = ({
  count,
  text,
  size = BADGE_DEFAULTS.size,
  variant = BADGE_DEFAULTS.variant,
  dot = BADGE_DEFAULTS.dot,
  showZero = BADGE_DEFAULTS.showZero,
  overflowCount = BADGE_DEFAULTS.overflowCount,
  children,
  placement = BADGE_DEFAULTS.placement,
  offset,
  status,
  color,
  className,
  style,
  accessibility: accessibilityProp,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
  role = BADGE_DEFAULTS.role,
  htmlTitle,
  id,
  onClick,
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
  const mappedSize = mapBadgeSize(size);
  const mappedVariant = mapBadgeVariant(variant);

  // Estado para animación de actualización
  const [isUpdating, setIsUpdating] = useState(false);

  // Formatear contenido del badge
  const badgeContent = useMemo(() => {
    // Si es dot badge, no mostrar contenido
    if (dot) return null;

    // Si hay texto personalizado, usarlo
    if (text !== undefined) return text;

    // Si hay count, formatearlo
    if (count !== undefined) {
      return formatBadgeCount(count, overflowCount, showZero);
    }

    return null;
  }, [dot, text, count, overflowCount, showZero]);

  // Determinar si el badge está vacío
  const isEmpty = useMemo(() => {
    return !dot && badgeContent === null && !status;
  }, [dot, badgeContent, status]);

  // Generar descripción accesible
  const accessibleDescription = useMemo(() => {
    return getBadgeAccessibleDescription({
      count,
      text,
      dot,
      status,
      children,
    });
  }, [count, text, dot, status, children]);

  // Detectar cambios en count para animación
  useEffect(() => {
    if (count !== undefined && !accessibility.reducedMotion) {
      setIsUpdating(true);
      const timer = setTimeout(() => setIsUpdating(false), 400);
      return () => clearTimeout(timer);
    }
  }, [count, accessibility.reducedMotion]);

  // Si está vacío y no tiene children, no renderizar nada
  if (isEmpty && !children) {
    return null;
  }

  // Renderizar badge standalone (sin children)
  if (!children) {
    return (
      <StyledBadge
        className={`${className || ""} ${isUpdating ? "updating" : ""}`.trim()}
        style={style}
        role={role}
        aria-label={ariaLabel || accessibleDescription}
        aria-describedby={ariaDescribedBy}
        title={htmlTitle}
        id={id}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        data-speak={
          accessibility.textToSpeech ? accessibleDescription : undefined
        }
        // 🎯 STYLED PROPS USANDO SHARED SYSTEMS
        $size={mappedSize}
        $variant={mappedVariant}
        $dot={dot}
        $isEmpty={isEmpty}
        $customColor={color}
        $status={status}
        accessibility={accessibility}
        {...rest}
      >
        <BadgeContent
          $size={mappedSize}
          $dot={dot}
          accessibility={accessibility}
        >
          {badgeContent}
        </BadgeContent>
      </StyledBadge>
    );
  }

  const finalId = id ? `badge-${id}` : undefined;

  // Renderizar badge con children (wrapper mode)
  return (
    <BadgeWrapper $hasChildren={!!children} accessibility={accessibility}>
      {/* Elemento wrapeado */}
      {children}

      {/* Badge posicionado */}
      {!isEmpty && (
        <StyledBadge
          className={`${className || ""} ${
            isUpdating ? "updating" : ""
          }`.trim()}
          style={style}
          role={role}
          aria-label={ariaLabel || accessibleDescription}
          aria-describedby={ariaDescribedBy}
          title={htmlTitle}
          id={finalId}
          onClick={onClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          data-speak={
            accessibility.textToSpeech ? accessibleDescription : undefined
          }
          // 🎯 STYLED PROPS USANDO SHARED SYSTEMS
          $size={mappedSize}
          $variant={mappedVariant}
          $dot={dot}
          $placement={placement}
          $offset={offset}
          $isEmpty={isEmpty}
          $customColor={color}
          $status={status}
          accessibility={accessibility}
          {...rest}
        >
          <BadgeContent
            $size={mappedSize}
            $dot={dot}
            accessibility={accessibility}
          >
            {badgeContent}
          </BadgeContent>
        </StyledBadge>
      )}
    </BadgeWrapper>
  );
};

// =====================================
// COMPONENTES PREDEFINIDOS - VARIANTS
// =====================================

// Badge primario
export const PrimaryBadge: React.FC<Omit<BadgeProps, "variant">> = (props) => (
  <Badge variant="primary" {...props} />
);

// Badge de éxito
export const SuccessBadge: React.FC<Omit<BadgeProps, "variant">> = (props) => (
  <Badge variant="success" {...props} />
);

// Badge de advertencia
export const WarningBadge: React.FC<Omit<BadgeProps, "variant">> = (props) => (
  <Badge variant="warning" {...props} />
);

// Badge de error
export const ErrorBadge: React.FC<Omit<BadgeProps, "variant">> = (props) => (
  <Badge variant="error" {...props} />
);

// Badge de información
export const InfoBadge: React.FC<Omit<BadgeProps, "variant">> = (props) => (
  <Badge variant="info" {...props} />
);

// Badge secundario
export const SecondaryBadge: React.FC<Omit<BadgeProps, "variant">> = (
  props
) => <Badge variant="secondary" {...props} />;

// =====================================
// COMPONENTES PREDEFINIDOS - TAMAÑOS
// =====================================

// Badge extra pequeño
export const TinyBadge: React.FC<Omit<BadgeProps, "size">> = (props) => (
  <Badge size="xs" {...props} />
);

// Badge pequeño
export const SmallBadge: React.FC<Omit<BadgeProps, "size">> = (props) => (
  <Badge size="sm" {...props} />
);

// Badge grande
export const LargeBadge: React.FC<Omit<BadgeProps, "size">> = (props) => (
  <Badge size="lg" {...props} />
);

// =====================================
// COMPONENTES PREDEFINIDOS - ESTADOS
// =====================================

// Dot badge (solo indicador)
export const DotBadge: React.FC<Omit<BadgeProps, "dot">> = (props) => (
  <Badge dot {...props} />
);

// Badge de procesamiento
export const ProcessingBadge: React.FC<Omit<BadgeProps, "status">> = (
  props
) => <Badge status="processing" {...props} />;

// Badge de éxito (status)
export const StatusSuccessBadge: React.FC<Omit<BadgeProps, "status">> = (
  props
) => <Badge status="success" {...props} />;

// Badge de error (status)
export const StatusErrorBadge: React.FC<Omit<BadgeProps, "status">> = (
  props
) => <Badge status="error" {...props} />;

// Badge de advertencia (status)
export const StatusWarningBadge: React.FC<Omit<BadgeProps, "status">> = (
  props
) => <Badge status="warning" {...props} />;

// =====================================
// COMPONENTES PREDEFINIDOS - STYLED VARIANTS
// =====================================

// Badge elevado
export const ElevatedBadgeLayout: React.FC<BadgeProps> = (props) => (
  <ElevatedBadge as={Badge} {...props} />
);

// Badge con borde
export const OutlinedBadgeLayout: React.FC<BadgeProps> = (props) => (
  <OutlinedBadge as={Badge} {...props} />
);

// Badge cuadrado
export const SquareBadgeLayout: React.FC<BadgeProps> = (props) => (
  <SquareBadge as={Badge} {...props} />
);

// Badge redondeado
export const RoundedBadgeLayout: React.FC<BadgeProps> = (props) => (
  <RoundedBadge as={Badge} {...props} />
);

// Badge con gradiente
export const GradientBadgeLayout: React.FC<BadgeProps> = (props) => (
  <GradientBadge as={Badge} {...props} />
);

// Badge pulsante
export const PulsingBadgeLayout: React.FC<BadgeProps> = (props) => (
  <PulsingBadge as={Badge} {...props} />
);

// =====================================
// CASOS DE USO ESPECÍFICOS
// =====================================

// Badge con actualizaciones en tiempo real
export const Live: React.FC<LiveBadgeProps> = ({
  liveUpdate = false,
  updateInterval = 1000,
  onUpdate,
  ...props
}) => {
  const [liveCount, setLiveCount] = useState(props.count || 0);

  useEffect(() => {
    if (!liveUpdate) return;

    const interval = setInterval(() => {
      const newCount = liveCount + Math.floor(Math.random() * 3);
      setLiveCount(newCount);
      onUpdate?.(newCount);
    }, updateInterval);

    return () => clearInterval(interval);
  }, [liveUpdate, updateInterval, liveCount, onUpdate]);

  return <Badge {...props} count={liveCount} />;
};

// Badge para notificaciones
export const NotificationBadgeComponent: React.FC<NotificationBadgeProps> = ({
  unreadCount = 0,
  maxDisplay = 99,
  markAsRead,
  ...props
}) => (
  <NotificationBadge
    as={Badge}
    count={unreadCount}
    overflowCount={maxDisplay}
    onClick={markAsRead}
    {...props}
  />
);

// Indicador de estado online/offline
export const OnlineStatus: React.FC<StatusIndicatorProps> = ({
  isOnline = false,
  lastSeen,
  showLastSeen = false,
  ...props
}) => {
  const statusText = useMemo(() => {
    if (isOnline) return "En línea";
    if (showLastSeen && lastSeen) {
      const lastSeenDate = new Date(lastSeen);
      const now = new Date();
      const diffMinutes = Math.floor(
        (now.getTime() - lastSeenDate.getTime()) / (1000 * 60)
      );

      if (diffMinutes < 1) return "Hace un momento";
      if (diffMinutes < 60) return `Hace ${diffMinutes}m`;
      if (diffMinutes < 1440) return `Hace ${Math.floor(diffMinutes / 60)}h`;
      return `Hace ${Math.floor(diffMinutes / 1440)}d`;
    }
    return "Desconectado";
  }, [isOnline, lastSeen, showLastSeen]);

  return (
    <OnlineIndicator
      as={Badge}
      $status={isOnline ? "success" : "default"}
      dot
      htmlTitle={statusText}
      aria-label={`Estado: ${statusText}`}
      {...props}
    />
  );
};

// Badge contador con animación
export const BadgeCounter: React.FC<
  BadgeProps & {
    target?: number;
    duration?: number;
  }
> = ({ target = 0, duration = 2000, count: _, ...props }) => {
  const [currentCount, setCurrentCount] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const startValue = currentCount;
    const diff = target - startValue;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const newValue = startValue + diff * easeOut;

      setCurrentCount(Math.round(newValue));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [target, duration, currentCount]);

  return <Badge count={currentCount} {...props} />;
};

// Badge para carritos de compra
export const Cart: React.FC<BadgeProps> = (props) => (
  <Badge
    variant="error"
    size="sm"
    placement="top-right"
    showZero={false}
    {...props}
  />
);

// Badge para mensajes no leídos
export const UnreadMessages: React.FC<BadgeProps> = (props) => (
  <Badge
    variant="primary"
    size="sm"
    placement="top-right"
    overflowCount={99}
    {...props}
  />
);

// Badge para favoritos
export const Favorite: React.FC<BadgeProps & { isFavorite?: boolean }> = ({
  isFavorite = false,
  ...props
}) => (
  <Badge
    dot={isFavorite}
    variant="warning"
    size="xs"
    placement="top-right"
    {...props}
  />
);

// Badge para estado VIP
export const VIP: React.FC<BadgeProps> = (props) => (
  <Badge text="VIP" variant="warning" size="sm" {...props} />
);

// Badge para estado nuevo
export const NewBadge: React.FC<BadgeProps> = (props) => (
  <Badge text="Nuevo" variant="success" size="xs" {...props} />
);

// Badge para descuentos
export const Discount: React.FC<BadgeProps & { percentage?: number }> = ({
  percentage = 0,
  ...props
}) => <Badge text={`-${percentage}%`} variant="error" size="sm" {...props} />;

// =====================================
// EJEMPLOS DE USO CON SHARED SYSTEMS
// =====================================

/**
 * EJEMPLOS DE USO:
 *
 * // Básico con mapeo automático
 * <Badge count={5} size="large" variant="danger" />
 * // "large" → "lg", "danger" → "error" automáticamente
 *
 * // Envolviendo elemento
 * <Badge count={12} placement="top-right">
 *   <Button>Notificaciones</Button>
 * </Badge>
 *
 * // Dot badge para indicadores simples
 * <Badge dot variant="success">
 *   <Avatar src="user.jpg" />
 * </Badge>
 *
 * // Status badge
 * <Badge status="processing" text="En proceso" />
 *
 * // Componentes predefinidos
 * <SuccessBadge count={3} />
 * <ErrorBadge count={99} overflowCount={50} />
 * <DotBadge variant="warning" />
 *
 * // Casos específicos
 * <Notification
 *   unreadCount={15}
 *   maxDisplay={99}
 *   markAsRead={() => console.log("Marcar como leído")}
 * >
 *   <Bell />
 * </Notification>
 *
 * <OnlineStatus
 *   isOnline={true}
 *   lastSeen="2024-01-15T10:30:00Z"
 *   showLastSeen={true}
 * >
 *   <Avatar />
 * </OnlineStatus>
 *
 * <BadgeCounter target={100} duration={3000} />
 *
 * <Cart count={cartItems.length}>
 *   <ShoppingCart />
 * </Cart>
 *
 * // Styled variants
 * <ElevatedBadgeLayout count={5} />
 *
 * <OutlinedBadgeLayout text="Beta" />
 */

// Export por defecto
export default Badge;
