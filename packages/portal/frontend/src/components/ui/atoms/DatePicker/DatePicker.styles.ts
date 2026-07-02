import styled, { css, keyframes } from "styled-components";
import { useThemeColors } from "../../../../hooks/useThemeColors";
import { createShouldForwardProp } from "../../../../utils/shouldForwardProp";
import {
  StyledDatePickerProps,
  StyledDropdownProps,
  StyledCalendarProps,
  StyledDateCellProps,
  StyledTimePickerProps,
  StyledPresetProps,
  DatePickerSize,
  DatePickerVariant,
  DatePickerStatus,
  DatePickerPlacement,
} from "./DatePicker.types";

// =============================================================================
// ANIMATIONS
// =============================================================================

const dropdownSlideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const dropdownSlideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const datePickerFocus = keyframes`
  0% {
    box-shadow: 0 0 0 0 var(--focus-color);
  }
  100% {
    box-shadow: 0 0 0 2px var(--focus-color);
  }
`;

const calendarSlide = keyframes`
  from {
    opacity: 0;
    transform: translateX(10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const dateSelection = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

const timePickerSpin = keyframes`
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(360deg);
  }
`;

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

const fallbackColors = {
  primary: {
    50: "#e6f7ff",
    100: "#bae7ff",
    200: "#91d5ff",
    300: "#69c0ff",
    400: "#40a9ff",
    500: "#1890ff",
    600: "#096dd9",
    700: "#0050b3",
    800: "#003a8c",
    900: "#002766",
  },
  secondary: {
    50: "#f9f0ff",
    100: "#efdbff",
    200: "#d3adf7",
    300: "#b37feb",
    400: "#9254de",
    500: "#722ed1",
    600: "#531dab",
    700: "#391085",
    800: "#22075e",
    900: "#120338",
  },
  tertiary: {
    50: "#fff7e6",
    100: "#ffe7ba",
    200: "#ffd591",
    300: "#ffc069",
    400: "#ffa940",
    500: "#fa8c16",
    600: "#d46b08",
    700: "#ad4e00",
    800: "#873800",
    900: "#612500",
  },
  background: {
    primary: "#ffffff",
    secondary: "#f5f5f5",
    surface: "#ffffff",
    tertiary: "#f0f0f0",
    card: "#ffffff",
    backgroundLayout: "#ffffff",
  },
  text: {
    primary: "#333333",
    secondary: "#666666",
    tertiary: "#999999",
    inverse: "#ffffff",
  },
  border: {
    light: "#f0f0f0",
    normal: "#d9d9d9",
    dark: "#bfbfbf",
    medium: "#d9d9d9",
  },
  success: {
    50: "#f6ffed",
    100: "#d9f7be",
    200: "#b7eb8f",
    300: "#95de64",
    400: "#73d13d",
    500: "#52c41a",
    600: "#389e0d",
    700: "#237804",
    800: "#135200",
    900: "#092b00",
  },
  warning: {
    50: "#fffbe6",
    100: "#fff1b8",
    200: "#ffe58f",
    300: "#ffd666",
    400: "#ffc53d",
    500: "#faad14",
    600: "#d48806",
    700: "#ad6800",
    800: "#874d00",
    900: "#613400",
  },
  error: {
    50: "#fff2f0",
    100: "#ffccc7",
    200: "#ffa39e",
    300: "#ff7875",
    400: "#ff4d4f",
    500: "#f5222d",
    600: "#cf1322",
    700: "#a8071a",
    800: "#820014",
    900: "#5c0011",
  },
  info: {
    50: "#e6f4ff",
    100: "#bae0ff",
    200: "#91caff",
    300: "#69b1ff",
    400: "#4096ff",
    500: "#1677ff",
    600: "#0958d9",
    700: "#003eb3",
    800: "#002c8c",
    900: "#001d66",
  },
  shadow: {
    sm: "0 1px 3px rgba(0,0,0,0.12)",
    md: "0 4px 6px rgba(0,0,0,0.12)",
    lg: "0 10px 20px rgba(0,0,0,0.12)",
    xl: "0 16px 24px rgba(0,0,0,0.16)",
    light: "0 1px 3px rgba(0,0,0,0.12)",
    medium: "0 4px 6px rgba(0,0,0,0.12)",
    heavy: "0 10px 20px rgba(0,0,0,0.16)",
  },
  gradients: {
    primary: "linear-gradient(135deg, #1890ff 0%, #096dd9 100%)",
    secondary: "linear-gradient(135deg, #722ed1 0%, #531dab 100%)",
    card: "linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)",
    hero: "linear-gradient(135deg, #1890ff 0%, #722ed1 100%)",
  },
  overlay: "rgba(0, 0, 0, 0.7)",
} as const;

const resolveThemeColors = () => {
  const colors = useThemeColors();
  if (
    colors &&
    colors.primary &&
    colors.background &&
    colors.text &&
    colors.border
  ) {
    return colors;
  }
  return fallbackColors;
};

const getDatePickerDimensions = (size: DatePickerSize) => {
  const dimensions = {
    xs: {
      height: "28px",
      padding: "4px 8px",
      fontSize: "12px",
      iconSize: "12px",
      borderRadius: "4px",
    },
    sm: {
      height: "32px",
      padding: "6px 12px",
      fontSize: "14px",
      iconSize: "14px",
      borderRadius: "6px",
    },
    md: {
      height: "36px",
      padding: "8px 16px",
      fontSize: "16px",
      iconSize: "16px",
      borderRadius: "8px",
    },
    lg: {
      height: "40px",
      padding: "10px 20px",
      fontSize: "18px",
      iconSize: "18px",
      borderRadius: "10px",
    },
    xl: {
      height: "44px",
      padding: "12px 24px",
      fontSize: "20px",
      iconSize: "20px",
      borderRadius: "12px",
    },
    xxl: {
      height: "48px",
      padding: "14px 28px",
      fontSize: "22px",
      iconSize: "22px",
      borderRadius: "14px",
    },
  } as const;

  // Type-safe access with fallback
  return dimensions[size as keyof typeof dimensions] || dimensions.md;
};

const getDatePickerColors = (
  variant: DatePickerVariant,
  status: DatePickerStatus,
  colors: ReturnType<typeof useThemeColors>
) => {
  const baseColors = {
    border: colors.border?.normal || "#d9d9d9",
    background: colors.background?.primary || "#ffffff",
    text: colors.text?.primary || "#333333",
    placeholder: colors.text?.tertiary || "#999999",
    focus: colors.primary?.[500] || "#1890ff",
  };

  // Status colors
  if (status === "success") {
    return {
      ...baseColors,
      border: colors.success?.[500] || "#52c41a",
      focus: colors.success?.[500] || "#52c41a",
    };
  }

  if (status === "warning") {
    return {
      ...baseColors,
      border: colors.warning?.[500] || "#faad14",
      focus: colors.warning?.[500] || "#faad14",
    };
  }

  if (status === "error") {
    return {
      ...baseColors,
      border: colors.error?.[500] || "#ff4d4f",
      focus: colors.error?.[500] || "#ff4d4f",
    };
  }

  if (status === "validating") {
    return {
      ...baseColors,
      border: colors.primary?.[400] || "#40a9ff",
      focus: colors.primary?.[400] || "#40a9ff",
    };
  }

  // Variant colors
  if (variant === "primary") {
    return {
      ...baseColors,
      border: colors.primary?.[500] || "#1890ff",
      focus: colors.primary?.[500] || "#1890ff",
    };
  }

  return baseColors;
};

const getCalendarColors = (
  variant: DatePickerVariant,
  colors: ReturnType<typeof useThemeColors>
) => {
  return {
    background: colors.background?.primary || "#ffffff",
    border: colors.border?.normal || "#d9d9d9",
    header: colors.background?.secondary || "#fafafa",
    today: colors.primary?.[100] || "#e6f7ff",
    selected: colors.primary?.[500] || "#1890ff",
    selectedText: colors.background?.primary || "#ffffff",
    hover: colors.primary?.[100] || "#e6f7ff",
    disabled: colors.text?.tertiary || "#d9d9d9",
    weekend: colors.text?.secondary || "#666666",
    inRange: colors.primary?.[50] || "#f0f8ff",
    rangeHover: colors.primary?.[100] || "#e6f7ff",
  };
};

const getDropdownPlacement = (placement: DatePickerPlacement) => {
  const placements = {
    topLeft: css`
      bottom: 100%;
      left: 0;
      margin-bottom: 4px;
      transform-origin: bottom left;
      animation: ${dropdownSlideUp} 0.2s ease-out;
    `,
    topRight: css`
      bottom: 100%;
      right: 0;
      margin-bottom: 4px;
      transform-origin: bottom right;
      animation: ${dropdownSlideUp} 0.2s ease-out;
    `,
    bottomLeft: css`
      top: 100%;
      left: 0;
      margin-top: 4px;
      transform-origin: top left;
      animation: ${dropdownSlideDown} 0.2s ease-out;
    `,
    bottomRight: css`
      top: 100%;
      right: 0;
      margin-top: 4px;
      transform-origin: top right;
      animation: ${dropdownSlideDown} 0.2s ease-out;
    `,
    top: css`
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      margin-bottom: 4px;
      transform-origin: bottom center;
      animation: ${dropdownSlideUp} 0.2s ease-out;
    `,
    bottom: css`
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      margin-top: 4px;
      transform-origin: top center;
      animation: ${dropdownSlideDown} 0.2s ease-out;
    `,
  };

  return placements[placement] || placements.bottomLeft;
};

// =============================================================================
// MAIN COMPONENTS
// =============================================================================

export const DatePickerWrapper = styled.div<{ $width?: string }>`
  position: relative;
  display: inline-block;
  width: ${({ $width }) => $width || "auto"};
  font-family: inherit;
