import React, { useState, useEffect, useMemo } from "react";
import {
  StatisticProps,
  STATISTIC_DEFAULTS,
  SIZE_MAPPING_STATISTIC,
  VARIANT_MAPPING_STATISTIC,
  StatisticSize,
  StatisticVariant,
  TREND_ICONS,
  numberFormatter,
  currencyFormatter,
  percentageFormatter,
  getAccessibleDescription,
  CurrencyStatisticProps,
  PercentageStatisticProps,
  CountdownStatisticProps,
} from "./Statistic.types";
import {
  StyledStatistic,
  StatisticTitle,
  StatisticValueContainer,
  StatisticValue,
  StatisticAffix,
  StatisticTrend,
  CardStatistic,
  CompactStatistic,
  CenteredStatistic,
  BorderedStatistic,
  GradientStatistic,
  StatisticSkeleton,
} from "./Statistic.styles";
import { usePersonalization } from '../../contexts/PersonalizationContext';

// =====================================
// HELPER FUNCTIONS
// =====================================

// 🎯 Mapear AllSize a StatisticSize usando shared system
const mapStatisticSize = (size: StatisticProps["size"]): StatisticSize => {
  if (!size) return "md";

  const mapped = SIZE_MAPPING_STATISTIC[size];
  return mapped || "md";
};

// 🎯 Mapear AllVariant a StatisticVariant usando shared system
const mapStatisticVariant = (
  variant: StatisticProps["variant"]
): StatisticVariant => {
  if (!variant) return "primary";

  const mapped = VARIANT_MAPPING_STATISTIC[variant];
  return mapped || "primary";
};

// Formatear valor usando formatter o configuración por defecto
const formatValue = (
  value?: string | number,
  formatter?: StatisticProps["formatter"],
  precision?: number,
  groupSeparator?: string,
  decimalSeparator?: string
): React.ReactNode => {
  // Si hay formatter personalizado, usarlo
  if (formatter) {
    return formatter(value);
  }

  // Si no hay valor, mostrar "0"
  if (value === null || value === undefined) {
    return "0";
  }

  // Si es string, verificar si realmente es numérico
  if (typeof value === "string") {
    const trimmed = value.trim();
    const numericPattern = /^[+-]?\d+(\.\d+)?$/;

    if (trimmed === "" || !numericPattern.test(trimmed)) {
      return value;
    }
  }

  // Formatear número con configuraciones
  return numberFormatter(value, {
    precision,
    groupSeparator,
    decimalSeparator,
  });
};

// =====================================
// STATISTIC COMPONENT
// =====================================

/**
 * Statistic Component - Componente de estadísticas unificado y accesible
 *
 * 🎯 APLICANDO SHARED SYSTEMS:
 * - ✅ size acepta AllSize con mapeo automático
 * - ✅ variant acepta AllVariant con mapeo automático
 * - ✅ Formatters integrados: números, moneda, porcentajes
 * - ✅ Trend indicators con animaciones
 * - ✅ Loading states con skeleton
 * - ✅ Accesibilidad integrada con usePersonalization
 * - ✅ Compatible 100% con Ant Design Statistic
 *
 * Reemplazo directo de Ant Design Statistic con sistema unificado.
 */
