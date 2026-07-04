import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from "react";
import {
  InputProps,
  TextAreaProps,
  PasswordProps,
  SearchProps,
  INPUT_DEFAULTS,
  TEXTAREA_DEFAULTS,
  PASSWORD_DEFAULTS,
  SEARCH_DEFAULTS,
  SIZE_MAPPING_INPUT,
  VARIANT_MAPPING_INPUT,
  InputSize,
  InputVariant,
  validatePasswordStrength,
  getInputAccessibleDescription,
} from "./Input.types";
import {
  InputWrapper,
  StyledInput,
  StyledTextArea,
  InputAffix,
  InputAddon,
  ClearButton,
  CharacterCount,
  PasswordStrength,
  StrengthBar,
  SearchButton,
  ValidatingIndicator,
} from "./Input.styles";
import { usePersonalization } from '../../contexts/PersonalizationContext';

// =====================================
// HELPER FUNCTIONS
// =====================================

// 🎯 Mapear AllSize a InputSize usando shared system
const mapInputSize = (size: InputProps["size"]): InputSize => {
  if (!size) return "md";

  const mapped = SIZE_MAPPING_INPUT[size];
  return mapped || "md";
};

// 🎯 Mapear AllVariant a InputVariant usando shared system
const mapInputVariant = (variant: InputProps["variant"]): InputVariant => {
  if (!variant) return "primary";

  const mapped = VARIANT_MAPPING_INPUT[variant];
  return mapped || "primary";
};

// =====================================
// INPUT COMPONENT
// =====================================

/**
 * Input Component - Componente de entrada unificado y accesible
 *
 * 🎯 APLICANDO SHARED SYSTEMS:
 * - ✅ size acepta AllSize con mapeo automático
 * - ✅ variant acepta AllVariant con mapeo automático
 * - ✅ Estados de validación: success, warning, error, validating
 * - ✅ Prefix/Suffix + AddonBefore/AddonAfter support
 * - ✅ AllowClear + ShowCount functionality
 * - ✅ Accesibilidad integrada con usePersonalization
 * - ✅ Compatible 100% con Ant Design Input
 *
 * Reemplazo directo de Ant Design Input con sistema unificado.
 */
