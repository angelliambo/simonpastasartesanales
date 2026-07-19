import styled from "styled-components";
import { Link } from "react-router-dom";
import { Typography } from "antd";

const { Paragraph } = Typography;

export const FooterContainer = styled.footer<{ $colors: any }>`
  text-align: center;
  padding: 32px 24px;
  background: ${({ $colors }) => $colors?.background?.secondary || "#0a0a1a"};
  border-top: 1px solid ${({ $colors }) => $colors?.effects?.glassBorder || "rgba(255,255,255,0.06)"};
  color: ${({ $colors }) => $colors?.text?.tertiary || "rgba(255,255,255,0.5)"};
  font-size: 13px;
  position: relative;
  z-index: 1;
`;

export const FooterLink = styled(Link)<{ $colors: any }>`
  color: ${({ $colors }) => $colors?.text?.secondary || "rgba(255,255,255,0.6)"};
  text-decoration: none;
  &:hover {
    color: ${({ $colors }) => $colors?.text?.primary || "#fff"};
    text-decoration: underline;
  }
`;

export const ExternalLink = styled.a<{ $colors: any }>`
  color: ${({ $colors }) => $colors?.text?.secondary || "rgba(255,255,255,0.6)"};
  text-decoration: none;
  &:hover {
    color: ${({ $colors }) => $colors?.text?.primary || "#fff"};
    text-decoration: underline;
  }
`;

export const Separator = styled.span`
  margin: 0 8px;
  color: rgba(255,255,255,0.2);
`;

export const SocialContainer = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: center;
  gap: 16px;
`;

export const SocialIconLink = styled.a<{ $colors: any }>`
  color: ${({ $colors }) => $colors?.text?.secondary || "rgba(255,255,255,0.6)"};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
  &:hover {
    color: ${({ $colors }) => $colors?.text?.primary || "#fff"};
  }
`;

export const CopyRightParagraph = styled(Paragraph)`
  margin: 12px 0 0;
  font-size: 12px;
  color: inherit !important;
`;

export const FooterLangSelectorWrapper = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;
