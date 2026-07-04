import React, { useState, useRef } from "react";
import {
  CollapseContainer,
  CollapseHeader,
  CollapseContent,
  CollapseIcon,
  CollapseBody,
} from "../styles/collapse.mixins";

export interface CollapseProps {
  title: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  disabled?: boolean;
  maxHeight?: number;
  onToggle?: (isOpen: boolean) => void;
  className?: string;
  style?: React.CSSProperties;
  /** ID único del componente (opcional) - se concatena con "collapse-" */
  id?: string;
}

export const Collapse: React.FC<CollapseProps> = ({
  title,
  children,
  defaultOpen = false,
  disabled = false,
  maxHeight,
  onToggle,
  className,
  style,
  id,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const handleToggle = () => {
    if (disabled) return;

    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    onToggle?.(newIsOpen);
  };

  const finalId = id ? `collapse-${id}` : undefined;

  return (
    <CollapseContainer id={finalId} className={className} style={style}>
      <CollapseHeader
        $isOpen={isOpen}
        $disabled={disabled}
        onClick={handleToggle}
      >
        {title}
        <CollapseIcon $isOpen={isOpen}>▲</CollapseIcon>
      </CollapseHeader>

      <CollapseContent $isOpen={isOpen} $maxHeight={maxHeight} ref={contentRef}>
        <CollapseBody>{children}</CollapseBody>
      </CollapseContent>
    </CollapseContainer>
  );
};

export default Collapse;
