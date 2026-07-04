import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from "react";
import {
  SelectProps,
  RemoteSelectProps,
  SelectOption,
  SELECT_DEFAULTS,
  SIZE_MAPPING_SELECT,
  VARIANT_MAPPING_SELECT,
  SelectSize,
  SelectVariant,
  defaultFilterOption,
  defaultFilterSort,
  getSelectAccessibleDescription,
  debounce,
  CustomTagProps,
} from "./Select.types";
import {
  SelectWrapper,
  StyledSelector,
  SelectionDisplay,
  SelectTag,
  TagContent,
  TagClose,
  SelectArrow,
  ClearButton,
  Dropdown,
  Option,
  OptionGroup,
  OptionGroupLabel,
  SearchInput,
  EmptyState,
  VirtualListContainer,
  VirtualListItem,
  LoadingState,
} from "./Select.styles";
import { usePersonalization } from '../../contexts/PersonalizationContext';

// =====================================
// HELPER FUNCTIONS
// =====================================

// 🎯 Mapear AllSize a SelectSize usando shared system
const mapSelectSize = (size: SelectProps["size"]): SelectSize => {
  if (!size) return "md";

  const mapped = SIZE_MAPPING_SELECT[size];
  return mapped || "md";
};

// 🎯 Mapear AllVariant a SelectVariant usando shared system
const mapSelectVariant = (variant: SelectProps["variant"]): SelectVariant => {
  if (!variant) return "primary";

  const mapped = VARIANT_MAPPING_SELECT[variant];
  return mapped || "primary";
};

// =====================================
// SELECT COMPONENT
// =====================================

/**
 * Select Component - Componente de selección unificado y accesible
 *
 * 🎯 APLICANDO SHARED SYSTEMS:
 * - ✅ size acepta AllSize con mapeo automático
 * - ✅ variant acepta AllVariant con mapeo automático
 * - ✅ Múltiples modos: default, multiple, tags
 * - ✅ Búsqueda integrada con filtrado + destacado
 * - ✅ Dropdown positioning inteligente + scroll virtual
 * - ✅ Accesibilidad integrada con usePersonalization
 * - ✅ Compatible 100% con Ant Design Select
 *
 * Reemplazo directo de Ant Design Select con sistema unificado.
 */
