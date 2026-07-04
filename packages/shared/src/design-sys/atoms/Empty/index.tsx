import React from "react";
import {
  EmptyProps,
  EMPTY_DEFAULTS,
  SIZE_MAPPING_EMPTY,
  EMPTY_IMAGE_SIMPLE,
  EMPTY_IMAGE_DEFAULT,
} from "./Empty.types";
import { EmptyContainer, EmptyImage, EmptyDescription } from "./Empty.styles";
import { usePersonalization } from '../../contexts/PersonalizationContext';

// SVG para imagen simple
const SimpleEmptySVG: React.FC = () => (
  <svg
    viewBox="0 0 184 152"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: "100%", height: "100%" }}
  >
    <g fill="none" fillRule="evenodd">
      <g transform="translate(24 31.67)">
        <ellipse
          fillOpacity="0.8"
          fill="#F5F5F7"
          cx="67.797"
          cy="106.89"
          rx="67.797"
          ry="12.668"
        />
        <path
          d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.588c0 4.917 5.047 8.902 11.192 8.902h85.864c6.145 0 11.191-3.984 11.191-8.902V69.674z"
          fill="#AEB8C2"
        />
        <path
          d="M183.179 105.851c0 3.368-3.451 6.099-7.705 6.099H8.525c-4.254 0-7.705-2.731-7.705-6.099v-2.731c0-3.367 3.451-6.099 7.705-6.099h167.051c4.254 0 7.705 2.731 7.705 6.099v2.731z"
          fill="#DCE0E6"
        />
      </g>
      <path
        d="M33.83 0h125.932a5.043 5.043 0 0 1 5.043 5.043v8.75a5.043 5.043 0 0 1-5.144 5.043H33.83a5.043 5.043 0 0 1-5.043-5.043v-8.75A5.043 5.043 0 0 1 33.83 0z"
        fill="#E8EBED"
      />
      <path
        d="M33.83 24.655h125.932a5.043 5.043 0 0 1 5.043 5.043v8.749a5.043 5.043 0 0 1-5.144 5.044H33.83a5.043 5.043 0 0 1-5.043-5.043v-8.75a5.043 5.043 0 0 1 5.043-5.043z"
        fill="#E8EBED"
      />
      <path
        d="M76.817 49.31h72.931a5.043 5.043 0 0 1 5.043 5.043v8.749a5.043 5.043 0 0 1-5.144 5.044H76.817a5.043 5.043 0 0 1-5.043-5.043v-8.75a5.043 5.043 0 0 1 5.043-5.043z"
        fill="#E8EBED"
      />
    </g>
  </svg>
);

// SVG para imagen default
const DefaultEmptySVG: React.FC = () => (
  <svg
    viewBox="0 0 184 152"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: "100%", height: "100%" }}
  >
    <g fill="none" fillRule="evenodd">
      <g transform="translate(24 31.67)">
        <ellipse
          fillOpacity="0.8"
          fill="#F5F5F7"
          cx="67.797"
          cy="106.89"
          rx="67.797"
          ry="12.668"
        />
        <path
          d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.588c0 4.917 5.047 8.902 11.192 8.902h85.864c6.145 0 11.191-3.984 11.191-8.902V69.674z"
          fill="#AEB8C2"
        />
        <path
          d="M183.179 105.851c0 3.368-3.451 6.099-7.705 6.099H8.525c-4.254 0-7.705-2.731-7.705-6.099v-2.731c0-3.367 3.451-6.099 7.705-6.099h167.051c4.254 0 7.705 2.731 7.705 6.099v2.731z"
          fill="#DCE0E6"
        />
      </g>
      <path
        d="M33.83 0h125.932a5.043 5.043 0 0 1 5.043 5.043v8.75a5.043 5.043 0 0 1-5.144 5.043H33.83a5.043 5.043 0 0 1-5.043-5.043v-8.75A5.043 5.043 0 0 1 33.83 0z"
        fill="#E8EBED"
      />
      <path
        d="M33.83 24.655h125.932a5.043 5.043 0 0 1 5.043 5.043v8.749a5.043 5.043 0 0 1-5.144 5.044H33.83a5.043 5.043 0 0 1-5.043-5.043v-8.75a5.043 5.043 0 0 1 5.043-5.043z"
        fill="#E8EBED"
      />
      <path
        d="M76.817 49.31h72.931a5.043 5.043 0 0 1 5.043 5.043v8.749a5.043 5.043 0 0 1-5.144 5.044H76.817a5.043 5.043 0 0 1-5.043-5.043v-8.75a5.043 5.043 0 0 1 5.043-5.043z"
        fill="#E8EBED"
      />
    </g>
  </svg>
);

// =====================================
// HELPER FUNCTIONS
// =====================================

// Mapear AllSize a EmptySize usando shared system
const mapEmptySize = (size: EmptyProps["size"]): EmptyProps["size"] => {
  if (!size) return EMPTY_DEFAULTS.size;

  const mapped = SIZE_MAPPING_EMPTY[size];
  return mapped || EMPTY_DEFAULTS.size;
};

// =====================================
// EMPTY COMPONENT
// =====================================

/**
 * Empty Component - Componente de estado vacío unificado y accesible
 *
 * 🎯 APLICANDO SHARED SYSTEMS:
 * - ✅ size acepta AllSize con mapeo automático
 * - ✅ Accesibilidad integrada con usePersonalization
 * - ✅ Compatible 100% con Ant Design Empty
 *
 * Reemplazo directo de Ant Design Empty con sistema unificado.
 */
export const Empty: React.FC<EmptyProps> = ({
  description = EMPTY_DEFAULTS.description,
  size = EMPTY_DEFAULTS.size,
  image = EMPTY_DEFAULTS.image,
  imageStyle,
  className,
  style,
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

  // 🎯 MAPEO CON SHARED SYSTEMS (OBLIGATORIO)
  const mappedSize = mapEmptySize(size);

  const finalId = id ? `empty-${id}` : undefined;

  // Renderizar imagen
  const renderImage = () => {
    if (image === EMPTY_IMAGE_SIMPLE) {
      return <SimpleEmptySVG />;
    }
    if (image === EMPTY_IMAGE_DEFAULT || image === undefined) {
      return <DefaultEmptySVG />;
    }
    return image;
  };

  return (
    <EmptyContainer
      id={finalId}
      className={className}
      style={style}
      $size={mappedSize as any}
      accessibility={accessibility}
    >
      <EmptyImage
        $size={mappedSize as any}
        accessibility={accessibility}
        style={imageStyle}
      >
        {renderImage()}
      </EmptyImage>
      {description && (
        <EmptyDescription
          $size={mappedSize as any}
          accessibility={accessibility}
        >
          {description}
        </EmptyDescription>
      )}
    </EmptyContainer>
  );
};

// Crear componente con presets estáticos (compatible con Ant Design)
const EmptyComponent = Empty as React.FC<EmptyProps> & {
  PRESENTED_IMAGE_SIMPLE: string;
  PRESENTED_IMAGE_DEFAULT: string;
};

(EmptyComponent as any).PRESENTED_IMAGE_SIMPLE = EMPTY_IMAGE_SIMPLE;
(EmptyComponent as any).PRESENTED_IMAGE_DEFAULT = EMPTY_IMAGE_DEFAULT;

export default EmptyComponent;