`;

export const StyledDatePicker = styled.div<StyledDatePickerProps>`
  ${({
    $size,
    $variant,
    $status,
    $bordered,
    $disabled,
    $focused,
    $hasValue,
    $readOnly,
    accessibility,
  }) => {
    const colors = resolveThemeColors();
    const dimensions = getDatePickerDimensions($size);
    const datePickerColors = getDatePickerColors($variant, $status, colors);

    return css`
      position: relative;
      display: inline-flex;
      align-items: center;
      width: 100%;
      min-height: ${dimensions.height};
      padding: ${dimensions.padding};
      font-size: ${dimensions.fontSize};
      line-height: 1.5;
      background: ${$disabled ? "#f5f5f5" : datePickerColors.background};
      border: ${$bordered
        ? `1px solid ${$disabled ? "#d9d9d9" : datePickerColors.border}`
        : "none"};
      border-radius: ${dimensions.borderRadius};
      cursor: ${$disabled ? "not-allowed" : $readOnly ? "default" : "pointer"};
      transition: all 0.2s ease-in-out;

      ${$focused &&
      !$disabled &&
      css`
        --focus-color: ${datePickerColors.focus}40;
        border-color: ${datePickerColors.focus};
        outline: none;
        animation: ${datePickerFocus} 0.2s ease-out forwards;
      `}

      &:hover {
        ${!$disabled &&
        !$readOnly &&
        css`
          border-color: ${datePickerColors.focus};
        `}
      }

      // Accessibility
      ${accessibility?.largeText &&
      css`
        font-size: calc(${dimensions.fontSize} * 1.2);
      `}

      ${accessibility?.increasedSpacing &&
      css`
        padding: calc(${dimensions.padding.split(" ")[0]} * 1.5)
          calc(${dimensions.padding.split(" ")[1]} * 1.5);
      `}
      
      ${accessibility?.highContrast &&
      css`
        border-width: 2px;
        border-color: ${$focused ? "#000000" : "#666666"};
      `}
      
      ${accessibility?.reducedMotion &&
      css`
        transition: none;
        animation: none;
      `}
      
      // Responsive
      @media (max-width: 768px) {
        font-size: calc(${dimensions.fontSize} * 0.9);
        padding: calc(${dimensions.padding.split(" ")[0]} * 0.8)
          calc(${dimensions.padding.split(" ")[1]} * 0.8);
      }
    `;
  }}
