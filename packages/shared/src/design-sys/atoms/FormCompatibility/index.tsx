import React from "react";
import { usePersonalization } from "../../contexts/PersonalizationContext";
import { ZnIcon } from "../ZnIcon";
import { ExclamationCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import {
  FormGroupProps,
  FormRowProps,
  LabelProps,
  ErrorMessageProps,
  SuccessMessageProps,
} from "./FormCompatibility.types";
import {
  StyledFormGroup,
  StyledFormRow,
  StyledLabel,
  StyledErrorMessage,
  StyledSuccessMessage,
} from "./FormCompatibility.styles";
import Input from "../Input";
import Button from "../Button";

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
      <ZnIcon icon={ExclamationCircleOutlined} />
      <span>{children}</span>
    </StyledErrorMessage>
  );
};

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
      <ZnIcon icon={CheckCircleOutlined} />
      <span>{children}</span>
    </StyledSuccessMessage>
  );
};

interface InputWrapperProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  style?: React.CSSProperties;
}

export const EmailInput: React.FC<InputWrapperProps> = ({ className, style, ...props }) => {
  return <Input type="email" className={className} style={style} {...(props as any)} />;
};

export const PasswordInput: React.FC<InputWrapperProps> = ({ className, style, ...props }) => {
  return <Input type="password" className={className} style={style} {...(props as any)} />;
};

export const TextInput: React.FC<InputWrapperProps> = ({ className, style, ...props }) => {
  return <Input type="text" className={className} style={style} {...(props as any)} />;
};

interface ButtonWrapperProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  loading?: boolean;
}

export const PrimaryButton: React.FC<ButtonWrapperProps> = ({
  children,
  className,
  style,
  loading,
  ...props
}) => {
  return (
    <Button variant="primary" className={className} style={style} loading={loading} {...(props as any)}>
      {children}
    </Button>
  );
};

export const SecondaryButton: React.FC<ButtonWrapperProps> = ({
  children,
  className,
  style,
  loading,
  ...props
}) => {
  return (
    <Button variant="secondary" className={className} style={style} loading={loading} {...(props as any)}>
      {children}
    </Button>
  );
};

export const ErrorButton: React.FC<ButtonWrapperProps> = ({
  children,
  className,
  style,
  loading,
  ...props
}) => {
  return (
    <Button variant="error" className={className} style={style} loading={loading} {...(props as any)}>
      {children}
    </Button>
  );
};

export type {
  FormGroupProps,
  FormRowProps,
  LabelProps,
  ErrorMessageProps,
  SuccessMessageProps,
};
