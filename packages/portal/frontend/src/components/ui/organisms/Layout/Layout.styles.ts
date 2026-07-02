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
  background: ${({ theme }) => theme?.colors?.background?.card || "#fff"};
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  transition: width 0.2s;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const StyledHeader = styled.div`
  padding: 0 24px;
  background: ${({ theme }) => theme?.colors?.background?.card || "#fff"};
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  height: 64px;
  flex-shrink: 0;
`;

export const StyledContent = styled.div<{ style?: React.CSSProperties }>`
  @media (max-width: 767px) {
    margin: ${({ theme, style }) => {
      // Si hay un margin en style inline, respetarlo (para app-layout.tsx)
      if (style?.margin) return style.margin;
      
      const mobileSpacing = theme?.spacing?.mobile;
      const topBottom = mobileSpacing?.xl || "21px";
      const leftRight = mobileSpacing?.md || "8px"; // Usar md (8px) del sistema mobile
      return `${topBottom} ${leftRight}`;
    }};
    padding: ${({ theme, style }) => {
      // Si hay un padding en style inline, respetarlo
      if (style?.padding) return style.padding;
      
      const mobileSpacing = theme?.spacing?.mobile;
      return mobileSpacing?.md || "8px";
    }};
    /* Remover width para evitar overflow - el contenido se ajusta automáticamente */
    max-width: 100%;
    box-sizing: border-box;
  }
  
  @media (min-width: 768px) {
    margin: ${({ theme, style }) => {
      // Si hay un margin en style inline, respetarlo
      if (style?.margin) return style.margin;
      return theme?.spacing?.xl || "24px";
    }};
    padding: ${({ theme, style }) => {
      // Si hay un padding en style inline, respetarlo
      if (style?.padding) return style.padding;
      return theme?.spacing?.xl || "24px";
    }};
  }
  
  background: ${({ theme }) => theme?.colors?.background?.card || "#fff"};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  min-height: calc(100vh - 112px);
  overflow: auto;
  flex: 1;
`;
