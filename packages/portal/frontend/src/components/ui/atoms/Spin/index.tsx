import React, { useState, useEffect } from "react";
import {
  SpinProps,
  SPIN_DEFAULTS,
  SIZE_MAPPING_SPIN,
  SpinSize,
  ACCESSIBILITY_MESSAGES,
} from "./Spin.types";
import {
  StyledSpin,
  SpinOverlay,
  SpinContent,
  SpinnerIndicator,
  DotsIndicator,
  BarsIndicator,
  PulseIndicator,
  BounceIndicator,
  SpinTip,
  FullPageSpin,
  InlineSpin,
  ButtonSpin,
} from "./Spin.styles";
import { usePersonalization } from "../../../../contexts/PersonalizationContext";

// =====================================
// HELPER FUNCTIONS
// =====================================

// 🎯 Mapear AllSize a SpinSize usando shared system
const mapSpinSize = (size: SpinProps["size"]): SpinSize => {
  if (!size) return "md";

  const mapped = SIZE_MAPPING_SPIN[size];
  return mapped || "md";
};

// =====================================
// SPIN COMPONENT
// =====================================

/**
 * Spin Component - Componente de loading unificado y accesible
 *
 * 🎯 APLICANDO SHARED SYSTEMS:
 * - ✅ size acepta AllSize con mapeo automático
 * - ✅ 5 tipos de indicadores: spinner, dots, bars, pulse, bounce
 * - ✅ Overlay mode para envolver contenido
 * - ✅ Delays configurables + reduced motion support
 * - ✅ Accesibilidad integrada con usePersonalization
 * - ✅ Compatible 100% con Ant Design Spin
 *
 * Reemplazo directo de Ant Design Spin con sistema unificado.
 */
