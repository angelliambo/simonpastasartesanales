import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Space from '@design-sys/atoms/Space';
import Tooltip from '@design-sys/atoms/Tooltip';
import { DisconnectOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { ZnIcon } from "@shared/design-sys/atoms/ZnIcon";
import { useOffline } from "../hooks/useOffline";
import Text from '@design-sys/atoms/Text';

interface OfflineIndicatorProps {
  showDetails?: boolean;
  position?: "top" | "bottom";
  style?: React.CSSProperties;
}

const IndicatorContainer = styled.div<{
  $isVisible: boolean;
  $isOffline: boolean;
  $showSyncMessage: boolean;
  $position: "top" | "bottom";
}>`
  position: fixed;
  left: 50%;
  z-index: 1000; // Below navbar (1100) but above other content
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  box-shadow: 0 2px 8px ${({ theme }) => theme.colors.shadow.medium};
  transition: all 0.3s ease-in-out;
  opacity: ${({ $isVisible, $showSyncMessage }) => ($isVisible || $showSyncMessage ? 1 : 0)};
  transform: ${({ $isVisible, $showSyncMessage }) =>
    $isVisible || $showSyncMessage
      ? "translateX(-50%) translateY(0)"
      : "translateX(-50%) translateY(-20px)"};
  
  background: ${({ $isOffline, $showSyncMessage, theme }) =>
    $isOffline ? theme.colors.error[500] : ($showSyncMessage ? theme.colors.success[500] : "transparent")};
  color: white;
  top: ${({ $position }) => ($position === "top" ? "80px" : "auto")};
  bottom: ${({ $position }) => ($position === "bottom" ? "20px" : "auto")};
`;

const WhiteText = styled(Text)`
  color: white;
`;

const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({
  showDetails = false,
  position = "top",
  style,
}) => {
  const { isOnline, isOffline } = useOffline();
  const [isVisible, setIsVisible] = useState(false);
  const [showSyncMessage, setShowSyncMessage] = useState(false);
  const [hasShownInitialMessage, setHasShownInitialMessage] = useState(false);

  // Solo mostrar cuando esté OFFLINE - ocultar completamente cuando esté ONLINE
  useEffect(() => {
    if (isOffline) {
      setIsVisible(true);
      setHasShownInitialMessage(false);
      // Marcar que la app estuvo offline
      localStorage.setItem("app-went-offline", "true");
    } else if (isOnline) {
      // Cuando vuelve ONLINE, ocultar inmediatamente
      setIsVisible(false);
      setShowSyncMessage(false);

      // Solo mostrar mensaje de sincronización si realmente se restauró la conexión
      const wasOffline = localStorage.getItem("app-went-offline");
      if (wasOffline && !hasShownInitialMessage) {
        setShowSyncMessage(true);
        setHasShownInitialMessage(true);
        // Limpiar el flag de offline
        localStorage.removeItem("app-went-offline");

        // Ocultar el mensaje de sincronización después de 2 segundos
        setTimeout(() => {
          setShowSyncMessage(false);
        }, 2000);
      }
    }
  }, [isOnline, isOffline, hasShownInitialMessage]);

  const getContent = () => {
    if (isOffline) {
      return (
        <Space size="small">
          <ZnIcon icon={DisconnectOutlined} />
          <WhiteText>Sin conexión</WhiteText>
        </Space>
      );
    } else if (showSyncMessage) {
      return (
        <Space size="small">
          <ZnIcon icon={CheckCircleOutlined} />
          <WhiteText>Conexión restaurada</WhiteText>
        </Space>
      );
    }

    return null;
  };

  if (!isVisible && !showSyncMessage) {
    return null;
  }

  const getTooltipTitle = () => {
    if (!showDetails) return undefined;

    if (isOffline) {
      return "Recarga la página para restaurar la conexión";
    } else {
      return "Conexión restaurada. Los datos se están sincronizando automáticamente";
    }
  };

  return (
    <Tooltip
      title={getTooltipTitle()}
      placement={position === "top" ? "bottom" : "top"}
    >
      <IndicatorContainer
        $isVisible={isVisible}
        $isOffline={isOffline}
        $showSyncMessage={showSyncMessage}
        $position={position}
        style={style}
      >
        {getContent()}
      </IndicatorContainer>
    </Tooltip>
  );
};

export default OfflineIndicator;
