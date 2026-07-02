import React, { useState, useEffect, useMemo, Children } from "react";
import {
  TabsProps,
  TabPaneProps,
  TabItem,
  TABS_DEFAULTS,
  SIZE_MAPPING_TABS,
} from "./Tabs.types";
import { useThemeColors } from "../../../../hooks";
import { usePersonalization } from "../../../../contexts/PersonalizationContext";

// =====================================
// HELPER FUNCTIONS
// =====================================

// Mapear AllSize a TabsSize usando shared system
const mapTabsSize = (size: TabsProps["size"]) => {
  if (!size) return TABS_DEFAULTS.size;

  const mapped = SIZE_MAPPING_TABS[size];
  return mapped || TABS_DEFAULTS.size;
};

// Extraer TabPane de children
const extractTabPanes = (children: React.ReactNode): TabPaneProps[] => {
  const panes: TabPaneProps[] = [];
  
  Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.type === TabPane) {
      const props = child.props as TabPaneProps;
      panes.push({
        tab: props.tab,
        key: props.key || String(panes.length),
        disabled: props.disabled,
        closable: props.closable,
        icon: props.icon,
        children: props.children,
      });
    }
  });
  
  return panes;
};

// =====================================
// TAB PANE COMPONENT
// =====================================

/**
 * TabPane Component - Componente individual de tab (compatible con Ant Design)
 */
export const TabPane: React.FC<TabPaneProps> = ({ children }) => {
  return <>{children}</>;
};

// =====================================
// TABS COMPONENT
// =====================================

/**
 * Tabs Component - Componente de tabs unificado y accesible
 *
 * 🎯 APLICANDO SHARED SYSTEMS:
 * - ✅ size acepta AllSize con mapeo automático
 * - ✅ Soporte para children con TabPane o items array
 * - ✅ Compatible 100% con Ant Design Tabs
 *
 * Reemplazo directo de Ant Design Tabs con sistema unificado.
 */
