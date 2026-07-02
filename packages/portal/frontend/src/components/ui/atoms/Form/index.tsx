import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useMemo,
} from "react";
import {
  FormProps,
  FormItemProps,
  FormInstance,
  Rule,
  FormContextValue,
} from "./Form.types";
import {
  StyledForm,
  FormItemWrapper,
  FormItemLabel,
  FormItemContent,
  FormItemHelp,
  FormItemError,
  FormItemExtra,
} from "./Form.styles";
import { usePersonalization } from "../../../../contexts/PersonalizationContext";
import { mapSizeToAvailable, STANDARD_SIZES } from "../shared";

// =============================================================================
// FORM CONTEXT
// =============================================================================

const FormContext = createContext<FormContextValue | undefined>(undefined);

const useFormContext = () => {
  const context = useContext(FormContext);
  return context || {};
};

// =============================================================================
// VALIDATION UTILITIES
// =============================================================================

const validateRule = async (rule: Rule, value: any): Promise<string | null> => {
  // Required
  if (
    rule.required &&
    (value === undefined || value === null || value === "")
  ) {
    return rule.message || "Este campo es requerido";
  }

  if (value === undefined || value === null || value === "") {
    return null; // Skip other validations if empty (unless required)
  }

  // Type validation
  if (rule.type) {
    switch (rule.type) {
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return rule.message || "Por favor ingresa un email válido";
        }
        break;
      case "number":
      case "integer":
      case "float":
        if (isNaN(Number(value))) {
          return rule.message || "Debe ser un número";
        }
        break;
      case "url":
        try {
          new URL(value);
        } catch {
          return rule.message || "Debe ser una URL válida";
        }
        break;
    }
  }

  // Min/Max
  if (rule.min !== undefined && Number(value) < rule.min) {
    return rule.message || `El valor mínimo es ${rule.min}`;
  }
  if (rule.max !== undefined && Number(value) > rule.max) {
    return rule.message || `El valor máximo es ${rule.max}`;
  }

  // Length
  if (rule.len !== undefined && String(value).length !== rule.len) {
    return rule.message || `Debe tener exactamente ${rule.len} caracteres`;
  }

  // Pattern
  if (rule.pattern && !rule.pattern.test(String(value))) {
    return rule.message || "Formato inválido";
  }

  // Whitespace
  if (rule.whitespace && String(value).trim() !== String(value)) {
    return rule.message || "No puede contener solo espacios";
  }

  // Custom validator
  if (rule.validator) {
    try {
      await rule.validator(rule, value);
    } catch (error: any) {
      return error?.message || rule.message || "Validación fallida";
    }
  }

  return null;
};

// =============================================================================
// FORM HOOK
// =============================================================================

