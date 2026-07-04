import React from "react";
import { AllSize, AllVariant } from "../shared";

// AccessibilityProps type definition
export interface AccessibilityProps {
  largeText?: boolean;
  reducedMotion?: boolean;
  textToSpeech?: boolean;
  increasedSpacing?: boolean;
  spacingMultiplier?: number;
  ariaLabel?: string;
  highContrast?: boolean;
}

// =============================================================================
// CORE TYPES
// =============================================================================

export type DatePickerMode =
  | "date"
  | "month"
  | "year"
  | "time"
  | "datetime"
  | "range";
export type DatePickerStatus =
  | "default"
  | "success"
  | "warning"
  | "error"
  | "validating";
export type DatePickerFormat = string;
export type DatePickerSize = AllSize;
export type DatePickerVariant = AllVariant;
export type DatePickerPlacement =
  | "topLeft"
  | "topRight"
  | "bottomLeft"
  | "bottomRight"
  | "top"
  | "bottom";

export type DateValue = Date | string | number | null;
export type RangeValue = [DateValue, DateValue] | null;
export type DatePickerValue = DateValue | RangeValue;

// =============================================================================
// PRESET TYPES
// =============================================================================

export interface DatePreset {
  label: string;
  value: DateValue | RangeValue;
  disabled?: boolean;
}

export interface TimePreset {
  label: string;
  hour: number;
  minute: number;
  second?: number;
}

// =============================================================================
// CALENDAR TYPES
// =============================================================================

export interface CalendarDate {
  date: Date;
  inCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isInRange: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  isDisabled: boolean;
  isWeekend: boolean;
  isHoliday?: boolean;
}

export interface CalendarMonth {
  month: number;
  year: number;
  isSelected: boolean;
  isDisabled: boolean;
  isCurrent: boolean;
}

export interface CalendarYear {
  year: number;
  isSelected: boolean;
  isDisabled: boolean;
  isCurrent: boolean;
}

// =============================================================================
// MAIN PROPS
// =============================================================================

export interface DatePickerProps extends AccessibilityProps {
  // Core Props
  value?: DatePickerValue;
  defaultValue?: DatePickerValue;
  onChange?: (
    date: DatePickerValue,
    dateString: string | [string, string]
  ) => void;
  onOpenChange?: (open: boolean) => void;
  onPanelChange?: (value: DateValue, mode: DatePickerMode) => void;

  // Appearance
  size?: DatePickerSize;
  variant?: DatePickerVariant;
  status?: DatePickerStatus;
  placeholder?: string | [string, string];
  format?: DatePickerFormat | DatePickerFormat[];

  // Behavior
  mode?: DatePickerMode;
  picker?: "date" | "week" | "month" | "quarter" | "year";
  showTime?: boolean | TimePickerProps;
  showToday?: boolean;
  showNow?: boolean;
  allowClear?: boolean;
  autoFocus?: boolean;
  bordered?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  open?: boolean;

  // Validation
  disabledDate?: (currentDate: Date) => boolean;
  disabledTime?: (date: Date) => DisabledTimes;

  // Dropdown
  placement?: DatePickerPlacement;
  dropdownClassName?: string;
  dropdownStyle?: React.CSSProperties;
  getPopupContainer?: (triggerNode: Element) => HTMLElement;

  // Presets
  presets?: DatePreset[];
  ranges?: Record<string, DateValue | RangeValue>;

  // Input Props
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  clearIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  allowEmpty?: [boolean, boolean];

  // Separators
  separator?: React.ReactNode;

  // Callbacks
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onCalendarChange?: (
    dates: DateValue[],
    dateStrings: string[],
    info: { range: "start" | "end" }
  ) => void;
  onOk?: (date: DatePickerValue) => void;

  // Styling
  className?: string;
  style?: React.CSSProperties;
  inputReadOnly?: boolean;

  // Accessibility
  accessibility?: AccessibilityProps;
  id?: string;
  name?: string;
  "aria-label"?: string;
  "aria-describedby"?: string;
  "aria-required"?: boolean;
  "aria-invalid"?: boolean;
  role?: string;
  tabIndex?: number;
}

// =============================================================================
// TIME PICKER PROPS
// =============================================================================

export interface TimePickerProps {
  format?: string;
  use12Hours?: boolean;
  hourStep?: number;
  minuteStep?: number;
  secondStep?: number;
  hideDisabledOptions?: boolean;
  showNow?: boolean;
  defaultValue?: Date;
  disabledHours?: () => number[];
  disabledMinutes?: (selectedHour: number) => number[];
  disabledSeconds?: (selectedHour: number, selectedMinute: number) => number[];
  addon?: () => React.ReactNode;
}

