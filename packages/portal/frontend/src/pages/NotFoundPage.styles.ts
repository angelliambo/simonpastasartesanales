import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  text-align: center;
  padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.lg};
`;

export const ErrorCode = styled.h1`
  font-size: 96px;
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  margin: 0 0 ${props => props.theme.spacing.xs};
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[400]}, ${props => props.theme.colors.primary[600]});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
`;

export const Title = styled.h2`
  font-size: ${props => props.theme.typography.fontSize.xl};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.text.primary};
  margin: 0 0 ${props => props.theme.spacing.xs};
`;

export const Description = styled.p`
  font-size: ${props => props.theme.typography.fontSize.md};
  color: ${props => props.theme.colors.text.secondary};
  margin: 0 0 ${props => props.theme.spacing.xl};
  max-width: 380px;
  line-height: 1.6;
`;

export const StyledButton = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.xl};
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  background: ${props => props.theme.colors.primary[500]};
  color: ${props => props.theme.colors.text.inverse};
  font-size: ${props => props.theme.typography.fontSize.md};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: opacity ${props => props.theme.transitions.fast};

  &:hover {
    opacity: 0.9;
  }
`;
