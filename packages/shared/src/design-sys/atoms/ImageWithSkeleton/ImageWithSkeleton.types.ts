import { ImgHTMLAttributes } from "react";

export interface ImageWithSkeletonProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  aspectRatio?: string;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  borderRadius?: string;
  containerClassName?: string;
}
