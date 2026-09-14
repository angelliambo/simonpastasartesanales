import styled from 'styled-components';

export const TableWrapper = styled.div`
  width: 100%;
  overflow: auto;
  background: ${props => props.theme.colors.background.surface};
  border-radius: ${props => props.theme.borderRadius.md};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead th {
    text-align: left;
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
    border-bottom: 1px solid ${props => props.theme.colors.border};
    background: ${props => props.theme.colors.background.secondary};
    font-weight: ${props => props.theme.typography.fontWeight.semibold};
  }

  tbody td {
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
    border-bottom: 1px solid ${props => props.theme.colors.border};
    vertical-align: top;
  }

  tbody tr:hover {
    background: ${props => props.theme.colors.background.secondary};
  }
`;

export const FooterBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
`;

export const Pager = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.xs};
  align-items: center;
`;

export const PagerButton = styled.button`
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.theme.colors.background.surface};
  border-radius: ${props => props.theme.borderRadius.sm};
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