export const Select: React.FC<SelectProps> = ({
  value: valueProp,
  defaultValue,
  options = [],
  optionGroups,
  size = SELECT_DEFAULTS.size,
  variant = SELECT_DEFAULTS.variant,
  mode = SELECT_DEFAULTS.mode,
  placeholder,
  disabled = SELECT_DEFAULTS.disabled,
  loading = SELECT_DEFAULTS.loading,
  status = SELECT_DEFAULTS.status,
  allowClear = SELECT_DEFAULTS.allowClear,
  showSearch = SELECT_DEFAULTS.showSearch,
  showArrow = SELECT_DEFAULTS.showArrow,
  open: openProp,
  defaultOpen = false,
  maxTagCount = SELECT_DEFAULTS.maxTagCount,
  maxTagPlaceholder,
  tagRender,
  searchValue: searchValueProp,
  defaultSearchValue,
  filterOption = defaultFilterOption,
  filterSort = defaultFilterSort,
  dropdownStyle,
  dropdownClassName,
  dropdownMatchSelectWidth = SELECT_DEFAULTS.dropdownMatchSelectWidth,
  dropdownRender,
  placement = SELECT_DEFAULTS.placement,
  optionRender,
  labelRender,
  notFoundContent = "No hay opciones",
  virtual = SELECT_DEFAULTS.virtual,
  listHeight = SELECT_DEFAULTS.listHeight,
  listItemHeight = SELECT_DEFAULTS.listItemHeight,
  className,
  style,
  accessibility: accessibilityProp,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
  role,
  htmlTitle,
  id,
  onChange,
  onSelect,
  onDeselect,
  onSearch,
  onFocus,
  onBlur,
  onDropdownVisibleChange,
  onClear,
  onPopupScroll,
  onMouseEnter,
  onMouseLeave,
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
  const mappedSize = mapSelectSize(size);
  const mappedVariant = mapSelectVariant(variant);

  // Estados internos
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [internalSearchValue, setInternalSearchValue] = useState(
    defaultSearchValue || ""
  );
  const [focused, setFocused] = useState(false);
  const [focusedOptionIndex, setFocusedOptionIndex] = useState(-1);

  // Refs
  const selectRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Valores efectivos (controlado vs no controlado)
  const value = valueProp !== undefined ? valueProp : internalValue;
  const open = openProp !== undefined ? openProp : internalOpen;
  const searchValue =
    searchValueProp !== undefined ? searchValueProp : internalSearchValue;

  // Determinar si es multi-select
  const isMultiple = mode === "multiple" || mode === "tags";

  // Procesar opciones (incluir grupos si existen)
  const flatOptions = useMemo(() => {
    try {
      const allOptions = optionGroups
        ? optionGroups.flatMap((group) => group.options || [])
        : options || [];

      // Filtrar opciones inválidas y asegurar que tengan al menos un value o label
      const filtered = allOptions.filter((opt) => {
        // Permitir opciones que tengan al menos value o label definido
        const isValid = opt != null && (opt.value != null || opt.label != null);
        if (!isValid && opt != null) {
          console.warn("[Select] Opción inválida filtrada:", opt);
        }
        return isValid;
      });

      if (allOptions.length !== filtered.length) {
        console.warn(
          `[Select] Filtradas ${
            allOptions.length - filtered.length
          } opciones inválidas de ${allOptions.length} totales`
        );
      }

      return filtered;
    } catch (error) {
      console.error("[Select] Error al procesar opciones:", error, {
        options,
        optionGroups,
      });
      return [];
    }
  }, [options, optionGroups]);

  // Filtrar opciones basado en búsqueda
  const filteredOptions = useMemo(() => {
    if (!showSearch || !searchValue) {
      return flatOptions;
    }

    const filtered = flatOptions.filter((option) => {
      if (typeof filterOption === "function") {
        return filterOption(searchValue, option);
      }
      return filterOption !== false;
    });

    if (filterSort) {
      return filtered.sort(filterSort);
    }

    return filtered;
  }, [flatOptions, showSearch, searchValue, filterOption, filterSort]);

  // Generar descripción accesible
  const accessibleDescription = useMemo(() => {
    try {
      const selectedCount = isMultiple
        ? Array.isArray(value)
          ? value.length
          : 0
        : value
        ? 1
        : 0;

      const description = getSelectAccessibleDescription({
        placeholder: placeholder != null ? String(placeholder) : undefined,
        mode,
        selectedCount,
        totalCount: flatOptions.length,
        loading,
        disabled,
        status,
      });

      return description;
    } catch (error) {
      console.error("[Select] Error al generar descripción accesible:", error);
      return placeholder || "Selector";
    }
  }, [
    placeholder,
    mode,
    value,
    flatOptions.length,
    loading,
    disabled,
    status,
    isMultiple,
  ]);

  // Manejar apertura/cierre del dropdown
  const handleDropdownToggle = useCallback(
    (newOpen: boolean) => {
      if (disabled) return;

      if (openProp === undefined) {
        setInternalOpen(newOpen);
      }

      onDropdownVisibleChange?.(newOpen);

      // Focus en search input cuando se abre
      if (newOpen && showSearch) {
        setTimeout(() => {
          searchInputRef.current?.focus();
        }, 0);
      }
    },
    [disabled, openProp, onDropdownVisibleChange, showSearch]
  );

  // Manejar selección de opción
  const handleOptionSelect = useCallback(
    (selectedOption: SelectOption) => {
      if (!selectedOption || selectedOption.disabled) return;
      if (selectedOption.value == null) return;

      let newValue: any;

      if (isMultiple) {
        const currentValues = Array.isArray(value)
          ? value
          : value
          ? [value]
          : [];
        const optionValue = selectedOption.value;
        if (optionValue == null) return;

        const isSelected = currentValues.includes(optionValue);

        if (isSelected) {
          // Deseleccionar
          newValue = currentValues.filter((v) => v !== optionValue);
          onDeselect?.(optionValue, selectedOption);
        } else {
          // Seleccionar
          newValue = [...currentValues, optionValue];
          onSelect?.(optionValue, selectedOption);
        }
      } else {
        // Single select
        const optionValue = selectedOption.value;
        if (optionValue == null) return;

        newValue = optionValue;
        onSelect?.(optionValue, selectedOption);

        // Cerrar dropdown en single select
        handleDropdownToggle(false);
      }

      // Actualizar valor
      if (valueProp === undefined) {
        setInternalValue(newValue);
      }

      // Ejecutar onChange
      const selectedOptions = isMultiple
        ? flatOptions.filter(
            (opt) =>
              opt != null &&
              opt.value != null &&
              (Array.isArray(newValue) ? newValue : [newValue]).includes(
                opt.value
              )
          )
        : selectedOption;

      onChange?.(newValue, selectedOptions);

      // Limpiar búsqueda en tags mode
      if (mode === "tags") {
        setInternalSearchValue("");
      }
    },
    [
      isMultiple,
      value,
      valueProp,
      onSelect,
      onDeselect,
      onChange,
      flatOptions,
      mode,
      handleDropdownToggle,
    ]
  );

  // Manejar búsqueda
  const handleSearch = useCallback(
    (searchText: string) => {
      if (searchValueProp === undefined) {
        setInternalSearchValue(searchText);
      }

      onSearch?.(searchText);
    },
    [searchValueProp, onSearch]
  );

  // Manejar clear
  const handleClear = useCallback(() => {
    const clearedValue = isMultiple ? [] : undefined;

    if (valueProp === undefined) {
      setInternalValue(clearedValue);
    }

    onClear?.();
    onChange?.(clearedValue, isMultiple ? [] : (null as any));

    // Focus back to select
    selectRef.current?.focus();
  }, [isMultiple, valueProp, onClear, onChange]);

  // Manejar teclas
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return;

      switch (e.key) {
        case "Enter":
        case " ":
          if (!open) {
            e.preventDefault();
            handleDropdownToggle(true);
          } else if (
            focusedOptionIndex >= 0 &&
            filteredOptions[focusedOptionIndex]
          ) {
            e.preventDefault();
            handleOptionSelect(filteredOptions[focusedOptionIndex]);
          }
          break;

        case "Escape":
          if (open) {
            e.preventDefault();
            handleDropdownToggle(false);
          }
          break;

        case "ArrowDown":
          e.preventDefault();
          if (!open) {
            handleDropdownToggle(true);
          } else {
            setFocusedOptionIndex((prev) =>
              prev < filteredOptions.length - 1 ? prev + 1 : 0
            );
          }
          break;

        case "ArrowUp":
          e.preventDefault();
          if (open) {
            setFocusedOptionIndex((prev) =>
              prev > 0 ? prev - 1 : filteredOptions.length - 1
            );
          }
          break;

        case "Backspace":
          if (
            isMultiple &&
            !searchValue &&
            Array.isArray(value) &&
            value.length > 0
          ) {
            // Eliminar último tag con backspace
            const lastValue = value[value.length - 1];
            const newValue = value.slice(0, -1);
            const removedOption = flatOptions.find(
              (opt) =>
                opt != null && opt.value != null && opt.value === lastValue
            );

            if (valueProp === undefined) {
              setInternalValue(newValue);
            }

            if (removedOption) {
              onDeselect?.(removedOption.value, removedOption);
            }

            onChange?.(
              newValue,
              flatOptions.filter((opt) => newValue.includes(opt.value))
            );
          }
          break;
      }
    },
    [
      disabled,
      open,
      focusedOptionIndex,
      filteredOptions,
      isMultiple,
      searchValue,
      value,
      valueProp,
      flatOptions,
      handleDropdownToggle,
      handleOptionSelect,
      onDeselect,
      onChange,
    ]
  );

  // Manejar focus
  const handleFocus = useCallback(
    (e: React.FocusEvent<HTMLElement>) => {
      setFocused(true);
      onFocus?.(e);
    },
    [onFocus]
  );

  // Manejar blur
  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLElement>) => {
      // Verificar si el focus se movió dentro del dropdown
      const relatedTarget = e.relatedTarget as HTMLElement;
      const isBlurringToDropdown = dropdownRef.current?.contains(relatedTarget);

      if (!isBlurringToDropdown) {
        setFocused(false);
        handleDropdownToggle(false);
        onBlur?.(e);
      }
    },
    [onBlur, handleDropdownToggle]
  );

  // Efecto para manejar clics fuera del componente
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const isInsideSelect = selectRef.current?.contains(target);
      const isInsideDropdown = dropdownRef.current?.contains(target);

      if (!isInsideSelect && !isInsideDropdown) {
        handleDropdownToggle(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, handleDropdownToggle]);

  // Renderizar tag personalizado
  const renderTag = useCallback(
    (option: SelectOption, index: number) => {
      const tagProps: CustomTagProps = {
        label: option.label,
        value: option.value,
        disabled: disabled || option.disabled || false,
        closable: !disabled && !option.disabled,
        onClose: () => {
          const newValue = Array.isArray(value)
            ? value.filter((v) => v !== option.value)
            : [];

          if (valueProp === undefined) {
            setInternalValue(newValue);
          }

          onDeselect?.(option.value, option);
          onChange?.(
            newValue,
            flatOptions.filter((opt) => newValue.includes(opt.value))
          );
        },
      };

      if (tagRender) {
        return tagRender(tagProps);
      }

      return (
        <SelectTag
          key={option.value != null ? String(option.value) : `tag-${index}`}
          $size={mappedSize}
          $variant={mappedVariant}
          $disabled={tagProps.disabled}
          accessibility={accessibility}
        >
          <TagContent>
            {option.label != null
              ? String(option.label)
              : option.value != null
              ? String(option.value)
              : ""}
          </TagContent>
          {tagProps.closable && (
            <TagClose
              $disabled={tagProps.disabled}
              accessibility={accessibility}
              onClick={(e) => {
                e.stopPropagation();
                tagProps.onClose();
              }}
            />
          )}
        </SelectTag>
      );
    },
    [
      disabled,
      value,
      valueProp,
      tagRender,
      mappedSize,
      mappedVariant,
      accessibility,
      onDeselect,
      onChange,
      flatOptions,
    ]
  );

  // Renderizar selección actual
  const renderSelection = () => {
    if (!value || (Array.isArray(value) && value.length === 0)) {
      return (
        <SelectionDisplay $isEmpty $mode={mode} accessibility={accessibility}>
          {placeholder || "Seleccionar..."}
        </SelectionDisplay>
      );
    }

    if (isMultiple) {
      const selectedOptions = flatOptions.filter((opt) => {
        if (!opt || opt.value == null) return false;
        return Array.isArray(value) ? value.includes(opt.value) : false;
      });

      const visibleTags = selectedOptions.slice(0, maxTagCount);
      const hiddenTags = selectedOptions.slice(maxTagCount);

      return (
        <SelectionDisplay $mode={mode} accessibility={accessibility}>
          {visibleTags.map((option, index) => renderTag(option, index))}

          {hiddenTags.length > 0 && (
            <SelectTag
              $size={mappedSize}
              $variant={mappedVariant}
              accessibility={accessibility}
            >
              <TagContent>
                {typeof maxTagPlaceholder === "function"
                  ? maxTagPlaceholder(
                      hiddenTags.map((t) => t.value).filter((v) => v != null)
                    )
                  : maxTagPlaceholder || `+${hiddenTags.length}`}
              </TagContent>
            </SelectTag>
          )}
        </SelectionDisplay>
      );
    } else {
      // Single select
      const selectedOption = flatOptions.find(
        (opt) => opt != null && opt.value === value
      );
      const displayLabel = labelRender
        ? labelRender({ label: selectedOption?.label, value })
        : selectedOption?.label != null
        ? String(selectedOption.label)
        : value != null
        ? String(value)
        : "";

      return (
        <SelectionDisplay $mode={mode} accessibility={accessibility}>
          {displayLabel}
        </SelectionDisplay>
      );
    }
  };

  // Renderizar opción
  const renderOption = (option: SelectOption, index: number) => {
    if (!option || option.value == null) return null;

    const isSelected = isMultiple
      ? Array.isArray(value) && value.includes(option.value)
      : value === option.value;
    const isFocused = index === focusedOptionIndex;

    const optionContent = optionRender
      ? optionRender(option, { index })
      : option.label != null
      ? String(option.label)
      : option.value != null
      ? String(option.value)
      : "";

    return (
      <Option
        key={option.value != null ? String(option.value) : index}
        $size={mappedSize}
        $selected={isSelected}
        $focused={isFocused}
        $disabled={option.disabled}
        accessibility={accessibility}
        onClick={() => handleOptionSelect(option)}
        onMouseEnter={() => setFocusedOptionIndex(index)}
        title={option.title}
        className={option.className}
        style={option.style}
      >
        {optionContent}
      </Option>
    );
  };

  // Renderizar contenido del dropdown
  const renderDropdownContent = () => {
    if (loading) {
      return (
        <LoadingState $size={mappedSize} accessibility={accessibility}>
          Cargando...
        </LoadingState>
      );
    }

    if (filteredOptions.length === 0) {
      return (
        <EmptyState $size={mappedSize} accessibility={accessibility}>
          {notFoundContent}
        </EmptyState>
      );
    }

    // Renderizar con grupos si existen
    if (optionGroups) {
      return optionGroups.map((group, groupIndex) => {
        const groupOptions = group.options.filter((option) =>
          filteredOptions.some((filtered) => filtered.value === option.value)
        );

        if (groupOptions.length === 0) return null;

        return (
          <OptionGroup
            key={groupIndex}
            $size={mappedSize}
            accessibility={accessibility}
          >
            <OptionGroupLabel $size={mappedSize} accessibility={accessibility}>
              {group.label}
            </OptionGroupLabel>
            {groupOptions.map((option, optionIndex) => {
              const globalIndex = filteredOptions.findIndex(
                (f) => f.value === option.value
              );
              return renderOption(option, globalIndex);
            })}
          </OptionGroup>
        );
      });
    }

    // Renderizar opciones planas (con scroll virtual si está habilitado)
    if (virtual && filteredOptions.length > 10) {
      return (
        <VirtualListContainer $height={listHeight}>
          {filteredOptions.map((option, index) => (
            <VirtualListItem
              key={option.value != null ? String(option.value) : index}
              $height={listItemHeight}
              $index={index}
            >
              {renderOption(option, index)}
            </VirtualListItem>
          ))}
        </VirtualListContainer>
      );
    }

    // Renderizar opciones normales
    return filteredOptions.map((option, index) => renderOption(option, index));
  };

  // Renderizar dropdown
  const renderDropdown = () => {
    if (!open) return null;

    const dropdownContent = (
      <>
        {/* Search input */}
        {showSearch && (
          <SearchInput
            ref={searchInputRef}
            $size={mappedSize}
            accessibility={accessibility}
            placeholder="Buscar..."
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
            onKeyDown={(e) => {
              if (["ArrowDown", "ArrowUp", "Enter", "Escape"].includes(e.key)) {
                e.preventDefault();
                handleKeyDown(e as any);
              }
            }}
          />
        )}

        {/* Options */}
        <div onScroll={onPopupScroll}>{renderDropdownContent()}</div>
      </>
    );

    return (
      <Dropdown
        ref={dropdownRef}
        $size={mappedSize}
        $variant={mappedVariant}
        $placement={placement}
        $matchSelectWidth={dropdownMatchSelectWidth}
        accessibility={accessibility}
        className={dropdownClassName}
        style={dropdownStyle}
      >
        {dropdownRender
          ? dropdownRender(dropdownContent as React.ReactElement)
          : dropdownContent}
      </Dropdown>
    );
  };

  // Determinar si mostrar clear button
  const showClearButton =
    allowClear &&
    value &&
    !disabled &&
    (isMultiple ? Array.isArray(value) && value.length > 0 : true);

  return (
    <SelectWrapper
      ref={selectRef}
      className={className}
      style={style}
      $size={mappedSize}
      $variant={mappedVariant}
      $status={status}
      $disabled={disabled}
      $focused={focused}
      $open={open}
      $mode={mode}
      accessibility={accessibility}
      onClick={() => handleDropdownToggle(!open)}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      tabIndex={disabled ? -1 : 0}
      role={role || "combobox"}
      aria-label={ariaLabel || accessibleDescription}
      aria-describedby={ariaDescribedBy}
      aria-expanded={open}
      aria-haspopup="listbox"
      aria-disabled={disabled}
      title={htmlTitle}
      id={id ? `select-${id}` : undefined}
      data-speak={
        accessibility.textToSpeech && accessibleDescription != null
          ? String(accessibleDescription)
          : undefined
      }
      {...rest}
    >
      {/* Selector area */}
      <StyledSelector
        $size={mappedSize}
        $variant={mappedVariant}
        $status={status}
        $disabled={disabled}
        $showArrow={showArrow}
        accessibility={accessibility}
      >
        {/* Selection display */}
        {renderSelection()}

        {/* Clear button */}
        {showClearButton && (
          <ClearButton
            $size={mappedSize}
            $disabled={disabled}
            accessibility={accessibility}
            onClick={(e) => {
              e.stopPropagation();
              handleClear();
            }}
            aria-label="Limpiar selección"
            tabIndex={-1}
          />
        )}

        {/* Arrow */}
        {showArrow && (
          <SelectArrow
            $size={mappedSize}
            $open={open}
            $loading={loading}
            accessibility={accessibility}
          />
        )}
      </StyledSelector>

      {/* Dropdown */}
      {renderDropdown()}
    </SelectWrapper>
  );
};

