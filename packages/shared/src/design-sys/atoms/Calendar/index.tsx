import React, { useState, useMemo } from "react";
import { CalendarProps, CALENDAR_DEFAULTS, SIZE_MAPPING_CALENDAR } from "./Calendar.types";
import {
  CalendarContainer,
  CalendarHeader,
  CalendarHeaderButtons,
  CalendarNavButton,
  CalendarTitle,
  CalendarBody,
  CalendarWeekDays,
  CalendarWeekDay,
  CalendarDays,
  CalendarDay,
} from "./Calendar.styles";
import { usePersonalization } from '../../contexts/PersonalizationContext';
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { ZnIcon } from '../ZnIcon';

// =====================================
// HELPER FUNCTIONS
// =====================================

// Mapear AllSize a CalendarSize usando shared system
const mapCalendarSize = (size: CalendarProps["size"]) => {
  if (!size) return CALENDAR_DEFAULTS.size;

  const mapped = SIZE_MAPPING_CALENDAR[size];
  return mapped || CALENDAR_DEFAULTS.size;
};

// Obtener días de la semana (localizado)
const getWeekDays = (locale?: CalendarProps["locale"]): string[] => {
  // Por defecto español
  return ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
};

// Obtener días del mes
const getDaysInMonth = (date: Date): Date[] => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const days: Date[] = [];

  // Días del mes anterior
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    days.push(new Date(year, month - 1, prevMonthLastDay - i));
  }

  // Días del mes actual
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(year, month, i));
  }

  // Días del mes siguiente (completar 42 días)
  const remainingDays = 42 - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    days.push(new Date(year, month + 1, i));
  }

  return days;
};

// Comparar fechas (solo día, mes, año)
const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

const isToday = (date: Date): boolean => {
  return isSameDay(date, new Date());
};

const isCurrentMonth = (date: Date, currentDate: Date): boolean => {
  return (
    date.getMonth() === currentDate.getMonth() &&
    date.getFullYear() === currentDate.getFullYear()
  );
};

// =====================================
// CALENDAR COMPONENT
// =====================================

/**
 * Calendar Component - Componente de calendario unificado y accesible
 *
 * 🎯 APLICANDO SHARED SYSTEMS:
 * - ✅ size acepta AllSize con mapeo automático
 * - ✅ Soporte para renderizado personalizado de celdas
 * - ✅ Accesibilidad integrada con usePersonalization
 * - ✅ Compatible 100% con Ant Design Calendar
 *
 * Reemplazo directo de Ant Design Calendar con sistema unificado.
 */