export const Input: React.FC<InputProps> = ({
  value: valueProp,
  defaultValue,
  size = INPUT_DEFAULTS.size,
  variant = INPUT_DEFAULTS.variant,
  type = INPUT_DEFAULTS.type,
  placeholder,
  disabled = INPUT_DEFAULTS.disabled,
  readOnly = INPUT_DEFAULTS.readOnly,
  status = INPUT_DEFAULTS.status,
  allowClear = INPUT_DEFAULTS.allowClear,
  showCount = INPUT_DEFAULTS.showCount,
  maxLength,
  minLength,
  prefix,
  suffix,
  addonBefore,
  addonAfter,
  bordered = INPUT_DEFAULTS.bordered,
  className,
  style,
  id,
  accessibility: accessibilityProp,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
  role,
  htmlTitle,
  onChange,
  onFocus,
  onBlur,
  onPressEnter,
  onClear,
  onSearch,
  ...rest
}: InputProps) => {
  // 🎯 HOOKS PARA ACCESIBILIDAD (OBLIGATORIO)
  const { accessibility: contextAccessibility } = usePersonalization();

  // Combinar props de accesibilidad
  const accessibility = {
    ...contextAccessibility,
    ...accessibilityProp,
  };

  // 🎯 MAPEO CON SHARED SYSTEMS (OBLIGATORIO)
  const mappedSize = mapInputSize(size);
  const mappedVariant = mapInputVariant(variant);

  // Estados internos
  const [internalValue, setInternalValue] = useState(defaultValue || "");
  const [focused, setFocused] = useState(false);

  // Refs
  const inputRef = useRef<HTMLInputElement>(null);

  // Valor efectivo (controlado vs no controlado)
  const value = valueProp !== undefined ? valueProp : internalValue;

  // Determinar si tiene elementos adicionales
  const hasPrefix = !!prefix;
  const hasSuffix = !!suffix || allowClear || !!(showCount && maxLength);
  const hasAddonBefore = !!addonBefore;
  const hasAddonAfter = !!addonAfter;

  // Generar descripción accesible
  const accessibleDescription = useMemo(() => {
    return getInputAccessibleDescription({
      placeholder,
      maxLength,
      showCount,
      status,
    });
  }, [placeholder, maxLength, showCount, status]);

  // Manejar cambio de valor
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;

      if (valueProp === undefined) {
        setInternalValue(newValue);
      }

      onChange?.(e);
    },
    [valueProp, onChange]
  );

  // Manejar focus
  const handleFocus = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(true);
      onFocus?.(e);
    },
    [onFocus]
  );

  // Manejar blur
  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(false);
      onBlur?.(e);
    },
    [onBlur]
  );

  // Manejar Enter key
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        onPressEnter?.(e);

        if (type === "search" && onSearch) {
          onSearch(value, e as any);
        }
      }
    },
    [onPressEnter, type, onSearch, value]
  );

  // Manejar clear
  const handleClear = useCallback(() => {
    if (valueProp === undefined) {
      setInternalValue("");
    }

    onClear?.();

    // Focus back to input
    inputRef.current?.focus();
  }, [valueProp, onClear]);

  // Renderizar prefix
  const renderPrefix = () => {
    if (!prefix) return null;

    return (
      <InputAffix
        $size={mappedSize}
        $disabled={disabled}
        $type="prefix"
        accessibility={accessibility}
      >
        {prefix}
      </InputAffix>
    );
  };

  // Renderizar suffix
  const renderSuffix = () => {
    const elements: React.ReactNode[] = [];

    // Clear button
    if (allowClear && value && !disabled && !readOnly) {
      elements.push(
        <ClearButton
          key="clear"
          $size={mappedSize}
          $disabled={disabled}
          accessibility={accessibility}
          onClick={handleClear}
          aria-label="Limpiar"
          tabIndex={-1}
        />
      );
    }

    // Character count
    if (showCount && maxLength) {
      const count = value?.length || 0;
      const isOverLimit = count > maxLength;
      const countStatus = isOverLimit ? "error" : status;

      elements.push(
        <CharacterCount
          key="count"
          $size={mappedSize}
          $status={countStatus}
          accessibility={accessibility}
        >
          {count}/{maxLength}
        </CharacterCount>
      );
    }

    // Validating indicator
    if (status === "validating") {
      elements.push(
        <InputAffix
          key="validating"
          $size={mappedSize}
          $disabled={disabled}
          $type="suffix"
          accessibility={accessibility}
        >
          <ValidatingIndicator accessibility={accessibility}>
            <span />
            <span />
            <span />
          </ValidatingIndicator>
        </InputAffix>
      );
    }

    // Custom suffix
    if (suffix) {
      elements.push(
        <InputAffix
          key="suffix"
          $size={mappedSize}
          $disabled={disabled}
          $type="suffix"
          accessibility={accessibility}
        >
          {suffix}
        </InputAffix>
      );
    }

    return elements.length > 0 ? elements : null;
  };

  // Renderizar addon before
  const renderAddonBefore = () => {
    if (!addonBefore) return null;

    return (
      <InputAddon
        $size={mappedSize}
        $disabled={disabled}
        $type="before"
        accessibility={accessibility}
      >
        {addonBefore}
      </InputAddon>
    );
  };

  // Renderizar addon after
  const renderAddonAfter = () => {
    if (!addonAfter) return null;

    return (
      <InputAddon
        $size={mappedSize}
        $disabled={disabled}
        $type="after"
        accessibility={accessibility}
      >
        {addonAfter}
      </InputAddon>
    );
  };

  const finalId = id ? `input-${id}` : undefined;

  return (
    <div style={{ display: "inline-flex", width: "100%" }}>
      {/* Addon Before */}
      {renderAddonBefore()}

      {/* Input Wrapper */}
      <InputWrapper
        id={finalId}
        className={className}
        style={style}
        $size={mappedSize}
        $variant={mappedVariant}
        $status={status}
        $disabled={disabled}
        $focused={focused}
        $bordered={bordered}
        $hasPrefix={hasPrefix}
        $hasSuffix={hasSuffix}
        $hasAddonBefore={hasAddonBefore}
        $hasAddonAfter={hasAddonAfter}
        accessibility={accessibility}
      >
        {/* Prefix */}
        {renderPrefix()}

        {/* Input Element */}
        <StyledInput
          ref={inputRef}
          type={type}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          maxLength={maxLength}
          minLength={minLength}
          role={role}
          aria-label={ariaLabel || accessibleDescription}
          aria-describedby={ariaDescribedBy}
          title={htmlTitle}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          data-speak={
            accessibility.textToSpeech ? accessibleDescription : undefined
          }
          // 🎯 STYLED PROPS USANDO SHARED SYSTEMS
          $size={mappedSize}
          $variant={mappedVariant}
          $status={status}
          $disabled={disabled}
          $readOnly={readOnly}
          accessibility={accessibility}
          {...rest}
        />

        {/* Suffix */}
        {renderSuffix()}
      </InputWrapper>

      {/* Addon After */}
      {renderAddonAfter()}
    </div>
  );
};

