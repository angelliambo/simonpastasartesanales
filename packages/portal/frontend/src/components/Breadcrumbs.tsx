import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useBreadcrumbs } from "../hooks/useBreadcrumbs";
import { useResponsive } from "../hooks/useResponsive";
import SEO from "./SEO";
import { Breadcrumb } from '@design-sys/atoms/Breadcrumb';
import Text from '@design-sys/atoms/Text';

interface BreadcrumbsProps {
  className?: string;
  style?: React.CSSProperties;
  separator?: string;
  showHome?: boolean;
}

const IconContainer = styled.span`
  margin-right: 8px;
`;

const BreadcrumbLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text.secondary};
  text-decoration: none;
  transition: color 0.3s;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary[500]};
  }
`;

const CustomBreadcrumb = styled(Breadcrumb)<{ $isMobile: boolean }>`
  margin: 0 0 16px 0;
  font-size: ${({ $isMobile }) => ($isMobile ? "12px" : "14px")};
  padding: ${({ $isMobile }) => ($isMobile ? "6px 12px" : "8px 16px")};
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ $isMobile }) => ($isMobile ? "4px" : "6px")};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
`;

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  className,
  style,
  separator = ">",
  showHome = true,
}) => {
  const { breadcrumbs, structuredData } = useBreadcrumbs();
  const { isMobile } = useResponsive();

  // Filtrar breadcrumbs si no se quiere mostrar home
  const displayBreadcrumbs = showHome ? breadcrumbs : breadcrumbs.slice(1);

  const breadcrumbItems = displayBreadcrumbs.map((item, index) => {
    const isLast = index === displayBreadcrumbs.length - 1;

    return {
      key: index,
      title: isLast ? (
        <Text weight="semibold" color="primary">
          {item.icon && <IconContainer>{item.icon}</IconContainer>}
          {item.name}
        </Text>
      ) : (
        <BreadcrumbLink to={item.url}>
          {item.icon && <IconContainer>{item.icon}</IconContainer>}
          {item.name}
        </BreadcrumbLink>
      ),
    };
  });

  return (
    <>
      <SEO structuredData={structuredData} />
      <CustomBreadcrumb
        $isMobile={isMobile}
        items={breadcrumbItems}
        separator={separator}
        className={className}
        style={style}
      />
    </>
  );
};

export default Breadcrumbs;
