import styled, { css, keyframes } from 'styled-components';

const spinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// Helper to resolve nested theme color values (e.g. 'primary.500' -> theme.colors.primary[500])
const resolveColor = (colorStr: string | undefined, themeColors: any): string => {
  if (!colorStr) return 'inherit';
  
  const parts = colorStr.split('.');
  let current: any = themeColors;
  
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      return colorStr; // Fallback to raw color string if not found in theme
    }
  }
  
  return typeof current === 'string' ? current : colorStr;
};

export const IconWrapper = styled.span<{
  $size?: string | number;
  $color?: string;
  $clickable: boolean;
  $spin?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
  
  font-size: ${({ $size }) => (typeof $size === 'number' ? `${$size}px` : $size || 'inherit')};
  color: ${({ theme, $color }) => resolveColor($color, theme.colors)};
  
  .anticon {
    color: inherit;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  svg {
    display: inline-block;
    color: currentColor;
    fill: currentColor;
    width: 1em;
    height: 1em;
  }

  ${({ $spin }) =>
    $spin &&
    css`
      animation: ${spinAnimation} 1.2s infinite linear;
    `}

  ${({ $clickable }) =>
    $clickable &&
    css`
      cursor: pointer;
      user-select: none;
      transition: transform 0.15s ease, opacity 0.15s ease;

      &:hover {
        opacity: 0.85;
        transform: scale(1.08);
      }

      &:active {
        transform: scale(0.95);
      }
    `}
`;
