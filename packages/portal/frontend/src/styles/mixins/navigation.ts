// Mixins específicos para componentes de navegación
// Headers, footers, menús, breadcrumbs, etc.

import styled from "styled-components";
import { SpacingSize, AccessibilityProps } from "./types";
import { media } from "./responsive";
import { createShouldForwardProp } from "../../utils/shouldForwardProp";

// ===== HEADER COMPONENTS =====

export const Header = styled.header.withConfig({
  shouldForwardProp: createShouldForwardProp([
    "fixed",
    "transparent",
    "variant",
    "height",
  ]),
})<{
  fixed?: boolean;
  transparent?: boolean;
  variant?: "default" | "minimal" | "full";
  height?: "sm" | "md" | "lg";
  accessibility?: AccessibilityProps;
}>`
  position: ${({ fixed }) => (fixed ? "fixed" : "relative")};
  top: ${({ fixed }) => (fixed ? "0" : "auto")};
  width: 100%;
  height: ${({ height }) => {
    switch (height) {
      case "sm":
        return "56px";
      case "lg":
        return "80px";
      default:
        return "64px";
    }
  }};
  z-index: 1100;
  background: ${({ theme, transparent, variant, accessibility }) => {
    if (accessibility?.highContrast) {
      return theme.colors.background.primary;
    }
    if (transparent) {
      return "transparent";
    }
    return theme.colors.background.card;
  }};
  backdrop-filter: ${({ transparent, variant }) => {
    if (transparent) return "none";
    switch (variant) {
      case "minimal":
        return "blur(8px)";
      case "full":
        return "blur(12px)";
      default:
        return "blur(10px)";
    }
  }};
  box-shadow: ${({ theme, variant, accessibility }) => {
    if (accessibility?.highContrast) {
      return theme.shadows.medium;
    }
    switch (variant) {
      case "minimal":
        return theme.shadows.light;
      case "full":
        return theme.shadows.heavy;
      default:
        return theme.shadows.medium;
    }
  }};
  display: flex;
  align-items: center;
  padding: ${({ height }) => {
    switch (height) {
      case "sm":
        return "0 16px";
      case "lg":
        return "0 32px";
      default:
        return "0 20px";
    }
  }};
  justify-content: space-between;
  border-bottom: ${({ theme, accessibility }) =>
    accessibility?.highContrast
      ? `1px solid ${theme.colors.border.normal}`
      : `1px solid ${theme.colors.border.light}`};
  transition: all 0.3s ease;

  @media ${media.mobile} {
    height: ${({ height }) => {
      switch (height) {
        case "sm":
          return "48px";
        case "lg":
          return "72px";
        default:
          return "56px";
      }
    }};
    padding: 0 12px;
    /* Asegurar que el header no cause scroll horizontal */
    max-width: 100%; // Usar 100% en lugar de 100vw para evitar overflow
    width: 100%;
    box-sizing: border-box;
  }
`;

