import React from "react";
import { Dayjs } from "dayjs";

export interface TimePickerProps {
  value?: Dayjs | string;
  defaultValue?: Dayjs | string;
  onChange?: (time: Dayjs | null, timeString: string) => void;
  format?: string;
  placeholder?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  style?: React.CSSProperties;
  allowClear?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** ID único del componente (opcional) - se concatena con "time-picker-" */
  id?: string;
}

export interface TimePickerRef {
  focus: () => void;
  blur: () => void;
}