const useFormHook = (): [FormInstance] => {
  const [fields, setFields] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const rulesRef = useRef<Record<string, Rule[]>>({});
  const valuePropNamesRef = useRef<Record<string, string>>({});

  // Helper para obtener valor anidado
  const getNestedValue = useCallback((obj: any, path: string): any => {
    const keys = path.split(".");
    let current = obj;
    for (const key of keys) {
      if (current == null) return undefined;
      current = current[key];
    }
    return current;
  }, []);

  const getFieldsValue = useCallback(() => {
    return { ...fields };
  }, [fields]);

  const getFieldValue = useCallback(
    (name: string) => {
      return name.includes(".") ? getNestedValue(fields, name) : fields[name];
    },
    [fields, getNestedValue]
  );

  const getFieldsError = useCallback(() => {
    return Object.entries(errors)
      .filter(([, errorMessages]) => errorMessages.length > 0)
      .map(([name, errorMessages]) => ({ name, errors: errorMessages }));
  }, [errors]);

  const getFieldError = useCallback(
    (name: string) => {
      return errors[name] || [];
    },
    [errors]
  );

  // Helper para establecer valor anidado
  const setNestedValue = useCallback((obj: any, path: string, value: any): any => {
    const keys = path.split(".");
    const newObj = { ...obj };
    let current = newObj;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) {
        current[keys[i]] = {};
      } else {
        current[keys[i]] = { ...current[keys[i]] };
      }
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    return newObj;
  }, []);

  const setFieldsValue = useCallback((values: Record<string, any>) => {
    setFields((prev) => {
      let newFields = { ...prev };
      Object.entries(values).forEach(([name, value]) => {
        newFields = name.includes(".")
          ? setNestedValue(newFields, name, value)
          : { ...newFields, [name]: value };
      });
      return newFields;
    });
    // Clear errors for updated fields
    setErrors((prev) => {
      const newErrors = { ...prev };
      Object.keys(values).forEach((name) => {
        delete newErrors[name];
      });
      return newErrors;
    });
  }, [setNestedValue]);

  const setFieldValue = useCallback(
    (name: string, value: any) => {
      setFieldsValue({ [name]: value });
    },
    [setFieldsValue]
  );

  const resetFields = useCallback((fieldNames?: string[]) => {
    if (fieldNames) {
      setFields((prev) => {
        const newFields = { ...prev };
        fieldNames.forEach((name) => {
          delete newFields[name];
        });
        return newFields;
      });
      setErrors((prev) => {
        const newErrors = { ...prev };
        fieldNames.forEach((name) => {
          delete newErrors[name];
        });
        return newErrors;
      });
    } else {
      setFields({});
      setErrors({});
    }
  }, []);

  const validateFields = useCallback(
    async (fieldNames?: string[]): Promise<void> => {
      const fieldsToValidate = fieldNames || Object.keys(rulesRef.current);
      const newErrors: Record<string, string[]> = { ...errors };

      for (const name of fieldsToValidate) {
        const rules = rulesRef.current[name] || [];
        const value = fields[name];
        const fieldErrors: string[] = [];

        for (const rule of rules) {
          const error = await validateRule(rule, value);
          if (error) {
            fieldErrors.push(error);
          }
        }

        if (fieldErrors.length > 0) {
          newErrors[name] = fieldErrors;
        } else {
          delete newErrors[name];
        }
      }

      setErrors(newErrors);

      if (Object.keys(newErrors).length > 0) {
        throw new Error("Validation failed");
      }
    },
    [fields, errors]
  );

  const submit = useCallback(() => {
    validateFields();
  }, [validateFields]);

  // Internal methods for Form and FormItem
  const registerField = useCallback(
    (name: string, rules: Rule[] = [], valuePropName: string = "value") => {
      rulesRef.current[name] = rules;
      valuePropNamesRef.current[name] = valuePropName;
    },
    []
  );

  const unregisterField = useCallback((name: string) => {
    delete rulesRef.current[name];
    delete valuePropNamesRef.current[name];
    setFields((prev) => {
      const newFields = { ...prev };
      delete newFields[name];
      return newFields;
    });
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  }, []);

  const instance: FormInstance = useMemo(
    () => ({
      getFieldsValue,
      getFieldValue,
      getFieldsError,
      getFieldError,
      setFieldsValue,
      setFieldValue,
      resetFields,
      validateFields,
      submit,
      _registerField: registerField,
      _unregisterField: unregisterField,
      _getValuePropName: (name: string) =>
        valuePropNamesRef.current[name] || "value",
      _fields: fields,
      _setFields: setFields,
      _errors: errors,
    }),
    [
      getFieldsValue,
      getFieldValue,
      getFieldsError,
      getFieldError,
      setFieldsValue,
      setFieldValue,
      resetFields,
      validateFields,
      submit,
      registerField,
      unregisterField,
      fields,
      setFields,
      errors,
    ]
  );

  return [instance];
};

// =============================================================================
// FORM ITEM COMPONENT
// =============================================================================