export interface DisabledTimes {
  disabledHours?: () => number[];
  disabledMinutes?: (selectedHour: number) => number[];
  disabledSeconds?: (selectedHour: number, selectedMinute: number) => number[];
}

// =============================================================================
// RANGE PICKER PROPS
// =============================================================================

export interface RangePickerProps
  extends Omit<
    DatePickerProps,
    "value" | "defaultValue" | "onChange" | "placeholder" | "onCalendarChange"
  > {
  value?: RangeValue;
  defaultValue?: RangeValue;
  onChange?: (dates: RangeValue, dateStrings: [string, string]) => void;
  placeholder?: [string, string];
  ranges?: Record<string, RangeValue>;
  allowEmpty?: [boolean, boolean];
  separator?: React.ReactNode;
  onCalendarChange?: (
    dates: [DateValue, DateValue],
    dateStrings: [string, string],
    info: { range: "start" | "end" }
  ) => void;
}

// =============================================================================
// STYLED COMPONENTS PROPS
// =============================================================================

export interface StyledDatePickerProps {
  $size: DatePickerSize;
  $variant: DatePickerVariant;
  $status: DatePickerStatus;
  $bordered: boolean;
  $disabled: boolean;
  $focused: boolean;
  $hasValue: boolean;
  $readOnly: boolean;
  accessibility?: AccessibilityProps;
}

export interface StyledDropdownProps {
  $placement: DatePickerPlacement;
  $size: DatePickerSize;
  $variant: DatePickerVariant;
  accessibility?: AccessibilityProps;
}

export interface StyledCalendarProps {
  $size: DatePickerSize;
  $variant: DatePickerVariant;
  accessibility?: AccessibilityProps;
}

export interface StyledDateCellProps {
  $inCurrentMonth: boolean;
  $isToday: boolean;
  $isSelected: boolean;
  $isInRange: boolean;
  $isRangeStart: boolean;
  $isRangeEnd: boolean;
  $isDisabled: boolean;
  $isWeekend: boolean;
  $isHoliday?: boolean;
  accessibility?: AccessibilityProps;
}

export interface StyledTimePickerProps {
  $size: DatePickerSize;
  $variant: DatePickerVariant;
  $use12Hours: boolean;
  accessibility?: AccessibilityProps;
}

export interface StyledPresetProps {
  $size: DatePickerSize;
  $variant: DatePickerVariant;
  $active: boolean;
  accessibility?: AccessibilityProps;
}

// =============================================================================
// DEFAULTS AND CONSTANTS
// =============================================================================

export const DATEPICKER_DEFAULTS = {
  size: "md" as DatePickerSize,
  variant: "default" as DatePickerVariant,
  status: "default" as DatePickerStatus,
  mode: "date" as DatePickerMode,
  format: "YYYY-MM-DD",
  placement: "bottomLeft" as DatePickerPlacement,
  bordered: true,
  allowClear: true,
  showToday: true,
  showNow: true,
} as const;

export const DATEPICKER_MODES = [
  "date",
  "month",
  "year",
  "time",
  "datetime",
  "range",
] as const;
export const DATEPICKER_STATUSES = [
  "default",
  "success",
  "warning",
  "error",
  "validating",
] as const;
export const DATEPICKER_PLACEMENTS = [
  "topLeft",
  "topRight",
  "bottomLeft",
  "bottomRight",
  "top",
  "bottom",
] as const;

export const DATE_FORMATS = {
  date: "YYYY-MM-DD",
  datetime: "YYYY-MM-DD HH:mm:ss",
  time: "HH:mm:ss",
  month: "YYYY-MM",
  year: "YYYY",
  week: "YYYY-wo",
  quarter: "YYYY-[Q]Q",
} as const;

export const TIME_FORMATS = {
  "12hour": "h:mm:ss A",
  "24hour": "HH:mm:ss",
  "hour-minute": "HH:mm",
  "hour-minute-12": "h:mm A",
} as const;

// =============================================================================
// COMMON PRESETS
// =============================================================================

