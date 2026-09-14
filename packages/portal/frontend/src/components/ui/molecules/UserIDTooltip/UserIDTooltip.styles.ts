import styled from 'styled-components';
import Button from '@design-sys/atoms/Button';

export const TooltipContainer = styled.div`
  background-color: ${props => props.theme.colors.background.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.sm};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  max-width: 300px;
`;

export const TooltipLabel = styled.div`
  margin-bottom: ${props => props.theme.spacing.xs};
  font-size: ${props => props.theme.typography.fontSize.xs};
  color: ${props => props.theme.colors.text.secondary};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
`;

export const IdCodeBlock = styled.div`
  font-family: monospace;
  font-size: ${props => props.theme.typography.fontSize.xs};
  color: ${props => props.theme.colors.text.primary};
  background-color: ${props => props.theme.colors.background.secondary};
  padding: ${props => props.theme.spacing.xs};
  border-radius: ${props => props.theme.borderRadius.sm};
  margin-bottom: ${props => props.theme.spacing.xs};
  word-break: break-all;
  line-height: 1.4;
`;

export const CopyButton = styled(Button)`
  padding: 0;
  height: auto;
  color: ${props => props.theme.colors.primary[500]};
  font-size: ${props => props.theme.typography.fontSize.xs};
  font-weight: ${props => props.theme.typography.fontWeight.medium};

  .anticon {
    margin-right: ${props => props.theme.spacing.xs};
  }
`;
