import styled from 'styled-components';
import Card from '@design-sys/atoms/Card';

export const StyledCard = styled(Card)<{
  $variant: 'default' | 'highlighted';
}>`
  ${props =>
    props.$variant === 'highlighted' &&
    `
    background-color: ${props.theme.colors.background.secondary};
    border: 2px solid ${props.theme.colors.primary[500]};
  `}
`;

export const CardHeader = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

export const IconWrapper = styled.div<{
  $variant: 'default' | 'highlighted';
  $largeText?: boolean;
}>`
  font-size: ${props => (props.$largeText ? '48px' : '40px')};
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props =>
    props.$variant === 'highlighted'
      ? props.theme.colors.primary[500]
      : props.theme.colors.text.secondary};
`;

export const CardTitle = styled.h3<{
  $largeText?: boolean;
}>`
  font-size: ${props =>
    props.$largeText
      ? props.theme.typography.fontSize.lg
      : props.theme.typography.fontSize.md};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  margin: 0 0 ${props => props.theme.spacing.xs} 0;
  color: ${props => props.theme.colors.text.primary};
  line-height: 1.3;
`;

export const CardDescription = styled.p<{
  $largeText?: boolean;
}>`
  font-size: ${props =>
    props.$largeText
      ? props.theme.typography.fontSize.md
      : props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.text.secondary};
  line-height: 1.5;
  margin: 0;
`;

export const FeaturesContainer = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

export const FeaturesTitle = styled.h4<{
  $largeText?: boolean;
}>`
  font-size: ${props =>
    props.$largeText
      ? props.theme.typography.fontSize.md
      : props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  margin: 0 0 ${props => props.theme.spacing.sm} 0;
  color: ${props => props.theme.colors.text.primary};
`;

export const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const FeatureItem = styled.li<{
  $largeText?: boolean;
}>`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  margin-bottom: ${props => props.theme.spacing.xs};
  font-size: ${props =>
    props.$largeText
      ? props.theme.typography.fontSize.sm
      : props.theme.typography.fontSize.xs};
  color: ${props => props.theme.colors.text.secondary};
`;

export const CheckIcon = styled.span<{
  $variant: 'default' | 'highlighted';
}>`
  color: ${props =>
    props.$variant === 'highlighted'
      ? props.theme.colors.primary[500]
      : props.theme.colors.success[500]};
`;

export const ButtonWrapper = styled.div`
  text-align: center;
`;
