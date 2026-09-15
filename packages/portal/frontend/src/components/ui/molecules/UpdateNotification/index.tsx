import React, { useState, useEffect } from "react";
import Space from '@design-sys/atoms/Space';
import {
  ReloadOutlined,
  CloseOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { ZnIcon } from "@design-sys/atoms/ZnIcon";
import { UpdateNotificationContainer } from '@design-sys/atoms/styles/updateNotification.mixins';
import { UpdateNotificationProps } from "./UpdateNotification.types";
import {
  StyledCard,
  CardHeaderTitle,
  NotificationBodyText,
  FullWidthSpace,
  ActionsSpace,
  UpdateButton,
  DismissButton,
} from "./UpdateNotification.styles";

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
        <FullWidthSpace direction="vertical" size="small">
          <Space align="center">
            <ZnIcon icon={InfoCircleOutlined} size={20} />
            <CardHeaderTitle>
              <ZnIcon icon={ReloadOutlined} /> Nueva versión disponible
            </CardHeaderTitle>
          </Space>

          <NotificationBodyText size="sm">
            Se encontraron mejoras y correcciones de bugs. La aplicación se
            actualizará automáticamente en {countdown} segundos.
          </NotificationBodyText>

          <ActionsSpace>
            <UpdateButton onClick={onUpdate} size="sm">
              <ZnIcon icon={ReloadOutlined} />
              Actualizar ahora
            </UpdateButton>

            <DismissButton onClick={onDismiss} size="sm">
              <ZnIcon icon={CloseOutlined} />
              Más tarde
            </DismissButton>
          </ActionsSpace>
        </FullWidthSpace>
      </StyledCard>
    </UpdateNotificationContainer>
  );
};

export default UpdateNotification;
