import React from 'react';
import { trackEvent } from '../../services/analytics';

export interface TrackedClickProps {
  /** Acción a reportar (ej: 'click_cta', 'click_pricing') */
  action?: string;
  /** Categoría del evento (ej: 'marketing', 'navigation') */
  category?: string;
  /** Etiqueta descriptiva del elemento (ej: 'Hero - Iniciar Sesión') */
  label: string;
  /** Valor numérico opcional */
  value?: number;
  /** Elemento hijo sobre el cual interceptar el click */
  children: React.ReactElement;
}

/**
 * Componente Wrapper para añadir tracking automático de Google Analytics (GA4)
 * a cualquier elemento interactivo (Botones, Enlaces, etc.) al hacer click.
 * 
 * Ejemplo de uso:
 * <TrackedClick label="Hero - Comenzar Gratis" action="click_cta" category="marketing">
 *   <button>Comenzar</button>
 * </TrackedClick>
 */
export const TrackedClick: React.FC<TrackedClickProps> = ({
  action = 'click_cta',
  category = 'marketing',
  label,
  value,
  children
}) => {
  // Asegurar que recibimos exactamente un elemento hijo interactivo
  const child = React.Children.only(children);

  const handleClick = (e: React.MouseEvent<any>) => {
    // Registrar el evento en el servicio centralizado de GA4
    trackEvent(action, category, label, value);

    // Ejecutar el onClick original del componente hijo si existía
    if (child.props.onClick) {
      child.props.onClick(e);
    }
  };

  // Retornar el clon del hijo con el onClick interceptado
  return React.cloneElement(child, {
    onClick: handleClick
  });
};

export default TrackedClick;
