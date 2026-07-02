import styled from "styled-components";

interface InputProps {
  size?: "small" | "medium" | "large";
  hasError?: boolean;
  disabled?: boolean;
}

export const InputContainer = styled.div<{ $size?: InputProps["size"] }>`
  position: relative;
  width: 100%;
  margin-bottom: ${({ $size }) => ($size === "small" ? "8px" : "12px")};
`;

export const StyledInput = styled.input<InputProps>`
  width: 100%;
  padding: ${({ size }) => {
    switch (size) {
      case "small":
        return "8px 12px";
      case "large":
        return "14px 18px";
      default:
        return "10px 14px";
    }
  }};
  font-size: ${({ size }) => {
    switch (size) {
      case "small":
        return "13px";
      case "large":
        return "16px";
      default:
        return "14px";
    }
  }};
  border: 1px solid ${({ theme, hasError }) =>
    hasError ? theme.colors.error[500] : theme.colors.border.light};
  border-radius: ${({ theme }: { theme: any }) => theme.borderRadius.md};
  background: ${({ theme, disabled }) =>
    disabled ? theme.colors.background.secondary : theme.colors.background.primary};
  color: ${({ theme }: { theme: any }) => theme.colors.text.primary};
  transition: all 0.2s ease;
  outline: none;

  &:focus {
    border-color: ${({ theme, hasError }) =>
      hasError ? theme.colors.error[500] : theme.colors.primary[500]};
    box-shadow: 0 0 0 3px ${({ theme, hasError }) =>
      hasError ? `${theme.colors.error[50]}` : `${theme.colors.primary[50]}`};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &::placeholder {
    color: ${({ theme }: { theme: any }) => theme.colors.text.secondary};
  }
`;

export const PasswordToggleButton = styled.button<{ $size?: InputProps["size"] }>`
  position: absolute;
  right: ${({ $size }) => ($size === "small" ? "8px" : "12px")};
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: ${({ theme }: { theme: any }) => theme.colors.text.secondary};
  font-size: ${({ $size }) => ($size === "small" ? "16px" : "18px")};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }: { theme: any }) => theme.colors.text.primary};
  }

  &:focus {
    outline: 2px solid ${({ theme }: { theme: any }) => theme.colors.primary[500]};
    outline-offset: 2px;
    border-radius: 4px;
  }
`;
