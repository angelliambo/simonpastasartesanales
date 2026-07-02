import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { usePersonalization } from "../../../../contexts/PersonalizationContext";
import { mapSizeToAvailable } from "../shared";
import {
  DatePickerProps,
  RangePickerProps,
  DatePickerValue,
  DateValue,
  RangeValue,
  DatePickerMode,
  DatePreset,
  CalendarMonth,
  CalendarYear,
  DATEPICKER_DEFAULTS,
  COMMON_DATE_PRESETS,
  formatDate,
  isSameDate,
  getCalendarDates,
  getMonthName,
  getDayNames,
  getAccessibilityDateMessage,
  DATE_FORMATS,
} from "./DatePicker.types";
import {
  DatePickerWrapper,
  StyledDatePicker,
  DatePickerInput,
  DatePickerPrefix,
  DatePickerSuffix,
  DatePickerIcon,
  ClearButton,
  RangeSeparator,
  StyledDropdown,
  DropdownContent,
  PresetPanel,
  CalendarPanel,
  StyledCalendar,
  CalendarHeader,
  CalendarTitle,
  CalendarNav,
  CalendarNavButton,
  CalendarGrid,
  CalendarWeekHeader,
  CalendarWeekDay,
  CalendarWeek,
  CalendarDateCell,
  StyledTimePicker,
  TimeColumn,
  TimeColumnHeader,
  TimeList,
  TimeItem,
  StyledPreset,
  CalendarFooter,
  FooterLeft,
  FooterRight,
  TodayButton,
  OkButton,
  MonthYearGrid,
  MonthYearCell,
} from "./DatePicker.styles";

// =============================================================================
// ICONS
// =============================================================================

const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v1h14V3a1 1 0 0 0-1-1H2zm13 3H1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5z" />
  </svg>
);

const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
    <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
    />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
    />
  </svg>
);

const DoubleChevronLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
    />
    <path
      fillRule="evenodd"
      d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
    />
  </svg>
);

const DoubleChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"
    />
    <path
      fillRule="evenodd"
      d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"
    />
  </svg>
);

const CloseIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
    <path d="M6 4.586L10.293.293a1 1 0 0 1 1.414 1.414L7.414 6l4.293 4.293a1 1 0 0 1-1.414 1.414L6 7.414l-4.293 4.293a1 1 0 0 1-1.414-1.414L4.586 6 .293 1.707A1 1 0 0 1 1.707.293L6 4.586z" />
  </svg>
);

// =============================================================================
// UTILITY HOOKS
// =============================================================================

const useClickOutside = (
  ref: React.RefObject<HTMLElement | null>,
  callback: () => void
) => {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [ref, callback]);
};

const useKeyboardNavigation = (
  isOpen: boolean,
  onClose: () => void,
  onEscape?: () => void
) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "Escape":
          event.preventDefault();
          onEscape?.() || onClose();
          break;
        case "Tab":
          // Allow tab navigation within the dropdown
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onEscape]);
};

// =============================================================================
// CALENDAR LOGIC
// =============================================================================

const useCalendarState = (
  initialDate?: DateValue,
  mode: DatePickerMode = "date"
) => {
  const now = new Date();
  const [viewDate, setViewDate] = useState(() => {
    if (initialDate) {
      const date = new Date(initialDate);
      return isNaN(date.getTime()) ? now : date;
    }
    return now;
  });

  const [calendarMode, setCalendarMode] = useState<"date" | "month" | "year">(
    () => {
      switch (mode) {
        case "month":
          return "month";
        case "year":
          return "year";
        default:
          return "date";
      }
    }
  );

  const navigateMonth = useCallback((direction: "prev" | "next") => {
    setViewDate((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  }, []);

  const navigateYear = useCallback((direction: "prev" | "next") => {
    setViewDate((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setFullYear(newDate.getFullYear() - 1);
      } else {
        newDate.setFullYear(newDate.getFullYear() + 1);
      }
      return newDate;
    });
  }, []);

  const navigateDecade = useCallback((direction: "prev" | "next") => {
    setViewDate((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setFullYear(newDate.getFullYear() - 10);
      } else {
        newDate.setFullYear(newDate.getFullYear() + 10);
      }
      return newDate;
    });
  }, []);

  const setMonth = useCallback((month: number) => {
    setViewDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(month);
      return newDate;
    });
    setCalendarMode("date");
  }, []);

  const setYear = useCallback(
    (year: number) => {
      setViewDate((prev) => {
        const newDate = new Date(prev);
        newDate.setFullYear(year);
        return newDate;
      });
      setCalendarMode(calendarMode === "year" ? "month" : "date");
    },
    [calendarMode]
  );

  return {
    viewDate,
    calendarMode,
    setCalendarMode,
    navigateMonth,
    navigateYear,
    navigateDecade,
    setMonth,
    setYear,
    setViewDate,
  };
};

