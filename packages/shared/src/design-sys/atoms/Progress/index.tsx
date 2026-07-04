import React from "react";
import {
  ProgressProps,
  PROGRESS_DEFAULTS,
  SIZE_MAPPING_PROGRESS,
} from "./Progress.types";
import {
  ProgressContainer,
  ProgressOuter,
  ProgressInner,
  ProgressText,
  ProgressSteps,
  ProgressStep,
} from "./Progress.styles";
import { usePersonalization } from '../../contexts/PersonalizationContext';
import { useThemeColors } from '../../hooks/useThemeColors';;

// =====================================
// HELPER FUNCTIONS
// =====================================

// Mapear AllSize a ProgressSize usando shared system
const mapProgressSize = (size: ProgressProps["size"]) => {
  if (!size) return PROGRESS_DEFAULTS.size;
  
  const mapped = SIZE_MAPPING_PROGRESS[size];
  return mapped || PROGRESS_DEFAULTS.size;
};

// =====================================
// PROGRESS COMPONENT
// =====================================

/**
 * Progress Component - Componente de barra de progreso unificado y accesible
 *
 * 🎯 APLICANDO SHARED SYSTEMS:
 * - ✅ size acepta AllSize con mapeo automático
 * - ✅ Accesibilidad integrada con usePersonalization
 * - ✅ Compatible 100% con Ant Design Progress
 *
 * Reemplazo directo de Ant Design Progress con sistema unificado.
 */
export const Progress: React.FC<ProgressProps> = ({
  percent = PROGRESS_DEFAULTS.percent,
  size = PROGRESS_DEFAULTS.size,
  status = PROGRESS_DEFAULTS.status,
  showInfo = PROGRESS_DEFAULTS.showInfo,
  format,
  strokeColor,
  strokeWidth = PROGRESS_DEFAULTS.strokeWidth,
  trailColor,
  className,
  style,
  type = PROGRESS_DEFAULTS.type,
  steps,
  id,
  accessibility: accessibilityProp,
}) => {
  // 🎯 HOOKS PARA ACCESIBILIDAD (OBLIGATORIO)
  const { accessibility: contextAccessibility } = usePersonalization();

  // Combinar props de accesibilidad
  const accessibility = {
    ...contextAccessibility,
    ...accessibilityProp,
  };

  const colors = useThemeColors();

  // 🎯 MAPEO CON SHARED SYSTEMS (OBLIGATORIO)
  const mappedSize = mapProgressSize(size);

  // Normalizar percent (0-100)
  const normalizedPercent = Math.max(0, Math.min(100, percent || 0));

  // Formatear texto
  const formatText = () => {
    if (format) {
      return format(normalizedPercent);
    }
    return `${Math.round(normalizedPercent)}%`;
  };

  // Determinar color de stroke
  const getStrokeColor = (): string => {
    if (strokeColor) {
      // Si es array, convertir a gradiente o usar primer valor
      if (Array.isArray(strokeColor)) {
        return strokeColor[0] || colors.primary[500];
      }
      return strokeColor;
    }
    if (status === "success") return colors.success[500];
    if (status === "exception") return colors.error[500];
    return colors.primary[500];
  };

  const finalId = id ? `progress-${id}` : undefined;

  // Renderizado tipo steps
  if (steps && steps > 0) {
    const stepPercent = 100 / steps;
    const activeStep = Math.floor(normalizedPercent / stepPercent);
    
    return (
      <ProgressContainer
        id={finalId}
        className={className}
        style={style}
        $size={mappedSize}
        $status={status}
        $type={type}
        accessibility={accessibility}
      >
        <ProgressSteps $size={mappedSize} $steps={steps} accessibility={accessibility}>
          {Array.from({ length: steps }).map((_, index) => (
            <ProgressStep
              key={index}
              $size={mappedSize}
              $status={status}
              $type={type}
              accessibility={accessibility}
              $active={index === activeStep}
              $passed={index < activeStep}
            />
          ))}
        </ProgressSteps>
        {showInfo && (
          <ProgressText
            $size={mappedSize}
            $status={status}
            $type={type}
            accessibility={accessibility}
          >
            {formatText()}
          </ProgressText>
        )}
      </ProgressContainer>
    );
  }

  // Renderizado tipo line (default)
  return (
    <ProgressContainer
      id={finalId}
      className={className}
      style={style}
      $size={mappedSize}
      $status={status}
      $type={type}
      accessibility={accessibility}
    >
      <ProgressOuter
        $size={mappedSize}
        $status={status}
        $type={type}
        accessibility={accessibility}
        style={{
          backgroundColor: trailColor || colors.background.secondary,
          height: strokeWidth ? `${strokeWidth}px` : undefined,
        }}
      >
        <ProgressInner
          $size={mappedSize}
          $status={status}
          $type={type}
          accessibility={accessibility}
          $percent={normalizedPercent}
          $strokeColor={getStrokeColor()}
          $strokeWidth={strokeWidth}
          $trailColor={trailColor}
        />
      </ProgressOuter>
      {showInfo && (
        <ProgressText
          $size={mappedSize}
          $status={status}
          $type={type}
          accessibility={accessibility}
        >
          {formatText()}
        </ProgressText>
      )}
    </ProgressContainer>
  );
};

export default Progress;

