import React, { useState, useRef, useEffect } from "react";
import { useResponsive } from "../../../../hooks/useResponsive";
import {
  DropdownContainer,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownIcon,
  DropdownDivider,
} from "../../styles/dropdown.mixins";

export interface DropdownItemType {
  key: string;
  label: string;
  value?: any;
  icon?: React.ReactNode;
  disabled?: boolean;
  danger?: boolean;
  divider?: boolean;
}

export interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItemType[];
  selectedKey?: string;
  disabled?: boolean;
  onSelect?: (item: DropdownItemType) => void;
  className?: string;
  style?: React.CSSProperties;
  placement?: "bottom" | "top";
  minimal?: boolean; // trigger sin contenedor visual (navbar)
  showIndicator?: boolean; // mostrar flecha ▼
  openOnHover?: boolean; // abrir en hover (desktop)
  /** ID único del componente (opcional) - se concatena con "dropdown-" */
  id?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  items,
  selectedKey,
  disabled = false,
  onSelect,
  className,
  style,
  placement = "bottom",
  minimal = false,
  showIndicator = true,
  openOnHover = false,
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isDesktop } = useResponsive();

  const handleToggle = () => {
    if (disabled) return;
    setIsOpen((prev) => !prev);
  };

  const handleItemClick = (item: DropdownItemType) => {
    if (item.disabled) return;
    onSelect?.(item);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMouseEnter = () => {
    if (disabled) return;
    if (openOnHover && isDesktop) setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (openOnHover && isDesktop) setIsOpen(false);
  };

  const finalId = id ? `dropdown-${id}` : undefined;

  return (
    <DropdownContainer
      id={finalId}
      ref={dropdownRef}
      className={className}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {minimal ? (
        <div
          onClick={handleToggle}
          data-dropdown-trigger="true"
          style={{ display: "inline-flex", alignItems: "center" }}
        >
          {trigger}
        </div>
      ) : (
        <DropdownTrigger
          $isOpen={isOpen}
          $disabled={disabled}
          onClick={handleToggle}
        >
          {trigger}
          {showIndicator && <DropdownIcon $isOpen={isOpen}>▼</DropdownIcon>}
        </DropdownTrigger>
      )}

      <DropdownContent $isOpen={isOpen}>
        {items.map((item, index) => {
          if (item.divider) {
            return <DropdownDivider key={`divider-${index}`} />;
          }

          return (
            <DropdownItem
              key={item.key}
              $isActive={item.key === selectedKey}
              $isDisabled={item.disabled}
              onClick={() => handleItemClick(item)}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                {item.icon}
                {item.label}
              </div>
            </DropdownItem>
          );
        })}
      </DropdownContent>
    </DropdownContainer>
  );
};

export default Dropdown;
