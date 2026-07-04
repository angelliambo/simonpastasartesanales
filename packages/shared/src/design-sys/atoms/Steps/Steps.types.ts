import React from "react";

export interface StepItem {
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  status?: "wait" | "process" | "finish" | "error";
}

export interface StepsProps {
  current?: number;
  direction?: "horizontal" | "vertical";
  items?: StepItem[];
  size?: "small" | "default";
  className?: string;
  style?: React.CSSProperties;
  /** ID único del componente (opcional) - se concatena con "steps-" */
  id?: string;
}

