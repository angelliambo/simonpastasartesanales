import React, { useState, useCallback } from "react";
import {
  AlertProps,
  ALERT_DEFAULTS,
  SIZE_MAPPING_ALERT,
  VARIANT_MAPPING_ALERT,
  TYPE_TO_VARIANT_MAPPING,
  AlertSize,
  AlertVariant,
  DEFAULT_ICONS,
} from "./Alert.types";
import {
  StyledAlert,
  AlertIcon,
  AlertContent,
  AlertMessage,
  AlertDescription,
  AlertClose,
  AlertActions,
  AlertNotification,
} from "./Alert.styles";
import { usePersonalization } from '../../contexts/PersonalizationContext';

// =====================================
// HELPER FUNCTIONS
// =====================================

// 🎯 Mapear AllSize a AlertSize usando shared system
const mapAlertSize = (size: AlertProps["size"]): AlertSize => {
  if (!size) return "md";

  const mapped = SIZE_MAPPING_ALERT[size];
  return mapped || "md";
};

// 🎯 Mapear AllVariant a AlertVariant usando shared system
const mapAlertVariant = (variant: AlertProps["variant"]): AlertVariant => {
  if (!variant) return "info";

  const mapped = VARIANT_MAPPING_ALERT[variant];
  return mapped || "info";
};

// 🎯 Resolver variant desde type prop
const resolveVariantFromType = (
  type: AlertProps["type"],
  variant: AlertProps["variant"]
): AlertVariant => {
  // Si hay type, tiene prioridad sobre variant
  if (type && TYPE_TO_VARIANT_MAPPING[type]) {
    return TYPE_TO_VARIANT_MAPPING[type];
  }

  // Sino, usar variant mapeado
  return mapAlertVariant(variant);
};

// =====================================
// ALERT COMPONENT
// =====================================

/**
 * Alert Component - Componente de alerta unificado y accesible
 *
 * 🎯 APLICANDO SHARED SYSTEMS:
 * - ✅ size acepta AllSize con mapeo automático
 * - ✅ variant acepta AllVariant con mapeo automático
 * - ✅ type prop como shorthand para variants comunes
 * - ✅ 4 estilos visuales: filled, outlined, soft, minimal
 * - ✅ Accesibilidad integrada con usePersonalization
 * - ✅ Compatible 100% con Ant Design Alert
 *
 * Reemplazo directo de Ant Design Alert con sistema unificado.
 */
