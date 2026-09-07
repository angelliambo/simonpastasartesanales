import styled from "styled-components";
import { Link } from "react-router-dom";
import { Typography } from "antd";

const { Paragraph } = Typography;

export const FooterContainer = styled.footer`
  width: 100%;
  background: ${({ theme }) => theme.colors.background.secondary};
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
  color: ${({ theme }) => theme.colors.text.tertiary};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.sticky};
  box-sizing: border-box;
  margin-top: auto;
  padding: ${({ theme }) => theme.spacing.lg} 0;
`;

export const FooterContent = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.breakpoints.xl};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-sizing: border-box;
`;

export const FooterNav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const FooterLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text.secondary};
  text-decoration: none;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  transition: color ${({ theme }) => theme.transitions.fast};
  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
    text-decoration: underline;
  }
`;

export const ExternalLink = styled.a`
  color: ${({ theme }) => theme.colors.text.secondary};
  text-decoration: none;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  transition: color ${({ theme }) => theme.transitions.fast};
  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
    text-decoration: underline;
  }
`;

export const Separator = styled.span`
  color: ${({ theme }) => theme.colors.border.light};
  user-select: none;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
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
  transition: color ${({ theme }) => theme.transitions.fast};
  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const CopyRightParagraph = styled(Paragraph)`
  margin: ${({ theme }) => theme.spacing.xs} 0 0;
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.tertiary};
`;

export const FooterLangSelectorWrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacing.sm};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;
