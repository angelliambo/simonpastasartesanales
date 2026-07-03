import styled from 'styled-components';

export const ContactCard = styled.div`
  background: ${({ theme }) => theme.effects?.glassBackground || 'rgba(15, 23, 42, 0.45)'};
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid ${({ theme }) => theme.effects?.glassBorder || 'rgba(255, 255, 255, 0.08)'};
  border-radius: 1rem;
  padding: 2.5rem;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  color: #f4f4f5;
`;

export const SectionTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors?.text?.primary || '#fff'};
`;

export const Paragraph = styled.p`
  font-size: 0.975rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors?.text?.secondary || '#d4d4d8'};
  margin-bottom: 1.5rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
`;

export const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors?.text?.secondary || '#e4e4e7'};
`;

export const Input = styled.input`
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid ${({ theme }) => theme.effects?.glassBorder || 'rgba(255, 255, 255, 0.1)'};
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  color: #fff;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: ${({ theme }) => theme.colors?.primary?.[500] || '#a855f7'};
  }
`;

export const TextArea = styled.textarea`
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid ${({ theme }) => theme.effects?.glassBorder || 'rgba(255, 255, 255, 0.1)'};
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  color: #fff;
  font-size: 0.95rem;
  outline: none;
  resize: vertical;
  min-height: 120px;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: ${({ theme }) => theme.colors?.primary?.[500] || '#a855f7'};
  }
`;

export const SubmitButton = styled.button`
  background: ${({ theme }) => theme.gradients?.premium || 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)'};
  color: white;
  border: none;
  border-radius: 0.5rem;
  padding: 0.85rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease;
  width: 100%;
  margin-top: 0.5rem;

  &:hover {
    transform: translateY(-1px);
    opacity: 0.95;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

export const SuccessMessage = styled.div`
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.25);
  color: #34d399;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  margin-bottom: 1.25rem;
`;

export const ErrorMessage = styled.div`
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.25);
  color: #f87171;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  margin-bottom: 1.25rem;
`;
