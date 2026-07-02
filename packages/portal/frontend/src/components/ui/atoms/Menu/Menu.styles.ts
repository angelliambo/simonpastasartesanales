import styled, { css, keyframes } from "styled-components";
import { useThemeColors } from "../../../../hooks/useThemeColors";
import {
  StyledMenuProps,
  StyledMenuItemProps,
  StyledSubMenuProps,
  StyledDropdownProps,
  StyledBreadcrumbProps,
  MenuMode,
  MenuSize,
  MenuTheme,
  MenuPlacement,
} from "./Menu.types";

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const getMenuDimensions = (size: MenuSize) => {
  const dimensions = {
    xs: {
      height: "28px",
      padding: "4px 8px",
      fontSize: "12px",
      lineHeight: "20px",
      iconSize: "12px",
      borderRadius: "4px",
      gap: "4px",
      indent: "16px",
    },
    sm: {
      height: "32px",
      padding: "6px 12px",
      fontSize: "14px",
      lineHeight: "22px",
      iconSize: "14px",
      borderRadius: "6px",
      gap: "6px",
      indent: "20px",
    },
    md: {
      height: "40px",
      padding: "8px 16px",
      fontSize: "16px",
      lineHeight: "24px",
      iconSize: "16px",
      borderRadius: "8px",
      gap: "8px",
      indent: "24px",
    },
    lg: {
      height: "44px",
      padding: "10px 20px",
      fontSize: "18px",
      lineHeight: "26px",
      iconSize: "18px",
      borderRadius: "10px",
      gap: "10px",
      indent: "28px",
    },
    xl: {
      height: "48px",
      padding: "12px 24px",
      fontSize: "20px",
      lineHeight: "28px",
      iconSize: "20px",
      borderRadius: "12px",
      gap: "12px",
      indent: "32px",
    },
    xxl: {
      height: "52px",
      padding: "14px 28px",
      fontSize: "22px",
      lineHeight: "30px",
      iconSize: "22px",
      borderRadius: "14px",
      gap: "14px",
      indent: "36px",
    },
  } as const;

  return dimensions[size as keyof typeof dimensions] || dimensions.md;
};

const getMenuColors = (
  theme: MenuTheme,
  colors: ReturnType<typeof useThemeColors>
) => {
  const lightColors = {
    background: colors.background?.primary || "#ffffff",
    border: colors.border?.normal || "#d9d9d9",
    text: colors.text?.primary || "#333333",
    textSecondary: colors.text?.secondary || "#666666",
    textDisabled: colors.text?.tertiary || "#cccccc",
    hover: colors.background?.secondary || "#f5f5f5",
    active: colors.primary?.[50] || "#e6f7ff",
    selected: colors.primary?.[500] || "#1890ff",
    selectedText: colors.background?.primary || "#ffffff",
    danger: colors.error?.[500] || "#ff4d4f",
    divider: colors.border?.light || "#f0f0f0",
    shadow: "rgba(0, 0, 0, 0.1)",
  };

  const darkColors = {
    background: colors.background?.card || "#001529",
    border: colors.border?.dark || "#303030",
    text: colors.text?.inverse || "#ffffff",
    textSecondary: colors.text?.tertiary || "#cccccc",
    textDisabled: colors.text?.tertiary || "#666666",
    hover: "rgba(255, 255, 255, 0.1)",
    active: colors.primary?.[900] || "#002766",
    selected: colors.primary?.[500] || "#1890ff",
    selectedText: colors.background?.primary || "#ffffff",
    danger: colors.error?.[500] || "#ff4d4f",
    divider: "rgba(255, 255, 255, 0.1)",
    shadow: "rgba(0, 0, 0, 0.3)",
  };

  return theme === "dark" ? darkColors : lightColors;
};

const getDropdownPlacement = (placement: MenuPlacement) => {
  const placements = {
    topLeft: css`
      bottom: 100%;
      left: 0;
      margin-bottom: 8px;
    `,
    topRight: css`
      bottom: 100%;
      right: 0;
      margin-bottom: 8px;
    `,
    bottomLeft: css`
      top: 100%;
      left: 0;
      margin-top: 8px;
    `,
    bottomRight: css`
      top: 100%;
      right: 0;
      margin-top: 8px;
    `,
    leftTop: css`
      right: 100%;
      top: 0;
      margin-right: 8px;
    `,
    leftBottom: css`
      right: 100%;
      bottom: 0;
      margin-right: 8px;
    `,
    rightTop: css`
      left: 100%;
      top: 0;
      margin-left: 8px;
    `,
    rightBottom: css`
      left: 100%;
      bottom: 0;
      margin-left: 8px;
    `,
  };

  return placements[placement] || placements.bottomLeft;
};

