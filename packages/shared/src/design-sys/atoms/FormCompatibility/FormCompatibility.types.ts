import React from "react";

export interface FormGroupProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  "aria-label"?: string;
}

export interface FormRowProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  gap?: "sm" | "md" | "lg";
}

export interface LabelProps {
  children: React.ReactNode;
  htmlFor?: string;
  className?: string;
  style?: React.CSSProperties;
  required?: boolean;
  "aria-label"?: string;
}

export interface ErrorMessageProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  "aria-live"?: "polite" | "assertive" | "off";
}

export interface SuccessMessageProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  "aria-live"?: "polite" | "assertive" | "off";
}
