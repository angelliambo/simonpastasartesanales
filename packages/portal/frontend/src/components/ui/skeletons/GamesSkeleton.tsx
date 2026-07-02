import React from "react";
import Card from "../atoms/Card";
import { Skeleton, SkeletonImage } from "../atoms/Skeleton";
import { Row, Col } from "../atoms/Grid";
import { useResponsive } from "../../../hooks/useResponsive";

export const GamesSkeleton: React.FC = () => {
  const { isMobile } = useResponsive();

  return (
    <div style={{ padding: isMobile ? "16px" : "24px", width: "100%", maxWidth: "100%", overflow: "hidden" }}>
      {/* Título y descripción skeleton */}
      <div style={{ textAlign: "center", marginBottom: isMobile ? "24px" : "32px", width: "100%" }}>
        <Skeleton 
          active 
          title={{ width: isMobile ? "80%" : "400px" }} 
          paragraph={{ rows: 0 }} 
          style={{ margin: "0 auto 16px", maxWidth: "100%" }} 
        />
        <Skeleton 
          active 
          title={{ width: isMobile ? "90%" : "600px" }} 
          paragraph={{ rows: 0 }} 
          style={{ margin: "0 auto", maxWidth: "100%" }} 
        />
      </div>

      {/* Estadísticas skeleton */}
      <div style={{ marginBottom: isMobile ? "24px" : "32px", width: "100%" }}>
        <Skeleton 
          active 
          title={{ width: isMobile ? "50%" : "25%" }} 
          paragraph={{ rows: 0 }} 
          style={{ marginBottom: "16px" }} 
        />
        <Row gutter={[isMobile ? 8 : 16, isMobile ? 8 : 16]}>
          {[1, 2, 3, 4].map((i) => (
            <Col xs={24} sm={12} md={6} key={i}>
              <Card>
                <Skeleton active paragraph={{ rows: 2 }} />
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Juegos recomendados skeleton */}
      <div style={{ marginBottom: isMobile ? "24px" : "32px", width: "100%" }}>
        <Skeleton 
          active 
          title={{ width: isMobile ? "60%" : "30%" }} 
          paragraph={{ rows: 0 }} 
          style={{ marginBottom: "16px" }} 
        />
        <Row gutter={[isMobile ? 8 : 16, isMobile ? 8 : 16]}>
          {[1, 2, 3].map((i) => (
            <Col xs={24} sm={12} md={8} key={i}>
              <Card>
                <SkeletonImage style={{ width: "100%", height: isMobile ? "150px" : "200px", maxWidth: "100%" }} />
                <Skeleton active title={{ width: isMobile ? "70%" : "60%" }} paragraph={{ rows: 2 }} />
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Todos los juegos skeleton */}
      <div style={{ width: "100%" }}>
        <Skeleton 
          active 
          title={{ width: isMobile ? "70%" : "35%" }} 
          paragraph={{ rows: 0 }} 
          style={{ marginBottom: "16px" }} 
        />
        <Row gutter={[isMobile ? 8 : 16, isMobile ? 8 : 16]}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Col xs={24} sm={12} md={8} lg={6} key={i}>
              <Card>
                <SkeletonImage style={{ width: "100%", height: isMobile ? "140px" : "180px", maxWidth: "100%" }} />
                <Skeleton active title={{ width: isMobile ? "80%" : "70%" }} paragraph={{ rows: 1 }} />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

