import styled from 'styled-components';

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: ${props => props.theme.spacing.lg};
  text-align: center;
  background: ${props => props.theme.colors.background.primary};
  color: ${props => props.theme.colors.text.primary};
`;

export const ErrorIcon = styled.div`
  font-size: 64px;
  margin-bottom: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.error[500]};
`;

export const ErrorTitle = styled.h1`
  font-size: ${props => props.theme.typography.fontSize.xxl};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  margin-bottom: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.text.primary};
`;

export const ErrorMessage = styled.p`
  font-size: ${props => props.theme.typography.fontSize.md};
  margin-bottom: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.text.secondary};
  max-width: 600px;
  line-height: 1.6;
`;

export const ErrorDetails = styled.details`
  margin: ${props => props.theme.spacing.lg} 0;
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.background.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  text-align: left;
  max-width: 800px;
  width: 100%;

  summary {
    cursor: pointer;
    font-weight: ${props => props.theme.typography.fontWeight.semibold};
    color: ${props => props.theme.colors.text.primary};
    margin-bottom: ${props => props.theme.spacing.sm};
  }

  pre {
    font-size: ${props => props.theme.typography.fontSize.xs};
    color: ${props => props.theme.colors.text.secondary};
    overflow-x: auto;
    white-space: pre-wrap;
    word-wrap: break-word;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  flex-wrap: wrap;
  justify-content: center;
  margin-top: ${props => props.theme.spacing.lg};
`;

export const ActionButton = styled.button<{
  $variant?: 'primary' | 'secondary' | 'danger';
}>`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.typography.fontSize.md};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.fast};

  ${props => {
    switch (props.$variant) {
      case 'secondary':
        return `
          background: ${props.theme.colors.background.surface};
          color: ${props.theme.colors.text.primary};
          border: 1px solid ${props.theme.colors.border};
          &:hover {
            background: ${props.theme.colors.background.secondary};
          }
        `;
      case 'danger':
        return `
          background: ${props.theme.colors.error[500]};
          color: ${props.theme.colors.text.inverse};
          &:hover {
            background: ${props.theme.colors.error[600]};
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          }
        `;
      case 'primary':
      default:
        return `
          background: ${props.theme.colors.primary[500]};
          color: ${props.theme.colors.text.inverse};
          &:hover {
            background: ${props.theme.colors.primary[600]};
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          }
        `;
    }
  }}

  &:active {
    transform: translateY(0);
  }

  &:focus {
    outline: 2px solid ${props => props.theme.colors.primary[500]};
    outline-offset: 2px;
  }
`;
