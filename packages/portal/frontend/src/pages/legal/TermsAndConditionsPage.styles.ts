import styled from 'styled-components';
import { Typography } from 'antd';

const { Title, Paragraph, Text } = Typography;

export const PageWrapper = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.background.primary};
`;

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xxl} ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.text.primary};
  line-height: 1.8;
`;

export const Section = styled.div`
  margin-bottom: ${props => props.theme.spacing.xl};
  padding-bottom: ${props => props.theme.spacing.lg};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

export const List = styled.ul`
  padding-left: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.text.secondary};
`;

export const Item = styled.li`
  margin-bottom: ${props => props.theme.spacing.xs};
`;

export const WarningBox = styled.div`
  background: ${props => props.theme.colors.warning.light};
  border: 1px solid ${props => props.theme.colors.warning.main};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.md};
  margin: ${props => props.theme.spacing.xl} 0;
`;

export const StyledMainTitle = styled(Title)`
  color: ${props => props.theme.colors.text.primary} !important;
  margin-bottom: ${props => props.theme.spacing.xs} !important;
`;

export const StyledSubtitle = styled(Paragraph)`
  color: ${props => props.theme.colors.text.tertiary} !important;
  font-size: ${props => props.theme.typography.fontSize.sm} !important;
  margin-bottom: ${props => props.theme.spacing.xl} !important;
`;

export const StyledSectionTitle = styled(Title)`
  color: ${props => props.theme.colors.text.primary} !important;
`;

export const StyledBodyParagraph = styled(Paragraph)`
  color: ${props => props.theme.colors.text.secondary} !important;
`;

export const StyledStrongBlockWithTop = styled(Text)`
  color: ${props => props.theme.colors.text.primary} !important;
  display: block;
  margin-top: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

export const StyledStrongBlock = styled(Text)`
  color: ${props => props.theme.colors.text.primary} !important;
  display: block;
  margin-bottom: ${props => props.theme.spacing.xs};
`;

export const StyledWarningTitle = styled(Title)`
  color: ${props => props.theme.colors.warning.main} !important;
  margin-bottom: ${props => props.theme.spacing.sm} !important;
`;

export const StyledWarningBody = styled(Paragraph)`
  color: ${props => props.theme.colors.warning.main} !important;
`;

export const StyledWarningSubtext = styled(Paragraph)`
  color: ${props => props.theme.colors.warning.main} !important;
  opacity: 0.85;
`;

export const StyledFooterText = styled(Paragraph)`
  color: ${props => props.theme.colors.text.tertiary} !important;
  font-size: ${props => props.theme.typography.fontSize.xs} !important;
  text-align: center;
  margin-top: ${props => props.theme.spacing.xl} !important;
`;
