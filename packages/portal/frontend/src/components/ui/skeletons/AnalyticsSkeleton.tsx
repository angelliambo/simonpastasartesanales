import React from "react";
import Card from '@design-sys/atoms/Card';
import { Row, Col } from '@design-sys/atoms/Grid';
import { Skeleton } from '@design-sys/atoms/Skeleton';
import { useResponsive } from "../../../hooks/useResponsive";

interface AnalyticsSkeletonProps {
  statsCount?: number;
}

export const AnalyticsSkeleton: React.FC<AnalyticsSkeletonProps> = ({
  statsCount = 4,
}) => {
  const { isMobile } = useResponsive();

  return (
    <Row gutter={[isMobile ? 8 : 16, isMobile ? 8 : 16]}>
      {Array.from({ length: statsCount }).map((_, index) => (
        <Col xs={24} sm={12} md={8} lg={6} key={`skeleton-stat-${index}`}>
          <Card>
            <Skeleton
              active
              paragraph={{ rows: isMobile ? 1 : 2 }}
              title={{ width: isMobile ? "70%" : "60%" }}
            />
          </Card>
        </Col>
      ))}
      <Col xs={24} sm={24} md={24}>
        <Card>
          <Skeleton
            active
            title={{ width: isMobile ? "60%" : "40%" }}
            paragraph={{ rows: isMobile ? 2 : 3 }}
          />
        </Card>
      </Col>
    </Row>
  );
};

