import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme?.zIndex?.modal};
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme?.spacing?.sm};
`;

export const Card = styled.div`
  background: ${({ theme }) => theme?.colors?.background?.surface};
  border: 1px solid ${({ theme }) => theme?.colors?.border?.light};
  border-radius: ${({ theme }) => theme?.borderRadius?.lg};
  padding: ${({ theme }) => theme?.spacing?.lg};
  width: 100%;
  max-width: 380px;
  color: ${({ theme }) => theme?.colors?.text?.primary};
  box-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.5);
  animation: slideDown 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  position: relative;
  contain: content;

  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-12px) scale(0.97); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
`;

export const CloseBtn = styled.button`
  position: absolute;
  top: ${({ theme }) => theme?.spacing?.sm};
  right: ${({ theme }) => theme?.spacing?.sm};
  background: ${({ theme }) => theme?.colors?.background?.secondary};
  border: none;
  color: ${({ theme }) => theme?.colors?.text?.secondary};
  width: 28px;
  height: 28px;
  border-radius: 50%;
  font-size: ${({ theme }) => theme?.typography?.fontSize?.sm};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${({ theme }) => theme?.transitions?.fast};

  &:hover {
    background: ${({ theme }) => theme?.colors?.border?.light};
    color: ${({ theme }) => theme?.colors?.text?.primary};
  }
`;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme?.typography?.fontSize?.lg};
  font-weight: ${({ theme }) => theme?.typography?.fontWeight?.bold};
  margin: 0 0 ${({ theme }) => theme?.spacing?.xs};
  color: ${({ theme }) => theme?.colors?.text?.primary};
`;

export const Subtitle = styled.p`
  font-size: ${({ theme }) => theme?.typography?.fontSize?.xs};
  color: ${({ theme }) => theme?.colors?.text?.secondary};
  margin: 0 0 ${({ theme }) => theme?.spacing?.md};
  line-height: 1.4;
`;

export const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => `${theme?.spacing?.xs} ${theme?.spacing?.sm}`};
  border: 1px solid ${({ theme }) => theme?.colors?.border?.light};
  border-radius: ${({ theme }) => theme?.borderRadius?.md};
  background: ${({ theme }) => theme?.colors?.background?.primary};
  color: ${({ theme }) => theme?.colors?.text?.primary};
  font-size: ${({ theme }) => theme?.typography?.fontSize?.sm};
  box-sizing: border-box;
  transition: border-color ${({ theme }) => theme?.transitions?.fast};
  margin-bottom: ${({ theme }) => theme?.spacing?.xs};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme?.colors?.primary?.[500]};
  }
  &::placeholder {
    color: ${({ theme }) => theme?.colors?.text?.tertiary};
  }
`;

export const Button = styled.button<{ $disabled?: boolean; $secondary?: boolean }>`
  width: 100%;
  padding: ${({ theme }) => `${theme?.spacing?.xs} ${theme?.spacing?.md}`};
  border: none;
  border-radius: ${({ theme }) => theme?.borderRadius?.md};
  font-size: ${({ theme }) => theme?.typography?.fontSize?.sm};
  font-weight: ${({ theme }) => theme?.typography?.fontWeight?.semibold};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  opacity: ${({ $disabled }) => ($disabled ? 0.4 : 1)};
  background: ${({ $secondary, theme }) =>
    $secondary ? theme?.colors?.background?.secondary : theme?.colors?.primary?.[500]};
  color: ${({ $secondary, theme }) =>
    $secondary ? theme?.colors?.text?.primary : theme?.colors?.text?.inverse};
  transition: opacity ${({ theme }) => theme?.transitions?.fast};
  margin-top: ${({ $secondary, theme }) => ($secondary ? theme?.spacing?.xs : "0")};

  &:hover:not(:disabled) {
    opacity: 0.9;
  }