export const Alert: React.FC<AlertProps> = ({
  message,
  description,
  children,
  size = ALERT_DEFAULTS.size,
  variant = ALERT_DEFAULTS.variant,
  type,
  alertStyle = ALERT_DEFAULTS.alertStyle,
  closable = ALERT_DEFAULTS.closable,
  showIcon = ALERT_DEFAULTS.showIcon,
  banner = ALERT_DEFAULTS.banner,
  onClose,
  afterClose,
  className,
  style: styleProps,
  accessibility: accessibilityProp,
  role = ALERT_DEFAULTS.role,
  "aria-live": ariaLive = ALERT_DEFAULTS["aria-live"],
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
  id,
  action,
  icon,
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
  const mappedSize = mapAlertSize(size);
  const mappedVariant = resolveVariantFromType(type, variant);

  // Estado interno para visibility (cuando es closable)
  const [visible, setVisible] = useState(true);

  // Manejar cierre del alert
  const handleClose = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      // Llamar callback onClose
      onClose?.(e);

      // Ocultar alert con animación
      setVisible(false);

      // Llamar afterClose después de la animación
      if (afterClose) {
        setTimeout(afterClose, 300); // Duración de la animación
      }
    },
    [onClose, afterClose]
  );

  // Si no es visible (después de cerrar), no renderizar
  if (!visible) {
    return null;
  }

  // Renderizar icono automático o personalizado
  const renderIcon = () => {
    if (!showIcon) return null;

    // Usar icono personalizado si se proporciona
    if (icon) {
      return (
        <AlertIcon
          $size={mappedSize}
          $variant={mappedVariant}
          accessibility={accessibility}
        >
          {icon}
        </AlertIcon>
      );
    }

    // Usar icono por defecto según variant
    const defaultIcon = DEFAULT_ICONS[mappedVariant] || DEFAULT_ICONS.info;

    return (
      <AlertIcon
        $size={mappedSize}
        $variant={mappedVariant}
        accessibility={accessibility}
      >
        {defaultIcon}
      </AlertIcon>
    );
  };

  // Renderizar botón de cerrar
  const renderCloseButton = () => {
    if (!closable) return null;

    return (
      <AlertClose
        onClick={handleClose}
        $size={mappedSize}
        accessibility={accessibility}
        aria-label="Cerrar alerta"
        title="Cerrar"
      >
        ✕
      </AlertClose>
    );
  };

  const finalId = id ? `alert-${id}` : undefined;

  // Renderizar contenido del alert
  const renderContent = () => {
    const hasDescription = !!description;

    return (
      <AlertContent
        $size={mappedSize}
        $hasDescription={hasDescription}
        accessibility={accessibility}
      >
        {/* Mensaje principal */}
        {message && <AlertMessage>{message}</AlertMessage>}

        {/* Descripción adicional */}
        {description && <AlertDescription>{description}</AlertDescription>}

        {/* Contenido personalizado */}
        {children}

        {/* Acciones */}
        {action && (
          <AlertActions $size={mappedSize} accessibility={accessibility}>
            {action}
          </AlertActions>
        )}
      </AlertContent>
    );
  };

  return (
    <StyledAlert
      className={className}
      style={styleProps}
      role={role}
      aria-live={ariaLive}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      id={finalId}
      data-speak={
        accessibility.textToSpeech
          ? `Alerta ${mappedVariant}: ${
              (message ?? children)?.toString() || ""
            }`
          : undefined
      }
      // 🎯 STYLED PROPS USANDO SHARED SYSTEMS
      $size={mappedSize}
      $variant={mappedVariant}
      $alertStyle={alertStyle}
      $banner={banner}
      $closable={closable}
      accessibility={accessibility}
      {...rest}
    >
      {/* Icono del alert */}
      {renderIcon()}

      {/* Contenido principal */}
      {renderContent()}

      {/* Botón de cerrar */}
      {renderCloseButton()}
    </StyledAlert>
  );
};

// =====================================
// COMPONENTES PREDEFINIDOS - VARIANTS
// =====================================

// Alert de éxito
export const SuccessAlert: React.FC<Omit<AlertProps, "variant" | "type">> = (
  props
) => <Alert type="success" {...props} />;

// Alert de información
export const InfoAlert: React.FC<Omit<AlertProps, "variant" | "type">> = (
  props
) => <Alert type="info" {...props} />;

// Alert de advertencia
export const WarningAlert: React.FC<Omit<AlertProps, "variant" | "type">> = (
  props
) => <Alert type="warning" {...props} />;

// Alert de error
export const ErrorAlert: React.FC<Omit<AlertProps, "variant" | "type">> = (
  props
) => <Alert type="error" {...props} />;

// Alert primario
export const PrimaryAlert: React.FC<Omit<AlertProps, "variant">> = (props) => (
  <Alert variant="primary" {...props} />
);

// Alert secundario
export const SecondaryAlert: React.FC<Omit<AlertProps, "variant">> = (
  props
) => <Alert variant="secondary" {...props} />;

// =====================================
// COMPONENTES PREDEFINIDOS - TAMAÑOS
// =====================================

// Alert pequeño
export const SmallAlert: React.FC<Omit<AlertProps, "size">> = (props) => (
  <Alert size="sm" {...props} />
);

// Alert grande
export const LargeAlert: React.FC<Omit<AlertProps, "size">> = (props) => (
  <Alert size="lg" {...props} />
);

// =====================================
// COMPONENTES PREDEFINIDOS - ESTILOS
// =====================================

// Alert relleno (filled)
export const FilledAlert: React.FC<Omit<AlertProps, "alertStyle">> = (
  props
) => <Alert alertStyle="filled" {...props} />;

// Alert con borde (outlined)
export const OutlinedAlert: React.FC<Omit<AlertProps, "alertStyle">> = (
  props
) => <Alert alertStyle="outlined" {...props} />;

// Alert suave (soft) - por defecto
export const SoftAlert: React.FC<Omit<AlertProps, "alertStyle">> = (props) => (
  <Alert alertStyle="soft" {...props} />
);

// Alert minimalista
export const MinimalAlert: React.FC<Omit<AlertProps, "alertStyle">> = (
  props
) => <Alert alertStyle="minimal" {...props} />;