export const HeaderBrand = styled.div.withConfig({
  shouldForwardProp: createShouldForwardProp(["$gap"]),
})<{
  $gap?: SpacingSize;
  accessibility?: AccessibilityProps;
}>`
  display: flex !important;
  align-items: center !important;
  gap: ${({ theme, $gap }) => theme.spacing[$gap || "md"]};
  margin-right: ${({ theme }) => theme.spacing.lg};
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.6;
  }

  .brand-icon {
    font-size: ${({ accessibility }) =>
      accessibility?.largeText ? "28px" : "24px"};
    color: ${({ theme, accessibility }) =>
      accessibility?.highContrast
        ? theme.colors.text.inverse
        : theme.colors.primary[500]};
    transition: color 0.3s ease;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    line-height: 1 !important;
    margin: 0 !important;
    padding: 0 !important;
    flex-shrink: 0;
  }

  .brand-text {
    font-size: ${({ accessibility }) =>
      accessibility?.largeText ? "20px" : "18px"} !important;
    font-weight: 600 !important;
    color: ${({ theme, accessibility }) =>
      accessibility?.highContrast
        ? theme.colors.text.inverse
        : theme.colors.text.primary} !important;
    line-height: 1.2 !important;
    margin: 0 !important;
    margin-bottom: 0 !important;
    padding: 0 !important;
    display: inline-block !important;
    vertical-align: middle !important;
  }

  /* Resetear todos los heading y text dentro del HeaderBrand */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0 !important;
    margin-bottom: 0 !important;
    padding: 0 !important;
    line-height: 1.2 !important;
    display: inline-block !important;
    vertical-align: middle !important;
  }

  /* Asegurar que el icono y elementos no-heading se alineen correctamente */
  > div:not(:has(h1, h2, h3, h4, h5, h6)),
  > .brand-icon {
    display: inline-flex !important;
    align-items: center !important;
    vertical-align: middle !important;
  }

  @media ${media.mobile} {
    margin-right: ${({ theme }) => theme.spacing.md};
    /* Asegurar que HeaderBrand no cause overflow */
    flex-shrink: 1;
    min-width: 0;
    max-width: calc(100% - 150px); /* Dejar espacio para controles - usar 100% en lugar de 100vw */

    .brand-icon {
      font-size: ${({ accessibility }) =>
        accessibility?.largeText ? "24px" : "20px"};
      flex-shrink: 0;
    }

    .brand-text {
      font-size: ${({ accessibility }) =>
        accessibility?.largeText ? "18px" : "16px"};
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
`;

export const HeaderNavigation = styled.div.withConfig({
  shouldForwardProp: createShouldForwardProp(["maxWidth"]),
})<{
  maxWidth?: string;
  accessibility?: AccessibilityProps;
}>`
  flex: 1;
  max-width: ${({ maxWidth }) => maxWidth || "600px"};
  margin: 0 ${({ theme }) => theme.spacing.lg};

  .nav-container {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};
    justify-content: center;
    padding: 0 ${({ theme }) => theme.spacing.md};
  }

  @media ${media.mobile} {
    display: none;
  }
`;

export const NavItem = styled.button.withConfig({
  shouldForwardProp: createShouldForwardProp(["active", "disabled", "size"]),
})<{
  active?: boolean;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  accessibility?: AccessibilityProps;
}>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  gap: ${({ active }) => (active ? "6px" : "0")};
  width: ${({ size, active }) => {
    if (active) return "auto";
    switch (size) {
      case "sm":
        return "40px";
      case "lg":
        return "56px";
      default:
        return "48px";
    }
  }};
  height: ${({ size }) => {
    switch (size) {
      case "sm":
        return "40px";
      case "lg":
        return "56px";
      default:
        return "48px";
    }
  }};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  background: ${({ theme, active }) =>
    active ? theme.colors.primary[50] : "transparent"};
  border: ${({ theme, active }) =>
    active ? `2px solid ${theme.colors.primary[500]}` : "none"};
  outline: none;
  transition: color 0.2s ease, transform 0.1s ease, background 0.2s ease,
    border 0.2s ease, width 0.2s ease;
  padding: ${({ active }) => (active ? "0 10px" : "0 6px")};

  &:hover:not(:disabled) {
    background: transparent;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary[500]};
    outline-offset: 2px;
  }

  .nav-icon {
    font-size: ${({ size }) => {
      switch (size) {
        case "sm":
          return "20px";
        case "lg":
          return "26px";
        default:
          return "22px";
      }
    }};
    color: ${({ theme, active, accessibility }) => {
      if (accessibility?.highContrast) {
        return theme.colors.text.primary;
      }
      return active ? theme.colors.primary[600] : theme.colors.text.primary;
    }};
    transition: color 0.2s ease;
    margin: 0;
  }

  /* Título de la página para el item activo en línea con el icono */
  .nav-text {
    position: static;
    white-space: nowrap;
    font-size: 13px;
    font-weight: 600;
    color: ${({ theme }) =>
      theme.colors.secondary?.[600] || theme.colors.text.secondary};
    display: ${({ active }) => (active ? "inline-block" : "none")};
    line-height: 1;
  }

  .nav-indicator {
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({ theme, accessibility }) =>
      accessibility?.highContrast
        ? theme.colors.text.primary
        : theme.colors.primary[500]};
    box-shadow: none;
    opacity: ${({ active }) => (active ? 1 : 0)};
    transition: opacity 0.2s ease;
  }
