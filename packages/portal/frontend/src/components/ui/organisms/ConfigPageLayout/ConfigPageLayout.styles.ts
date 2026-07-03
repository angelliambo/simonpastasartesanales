import styled, { css } from "styled-components";
import Card from "../../atoms/Card";
import { Container } from "../../atoms/Container";

export const LayoutOuter = styled.div<{ colors: any; $isMobile: boolean; $paddingTop: number }>`
  background: ${({ colors }) => colors.background.secondary};
  min-height: 100vh;
  padding-top: ${({ $isMobile, $paddingTop }) => ($isMobile ? `${$paddingTop}px` : "0px")};
  ${({ $isMobile }) =>
    $isMobile &&
    css`
      padding-left: 0;
      padding-right: 0;
      padding-bottom: 0;
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
      margin-left: 0;
      margin-right: 0;
      overflow-x: hidden;
    `}
`;

export const LayoutInner = styled(Container) <{ $isMobile: boolean }>`
  ${({ $isMobile }) =>
    $isMobile &&
    css`
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
      overflow-x: hidden;
      padding-bottom: 0;
    `}
`;

export const HeroCard = styled(Card) <{ colors: any; $isMobile: boolean; $gradient: string; $marginBottom: string }>`
  background: ${({ $gradient }) => $gradient};
  margin-top: 0;
  margin-bottom: ${({ $isMobile, $marginBottom }) => ($isMobile ? $marginBottom : "48px")};
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  color: ${({ colors }) => colors.text.inverse};
  border: 2px solid ${({ colors }) => colors.border.normal};
  ${({ $isMobile }) =>
    $isMobile
      ? css`
          height: 200px;
          min-height: 200px;
          max-height: 200px;
          width: 100%;
        `
      : css`
          min-height: 250px;
        `}
`;

export const HeroIcon = styled.div<{ colors: any; $isMobile: boolean; $marginBottom: string }>`
  font-size: ${({ $isMobile }) => ($isMobile ? "48px" : "64px")};
  margin-bottom: ${({ $isMobile, $marginBottom }) => ($isMobile ? $marginBottom : "16px")};
  color: ${({ colors }) => colors.text.inverse};
  line-height: 1;
`;

export const HeroTitle = styled.h1<{ colors: any; $isMobile: boolean; $marginBottom: string }>`
  color: ${({ colors }) => colors.text.inverse};
  margin-bottom: ${({ $isMobile, $marginBottom }) => ($isMobile ? $marginBottom : "16px")};
  font-size: ${({ $isMobile }) => ($isMobile ? "28px" : "36px")};
  font-weight: 700;
  line-height: 1.2;
  margin-top: 0;
  ${({ $isMobile }) => $isMobile && css`min-height: 34px;`}
`;

export const HeroSubtitle = styled.p<{ colors: any; $isMobile: boolean; $marginBottom: string }>`
  color: ${({ colors }) => colors.text.inverse};
  font-size: ${({ $isMobile }) => ($isMobile ? "16px" : "18px")};
  opacity: 0.9;
  max-width: 600px;
  margin-bottom: ${({ $isMobile, $marginBottom }) => ($isMobile ? $marginBottom : "32px")};
  margin-left: auto;
  margin-right: auto;
  margin-top: 0;
  ${({ $isMobile }) => $isMobile && css`min-height: 48px;`}
`;

export const SectionOuter = styled.div<{ $isMobile: boolean; $marginBottom: number }>`
  margin-bottom: ${({ $marginBottom }) => `${$marginBottom}px`};
  ${({ $isMobile }) =>
    $isMobile &&
    css`
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
      overflow-x: hidden;
    `}
`;

export const SectionTitle = styled.h2<{ colors: any; $isMobile: boolean; $marginBottom: number }>`
  text-align: center;
  margin-bottom: ${({ $marginBottom }) => `${$marginBottom}px`};
  color: ${({ colors }) => colors.text.primary};
  font-size: ${({ $isMobile }) => ($isMobile ? "22px" : "28px")};
`;

export const CardWrapper = styled(Card) <{ $hasClick: boolean }>`
  height: 100%;
  cursor: ${({ $hasClick }) => ($hasClick ? "pointer" : "default")};
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 16px 14px !important;
  }
  @media (max-height: 800px) {
    padding: 10px 14px !important;
  }
  @media (max-height: 700px) {
    padding: 8px 10px !important;
  }
`;

export const CardIcon = styled.div<{ colors: any; $marginBottom: string }>`
  font-size: 48px;
  color: ${({ colors }) => colors.text.primary};
  margin-bottom: ${({ $marginBottom }) => $marginBottom};
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    font-size: 32px;
    margin-bottom: 8px;
    height: auto;
  }
  @media (max-height: 800px) {
    font-size: 28px;
    margin-bottom: 4px;
    height: auto;
  }
  @media (max-height: 700px) {
    font-size: 22px;
    margin-bottom: 2px;
  }
`;

export const CardTitle = styled.h3<{ colors: any; $marginBottom: string }>`
  margin-bottom: ${({ $marginBottom }) => $marginBottom};
  color: ${({ colors }) => colors.text.primary};
  font-size: 18px;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 15px;
    margin-bottom: 6px;
  }
  @media (max-height: 800px) {
    font-size: 14px;
    margin-bottom: 2px;
  }
  @media (max-height: 700px) {
    font-size: 13px;
  }
`;

export const CardSubtitle = styled.p<{ colors: any; $marginBottom: string }>`
  color: ${({ colors }) => colors.text.secondary};
  font-size: 14px;
  margin-bottom: ${({ $marginBottom }) => $marginBottom};

  @media (max-width: 768px) {
    font-size: 12px;
    margin-bottom: 0px;
    line-height: 1.4;
  }
  @media (max-height: 800px) {
    font-size: 11px;
    margin-bottom: 0px;
    line-height: 1.25;
  }
  @media (max-height: 700px) {
    font-size: 10.5px;
  }
`;
