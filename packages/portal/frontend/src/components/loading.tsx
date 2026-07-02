import React from "react";
import styled from "styled-components";
import Spin from "./ui/atoms/Spin";
import Text from "./ui/atoms/Text";

const LoadingContainer = styled.div<{ $isDark: boolean }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  background-color: ${({ $isDark }) => ($isDark ? "#000000" : "#ffffff")};
  transition: background-color 0.2s ease;
`;

const Loading: React.FC = () => {
  const isDark =
    typeof document !== "undefined" &&
    document.documentElement.getAttribute("data-theme") === "dark";

  return (
    <LoadingContainer $isDark={isDark}>
      <Spin size="large" />
      <Text color="secondary" style={{ fontSize: 16 }}>
        Cargando, por favor espera...
      </Text>
    </LoadingContainer>
  );
};

export default Loading;