`;

export const Message = styled.p<{ $error?: boolean }>`
  font-size: ${({ theme }) => theme?.typography?.fontSize?.xs};
  color: ${({ $error, theme }) => ($error ? theme?.colors?.error?.[500] : theme?.colors?.success?.[500])};
  margin: ${({ theme }) => theme?.spacing?.xs} 0 0;
  text-align: center;
`;

export const Loading = styled.p`
  font-size: ${({ theme }) => theme?.typography?.fontSize?.xs};
  color: ${({ theme }) => theme?.colors?.text?.secondary};
  text-align: center;
  margin: ${({ theme }) => theme?.spacing?.sm} 0;
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme?.spacing?.xs};
  font-size: ${({ theme }) => theme?.typography?.fontSize?.xs};
  color: ${({ theme }) => theme?.colors?.text?.secondary};
  line-height: 1.5;
  margin-bottom: ${({ theme }) => theme?.spacing?.md};

  a {
    color: ${({ theme }) => theme?.colors?.primary?.[500]};
    text-decoration: underline;
    &:hover { color: ${({ theme }) => theme?.colors?.primary?.[600]}; }
  }
`;

export const Checkbox = styled.input`
  margin-top: 2px;
  accent-color: ${({ theme }) => theme?.colors?.primary?.[500]};
  width: 14px;
  height: 14px;
  flex-shrink: 0;
`;

export const GoogleButtonContainer = styled.div`
  width: 100%;
  margin-bottom: ${({ theme }) => theme?.spacing?.xs};
  display: flex;
  justify-content: center;
`;

export const OrSeparator = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  color: ${({ theme }) => theme?.colors?.text?.tertiary};
  font-size: ${({ theme }) => theme?.typography?.fontSize?.xs};
  margin: ${({ theme }) => `${theme?.spacing?.xs} 0 ${theme?.spacing?.sm}`};
  font-weight: ${({ theme }) => theme?.typography?.fontWeight?.medium};

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid ${({ theme }) => theme?.colors?.border?.light};
  }

  &:not(:empty)::before {
    margin-right: .5em;
  }

  &:not(:empty)::after {
    margin-left: .5em;
  }
`;

export const LegalDisclaimer = styled.p`
  font-size: ${({ theme }) => theme?.typography?.fontSize?.xs};
  color: ${({ theme }) => theme?.colors?.text?.tertiary};
  text-align: center;
  margin-top: ${({ theme }) => theme?.spacing?.md};
  line-height: 1.4;

  a {
    color: ${({ theme }) => theme?.colors?.primary?.[500]};
    text-decoration: none;
    font-weight: ${({ theme }) => theme?.typography?.fontWeight?.medium};
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const DisabledGoogleButton = styled.button`
  width: 100%;
  padding: ${({ theme }) => `${theme?.spacing?.xs} ${theme?.spacing?.sm}`};
  background: ${({ theme }) => theme?.colors?.background?.secondary};
  border: 1px solid ${({ theme }) => theme?.colors?.border?.light};
  color: ${({ theme }) => theme?.colors?.text?.tertiary};
  border-radius: ${({ theme }) => theme?.borderRadius?.md};
  font-size: ${({ theme }) => theme?.typography?.fontSize?.sm};
  font-weight: ${({ theme }) => theme?.typography?.fontWeight?.medium};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme?.spacing?.xs};
  cursor: not-allowed;
  transition: all ${({ theme }) => theme?.transitions?.fast};
  box-sizing: border-box;

  svg {
    filter: grayscale(1) opacity(0.4);
  }
`;

export const ToggleEmailLink = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme?.colors?.primary?.[500]};
  font-size: ${({ theme }) => theme?.typography?.fontSize?.xs};
  font-weight: ${({ theme }) => theme?.typography?.fontWeight?.medium};
  cursor: pointer;
  margin: ${({ theme }) => theme?.spacing?.xs} auto 0;
  display: block;
  transition: color ${({ theme }) => theme?.transitions?.fast};
  padding: ${({ theme }) => theme?.spacing?.xs};

  &:hover {
    color: ${({ theme }) => theme?.colors?.primary?.[600]};
    text-decoration: underline;
  }
`;