export const COMMON_DATE_PRESETS: DatePreset[] = [
  {
    label: "Today",
    value: new Date(),
  },
  {
    label: "Yesterday",
    value: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
  {
    label: "This Week",
    value: [
      new Date(Date.now() - new Date().getDay() * 24 * 60 * 60 * 1000),
      new Date(),
    ],
  },
  {
    label: "Last Week",
    value: [
      new Date(Date.now() - (new Date().getDay() + 7) * 24 * 60 * 60 * 1000),
      new Date(Date.now() - new Date().getDay() * 24 * 60 * 60 * 1000),
    ],
  },
  {
    label: "This Month",
    value: [
      new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      new Date(),
    ],
  },
  {
    label: "Last Month",
    value: [
      new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
      new Date(new Date().getFullYear(), new Date().getMonth(), 0),
    ],
  },
];

export const COMMON_TIME_PRESETS: TimePreset[] = [
  { label: "00:00", hour: 0, minute: 0 },
  { label: "06:00", hour: 6, minute: 0 },
  { label: "09:00", hour: 9, minute: 0 },
  { label: "12:00", hour: 12, minute: 0 },
  { label: "15:00", hour: 15, minute: 0 },
  { label: "18:00", hour: 18, minute: 0 },
  { label: "21:00", hour: 21, minute: 0 },
  { label: "23:59", hour: 23, minute: 59 },
];

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

export const formatDate = (
  date: DateValue,
  format: string = DATE_FORMATS.date
): string => {
  if (!date) return "";

  const d = new Date(date);
  if (isNaN(d.getTime())) return "";

  return format
    .replace("YYYY", d.getFullYear().toString())
    .replace("MM", (d.getMonth() + 1).toString().padStart(2, "0"))
    .replace("DD", d.getDate().toString().padStart(2, "0"))
    .replace("HH", d.getHours().toString().padStart(2, "0"))
    .replace("mm", d.getMinutes().toString().padStart(2, "0"))
    .replace("ss", d.getSeconds().toString().padStart(2, "0"));
};

export const parseDate = (
  dateString: string,
  format: string = DATE_FORMATS.date
): Date | null => {
  if (!dateString) return null;

  try {
    // Simple parsing for common formats
    if (format === DATE_FORMATS.date) {
      return new Date(dateString);
    }
    return new Date(dateString);
  } catch {
    return null;
  }
};

export const isDateInRange = (
  date: Date,
  start: DateValue,
  end: DateValue
): boolean => {
  if (!start || !end) return false;

  const startDate = new Date(start);
  const endDate = new Date(end);

  return date >= startDate && date <= endDate;
};

export const isSameDate = (date1: DateValue, date2: DateValue): boolean => {
  if (!date1 || !date2) return false;

  const d1 = new Date(date1);
  const d2 = new Date(date2);

  return d1.toDateString() === d2.toDateString();
};

export const getCalendarDates = (
  year: number,
  month: number
): CalendarDate[][] => {
  const dates: CalendarDate[][] = [];
  const firstDay = new Date(year, month, 1);
  const startDate = new Date(firstDay);

  // Adjust to start on Sunday
  startDate.setDate(startDate.getDate() - startDate.getDay());

  const today = new Date();

  for (let week = 0; week < 6; week++) {
    const weekDates: CalendarDate[] = [];

    for (let day = 0; day < 7; day++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + week * 7 + day);

      weekDates.push({
        date: currentDate,
        inCurrentMonth: currentDate.getMonth() === month,
        isToday: currentDate.toDateString() === today.toDateString(),
        isSelected: false,
        isInRange: false,
        isRangeStart: false,
        isRangeEnd: false,
        isDisabled: false,
        isWeekend: currentDate.getDay() === 0 || currentDate.getDay() === 6,
      });
    }

    dates.push(weekDates);
  }

  return dates;
};

export const getMonthName = (month: number, locale: string = "en"): string => {
  return new Date(2000, month, 1).toLocaleDateString(locale, { month: "long" });
};

export const getDayNames = (
  locale: string = "en",
  format: "long" | "short" | "narrow" = "short"
): string[] => {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(2000, 0, 2 + i); // Start from Sunday
    days.push(date.toLocaleDateString(locale, { weekday: format }));
  }
  return days;
};

export const getAccessibilityDateMessage = (
  date: DateValue,
  mode: DatePickerMode,
  format: string
): string => {
  if (!date) return "No date selected";

  const d = new Date(date);
  if (isNaN(d.getTime())) return "Invalid date";

  switch (mode) {
    case "date":
      return `Selected date: ${d.toLocaleDateString()}`;
    case "datetime":
      return `Selected date and time: ${d.toLocaleString()}`;
    case "time":
      return `Selected time: ${d.toLocaleTimeString()}`;
    case "month":
      return `Selected month: ${d.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
      })}`;
    case "year":
      return `Selected year: ${d.getFullYear()}`;
    default:
      return `Selected: ${formatDate(date, format)}`;
  }
};
