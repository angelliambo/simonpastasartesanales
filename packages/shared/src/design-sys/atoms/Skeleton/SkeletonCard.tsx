import React from "react";
import { Skeleton, SkeletonImage, SkeletonAvatar } from "./index";
import {
  StyledCardSkeletonWrapper,
  SocialHeader,
  SocialHeaderText,
} from "./Skeleton.styles";

export interface SkeletonCardProps {
  className?: string;
  style?: React.CSSProperties;
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({ className, style }) => {
  return (
    <StyledCardSkeletonWrapper className={className} style={style}>
      <SkeletonImage style={{ width: "100%", height: "180px", borderRadius: "12px" }} active animation="wave" />
      <Skeleton title={{ width: "70%" }} paragraph={{ rows: 2, width: ["100%", "85%"] }} active animation="wave" />
    </StyledCardSkeletonWrapper>
  );
};

export const SocialFeedSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", width: "100%" }}>
      {Array.from({ length: count }).map((_, idx) => (
        <StyledCardSkeletonWrapper key={idx} $variant="social">
          <SocialHeader>
            <SkeletonAvatar shape="circle" size="md" active animation="wave" />
            <SocialHeaderText>
              <Skeleton title={{ width: "50%" }} paragraph={false} active animation="wave" />
              <Skeleton title={{ width: "30%" }} paragraph={false} active animation="wave" />
            </SocialHeaderText>
          </SocialHeader>
          <SkeletonImage style={{ width: "100%", height: "240px", borderRadius: "12px" }} active animation="wave" />
          <Skeleton paragraph={{ rows: 2, width: ["100%", "75%"] }} title={false} active animation="wave" />
        </StyledCardSkeletonWrapper>
      ))}
    </div>
  );
};