// =============================================================================
// TIME PICKER LOGIC
// =============================================================================

const useTimeState = (initialTime?: DateValue) => {
  const [selectedTime, setSelectedTime] = useState(() => {
    if (initialTime) {
      const date = new Date(initialTime);
      return {
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds(),
      };
    }
    return {
      hour: 0,
      minute: 0,
      second: 0,
    };
  });

  const setHour = useCallback((hour: number) => {
    setSelectedTime((prev) => ({ ...prev, hour }));
  }, []);

  const setMinute = useCallback((minute: number) => {
    setSelectedTime((prev) => ({ ...prev, minute }));
  }, []);

  const setSecond = useCallback((second: number) => {
    setSelectedTime((prev) => ({ ...prev, second }));
  }, []);

  const getTimeDate = useCallback(
    (baseDate?: DateValue) => {
      const date = baseDate ? new Date(baseDate) : new Date();
      date.setHours(
        selectedTime.hour,
        selectedTime.minute,
        selectedTime.second,
        0
      );
      return date;
    },
    [selectedTime]
  );

  return {
    selectedTime,
    setHour,
    setMinute,
    setSecond,
    getTimeDate,
    setSelectedTime,
  };
};

// =============================================================================
// MAIN DATE PICKER COMPONENT
// =============================================================================

