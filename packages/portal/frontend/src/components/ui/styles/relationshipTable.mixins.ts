import styled from "styled-components";
import { media } from "../../../styles/mixins/responsive";

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHeader = styled.thead`
  background: ${({ theme }: { theme: any }) => theme.colors.background.secondary};
`;

export const TableHeaderCell = styled.th`
  text-align: left;
  padding: 12px 16px;
  font-weight: 600;
  font-size: 14px;
  color: ${({ theme }: { theme: any }) => theme.colors.neutral[700]};
  border-bottom: 2px solid ${({ theme }: { theme: any }) => theme.colors.neutral[200]};
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  border-bottom: 1px solid ${({ theme }: { theme: any }) => theme.colors.neutral[200]};
  transition: background-color 0.2s ease;

  &:hover {
    background: ${({ theme }: { theme: any }) => theme.colors.neutral[50]};
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const TableCell = styled.td`
  padding: 12px 16px;
  font-size: 14px;
  color: ${({ theme }: { theme: any }) => theme.colors.neutral[700]};

  @media ${media.mobile} {
    padding: 10px 14px;
    font-size: 13px;
  }
`;

export const RoleTag = styled.span<{ $role: string }>`
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${({ $role, theme }: { theme: any; [key: string]: any }) => {
    switch ($role) {
      case "admin":
        return theme.colors.primary[50];
      case "therapist":
        return theme.colors.success[50];
      case "parent":
        return theme.colors.warning[50];
      case "learner":
        return theme.colors.secondary[100];
      default:
        return theme.colors.background.secondary;
    }
  }};
  color: ${({ $role, theme }: { theme: any; [key: string]: any }) => {
    switch ($role) {
      case "admin":
        return theme.colors.primary[800];
      case "therapist":
        return theme.colors.success[700];
      case "parent":
        return theme.colors.warning[700];
      case "learner":
        return theme.colors.secondary[800];
      default:
        return theme.colors.neutral[700];
    }
  }};
`;

export const StatusTag = styled.span<{ $status: string }>`
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${({ $status, theme }: { theme: any; [key: string]: any }) => {
    switch ($status) {
      case "active":
        return theme.colors.success[50];
      case "inactive":
        return theme.colors.error[50];
      case "pending":
        return theme.colors.warning[50];
      case "blocked":
        return theme.colors.error[50];
      default:
        return theme.colors.background.secondary;
    }
  }};
  color: ${({ $status, theme }: { theme: any; [key: string]: any }) => {
    switch ($status) {
      case "active":
        return theme.colors.success[700];
      case "inactive":
        return theme.colors.error[700];
      case "pending":
        return theme.colors.warning[700];
      case "blocked":
        return theme.colors.error[700];
      default:
        return theme.colors.neutral[700];
    }
  }};
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: ${({ theme }: { theme: any }) => theme.colors.neutral[500]};
`;

export const LoadingState = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: ${({ theme }: { theme: any }) => theme.colors.neutral[500]};
`;
