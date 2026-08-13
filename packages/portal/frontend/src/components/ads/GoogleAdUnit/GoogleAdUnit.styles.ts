import styled from 'styled-components';

export const AdWrapper = styled.div<{ $responsive?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: ${props => props.theme.spacing?.md || '16px'} 0;
  padding: ${props => props.theme.spacing?.sm || '8px'};
  background: ${props => props.theme.colors?.backgroundSecondary || '#f9fafb'};
  border: 1px dashed ${props => props.theme.colors?.border || '#e5e7eb'};
  border-radius: 8px;
  overflow: hidden;
  box-sizing: border-box;
  min-height: 90px;
`;

export const AdHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: ${props => props.theme.spacing?.xs || '4px'};
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: ${props => props.theme.colors?.textSecondary || '#6b7280'};
`;

export const InsElement = styled.ins`
  display: block;
  width: 100%;
  text-align: center;
`;