export const DatePicker: React.FC<DatePickerProps> = ({
  // Core Props
  value,
  defaultValue,
  onChange,
  onOpenChange,
  onPanelChange,

  // Appearance
  size = DATEPICKER_DEFAULTS.size,
  variant = DATEPICKER_DEFAULTS.variant,
  status = DATEPICKER_DEFAULTS.status,
  placeholder = "Select date",
  format = DATEPICKER_DEFAULTS.format,

  // Behavior
  mode = DATEPICKER_DEFAULTS.mode,
  picker = "date",
  showTime = false,
  showToday = DATEPICKER_DEFAULTS.showToday,
  showNow = DATEPICKER_DEFAULTS.showNow,
  allowClear = DATEPICKER_DEFAULTS.allowClear,
  autoFocus = false,
  bordered = DATEPICKER_DEFAULTS.bordered,
  disabled = false,
  readOnly = false,
  open: controlledOpen,

  // Validation
  disabledDate,
  disabledTime,

  // Dropdown
  placement = DATEPICKER_DEFAULTS.placement,
  dropdownClassName,
  dropdownStyle,
  getPopupContainer,

  // Presets
  presets = [],
  ranges,

  // Input Props
  prefix,
  suffix,
  clearIcon,
  suffixIcon,

  // Callbacks
  onFocus,
  onBlur,
  onKeyDown,
  onOk,

  // Styling
  className,
  style,
  inputReadOnly = false,

  // Accessibility
  accessibility: accessibilityProp,
  id,
  name,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedby,
  "aria-required": ariaRequired,
  "aria-invalid": ariaInvalid,
  role = "combobox",
  tabIndex = 0,

  ...rest
}) => {
  // =============================================================================
  // HOOKS AND STATE
  // =============================================================================

  const { accessibility: contextAccessibility } = usePersonalization();
  const personalizedProps = {
    accessibility: {
      ...contextAccessibility,
      ...accessibilityProp,
    },
  };
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Internal state
  const [internalValue, setInternalValue] = useState<DateValue>(
    (defaultValue && !Array.isArray(defaultValue)
      ? defaultValue
      : null) as DateValue
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // Controlled vs uncontrolled
  const currentValue =
    value !== undefined ? (value as DateValue) : internalValue;
  const isControlledOpen = controlledOpen !== undefined;
  const currentOpen = isControlledOpen ? controlledOpen : isOpen;

  // Calendar and time state
  const calendar = useCalendarState(currentValue, mode);
  const timePicker = useTimeState(currentValue);

  // Mapped size for shared systems
  const mappedSize = mapSizeToAvailable(size, [
    "xs",
    "sm",
    "md",
    "lg",
    "xl",
    "xxl",
  ]);

  // =============================================================================
  // COMPUTED VALUES
  // =============================================================================

  const hasValue = Boolean(currentValue);
  const canClear = allowClear && hasValue && !disabled && !readOnly;

  const displayFormat = useMemo(() => {
    if (typeof format === "string") return format;
    if (Array.isArray(format)) return format[0];

    switch (mode) {
      case "datetime":
        return showTime ? DATE_FORMATS.datetime : DATE_FORMATS.date;
      case "time":
        return "HH:mm:ss";
      case "month":
        return DATE_FORMATS.month;
      case "year":
        return DATE_FORMATS.year;
      default:
        return DATE_FORMATS.date;
    }
  }, [format, mode, showTime]);

  const displayValue = useMemo(() => {
    if (!currentValue) return "";
    return formatDate(currentValue, displayFormat);
  }, [currentValue, displayFormat]);

  // =============================================================================
  // EVENT HANDLERS
  // =============================================================================

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (disabled || readOnly) return;

      if (!isControlledOpen) {
        setIsOpen(open);
      }
      onOpenChange?.(open);
    },
    [disabled, readOnly, isControlledOpen, onOpenChange]
  );

  const handleValueChange = useCallback(
    (newValue: DateValue, dateString?: string) => {
      const finalDateString = dateString || formatDate(newValue, displayFormat);

      if (value === undefined) {
        setInternalValue(newValue);
      }

      onChange?.(newValue, finalDateString);
    },
    [value, onChange, displayFormat]
  );

  const handleInputClick = useCallback(() => {
    if (!disabled && !readOnly) {
      handleOpenChange(!currentOpen);
    }
  }, [disabled, readOnly, currentOpen, handleOpenChange]);

  const handleInputFocus = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      if (autoFocus && !currentOpen) {
        handleOpenChange(true);
      }
      onFocus?.(event);
    },
    [autoFocus, currentOpen, handleOpenChange, onFocus]
  );

  const handleInputBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(event);
    },
    [onBlur]
  );

  const handleInputKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      switch (event.key) {
        case "Enter":
          event.preventDefault();
          if (!currentOpen) {
            handleOpenChange(true);
          }
          break;
        case "Escape":
          event.preventDefault();
          if (currentOpen) {
            handleOpenChange(false);
          }
          break;
        case "ArrowDown":
          event.preventDefault();
          if (!currentOpen) {
            handleOpenChange(true);
          }
          break;
        case "Tab":
          if (currentOpen) {
            handleOpenChange(false);
          }
          break;
      }
      onKeyDown?.(event);
    },
    [currentOpen, handleOpenChange, onKeyDown]
  );

  const handleClear = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      handleValueChange(null);
      inputRef.current?.focus();
    },
    [handleValueChange]
  );

  const handleDateSelect = useCallback(
    (date: Date) => {
      if (disabledDate?.(date)) return;

      let finalDate = date;

      // Include time if showTime is enabled
      if (showTime && currentValue) {
        const currentDate = new Date(currentValue);
        finalDate = new Date(date);
        finalDate.setHours(
          currentDate.getHours(),
          currentDate.getMinutes(),
          currentDate.getSeconds(),
          currentDate.getMilliseconds()
        );
      } else if (showTime) {
        finalDate = timePicker.getTimeDate(date);
      }

      handleValueChange(finalDate);

      // Close dropdown for date mode without time
      if (mode === "date" && !showTime) {
        handleOpenChange(false);
      }
    },
    [
      disabledDate,
      showTime,
      currentValue,
      timePicker,
      handleValueChange,
      mode,
      handleOpenChange,
    ]
  );

  const handleTimeChange = useCallback(
    (hour: number, minute: number, second: number) => {
      const baseDate = currentValue ? new Date(currentValue) : new Date();
      baseDate.setHours(hour, minute, second, 0);
      handleValueChange(baseDate);
    },
    [currentValue, handleValueChange]
  );

  const handlePresetSelect = useCallback(
    (preset: DatePreset) => {
      if (preset.disabled) return;
      handleValueChange(preset.value as DateValue);
      handleOpenChange(false);
    },
    [handleValueChange, handleOpenChange]
  );

  const handleTodayClick = useCallback(() => {
    const today = new Date();
    handleValueChange(today);
    calendar.setViewDate(today);
  }, [handleValueChange, calendar]);

  const handleOkClick = useCallback(() => {
    onOk?.(currentValue);
    handleOpenChange(false);
  }, [onOk, currentValue, handleOpenChange]);

  // =============================================================================
  // EFFECTS
  // =============================================================================

  // Update input value when display value changes
  useEffect(() => {
    setInputValue(displayValue);
  }, [displayValue]);

  // Handle click outside
  useClickOutside(dropdownRef, () => {
    if (currentOpen) {
      handleOpenChange(false);
    }
  });

  // Handle keyboard navigation
  useKeyboardNavigation(currentOpen, () => handleOpenChange(false));

  // Focus input when opened
  useEffect(() => {
    if (currentOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentOpen]);

  // =============================================================================
  // RENDER CALENDAR
  // =============================================================================

  const renderCalendar = () => {
    if (calendar.calendarMode === "month") {
      return renderMonthPicker();
    }

    if (calendar.calendarMode === "year") {
      return renderYearPicker();
    }

    return renderDatePicker();
  };

  const renderDatePicker = () => {
    const calendarDates = getCalendarDates(
      calendar.viewDate.getFullYear(),
      calendar.viewDate.getMonth()
    );

    const dayNames = getDayNames("en", "short");

    return (
      <StyledCalendar
        $size={mappedSize}
        $variant={variant}
        accessibility={personalizedProps.accessibility}
      >
        <CalendarHeader>
          <CalendarNav>
            <CalendarNavButton
              type="button"
              onClick={() => calendar.navigateYear("prev")}
              aria-label="Previous year"
            >
              <DoubleChevronLeftIcon />
            </CalendarNavButton>
            <CalendarNavButton
              type="button"
              onClick={() => calendar.navigateMonth("prev")}
              aria-label="Previous month"
            >
              <ChevronLeftIcon />
            </CalendarNavButton>
          </CalendarNav>

          <CalendarTitle
            onClick={() => calendar.setCalendarMode("month")}
            role="button"
            tabIndex={0}
            aria-label={`${getMonthName(
              calendar.viewDate.getMonth()
            )} ${calendar.viewDate.getFullYear()}, click to select month`}
          >
            {getMonthName(calendar.viewDate.getMonth())}{" "}
            {calendar.viewDate.getFullYear()}
          </CalendarTitle>

          <CalendarNav>
            <CalendarNavButton
              type="button"
              onClick={() => calendar.navigateMonth("next")}
              aria-label="Next month"
            >
              <ChevronRightIcon />
            </CalendarNavButton>
            <CalendarNavButton
              type="button"
              onClick={() => calendar.navigateYear("next")}
              aria-label="Next year"
            >
              <DoubleChevronRightIcon />
            </CalendarNavButton>
          </CalendarNav>
        </CalendarHeader>

        <CalendarGrid>
          <CalendarWeekHeader>
            {dayNames.map((day, index) => (
              <CalendarWeekDay key={index}>{day}</CalendarWeekDay>
            ))}
          </CalendarWeekHeader>

          {calendarDates.map((week, weekIndex) => (
            <CalendarWeek key={weekIndex}>
              {week.map((dateObj, dayIndex) => {
                const isSelected = Boolean(
                  currentValue && isSameDate(dateObj.date, currentValue)
                );
                const isDisabled = disabledDate?.(dateObj.date) || false;

                return (
                  <CalendarDateCell
                    key={dayIndex}
                    type="button"
                    disabled={isDisabled}
                    onClick={() => handleDateSelect(dateObj.date)}
                    $inCurrentMonth={dateObj.inCurrentMonth}
                    $isToday={dateObj.isToday}
                    $isSelected={isSelected}
                    $isInRange={false}
                    $isRangeStart={false}
                    $isRangeEnd={false}
                    $isDisabled={isDisabled}
                    $isWeekend={dateObj.isWeekend}
                    $isHoliday={dateObj.isHoliday}
                    accessibility={personalizedProps.accessibility}
                    aria-label={`${dateObj.date.toLocaleDateString()}, ${
                      dateObj.isToday ? "today" : ""
                    } ${isSelected ? "selected" : ""}`}
                  >
                    {dateObj.date.getDate()}
                  </CalendarDateCell>
                );
              })}
            </CalendarWeek>
          ))}
        </CalendarGrid>
      </StyledCalendar>
    );
  };

  const renderMonthPicker = () => {
    const months: CalendarMonth[] = [];
    const currentYear = calendar.viewDate.getFullYear();
    const currentMonth = new Date().getMonth();
    const selectedMonth = currentValue ? new Date(currentValue).getMonth() : -1;

    for (let i = 0; i < 12; i++) {
      months.push({
        month: i,
        year: currentYear,
        isSelected:
          selectedMonth === i &&
          new Date(currentValue!).getFullYear() === currentYear,
        isDisabled: false,
        isCurrent:
          i === currentMonth && currentYear === new Date().getFullYear(),
      });
    }

    return (
      <StyledCalendar
        $size={mappedSize}
        $variant={variant}
        accessibility={personalizedProps.accessibility}
      >
        <CalendarHeader>
          <CalendarNav>
            <CalendarNavButton
              type="button"
              onClick={() => calendar.navigateYear("prev")}
              aria-label="Previous year"
            >
              <ChevronLeftIcon />
            </CalendarNavButton>
          </CalendarNav>

          <CalendarTitle
            onClick={() => calendar.setCalendarMode("year")}
            role="button"
            tabIndex={0}
            aria-label={`${currentYear}, click to select year`}
          >
            {currentYear}
          </CalendarTitle>

          <CalendarNav>
            <CalendarNavButton
              type="button"
              onClick={() => calendar.navigateYear("next")}
              aria-label="Next year"
            >
              <ChevronRightIcon />
            </CalendarNavButton>
          </CalendarNav>
        </CalendarHeader>

        <MonthYearGrid>
          {months.map((month) => (
            <MonthYearCell
              key={month.month}
              type="button"
              onClick={() => calendar.setMonth(month.month)}
              $selected={month.isSelected}
              $disabled={month.isDisabled}
              $current={month.isCurrent}
              aria-label={`${getMonthName(month.month)} ${month.year}`}
            >
              {getMonthName(month.month)}
            </MonthYearCell>
          ))}
        </MonthYearGrid>
      </StyledCalendar>
    );
  };

  const renderYearPicker = () => {
    const years: CalendarYear[] = [];
    const currentYear = new Date().getFullYear();
    const selectedYear = currentValue
      ? new Date(currentValue).getFullYear()
      : -1;
    const startYear = Math.floor(calendar.viewDate.getFullYear() / 10) * 10;

    for (let i = 0; i < 12; i++) {
      const year = startYear + i;
      years.push({
        year,
        isSelected: selectedYear === year,
        isDisabled: false,
        isCurrent: year === currentYear,
      });
    }

    return (
      <StyledCalendar
        $size={mappedSize}
        $variant={variant}
        accessibility={personalizedProps.accessibility}
      >
        <CalendarHeader>
          <CalendarNav>
            <CalendarNavButton
              type="button"
              onClick={() => calendar.navigateDecade("prev")}
              aria-label="Previous decade"
            >
              <ChevronLeftIcon />
            </CalendarNavButton>
          </CalendarNav>

          <CalendarTitle>
            {startYear} - {startYear + 9}
          </CalendarTitle>

          <CalendarNav>
            <CalendarNavButton
              type="button"
              onClick={() => calendar.navigateDecade("next")}
              aria-label="Next decade"
            >
              <ChevronRightIcon />
            </CalendarNavButton>
          </CalendarNav>
        </CalendarHeader>

        <MonthYearGrid>
          {years.map((year) => (
            <MonthYearCell
              key={year.year}
              type="button"
              onClick={() => calendar.setYear(year.year)}
              $selected={year.isSelected}
              $disabled={year.isDisabled}
              $current={year.isCurrent}
              aria-label={`${year.year}`}
            >
              {year.year}
            </MonthYearCell>
          ))}
        </MonthYearGrid>
      </StyledCalendar>
    );
  };

  const renderTimePicker = () => {
    if (!showTime) return null;

    const timeConfig = typeof showTime === "object" ? showTime : {};
    const use12Hours = timeConfig.use12Hours || false;
    const hourStep = timeConfig.hourStep || 1;
    const minuteStep = timeConfig.minuteStep || 1;
    const secondStep = timeConfig.secondStep || 1;

    const hours = [];
    const minutes = [];
    const seconds = [];

    // Generate hours
    const maxHour = use12Hours ? 12 : 23;
    for (let i = 0; i <= maxHour; i += hourStep) {
      hours.push(i);
    }

    // Generate minutes
    for (let i = 0; i <= 59; i += minuteStep) {
      minutes.push(i);
    }

    // Generate seconds
    for (let i = 0; i <= 59; i += secondStep) {
      seconds.push(i);
    }

    return (
      <StyledTimePicker
        $size={mappedSize}
        $variant={variant}
        $use12Hours={use12Hours}
        accessibility={personalizedProps.accessibility}
      >
        <TimeColumn>
          <TimeColumnHeader>Hour</TimeColumnHeader>
          <TimeList>
            {hours.map((hour) => (
              <TimeItem
                key={hour}
                type="button"
                onClick={() => {
                  timePicker.setHour(hour);
                  handleTimeChange(
                    hour,
                    timePicker.selectedTime.minute,
                    timePicker.selectedTime.second
                  );
                }}
                $selected={timePicker.selectedTime.hour === hour}
                $disabled={disabledTime?.(new Date())
                  .disabledHours?.()
                  ?.includes(hour)}
              >
                {use12Hours
                  ? hour === 0
                    ? 12
                    : hour
                  : hour.toString().padStart(2, "0")}
              </TimeItem>
            ))}
          </TimeList>
        </TimeColumn>

        <TimeColumn>
          <TimeColumnHeader>Minute</TimeColumnHeader>
          <TimeList>
            {minutes.map((minute) => (
              <TimeItem
                key={minute}
                type="button"
                onClick={() => {
                  timePicker.setMinute(minute);
                  handleTimeChange(
                    timePicker.selectedTime.hour,
                    minute,
                    timePicker.selectedTime.second
                  );
                }}
                $selected={timePicker.selectedTime.minute === minute}
                $disabled={disabledTime?.(new Date())
                  .disabledMinutes?.(timePicker.selectedTime.hour)
                  ?.includes(minute)}
              >
                {minute.toString().padStart(2, "0")}
              </TimeItem>
            ))}
          </TimeList>
        </TimeColumn>

        <TimeColumn>
          <TimeColumnHeader>Second</TimeColumnHeader>
          <TimeList>
            {seconds.map((second) => (
              <TimeItem
                key={second}
                type="button"
                onClick={() => {
                  timePicker.setSecond(second);
                  handleTimeChange(
                    timePicker.selectedTime.hour,
                    timePicker.selectedTime.minute,
                    second
                  );
                }}
                $selected={timePicker.selectedTime.second === second}
                $disabled={disabledTime?.(new Date())
                  .disabledSeconds?.(
                    timePicker.selectedTime.hour,
                    timePicker.selectedTime.minute
                  )
                  ?.includes(second)}
              >
                {second.toString().padStart(2, "0")}
              </TimeItem>
            ))}
          </TimeList>
        </TimeColumn>

        {use12Hours && (
          <TimeColumn>
            <TimeColumnHeader>AM/PM</TimeColumnHeader>
            <TimeList>
              <TimeItem
                type="button"
                onClick={() => {
                  const newHour =
                    timePicker.selectedTime.hour < 12
                      ? timePicker.selectedTime.hour
                      : timePicker.selectedTime.hour - 12;
                  timePicker.setHour(newHour);
                  handleTimeChange(
                    newHour,
                    timePicker.selectedTime.minute,
                    timePicker.selectedTime.second
                  );
                }}
                $selected={timePicker.selectedTime.hour < 12}
              >
                AM
              </TimeItem>
              <TimeItem
                type="button"
                onClick={() => {
                  const newHour =
                    timePicker.selectedTime.hour >= 12
                      ? timePicker.selectedTime.hour
                      : timePicker.selectedTime.hour + 12;
                  timePicker.setHour(newHour);
                  handleTimeChange(
                    newHour,
                    timePicker.selectedTime.minute,
                    timePicker.selectedTime.second
                  );
                }}
                $selected={timePicker.selectedTime.hour >= 12}
              >
                PM
              </TimeItem>
            </TimeList>
          </TimeColumn>
        )}
      </StyledTimePicker>
    );
  };

  const renderPresets = () => {
    const allPresets = [...presets, ...COMMON_DATE_PRESETS];
    if (allPresets.length === 0) return null;

    return (
      <PresetPanel>
        {allPresets.map((preset, index) => (
          <StyledPreset
            key={index}
            type="button"
            onClick={() => handlePresetSelect(preset)}
            disabled={preset.disabled}
            $size={mappedSize}
            $variant={variant}
            $active={false} // Nota: El estado activo podría compararse con el valor seleccionado en el futuro
            accessibility={personalizedProps.accessibility}
            aria-label={`Select preset: ${preset.label}`}
          >
            {preset.label}
          </StyledPreset>
        ))}
      </PresetPanel>
    );
  };

  const renderFooter = () => {
    const hasFooter = showToday || showNow || showTime;
    if (!hasFooter) return null;

    return (
      <CalendarFooter>
        <FooterLeft>
          {showToday && (
            <TodayButton
              type="button"
              onClick={handleTodayClick}
              disabled={disabledDate?.(new Date())}
            >
              Today
            </TodayButton>
          )}
          {showNow && showTime && (
            <TodayButton
              type="button"
              onClick={() => {
                const now = new Date();
                timePicker.setSelectedTime({
                  hour: now.getHours(),
                  minute: now.getMinutes(),
                  second: now.getSeconds(),
                });
                handleTimeChange(
                  now.getHours(),
                  now.getMinutes(),
                  now.getSeconds()
                );
              }}
            >
              Now
            </TodayButton>
          )}
        </FooterLeft>

        <FooterRight>
          {showTime && (
            <OkButton type="button" onClick={handleOkClick} $variant={variant}>
              OK
            </OkButton>
          )}
        </FooterRight>
      </CalendarFooter>
    );
  };

  // =============================================================================
  // RENDER MAIN COMPONENT
  // =============================================================================

  const accessibilityMessage = getAccessibilityDateMessage(
    currentValue,
    mode,
    displayFormat
  );

  return (
    <DatePickerWrapper className={className} style={style}>
      <StyledDatePicker
        $size={mappedSize}
        $variant={variant}
        $status={status}
        $bordered={bordered}
        $disabled={disabled}
        $focused={isFocused}
        $hasValue={hasValue}
        $readOnly={readOnly}
        accessibility={personalizedProps.accessibility}
        onClick={handleInputClick}
        {...rest}
      >
        {prefix && <DatePickerPrefix>{prefix}</DatePickerPrefix>}

        <DatePickerInput
          ref={inputRef}
          type="text"
          value={inputValue}
          placeholder={
            typeof placeholder === "string" ? placeholder : "Select date"
          }
          disabled={disabled}
          readOnly={inputReadOnly || readOnly}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={handleInputKeyDown}
          id={id ? `date-picker-${id}` : undefined}
          name={name}
          aria-label={ariaLabel || accessibilityMessage}
          aria-describedby={ariaDescribedby}
          aria-required={ariaRequired}
          aria-invalid={ariaInvalid}
          role={role}
          tabIndex={tabIndex}
          aria-expanded={currentOpen}
          aria-haspopup="dialog"
        />

        {canClear && (
          <ClearButton
            type="button"
            onClick={handleClear}
            aria-label="Clear date"
            tabIndex={-1}
          >
            {clearIcon || <CloseIcon />}
          </ClearButton>
        )}

        {suffix && <DatePickerSuffix>{suffix}</DatePickerSuffix>}

        <DatePickerIcon>
          {suffixIcon || (mode === "time" ? <ClockIcon /> : <CalendarIcon />)}
        </DatePickerIcon>
      </StyledDatePicker>

      {currentOpen && (
        <StyledDropdown
          ref={dropdownRef}
          $placement={placement}
          $size={mappedSize}
          $variant={variant}
          accessibility={personalizedProps.accessibility}
          className={dropdownClassName}
          style={dropdownStyle}
          role="dialog"
          aria-label="Date picker"
        >
          <DropdownContent>
            {renderPresets()}
            <CalendarPanel>
              {renderCalendar()}
              {renderTimePicker()}
              {renderFooter()}
            </CalendarPanel>
          </DropdownContent>
        </StyledDropdown>
      )}
    </DatePickerWrapper>
  );
};