// =====================================
// COMPONENTES PREDEFINIDOS - VARIANTS
// =====================================

// Select primario
export const PrimarySelect: React.FC<Omit<SelectProps, "variant">> = (
  props
) => <Select variant="primary" {...props} />;

// Select de éxito
export const SuccessSelect: React.FC<Omit<SelectProps, "variant">> = (
  props
) => <Select variant="success" {...props} />;

// Select de advertencia
export const WarningSelect: React.FC<Omit<SelectProps, "variant">> = (
  props
) => <Select variant="warning" {...props} />;

// Select de error
export const ErrorSelect: React.FC<Omit<SelectProps, "variant">> = (props) => (
  <Select variant="error" {...props} />
);

// Select secundario
export const SecondarySelect: React.FC<Omit<SelectProps, "variant">> = (
  props
) => <Select variant="secondary" {...props} />;

// =====================================
// COMPONENTES PREDEFINIDOS - TAMAÑOS
// =====================================

// Select pequeño
export const SmallSelect: React.FC<Omit<SelectProps, "size">> = (props) => (
  <Select size="sm" {...props} />
);

// Select grande
export const LargeSelect: React.FC<Omit<SelectProps, "size">> = (props) => (
  <Select size="lg" {...props} />
);

// =====================================
// COMPONENTES PREDEFINIDOS - MODOS
// =====================================

