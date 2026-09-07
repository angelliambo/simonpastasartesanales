import React, { useState, useEffect } from "react";
import Space from '@design-sys/atoms/Space';
import Tooltip from '@design-sys/atoms/Tooltip';
import { DisconnectOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { ZnIcon } from "@shared/design-sys/atoms/ZnIcon";
import { useOffline } from "../hooks/useOffline";
import { OfflineIndicatorProps } from "./OfflineIndicator.types";
import { IndicatorContainer, WhiteText } from "./OfflineIndicator.styles";

const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({
  showDetails = false,
  position = "top",
}) => {
  const { isOnline, isOffline } = useOffline();
  const [isVisible, setIsVisible] = useState(false);
  const [showSyncMessage, setShowSyncMessage] = useState(false);
  const [hasShownInitialMessage, setHasShownInitialMessage] = useState(false);

  useEffect(() => {
    if (isOffline) {
      setIsVisible(true);
      setHasShownInitialMessage(false);
      localStorage.setItem("app-went-offline", "true");
    } else if (isOnline) {
      setIsVisible(false);
      setShowSyncMessage(false);

      const wasOffline = localStorage.getItem("app-went-offline");
      if (wasOffline && !hasShownInitialMessage) {
        setShowSyncMessage(true);
        setHasShownInitialMessage(true);
        localStorage.removeItem("app-went-offline");

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
      >
        {getContent()}
      </IndicatorContainer>
    </Tooltip>
  );
};

export default OfflineIndicator;