// =============================================================================
// RANGE PICKER COMPONENT
// =============================================================================

export const RangePicker: React.FC<RangePickerProps> = ({
  value,
  defaultValue,
  onChange,
  placeholder = ["Start date", "End date"],
  separator,
  allowEmpty = [false, false],
  onCalendarChange,
  ...props
}) => {
  const [internalValue, setInternalValue] = useState<RangeValue>(
    defaultValue || null
  );
  const [activeInput, setActiveInput] = useState<"start" | "end">("start");

  const currentValue = value !== undefined ? value : internalValue;
  const [startValue, endValue] = currentValue || [null, null];

  const handleDateSelect = useCallback(
    (date: DatePickerValue, dateString: string | [string, string]) => {
      if (!date || Array.isArray(date)) return;

      const newValue: RangeValue =
        activeInput === "start"
          ? [date as DateValue, endValue]
          : [startValue, date as DateValue];

      // Ensure start is before end
      if (newValue[0] && newValue[1] && newValue[0] > newValue[1]) {
        newValue.reverse();
      }

      if (value === undefined) {
        setInternalValue(newValue);
      }

      onChange?.(newValue, [
        formatDate(newValue[0], props.format as string),
        formatDate(newValue[1], props.format as string),
      ]);

      // Switch to end input after selecting start
      if (activeInput === "start" && newValue[0]) {
        setActiveInput("end");
      }
    },
    [activeInput, startValue, endValue, value, onChange, props.format]
  );

  return (
    <DatePicker
      {...props}
      value={activeInput === "start" ? startValue : endValue}
      onChange={handleDateSelect}
      placeholder={activeInput === "start" ? placeholder[0] : placeholder[1]}
      suffix={
        <>
          {separator || <RangeSeparator>~</RangeSeparator>}
          <DatePickerInput
            type="text"
            value={formatDate(endValue, props.format as string)}
            placeholder={placeholder[1]}
            onFocus={() => setActiveInput("end")}
            readOnly
          />
        </>
      }
    />
  );
};

