import styled, { DefaultTheme } from "styled-components";
import {
  FormGroupProps,
  FormRowProps,
  LabelProps,
  ErrorMessageProps,
  SuccessMessageProps,
} from "./FormCompatibility.types";

const getFormRowGap = (gap: "sm" | "md" | "lg" = "md", theme: any) => {
  const gapMap = {
    sm: theme.spacing.sm,
    md: theme.spacing.md,
    lg: theme.spacing.lg,
  };
  return gapMap[gap] || theme.spacing.md;
};

export const StyledFormGroup = styled.div<FormGroupProps>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const StyledFormRow = styled.div<FormRowProps>`
  display: flex;
  flex-direction: row;
  gap: ${({ gap, theme }) => getFormRowGap(gap, theme)};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
  }
`;

export const StyledLabel = styled.label<LabelProps>`
  font-family: ${({ theme }) => theme?.typography?.fontFamily?.primary || "sans-serif"};
  font-weight: ${({ theme }) => theme?.typography?.fontWeight?.medium || 500};
  font-size: ${({ theme }) => theme?.typography?.fontSize?.sm || "14px"};
  color: ${({ theme }) => theme?.colors?.text?.primary || "#212529"};
  display: block;
  margin-bottom: ${({ theme }) => theme?.spacing?.xs || "4px"};

  ${({ required, theme }) =>
    required &&
    `
    &::after {
      content: " *";
      color: ${theme.colors.error[600]};
    }
  `}
`;

export const StyledErrorMessage = styled.div<ErrorMessageProps>`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.error[600]};
  margin-top: ${({ theme }) => theme.spacing.xs};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const StyledSuccessMessage = styled.div<SuccessMessageProps>`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.success[600]};
  margin-top: ${({ theme }) => theme.spacing.xs};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;
