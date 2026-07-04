import React from "react";
import Card from '@design-sys/atoms/Card';
import { Row, Col } from '@design-sys/atoms/Grid';
import Text from '@design-sys/atoms/Text';
import {
  SunOutlined,
  MoonOutlined,
  EyeOutlined,
  BoldOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { ZnIcon } from "@design-sys/atoms/ZnIcon";
import { useTheme, AccessibilityTheme } from "../../styles/ThemeProvider";
import {
  Container,
  PageTitle,
  SectionCard,
  SectionTitle,
  ThemeButton,
  DescriptionText,
  AccessOptionButton,
  OptionIconWrapper,
  ActiveCheckIcon,
  OptionLabel,
  OptionDesc,
  InfoSpace,
  InfoRow,
  InfoDivider,
  FooterNote,
} from "./ThemeSettings.styles";

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
