// Re-export compatibility components from old Form.tsx structure
// These are simple wrappers that may be used elsewhere

import React from "react";
import styled from "styled-components";
import { usePersonalization } from "../../../contexts/PersonalizationContext";
import { DefaultTheme } from "../../../styles/theme";

// FormGroup
interface FormGroupProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  "aria-label"?: string;
}

const StyledFormGroup = styled.div<FormGroupProps>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const FormGroup: React.FC<FormGroupProps> = ({
  children,
  className,
  style,
  "aria-label": ariaLabel,
  ...props
}) => {
  const { accessibility } = usePersonalization();

  const getAccessibilityStyles = () => {
    const styles: React.CSSProperties = {};

    if (accessibility.increasedSpacing) {
      const multiplier = accessibility.spacingMultiplier || 1.5;
      styles.gap = `${multiplier * 8}px`;
    }

    return styles;
  };

  return (
    <StyledFormGroup
      className={className}
      style={{ ...getAccessibilityStyles(), ...style }}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </StyledFormGroup>
  );
};

// FormRow
interface FormRowProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  gap?: "sm" | "md" | "lg";
}

const StyledFormRow = styled.div<FormRowProps>`
  display: flex;
  flex-direction: row;
  gap: ${({ theme, gap = "md" }) => {
    switch (gap) {
      case "sm":
        return theme.spacing.sm;
      case "md":
        return theme.spacing.md;
      case "lg":
        return theme.spacing.lg;
      default:
        return theme.spacing.md;
    }
  }};

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const FormRow: React.FC<FormRowProps> = ({
  children,
  className,
  style,
  gap = "md",
  ...props
}) => {
  const { accessibility } = usePersonalization();

  const getAccessibilityStyles = () => {
    const styles: React.CSSProperties = {};

    if (accessibility.increasedSpacing) {
      const multiplier = accessibility.spacingMultiplier || 1.5;
      const baseGap = gap === "sm" ? 8 : gap === "lg" ? 24 : 16;
      styles.gap = `${multiplier * baseGap}px`;
    }

    return styles;
  };

  return (
    <StyledFormRow
      className={className}
      style={{ ...getAccessibilityStyles(), ...style }}
      gap={gap}
      {...props}
    >
      {children}
    </StyledFormRow>
  );
};

// Label
interface LabelProps {
  children: React.ReactNode;
  htmlFor?: string;
  className?: string;
  style?: React.CSSProperties;
  required?: boolean;
  "aria-label"?: string;
}

const StyledLabel = styled.label<LabelProps>`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.primary};
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.xs};

  ${({ required }) =>
    required &&
    `
    &::after {
      content: " *";
      color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.error[600]};
    }
  `}
`;

export const Label: React.FC<LabelProps> = ({
  children,
  htmlFor,
  className,
  style,
  required = false,
  "aria-label": ariaLabel,
  ...props
}) => {
  const { accessibility } = usePersonalization();

  const getAccessibilityStyles = () => {
    const styles: React.CSSProperties = {};

    if (accessibility.fontSizeMultiplier) {
      styles.fontSize = `${accessibility.fontSizeMultiplier * 14}px`;
    }

    return styles;
  };

  return (
    <StyledLabel
      htmlFor={htmlFor}
      className={className}
      style={{ ...getAccessibilityStyles(), ...style }}
      required={required}
      aria-label={ariaLabel}
      data-speak={accessibility.textToSpeech ? children?.toString() : undefined}
      {...props}
    >
      {children}
    </StyledLabel>
  );
};

// ErrorMessage
interface ErrorMessageProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  "aria-live"?: "polite" | "assertive" | "off";
}

const StyledErrorMessage = styled.div<ErrorMessageProps>`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.error[600]};
  margin-top: ${({ theme }) => theme.spacing.xs};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};

  &::before {
    content: "⚠️";
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
  }
`;

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  children,
  className,
  style,
  id,
  "aria-live": ariaLive = "polite",
  ...props
}) => {
  const { accessibility } = usePersonalization();

  const getAccessibilityStyles = () => {
    const styles: React.CSSProperties = {};

    if (accessibility.fontSizeMultiplier) {
      styles.fontSize = `${accessibility.fontSizeMultiplier * 12}px`;
    }

    return styles;
  };

  return (
    <StyledErrorMessage
      className={className}
      style={{ ...getAccessibilityStyles(), ...style }}
      aria-live={ariaLive}
      role="alert"
      id={id}
      data-speak={
        accessibility.textToSpeech ? (children ?? "")?.toString() : undefined
      }
      {...props}
    >
      {children}
    </StyledErrorMessage>
  );
};

// SuccessMessage
interface SuccessMessageProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  "aria-live"?: "polite" | "assertive" | "off";
}

const StyledSuccessMessage = styled.div<SuccessMessageProps>`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.success[600]};
  margin-top: ${({ theme }) => theme.spacing.xs};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};

  &::before {
    content: "✅";
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
  }
`;

export const SuccessMessage: React.FC<SuccessMessageProps> = ({
  children,
  className,
  style,
  "aria-live": ariaLive = "polite",
  ...props
}) => {
  const { accessibility } = usePersonalization();

  const getAccessibilityStyles = () => {
    const styles: React.CSSProperties = {};

    if (accessibility.fontSizeMultiplier) {
      styles.fontSize = `${accessibility.fontSizeMultiplier * 12}px`;
    }

    return styles;
  };

  return (
    <StyledSuccessMessage
      className={className}
      style={{ ...getAccessibilityStyles(), ...style }}
      aria-live={ariaLive}
      role="status"
      data-speak={
        accessibility.textToSpeech ? (children ?? "")?.toString() : undefined
      }
      {...props}
    >
      {children}
    </StyledSuccessMessage>
  );
};

// Input wrappers for compatibility
import Input from "./Input";
import Button from "./Button";

interface EmailInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  style?: React.CSSProperties;
}

export const EmailInput: React.FC<EmailInputProps> = ({ className, style, ...props }) => {
  return <Input type="email" className={className} style={style} {...props} />;
};

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  style?: React.CSSProperties;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({ className, style, ...props }) => {
  return <Input type="password" className={className} style={style} {...props} />;
};

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  style?: React.CSSProperties;
}

export const TextInput: React.FC<TextInputProps> = ({ className, style, ...props }) => {
  return <Input type="text" className={className} style={style} {...props} />;
};

// Button wrappers for compatibility
interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  loading?: boolean;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({ 
  children, 
  className, 
  style, 
  loading,
  ...props 
}) => {
  return (
    <Button variant="primary" className={className} style={style} loading={loading} {...props}>
      {children}
    </Button>
  );
};

interface SecondaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  loading?: boolean;
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({ 
  children, 
  className, 
  style, 
  loading,
  ...props 
}) => {
  return (
    <Button variant="secondary" className={className} style={style} loading={loading} {...props}>
      {children}
    </Button>
  );
};

interface ErrorButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  loading?: boolean;
}

export const ErrorButton: React.FC<ErrorButtonProps> = ({ 
  children, 
  className, 
  style, 
  loading,
  ...props 
}) => {
  return (
    <Button variant="error" className={className} style={style} loading={loading} {...props}>
      {children}
    </Button>
  );
};