// =============================================================================
// ANIMATIONS
// =============================================================================

const menuSlideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const menuSlideUp = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-8px);
  }
`;

const menuSlideRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(-8px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const menuItemHighlight = keyframes`
  0% {
    background-color: transparent;
  }
  50% {
    background-color: var(--highlight-color, #e6f7ff);
  }
  100% {
    background-color: transparent;
  }
`;

const breadcrumbLoading = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;

// =============================================================================
// MAIN MENU STYLES
// =============================================================================

export const MenuWrapper = styled.div`
  display: inline-block;
  font-family: inherit;
`;

export const StyledMenu = styled.ul<StyledMenuProps>`
  ${({ $mode, $theme, $size, $variant, $inlineCollapsed, accessibility }) => {
    const colors = useThemeColors();
    const dimensions = getMenuDimensions($size);
    const menuColors = getMenuColors($theme, colors);

    return css`
      list-style: none;
      margin: 0;
      padding: 0;
      font-size: ${dimensions.fontSize};
      line-height: ${dimensions.lineHeight};
      background: ${menuColors.background};
      border: ${$mode === "inline" ? "none" : `1px solid ${menuColors.border}`};
      border-radius: ${$mode === "inline" ? "0" : dimensions.borderRadius};
      box-shadow: ${$mode === "horizontal"
        ? `0 2px 8px ${menuColors.shadow}`
        : "none"};
      user-select: none;
      transition: all 0.2s ease-in-out;

      ${$mode === "horizontal" &&
      css`
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: ${dimensions.gap};
      `}

      ${$mode === "vertical" &&
      css`
        min-width: 200px;
        max-width: 300px;
      `}

      ${$mode === "inline" &&
      css`
        min-width: ${$inlineCollapsed ? "80px" : "200px"};
        max-width: ${$inlineCollapsed ? "80px" : "300px"};
        transition: min-width 0.3s ease-in-out, max-width 0.3s ease-in-out;
      `}

      ${$mode === "collapsed" &&
      css`
        width: 80px;
        overflow: hidden;
      `}

      // Accessibility
      ${accessibility?.largeText &&
      css`
        font-size: calc(${dimensions.fontSize} * 1.2);
      `}

      ${accessibility?.increasedSpacing &&
      css`
        gap: calc(${dimensions.gap} * 1.5);
      `}

      ${accessibility?.highContrast &&
      css`
        border-width: 2px;
        border-color: ${$theme === "dark" ? "#ffffff" : "#000000"};
      `}

      ${accessibility?.reducedMotion &&
      css`
        transition: none;

        * {
          transition: none !important;
          animation: none !important;
        }
      `}

      // Responsive
      @media (max-width: 768px) {
        ${$mode === "horizontal" &&
        css`
          flex-direction: column;
          align-items: stretch;
        `}
      }
    `;
  }}
`;

// =============================================================================
// MENU ITEM STYLES
// =============================================================================

export const StyledMenuItem = styled.li<StyledMenuItemProps>`
  ${({
    $selected,
    $disabled,
    $danger,
    $level,
    $size,
    $theme,
    accessibility,
  }) => {
    const colors = useThemeColors();
    const dimensions = getMenuDimensions($size);
    const menuColors = getMenuColors($theme, colors);

    return css`
      position: relative;
      display: flex;
      align-items: center;
      min-height: ${dimensions.height};
      padding: ${dimensions.padding};
      padding-left: calc(
        ${dimensions.padding.split(" ")[1]} + (${$level} * ${dimensions.indent})
      );
      color: ${$disabled
        ? menuColors.textDisabled
        : $danger
        ? menuColors.danger
        : $selected
        ? menuColors.selected
        : menuColors.text};
      background: ${$selected ? menuColors.active : "transparent"};
      border-radius: ${dimensions.borderRadius};
      cursor: ${$disabled ? "not-allowed" : "pointer"};
      transition: all 0.2s ease-in-out;
      user-select: none;
      gap: ${dimensions.gap};

      &:hover {
        ${!$disabled &&
        css`
          background: ${$selected ? menuColors.active : menuColors.hover};
          color: ${$danger ? menuColors.danger : menuColors.selected};
        `}
      }

      &:focus {
        outline: 2px solid ${menuColors.selected};
        outline-offset: 2px;
        z-index: 1;
      }

      &:active {
        ${!$disabled &&
        css`
          animation: ${menuItemHighlight} 0.3s ease-out;
        `}
      }

      // Selected state indicator
      ${$selected &&
      css`
        &::before {
          content: "";
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 3px;
          height: 60%;
          background: ${menuColors.selected};
          border-radius: 0 2px 2px 0;
        }
      `}

      // Accessibility
      ${accessibility?.largeText &&
      css`
        font-size: calc(${dimensions.fontSize} * 1.2);
      `}

      ${accessibility?.increasedSpacing &&
      css`
        padding: calc(${dimensions.padding.split(" ")[0]} * 1.5)
          calc(${dimensions.padding.split(" ")[1]} * 1.5);
        gap: calc(${dimensions.gap} * 1.5);
      `}

      ${accessibility?.highContrast &&
      css`
        ${$selected &&
        css`
          background: ${$theme === "dark" ? "#ffffff" : "#000000"};
          color: ${$theme === "dark" ? "#000000" : "#ffffff"};
          border: 2px solid ${$theme === "dark" ? "#000000" : "#ffffff"};
        `}
      `}

      ${accessibility?.reducedMotion &&
      css`
        transition: none;
        animation: none;
      `}
    `;
  }}
`;

export const MenuItemIcon = styled.span<{ $size: MenuSize }>`
  ${({ $size }) => {
    const dimensions = getMenuDimensions($size);

    return css`
      display: flex;
      align-items: center;
      justify-content: center;
      width: ${dimensions.iconSize};
      height: ${dimensions.iconSize};
      font-size: ${dimensions.iconSize};
      flex-shrink: 0;

      svg {
        width: 100%;
        height: 100%;
        fill: currentColor;
      }
    `;
  }}
`;

export const MenuItemText = styled.span`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const MenuItemBadge = styled.span<{ $size: MenuSize }>`
  ${({ $size }) => {
    const dimensions = getMenuDimensions($size);

    return css`
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 16px;
      height: 16px;
      padding: 0 4px;
      font-size: calc(${dimensions.fontSize} * 0.75);
      line-height: 1;
      background: var(--badge-bg, #ff4d4f);
      color: var(--badge-text, #ffffff);
      border-radius: 8px;
      flex-shrink: 0;
    `;
  }}
`;

export const MenuDivider = styled.div<{ $theme: MenuTheme }>`
  ${({ $theme }) => {
    const colors = useThemeColors();
    const menuColors = getMenuColors($theme, colors);

    return css`
      height: 1px;
      margin: 8px 0;
      background: ${menuColors.divider};
      overflow: hidden;
    `;
  }}
`;

// =============================================================================
// SUBMENU STYLES
// =============================================================================

export const StyledSubMenu = styled.li<StyledSubMenuProps>`
  ${({ $open, $disabled, $level, $mode, $size, $theme, accessibility }) => {
    const colors = useThemeColors();
    const dimensions = getMenuDimensions($size);
    const menuColors = getMenuColors($theme, colors);

    return css`
      position: relative;

      // Submenu title
      .submenu-title {
        position: relative;
        display: flex;
        align-items: center;
        min-height: ${dimensions.height};
        padding: ${dimensions.padding};
        padding-left: calc(
          ${dimensions.padding.split(" ")[1]} +
            (${$level} * ${dimensions.indent})
        );
        color: ${$disabled ? menuColors.textDisabled : menuColors.text};
        background: transparent;
        border: none;
        border-radius: ${dimensions.borderRadius};
        cursor: ${$disabled ? "not-allowed" : "pointer"};
        transition: all 0.2s ease-in-out;
        user-select: none;
        gap: ${dimensions.gap};
        width: 100%;
        text-align: left;
        font-size: inherit;
        font-family: inherit;

        &:hover {
          ${!$disabled &&
          css`
            background: ${menuColors.hover};
            color: ${menuColors.selected};
          `}
        }

        &:focus {
          outline: 2px solid ${menuColors.selected};
          outline-offset: 2px;
          z-index: 1;
        }

        // Arrow indicator
        &::after {
          content: "";
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%)
            rotate(${$open ? "180deg" : $mode === "inline" ? "0deg" : "270deg"});
          width: 0;
          height: 0;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-top: 6px solid currentColor;
          transition: transform 0.2s ease-in-out;

          ${accessibility?.reducedMotion &&
          css`
            transition: none;
          `}
        }

        // Accessibility
        ${accessibility?.largeText &&
        css`
          font-size: calc(${dimensions.fontSize} * 1.2);
        `}

        ${accessibility?.increasedSpacing &&
        css`
          padding: calc(${dimensions.padding.split(" ")[0]} * 1.5)
            calc(${dimensions.padding.split(" ")[1]} * 1.5);
          gap: calc(${dimensions.gap} * 1.5);
        `}
      }

      // Submenu content
      .submenu-content {
        overflow: hidden;
        transition: all 0.3s ease-in-out;

        ${$mode === "inline"
          ? css`
              max-height: ${$open ? "1000px" : "0"};
              opacity: ${$open ? "1" : "0"};
            `
          : css`
              position: absolute;
              left: 100%;
              top: 0;
              min-width: 200px;
              max-width: 300px;
              background: ${menuColors.background};
              border: 1px solid ${menuColors.border};
              border-radius: ${dimensions.borderRadius};
              box-shadow: 0 4px 12px ${menuColors.shadow};
              z-index: 1000;
              visibility: ${$open ? "visible" : "hidden"};
              opacity: ${$open ? "1" : "0"};
              transform: ${$open ? "translateX(0)" : "translateX(-8px)"};
              animation: ${$open ? menuSlideRight : "none"} 0.2s ease-out;
            `}

        ${accessibility?.reducedMotion &&
        css`
          transition: none;
          animation: none;
        `}

        .submenu-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }
      }
    `;
  }}
`;

// =============================================================================
// DROPDOWN STYLES
// =============================================================================

export const StyledDropdown = styled.div<StyledDropdownProps>`
  ${({ $placement, $visible, $size, $theme, accessibility }) => {
    const colors = useThemeColors();
    const dimensions = getMenuDimensions($size);
    const menuColors = getMenuColors($theme, colors);

    return css`
      position: absolute;
      z-index: 1050;
      min-width: 120px;
      max-width: 300px;
      background: ${menuColors.background};
      border: 1px solid ${menuColors.border};
      border-radius: ${dimensions.borderRadius};
      box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08),
        0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
      visibility: ${$visible ? "visible" : "hidden"};
      opacity: ${$visible ? "1" : "0"};
      transform: ${$visible ? "scale(1)" : "scale(0.95)"};
      transition: all 0.2s ease-in-out;
      animation: ${$visible ? menuSlideDown : menuSlideUp} 0.2s ease-out;

      ${getDropdownPlacement($placement)}

      // Accessibility
      ${accessibility?.reducedMotion &&
      css`
        transition: none;
        animation: none;
      `}
    `;
  }}
`;