// =====================================
// TEXTAREA COMPONENT
// =====================================

export const TextArea: React.FC<TextAreaProps> = ({
  value: valueProp,
  defaultValue,
  size = TEXTAREA_DEFAULTS.size,
  variant = TEXTAREA_DEFAULTS.variant,
  rows = TEXTAREA_DEFAULTS.rows,
  cols,
  autoSize = TEXTAREA_DEFAULTS.autoSize,
  placeholder,
  disabled = TEXTAREA_DEFAULTS.disabled,
  readOnly = TEXTAREA_DEFAULTS.readOnly,
  status = TEXTAREA_DEFAULTS.status,
  allowClear = TEXTAREA_DEFAULTS.allowClear,
  showCount = TEXTAREA_DEFAULTS.showCount,
  maxLength,
  minLength,
  bordered = TEXTAREA_DEFAULTS.bordered,
  className,
  style,
  accessibility: accessibilityProp,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
  role,
  htmlTitle,
  onChange,
  onFocus,
  onBlur,
  onPressEnter,
  onClear,
  onResize,
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
  const mappedSize = mapInputSize(size);
  const mappedVariant = mapInputVariant(variant);

  // Estados internos
  const [internalValue, setInternalValue] = useState(defaultValue || "");
  const [focused, setFocused] = useState(false);

  // Refs
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Valor efectivo
  const value = valueProp !== undefined ? valueProp : internalValue;

  // Auto-resize effect
  useEffect(() => {
    if (autoSize && textareaRef.current) {
      const textarea = textareaRef.current;

      // Reset height to get actual scrollHeight
      textarea.style.height = "auto";
      const scrollHeight = textarea.scrollHeight;

      let newHeight = scrollHeight;

      if (typeof autoSize === "object") {
        const { minRows = 2, maxRows = 6 } = autoSize;
        const lineHeight = parseInt(getComputedStyle(textarea).lineHeight);
        const minHeight = minRows * lineHeight;
        const maxHeight = maxRows * lineHeight;

        newHeight = Math.max(minHeight, Math.min(maxHeight, scrollHeight));
      }

      textarea.style.height = `${newHeight}px`;

      onResize?.({ width: textarea.offsetWidth, height: newHeight });
    }
  }, [value, autoSize, onResize]);

  // Generar descripción accesible
  const accessibleDescription = useMemo(() => {
    return getInputAccessibleDescription({
      placeholder,
      maxLength,
      showCount,
      status,
    });
  }, [placeholder, maxLength, showCount, status]);

  // Manejar cambio de valor
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;

      if (valueProp === undefined) {
        setInternalValue(newValue);
      }

      onChange?.(e);
    },
    [valueProp, onChange]
  );

  // Manejar focus
  const handleFocus = useCallback(
    (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setFocused(true);
      onFocus?.(e);
    },
    [onFocus]
  );

  // Manejar blur
  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setFocused(false);
      onBlur?.(e);
    },
    [onBlur]
  );

  // Manejar Enter key
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
        onPressEnter?.(e);
      }
    },
    [onPressEnter]
  );

  // Manejar clear
  const handleClear = useCallback(() => {
    if (valueProp === undefined) {
      setInternalValue("");
    }

    onClear?.();

    // Focus back to textarea
    textareaRef.current?.focus();
  }, [valueProp, onClear]);

  // Determinar si tiene clear button o count
  const hasSuffix = allowClear || !!(showCount && maxLength);

  return (
    <InputWrapper
      className={className}
      style={style}
      $size={mappedSize}
      $variant={mappedVariant}
      $status={status}
      $disabled={disabled}
      $focused={focused}
      $bordered={bordered}
      $hasPrefix={false}
      $hasSuffix={hasSuffix}
      $hasAddonBefore={false}
      $hasAddonAfter={false}
      accessibility={accessibility}
    >
      {/* TextArea Element */}
      <StyledTextArea
        ref={textareaRef}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        rows={autoSize ? undefined : rows}
        cols={cols}
        maxLength={maxLength}
        minLength={minLength}
        role={role}
        aria-label={ariaLabel || accessibleDescription}
        aria-describedby={ariaDescribedBy}
        title={htmlTitle}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        data-speak={
          accessibility.textToSpeech ? accessibleDescription : undefined
        }
        // 🎯 STYLED PROPS USANDO SHARED SYSTEMS
        $size={mappedSize}
        $variant={mappedVariant}
        $status={status}
        $disabled={disabled}
        $readOnly={readOnly}
        accessibility={accessibility}
        {...rest}
      />

      {/* Clear Button */}
      {allowClear && value && !disabled && !readOnly && (
        <ClearButton
          $size={mappedSize}
          $disabled={disabled}
          accessibility={accessibility}
          onClick={handleClear}
          aria-label="Limpiar"
          tabIndex={-1}
          style={{ bottom: "8px" }}
        />
      )}

      {/* Character Count */}
      {showCount && maxLength && (
        <CharacterCount
          $size={mappedSize}
          $status={value?.length > maxLength ? "error" : status}
          accessibility={accessibility}
        >
          {value?.length || 0}/{maxLength}
        </CharacterCount>
      )}
    </InputWrapper>
  );
};