// Multi-select
export const MultiSelect: React.FC<Omit<SelectProps, "mode">> = (props) => (
  <Select mode="multiple" {...props} />
);

// Tag select
export const TagSelect: React.FC<Omit<SelectProps, "mode">> = (props) => (
  <Select mode="tags" {...props} />
);

// =====================================
// COMPONENTES PREDEFINIDOS - FUNCIONALIDADES
// =====================================

// Select con búsqueda
export const SearchableSelect: React.FC<Omit<SelectProps, "showSearch">> = (
  props
) => <Select showSearch {...props} />;

// Select con clear
export const ClearableSelect: React.FC<Omit<SelectProps, "allowClear">> = (
  props
) => <Select allowClear {...props} />;

// Select con scroll virtual
export const VirtualSelect: React.FC<Omit<SelectProps, "virtual">> = (
  props
) => <Select virtual {...props} />;

// =====================================
// CASOS DE USO ESPECÍFICOS
// =====================================

// Select de países
export const CountrySelect: React.FC<Omit<SelectProps, "options">> = (
  props
) => {
  const countryOptions: SelectOption[] = [
    { value: "AR", label: "🇦🇷 Argentina" },
    { value: "BR", label: "🇧🇷 Brasil" },
    { value: "CL", label: "🇨🇱 Chile" },
    { value: "CO", label: "🇨🇴 Colombia" },
    { value: "MX", label: "🇲🇽 México" },
    { value: "PE", label: "🇵🇪 Perú" },
    { value: "UY", label: "🇺🇾 Uruguay" },
    { value: "ES", label: "🇪🇸 España" },
    { value: "US", label: "🇺🇸 Estados Unidos" },
  ];

  return (
    <Select
      showSearch
      placeholder="Seleccionar país"
      options={countryOptions}
      {...props}
    />
  );
};

