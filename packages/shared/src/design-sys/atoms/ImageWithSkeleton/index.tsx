import React, { useState } from "react";
import { ImageWithSkeletonProps } from "./ImageWithSkeleton.types";
import { ImageContainer, StyledImage, SkeletonOverlay } from "./ImageWithSkeleton.styles";
import { SkeletonImage } from "../Skeleton";

export const ImageWithSkeleton: React.FC<ImageWithSkeletonProps> = ({
  src,
  alt,
  width,
  height,
  aspectRatio,
  objectFit = "cover",
  borderRadius,
  className,
  containerClassName,
  loading = "lazy",
  onLoad,
  onError,
  style,
  ...rest
}) => {
  const [loaded, setLoaded] = useState(false);

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setLoaded(true);
    if (onLoad) onLoad(e);
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setLoaded(true);
    if (onError) onError(e);
  };

  return (
    <ImageContainer
      className={containerClassName}
      $width={width}
      $height={height}
      $aspectRatio={aspectRatio}
      $borderRadius={borderRadius}
      style={style}
    >
      {!loaded && (
        <SkeletonOverlay $loaded={loaded}>
          <SkeletonImage
            style={{ width: "100%", height: "100%", borderRadius: borderRadius || "inherit" }}
            active
            animation="wave"
          />
        </SkeletonOverlay>
      )}
      <StyledImage
        src={src}
        alt={alt}
        loading={loading}
        $loaded={loaded}
        $objectFit={objectFit}
        $borderRadius={borderRadius}
        onLoad={handleLoad}
        onError={handleError}
        className={className}
        {...rest}
      />
    </ImageContainer>
  );
};

export default ImageWithSkeleton;