const FormItemComponent: React.FC<FormItemProps> = ({
  name,
  label,
  rules = [],
  valuePropName = "value",
  initialValue,
  required,
  children,
  help,
  tooltip,
  extra,
  disabled,
  className,
  style,
  hidden = false,
  validateTrigger = "onChange",
}) => {
  const {
    form,
    layout = "vertical",
    size = "md",
    disabled: formDisabled,
    accessibility,
    onValuesChange,
  } = useFormContext();
  const effectiveDisabled = disabled || formDisabled;
  const effectiveRequired =
    required !== undefined ? required : rules.some((r) => r.required);

  // Register field
  React.useEffect(() => {
    if (name && form && form._registerField) {
      form._registerField(name, rules, valuePropName);
      if (initialValue !== undefined && form._setFields) {
        form._setFields((prev) => ({ ...prev, [name]: initialValue }));
      }

      return () => {
        if (name && form && form._unregisterField) {
          form._unregisterField(name);
        }
      };
    }
  }, [name, rules, valuePropName, initialValue, form]);

  // Helper para obtener valor de campo anidado (dot notation)
  const getNestedValue = (obj: any, path: string): any => {
    const keys = path.split(".");
    let current = obj;
    for (const key of keys) {
      if (current == null) return undefined;
      current = current[key];
    }
    return current;
  };

  // Helper para establecer valor de campo anidado (dot notation)
  const setNestedValue = (obj: any, path: string, value: any): any => {
    const keys = path.split(".");
    const newObj = { ...obj };
    let current = newObj;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) {
        current[keys[i]] = {};
      } else {
        current[keys[i]] = { ...current[keys[i]] };
      }
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    return newObj;
  };

  // Get field value and error (with dot notation support)
  const fieldValue =
    name && form && form._fields
      ? name.includes(".")
        ? getNestedValue(form._fields, name)
        : form._fields[name]
      : undefined;
  const fieldError =
    name && form && form._errors ? form._errors[name]?.[0] : undefined;
  const effectiveValuePropName =
    name && form && form._getValuePropName
      ? form._getValuePropName(name)
      : valuePropName;

  // Clone children with value and onChange
  const childrenWithProps = React.useMemo(() => {
    if (!children || !name || !form) return children;

    return React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        const props: any = {
          [effectiveValuePropName]: fieldValue,
          onChange: (e: any) => {
            const newValue =
              effectiveValuePropName === "checked"
                ? e.target.checked
                : effectiveValuePropName === "value"
                ? e.target.value
                : e?.target?.[effectiveValuePropName] || e;

            if (form._setFields) {
              const prevFields = form._fields || {};
              const newFields = name.includes(".")
                ? setNestedValue(prevFields, name, newValue)
                : { ...prevFields, [name]: newValue };
              form._setFields(newFields);

              // Call onValuesChange if provided
              if (onValuesChange) {
                const changedValues = name.includes(".")
                  ? { [name]: newValue }
                  : { [name]: newValue };
                onValuesChange(changedValues, newFields);
              }
            }

            // Clear error on change - validation will re-run on next trigger
            // Errors will be cleared on next validation pass

            // Call original onChange if exists
            if (React.isValidElement(child)) {
              const originalOnChange = (child.props as any)?.onChange;
              if (typeof originalOnChange === "function") {
                originalOnChange(e);
              }
            }
          },
          disabled: effectiveDisabled,
        };

        // Validate on blur if validateTrigger includes onBlur
        if (
          typeof validateTrigger === "string"
            ? validateTrigger === "onBlur"
            : validateTrigger.includes("onBlur")
        ) {
          props.onBlur = async (e: any) => {
            if (form && name) {
              try {
                await form.validateFields([name]);
              } catch {}
            }
            if (React.isValidElement(child)) {
              const originalOnBlur = (child.props as any)?.onBlur;
              if (typeof originalOnBlur === "function") {
                originalOnBlur(e);
              }
            }
          };
        }

        return React.cloneElement(child, props);
      }
      return child;
    });
  }, [
    children,
    name,
    form,
    fieldValue,
    effectiveValuePropName,
    effectiveDisabled,
    validateTrigger,
  ]);

  if (hidden) return null;

  return (
    <FormItemWrapper
      $layout={layout}
      $size={mapSizeToAvailable(size, STANDARD_SIZES)}
      $hidden={hidden}
      $required={effectiveRequired || false}
      accessibility={accessibility}
      className={className}
      style={style}
    >
      {label && (
        <FormItemLabel
          $layout={layout}
          $required={effectiveRequired || false}
          $size={mapSizeToAvailable(size, STANDARD_SIZES)}
          accessibility={accessibility}
          htmlFor={name}
        >
          {label}
        </FormItemLabel>
      )}
      <FormItemContent>
        {childrenWithProps}
        {fieldError && (
          <FormItemError accessibility={accessibility}>
            {fieldError}
          </FormItemError>
        )}
        {(help || tooltip) && !fieldError && (
          <FormItemHelp accessibility={accessibility}>
            {help || tooltip}
          </FormItemHelp>
        )}
        {extra && (
          <FormItemExtra accessibility={accessibility}>{extra}</FormItemExtra>
        )}
      </FormItemContent>
    </FormItemWrapper>
  );
};

