import styled, { css } from "styled-components";
import { StyledAvatarProps } from "./Avatar.types";

// Mapeo de tamaños a valores de píxeles
const SIZE_VALUES: Record<string, number> = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 64,
  xl: 80,
  xxl: 128,
};

export const StyledAvatar = styled.div<StyledAvatarProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: ${({ $shape }) => ($shape === "circle" ? "50%" : "8px")};
  overflow: hidden;
  font-weight: 500;
  color: ${({ theme }) => theme.colors?.text?.primary || "#1a1a1a"};
  background-color: ${({ theme }) =>
    theme.colors?.background?.tertiary || "#e9ecef"};
  border: ${({ theme, accessibility }) =>
    accessibility?.highContrast
      ? `2px solid ${theme.colors?.border?.contrast || "#000"}`
      : `1px solid ${theme.colors?.border?.light || "#dee2e6"}`};

  /* Tamaños */
  ${({ $size, accessibility }) => {
    const baseSize = SIZE_VALUES[$size] || SIZE_VALUES.md;
    const multiplier = accessibility?.largeText ? 1.25 : 1;
    const size = baseSize * multiplier;

    return css`
      width: ${size}px;
      height: ${size}px;
      font-size: ${size * 0.4}px;
    `;
  }}

  /* Cursor pointer si es clickeable */
  ${({ $clickable }) =>
    $clickable &&
    css`
      cursor: pointer;
      transition: transform 0.2s ease, box-shadow 0.2s ease;

      &:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
      }

      &:active {
        transform: scale(0.98);
      }
    `}

  /* Imagen */
  ${({ $hasImage }) =>
    $hasImage &&
    css`
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    `}
`;

export const AvatarImage = styled.img.attrs({
  loading: "lazy"
})`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

export const AvatarIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;
