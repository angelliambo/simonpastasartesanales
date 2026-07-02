import React from "react";
import { AllSize } from "../shared";

// =====================================
// CALENDAR COMPONENT TYPES - ANTD COMPATIBLE
// =====================================

// Calendar acepta tamaños del shared system
export type CalendarSize = "sm" | "md" | "lg";

// Props principales del Calendar
export interface CalendarProps {
  // Valor y fechas
  value?: Date;
  defaultValue?: Date;
  mode?: "month" | "year";
  defaultMode?: "month" | "year";
  onPanelChange?: (value: Date, mode: "month" | "year") => void;
  onChange?: (date: Date | null) => void;
  onSelect?: (date: Date) => void;

  // 🎯 USANDO SHARED SYSTEMS
  size?: AllSize; // Acepta todos los tamaños + mapeo automático

  // Configuración
  disabledDate?: (current: Date) => boolean;
  dateCellRender?: (date: Date) => React.ReactNode;
  monthCellRender?: (date: Date) => React.ReactNode;
  dateFullCellRender?: (date: Date) => React.ReactNode;
  monthFullCellRender?: (date: Date) => React.ReactNode;

  // Header
  headerRender?: (props: CalendarHeaderProps) => React.ReactNode;

  // Layout
  className?: string;
  style?: React.CSSProperties;

  // Accesibilidad
  accessibility?: {
    highContrast?: boolean;
    largeText?: boolean;
    reducedMotion?: boolean;
  };

  // Internacionalización
  locale?: {
    lang: {
      locale: string;
      yearFormat: string;
      monthFormat: string;
      today: string;
      now: string;
      backToToday: string;
      ok: string;
      timeSelect: string;
      dateSelect: string;
      weekSelect?: string;
      clear: string;
      month: string;
      year: string;
      previousMonth: string;
      nextMonth: string;
      previousYear: string;
      nextYear: string;
      previousDecade: string;
      nextDecade: string;
      dayFormat: string;
      dateFormat: string;
      dateTimeFormat: string;
      monthBeforeYear?: boolean;
    };
  };
  /** ID único del componente (opcional) - se concatena con "calendar-" */
  id?: string;
}

// Props para header personalizado
export interface CalendarHeaderProps {
  value: Date;
  type: "month" | "year";
  onChange: (date: Date) => void;
  onTypeChange: (type: "month" | "year") => void;
}

// Props para styled components internos
export interface StyledCalendarProps {
  $size?: CalendarSize;
  accessibility?: CalendarProps["accessibility"];
}

// Default values
export const CALENDAR_DEFAULTS = {
  size: "md" as CalendarSize,
  mode: "month" as const,
  defaultMode: "month" as const,
};

// Mapeo de tamaños del shared system
export const SIZE_MAPPING_CALENDAR: Record<string, CalendarSize> = {
  xs: "sm",
  sm: "sm",
  md: "md",
  lg: "lg",
  xl: "lg",
  xxl: "lg",
  xxxl: "lg",
};
