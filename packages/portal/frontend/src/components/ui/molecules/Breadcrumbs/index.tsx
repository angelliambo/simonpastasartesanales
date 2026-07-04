import React from "react";
import { Breadcrumb } from '@design-sys/atoms/Breadcrumb';
import Text from '@design-sys/atoms/Text';
import { Link } from "react-router-dom";
import {
  useBreadcrumbs,
  useThemeColors,
  useResponsive,
} from "../../../../hooks";
import SEO from "../../../SEO";

interface BreadcrumbsProps {
  className?: string;
  style?: React.CSSProperties;
  separator?: string;
  showHome?: boolean;
  /** ID único del componente (opcional) - se concatena con "breadcrumbs-" */
  id?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  className,
  style,
  separator = ">",
  showHome = true,
  id,
}) => {
  const { breadcrumbs, structuredData } = useBreadcrumbs();
  const colors = useThemeColors();
  const { isMobile } = useResponsive();

  // Filtrar breadcrumbs si no se quiere mostrar home
  const displayBreadcrumbs = showHome ? breadcrumbs : breadcrumbs.slice(1);

  const breadcrumbItems = displayBreadcrumbs.map((item, index) => {
    const isLast = index === displayBreadcrumbs.length - 1;

    return {
      key: item.url || `item-${index}`,
      title: isLast ? (
        <Text
          weight="semibold"
          style={{
            color: colors.primary[500],
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          {item.icon && <span style={{ marginRight: 8 }}>{item.icon}</span>}
          {item.name}
        </Text>
      ) : (
        <Link
          to={item.url}
          style={{
            color: colors.text.secondary,
            textDecoration: "none",
            transition: "color 0.3s",
            display: "inline-flex",
            alignItems: "center",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = colors.primary[500];
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = colors.text.secondary;
          }}
        >
          {item.icon && <span style={{ marginRight: 8 }}>{item.icon}</span>}
          {item.name}
        </Link>
      ),
      href: !isLast ? item.url : undefined,
      icon: item.icon,
    };
  });

  const finalId = id ? `breadcrumbs-${id}` : undefined;

  return (
    <>
      <SEO structuredData={structuredData} />
      <Breadcrumb
        id={finalId}
        items={breadcrumbItems}
        separator={
          separator === ">" ? "greater" : separator === "/" ? "slash" : "arrow"
        }
        size={isMobile ? "sm" : "md"}
        className={className}
        style={{
          margin: "0 0 16px 0",
          padding: isMobile ? "6px 12px" : "8px 16px",
          backgroundColor: colors.background.secondary,
          borderRadius: isMobile ? "4px" : "6px",
          border: `1px solid ${colors.border.light}`,
          ...style,
        }}
      />
    </>
  );
};

export default Breadcrumbs;