export const Statistic: React.FC<StatisticProps> = ({
  title,
  value,
  size = STATISTIC_DEFAULTS.size,
  variant = STATISTIC_DEFAULTS.variant,
  precision = STATISTIC_DEFAULTS.precision,
  prefix,
  suffix,
  formatter,
  groupSeparator = STATISTIC_DEFAULTS.groupSeparator,
  decimalSeparator = STATISTIC_DEFAULTS.decimalSeparator,
  loading = STATISTIC_DEFAULTS.loading,
  trend,
  trendValue,
  className,
  style,
  valueStyle,
  accessibility: accessibilityProp,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
  role = STATISTIC_DEFAULTS.role,
  htmlTitle,
  id,
  onClick,
  onHover,
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
  const mappedSize = mapStatisticSize(size);
  const mappedVariant = mapStatisticVariant(variant);

  // Estado para detectar actualizaciones de valor
  const [isUpdating, setIsUpdating] = useState(false);

  // Formatear valor principal
  const formattedValue = useMemo(() => {
    return formatValue(
      value,
      formatter,
      precision,
      groupSeparator,
      decimalSeparator
    );
  }, [value, formatter, precision, groupSeparator, decimalSeparator]);

  // Generar descripción accesible
  const accessibleDescription = useMemo(() => {
    return getAccessibleDescription({
      title,
      value,
      trend,
      trendValue,
      prefix,
      suffix,
    });
  }, [title, value, trend, trendValue, prefix, suffix]);

  // Detectar cambios de valor para animación
  useEffect(() => {
    if (!accessibility.reducedMotion && !loading) {
      setIsUpdating(true);
      const timer = setTimeout(() => setIsUpdating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [value, accessibility.reducedMotion, loading]);

  // Renderizar título si existe
  const renderTitle = () => {
    if (!title) return null;

    return (
      <StatisticTitle
        $size={mappedSize}
        $variant={mappedVariant}
        accessibility={accessibility}
      >
        {title}
      </StatisticTitle>
    );
  };

  // Renderizar valor principal con prefix/suffix
  const renderValue = () => {
    if (loading) {
      return (
        <StatisticSkeleton>
          <div className="skeleton-value" />
        </StatisticSkeleton>
      );
    }

    return (
      <StatisticValueContainer>
        {/* Prefix */}
        {prefix && (
          <StatisticAffix
            $size={mappedSize}
            $variant={mappedVariant}
            $type="prefix"
            accessibility={accessibility}
          >
            {prefix}
          </StatisticAffix>
        )}

        {/* Valor principal */}
        <StatisticValue
          className={isUpdating ? "updating" : ""}
          style={valueStyle}
          $size={mappedSize}
          $variant={mappedVariant}
          $loading={loading}
          accessibility={accessibility}
        >
          {formattedValue}
        </StatisticValue>

        {/* Suffix */}
        {suffix && (
          <StatisticAffix
            $size={mappedSize}
            $variant={mappedVariant}
            $type="suffix"
            accessibility={accessibility}
          >
            {suffix}
          </StatisticAffix>
        )}
      </StatisticValueContainer>
    );
  };

  // Renderizar trend indicator
  const renderTrend = () => {
    if (!trend || trendValue === undefined) return null;

    const trendIcon = TREND_ICONS[trend];
    const formattedTrendValue = Math.abs(trendValue);
    const sign = trend === "increase" ? "+" : trend === "decrease" ? "-" : "";

    return (
      <StatisticTrend
        $size={mappedSize}
        $trend={trend}
        accessibility={accessibility}
      >
        <span className="trend-icon">{trendIcon}</span>
        <span>
          {sign}
          {formattedTrendValue}%
        </span>
      </StatisticTrend>
    );
  };

  // Si está loading y no hay contenido, mostrar skeleton completo
  if (loading && !title && !value) {
    return (
      <StatisticSkeleton>
        <div className="skeleton-title" />
        <div className="skeleton-value" />
      </StatisticSkeleton>
    );
  }

  const finalId = id ? `statistic-${id}` : undefined;

  return (
    <StyledStatistic
      className={className}
      style={style}
      role={role}
      aria-label={ariaLabel || accessibleDescription}
      aria-describedby={ariaDescribedBy}
      title={htmlTitle}
      id={finalId}
      onClick={onClick}
      onMouseEnter={onHover}
      tabIndex={onClick ? 0 : undefined}
      data-speak={
        accessibility.textToSpeech ? accessibleDescription : undefined
      }
      // 🎯 STYLED PROPS USANDO SHARED SYSTEMS
      $size={mappedSize}
      $variant={mappedVariant}
      $loading={loading}
      $interactive={!!onClick}
      accessibility={accessibility}
      {...rest}
    >
      {/* Título */}
      {renderTitle()}

      {/* Valor principal */}
      {renderValue()}

      {/* Trend indicator */}
      {renderTrend()}
    </StyledStatistic>
  );
};

// =====================================
// COMPONENTES PREDEFINIDOS - VARIANTS
// =====================================

// Statistic primario
export const PrimaryStatistic: React.FC<Omit<StatisticProps, "variant">> = (
  props
) => <Statistic variant="primary" {...props} />;

// Statistic de éxito
export const SuccessStatistic: React.FC<Omit<StatisticProps, "variant">> = (
  props
) => <Statistic variant="success" {...props} />;

// Statistic de advertencia
export const WarningStatistic: React.FC<Omit<StatisticProps, "variant">> = (
  props
) => <Statistic variant="warning" {...props} />;

// Statistic de error
export const ErrorStatistic: React.FC<Omit<StatisticProps, "variant">> = (
  props
) => <Statistic variant="error" {...props} />;

// Statistic de información
export const InfoStatistic: React.FC<Omit<StatisticProps, "variant">> = (
  props
) => <Statistic variant="info" {...props} />;

// Statistic secundario
export const SecondaryStatistic: React.FC<Omit<StatisticProps, "variant">> = (
  props
) => <Statistic variant="secondary" {...props} />;

// =====================================
// COMPONENTES PREDEFINIDOS - TAMAÑOS
// =====================================

// Statistic pequeño
export const SmallStatistic: React.FC<Omit<StatisticProps, "size">> = (
  props
) => <Statistic size="sm" {...props} />;

// Statistic grande
export const LargeStatistic: React.FC<Omit<StatisticProps, "size">> = (
  props
) => <Statistic size="lg" {...props} />;

// Statistic extra grande
export const ExtraLargeStatistic: React.FC<Omit<StatisticProps, "size">> = (
  props
) => <Statistic size="xl" {...props} />;

// =====================================
// COMPONENTES PREDEFINIDOS - LAYOUTS
// =====================================

// Statistic tipo card
export const CardLayout: React.FC<StatisticProps> = (props) => (
  <CardStatistic as={Statistic} {...props} />
);

// Statistic compacto
export const CompactLayout: React.FC<StatisticProps> = (props) => (
  <CompactStatistic as={Statistic} {...props} />
);

// Statistic centrado
export const CenteredLayout: React.FC<StatisticProps> = (props) => (
  <CenteredStatistic as={Statistic} {...props} />
);

// Statistic con borde
export const BorderedLayout: React.FC<StatisticProps> = (props) => (
  <BorderedStatistic as={Statistic} {...props} />
);

// Statistic con gradiente
export const GradientLayout: React.FC<StatisticProps> = (props) => (
  <GradientStatistic as={Statistic} {...props} />
);

// =====================================
// CASOS DE USO ESPECÍFICOS
// =====================================

// Statistic para moneda
export const Currency: React.FC<CurrencyStatisticProps> = ({
  currency = "USD",
  currencyDisplay = "symbol",
  formatter,
  ...props
}) => {
  const defaultFormatter = (value?: string | number) =>
    currencyFormatter(value, currency, {
      precision: props.precision || 2,
      currencyDisplay,
    });

  return <Statistic formatter={formatter || defaultFormatter} {...props} />;
};

// Statistic para porcentajes
export const Percentage: React.FC<PercentageStatisticProps> = ({
  showPercentSign = true,
  baseValue,
  formatter,
  value,
  ...props
}) => {
  // Calcular porcentaje si hay baseValue
  const calculatedValue = useMemo(() => {
    if (baseValue && value && typeof value === "number") {
      return (value / baseValue) * 100;
    }
    return value;
  }, [value, baseValue]);

  const defaultFormatter = (val?: string | number) =>
    percentageFormatter(val, {
      precision: props.precision ?? 0,
      showSign: showPercentSign,
    });

  return (
    <Statistic
      value={calculatedValue}
      formatter={formatter || defaultFormatter}
      {...props}
    />
  );
};

// Statistic con countdown
export const Countdown: React.FC<CountdownStatisticProps> = ({
  targetDate,
  onFinish,
  format = "HH:mm:ss",
  ...props
}) => {
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    if (!targetDate) return;

    const target = new Date(targetDate).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = target - now;

      if (distance < 0) {
        setTimeLeft("00:00:00");
        onFinish?.();
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      switch (format) {
        case "DD:HH:mm:ss":
          setTimeLeft(
            `${days.toString().padStart(2, "0")}:${hours
              .toString()
              .padStart(2, "0")}:${minutes
              .toString()
              .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
          );
          break;
        case "HH:mm:ss":
        default:
          const totalHours = days * 24 + hours;
          setTimeLeft(
            `${totalHours.toString().padStart(2, "0")}:${minutes
              .toString()
              .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
          );
          break;
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [targetDate, format, onFinish]);

  return <Statistic value={timeLeft} {...props} />;
};

// Statistic para métricas de dashboard
export const Metric: React.FC<
  StatisticProps & {
    change?: number;
    changeType?: "percentage" | "absolute";
  }
> = ({ change, changeType = "percentage", ...props }) => {
  // Determinar trend basado en change
  const trend = useMemo(() => {
    if (!change) return undefined;
    if (change > 0) return "increase";
    if (change < 0) return "decrease";
    return "stable";
  }, [change]);

  return (
    <Statistic trend={trend} trendValue={Math.abs(change || 0)} {...props} />
  );
};

// Statistic para contadores animados
export const Counter: React.FC<
  StatisticProps & {
    start?: number;
    duration?: number;
  }
> = ({ value: targetValue, start = 0, duration = 2000, ...props }) => {
  const [currentValue, setCurrentValue] = useState(start);

  useEffect(() => {
    if (typeof targetValue !== "number") return;

    const startTime = Date.now();
    const startValue = currentValue;
    const diff = targetValue - startValue;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const newValue = startValue + diff * easeOut;

      setCurrentValue(Math.round(newValue));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [targetValue, duration, currentValue]);

  return <Statistic value={currentValue} {...props} />;
};

// =====================================
// EJEMPLOS DE USO CON SHARED SYSTEMS
// =====================================

/**
 * EJEMPLOS DE USO:
 *
 * // Básico con mapeo automático
 * <Statistic
 *   title="Usuarios Activos"
 *   value={1234}
 *   size="large"                     // "large" → "lg" automáticamente
 *   variant="success"
 *   precision={0}
 * />
 *
 * // Con variant legacy
 * <Statistic
 *   title="Errores"
 *   value={42}
 *   variant="danger"                 // "danger" → "error" automáticamente
 *   trend="decrease"
 *   trendValue={15.2}
 * />
 *
 * // Con formatter personalizado
 * <Statistic
 *   title="Ingresos"
 *   value={1234567.89}
 *   formatter={(value) => `$${value?.toLocaleString()}`}
 *   variant="primary"
 * />
 *
 * // Componentes predefinidos
 * <SuccessStatistic
 *   title="Conversión"
 *   value={98.5}
 *   suffix="%"
 *   trend="increase"
 *   trendValue={2.1}
 * />
 *
 * <Currency
 *   title="Ventas Totales"
 *   value={1234567.89}
 *   currency="USD"
 *   precision={2}
 * />
 *
 * <Percentage
 *   title="Tasa de Éxito"
 *   value={85}
 *   showPercentSign={true}
 *   variant="success"
 * />
 *
 * // Casos específicos
 * <Countdown
 *   title="Tiempo Restante"
 *   targetDate="2024-12-31T23:59:59"
 *   format="DD:HH:mm:ss"
 *   onFinish={() => alert("¡Tiempo agotado!")}
 * />
 *
 * <Counter
 *   title="Visitantes"
 *   value={5000}
 *   start={0}
 *   duration={3000}
 * />
 *
 * <Metric
 *   title="Revenue"
 *   value={12345}
 *   change={15.2}
 *   changeType="percentage"
 * />
 *
 * // Layouts especiales
 * <CardLayout
 *   title="KPI"
 *   value={9876}
 *   variant="success"
 * />
 *
 * <CompactLayout
 *   title="Compact"
 *   value={42}
 * />
 */

// Export por defecto
export default Statistic;