// =====================================
// PASSWORD COMPONENT
// =====================================

export const Password: React.FC<PasswordProps> = ({
  visibilityToggle = PASSWORD_DEFAULTS.visibilityToggle,
  iconRender,
  showStrength = PASSWORD_DEFAULTS.showStrength,
  strengthRules,
  ...props
}) => {
  const [visible, setVisible] = useState(false);
  const [strength, setStrength] =
    useState<ReturnType<typeof validatePasswordStrength>>();

  // Toggle visibility
  const toggleVisibility = useCallback(() => {
    setVisible((prev) => !prev);
  }, []);

  // Calculate password strength
  useEffect(() => {
    if (showStrength && props.value) {
      const result = validatePasswordStrength(props.value, strengthRules);
      setStrength(result);
    }
  }, [props.value, showStrength, strengthRules]);

  // Render visibility toggle
  const renderVisibilityToggle = () => {
    if (!visibilityToggle) return null;

    if (iconRender) {
      return iconRender(visible);
    }

    return (
      <button
        type="button"
        onClick={toggleVisibility}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "4px",
        }}
        aria-label={visible ? "Ocultar contraseña" : "Mostrar contraseña"}
      >
        {visible ? "🙈" : "👁️"}
      </button>
    );
  };

  return (
    <div>
      <Input
        {...props}
        type={visible ? "text" : "password"}
        suffix={renderVisibilityToggle()}
      />

      {/* Password Strength */}
      {showStrength && strength && (
        <div style={{ marginTop: "8px" }}>
          <PasswordStrength $strength={strength.level}>
            {[1, 2, 3, 4].map((level) => (
              <StrengthBar
                key={level}
                $active={level <= Math.ceil(strength.score / 25)}
                $level={strength.level}
              />
            ))}
          </PasswordStrength>

          <div style={{ fontSize: "12px", marginTop: "4px", color: "#666" }}>
            Fortaleza:{" "}
            {strength.level === "weak"
              ? "Débil"
              : strength.level === "fair"
              ? "Regular"
              : strength.level === "good"
              ? "Buena"
              : "Fuerte"}
          </div>
        </div>
      )}
    </div>
  );
};

// =====================================
// SEARCH COMPONENT
// =====================================

export const Search: React.FC<SearchProps> = ({
  enterButton = SEARCH_DEFAULTS.enterButton,
  loading = SEARCH_DEFAULTS.loading,
  onSearch,
  ...props
}) => {
  // Manejar búsqueda
  const handleSearch = useCallback(
    (
      value: string,
      e?: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLElement>
    ) => {
      onSearch?.(value, e);
    },
    [onSearch]
  );

  // Render search button
  const renderSearchButton = () => {
    if (!enterButton) return null;

    if (typeof enterButton === "boolean") {
      return (
        <SearchButton
          $size={mapInputSize(props.size)}
          $loading={loading}
          onClick={(e) => handleSearch(props.value || "", e)}
          disabled={loading}
          aria-label="Buscar"
        />
      );
    }

    return enterButton;
  };

  return (
    <Input
      {...props}
      type="search"
      addonAfter={renderSearchButton()}
      onSearch={handleSearch}
    />
  );
};

// =====================================
// COMPONENTES PREDEFINIDOS - VARIANTS
// =====================================

// Input primario
export const PrimaryInput: React.FC<Omit<InputProps, "variant">> = (props) => (
  <Input variant="primary" {...props} />
);

