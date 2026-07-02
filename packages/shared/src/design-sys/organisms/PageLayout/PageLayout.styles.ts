import styled from 'styled-components';

export const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const PageContent = styled.main`
  gap: 0 0 20px;
  flex: 1;
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.xl};
  position: relative;
  z-index: 1;
`;