`;

export const HeaderControls = styled.div.withConfig({
  shouldForwardProp: createShouldForwardProp(["gap"]),
})<{
  gap?: SpacingSize;
  accessibility?: AccessibilityProps;
}>`
  margin-left: ${({ theme }) => theme.spacing.md};
  display: flex;
  align-items: center;
  gap: ${({ theme, gap }) => theme.spacing[gap || "sm"]};

  @media ${media.mobile} {
    gap: ${({ theme }) => theme.spacing.xs};
    /* Asegurar que HeaderControls no cause overflow */
    flex-shrink: 1;
    min-width: 0;
    max-width: 100%;
  }

  /* Normalizar controles en el header para que no aparezcan recuadros/bordes */
  button,
  button:focus,
  button:hover {
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
    outline: none !important;
  }

  /* Asegurar íconos alineados sin fondos extra */
  svg {
    display: inline-block;
    vertical-align: middle;
  }

  /* Dropdown/Tooltip trigger wrappers no agregan bordes ni fondos */
  [data-dropdown-trigger="true"],
  [data-tooltip-trigger="true"] {
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
  }
`;

// ===== MOBILE NAVIGATION =====

export const MobileMenuButton = styled.button<{
  open?: boolean;
  accessibility?: AccessibilityProps;
}>`
  width: 44px;
  height: 44px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme, open, accessibility }) => {
    if (accessibility?.highContrast) {
      return theme.colors.text.inverse;
    }
    return open ? theme.colors.text.primary : theme.colors.primary[500];
  }};
  border: none;
  background: ${({ theme, open, accessibility }) => {
    if (accessibility?.highContrast) {
      return open ? theme.colors.background.secondary : "transparent";
    }
    return open ? theme.colors.background.card : theme.colors.primary[50];
  }};
  box-shadow: ${({ theme, open }) => (open ? theme.shadows.medium : "none")};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${({ open }) => (open ? "rotate(90deg)" : "rotate(0deg)")};
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary[500]};
    outline-offset: 2px;
  }

  &:hover:not(:disabled) {
    background: ${({ theme, accessibility }) =>
      accessibility?.highContrast
        ? theme.colors.background.secondary
        : theme.colors.primary[50]};
  }
`;

export const MobileDrawer = styled.div<{
  width?: number;
  accessibility?: AccessibilityProps;
}>`
  .ant-drawer-content {
    background: ${({ theme, accessibility }) =>
      accessibility?.highContrast
        ? theme.colors.background.primary
        : theme.colors.background.primary};
    box-shadow: ${({ theme, accessibility }) =>
      accessibility?.highContrast ? theme.shadows.heavy : theme.shadows.heavy};
  }

  .ant-drawer-body {
    padding: ${({ accessibility }) =>
      accessibility?.largeText ? "20px 0" : "16px 0"};
    background: ${({ theme, accessibility }) =>
      accessibility?.highContrast
        ? theme.colors.background.primary
        : theme.colors.background.primary};
  }

  .ant-drawer-header {
    background: ${({ theme, accessibility }) =>
      accessibility?.highContrast
        ? theme.colors.background.secondary
        : theme.colors.background.card};
    border-bottom: ${({ theme, accessibility }) =>
      accessibility?.highContrast
        ? `1px solid ${theme.colors.border.normal}`
        : `1px solid ${theme.colors.border.light}`};
    padding: ${({ accessibility }) =>
      accessibility?.largeText ? "24px 28px" : "20px 24px"};
  }

  .ant-drawer-mask {
    background-color: ${({ theme, accessibility }) =>
      accessibility?.highContrast
        ? "rgba(0, 0, 0, 0.8)"
        : "rgba(0, 0, 0, 0.5)"};
    backdrop-filter: blur(4px);
  }
