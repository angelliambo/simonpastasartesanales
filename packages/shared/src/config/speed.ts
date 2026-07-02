export const SPEED_VALUES = [0.9, 1.2, 1.4] as const;

export const READING_SPEED = {
  min: 1,
  max: 3,
  step: 1,
  default: 2,
  labels: ['0.9x', '1.2x', '1.4x'],
  values: [...SPEED_VALUES],
} as const;

export const SPEED_PRESETS: Array<{ value: number; key: string }> = [
  { value: 0.9, key: 'velocidadLenta' },
  { value: 1.2, key: 'velocidadNormal' },
  { value: 1.4, key: 'velocidadRapida' },
];

export type SpeedValue = (typeof SPEED_VALUES)[number];
