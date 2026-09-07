import React from "react";
import { useBreadcrumbs } from "../hooks/useBreadcrumbs";
import { useResponsive } from "../hooks/useResponsive";
import SEO from "./SEO";
import Text from '@design-sys/atoms/Text';
import { BreadcrumbsProps } from "./Breadcrumbs.types";
import { IconContainer, BreadcrumbLink, CustomBreadcrumb } from "./Breadcrumbs.styles";

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  className,
  separator = ">",
  showHome = true,
}) => {
  const { breadcrumbs, structuredData } = useBreadcrumbs();
  const { isMobile } = useResponsive();

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
      />
    </>
  );
};

export default Breadcrumbs;