`;

// ===== MOBILE MENU ITEMS =====

export const MobileMenuItem = styled.div<{
  active?: boolean;
  accessibility?: AccessibilityProps;
}>`
  font-size: ${({ accessibility }) =>
    accessibility?.largeText ? "18px" : "16px"};
  padding: ${({ accessibility }) =>
    accessibility?.largeText ? "16px 20px" : "12px 16px"};
  margin: 4px 0;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  min-height: ${({ accessibility }) =>
    accessibility?.largeText ? "56px" : "48px"};
  background: ${({ theme, active, accessibility }) => {
    if (accessibility?.highContrast) {
      return active ? theme.colors.background.secondary : "transparent";
    }
    return active ? theme.colors.primary[500] : "transparent";
  }};
  cursor: ${({ active }) => (active ? "default" : "pointer")};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: ${({ active }) => (active ? 600 : 500)};
  border: ${({ theme, active, accessibility }) => {
    if (accessibility?.highContrast) {
      return active
        ? `2px solid ${theme.colors.border.normal}`
        : "2px solid transparent";
    }
    return active
      ? `2px solid ${theme.colors.primary[500]}`
      : "2px solid transparent";
  }};
  transform: translateX(0);
  display: flex;
  align-items: center;
  line-height: 1.4;
  color: ${({ theme, active, accessibility }) => {
    if (accessibility?.highContrast) {
      return theme.colors.text.inverse;
    }
    return active ? theme.colors.text.inverse : theme.colors.text.primary;
  }};

  &:hover:not([data-active="true"]) {
    background-color: ${({ theme, accessibility }) =>
      accessibility?.highContrast
        ? theme.colors.background.secondary
        : theme.colors.primary[500]} !important;
    color: ${({ theme, accessibility }) =>
      accessibility?.highContrast
        ? theme.colors.text.inverse
        : theme.colors.text.primary} !important;
  }

  .ant-menu-item-icon {
    color: ${({ theme, accessibility }) =>
      accessibility?.highContrast
        ? theme.colors.text.inverse
        : theme.colors.text.secondary};
    font-size: ${({ accessibility }) =>
      accessibility?.largeText ? "20px" : "18px"};
  }

  &.ant-menu-item-selected .ant-menu-item-icon {
    color: ${({ theme, accessibility }) =>
      accessibility?.highContrast
        ? theme.colors.text.inverse
        : theme.colors.text.inverse};
  }
