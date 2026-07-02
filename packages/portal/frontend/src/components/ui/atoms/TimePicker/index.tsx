import React, { useState, useRef, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import { TimePickerProps, TimePickerRef } from "./TimePicker.types";
import { ZnIcon } from "@design-sys/atoms/ZnIcon";
import { CloseOutlined } from "@ant-design/icons";
import {
  TimePickerContainer,
  TimePickerDropdown,
  TimePickerHeader,
  TimePickerBody,
  TimeColumn,
  TimeOption,
  ClearButton,
} from "./TimePicker.styles";

const TimePicker = React.forwardRef<TimePickerRef, TimePickerProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      format = "HH:mm",
      placeholder = "Selecciona la hora",
      disabled = false,
      size = "md",
      className,
      style,
      allowClear = true,
      open: controlledOpen,
      onOpenChange,
      id,
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState<Dayjs | null>(() => {
      if (value) {
        return typeof value === "string" ? dayjs(value, format) : value;
      }
      if (defaultValue) {
        return typeof defaultValue === "string"
          ? dayjs(defaultValue, format)
          : defaultValue;
      }
      return null;
    });

    const [internalOpen, setInternalOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;

    // Sincronizar value externo
    useEffect(() => {
      if (value !== undefined) {
        if (value === null || value === "") {
          setInternalValue(null);
        } else {
          const parsed =
            typeof value === "string" ? dayjs(value, format) : value;
          setInternalValue(parsed);
        }
      }
    }, [value, format]);

    // Cerrar cuando se hace click fuera
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          handleOpenChange(false);
        }
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isOpen]);

    const handleOpenChange = (open: boolean) => {
      if (controlledOpen === undefined) {
        setInternalOpen(open);
      }
      onOpenChange?.(open);
    };

    const handleInputClick = () => {
      if (!disabled) {
        handleOpenChange(true);
      }
    };

    const handleTimeSelect = (hour: number, minute: number) => {
      const newTime = dayjs()
        .hour(hour)
        .minute(minute)
        .second(0)
        .millisecond(0);

      setInternalValue(newTime);
      const timeString = newTime.format(format);
      onChange?.(newTime, timeString);
      handleOpenChange(false);
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      setInternalValue(null);
      onChange?.(null, "");
    };

    // Exponer métodos para ref
    React.useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current?.focus();
      },
      blur: () => {
        inputRef.current?.blur();
      },
    }));

    const displayValue = internalValue ? internalValue.format(format) : "";

    // Generar opciones de hora y minuto
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const minutes = Array.from({ length: 60 }, (_, i) => i);

    const currentHour = internalValue?.hour() ?? 0;
    const currentMinute = internalValue?.minute() ?? 0;

    const finalId = id ? `time-picker-${id}` : undefined;

    return (
      <TimePickerContainer
        id={finalId}
        ref={containerRef}
        $size={size}
        $disabled={disabled}
        className={className}
        style={style}
      >
        <input
          ref={inputRef}
          type="text"
          value={displayValue}
          placeholder={placeholder}
          disabled={disabled}
          readOnly
          onClick={handleInputClick}
          style={{ cursor: disabled ? "not-allowed" : "pointer" }}
        />
        {allowClear && displayValue && !disabled && (
          <ClearButton type="button" onClick={handleClear}>
            <ZnIcon icon={CloseOutlined} />
          </ClearButton>
        )}
        {isOpen && (
          <TimePickerDropdown $open={isOpen}>
            <TimePickerHeader>
              <strong>Selecciona la hora</strong>
            </TimePickerHeader>
            <TimePickerBody>
              <TimeColumn>
                {hours.map((hour) => (
                  <TimeOption
                    key={hour}
                    $selected={hour === currentHour}
                    onClick={() => handleTimeSelect(hour, currentMinute)}
                  >
                    {String(hour).padStart(2, "0")}
                  </TimeOption>
                ))}
              </TimeColumn>
              <TimeColumn>
                {minutes.map((minute) => (
                  <TimeOption
                    key={minute}
                    $selected={minute === currentMinute}
                    onClick={() => handleTimeSelect(currentHour, minute)}
                  >
                    {String(minute).padStart(2, "0")}
                  </TimeOption>
                ))}
              </TimeColumn>
            </TimePickerBody>
          </TimePickerDropdown>
        )}
      </TimePickerContainer>
    );
  }
);

TimePicker.displayName = "TimePicker";

export default TimePicker;
export type { TimePickerProps, TimePickerRef };
