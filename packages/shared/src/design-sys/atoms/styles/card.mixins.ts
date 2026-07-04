import styled from "styled-components";

interface CardProps {
  $variant?: "default" | "outlined" | "elevated" | "flat";
  $clickable?: boolean;
  $padding?: string;
}

export const StyledCard = styled.div<CardProps>`
  background: ${({ theme }: { theme: any }) => theme.colors.background.primary};
  border-radius: ${({ theme }: { theme: any }) => theme.borderRadius.lg};
  padding: ${({ $padding, theme }: { theme: any; [key: string]: any }) => $padding || theme.spacing.lg};
  transition: all 0.2s ease;

  ${({ $variant, theme }: { theme: any; [key: string]: any }) => {
    switch ($variant) {
      case "outlined":
        return `
          border: 1px solid ${theme.colors.border.light};
        `;
      case "elevated":
        return `
          box-shadow: ${theme.shadows.md};
          &:hover {
            box-shadow: ${theme.shadows.lg};
          }
        `;
      case "flat":
        return `
          box-shadow: none;
        `;
      default:
        return `
          box-shadow: ${theme.shadows.sm};
        `;
    }
  }}

  ${({ $clickable }) =>
    $clickable &&
    `
    cursor: pointer;
    &:hover {
      transform: translateY(-2px);
    }
  `}
`;

export const CardHeader = styled.div`
  margin-bottom: ${({ theme }: { theme: any }) => theme.spacing.md};
`;

export const CardTitle = styled.h3`
  font-size: ${({ theme }: { theme: any }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }: { theme: any }) => theme.typography.fontWeight.bold};
  color: ${({ theme }: { theme: any }) => theme.colors.text.primary};
  margin: 0;
`;

export const CardSubtitle = styled.p`
  font-size: ${({ theme }: { theme: any }) => theme.typography.fontSize.sm};
  color: ${({ theme }: { theme: any }) => theme.colors.text.secondary};
  margin: ${({ theme }: { theme: any }) => theme.spacing.xs} 0 0;
`;

export const CardContent = styled.div`
  color: ${({ theme }: { theme: any }) => theme.colors.text.primary};
`;
