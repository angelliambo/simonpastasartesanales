import React from "react";
import styled from "styled-components";
import { Skeleton, SkeletonImage, SkeletonAvatar } from "./index";

const StyledCardSkeletonWrapper = styled.div<{ $variant?: "card" | "social" }>`
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.background.card || theme.colors.background.surface || "rgba(255, 255, 255, 0.05)"};
  border: 1px solid ${({ theme }) => theme.colors.border?.light || "rgba(255, 255, 255, 0.1)"};
  padding: ${({ theme }) => theme.spacing.lg || "24px"};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md || "16px"};
  width: 100%;
  box-sizing: border-box;
`;

const SocialHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SocialHeaderText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
`;

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
