import styled from "styled-components";
import { Link } from "react-router-dom";
import { Typography } from "antd";

const { Paragraph } = Typography;

export const FooterContainer = styled.footer`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background.secondary};
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
  color: ${({ theme }) => theme.colors.text.tertiary};
  font-size: 13px;
  position: relative;
  z-index: 1;
  width: 100%;
  box-sizing: border-box;
`;

export const FooterLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text.secondary};
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
    text-decoration: underline;
  }
`;

export const ExternalLink = styled.a`
  color: ${({ theme }) => theme.colors.text.secondary};
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
    text-decoration: underline;
  }
`;

export const Separator = styled.span`
  margin: 0 ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.border.light};
`;

export const SocialContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.sm};
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const SocialIconLink = styled.a`
  color: ${({ theme }) => theme.colors.text.secondary};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const CopyRightParagraph = styled(Paragraph)`
  margin: ${({ theme }) => theme.spacing.xs} 0 0;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.tertiary};
`;

export const FooterLangSelectorWrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacing.sm};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;
