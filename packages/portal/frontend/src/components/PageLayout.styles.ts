import styled from "styled-components";
import Breadcrumbs from "./Breadcrumbs";
import Text from '@design-sys/atoms/Text';

export const PageLayoutWrapper = styled.div`
  width: 100%;
`;

export const ContentWrapper = styled.div<{ $isMobile: boolean }>`
  padding: ${({ $isMobile, theme }) => ($isMobile ? `${theme.spacing.xs} ${theme.spacing.sm} ${theme.spacing.lg}` : `${theme.spacing.xs} ${theme.spacing.lg} ${theme.spacing.lg}`)};
  min-height: calc(100vh - 64px);
  border-radius: ${({ $isMobile, theme }) => ($isMobile ? `${theme.borderRadius.md} ${theme.borderRadius.md} 0 0` : `${theme.borderRadius.xl} ${theme.borderRadius.xl} 0 0`)};
  margin-top: ${({ $isMobile, theme }) => ($isMobile ? theme.spacing.xs : "5px")};
`;

export const CustomBreadcrumbs = styled(Breadcrumbs)<{ $isMobile: boolean }>`
  margin-bottom: ${({ $isMobile, theme }) => ($isMobile ? theme.spacing.xs : theme.spacing.md)};
  font-size: ${({ $isMobile, theme }) => ($isMobile ? theme.typography.fontSize.xs : theme.typography.fontSize.sm)};
  padding: ${({ $isMobile, theme }) => ($isMobile ? `${theme.spacing.xs} ${theme.spacing.sm}` : `${theme.spacing.xs} ${theme.spacing.md}`)};
`;

export const StyledTitleText = styled(Text)<{ $isMobile: boolean }>`
  margin-bottom: ${({ $isMobile, theme }) => ($isMobile ? theme.spacing.md : theme.spacing.lg)};
  color: ${({ theme }) => theme.colors.primary[500]};
  font-size: ${({ $isMobile, theme }) => ($isMobile ? theme.typography.fontSize.xl : theme.typography.fontSize.xxl)};
  display: block;
`;

export const IconSpan = styled.span`
  margin-right: ${({ theme }) => theme.spacing.xs};
`;

export const StyledSubtitleText = styled(Text)<{ $isMobile: boolean }>`
  font-size: ${({ $isMobile, theme }) => ($isMobile ? theme.typography.fontSize.sm : theme.typography.fontSize.md)};
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  margin-top: 4px;
  display: block;
`;
