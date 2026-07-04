import React, { useState, useCallback } from "react";
import {
  SwitchProps,
  SWITCH_DEFAULTS,
  SIZE_MAPPING_SWITCH,
  VARIANT_MAPPING_SWITCH,
  SwitchSize,
  SwitchVariant,
} from "./Switch.types";
import {
  StyledSwitch,
  SwitchHandle,
  SwitchInner,
  SwitchLoading,
  MinimalSwitch,
  ElevatedSwitch,
  CompactSwitch,
  StatusSwitch,
} from "./Switch.styles";
import { usePersonalization } from '../../contexts/PersonalizationContext';

// =====================================
// HELPER FUNCTIONS
// =====================================

// 🎯 Mapear AllSize a SwitchSize usando shared system
const mapSwitchSize = (size: SwitchProps["size"]): SwitchSize => {
  if (!size) return "md";

  const mapped = SIZE_MAPPING_SWITCH[size];
  return mapped || "md";
};

// 🎯 Mapear AllVariant a SwitchVariant usando shared system
const mapSwitchVariant = (variant: SwitchProps["variant"]): SwitchVariant => {
  if (!variant) return "primary";

  const mapped = VARIANT_MAPPING_SWITCH[variant];
  return mapped || "primary";
};

// =====================================
// SWITCH COMPONENT
// =====================================

/**
 * Switch Component - Componente toggle unificado y accesible
 *
 * 🎯 APLICANDO SHARED SYSTEMS:
 * - ✅ size acepta AllSize con mapeo automático
 * - ✅ variant acepta AllVariant con mapeo automático
 * - ✅ Accesibilidad integrada con usePersonalization
 * - ✅ Compatible 100% con Ant Design Switch
 * - ✅ Animaciones suaves respetando reduced motion
 *
 * Reemplazo directo de Ant Design Switch con sistema unificado.
 */
export const Switch: React.FC<SwitchProps> = ({
  checked,
  defaultChecked = SWITCH_DEFAULTS.checked,
  disabled = SWITCH_DEFAULTS.disabled,
  loading = SWITCH_DEFAULTS.loading,
  size = SWITCH_DEFAULTS.size,
  variant = SWITCH_DEFAULTS.variant,
  checkedChildren,
  unCheckedChildren,
  onChange,
  onClick,
  className,
  style,
  accessibility: accessibilityProp,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  id,
  name,
  value,
  tabIndex = 0,
  autoFocus = false,
  title,
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
  const mappedSize = mapSwitchSize(size);
  const mappedVariant = mapSwitchVariant(variant);

  // Estado interno para modo uncontrolled
  const [internalChecked, setInternalChecked] = useState(defaultChecked);

  const finalId = id ? `switch-${id}` : undefined;

  // Determinar si es controlled o uncontrolled
  const isControlled = checked !== undefined;
  const currentChecked = isControlled ? checked : internalChecked;

  // Manejar cambio de estado
  const handleChange = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled || loading) return;

      const newChecked = !currentChecked;

      // Si es uncontrolled, actualizar estado interno
      if (!isControlled) {
        setInternalChecked(newChecked);
      }

      // Llamar callbacks
      onChange?.(newChecked, event);
      onClick?.(newChecked, event);
    },
    [currentChecked, disabled, loading, isControlled, onChange, onClick]
  );

  // Manejar teclas (Enter y Espacio)
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (disabled || loading) return;

      if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        handleChange(event as any); // Cast para compatibilidad con MouseEvent
      }
    },
    [disabled, loading, handleChange]
  );

  // Renderizar contenido interno
  const renderInnerContent = () => {
    if (loading) {
      return <SwitchLoading $size={mappedSize} accessibility={accessibility} />;
    }

    const content = currentChecked ? checkedChildren : unCheckedChildren;
    if (!content) return null;

    return (
      <SwitchInner
        $checked={currentChecked}
        $size={mappedSize}
        accessibility={accessibility}
      >
        {content}
      </SwitchInner>
    );
  };

  return (
    <StyledSwitch
      className={className}
      style={style}
      onClick={handleChange}
      onKeyDown={handleKeyDown}
      disabled={disabled || loading}
      tabIndex={disabled ? -1 : tabIndex}
      autoFocus={autoFocus}
      title={title}
      // Props ARIA para accesibilidad
      role="switch"
      aria-checked={currentChecked}
      aria-disabled={disabled || loading}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      // Props del form
      id={finalId}
      name={name}
      value={value}
      // Text-to-speech
      data-speak={
        accessibility.textToSpeech
          ? `Switch ${currentChecked ? "activado" : "desactivado"}`
          : undefined
      }
      // 🎯 STYLED PROPS USANDO SHARED SYSTEMS
      $checked={currentChecked}
      $disabled={disabled}
      $loading={loading}
      $size={mappedSize}
      $variant={mappedVariant}
      accessibility={accessibility}
      {...rest}
    >
      {/* Handle móvil */}
      <SwitchHandle
        $checked={currentChecked}
        $disabled={disabled}
        $loading={loading}
        $size={mappedSize}
        $variant={mappedVariant}
        accessibility={accessibility}
      />

      {/* Contenido interno (texto/iconos) */}
      {renderInnerContent()}
    </StyledSwitch>
  );
};

// =====================================
// COMPONENTES PREDEFINIDOS
// =====================================