// =============================================================================
// PREDEFINED COMPONENTS
// =============================================================================

// Variants
export const PrimaryDatePicker: React.FC<Omit<DatePickerProps, "variant">> = (
  props
) => <DatePicker {...props} variant="primary" />;

export const SuccessDatePicker: React.FC<Omit<DatePickerProps, "variant">> = (
  props
) => <DatePicker {...props} variant="success" />;

export const WarningDatePicker: React.FC<Omit<DatePickerProps, "variant">> = (
  props
) => <DatePicker {...props} variant="warning" />;

export const ErrorDatePicker: React.FC<Omit<DatePickerProps, "variant">> = (
  props
) => <DatePicker {...props} variant="error" />;

export const SecondaryDatePicker: React.FC<Omit<DatePickerProps, "variant">> = (
  props
) => <DatePicker {...props} variant="secondary" />;

// Sizes
export const SmallDatePicker: React.FC<Omit<DatePickerProps, "size">> = (
  props
) => <DatePicker {...props} size="sm" />;

export const LargeDatePicker: React.FC<Omit<DatePickerProps, "size">> = (
  props
) => <DatePicker {...props} size="lg" />;

// Modes
export const TimePicker: React.FC<Omit<DatePickerProps, "mode">> = (props) => (
  <DatePicker {...props} mode="time" picker="date" showTime />
);

