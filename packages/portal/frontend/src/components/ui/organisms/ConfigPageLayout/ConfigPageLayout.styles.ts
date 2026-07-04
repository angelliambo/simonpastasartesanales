import styled, { css } from "styled-components";
import Card from '@design-sys/atoms/Card';
import { Container } from '@design-sys/atoms/Container';

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

export const CardWrapper = styled.div<{ $hasClick: boolean }>`
border: 1px solid ${({ theme }) => theme.colors.border.normal};
border-radius: ${({ theme }) => theme.borderRadius.sm};
  cursor: ${({ $hasClick }) => ($hasClick ? "pointer" : "default")};
  display: flex;
  box-sizing: border-box;
  width: 100%;
  
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
  padding: 16px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
  border-radius: ${({ theme }) => theme.borderRadius.md};
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 0px;
  }

  @media (max-height: 800px) {
    padding: 12px 14px;
  }
  @media (max-height: 700px) {
    padding: 8px 10px;
  }
`;
export const IconWrapper = styled.div<{ $marginBottom: string }>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-shrink: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
  justify-content: center;
    margin-bottom: ${({ $marginBottom }) => $marginBottom};
  }
`;

export const CardIcon = styled.div<{ colors: any; $marginBottom: string }>`
  font-size: 22px;
  color: ${({ colors }) => colors.text.primary};
  margin-bottom: ${({ $marginBottom }) => $marginBottom};
  display: flex;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 28px;
    margin-bottom: 8px;
    height: auto;
  }
  @media (max-height: 800px) {
    font-size: 32px;
    margin-bottom: 4px;
    height: auto;
  }
  @media (max-height: 700px) {
    font-size: 48px;
    margin-bottom: 2px;
  }
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  flex: 1;
  min-width: 0;
  text-align: left;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 100%;
  }
`;

export const CardTitle = styled.h3<{ colors: any; $marginBottom: string }>`
  margin-top: 0;
  margin-bottom: 6px;
  color: ${({ colors }) => colors.text.primary};
  font-size: 15px;
  font-weight: 600;
  line-height: 1.2;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 18px;
    margin-bottom: ${({ $marginBottom }) => $marginBottom};
  }
  @media (max-height: 800px) {
    font-size: 14px;
    margin-bottom: 4px;
  }
  @media (max-height: 700px) {
    font-size: 13px;
  }
`;

export const CardSubtitle = styled.p<{ colors: any; $marginBottom: string }>`
  margin: 0;
  color: ${({ colors }) => colors.text.secondary};
  font-size: 12px;
  line-height: 1.4;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 14px;
    margin-bottom: ${({ $marginBottom }) => $marginBottom};
  }
  @media (max-height: 800px) {
    font-size: 11px;
    line-height: 1.25;
  }
  @media (max-height: 700px) {
    font-size: 10.5px;
  }
`;
