import styled, { css } from "styled-components";
import { StyledCalendarProps } from "./Calendar.types";

// =====================================
// CALENDAR STYLED COMPONENTS
// =====================================

export const CalendarContainer = styled.div<StyledCalendarProps>`
  background: ${({ theme }) => theme.colors?.background?.card || "#fff"};
  border: 1px solid ${({ theme }) => theme.colors?.border?.light || "#f0f0f0"};
  border-radius: ${({ theme }) => theme.borderRadius?.md || "8px"};
  padding: ${({ theme }) => theme.spacing?.md || "12px"};

  ${({ accessibility }) =>
    accessibility?.highContrast &&
    css`
      border: 2px solid
        ${({ theme }) => theme.colors?.border?.normal || "#d9d9d9"};
    `}
`;

export const CalendarHeader = styled.div<StyledCalendarProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing?.md || "12px"};
  border-bottom: 1px solid
    ${({ theme }) => theme.colors?.border?.light || "#f0f0f0"};
  margin-bottom: ${({ theme }) => theme.spacing?.md || "12px"};
`;

export const CalendarHeaderButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing?.sm || "8px"};
  align-items: center;
`;

export const CalendarNavButton = styled.button<StyledCalendarProps>`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors?.border?.normal || "#d9d9d9"};
  border-radius: ${({ theme }) => theme.borderRadius?.sm || "4px"};
  padding: ${({ $size }) => {
    const sizeMap: Record<string, string> = {
      sm: "4px 8px",
      md: "6px 12px",
      lg: "8px 16px",
    };
    return sizeMap[$size || "md"];
  }};
  cursor: pointer;
  font-size: ${({ theme, $size }) => {
    const sizeMap: Record<string, string> = {
      sm: theme.typography?.fontSize?.sm || "12px",
      md: theme.typography?.fontSize?.md || "14px",
      lg: theme.typography?.fontSize?.lg || "16px",
    };
    return sizeMap[$size || "md"];
  }};
  color: ${({ theme }) => theme.colors?.text?.primary || "#000"};
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: ${({ theme }) =>
      theme.colors?.background?.secondary || "#f5f5f5"};
    border-color: ${({ theme }) => theme.colors?.primary?.[500] || "#1890ff"};
  }

  &:focus {
    outline: 2px solid
      ${({ theme }) => theme.colors?.primary?.[500] || "#1890ff"};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const CalendarTitle = styled.div<StyledCalendarProps>`
  font-size: ${({ theme, $size }) => {
    const sizeMap: Record<string, string> = {
      sm: theme.typography?.fontSize?.md || "14px",
      md: theme.typography?.fontSize?.lg || "16px",
      lg: theme.typography?.fontSize?.xl || "18px",
    };
    return sizeMap[$size || "md"];
  }};
  font-weight: ${({ theme }) => theme.typography?.fontWeight?.semibold || 600};
  color: ${({ theme }) => theme.colors?.text?.primary || "#000"};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors?.primary?.[500] || "#1890ff"};
  }
`;

export const CalendarBody = styled.div<StyledCalendarProps>`
  padding: ${({ theme }) => theme.spacing?.sm || "8px"};
`;

export const CalendarWeekDays = styled.div<StyledCalendarProps>`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: ${({ theme }) => theme.spacing?.xs || "4px"};
  margin-bottom: ${({ theme }) => theme.spacing?.sm || "8px"};
`;

export const CalendarWeekDay = styled.div<StyledCalendarProps>`
  text-align: center;
  font-size: ${({ theme, $size }) => {
    const sizeMap: Record<string, string> = {
      sm: theme.typography?.fontSize?.xs || "11px",
      md: theme.typography?.fontSize?.sm || "12px",
      lg: theme.typography?.fontSize?.md || "14px",
    };
    return sizeMap[$size || "md"];
  }};
  font-weight: ${({ theme }) => theme.typography?.fontWeight?.medium || 500};
  color: ${({ theme }) => theme.colors?.text?.secondary || "#8c8c8c"};
  padding: ${({ theme }) => theme.spacing?.xs || "4px"};
`;

export const CalendarDays = styled.div<StyledCalendarProps>`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: ${({ theme }) => theme.spacing?.xs || "4px"};
`;

export const CalendarDay = styled.button<
  StyledCalendarProps & {
    $isToday?: boolean;
    $isSelected?: boolean;
    $isCurrentMonth?: boolean;
    $isDisabled?: boolean;
  }
>`
  aspect-ratio: 1;
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.borderRadius?.sm || "4px"};
  background: ${({ theme, $isSelected }) =>
    $isSelected ? theme.colors?.primary?.[500] || "#1890ff" : "transparent"};
  color: ${({ theme, $isSelected, $isCurrentMonth, $isDisabled }) => {
    if ($isDisabled) return theme.colors?.text?.tertiary || "#bfbfbf";
    if ($isSelected) return "#fff";
    if (!$isCurrentMonth) return theme.colors?.text?.tertiary || "#bfbfbf";
    return theme.colors?.text?.primary || "#000";
  }};
  font-size: ${({ theme, $size }) => {
    const sizeMap: Record<string, string> = {
      sm: theme.typography?.fontSize?.xs || "11px",
      md: theme.typography?.fontSize?.sm || "12px",
      lg: theme.typography?.fontSize?.md || "14px",
    };
    return sizeMap[$size || "md"];
  }};
  cursor: ${({ $isDisabled }) => ($isDisabled ? "not-allowed" : "pointer")};
  transition: all 0.2s;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ $isToday, theme }) =>
    $isToday &&
    css`
      border-color: ${theme.colors?.primary?.[500] || "#1890ff"};
      font-weight: ${theme.typography?.fontWeight?.semibold || 600};
    `}

  &:hover:not(:disabled) {
    background: ${({ theme, $isSelected }) =>
      $isSelected
        ? theme.colors?.primary?.[600] || "#40a9ff"
        : theme.colors?.background?.secondary || "#f5f5f5"};
    border-color: ${({ theme }) => theme.colors?.primary?.[300] || "#91d5ff"};
  }

  &:focus {
    outline: 2px solid
      ${({ theme }) => theme.colors?.primary?.[500] || "#1890ff"};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.5;
  }

  ${({ accessibility }) =>
    accessibility?.largeText &&
    css`
      font-size: ${({ theme }) => theme.typography?.fontSize?.md || "14px"};
      padding: ${({ theme }) => theme.spacing?.xs || "4px"};
    `}
`;