// Switch básico sin variante específica
export const BasicSwitch: React.FC<Omit<SwitchProps, "variant">> = (props) => (
  <Switch variant="secondary" {...props} />
);

// Switch de confirmación/éxito
export const SuccessSwitch: React.FC<Omit<SwitchProps, "variant">> = (
  props
) => <Switch variant="success" {...props} />;

// Switch de peligro/error
export const DangerSwitch: React.FC<Omit<SwitchProps, "variant">> = (props) => (
  <Switch variant="error" {...props} />
);

// Switch de advertencia
export const WarningSwitch: React.FC<Omit<SwitchProps, "variant">> = (
  props
) => <Switch variant="warning" {...props} />;

// Switch informativo
export const InfoSwitch: React.FC<Omit<SwitchProps, "variant">> = (props) => (
  <Switch variant="info" {...props} />
);

// =====================================
// TAMAÑOS PREDEFINIDOS
// =====================================

// Switch pequeño
export const SmallSwitch: React.FC<Omit<SwitchProps, "size">> = (props) => (
  <Switch size="sm" {...props} />
);

// Switch mediano (por defecto)
export const MediumSwitch: React.FC<Omit<SwitchProps, "size">> = (props) => (
  <Switch size="md" {...props} />
);

// Switch grande
export const LargeSwitch: React.FC<Omit<SwitchProps, "size">> = (props) => (
  <Switch size="lg" {...props} />
);

// =====================================
// ESTILOS PREDEFINIDOS
// =====================================

// Switch minimalista
export const Minimal: React.FC<SwitchProps> = (props) => (
  <MinimalSwitch as={Switch} {...props} />
);

// Switch elevado
export const Elevated: React.FC<SwitchProps> = (props) => (
  <ElevatedSwitch as={Switch} {...props} />
);

// Switch compacto
export const CompactSwitchComponent: React.FC<SwitchProps> = (props) => (
  <CompactSwitch as={Switch} {...props} />
);

// Switch con gradientes de estado
export const Status: React.FC<SwitchProps> = (props) => (
  <StatusSwitch as={Switch} {...props} />
);

// =====================================
// CASOS DE USO ESPECÍFICOS
// =====================================

// Switch con texto ON/OFF
export const OnOffSwitch: React.FC<
  Omit<SwitchProps, "checkedChildren" | "unCheckedChildren">
> = (props) => (
  <Switch checkedChildren="ON" unCheckedChildren="OFF" {...props} />
);

// Switch con iconos check/close
export const CheckSwitch: React.FC<
  Omit<SwitchProps, "checkedChildren" | "unCheckedChildren">
> = (props) => <Switch checkedChildren="✓" unCheckedChildren="✕" {...props} />;

// Switch con loading integrado
export const LoadingSwitch: React.FC<Omit<SwitchProps, "loading">> = (
  props
) => <Switch loading={true} {...props} />;

// Switch de modo dark/light
export const ThemeSwitch: React.FC<
  Omit<SwitchProps, "checkedChildren" | "unCheckedChildren">
> = (props) => (
  <Switch
    checkedChildren="🌙"
    unCheckedChildren="☀️"
    variant="secondary"
    {...props}
  />
);

// Switch de notificaciones
export const NotificationSwitch: React.FC<
  Omit<SwitchProps, "checkedChildren" | "unCheckedChildren">
> = (props) => (
  <Switch
    checkedChildren="🔔"
    unCheckedChildren="🔕"
    variant="info"
    {...props}
  />
);

// =====================================
// EJEMPLOS DE USO CON SHARED SYSTEMS
// =====================================

/**
 * EJEMPLOS DE USO:
 *
 * // Básico con mapeo automático
 * <Switch
 *   size="small"                    // "small" → "sm" automáticamente
 *   variant="danger"                // "danger" → "error" automáticamente
 *   onChange={(checked) => console.log(checked)}
 * />
 *
 * // Controlled con estado
 * const [enabled, setEnabled] = useState(false);
 * <Switch
 *   checked={enabled}
 *   onChange={setEnabled}
 *   size="lg"
 *   variant="success"
 * />
 *
 * // Con contenido personalizado
 * <Switch
 *   size="lg"
 *   checkedChildren={<Icon name="check" />}
 *   unCheckedChildren={<Icon name="close" />}
 *   variant="primary"
 * />
 *
 * // Componentes predefinidos
 * <SuccessSwitch
 *   defaultChecked={true}
 *   size="md"
 *   onChange={(checked) => console.log("Success:", checked)}
 * />
 *
 * <OnOffSwitch
 *   size="lg"
 *   variant="primary"
 *   disabled={loading}
 * />
 *
 * // Con loading y accesibilidad
 * <Switch
 *   loading={isProcessing}
 *   accessibility={{
 *     textToSpeech: true,
 *     highContrast: true,
 *     reducedMotion: false
 *   }}
 *   aria-label="Toggle notifications"
 * />
 *
 * // Casos de uso específicos
 * <ThemeSwitch
 *   checked={isDarkMode}
 *   onChange={setDarkMode}
 *   size="md"
 * />
 *
 * <NotificationSwitch
 *   checked={notificationsEnabled}
 *   onChange={toggleNotifications}
 *   size="sm"
 * />
 */

// Export por defecto
export default Switch;
