import styled from "styled-components";
import Button from '@design-sys/atoms/Button';
import Card from '@design-sys/atoms/Card';
import Text from '@design-sys/atoms/Text';
import Space from '@design-sys/atoms/Space';

export const StyledCard = styled(Card)`
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ theme }) => theme.gradients.brand};
  color: ${({ theme }) => theme.colors.text.inverse};

  > div {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

export const CardHeaderTitle = styled.h4`
  color: ${({ theme }) => theme.colors.text.inverse};
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const NotificationBodyText = styled(Text)`
  color: ${({ theme }) => theme.colors.text.inverse};
  opacity: 0.9;
`;

export const FullWidthSpace = styled(Space)`
  width: 100%;
`;

export const ActionsSpace = styled(Space)`
  width: 100%;
  justify-content: space-between;
`;

export const UpdateButton = styled(Button)`
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: ${({ theme }) => theme.colors.text.inverse};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
    color: ${({ theme }) => theme.colors.text.inverse};
  }
`;

export const DismissButton = styled(Button)`
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: ${({ theme }) => theme.colors.text.inverse};
  border-radius: ${({ theme }) => theme.borderRadius.md};

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.5);
    color: ${({ theme }) => theme.colors.text.inverse};
  }
`;
