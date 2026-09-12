import React from "react";
import { ContainerProps } from "./Container.types";
import { StyledContainer } from "./Container.styles";

// Componente Container principal
export const Container: React.FC<ContainerProps> = ({ children, id, ...props }) => {
  const finalId = id ? `container-${id}` : undefined;
  return <StyledContainer id={finalId} {...props}>{children}</StyledContainer>;
};

// Componentes predefinidos para facilitar el uso
export const PageContainer: React.FC<
  Omit<ContainerProps, "maxWidth" | "padding">
> = (props) => <Container maxWidth="lg" padding="lg" {...props} />;

export const CardContainer: React.FC<
  Omit<ContainerProps, "background" | "borderRadius" | "shadow">
> = (props) => (
  <Container background="card" borderRadius="md" shadow="light" {...props} />
);

export const SectionContainer: React.FC<
  Omit<ContainerProps, "maxWidth" | "padding">
> = (props) => <Container maxWidth="xl" padding="xl" {...props} />;

export const FluidContainer: React.FC<Omit<ContainerProps, "maxWidth">> = (
  props
) => <Container maxWidth="full" {...props} />;

export type { ContainerProps };