`;

// ===== USER PROFILE COMPONENTS =====

export const UserProfileCard = styled.div.withConfig({
  shouldForwardProp: createShouldForwardProp(["size"]),
})<{
  size?: "sm" | "md" | "lg";
  accessibility?: AccessibilityProps;
  colors: any;
}>`
  display: flex;
  align-items: center;
  gap: ${({ size }) => {
    switch (size) {
      case "sm":
        return "8px";
      case "lg":
        return "16px";
      default:
        return "12px";
    }
  }};
  padding: ${({ size, accessibility }) => {
    const basePadding = size === "sm" ? "6px" : size === "lg" ? "10px" : "8px";
    return accessibility?.largeText
      ? `${parseInt(basePadding) + 2}px`
      : basePadding;
  }};
  background: transparent;
  border-radius: 8px;
  border: none;
  box-shadow: none;

  .user-avatar {
    width: ${({ size }) => {
      switch (size) {
        case "sm":
          return "28px";
        case "lg":
          return "48px";
        default:
          return "40px";
      }
    }};
    height: ${({ size }) => {
      switch (size) {
        case "sm":
          return "28px";
        case "lg":
          return "48px";
        default:
          return "40px";
      }
    }};
    border-radius: 50%;
    background: ${({ theme, accessibility }) =>
      accessibility?.highContrast
        ? theme.colors.background.primary
        : `linear-gradient(135deg, ${theme.colors.primary[400]}, ${theme.colors.primary[600]})`};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme, accessibility }) =>
      accessibility?.highContrast
        ? theme.colors.text.primary
        : theme.colors.text.inverse};
    font-size: ${({ size, accessibility }) => {
      const baseSize = size === "sm" ? "16px" : size === "lg" ? "24px" : "20px";
      return accessibility?.largeText
        ? `${parseInt(baseSize) + 2}px`
        : baseSize;
    }};
    font-weight: ${({ size }) => {
      switch (size) {
        case "sm":
          return 600;
        case "lg":
          return 700;
        default:
          return 700;
      }
    }};
    box-shadow: none;
  }

  .user-info {
    flex: 1;

    .user-name {
      font-size: ${({ size, accessibility }) => {
        const baseSize =
          size === "sm" ? "12px" : size === "lg" ? "14px" : "13px";
        return accessibility?.largeText
          ? `${parseInt(baseSize) + 1}px`
          : baseSize;
      }};
      font-weight: 600;
      display: block;
      line-height: 1.2;
      color: ${({ theme, accessibility }) =>
        accessibility?.highContrast
          ? theme.colors.text.inverse
          : theme.colors.text.primary};
    }

    .user-role {
      font-size: ${({ size, accessibility }) => {
        const baseSize =
          size === "sm" ? "10px" : size === "lg" ? "12px" : "11px";
        return accessibility?.largeText
          ? `${parseInt(baseSize) + 1}px`
          : baseSize;
      }};
      color: ${({ theme, accessibility }) =>
        accessibility?.highContrast
          ? theme.colors.text.secondary
          : theme.colors.text.secondary};
      display: block;
      line-height: 1.3;
    }
  }