// =============================================================================
// FORM COMPONENT
// =============================================================================

const FormComponent: React.FC<FormProps> = ({
  children,
  form,
  layout = "vertical",
  onFinish,
  onFinishFailed,
  onValuesChange,
  initialValues,
  preserve = true,
  size = "md",
  disabled = false,
  className,
  style,
  id,
  accessibility: accessibilityProp,
}) => {
  const { accessibility: contextAccessibility } = usePersonalization();
  const effectiveAccessibility = accessibilityProp || contextAccessibility;

  // Mapear tamaño usando shared systems
  const mappedSize = mapSizeToAvailable(size, STANDARD_SIZES);

  // Internal form instance if not provided
  const [internalForm] = useForm();
  const effectiveForm = form || internalForm;

  // Set initial values
  React.useEffect(() => {
    if (initialValues && effectiveForm && effectiveForm._setFields) {
      effectiveForm._setFields((prev) => ({ ...prev, ...initialValues }));
    }
  }, [initialValues, effectiveForm]);

  // Handle submit
  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
        await effectiveForm.validateFields();
        const values = effectiveForm.getFieldsValue();
        onFinish?.(values);
      } catch (error) {
        const errors = effectiveForm.getFieldsError();
        onFinishFailed?.(errors);
      }
    },
    [effectiveForm, onFinish, onFinishFailed]
  );

  const contextValue: FormContextValue = useMemo(
    () => ({
      form: effectiveForm,
      layout,
      size: mappedSize,
      disabled,
      accessibility: effectiveAccessibility,
      onValuesChange,
    }),
    [
      effectiveForm,
      layout,
      mappedSize,
      disabled,
      effectiveAccessibility,
      onValuesChange,
    ]
  );

  const finalId = id ? `form-${id}` : undefined;

  return (
    <FormContext.Provider value={contextValue}>
      <StyledForm
        id={finalId}
        $layout={layout}
        $size={mappedSize}
        $disabled={disabled}
        accessibility={effectiveAccessibility}
        onSubmit={handleSubmit}
        className={className}
        style={style}
      >
        {children}
      </StyledForm>
    </FormContext.Provider>
  );
};

// Assign Form.Item and Form.useForm to Form
interface FormWithSubcomponents extends React.FC<FormProps> {
  Item: typeof FormItem;
  useForm: typeof useForm;
}

const FormItem = FormItemComponent;
const useForm = useFormHook;
const Form = FormComponent as unknown as FormWithSubcomponents;
Form.Item = FormItem;
Form.useForm = useForm;

export default Form;
export { Form, FormItem, useForm };
