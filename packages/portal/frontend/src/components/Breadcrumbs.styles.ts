import styled from "styled-components";
import { Link } from "react-router-dom";
import { Breadcrumb } from '@design-sys/atoms/Breadcrumb';

export const IconContainer = styled.span`
  margin-right: ${({ theme }) => theme.spacing.xs};
`;

export const BreadcrumbLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text.secondary};
  text-decoration: none;
  transition: color ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary[500]};
  }
`;

export const CustomBreadcrumb = styled(Breadcrumb)<{ $isMobile: boolean }>`
  margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
  font-size: ${({ $isMobile, theme }) => ($isMobile ? theme.typography.fontSize.xs : theme.typography.fontSize.sm)};
  padding: ${({ $isMobile, theme }) => ($isMobile ? `${theme.spacing.xs} ${theme.spacing.sm}` : `${theme.spacing.xs} ${theme.spacing.md}`)};
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ $isMobile, theme }) => ($isMobile ? theme.borderRadius.sm : theme.borderRadius.md)};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
`;