export const DropdownArrow = styled.div<{ $placement: MenuPlacement }>`
  ${({ $placement }) => {
    const arrowSize = "8px";
    const arrowColor = "var(--dropdown-bg, #ffffff)";
    const borderColor = "var(--dropdown-border, #d9d9d9)";

    const arrows = {
      topLeft: css`
        position: absolute;
        top: 100%;
        left: 16px;
        border-left: ${arrowSize} solid transparent;
        border-right: ${arrowSize} solid transparent;
        border-top: ${arrowSize} solid ${arrowColor};

        &::before {
          content: "";
          position: absolute;
          top: -${arrowSize + 1}px;
          left: -${arrowSize}px;
          border-left: ${arrowSize} solid transparent;
          border-right: ${arrowSize} solid transparent;
          border-top: ${arrowSize} solid ${borderColor};
        }
      `,
      topRight: css`
        position: absolute;
        top: 100%;
        right: 16px;
        border-left: ${arrowSize} solid transparent;
        border-right: ${arrowSize} solid transparent;
        border-top: ${arrowSize} solid ${arrowColor};

        &::before {
          content: "";
          position: absolute;
          top: -${arrowSize + 1}px;
          left: -${arrowSize}px;
          border-left: ${arrowSize} solid transparent;
          border-right: ${arrowSize} solid transparent;
          border-top: ${arrowSize} solid ${borderColor};
        }
      `,
      bottomLeft: css`
        position: absolute;
        bottom: 100%;
        left: 16px;
        border-left: ${arrowSize} solid transparent;
        border-right: ${arrowSize} solid transparent;
        border-bottom: ${arrowSize} solid ${arrowColor};

        &::before {
          content: "";
          position: absolute;
          bottom: -${arrowSize + 1}px;
          left: -${arrowSize}px;
          border-left: ${arrowSize} solid transparent;
          border-right: ${arrowSize} solid transparent;
          border-bottom: ${arrowSize} solid ${borderColor};
        }
      `,
      bottomRight: css`
        position: absolute;
        bottom: 100%;
        right: 16px;
        border-left: ${arrowSize} solid transparent;
        border-right: ${arrowSize} solid transparent;
        border-bottom: ${arrowSize} solid ${arrowColor};

        &::before {
          content: "";
          position: absolute;
          bottom: -${arrowSize + 1}px;
          left: -${arrowSize}px;
          border-left: ${arrowSize} solid transparent;
          border-right: ${arrowSize} solid transparent;
          border-bottom: ${arrowSize} solid ${borderColor};
        }
      `,
      leftTop: css`
        position: absolute;
        left: 100%;
        top: 16px;
        border-top: ${arrowSize} solid transparent;
        border-bottom: ${arrowSize} solid transparent;
        border-left: ${arrowSize} solid ${arrowColor};

        &::before {
          content: "";
          position: absolute;
          left: -${arrowSize + 1}px;
          top: -${arrowSize}px;
          border-top: ${arrowSize} solid transparent;
          border-bottom: ${arrowSize} solid transparent;
          border-left: ${arrowSize} solid ${borderColor};
        }
      `,
      leftBottom: css`
        position: absolute;
        left: 100%;
        bottom: 16px;
        border-top: ${arrowSize} solid transparent;
        border-bottom: ${arrowSize} solid transparent;
        border-left: ${arrowSize} solid ${arrowColor};

        &::before {
          content: "";
          position: absolute;
          left: -${arrowSize + 1}px;
          top: -${arrowSize}px;
          border-top: ${arrowSize} solid transparent;
          border-bottom: ${arrowSize} solid transparent;
          border-left: ${arrowSize} solid ${borderColor};
        }
      `,
      rightTop: css`
        position: absolute;
        right: 100%;
        top: 16px;
        border-top: ${arrowSize} solid transparent;
        border-bottom: ${arrowSize} solid transparent;
        border-right: ${arrowSize} solid ${arrowColor};

        &::before {
          content: "";
          position: absolute;
          right: -${arrowSize + 1}px;
          top: -${arrowSize}px;
          border-top: ${arrowSize} solid transparent;
          border-bottom: ${arrowSize} solid transparent;
          border-right: ${arrowSize} solid ${borderColor};
        }
      `,
      rightBottom: css`
        position: absolute;
        right: 100%;
        bottom: 16px;
        border-top: ${arrowSize} solid transparent;
        border-bottom: ${arrowSize} solid transparent;
        border-right: ${arrowSize} solid ${arrowColor};

        &::before {
          content: "";
          position: absolute;
          right: -${arrowSize + 1}px;
          top: -${arrowSize}px;
          border-top: ${arrowSize} solid transparent;
          border-bottom: ${arrowSize} solid transparent;
          border-right: ${arrowSize} solid ${borderColor};
        }
      `,
    };

    return arrows[$placement] || arrows.bottomLeft;
  }}
`;