`;

export const DatePickerInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  color: inherit;
  font-size: inherit;
  line-height: inherit;
  cursor: inherit;

  &::placeholder {
    color: var(--placeholder-color, #999999);
    opacity: 1;
  }

  &:disabled {
    cursor: not-allowed;
    color: #999999;
  }

  &:read-only {
    cursor: default;
  }
`;

export const DatePickerPrefix = styled.span`
  display: flex;
  align-items: center;
  margin-right: 8px;
  color: var(--prefix-color, #666666);
`;

export const DatePickerSuffix = styled.span`
  display: flex;
  align-items: center;
  margin-left: 8px;
  color: var(--suffix-color, #666666);
`;

export const DatePickerIcon = styled.span<{ $clickable?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  cursor: ${({ $clickable }) => ($clickable ? "pointer" : "default")};
  transition: color 0.2s ease-in-out;

  &:hover {
    ${({ $clickable }) =>
      $clickable &&
      css`
        color: var(--icon-hover-color, #1890ff);
      `}
  }
`;

export const ClearButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  padding: 0;
  margin-left: 4px;
  border: none;
  background: transparent;
  color: #999999;
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: #f0f0f0;
    color: #666666;
  }

  &:focus {
    outline: 2px solid var(--focus-color, #1890ff);
    outline-offset: 1px;
  }
`;

export const RangeSeparator = styled.span`
  margin: 0 8px;
  color: var(--separator-color, #999999);
  user-select: none;
`;

// =============================================================================
// DROPDOWN COMPONENTS
// =============================================================================

export const StyledDropdown = styled.div<StyledDropdownProps>`
  ${({ $placement, $size, $variant, accessibility }) => {
    const colors = resolveThemeColors();
    const calendarColors = getCalendarColors($variant, colors);

    return css`
      position: absolute;
      z-index: 1050;
      min-width: 280px;
      background: ${calendarColors.background};
      border: 1px solid ${calendarColors.border};
      border-radius: 8px;
      box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08),
        0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
      font-size: 14px;
      line-height: 1.5;

      ${getDropdownPlacement($placement)}

      // Accessibility
      ${accessibility?.reducedMotion &&
      css`
        animation: none;
      `}
      
      // Responsive
      @media (max-width: 768px) {
        min-width: 260px;
        max-width: calc(100% - 32px); // Usar 100% en lugar de 100vw para evitar overflow
      }
    `;
  }}
`;