export const DateTimePicker: React.FC<Omit<DatePickerProps, "mode">> = (
  props
) => <DatePicker {...props} mode="datetime" showTime />;

export const MonthPicker: React.FC<Omit<DatePickerProps, "mode">> = (props) => (
  <DatePicker {...props} mode="month" picker="month" />
);

export const YearPicker: React.FC<Omit<DatePickerProps, "mode">> = (props) => (
  <DatePicker {...props} mode="year" picker="year" />
);

// Specific Use Cases
export const BirthdayPicker: React.FC<Omit<DatePickerProps, "disabledDate">> = (
  props
) => (
  <DatePicker
    {...props}
    disabledDate={(date) => date > new Date()}
    placeholder="Select birthday"
    showToday={false}
  />
);

export const FutureDatePicker: React.FC<
  Omit<DatePickerProps, "disabledDate">
> = (props) => (
  <DatePicker
    {...props}
    disabledDate={(date) => date < new Date()}
    placeholder="Select future date"
  />
);

export const BusinessDatePicker: React.FC<DatePickerProps> = (props) => (
  <DatePicker
    {...props}
    disabledDate={(date) => {
      const day = date.getDay();
      return day === 0 || day === 6; // Disable weekends
    }}
    placeholder="Select business date"
  />
);

export const CompactDatePicker: React.FC<DatePickerProps> = (props) => (
  <DatePicker {...props} size="sm" bordered={false} />
);

export const ClearableDatePicker: React.FC<DatePickerProps> = (props) => (
  <DatePicker {...props} allowClear showToday />
);

export const ReadOnlyDatePicker: React.FC<DatePickerProps> = (props) => (
  <DatePicker {...props} readOnly bordered={false} />
);

// Export default
export default DatePicker;
