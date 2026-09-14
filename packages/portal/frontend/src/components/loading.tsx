import React from "react";
import Spin from '@design-sys/atoms/Spin';
import { LoadingContainer, LoadingText } from "./loading.styles";

const Loading: React.FC = () => {
  return (
    <LoadingContainer>
      <Spin size="large" />
      <LoadingText color="secondary">
        Cargando, por favor espera...
      </LoadingText>
    </LoadingContainer>
  );
};

export default Loading;
