import styled from "styled-components";

export const StepsContainer = styled.div<{
  $direction: "horizontal" | "vertical";
}>`
  display: flex;
  flex-direction: ${({ $direction }) =>
    $direction === "vertical" ? "column" : "row"};
  width: 100%;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const StepItem = styled.div<{
  $current: boolean;
  $finished: boolean;
  $direction: "horizontal" | "vertical";
  $status?: "wait" | "process" | "finish" | "error";
}>`
  display: flex;
  flex-direction: ${({ $direction }) =>
    $direction === "vertical" ? "row" : "column"};
  align-items: ${({ $direction }) =>
    $direction === "vertical" ? "flex-start" : "center"};
  flex: ${({ $direction }) => ($direction === "horizontal" ? "1" : "none")};
  position: relative;

  ${({ $direction, theme, $finished }) =>
    $direction === "horizontal"
      ? `
    &:not(:last-child)::after {
      content: "";
      position: absolute;
      top: 20px;
      left: calc(50% + 20px);
      right: -50%;
      height: 2px;
      background: ${
        $finished ? theme.colors.primary[500] : theme.colors.border.light
      };
    }
  `
      : `
    &:not(:last-child)::after {
      content: "";
      position: absolute;
      left: 20px;
      top: calc(40px);
      bottom: -${theme.spacing.md};
      width: 2px;
      background: ${
        $finished ? theme.colors.primary[500] : theme.colors.border.light
      };
    }
  `}
`;

export const StepIcon = styled.div<{
  $current: boolean;
  $finished: boolean;
  $status?: "wait" | "process" | "finish" | "error";
}>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme, $current, $finished, $status }) => {
    if ($status === "error") return theme.colors.error[500];
    if ($finished || $status === "finish") return theme.colors.primary[500];
    if ($current) return theme.colors.primary[100];
    return theme.colors.background.secondary;
  }};
  color: ${({ theme, $current, $finished, $status }) => {
    if ($status === "error") return theme.colors.text.inverse;
    if ($finished || $status === "finish") return theme.colors.text.inverse;
    if ($current) return theme.colors.primary[600];
    return theme.colors.text.tertiary;
  }};
  border: 2px solid
    ${({ theme, $current, $finished, $status }) => {
      if ($status === "error") return theme.colors.error[500];
      if ($finished || $status === "finish") return theme.colors.primary[500];
      if ($current) return theme.colors.primary[500];
      return theme.colors.border.light;
    }};
  font-size: 18px;
  font-weight: 600;
  z-index: 1;
`;

export const StepContent = styled.div<{
  $direction: "horizontal" | "vertical";
}>`
  display: flex;
  flex-direction: column;
  margin-left: ${({ $direction }) =>
    $direction === "vertical" ? "16px" : "0"};
  margin-top: ${({ $direction }) =>
    $direction === "horizontal" ? "8px" : "0"};
  text-align: ${({ $direction }) =>
    $direction === "horizontal" ? "center" : "left"};
`;

export const StepTitle = styled.div<{
  $current: boolean;
  $finished: boolean;
  $status?: "wait" | "process" | "finish" | "error";
}>`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ $current }) => ($current ? "600" : "400")};
  color: ${({ theme, $current, $finished, $status }) => {
    if ($status === "error") return theme.colors.error[500];
    if ($finished || $status === "finish") return theme.colors.text.primary;
    if ($current) return theme.colors.primary[600];
    return theme.colors.text.secondary;
  }};
  margin-bottom: 4px;
`;

export const StepDescription = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.tertiary};
`;
