import styled from 'styled-components';

export const PageContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 20px 80px;
  color: ${({ theme }) => theme.colors.text.primary || '#ffffff'};
  position: relative;
  z-index: 1;
`;

export const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 48px;
`;

export const Title = styled.h1`
  font-size: 2.8rem;
  font-weight: 800;
  margin-bottom: 16px;
  background: linear-gradient(135deg, #a78bfa 0%, #6366f1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

export const Subtitle = styled.p`
  font-size: 1.15rem;
  color: ${({ theme }) => theme.colors.text.secondary || '#94a3b8'};
  max-width: 650px;
  margin: 0 auto;
  line-height: 1.6;
`;

export const ControlsContainer = styled.div`
  background: rgba(30, 34, 48, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 40px;
  display: flex;
  gap: 20px;
  align-items: center;
  backdrop-filter: blur(8px);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const SearchWrapper = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px 12px 48px;
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.text.primary || '#ffffff'};
  font-size: 1rem;
  outline: none;

  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.25);
  }
`;

export const LanguageSelectWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 768px) {
    justify-content: space-between;
  }
`;

export const Label = styled.span`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.text.secondary || '#cbd5e1'};
  font-weight: 500;
  white-space: nowrap;
`;

export const StyledSelect = styled.select`
  padding: 12px 20px;
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.text.primary || '#ffffff'};
  font-size: 0.95rem;
  outline: none;
  cursor: pointer;

  &:focus {
    border-color: #6366f1;
  }

  option {
    background: #1e2230;
    color: #ffffff;
  }
`;

export const CategoriesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

export const CategoryBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const CategoryTitle = styled.h2`
  font-size: 1.4rem;
  font-weight: 700;
  color: #a78bfa;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  border-left: 4px solid #6366f1;
  padding-left: 12px;
`;

export const CommandsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const CommandCard = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: space-between;

  &:hover {
    border-color: rgba(99, 102, 241, 0.3);
    background: rgba(255, 255, 255, 0.04);
  }
`;

export const PhraseLabel = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.text.secondary || '#94a3b8'};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
`;

export const SpokenPhrase = styled.div`
  font-size: 1.05rem;
  font-weight: 600;
  color: #ffffff;
  font-family: monospace;
  background: rgba(0, 0, 0, 0.3);
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  margin-top: 4px;
`;

export const ResultLabel = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.text.secondary || '#94a3b8'};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
  margin-top: 8px;
`;

export const ActionOutput = styled.div`
  font-size: 1.15rem;
  font-weight: 700;
  color: #a78bfa;
  margin-top: 4px;
`;

export const NoResults = styled.div`
  text-align: center;
  padding: 60px 20px;
  background: rgba(30, 34, 48, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  color: ${({ theme }) => theme.colors.text.secondary || '#94a3b8'};
  font-size: 1.1rem;
`;
