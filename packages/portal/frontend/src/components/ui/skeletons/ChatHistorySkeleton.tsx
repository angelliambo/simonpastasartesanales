import React from "react";
import { Skeleton, SkeletonAvatar } from '@design-sys/atoms/Skeleton';
import { useResponsive } from "../../../hooks/useResponsive";

interface ChatHistorySkeletonProps {
  itemsCount?: number;
}

export const ChatHistorySkeleton: React.FC<ChatHistorySkeletonProps> = ({
  itemsCount = 5,
}) => {
  const { isMobile } = useResponsive();

  return (
    <div style={{ padding: isMobile ? "12px" : "16px", width: "100%", maxWidth: "100%", overflow: "hidden" }}>
      {Array.from({ length: itemsCount }).map((_, index) => (
        <div
          key={`skeleton-chat-${index}`}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: isMobile ? "12px" : "16px",
            padding: isMobile ? "8px" : "12px",
            width: "100%",
          }}
        >
          <SkeletonAvatar size={isMobile ? "sm" : "md"} shape="circle" active />
          <div style={{ flex: 1, marginLeft: isMobile ? "8px" : "12px", width: "100%", minWidth: 0 }}>
            <Skeleton
              active
              title={{ width: isMobile ? "50%" : "40%" }}
              paragraph={{ rows: 1, width: [isMobile ? "90%" : "80%"] }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