// =============================================================================
// BREADCRUMB STYLES
// =============================================================================

export const StyledBreadcrumb = styled.nav<StyledBreadcrumbProps>`
  ${({ $size, accessibility }) => {
    const dimensions = getMenuDimensions($size);

    return css`
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      font-size: ${dimensions.fontSize};
      line-height: ${dimensions.lineHeight};
      gap: ${dimensions.gap};

      // Accessibility
      ${accessibility?.largeText &&
      css`
        font-size: calc(${dimensions.fontSize} * 1.2);
      `}

      ${accessibility?.increasedSpacing &&
      css`
        gap: calc(${dimensions.gap} * 1.5);
      `}
    `;
  }}
`;

export const BreadcrumbItem = styled.div<{
  $clickable: boolean;
  $last: boolean;
}>`
  ${({ $clickable, $last }) => {
    const colors = useThemeColors();

    return css`
      display: flex;
      align-items: center;
      gap: 8px;
      color: ${$last
        ? colors.text?.primary || "#333333"
        : colors.text?.secondary || "#666666"};
      cursor: ${$clickable ? "pointer" : "default"};
      transition: color 0.2s ease-in-out;

      ${$clickable &&
      css`
        &:hover {
          color: ${colors.primary?.[500] || "#1890ff"};
        }
      `}

      ${$last &&
      css`
        font-weight: 500;
      `}
    `;
  }}
`;

