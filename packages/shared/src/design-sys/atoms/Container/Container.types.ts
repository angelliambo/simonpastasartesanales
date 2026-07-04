// Tipos para las props del componente Container
export interface ContainerProps {
  children: React.ReactNode;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | "full";
  padding?: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  margin?: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  background?:
    | "transparent"
    | "primary"
    | "secondary"
    | "tertiary"
    | "surface"
    | "card";
  borderRadius?: "none" | "sm" | "md" | "lg" | "xl";
  shadow?: "none" | "light" | "medium" | "heavy";
  className?: string;
  style?: React.CSSProperties;
  /** ID único del componente (opcional) - se concatena con "container-" */
  id?: string;
}
