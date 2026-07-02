import styled from "styled-components";

interface FormProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const StyledForm = styled.form<FormProps>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }: { theme: any }) => theme.spacing.lg};
  width: 100%;
  max-width: 100%;

  &:focus-within {
    outline: none;
  }
`;

interface FormGroupProps {
  $fullWidth?: boolean;
}

export const StyledFormGroup = styled.div<FormGroupProps>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }: { theme: any }) => theme.spacing.sm};
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};
`;

interface FormRowProps {
  $columns?: number;
  $gap?: string;
}

export const StyledFormRow = styled.div<FormRowProps>`
  display: grid;
  grid-template-columns: repeat(${({ $columns }) => $columns || 1}, 1fr);
  gap: ${({ $gap, theme }: { theme: any; [key: string]: any }) => $gap || theme.spacing.md};
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

interface LabelProps {
  $required?: boolean;
}

export const StyledLabel = styled.label<LabelProps>`
  font-size: ${({ theme }: { theme: any }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }: { theme: any }) => theme.typography.fontWeight.medium};
  color: ${({ theme }: { theme: any }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }: { theme: any }) => theme.spacing.xs};

  ${({ $required }) =>
    $required &&
    `
    &::after {
      content: " *";
      color: ${({ theme }: { theme: any }) => theme.colors.error[500]};
    }
  `}
`;

export const StyledErrorMessage = styled.div`
  font-size: ${({ theme }: { theme: any }) => theme.typography.fontSize.sm};
  color: ${({ theme }: { theme: any }) => theme.colors.error[500]};
  margin-top: ${({ theme }: { theme: any }) => theme.spacing.xs};
  display: flex;
  align-items: center;
  gap: ${({ theme }: { theme: any }) => theme.spacing.xs};
`;

export const StyledSuccessMessage = styled.div`
  font-size: ${({ theme }: { theme: any }) => theme.typography.fontSize.sm};
  color: ${({ theme }: { theme: any }) => theme.colors.success[500]};
  margin-top: ${({ theme }: { theme: any }) => theme.spacing.xs};
  display: flex;
  align-items: center;
  gap: ${({ theme }: { theme: any }) => theme.spacing.xs};
`;
