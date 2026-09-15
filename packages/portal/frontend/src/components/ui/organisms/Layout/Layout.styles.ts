import styled from "styled-components";

export const StyledLayout = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: row;
`;

export const StyledLayoutHorizontal = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const StyledSider = styled.div<{
  $collapsed: boolean;
  $width: number;
  $collapsedWidth: number;
}>`
  width: ${({ $collapsed, $width, $collapsedWidth }) =>
    $collapsed ? `${$collapsedWidth}px` : `${$width}px`};
  background: ${({ theme }) => theme.colors.background.card};
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  transition: width 0.2s;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const StyledHeader = styled.div`
  padding: 0 24px;
  background: ${({ theme }) => theme.colors.background.card};
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  height: 64px;
  flex-shrink: 0;
`;

export const StyledContent = styled.div<{ style?: React.CSSProperties }>`
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin: ${({ theme, style }) => {
      if (style?.margin) return style.margin;
      const mobileSpacing = theme.spacing.mobile;
      return mobileSpacing
        ? `${mobileSpacing.xl} ${mobileSpacing.md}`
        : `${theme.spacing.xl} ${theme.spacing.md}`;
    }};
    padding: ${({ theme, style }) => {
      if (style?.padding) return style.padding;
      return theme.spacing.mobile?.md ?? theme.spacing.md;
    }};
    max-width: 100%;
    box-sizing: border-box;
  }
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin: ${({ theme, style }) => {
      if (style?.margin) return style.margin;
      return theme.spacing.xl;
    }};
    padding: ${({ theme, style }) => {
      if (style?.padding) return style.padding;
      return theme.spacing.xl;
    }};
  }
  
  background: ${({ theme }) => theme.colors.background.card};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  min-height: calc(100vh - 112px);
  overflow: auto;
  flex: 1;
`;
