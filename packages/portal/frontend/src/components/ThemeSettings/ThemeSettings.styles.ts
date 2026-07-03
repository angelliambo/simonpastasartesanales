import styled from "styled-components";
import Card from "../ui/atoms/Card";
import Button from "../ui/atoms/Button";
import Space from "../ui/atoms/Space";
import Divider from "../ui/atoms/Divider";
import Title from "../ui/atoms/Title";
import Text from "../ui/atoms/Text";

export const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  max-width: 800px;
  margin: 0 auto;
`;

export const PageTitle = styled(Title)`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const SectionCard = styled(Card)`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const SectionTitle = styled(Title)`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const ThemeButton = styled(Button)`
  width: 100%;
  height: 60px;
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const DescriptionText = styled(Text)`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  display: block;
`;

export const AccessOptionButton = styled(Button)`
  width: 100%;
  height: 80px;
  padding: ${({ theme }) => theme.spacing.sm};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
  text-align: center;
`;

export const OptionIconWrapper = styled.div`
  font-size: 18px;
`;

export const ActiveCheckIcon = styled.span`
  margin-left: ${({ theme }) => theme.spacing.sm};
`;

export const OptionLabel = styled(Text)`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

export const OptionDesc = styled(Text)`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  text-align: center;
`;

export const InfoSpace = styled(Space)`
  width: 100%;
  max-width: 300px;
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const InfoDivider = styled(Divider)`
  margin: 12px 0;
`;

export const FooterNote = styled(Text)`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
`;
