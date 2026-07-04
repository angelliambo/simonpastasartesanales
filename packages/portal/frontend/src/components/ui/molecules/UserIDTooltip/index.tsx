import React, { useState } from "react";
import Tooltip from '@design-sys/atoms/Tooltip';
import Button from '@design-sys/atoms/Button';
import { message } from '@design-sys/atoms/Message';
import { CopyOutlined } from "@ant-design/icons";
import { ZnIcon } from "@shared/design-sys/atoms/ZnIcon";
import { useThemeColors } from "../../../../hooks/useThemeColors";

interface UserIDTooltipProps {
  id: string;
  children: React.ReactNode;
  placement?:
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "topLeft"
    | "topRight"
    | "bottomLeft"
    | "bottomRight";
}

const UserIDTooltip: React.FC<UserIDTooltipProps> = ({
  id,
  children,
  placement = "topLeft",
}) => {
  const colors = useThemeColors();
  const [isVisible, setIsVisible] = useState(false);

  // Función para copiar al portapapeles
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      message.success("ID copiado al portapapeles");
      setIsVisible(false); // Cerrar tooltip después de copiar
    } catch (err) {
      message.error("Error al copiar");
    }
  };

  const tooltipContent = (
    <div
      style={{
        backgroundColor: colors.background.card,
        border: `1px solid ${colors.border.normal}`,
        borderRadius: "8px",
        padding: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        maxWidth: "300px",
      }}
    >
      <div
        style={{
          marginBottom: "8px",
          fontSize: "12px",
          color: colors.text.secondary,
          fontWeight: 500,
        }}
      >
        ID completo:
      </div>
      <div
        style={{
          fontFamily: "monospace",
          fontSize: "11px",
          color: colors.text.primary,
          backgroundColor: colors.background.tertiary,
          padding: "6px 8px",
          borderRadius: "4px",
          marginBottom: "8px",
          wordBreak: "break-all",
          lineHeight: "1.4",
        }}
      >
        {id}
      </div>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => copyToClipboard(id)}
        style={{
          padding: 0,
          height: "auto",
          color: colors.primary[500],
          fontSize: "11px",
          fontWeight: 500,
        }}
      >
        <ZnIcon icon={CopyOutlined} style={{ marginRight: "4px" }} />
        Copiar ID
      </Button>
    </div>
  );

  return (
    <Tooltip
      title={tooltipContent}
      placement={placement}
      visible={isVisible}
      onVisibleChange={setIsVisible}
      overlayStyle={{
        maxWidth: "none",
        backgroundColor: "transparent",
        padding: 0,
        boxShadow: "none",
      }}
    >
      {React.isValidElement(children) ? children : <span>{children}</span>}
    </Tooltip>
  );
};

export default UserIDTooltip;
