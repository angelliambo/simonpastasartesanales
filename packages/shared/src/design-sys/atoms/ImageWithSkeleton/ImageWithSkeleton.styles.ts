import styled from "styled-components";

export const ImageContainer = styled.div<{
  $width?: number | string;
  $height?: number | string;
  $aspectRatio?: string;
  $borderRadius?: string;
}>`
  position: relative;
  display: inline-block;
  overflow: hidden;
  width: ${({ $width }) => (typeof $width === "number" ? `${$width}px` : $width || "100%")};
  height: ${({ $height }) => (typeof $height === "number" ? `${$height}px` : $height || "auto")};
  ${({ $aspectRatio }) => ($aspectRatio ? `aspect-ratio: ${$aspectRatio};` : "")}
  ${({ $borderRadius }) => ($borderRadius ? `border-radius: ${$borderRadius};` : "")}
`;

export const StyledImage = styled.img<{
  $loaded: boolean;
  $objectFit?: string;
  $borderRadius?: string;
}>`
  width: 100%;
  height: 100%;
  object-fit: ${({ $objectFit }) => $objectFit || "cover"};
  ${({ $borderRadius }) => ($borderRadius ? `border-radius: ${$borderRadius};` : "")}
  opacity: ${({ $loaded }) => ($loaded ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
  display: block;
`;

export const SkeletonOverlay = styled.div<{ $loaded: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  opacity: ${({ $loaded }) => ($loaded ? 0 : 1)};
  pointer-events: ${({ $loaded }) => ($loaded ? "none" : "auto")};
  transition: opacity 0.3s ease-in-out;
  z-index: 1;
`;
