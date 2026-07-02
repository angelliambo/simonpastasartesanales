import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 999;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Card = styled.div`
  background: rgba(15, 23, 42, 0.92);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 1.25rem;
  padding: 28px 24px;
  width: 100%;
  max-width: 380px;
  color: white;
  box-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.6);
  animation: slideDown 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  position: relative;
  contain: content; /* Isola el modal de recálculos de layout globales */

  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-12px) scale(0.97); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
`;

export const CloseBtn = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(255, 255, 255, 0.06);
  border: none;
  color: #94a3b8;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;

  &:hover { background: rgba(255, 255, 255, 0.12); color: white; }
`;

export const Title = styled.h2`
  font-size: 1.15rem;
  font-weight: 700;
  margin: 0 0 4px;
  background: linear-gradient(135deg, #60a5fa, #a78bfa, #f472b6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const Subtitle = styled.p`
  font-size: 13px;
  color: #94a3b8;
  margin: 0 0 20px;
  line-height: 1.4;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px 14px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.04);
  color: white;
  font-size: 14px;
  box-sizing: border-box;
  transition: border-color 0.2s;
  margin-bottom: 10px;

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
  &::placeholder { color: #475569; }
`;

export const Button = styled.button<{ $disabled?: boolean; $secondary?: boolean }>`
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  opacity: ${({ $disabled }) => ($disabled ? 0.4 : 1)};
  background: ${({ $secondary }) =>
    $secondary ? "rgba(255,255,255,0.06)" : "linear-gradient(135deg, #3b82f6, #8b5cf6)"};
  color: white;
  transition: opacity 0.2s;
  margin-top: ${({ $secondary }) => ($secondary ? "6px" : "0")};

  &:hover:not(:disabled) { opacity: 0.9; }
`;

export const Message = styled.p<{ $error?: boolean }>`
  font-size: 12px;
  color: ${({ $error }) => ($error ? "#ef4444" : "#22c55e")};
  margin: 8px 0 0;
  text-align: center;
`;

export const Loading = styled.p`
  font-size: 13px;
  color: #94a3b8;
  text-align: center;
  margin: 16px 0;
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 11px;
  color: #94a3b8;
  line-height: 1.5;
  margin-bottom: 16px;

  a {
    color: #60a5fa;
    text-decoration: underline;
    &:hover { color: #93c5fd; }
  }
`;

export const Checkbox = styled.input`
  margin-top: 2px;
  accent-color: #3b82f6;
  width: 14px;
  height: 14px;
  flex-shrink: 0;
`;

export const GoogleButtonContainer = styled.div`
  width: 100%;
  margin-bottom: 12px;
  display: flex;
  justify-content: center;
`;

export const OrSeparator = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  color: #475569;
  font-size: 11px;
  margin: 10px 0 14px;
  font-weight: 500;

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  &:not(:empty)::before {
    margin-right: .5em;
  }

  &:not(:empty)::after {
    margin-left: .5em;
  }
`;

export const LegalDisclaimer = styled.p`
  font-size: 11px;
  color: #64748b;
  text-align: center;
  margin-top: 16px;
  line-height: 1.4;

  a {
    color: #60a5fa;
    text-decoration: none;
    font-weight: 500;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const DisabledGoogleButton = styled.button`
  width: 100%;
  padding: 10px 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #64748b;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  cursor: not-allowed;
  transition: all 0.2s;
  box-sizing: border-box;

  svg {
    filter: grayscale(1) opacity(0.4);
  }

  &:hover {
    background: rgba(255, 255, 255, 0.07);
    border-color: rgba(255, 255, 255, 0.12);
  }
`;

export const ToggleEmailLink = styled.button`
  background: none;
  border: none;
  color: #60a5fa;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  margin: 14px auto 0;
  display: block;
  transition: color 0.2s;
  padding: 4px 8px;

  &:hover {
    color: #93c5fd;
    text-decoration: underline;
  }
`;

