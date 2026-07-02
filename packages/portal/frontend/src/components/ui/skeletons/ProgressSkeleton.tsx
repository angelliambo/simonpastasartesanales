import React from "react";
import Card from "../atoms/Card";
import { Skeleton } from "../atoms/Skeleton";
import { useResponsive } from "../../../hooks/useResponsive";

interface ProgressSkeletonProps {
  showCalendar?: boolean;
  showAchievements?: boolean;
}

export const ProgressSkeleton: React.FC<ProgressSkeletonProps> = ({
  showCalendar = true,
  showAchievements = true,
}) => {
  const { isMobile } = useResponsive();

  return (
    <div style={{ width: "100%", maxWidth: "100%", overflow: "hidden" }}>
      {/* Stats Skeleton */}
      <div style={{ marginBottom: isMobile ? "16px" : "24px", width: "100%" }}>
        <Card>
          <Skeleton
            active
            title={{ width: isMobile ? "50%" : "30%" }}
            paragraph={{ rows: isMobile ? 2 : 3 }}
          />
        </Card>
      </div>

      {/* Calendar Skeleton */}
      {showCalendar && (
        <div style={{ marginBottom: isMobile ? "16px" : "24px", width: "100%" }}>
          <Card>
            <Skeleton
              active
              title={{ width: isMobile ? "50%" : "25%" }}
              paragraph={{ rows: isMobile ? 6 : 8 }}
            />
          </Card>
        </div>
      )}

      {/* Achievements Skeleton */}
      {showAchievements && (
        <div style={{ width: "100%" }}>
          <Card>
            <Skeleton
              active
              title={{ width: isMobile ? "60%" : "35%" }}
              paragraph={{ 
                rows: isMobile ? 3 : 4, 
                width: isMobile ? ["100%", "90%"] : ["100%", "80%", "60%"] 
              }}
            />
          </Card>
        </div>
      )}
    </div>
  );
};