`;

// ===== AUTH BUTTONS =====

export const AuthButton = styled.button<{
  variant?: "login" | "register" | "profile" | "logout";
  size?: "sm" | "md" | "lg";
  $fullWidth?: boolean;
  accessibility?: AccessibilityProps;
}>`
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};
  height: ${({ size, accessibility }) => {
    const baseHeight = size === "sm" ? "40px" : size === "lg" ? "56px" : "48px";
    return accessibility?.largeText
      ? `${parseInt(baseHeight) + 8}px`
      : baseHeight;
  }};
  display: flex;
  align-items: center;
  justify-content: ${({ $fullWidth }) =>
    $fullWidth ? "flex-start" : "center"};
  gap: ${({ theme, size }) => {
    switch (size) {
      case "sm":
        return theme.spacing.xs;
      case "lg":
        return theme.spacing.md;
      default:
        return theme.spacing.sm;
    }
  }};
  padding: ${({ size, accessibility }) => {
    const basePadding =
      size === "sm" ? "0 12px" : size === "lg" ? "0 20px" : "0 16px";
    return accessibility?.largeText
      ? basePadding.replace(/\d+/, (match) => `${parseInt(match) + 4}`)
      : basePadding;
  }};
  border-radius: ${({ theme, size }) => {
    switch (size) {
      case "sm":
        return theme.borderRadius.sm;
      case "lg":
        return theme.borderRadius.lg;
      default:
        return theme.borderRadius.md;
    }
  }};
  border: ${({ theme, variant, accessibility }) => {
    if (accessibility?.highContrast) {
      switch (variant) {
        case "logout":
          return `2px solid ${theme.colors.error[500]}`;
        case "login":
          return `2px solid ${theme.colors.border.normal}`;
        default:
          return `2px solid ${theme.colors.border.normal}`;
      }
    }
    switch (variant) {
      case "logout":
        return `2px solid ${theme.colors.error[500]}`;
      case "login":
        return `2px solid ${theme.colors.border.light}`;
      case "register":
        return "none";
      default:
        return `2px solid ${theme.colors.border.light}`;
    }
  }};
  background: ${({ theme, variant, accessibility }) => {
    if (accessibility?.highContrast) {
      switch (variant) {
        case "logout":
          return theme.colors.background.primary;
        case "register":
          return theme.colors.background.primary;
        default:
          return theme.colors.background.primary;
      }
    }
    switch (variant) {
      case "logout":
        return theme.colors.background.card;
      case "register":
        return theme.colors.primary[500];
      default:
        return theme.colors.background.card;
    }
  }};
  color: ${({ theme, variant, accessibility }) => {
    if (accessibility?.highContrast) {
      switch (variant) {
        case "logout":
          return theme.colors.error[600];
        case "register":
          return theme.colors.text.inverse;
        default:
          return theme.colors.text.inverse;
      }
    }
    switch (variant) {
      case "logout":
        return theme.colors.error[600];
      case "register":
        return theme.colors.text.inverse;
      default:
        return theme.colors.text.primary;
    }
  }};
  font-size: ${({ size, accessibility }) => {
    const baseSize = size === "sm" ? "14px" : size === "lg" ? "17px" : "15px";
    return accessibility?.largeText ? `${parseInt(baseSize) + 2}px` : baseSize;
  }};
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;
  outline: none;

  &:hover:not(:disabled) {
    border-color: ${({ theme, variant, accessibility }) => {
      if (accessibility?.highContrast) {
        switch (variant) {
          case "logout":
            return theme.colors.error[600];
          default:
            return theme.colors.border.normal;
        }
      }
      switch (variant) {
        case "logout":
          return theme.colors.error[600];
        case "login":
          return theme.colors.primary[300];
        default:
          return theme.colors.primary[300];
      }
    }};
    background: ${({ theme, variant, accessibility }) => {
      if (accessibility?.highContrast) {
        switch (variant) {
          case "logout":
            return theme.colors.background.secondary;
          case "register":
            return theme.colors.background.secondary;
          default:
            return theme.colors.background.secondary;
        }
      }
      switch (variant) {
        case "logout":
          return theme.colors.error[50];
        case "login":
          return theme.colors.primary[50];
        case "register":
          return theme.colors.primary[600];
        default:
          return theme.colors.primary[50];
      }
    }};
    transform: translateY(-1px);
    box-shadow: ${({ theme, accessibility }) =>
      accessibility?.highContrast
        ? theme.shadows.medium
        : theme.shadows.medium};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary[500]};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

// ===== DROPDOWN MENU =====

export const DropdownMenu = styled.div<{
  accessibility?: AccessibilityProps;
}>`
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme, accessibility }) =>
    accessibility?.highContrast ? theme.shadows.heavy : theme.shadows.heavy};
  border: ${({ theme, accessibility }) =>
    accessibility?.highContrast
      ? `1px solid ${theme.colors.border.normal}`
      : `1px solid ${theme.colors.border.light}`};
  padding: ${({ theme, accessibility }) =>
    accessibility?.largeText ? "12px 0" : "8px 0"};
  min-width: ${({ accessibility }) =>
    accessibility?.largeText ? "200px" : "180px"};
  background: ${({ theme, accessibility }) =>
    accessibility?.highContrast
      ? theme.colors.background.secondary
      : theme.colors.background.card};
  z-index: 1000;

  .dropdown-item {
    padding: ${({ accessibility }) =>
      accessibility?.largeText ? "16px 20px" : "12px 16px"};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    margin: 4px 8px;
    font-size: ${({ accessibility }) =>
      accessibility?.largeText ? "16px" : "14px"};
    font-weight: 500;
    transition: all 0.2s ease;
    color: ${({ theme, accessibility }) =>
      accessibility?.highContrast
        ? theme.colors.text.inverse
        : theme.colors.text.primary};
    cursor: pointer;

    &:hover {
      background: ${({ theme, accessibility }) =>
        accessibility?.highContrast
          ? theme.colors.background.secondary
          : theme.colors.primary[50]};
    }
  }
`;
