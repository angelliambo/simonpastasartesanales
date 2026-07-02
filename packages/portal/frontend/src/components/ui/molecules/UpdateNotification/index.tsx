import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "../../atoms/Button";
import Card from "../../atoms/Card";
import Text from "../../atoms/Text";
import Space from "../../atoms/Space";
import {
  ReloadOutlined,
  CloseOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { ZnIcon } from "@design-sys/atoms/ZnIcon";
import { UpdateNotificationContainer } from "../../atoms/styles/updateNotification.mixins";

interface UpdateNotificationProps {
  onUpdate: () => void;
  onDismiss: () => void;
  isVisible: boolean;
  /** ID único del componente (opcional) - se concatena con "update-notification-" */
  id?: string;
}

const StyledCard = styled(Card)`
  border: none !important;
  border-radius: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  color: white !important;

  /* Override Card body padding */
  > div {
    padding: 20px !important;
  }
`;

const UpdateButton = styled(Button)`
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  border-radius: 8px;
  font-weight: 600;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
    color: white;
  }
`;

const DismissButton = styled(Button)`
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: rgba(255, 255, 255, 0.8);
  border-radius: 8px;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.5);
    color: white;
  }
`;

const UpdateNotification: React.FC<UpdateNotificationProps> = ({
  onUpdate,
  onDismiss,
  isVisible,
  id,
}) => {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    if (!isVisible) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          onUpdate();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isVisible, onUpdate]);

  if (!isVisible) return null;

  const finalId = id ? `update-notification-${id}` : undefined;

  return (
    <UpdateNotificationContainer id={finalId} $isVisible={isVisible}>
      <StyledCard>
        <Space direction="vertical" size="small" style={{ width: "100%" }}>
          <Space align="center">
            <ZnIcon icon={InfoCircleOutlined} size={20} style={{ color: "white" }} />
            <h4
              style={{
                color: "white",
                margin: 0,
                fontSize: "18px",
                fontWeight: 600,
                display: "inline-flex",
                alignItems: "center",
                gap: "6px"
              }}
            >
              <ZnIcon icon={ReloadOutlined} /> Nueva versión disponible
            </h4>
          </Space>

          <Text size="sm" style={{ color: "rgba(255, 255, 255, 0.9)" }}>
            Se encontraron mejoras y correcciones de bugs. La aplicación se
            actualizará automáticamente en {countdown} segundos.
          </Text>

          <Space style={{ width: "100%", justifyContent: "space-between" }}>
            <UpdateButton onClick={onUpdate} size="sm">
              <ZnIcon icon={ReloadOutlined} style={{ marginRight: "8px" }} />
              Actualizar ahora
            </UpdateButton>

            <DismissButton onClick={onDismiss} size="sm">
              <ZnIcon icon={CloseOutlined} style={{ marginRight: "8px" }} />
              Más tarde
            </DismissButton>
          </Space>
        </Space>
      </StyledCard>
    </UpdateNotificationContainer>
  );
};

export default UpdateNotification;
