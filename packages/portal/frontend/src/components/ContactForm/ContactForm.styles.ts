import styled from 'styled-components';

export const ContactCard = styled.div`
  background: ${({ theme }) => theme?.colors?.background?.surface};
  border: 1px solid ${({ theme }) => theme?.colors?.border?.light};
  border-radius: ${({ theme }) => theme?.borderRadius?.lg};
  padding: ${({ theme }) => theme?.spacing?.xl};
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  color: ${({ theme }) => theme?.colors?.text?.primary};
`;

export const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme?.typography?.fontSize?.xl};
  font-weight: ${({ theme }) => theme?.typography?.fontWeight?.bold};
  margin-bottom: ${({ theme }) => theme?.spacing?.md};
  color: ${({ theme }) => theme?.colors?.text?.primary};
`;

export const Paragraph = styled.p`
  font-size: ${({ theme }) => theme?.typography?.fontSize?.md};
  line-height: 1.6;
  color: ${({ theme }) => theme?.colors?.text?.secondary};
  margin-bottom: ${({ theme }) => theme?.spacing?.md};
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme?.spacing?.xs};
  margin-bottom: ${({ theme }) => theme?.spacing?.md};
`;

export const Label = styled.label`
  font-size: ${({ theme }) => theme?.typography?.fontSize?.sm};
  font-weight: ${({ theme }) => theme?.typography?.fontWeight?.medium};
  color: ${({ theme }) => theme?.colors?.text?.secondary};
`;

export const Input = styled.input`
  background: ${({ theme }) => theme?.colors?.background?.primary};
  border: 1px solid ${({ theme }) => theme?.colors?.border?.light};
  border-radius: ${({ theme }) => theme?.borderRadius?.md};
  padding: ${({ theme }) => `${theme?.spacing?.sm} ${theme?.spacing?.md}`};
  color: ${({ theme }) => theme?.colors?.text?.primary};
  font-size: ${({ theme }) => theme?.typography?.fontSize?.md};
  outline: none;
  transition: border-color ${({ theme }) => theme?.transitions?.fast};

  &:focus {
    border-color: ${({ theme }) => theme?.colors?.primary?.[500]};
  }
`;

export const TextArea = styled.textarea`
  background: ${({ theme }) => theme?.colors?.background?.primary};
  border: 1px solid ${({ theme }) => theme?.colors?.border?.light};
  border-radius: ${({ theme }) => theme?.borderRadius?.md};
  padding: ${({ theme }) => `${theme?.spacing?.sm} ${theme?.spacing?.md}`};
  color: ${({ theme }) => theme?.colors?.text?.primary};
  font-size: ${({ theme }) => theme?.typography?.fontSize?.md};
  outline: none;
  resize: vertical;
  min-height: 120px;
  transition: border-color ${({ theme }) => theme?.transitions?.fast};

  &:focus {
    border-color: ${({ theme }) => theme?.colors?.primary?.[500]};
  }
`;

export const SubmitButton = styled.button<{ $disabled?: boolean }>`
  background: ${({ theme }) => theme?.colors?.primary?.[500]};
  color: ${({ theme }) => theme?.colors?.text?.inverse};
  border: none;
  border-radius: ${({ theme }) => theme?.borderRadius?.md};
  padding: ${({ theme }) => `${theme?.spacing?.sm} ${theme?.spacing?.lg}`};
  font-size: ${({ theme }) => theme?.typography?.fontSize?.md};
  font-weight: ${({ theme }) => theme?.typography?.fontWeight?.semibold};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  transition: transform ${({ theme }) => theme?.transitions?.fast}, opacity ${({ theme }) => theme?.transitions?.fast};
  width: 100%;
  margin-top: ${({ theme }) => theme?.spacing?.xs};

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    opacity: 0.95;
  }

  &:disabled {
    opacity: 0.6;
    transform: none;
  }
`;

export const SuccessMessage = styled.div`
  background: ${({ theme }) => theme?.colors?.background?.secondary};
  border: 1px solid ${({ theme }) => theme?.colors?.success?.[500]};
  color: ${({ theme }) => theme?.colors?.success?.[500]};
  padding: ${({ theme }) => `${theme?.spacing?.sm} ${theme?.spacing?.md}`};
  border-radius: ${({ theme }) => theme?.borderRadius?.md};
  font-size: ${({ theme }) => theme?.typography?.fontSize?.sm};
  margin-bottom: ${({ theme }) => theme?.spacing?.md};
`;

export const ErrorMessage = styled.div`
  background: ${({ theme }) => theme?.colors?.background?.secondary};
  border: 1px solid ${({ theme }) => theme?.colors?.error?.[500]};
  color: ${({ theme }) => theme?.colors?.error?.[500]};
  padding: ${({ theme }) => `${theme?.spacing?.sm} ${theme?.spacing?.md}`};
  border-radius: ${({ theme }) => theme?.borderRadius?.md};
  font-size: ${({ theme }) => theme?.typography?.fontSize?.sm};
  margin-bottom: ${({ theme }) => theme?.spacing?.md};
`;
