import React from "react";
import { StepsProps } from "./Steps.types";
import {
  StepsContainer,
  StepItem,
  StepIcon,
  StepContent,
  StepTitle,
  StepDescription,
} from "./Steps.styles";

const Steps: React.FC<StepsProps> = ({
  current = 0,
  direction = "horizontal",
  items = [],
  size = "default",
  className,
  style,
  id,
}) => {
  const finalId = id ? `steps-${id}` : undefined;

  return (
    <StepsContainer id={finalId} $direction={direction} className={className} style={style}>
      {items.map((item, index) => {
        const isCurrent = index === current;
        const isFinished = index < current;
        const status =
          item.status ||
          (isFinished ? "finish" : isCurrent ? "process" : "wait");

        return (
          <StepItem
            key={index}
            $current={isCurrent}
            $finished={isFinished}
            $direction={direction}
            $status={status}
          >
            <StepIcon
              $current={isCurrent}
              $finished={isFinished}
              $status={status}
            >
              {item.icon || index + 1}
            </StepIcon>
            <StepContent $direction={direction}>
              {item.title && (
                <StepTitle
                  $current={isCurrent}
                  $finished={isFinished}
                  $status={status}
                >
                  {item.title}
                </StepTitle>
              )}
              {item.description && (
                <StepDescription>{item.description}</StepDescription>
              )}
            </StepContent>
          </StepItem>
        );
      })}
    </StepsContainer>
  );
};

export default Steps;
export type { StepsProps, StepItem } from "./Steps.types";