export const BreadcrumbLink = styled.a`
  color: inherit;
  text-decoration: none;
  transition: color 0.2s ease-in-out;

  &:hover {
    text-decoration: underline;
  }

  &:focus {
    outline: 2px solid var(--focus-color, #1890ff);
    outline-offset: 2px;
    border-radius: 4px;
  }
`;

export const BreadcrumbSeparator = styled.span`
  color: var(--separator-color, #cccccc);
  user-select: none;
  font-size: 0.875em;
`;

export const BreadcrumbOverflow = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: none;
  background: transparent;
  color: var(--text-secondary, #666666);
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: var(--hover-bg, #f5f5f5);
    color: var(--primary-color, #1890ff);
  }

  &:focus {
    outline: 2px solid var(--focus-color, #1890ff);
    outline-offset: 2px;
  }
`;

// =============================================================================
// LOADING AND EMPTY STATES
// =============================================================================

export const MenuSkeleton = styled.div<{ $mode: MenuMode; $size: MenuSize }>`
  ${({ $mode, $size }) => {
    const dimensions = getMenuDimensions($size);

    return css`
      display: ${$mode === "horizontal" ? "flex" : "block"};
      gap: ${dimensions.gap};

      .skeleton-item {
        height: ${dimensions.height};
        background: linear-gradient(
          90deg,
          #f0f0f0 25%,
          #e0e0e0 50%,
          #f0f0f0 75%
        );
        background-size: 200% 100%;
        border-radius: ${dimensions.borderRadius};
        animation: ${breadcrumbLoading} 1.5s ease-in-out infinite;
        margin-bottom: ${$mode === "horizontal" ? "0" : "4px"};
        width: ${$mode === "horizontal" ? "120px" : "100%"};
      }
    `;
  }}
`;

export const MenuEmpty = styled.div<{ $size: MenuSize }>`
  ${({ $size }) => {
    const dimensions = getMenuDimensions($size);

    return css`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: calc(${dimensions.padding} * 2);
      color: var(--text-tertiary, #cccccc);
      font-size: ${dimensions.fontSize};
      text-align: center;
      min-height: 120px;

      .empty-icon {
        font-size: calc(${dimensions.fontSize} * 2);
        margin-bottom: ${dimensions.gap};
        opacity: 0.5;
      }

      .empty-text {
        opacity: 0.8;
      }
    `;
  }}
`;

// =============================================================================
// PREDEFINED STYLED VARIANTS
// =============================================================================

export const HorizontalMenu = styled(StyledMenu).attrs({
  $mode: "horizontal",
})``;
export const VerticalMenu = styled(StyledMenu).attrs({ $mode: "vertical" })``;
export const InlineMenu = styled(StyledMenu).attrs({ $mode: "inline" })``;
export const CollapsedMenu = styled(StyledMenu).attrs({ $mode: "collapsed" })``;

export const LightMenu = styled(StyledMenu).attrs({ $theme: "light" })``;
export const DarkMenu = styled(StyledMenu).attrs({ $theme: "dark" })``;

export const SmallMenu = styled(StyledMenu).attrs({ $size: "sm" })``;
export const LargeMenu = styled(StyledMenu).attrs({ $size: "lg" })``;

export const NavigationMenu = styled(StyledMenu)`
  border: none;
  background: transparent;
  box-shadow: none;
`;

export const SidebarMenu = styled(StyledMenu).attrs({
  $mode: "inline",
  $theme: "light",
})`
  border-right: 1px solid var(--border-color, #f0f0f0);
  height: 100vh;
  overflow-y: auto;
`;

export const TopbarMenu = styled(StyledMenu).attrs({
  $mode: "horizontal",
  $theme: "light",
})`
  border-bottom: 1px solid var(--border-color, #f0f0f0);
  border-left: none;
  border-right: none;
  border-top: none;
  border-radius: 0;
`;

export const ContextMenu = styled(StyledMenu).attrs({ $mode: "vertical" })`
  min-width: 160px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
`;

export const DropdownMenu = styled(StyledMenu).attrs({ $mode: "vertical" })`
  min-width: 120px;
  max-height: 300px;
  overflow-y: auto;
`;
