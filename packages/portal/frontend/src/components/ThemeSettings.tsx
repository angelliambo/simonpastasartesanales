import React from "react";
import Card from "./ui/atoms/Card";
import { Row, Col } from "./ui/atoms/Grid";
import Button from "./ui/atoms/Button";
import Space from "./ui/atoms/Space";
import Divider from "./ui/atoms/Divider";
import Title from "./ui/atoms/Title";
import Text from "./ui/atoms/Text";
import styled from "styled-components";
import {
  SunOutlined,
  MoonOutlined,
  EyeOutlined,
  BoldOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { ZnIcon } from "@design-sys/atoms/ZnIcon";
import { useTheme, AccessibilityTheme } from "../styles/ThemeProvider";

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  max-width: 800px;
  margin: 0 auto;
`;

const PageTitle = styled(Title)`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const SectionCard = styled(Card)`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const SectionTitle = styled(Title)`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ThemeButton = styled(Button)`
  width: 100%;
  height: 60px;
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const DescriptionText = styled(Text)`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  display: block;
`;

const AccessOptionButton = styled(Button)`
  width: 100%;
  height: 80px;
  padding: ${({ theme }) => theme.spacing.sm};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
  text-align: center;
`;

const OptionIconWrapper = styled.div`
  font-size: 18px;
`;

const ActiveCheckIcon = styled.span`
  margin-left: ${({ theme }) => theme.spacing.sm};
`;

const OptionLabel = styled(Text)`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

const OptionDesc = styled(Text)`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  text-align: center;
`;

const InfoSpace = styled(Space)`
  width: 100%;
  max-width: 300px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const InfoDivider = styled(Divider)`
  margin: 12px 0;
`;

const FooterNote = styled(Text)`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
`;

const ThemeSettings: React.FC = () => {
  const { theme, accessibility, setTheme, setAccessibility } = useTheme();

  const accessibilityOptions: Array<{
    key: AccessibilityTheme;
    label: string;
    description: string;
    icon: React.ReactNode;
  }> = [
    {
      key: "default",
      label: "Estándar",
      description: "Colores normales para visión típica",
      icon: <ZnIcon icon={EyeOutlined} />,
    },
    {
      key: "protanopia",
      label: "Protanopia",
      description: "Optimizado para dificultad con rojos",
      icon: <ZnIcon icon={EyeOutlined} />,
    },
    {
      key: "deuteranopia",
      label: "Deuteranopia",
      description: "Optimizado para dificultad con verdes",
      icon: <ZnIcon icon={EyeOutlined} />,
    },
    {
      key: "tritanopia",
      label: "Tritanopia",
      description: "Optimizado para dificultad con azules",
      icon: <ZnIcon icon={EyeOutlined} />,
    },
    {
      key: "high-contrast",
      label: "Alto Contraste",
      description: "Máximo contraste para mejor legibilidad",
      icon: <ZnIcon icon={BoldOutlined} />,
    },
  ];

  return (
    <Container>
      <PageTitle level={2}>
        🎨 Configuración de Temas y Accesibilidad
      </PageTitle>

      {/* Tema Principal */}
      <SectionCard>
        <SectionTitle level={4}>Tema Principal</SectionTitle>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <ThemeButton
              variant={theme === "light" ? "primary" : "ghost"}
              onClick={() => setTheme("light")}
            >
              <ZnIcon icon={SunOutlined} />
              Tema Claro
              {theme === "light" && <ZnIcon icon={CheckOutlined} />}
            </ThemeButton>
          </Col>
          <Col xs={24} sm={12}>
            <ThemeButton
              variant={theme === "dark" ? "primary" : "ghost"}
              onClick={() => setTheme("dark")}
            >
              <ZnIcon icon={MoonOutlined} />
              Tema Oscuro
              {theme === "dark" && <ZnIcon icon={CheckOutlined} />}
            </ThemeButton>
          </Col>
        </Row>
      </SectionCard>

      {/* Opciones de Accesibilidad */}
      <SectionCard>
        <SectionTitle level={4}>Opciones de Accesibilidad</SectionTitle>
        <DescriptionText color="secondary">
          Selecciona una paleta de colores optimizada para tu tipo de visión
        </DescriptionText>

        <Row gutter={[12, 12]}>
          {accessibilityOptions.map((option) => (
            <Col xs={24} sm={12} lg={8} key={option.key}>
              <AccessOptionButton
                variant={accessibility === option.key ? "primary" : "ghost"}
                onClick={() => setAccessibility(option.key)}
              >
                <OptionIconWrapper>
                  {option.icon}
                  {accessibility === option.key && (
                    <ActiveCheckIcon><ZnIcon icon={CheckOutlined} /></ActiveCheckIcon>
                  )}
                </OptionIconWrapper>
                <OptionLabel
                  weight="semibold"
                  color={accessibility === option.key ? "inverse" : undefined}
                >
                  {option.label}
                </OptionLabel>
                <OptionDesc
                  color={accessibility === option.key ? "inverse" : "secondary"}
                >
                  {option.description}
                </OptionDesc>
              </AccessOptionButton>
            </Col>
          ))}
        </Row>
      </SectionCard>

      {/* Información Actual */}
      <Card>
        <SectionTitle level={4}>Configuración Actual</SectionTitle>
        <InfoSpace direction="vertical" size="small">
          <InfoRow>
            <Text color="secondary">Tema:</Text>
            <Text strong>
              {theme === "light" ? "Claro" : "Oscuro"}
            </Text>
          </InfoRow>
          <InfoRow>
            <Text color="secondary">Accesibilidad:</Text>
            <Text strong>
              {accessibilityOptions.find((opt) => opt.key === accessibility)
                ?.label || "Estándar"}
            </Text>
          </InfoRow>
          <InfoDivider />
          <FooterNote color="tertiary">
            Los cambios se guardan automáticamente y se aplican inmediatamente
            en toda la aplicación.
          </FooterNote>
        </InfoSpace>
      </Card>
    </Container>
  );
};

export default ThemeSettings;