export const Tabs: React.FC<TabsProps> = ({
  activeKey: activeKeyProp,
  defaultActiveKey,
  onChange,
  size = TABS_DEFAULTS.size,
  type = TABS_DEFAULTS.type,
  tabPosition = TABS_DEFAULTS.tabPosition,
  centered = TABS_DEFAULTS.centered,
  className,
  style,
  children,
  items,
  id,
  accessibility: accessibilityProp,
}) => {
  // 🎯 HOOKS PARA ACCESIBILIDAD (OBLIGATORIO)
  const { accessibility: contextAccessibility } = usePersonalization();

  // Combinar props de accesibilidad
  const accessibility = {
    ...contextAccessibility,
    ...accessibilityProp,
  };

  const colors = useThemeColors();
  const [internalActiveKey, setInternalActiveKey] = useState(
    activeKeyProp || defaultActiveKey || ""
  );

  // 🎯 MAPEO CON SHARED SYSTEMS (OBLIGATORIO)
  const mappedSize = mapTabsSize(size);

  // Convertir children a items si es necesario
  const tabItems = useMemo(() => {
    if (items) {
      return items;
    }
    if (children) {
      return extractTabPanes(children).map((pane) => ({
        key: pane.key,
        label: pane.tab,
        children: pane.children,
        disabled: pane.disabled,
        closable: pane.closable,
        icon: pane.icon,
      }));
    }
    return [];
  }, [items, children]);

  // Active key controlado o no controlado
  const activeKey =
    activeKeyProp !== undefined ? activeKeyProp : internalActiveKey;

  useEffect(() => {
    if (tabItems.length > 0 && !activeKey) {
      const firstEnabledKey = tabItems.find((item: TabItem) => !item.disabled)?.key;
      if (firstEnabledKey) {
        setInternalActiveKey(firstEnabledKey);
        onChange?.(firstEnabledKey);
      }
    }
  }, [tabItems, activeKey, onChange]);

  const handleTabClick = (key: string) => {
    const item = tabItems.find((tab: TabItem) => tab.key === key);
    if (item?.disabled) return;

    if (activeKeyProp === undefined) {
      setInternalActiveKey(key);
    }
    onChange?.(key);
  };

  const activeItem = tabItems.find((item: TabItem) => item.key === activeKey);

  // Estilos según tamaño
  const sizeStyles = {
    sm: {
      fontSize: "12px",
      padding: "8px 12px",
    },
    md: {
      fontSize: "14px",
      padding: "12px 16px",
    },
    lg: {
      fontSize: "16px",
      padding: "16px 20px",
    },
  }[mappedSize];

  const finalId = id ? `tabs-${id}` : undefined;

  return (
    <div id={finalId} className={className} style={style}>
      {/* Tab Navigation Container */}
      <div
        style={{
          background: colors.background.secondary,
          borderRadius: type === "card" ? "16px 16px 0 0" : "0",
          padding: type === "card" ? "8px 8px 0 8px" : "0",
          border:
            type === "card"
              ? `1px solid ${colors.border.light}`
              : `0 0 1px 0 solid ${colors.border.light}`,
          borderBottom:
            type === "card" ? "none" : `1px solid ${colors.border.light}`,
          position: "relative",
        }}
      >
        {/* Tab Navigation */}
        <div
          style={{
            display: "flex",
            gap: "4px",
            position: "relative",
            justifyContent: centered ? "center" : "flex-start",
          }}
        >
          {tabItems.map((item, index) => {
            const isActive = item.key === activeKey;
            const isDisabled = item.disabled;

            return (
              <button
                key={item.key}
                onClick={() => handleTabClick(item.key)}
                disabled={isDisabled}
                style={{
                  background:
                    type === "card"
                      ? isActive
                        ? colors.background.card
                        : "transparent"
                      : "transparent",
                  border: "none",
                  borderTopLeftRadius: type === "card" ? "12px" : "0",
                  borderTopRightRadius: type === "card" ? "12px" : "0",
                  ...sizeStyles,
                  cursor: isDisabled ? "not-allowed" : "pointer",
                  position: "relative",
                  transition: accessibility?.reducedMotion
                    ? "none"
                    : "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  zIndex: isActive ? 3 : 1,
                  transform:
                    isActive && type === "card"
                      ? "translateY(-4px)"
                      : "translateY(0)",
                  boxShadow:
                    isActive && type === "card"
                      ? `0 8px 24px ${colors.shadow.light}, 0 0 0 1px ${colors.primary[200]}`
                      : "none",
                  color: isDisabled
                    ? colors.text.tertiary
                    : isActive
                    ? colors.primary[600]
                    : colors.text.secondary,
                  fontWeight: isActive ? 600 : 500,
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  minWidth: type === "card" ? "140px" : "auto",
                  justifyContent: "center",
                  opacity: isDisabled ? 0.5 : 1,
                  borderBottom:
                    type === "line" && isActive
                      ? `2px solid ${colors.primary[500]}`
                      : "none",
                }}
              >
                {('icon' in item && item.icon) && (
                  <span
                    style={{
                      fontSize: "16px",
                      color: isDisabled
                        ? colors.text.tertiary
                        : isActive
                        ? colors.primary[500]
                        : colors.text.secondary,
                      transition: accessibility?.reducedMotion
                        ? "none"
                        : "color 0.3s ease",
                    }}
                  >
                    {item.icon}
                  </span>
                )}
                <span
                  style={{
                    transition: accessibility?.reducedMotion
                      ? "none"
                      : "color 0.3s ease",
                    fontWeight: "inherit",
                  }}
                >
                  {item.label}
                </span>

                {/* Active indicator dot (solo para card type) */}
                {isActive && type === "card" && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "8px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "6px",
                      height: "6px",
                      background: colors.primary[500],
                      borderRadius: "50%",
                      boxShadow: `0 0 8px ${colors.primary[300]}`,
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      {activeItem && (
        <div
          style={{
            background: colors.background.card,
            borderRadius: type === "card" ? "0 0 16px 16px" : "0",
            padding:
              mappedSize === "sm"
                ? "16px"
                : mappedSize === "md"
                ? "24px"
                : "32px",
            border:
              type === "card"
                ? `1px solid ${colors.border.light}`
                : `0 1px 0 1px solid ${colors.border.light}`,
            borderTop: type === "card" ? "none" : "none",
            minHeight: "100px",
            boxShadow:
              type === "card" ? `0 4px 12px ${colors.shadow.light}` : "none",
            position: "relative",
          }}
        >
          {activeItem.children}
        </div>
      )}
    </div>
  );
};

// Asignar TabPane como propiedad estática (compatible con Ant Design)
const TabsComponent = Tabs as any;
TabsComponent.TabPane = TabPane;

export default TabsComponent;