// =====================================
// COMPONENTES PREDEFINIDOS - FUNCIONALES
// =====================================

// Alert cerrable
export const ClosableAlert: React.FC<Omit<AlertProps, "closable">> = (
  props
) => <Alert closable {...props} />;

// Alert banner (full width)
export const BannerAlert: React.FC<Omit<AlertProps, "banner">> = (props) => (
  <Alert banner {...props} />
);

// Alert sin icono
export const PlainAlert: React.FC<Omit<AlertProps, "showIcon">> = (props) => (
  <Alert showIcon={false} {...props} />
);

// =====================================
// COMPONENTES PREDEFINIDOS - STYLED VARIANTS (usando styled components exportados)
// =====================================

// RoundedAlert, ElevatedAlert, CompactAlert, BorderAlert, PulsingAlert
// se exportan desde Alert.styles.ts como styled components

export {
  RoundedAlert,
  ElevatedAlert,
  CompactAlert,
  BorderAlert,
  PulsingAlert,
} from "./Alert.styles";

// =====================================
// CASOS DE USO ESPECÍFICOS
// =====================================

// Alert de confirmación con botones
export const ConfirmAlert: React.FC<
  AlertProps & {
    onConfirm?: () => void;
    onCancel?: () => void;
    confirmText?: string;
    cancelText?: string;
  }
> = ({
  onConfirm,
  onCancel,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  ...props
}) => (
  <WarningAlert
    action={
      <div style={{ display: "flex", gap: "8px" }}>
        <button
          onClick={onConfirm}
          style={{
            padding: "4px 12px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {confirmText}
        </button>
        <button
          onClick={onCancel}
          style={{
            padding: "4px 12px",
            backgroundColor: "transparent",
            color: "#6c757d",
            border: "1px solid #ced4da",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {cancelText}
        </button>
      </div>
    }
    {...props}
  />
);

// Alert de loading
export const LoadingAlert: React.FC<
  AlertProps & {
    loading?: boolean;
    loadingText?: string;
  }
> = ({ loading = true, loadingText = "Cargando...", ...props }) => (
  <InfoAlert
    message={loadingText}
    icon={loading ? "⏳" : undefined}
    {...props}
  />
);

// Alert de notificación toast
export const NotificationAlert: React.FC<AlertProps> = (props) => (
  <AlertNotification as={Alert} closable {...props} />
);

// =====================================
// EJEMPLOS DE USO CON SHARED SYSTEMS
// =====================================

/**
 * EJEMPLOS DE USO:
 *
 * // Básico con mapeo automático
 * <Alert
 *   message="Operación exitosa"
 *   type="success"                    // Shorthand para variant="success"
 *   size="large"                      // "large" → "lg" automáticamente
 *   closable
 * />
 *
 * // Con variant legacy
 * <Alert
 *   message="Error crítico"
 *   variant="danger"                  // "danger" → "error" automáticamente
 *   style="filled"
 *   size="lg"
 * />
 *
 * // Con descripción y acciones
 * <Alert
 *   message="Confirmar eliminación"
 *   description="Esta acción no se puede deshacer"
 *   type="warning"
 *   action={
 *     <div>
 *       <Button size="sm" variant="error">Eliminar</Button>
 *       <Button size="sm" variant="secondary">Cancelar</Button>
 *     </div>
 *   }
 * />
 *
 * // Componentes predefinidos
 * <SuccessAlert
 *   message="Datos guardados correctamente"
 *   closable
 *   size="md"
 * />
 *
 * <ErrorAlert
 *   message="Error de conexión"
 *   description="No se pudo conectar al servidor"
 *   style="outlined"
 * />
 *
 * // Casos específicos
 * <ConfirmAlert
 *   message="¿Eliminar usuario?"
 *   description="Esta acción es irreversible"
 *   onConfirm={() => console.log("Confirmado")}
 *   onCancel={() => console.log("Cancelado")}
 * />
 *
 * <LoadingAlert
 *   loading={isProcessing}
 *   loadingText="Procesando datos..."
 * />
 *
 * // Styled variants
 * <Elevated>
 *   <WarningAlert message="Alerta elevada" />
 * </Elevated>
 *
 * <BorderLeft>
 *   <InfoAlert message="Información importante" />
 * </BorderLeft>
 */

// Export por defecto
export default Alert;