export const DropdownContent = styled.div`
  display: flex;
  min-height: 280px;
`;

export const PresetPanel = styled.div`
  width: 120px;
  border-right: 1px solid var(--border-color, #f0f0f0);
  padding: 8px 0;
  background: var(--preset-bg, #fafafa);
`;

export const CalendarPanel = styled.div`
  flex: 1;
  padding: 16px;
`;

// =============================================================================
// CALENDAR COMPONENTS
// =============================================================================

export const StyledCalendar = styled.div<StyledCalendarProps>`
  ${({ $size, $variant, accessibility }) => {
    return css`
      width: 100%;
      font-size: 14px;
      line-height: 1.5;
      color: var(--text-color, #000000);

      // Accessibility
      ${accessibility?.largeText &&
      css`
        font-size: 16px;
      `}

      ${accessibility?.increasedSpacing &&
      css`
        padding: 8px;
      `}
    `;
  }}
`;

export const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  padding: 0 8px;
`;

export const CalendarTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background: var(--hover-bg, #f0f0f0);
  }
`;

export const CalendarNav = styled.div`
  display: flex;
  gap: 4px;
`;

export const CalendarNavButton = styled.button<{ $disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  border: none;
  background: transparent;
  color: ${({ $disabled }) => ($disabled ? "#d9d9d9" : "#666666")};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  border-radius: 4px;
  transition: all 0.2s ease-in-out;

  &:hover:not(:disabled) {
    background: var(--nav-hover-bg, #f0f0f0);
    color: var(--nav-hover-color, #333333);
  }

  &:focus {
    outline: 2px solid var(--focus-color, #1890ff);
    outline-offset: 1px;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

export const CalendarGrid = styled.div`
  width: 100%;
  border-collapse: collapse;
`;

export const CalendarWeekHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  margin-bottom: 8px;
`;

export const CalendarWeekDay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  font-size: 12px;
  font-weight: 600;
  color: var(--weekday-color, #666666);
  text-transform: uppercase;
`;

export const CalendarWeek = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  margin-bottom: 1px;
`;

export const CalendarDateCell = styled.button<StyledDateCellProps>`
  ${({
    $inCurrentMonth,
    $isToday,
    $isSelected,
    $isInRange,
    $isRangeStart,
    $isRangeEnd,
    $isDisabled,
    $isWeekend,
    $isHoliday,
    accessibility,
  }) => {
    const colors = resolveThemeColors();
    const calendarColors = getCalendarColors("default", colors);

    return css`
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      padding: 0;
      border: none;
      background: transparent;
      color: ${$inCurrentMonth ? "inherit" : "#d9d9d9"};
      font-size: 14px;
      cursor: ${$isDisabled ? "not-allowed" : "pointer"};
      border-radius: 4px;
      position: relative;
      transition: all 0.2s ease-in-out;

      // States
      ${$isToday &&
      css`
        border: 1px solid ${calendarColors.selected};
        font-weight: 600;
      `}

      ${$isSelected &&
      css`
        background: ${calendarColors.selected};
        color: ${calendarColors.selectedText};
        font-weight: 600;
        animation: ${dateSelection} 0.3s ease-out;
      `}
      
      ${$isInRange &&
      !$isSelected &&
      css`
        background: ${calendarColors.inRange};
        color: ${calendarColors.selected};
      `}
      
      ${($isRangeStart || $isRangeEnd) &&
      css`
        background: ${calendarColors.selected};
        color: ${calendarColors.selectedText};
        font-weight: 600;
      `}
      
      ${$isDisabled &&
      css`
        color: ${calendarColors.disabled};
        background: transparent;
        cursor: not-allowed;
        opacity: 0.5;
      `}
      
      ${$isWeekend &&
      $inCurrentMonth &&
      !$isDisabled &&
      css`
        color: ${calendarColors.weekend};
      `}
      
      ${$isHoliday &&
      css`
        color: var(--holiday-color, #ff4d4f);
        font-weight: 600;
      `}
      
      &:hover:not(:disabled) {
        ${!$isSelected &&
        css`
          background: ${$isInRange
            ? calendarColors.rangeHover
            : calendarColors.hover};
          color: ${calendarColors.selected};
        `}
      }

      &:focus {
        outline: 2px solid ${calendarColors.selected};
        outline-offset: 1px;
        z-index: 1;
      }

      // Accessibility
      ${accessibility?.largeText &&
      css`
        font-size: 16px;
        width: 36px;
        height: 36px;
      `}

      ${accessibility?.increasedSpacing &&
      css`
        margin: 2px;
      `}
      
      ${accessibility?.highContrast &&
      css`
        border: 1px solid transparent;

        ${$isSelected &&
        css`
          border-color: #000000;
          background: #000000;
          color: #ffffff;
        `}

        &:focus {
          outline: 3px solid #000000;
          outline-offset: 2px;
        }
      `}
      
      ${accessibility?.reducedMotion &&
      css`
        transition: none;
        animation: none;
      `}
    `;
  }}
`;

// =============================================================================
// TIME PICKER COMPONENTS
// =============================================================================

export const StyledTimePicker = styled.div<StyledTimePickerProps>`
  ${({ $size, $variant, $use12Hours, accessibility }) => {
    return css`
      display: flex;
      border-top: 1px solid var(--border-color, #f0f0f0);
      padding: 16px;
      gap: 8px;

      // Accessibility
      ${accessibility?.increasedSpacing &&
      css`
        padding: 20px;
        gap: 12px;
      `}
    `;
  }}
`;

export const TimeColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TimeColumnHeader = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: var(--time-header-color, #666666);
  margin-bottom: 8px;
  text-transform: uppercase;
`;

export const TimeList = styled.div`
  max-height: 144px;
  overflow-y: auto;
  border: 1px solid var(--border-color, #f0f0f0);
  border-radius: 4px;
  background: var(--time-list-bg, #ffffff);
`;

export const TimeItem = styled.button<{
  $selected?: boolean;
  $disabled?: boolean;
}>`
  display: block;
  width: 100%;
  padding: 4px 12px;
  border: none;
  background: ${({ $selected }) =>
    $selected ? "var(--selected-bg, #1890ff)" : "transparent"};
  color: ${({ $selected, $disabled }) =>
    $disabled
      ? "var(--disabled-color, #d9d9d9)"
      : $selected
      ? "var(--selected-text, #ffffff)"
      : "inherit"};
  font-size: 14px;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s ease-in-out;

  &:hover:not(:disabled) {
    background: ${({ $selected }) =>
      $selected
        ? "var(--selected-hover-bg, #40a9ff)"
        : "var(--hover-bg, #f0f0f0)"};
  }

  &:focus {
    outline: 2px solid var(--focus-color, #1890ff);
    outline-offset: -2px;
  }
`;

// =============================================================================
// PRESET COMPONENTS
// =============================================================================

export const StyledPreset = styled.button<StyledPresetProps>`
  ${({ $size, $variant, $active, accessibility }) => {
    return css`
      display: block;
      width: 100%;
      padding: 8px 16px;
      border: none;
      background: ${$active
        ? "var(--active-preset-bg, #e6f7ff)"
        : "transparent"};
      color: ${$active ? "var(--active-preset-color, #1890ff)" : "inherit"};
      font-size: 14px;
      text-align: left;
      cursor: pointer;
      border-radius: 4px;
      margin: 1px 8px;
      transition: all 0.2s ease-in-out;

      &:hover {
        background: ${$active
          ? "var(--active-preset-hover, #bae7ff)"
          : "var(--preset-hover-bg, #f0f0f0)"};
      }

      &:focus {
        outline: 2px solid var(--focus-color, #1890ff);
        outline-offset: 1px;
      }

      // Accessibility
      ${accessibility?.largeText &&
      css`
        font-size: 16px;
      `}

      ${accessibility?.increasedSpacing &&
      css`
        padding: 12px 20px;
      `}
      
      ${accessibility?.highContrast &&
      css`
        border: 1px solid transparent;

        ${$active &&
        css`
          border-color: #000000;
          background: #000000;
          color: #ffffff;
        `}
      `}
    `;
  }}
`;

// =============================================================================
// FOOTER COMPONENTS
// =============================================================================

export const CalendarFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-top: 1px solid var(--border-color, #f0f0f0);
  background: var(--footer-bg, #fafafa);
`;

export const FooterLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const FooterRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const TodayButton = styled.button`
  padding: 4px 8px;
  border: none;
  background: transparent;
  color: var(--today-color, #1890ff);
  font-size: 14px;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: var(--today-hover-bg, #e6f7ff);
  }

  &:focus {
    outline: 2px solid var(--focus-color, #1890ff);
    outline-offset: 1px;
  }

  &:disabled {
    color: var(--disabled-color, #d9d9d9);
    cursor: not-allowed;
  }
`;

export const OkButton = styled.button.withConfig({
  shouldForwardProp: createShouldForwardProp(["$variant"]),
})<{ $variant?: DatePickerVariant }>`
  ${({ $variant }) => {
    const colors = resolveThemeColors();
    const primaryColor = colors.primary?.[500] || "#1890ff";

    return css`
      padding: 6px 16px;
      border: 1px solid ${primaryColor};
      background: ${primaryColor};
      color: #ffffff;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      border-radius: 4px;
      transition: all 0.2s ease-in-out;

      &:hover {
        background: ${colors.primary?.[600] || "#096dd9"};
        border-color: ${colors.primary?.[600] || "#096dd9"};
      }

      &:focus {
        outline: 2px solid ${primaryColor}40;
        outline-offset: 2px;
      }

      &:disabled {
        background: #f5f5f5;
        border-color: #d9d9d9;
        color: #00000040;
        cursor: not-allowed;
      }
    `;
  }}
`;

// =============================================================================
// MONTH/YEAR PICKER COMPONENTS
// =============================================================================

export const MonthYearGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  padding: 16px;
  animation: ${calendarSlide} 0.2s ease-out;
`;

export const MonthYearCell = styled.button<{
  $selected?: boolean;
  $disabled?: boolean;
  $current?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  padding: 8px;
  border: 1px solid transparent;
  background: transparent;
  color: inherit;
  font-size: 14px;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  border-radius: 8px;
  transition: all 0.2s ease-in-out;

  ${({ $current }) =>
    $current &&
    css`
      border-color: var(--current-border, #1890ff);
      font-weight: 600;
    `}

  ${({ $selected }) =>
    $selected &&
    css`
      background: var(--selected-bg, #1890ff);
      color: var(--selected-text, #ffffff);
      font-weight: 600;
    `}
  
  ${({ $disabled }) =>
    $disabled &&
    css`
      color: var(--disabled-color, #d9d9d9);
      cursor: not-allowed;
      opacity: 0.5;
    `}
  
  &:hover:not(:disabled) {
    ${({ $selected }) =>
      !$selected &&
      css`
        background: var(--hover-bg, #f0f0f0);
      `}
  }

  &:focus {
    outline: 2px solid var(--focus-color, #1890ff);
    outline-offset: 1px;
  }
`;

// =============================================================================
// LOADING AND EMPTY STATES
// =============================================================================

export const LoadingSpinner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;

  &::after {
    content: "";
    width: 16px;
    height: 16px;
    border: 2px solid var(--spinner-color, #f0f0f0);
    border-top-color: var(--spinner-active, #1890ff);
    border-radius: 50%;
    animation: ${timePickerSpin} 1s linear infinite;
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  color: var(--empty-color, #999999);
  font-size: 14px;
  text-align: center;
`;

// =============================================================================
// PREDEFINED VARIANTS
// =============================================================================

export const PrimaryDatePicker = styled(StyledDatePicker).attrs({
  $variant: "primary",
})``;
export const SuccessDatePicker = styled(StyledDatePicker).attrs({
  $variant: "success",
})``;
export const WarningDatePicker = styled(StyledDatePicker).attrs({
  $variant: "warning",
})``;
export const ErrorDatePicker = styled(StyledDatePicker).attrs({
  $variant: "error",
})``;
export const SecondaryDatePicker = styled(StyledDatePicker).attrs({
  $variant: "secondary",
})``;

export const CompactDatePicker = styled(StyledDatePicker).attrs({
  $size: "sm",
})``;
export const LargeDatePicker = styled(StyledDatePicker).attrs({
  $size: "lg",
})``;

export const BorderlessDatePicker = styled(StyledDatePicker).attrs({
  $bordered: false,
})``;
export const ReadOnlyDatePicker = styled(StyledDatePicker).attrs({
  $readOnly: true,
})``;

export const RoundedDatePicker = styled(StyledDatePicker)`
  border-radius: 20px;

  ${DatePickerInput} {
    border-radius: inherit;
  }
`;

export const ElevatedDatePicker = styled(StyledDatePicker)`
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border: none;

  &:focus-within {
    box-shadow: 0 4px 16px rgba(24, 144, 255, 0.25);
  }
`;
