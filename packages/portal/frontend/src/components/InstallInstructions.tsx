import React, { useState } from "react";
import Button from '@design-sys/atoms/Button';
import Steps from '@design-sys/atoms/Steps';
import Modal from "./ui/organisms/Modal";
import {
  DownloadOutlined,
  ShareAltOutlined,
  PlusOutlined,
  CheckCircleOutlined,
  MobileOutlined,
  DesktopOutlined,
} from "@ant-design/icons";
import { ZnIcon } from "@design-sys/atoms/ZnIcon";
import { DeviceInfo, getInstallInstructions } from "../utils/pwaUtils";
import {
  ModalHeader,
  ModalTitle,
  ModalSubtitle,
  StepsContainer,
  ButtonContainer,
} from "./InstallInstructions.styles";

interface InstallInstructionsProps {
  deviceInfo: DeviceInfo;
  onClose: () => void;
  visible: boolean;
}

const InstallInstructions: React.FC<InstallInstructionsProps> = ({
  deviceInfo,
  onClose,
  visible,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const instructions = getInstallInstructions(deviceInfo);

  const getStepIcon = (index: number) => {
    switch (deviceInfo.installMethod) {
      case "ios":
        if (index === 0) return <ZnIcon icon={ShareAltOutlined} />;
        if (index === 1) return <ZnIcon icon={PlusOutlined} />;
        if (index === 2) return <ZnIcon icon={CheckCircleOutlined} />;
        return <ZnIcon icon={MobileOutlined} />;
      case "android":
        if (index === 0) return <ZnIcon icon={MobileOutlined} />;
        if (index === 1) return <ZnIcon icon={DownloadOutlined} />;
        if (index === 2) return <ZnIcon icon={CheckCircleOutlined} />;
        return <ZnIcon icon={MobileOutlined} />;
      case "native":
        if (index === 0) return <ZnIcon icon={DesktopOutlined} />;
        if (index === 1) return <ZnIcon icon={DownloadOutlined} />;
        if (index === 2) return <ZnIcon icon={CheckCircleOutlined} />;
        return <ZnIcon icon={DesktopOutlined} />;
      default:
        return <ZnIcon icon={DownloadOutlined} />;
    }
  };

  const getTitle = () => {
    switch (deviceInfo.installMethod) {
      case "ios":
        return "Instalar en iOS";
      case "android":
        return "Instalar en Android";
      case "native":
        return "Instalar App";
      default:
        return "Instalación no disponible";
    }
  };

  const getSubtitle = () => {
    switch (deviceInfo.installMethod) {
      case "ios":
        return "Sigue estos pasos para agregar la app a tu pantalla de inicio";
      case "android":
        return "Instala la app como una aplicación nativa en tu dispositivo";
      case "native":
        return "Instala la app directamente desde tu navegador";
      default:
        return "Tu navegador no soporta la instalación de PWA";
    }
  };

  return (
    <Modal
      title={
        <ModalHeader>
          <ModalTitle level={3}>
            {getTitle()}
          </ModalTitle>
          <ModalSubtitle color="secondary">
            {getSubtitle()}
          </ModalSubtitle>
        </ModalHeader>
      }
      open={visible}
      onCancel={onClose}
      footer={<Button onClick={onClose}>Entendido</Button>}
      width={400}
    >
      <StepsContainer>
        <Steps
          direction="vertical"
          current={currentStep}
          items={instructions.map((instruction, index) => ({
            title: instruction,
            icon: getStepIcon(index),
          }))}
        />

        {deviceInfo.installMethod !== "none" && (
          <ButtonContainer>
            <Button
              variant="primary"
              size="lg"
              icon={<ZnIcon icon={DownloadOutlined} />}
              onClick={() =>
                setCurrentStep((prev) =>
                  Math.min(prev + 1, instructions.length - 1)
                )
              }
              disabled={currentStep >= instructions.length - 1}
            >
              Siguiente Paso
            </Button>
          </ButtonContainer>
        )}
      </StepsContainer>
    </Modal>
  );
};

export default InstallInstructions;