// Select de colores
export const ColorSelect: React.FC<Omit<SelectProps, "options">> = (props) => {
  const colorOptions: SelectOption[] = [
    { value: "red", label: "🔴 Rojo" },
    { value: "blue", label: "🔵 Azul" },
    { value: "green", label: "🟢 Verde" },
    { value: "yellow", label: "🟡 Amarillo" },
    { value: "purple", label: "🟣 Morado" },
    { value: "orange", label: "🟠 Naranja" },
    { value: "pink", label: "🩷 Rosa" },
    { value: "black", label: "⚫ Negro" },
    { value: "white", label: "⚪ Blanco" },
  ];

  return (
    <Select placeholder="Seleccionar color" options={colorOptions} {...props} />
  );
};

// Select con carga remota
export const RemoteSelect: React.FC<RemoteSelectProps> = ({
  fetchOptions,
  debounceTimeout = 300,
  minimumInputLength = 2,
  loadingPlaceholder = "Buscando...",
  errorPlaceholder = "Error al cargar",
  ...props
}) => {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Debounced fetch
  const debouncedFetch = useMemo(() => {
    return debounce(async (searchValue: string) => {
      if (!fetchOptions || searchValue.length < minimumInputLength) {
        setOptions([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const result = await fetchOptions(searchValue);
        setOptions(result);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error al cargar opciones"
        );
        setOptions([]);
      } finally {
        setLoading(false);
      }
    }, debounceTimeout);
  }, [fetchOptions, debounceTimeout, minimumInputLength]);

  return (
    <Select
      showSearch
      loading={loading}
      options={options}
      notFoundContent={error ? errorPlaceholder : "Escriba para buscar"}
      onSearch={debouncedFetch}
      {...props}
    />
  );
};

// =====================================
// EJEMPLOS DE USO CON SHARED SYSTEMS
// =====================================

/**
 * EJEMPLOS DE USO:
 *
 * // Básico con mapeo automático
 * <Select
 *   size="large"
 *   variant="danger"
 *   options={[
 *     { value: "1", label: "Opción 1" },
 *     { value: "2", label: "Opción 2" }
 *   ]}
 * />
 * // "large" → "lg", "danger" → "error" automáticamente
 *
 * // Multi-select con tags
 * <Select
 *   mode="multiple"
 *   allowClear
 *   showSearch
 *   maxTagCount={3}
 *   placeholder="Seleccionar múltiples"
 *   options={options}
 * />
 *
 * // Select con grupos
 * <Select
 *   optionGroups={[
 *     {
 *       label: "Frutas",
 *       options: [
 *         { value: "apple", label: "Manzana" },
 *         { value: "banana", label: "Plátano" }
 *       ]
 *     }
 *   ]}
 * />
 *
 * // Select con búsqueda personalizada
 * <Select
 *   showSearch
 *   filterOption={(input, option) =>
 *     option?.label?.toLowerCase().includes(input.toLowerCase())
 *   }
 *   options={options}
 * />
 *
 * // Componentes predefinidos
 * <SuccessSelect placeholder="Select de éxito" />
 * <MultiSelect placeholder="Multi-selección" />
 * <SearchableSelect placeholder="Con búsqueda" />
 * <CountrySelect placeholder="Seleccionar país" />
 * <ColorSelect placeholder="Seleccionar color" />
 *
 * // Select remoto
 * <RemoteSelect
 *   placeholder="Buscar usuarios"
 *   fetchOptions={async (search) => {
 *     const response = await fetch(`/api/users?search=${search}`);
 *     return response.json();
 *   }}
 * />
 */

// Export por defecto
export default Select;
