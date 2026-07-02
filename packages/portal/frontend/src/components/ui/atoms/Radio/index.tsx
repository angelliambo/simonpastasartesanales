import React, { useState } from "react";
import { RadioProps } from "./Radio.types";
import {
  RadioWrapper,
  HiddenInput,
  RadioButton,
  RadioLabel,
} from "./Radio.styles";
import { usePersonalization } from "../../../../contexts/PersonalizationContext";
import { mapSizeToAvailable, STANDARD_SIZES, AllSize } from "../shared";

/**
 * Radio Component - Botón de opción única
 *
 * Compatible con Ant Design Radio API
 */
export const Radio: React.FC<RadioProps> = ({
  value,
  checked: checkedProp,
  defaultChecked = false,
  disabled = false,
  size = "md",
  className,
  style,
  children,
  onChange,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
  autoFocus,
  name,
  id,
}) => {
  const { accessibility } = usePersonalization();

  // Mapear tamaño usando shared systems
  const mappedSize = mapSizeToAvailable(size, STANDARD_SIZES);

  // Estado interno para uncontrolled
  const [internalChecked, setInternalChecked] = useState(defaultChecked);

  // Valor efectivo de checked
  const isChecked = checkedProp !== undefined ? checkedProp : internalChecked;

  // Manejar cambio
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    if (checkedProp === undefined) {
      setInternalChecked(e.target.checked);
    }

    onChange?.(e);
  };

  const finalId = id ? `radio-${id}` : undefined;

  return (
    <RadioWrapper
      id={finalId}
      $size={mappedSize}
      $disabled={disabled}
      $checked={isChecked}
      accessibility={accessibility}
      className={className}
      style={style}
    >
      <HiddenInput
        type="radio"
        value={value != null ? String(value) : ""}
        checked={isChecked}
        disabled={disabled}
        onChange={handleChange}
        autoFocus={autoFocus}
        name={name}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
      />
      <RadioButton
        $size={mappedSize}
        $disabled={disabled}
        $checked={isChecked}
        accessibility={accessibility}
      />
      {children && (
        <RadioLabel accessibility={accessibility}>{children}</RadioLabel>
      )}
    </RadioWrapper>
  );
};

// Radio.Group component
export interface RadioGroupProps {
  children: React.ReactNode;
  value?: any;
  defaultValue?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  name?: string;
  size?: AllSize;
  className?: string;
  style?: React.CSSProperties;
  "aria-label"?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  children,
  value,
  defaultValue,
  onChange,
  disabled,
  name,
  size = "md",
  className,
  style,
  "aria-label": ariaLabel,
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue ?? null);
  // Asegurar que effectiveValue nunca sea undefined
  const effectiveValue =
    value !== undefined && value !== null
      ? value
      : internalValue !== undefined && internalValue !== null
      ? internalValue
      : null;
  const groupName =
    name ||
    (() => {
      try {
        return `radio-group-${Math.random().toString(36).substring(2, 11)}`;
      } catch (e) {
        return `radio-group-${Date.now()}`;
      }
    })();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (value === undefined) {
      setInternalValue(e.target.value);
    }
    onChange?.(e);
  };

  // Clonar children y pasar props
  const childrenWithProps = React.Children.map(children, (child) => {
    // Validación temprana: si no es un elemento válido o no es Radio, retornar sin modificar
    if (!React.isValidElement(child)) {
      return child;
    }

    // Verificar que sea un Radio comparando por referencia (más seguro que child.type === Radio)
    const childType = (child as any).type;
    if (childType !== Radio && typeof childType !== "function") {
      return child;
    }

    try {
      // Validación estricta de props
      const childProps = (child as React.ReactElement).props;
      if (!childProps || typeof childProps !== "object") {
        return child;
      }

      // Obtener value de forma segura
      const childValue = "value" in childProps ? childProps.value : undefined;

      // Comparar valores de forma completamente segura
      let isChecked = false;
      if (
        effectiveValue !== undefined &&
        effectiveValue !== null &&
        childValue !== undefined &&
        childValue !== null
      ) {
        try {
          // Usar comparación directa primero, luego string si es necesario
          if (effectiveValue === childValue) {
            isChecked = true;
          } else {
            // Solo convertir a string si los valores son diferentes
            const effectiveStr = String(effectiveValue);
            const childStr = String(childValue);
            isChecked = effectiveStr === childStr;
          }
        } catch (e) {
          // Si algo falla, usar comparación directa
          isChecked = effectiveValue === childValue;
        }
      }

      // Preparar props para cloneElement asegurándonos de que todos los valores sean válidos
      const newProps: Partial<RadioProps> = {
        name: groupName || "",
        checked: isChecked,
        disabled: Boolean(disabled || (childProps as any)?.disabled),
        onChange: handleChange,
      };

      // Solo agregar size si está definido
      if (size) {
        newProps.size = size;
      }

      // Solo agregar value si existe
      if (childValue !== undefined && childValue !== null) {
        newProps.value = childValue;
      }

      return React.cloneElement(
        child as React.ReactElement<RadioProps>,
        newProps
      );
    } catch (error) {
      // Si algo falla, retornar el child sin modificar
      console.warn("Error processing Radio child:", error);
      return child;
    }
  });

  return (
    <div
      className={className}
      style={style}
      role="radiogroup"
      aria-label={ariaLabel}
    >
      {childrenWithProps}
    </div>
  );
};

export default Radio;
