import styled from "styled-components";

interface TimePickerContainerProps {
  $size?: "sm" | "md" | "lg";
  $disabled?: boolean;
}

export const TimePickerContainer = styled.div<TimePickerContainerProps>`
  position: relative;
  width: 100%;

  input {
    width: 100%;
    padding: ${({ $size }) => {
      switch ($size) {
        case "sm":
          return "6px 10px";
        case "lg":
          return "12px 16px";
        default:
          return "8px 12px";
      }
    }};
    font-size: ${({ $size }) => {
      switch ($size) {
        case "sm":
          return "13px";
        case "lg":
          return "16px";
      }
    }};
    border: 1px solid
      ${({ theme }) => theme?.colors?.border?.normal || "#d9d9d9"};
    border-radius: ${({ theme }) => theme?.borderRadius?.md || "6px"};
    background: ${({ theme, $disabled }) =>
      $disabled
        ? theme?.colors?.background?.secondary || "#f5f5f5"
        : theme?.colors?.background?.card || "#fff"};
    color: ${({ theme }) => theme?.colors?.text?.primary || "#000"};
    transition: all 0.2s ease;
    outline: none;
    cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "text")};
    opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};

    &:focus {
      border-color: ${({ theme }) =>
        theme?.colors?.primary?.[500] || "#1890ff"};
      box-shadow: 0 0 0 2px
        ${({ theme }) =>
          theme?.colors?.primary?.[50] || "rgba(24, 144, 255, 0.2)"};
    }

    &:hover:not(:disabled):not(:focus) {
      border-color: ${({ theme }) =>
        theme?.colors?.primary?.[300] || "#91caff"};
    }

    &::placeholder {
      color: ${({ theme }) => theme?.colors?.text?.secondary || "#bfbfbf"};
    }
  }
`;

export const TimePickerDropdown = styled.div<{ $open?: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1050;
  margin-top: 4px;
  background: ${({ theme }) => theme?.colors?.background?.card || "#fff"};
  border: 1px solid ${({ theme }) => theme?.colors?.border?.normal || "#d9d9d9"};
  border-radius: ${({ theme }) => theme?.borderRadius?.md || "6px"};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: ${({ $open }) => ($open ? "block" : "none")};
  min-width: 200px;
  padding: 8px;
`;

export const TimePickerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border-bottom: 1px solid
    ${({ theme }) => theme?.colors?.border?.light || "#f0f0f0"};
  margin-bottom: 8px;
`;

export const TimePickerBody = styled.div`
  display: flex;
  gap: 8px;
`;

export const TimeColumn = styled.div`
  flex: 1;
  max-height: 200px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) =>
      theme?.colors?.background?.secondary || "#f5f5f5"};
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme?.colors?.border?.normal || "#d9d9d9"};
    border-radius: 3px;
  }
`;

export const TimeOption = styled.div<{ $selected?: boolean }>`
  padding: 8px 12px;
  cursor: pointer;
  border-radius: ${({ theme }) => theme?.borderRadius?.sm || "4px"};
  background: ${({ theme, $selected }) =>
    $selected
      ? theme?.colors?.primary?.[50] || "rgba(24, 144, 255, 0.1)"
      : "transparent"};
  color: ${({ theme, $selected }) =>
    $selected
      ? theme?.colors?.primary?.[500] || "#1890ff"
      : theme?.colors?.text?.primary || "#000"};
  font-weight: ${({ $selected }) => ($selected ? "600" : "400")};
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) =>
      theme?.colors?.primary?.[50] || "rgba(24, 144, 255, 0.1)"};
  }
`;

export const ClearButton = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: ${({ theme }) => theme?.colors?.text?.secondary || "#8c8c8c"};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) =>
      theme?.colors?.background?.secondary || "#f5f5f5"};
    color: ${({ theme }) => theme?.colors?.text?.primary || "#000"};
  }
`;