// Input de éxito
export const SuccessInput: React.FC<Omit<InputProps, "variant">> = (props) => (
  <Input variant="success" {...props} />
);

// Input de advertencia
export const WarningInput: React.FC<Omit<InputProps, "variant">> = (props) => (
  <Input variant="warning" {...props} />
);

// Input de error
export const ErrorInput: React.FC<Omit<InputProps, "variant">> = (props) => (
  <Input variant="error" {...props} />
);

// Input secundario
export const SecondaryInput: React.FC<Omit<InputProps, "variant">> = (
  props
) => <Input variant="secondary" {...props} />;

// =====================================
// COMPONENTES PREDEFINIDOS - TAMAÑOS
// =====================================

// Input pequeño
export const SmallInput: React.FC<Omit<InputProps, "size">> = (props) => (
  <Input size="sm" {...props} />
);

// Input grande
export const LargeInput: React.FC<Omit<InputProps, "size">> = (props) => (
  <Input size="lg" {...props} />
);

// =====================================
// COMPONENTES PREDEFINIDOS - CASOS DE USO
// =====================================

// Input de email
export const EmailInput: React.FC<Omit<InputProps, "type">> = (props) => (
  <Input type="email" {...props} />
);

// Input de teléfono
export const PhoneInput: React.FC<Omit<InputProps, "type">> = (props) => (
  <Input type="tel" {...props} />
);

// Input de URL
export const URLInput: React.FC<Omit<InputProps, "type">> = (props) => (
  <Input type="url" {...props} />
);

// Input numérico
export const NumberInput: React.FC<Omit<InputProps, "type">> = (props) => (
  <Input type="number" {...props} />
);

// Input con clear automático
export const ClearableInput: React.FC<Omit<InputProps, "allowClear">> = (
  props
) => <Input allowClear {...props} />;

// Input con contador
export const CountedInput: React.FC<Omit<InputProps, "showCount">> = (
  props
) => <Input showCount {...props} />;

// =====================================
// EJEMPLOS DE USO CON SHARED SYSTEMS
// =====================================

/**
 * EJEMPLOS DE USO:
 *
 * // Básico con mapeo automático
 * <Input size="large" variant="danger" placeholder="Input básico" />
 * // "large" → "lg", "danger" → "error" automáticamente
 *
 * // Con elementos adicionales
 * <Input
 *   prefix={<SearchIcon />}
 *   suffix={<InfoIcon />}
 *   placeholder="Con iconos"
 * />
 *
 * // Con addons
 * <Input
 *   addonBefore="https://"
 *   addonAfter=".com"
 *   placeholder="dominio"
 * />
 *
 * // Estados de validación
 * <Input status="success" placeholder="Válido" />
 * <Input status="error" placeholder="Error" />
 * <Input status="validating" placeholder="Validando..." />
 *
 * // Funcionalidades especiales
 * <Input allowClear placeholder="Con botón limpiar" />
 * <Input showCount maxLength={100} placeholder="Con contador" />
 *
 * // TextArea
 * <TextArea
 *   rows={4}
 *   autoSize={{ minRows: 2, maxRows: 6 }}
 *   placeholder="Área de texto"
 * />
 *
 * // Password
 * <Password
 *   showStrength
 *   strengthRules={{
 *     minLength: 8,
 *     requireNumbers: true,
 *     requireSymbols: true
 *   }}
 *   placeholder="Contraseña"
 * />
 *
 * // Search
 * <Search
 *   enterButton
 *   onSearch={(value) => console.log("Buscar:", value)}
 *   placeholder="Buscar..."
 * />
 *
 * // Componentes predefinidos
 * <SuccessInput placeholder="Input de éxito" />
 * <ErrorInput placeholder="Input de error" />
 * <EmailInput placeholder="correo@ejemplo.com" />
 * <PhoneInput placeholder="Teléfono" />
 * <ClearableInput placeholder="Con clear" />
 * <CountedInput maxLength={50} placeholder="Con contador" />
 */

// Aliases para compatibilidad con Input.tsx viejo
export const TextInput: React.FC<Omit<InputProps, "type">> = (props) => (
  <Input type="text" {...props} />
);

export const PasswordInput: React.FC<PasswordProps> = (props) => (
  <Password {...props} />
);

export const SearchInput: React.FC<SearchProps> = (props) => (
  <Search {...props} />
);

// Export por defecto
export default Input;

// Exportar tipos también para usar en otros lugares
export type { InputProps, TextAreaProps, PasswordProps, SearchProps };