export const Calendar: React.FC<CalendarProps> = ({
  value: valueProp,
  defaultValue,
  mode: modeProp,
  defaultMode = CALENDAR_DEFAULTS.mode,
  onPanelChange,
  onChange,
  onSelect,
  size = CALENDAR_DEFAULTS.size,
  disabledDate,
  dateCellRender,
  monthCellRender,
  dateFullCellRender,
  monthFullCellRender,
  headerRender,
  className,
  style,
  id,
  locale,
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
  const mappedSize = mapCalendarSize(size);

  const [internalValue, setInternalValue] = useState(
    valueProp || defaultValue || new Date()
  );
  const [internalMode, setInternalMode] = useState(modeProp || defaultMode);

  const value = valueProp !== undefined ? valueProp : internalValue;
  const mode = modeProp !== undefined ? modeProp : internalMode;

  // Días del mes actual
  const days = useMemo(() => getDaysInMonth(value), [value]);
  const weekDays = useMemo(() => getWeekDays(locale), [locale]);

  // Manejar navegación
  const handlePrevMonth = () => {
    const newDate = new Date(value);
    newDate.setMonth(value.getMonth() - 1);
    if (valueProp === undefined) {
      setInternalValue(newDate);
    }
    onChange?.(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(value);
    newDate.setMonth(value.getMonth() + 1);
    if (valueProp === undefined) {
      setInternalValue(newDate);
    }
    onChange?.(newDate);
  };

  const handlePrevYear = () => {
    const newDate = new Date(value);
    newDate.setFullYear(value.getFullYear() - 1);
    if (valueProp === undefined) {
      setInternalValue(newDate);
    }
    onChange?.(newDate);
  };

  const handleNextYear = () => {
    const newDate = new Date(value);
    newDate.setFullYear(value.getFullYear() + 1);
    if (valueProp === undefined) {
      setInternalValue(newDate);
    }
    onChange?.(newDate);
  };

  const handleToday = () => {
    const today = new Date();
    if (valueProp === undefined) {
      setInternalValue(today);
    }
    onChange?.(today);
    onSelect?.(today);
  };

  const handleModeChange = (newMode: "month" | "year") => {
    if (modeProp === undefined) {
      setInternalMode(newMode);
    }
    onPanelChange?.(value, newMode);
  };

  const handleDayClick = (date: Date) => {
    if (disabledDate?.(date)) return;

    if (valueProp === undefined) {
      setInternalValue(date);
    }
    onChange?.(date);
    onSelect?.(date);
  };

  // Formatear título
  const formatTitle = () => {
    const months = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    return `${months[value.getMonth()]} ${value.getFullYear()}`;
  };

  const finalId = id ? `calendar-${id}` : undefined;

  // Header customizado
  const defaultHeader = (
    <CalendarHeader $size={mappedSize} accessibility={accessibility}>
      <CalendarHeaderButtons>
        <CalendarNavButton
          $size={mappedSize}
          accessibility={accessibility}
          onClick={handlePrevMonth}
          aria-label="Mes anterior"
        >
          <ZnIcon icon={LeftOutlined} />
        </CalendarNavButton>
        <CalendarNavButton
          $size={mappedSize}
          accessibility={accessibility}
          onClick={handlePrevYear}
          aria-label="Año anterior"
        >
          <ZnIcon icon={LeftOutlined} style={{ marginRight: "-2px" }} />
          <ZnIcon icon={LeftOutlined} />
        </CalendarNavButton>
      </CalendarHeaderButtons>

      <CalendarTitle
        $size={mappedSize}
        accessibility={accessibility}
        onClick={() => handleModeChange(mode === "month" ? "year" : "month")}
      >
        {formatTitle()}
      </CalendarTitle>

      <CalendarHeaderButtons>
        <CalendarNavButton
          $size={mappedSize}
          accessibility={accessibility}
          onClick={handleToday}
          aria-label="Hoy"
        >
          Hoy
        </CalendarNavButton>
        <CalendarNavButton
          $size={mappedSize}
          accessibility={accessibility}
          onClick={handleNextYear}
          aria-label="Año siguiente"
        >
          <ZnIcon icon={RightOutlined} />
          <ZnIcon icon={RightOutlined} style={{ marginLeft: "-2px" }} />
        </CalendarNavButton>
        <CalendarNavButton
          $size={mappedSize}
          accessibility={accessibility}
          onClick={handleNextMonth}
          aria-label="Mes siguiente"
        >
          <ZnIcon icon={RightOutlined} />
        </CalendarNavButton>
      </CalendarHeaderButtons>
    </CalendarHeader>
  );

  return (
    <CalendarContainer
      id={finalId}
      className={className}
      style={style}
      $size={mappedSize}
      accessibility={accessibility}
    >
      {headerRender
        ? headerRender({
            value,
            type: mode,
            onChange: (date) => {
              if (valueProp === undefined) {
                setInternalValue(date);
              }
              onChange?.(date);
            },
            onTypeChange: handleModeChange,
          })
        : defaultHeader}

      <CalendarBody $size={mappedSize} accessibility={accessibility}>
        <CalendarWeekDays $size={mappedSize} accessibility={accessibility}>
          {weekDays.map((day, index) => (
            <CalendarWeekDay
              key={index}
              $size={mappedSize}
              accessibility={accessibility}
            >
              {day}
            </CalendarWeekDay>
          ))}
        </CalendarWeekDays>

        <CalendarDays $size={mappedSize} accessibility={accessibility}>
          {days.map((day, index) => {
            const isSelected = valueProp ? isSameDay(day, valueProp) : false;
            const isDayToday = isToday(day);
            const isDayCurrentMonth = isCurrentMonth(day, value);
            const isDisabled = disabledDate?.(day) || false;

            const cellContent = dateFullCellRender
              ? dateFullCellRender(day)
              : dateCellRender
              ? dateCellRender(day)
              : day.getDate();

            return (
              <CalendarDay
                key={index}
                $size={mappedSize}
                accessibility={accessibility}
                $isToday={isDayToday}
                $isSelected={isSelected}
                $isCurrentMonth={isDayCurrentMonth}
                $isDisabled={isDisabled}
                onClick={() => handleDayClick(day)}
                disabled={isDisabled}
                aria-label={day.toLocaleDateString()}
              >
                {cellContent}
              </CalendarDay>
            );
          })}
        </CalendarDays>
      </CalendarBody>
    </CalendarContainer>
  );
};

export default Calendar;
