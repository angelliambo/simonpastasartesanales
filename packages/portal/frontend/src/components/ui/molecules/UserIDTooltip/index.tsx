import React, { useState } from "react";
import Tooltip from '@design-sys/atoms/Tooltip';
import { message } from '@design-sys/atoms/Message';
import { CopyOutlined } from "@ant-design/icons";
import { ZnIcon } from "@shared/design-sys/atoms/ZnIcon";
import {
  TooltipContainer,
  TooltipLabel,
  IdCodeBlock,
  CopyButton,
} from "./UserIDTooltip.styles";

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
    <TooltipContainer>
      <TooltipLabel>
        ID completo:
      </TooltipLabel>
      <IdCodeBlock>
        {id}
      </IdCodeBlock>
      <CopyButton
        variant="secondary"
        size="sm"
        onClick={() => copyToClipboard(id)}
      >
        <ZnIcon icon={CopyOutlined} />
        Copiar ID
      </CopyButton>
    </TooltipContainer>
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