export const Spin: React.FC<SpinProps> = ({
  spinning = SPIN_DEFAULTS.spinning,
  size = SPIN_DEFAULTS.size,
  indicator = SPIN_DEFAULTS.indicator,
  tip,
  children,
  delay = SPIN_DEFAULTS.delay,
  wrapperClassName,
  className,
  style,
  accessibility: accessibilityProp,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
  role = SPIN_DEFAULTS.role,
  "aria-live": ariaLive = SPIN_DEFAULTS["aria-live"],
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

  const finalId = id ? `spin-${id}` : undefined;

  // 🎯 MAPEO CON SHARED SYSTEMS (OBLIGATORIO)
  const mappedSize = mapSpinSize(size);

  // Estado interno para manejar delays
  const [delayedSpinning, setDelayedSpinning] = useState(spinning);

  // Effect para manejar delay
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (spinning && delay > 0) {
      // Mostrar después del delay
      timeout = setTimeout(() => {
        setDelayedSpinning(true);
      }, delay);
    } else {
      // Mostrar inmediatamente
      setDelayedSpinning(spinning);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [spinning, delay]);

  // Renderizar indicador según tipo
  const renderIndicator = () => {
    if (!delayedSpinning) return null;

    const indicatorProps = {
      $size: mappedSize,
      $indicator: indicator,
      accessibility,
    };

    switch (indicator) {
      case "dots":
        return <DotsIndicator {...indicatorProps} />;
      case "bars":
        return (
          <BarsIndicator {...indicatorProps}>
            <span />
            <span />
          </BarsIndicator>
        );
      case "pulse":
        return <PulseIndicator {...indicatorProps} />;
      case "bounce":
        return (
          <BounceIndicator {...indicatorProps}>
            <span />
          </BounceIndicator>
        );
      case "spinner":
      default:
        return <SpinnerIndicator {...indicatorProps} />;
    }
  };

  // Renderizar tip si existe
  const renderTip = () => {
    if (!tip || !delayedSpinning) return null;

    return (
      <SpinTip $size={mappedSize} accessibility={accessibility}>
        {tip}
      </SpinTip>
    );
  };

  // Obtener mensaje de accesibilidad
  const getAccessibilityMessage = () => {
    if (accessibility.ariaLabel) {
      return accessibility.ariaLabel;
    }

    if (ariaLabel) {
      return ariaLabel;
    }

    // Usar mensaje por defecto (idioma español por ahora)
    // Nota: La detección de idioma podría implementarse usando el contexto de personalización
    const messages = ACCESSIBILITY_MESSAGES.es;

    if (tip) {
      return `${messages.loading}: ${tip}`;
    }

    return messages.loading;
  };

  // Si tiene children, renderizar como overlay
  if (children) {
    return (
      <StyledSpin
        className={wrapperClassName}
        $spinning={delayedSpinning}
        $size={mappedSize}
        $indicator={indicator}
        $hasChildren={true}
        accessibility={accessibility}
        {...rest}
      >
        {/* Contenido envuelto */}
        <SpinContent $spinning={delayedSpinning} accessibility={accessibility}>
          {children}
        </SpinContent>

        {/* Overlay con spinner */}
        {delayedSpinning && (
          <SpinOverlay
            $spinning={delayedSpinning}
            accessibility={accessibility}
            role={role}
            aria-live={ariaLive}
            aria-label={getAccessibilityMessage()}
            aria-describedby={ariaDescribedBy}
            id={finalId}
            data-speak={
              accessibility.textToSpeech ? getAccessibilityMessage() : undefined
            }
          >
            {renderIndicator()}
            {renderTip()}
          </SpinOverlay>
        )}
      </StyledSpin>
    );
  }

  // Si no tiene children, renderizar como spinner standalone
  return (
    <StyledSpin
      className={className}
      style={style}
      $spinning={delayedSpinning}
      $size={mappedSize}
      $indicator={indicator}
      $hasChildren={false}
      accessibility={accessibility}
      role={role}
      aria-live={ariaLive}
      aria-label={getAccessibilityMessage()}
      aria-describedby={ariaDescribedBy}
      id={finalId}
      aria-busy={delayedSpinning}
      data-speak={
        accessibility.textToSpeech ? getAccessibilityMessage() : undefined
      }
      {...rest}
    >
      {renderIndicator()}
      {renderTip()}
    </StyledSpin>
  );
};

// =====================================
// COMPONENTES PREDEFINIDOS - TAMAÑOS
// =====================================

// Spin extra pequeño
export const TinySpin: React.FC<Omit<SpinProps, "size">> = (props) => (
  <Spin size="xs" {...props} />
);

// Spin pequeño
export const SmallSpin: React.FC<Omit<SpinProps, "size">> = (props) => (
  <Spin size="sm" {...props} />
);

// Spin mediano (por defecto)
export const MediumSpin: React.FC<Omit<SpinProps, "size">> = (props) => (
  <Spin size="md" {...props} />
);

// Spin grande
export const LargeSpin: React.FC<Omit<SpinProps, "size">> = (props) => (
  <Spin size="lg" {...props} />
);

// Spin extra grande
export const ExtraLargeSpin: React.FC<Omit<SpinProps, "size">> = (props) => (
  <Spin size="xl" {...props} />
);

// =====================================
// COMPONENTES PREDEFINIDOS - INDICADORES
// =====================================

// Spinner circular clásico
export const SpinnerSpin: React.FC<Omit<SpinProps, "indicator">> = (props) => (
  <Spin indicator="spinner" {...props} />
);

// Dots pulsantes
export const DotsSpin: React.FC<Omit<SpinProps, "indicator">> = (props) => (
  <Spin indicator="dots" {...props} />
);

// Barras animadas
export const BarsSpin: React.FC<Omit<SpinProps, "indicator">> = (props) => (
  <Spin indicator="bars" {...props} />
);

// Pulso expansivo
export const PulseSpin: React.FC<Omit<SpinProps, "indicator">> = (props) => (
  <Spin indicator="pulse" {...props} />
);

// Bounce suave
export const BounceSpin: React.FC<Omit<SpinProps, "indicator">> = (props) => (
  <Spin indicator="bounce" {...props} />
);

// =====================================
// COMPONENTES PREDEFINIDOS - LAYOUTS
// =====================================

// Spin de página completa
export const FullPage: React.FC<SpinProps> = (props) => (
  <FullPageSpin as={Spin} {...props} />
);

// Spin inline
export const Inline: React.FC<SpinProps> = (props) => (
  <InlineSpin as={Spin} {...props} />
);

// Spin para botones
export const ButtonSpinComponent: React.FC<SpinProps> = (props) => (
  <ButtonSpin as={Spin} size="sm" {...props} />
);

// =====================================
// CASOS DE USO ESPECÍFICOS
// =====================================

// Spin con contenido envuelto
export const LoadingContainer: React.FC<SpinProps & { loading?: boolean }> = ({
  loading = true,
  children,
  ...props
}) => (
  <Spin spinning={loading} {...props}>
    {children}
  </Spin>
);

// Spin con texto de carga personalizado
export const LoadingText: React.FC<
  SpinProps & {
    loadingText?: string;
    showText?: boolean;
  }
> = ({ loadingText = "Cargando...", showText = true, ...props }) => (
  <Spin tip={showText ? loadingText : undefined} {...props} />
);

// Spin con delay para evitar flicker
export const DelayedSpin: React.FC<SpinProps> = (props) => (
  <Spin delay={300} {...props} />
);

// Spin para datos
export const DataSpin: React.FC<
  SpinProps & {
    loading?: boolean;
    hasData?: boolean;
    emptyText?: string;
  }
> = ({
  loading = false,
  hasData = true,
  emptyText = "No hay datos",
  children,
  ...props
}) => {
  if (loading) {
    return <Spin spinning tip="Cargando datos..." {...props} />;
  }

  if (!hasData) {
    return (
      <div style={{ textAlign: "center", color: "#999" }}>{emptyText}</div>
    );
  }

  return <>{children}</>;
};

// Spin para formularios
export const FormSpin: React.FC<SpinProps & { submitting?: boolean }> = ({
  submitting = false,
  children,
  ...props
}) => (
  <Spin spinning={submitting} tip="Enviando formulario..." {...props}>
    {children}
  </Spin>
);

// Spin con estado de error
export const StatefulSpin: React.FC<
  SpinProps & {
    loading?: boolean;
    error?: string | null;
    onRetry?: () => void;
  }
> = ({ loading = false, error = null, onRetry, children, ...props }) => {
  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <div style={{ color: "#dc3545", marginBottom: "12px" }}>
          Error: {error}
        </div>
        {onRetry && (
          <button
            onClick={onRetry}
            style={{
              padding: "8px 16px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Reintentar
          </button>
        )}
      </div>
    );
  }

  return (
    <Spin spinning={loading} {...props}>
      {children}
    </Spin>
  );
};

// =====================================
// COMBINACIONES ÚTILES
// =====================================

// Loading overlay para tablas
export const TableSpin: React.FC<SpinProps> = (props) => (
  <Spin size="lg" tip="Cargando tabla..." {...props} />
);

// Loading para imágenes
export const ImageSpin: React.FC<SpinProps> = (props) => (
  <Spin size="sm" indicator="pulse" tip="Cargando imagen..." {...props} />
);

// Loading para API calls
export const ApiSpin: React.FC<SpinProps> = (props) => (
  <Spin indicator="dots" tip="Conectando..." delay={200} {...props} />
);

// =====================================
// EJEMPLOS DE USO CON SHARED SYSTEMS
// =====================================

/**
 * EJEMPLOS DE USO:
 *
 * // Básico standalone
 * <Spin spinning={isLoading} size="lg" />
 *
 * // Con mapeo automático de tamaños
 * <Spin
 *   spinning={isLoading}
 *   size="large"                    // "large" → "lg" automáticamente
 *   indicator="dots"
 *   tip="Procesando datos..."
 * />
 *
 * // Envolviendo contenido (overlay mode)
 * <Spin spinning={isLoading} tip="Cargando contenido...">
 *   <div>Contenido que se blurrea durante el loading</div>
 * </Spin>
 *
 * // Diferentes indicadores
 * <DotsSpin spinning={loading} size="md" tip="Conectando..." />
 * <BarsSpin spinning={loading} size="sm" />
 * <PulseSpin spinning={loading} size="lg" tip="Procesando..." />
 * <BounceSpin spinning={loading} size="xl" />
 *
 * // Layouts específicos
 * <FullPage spinning={appLoading} tip="Cargando aplicación..." />
 * <Inline spinning={buttonLoading} size="xs" />
 * <Button spinning={submitLoading} />
 *
 * // Casos específicos
 * <LoadingContainer loading={isDataLoading}>
 *   <UserProfile user={userData} />
 * </LoadingContainer>
 *
 * <DataSpin
 *   loading={isFetching}
 *   hasData={data?.length > 0}
 *   emptyText="No se encontraron usuarios"
 * >
 *   <UserList users={data} />
 * </DataSpin>
 *
 * <StatefulSpin
 *   loading={isLoading}
 *   error={error}
 *   onRetry={refetch}
 * >
 *   <Dashboard data={dashboardData} />
 * </StatefulSpin>
 *
 * // Con delay para evitar flickers
 * <DelayedSpin spinning={quickOperation} />
 *
 * // Con accesibilidad personalizada
 * <Spin
 *   spinning={loading}
 *   accessibility={{
 *     ariaLabel: "Cargando datos del usuario",
 *     textToSpeech: true,
 *     reducedMotion: false
 *   }}
 * />
 */

// Export por defecto
export default Spin;
