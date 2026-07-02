import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.modal};
  background: rgba(15, 23, 42, 0.92);
  backdrop-filter: blur(${({ theme }) => theme.effects.blur.subtle});
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.md};
`;

export const ModalContainer = styled.div<{ $wide?: boolean }>`
  position: relative;
  width: 100%;
  max-width: ${({ $wide }) => ($wide ? '960px' : '420px')};
  max-height: 90vh;
  overflow-y: auto;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  contain: content; /* Aísla el renderizado del modal para evitar reflujos globales */

  @keyframes slideUp {
    from { transform: translateY(100%); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 14px;
  right: 14px;
  z-index: 1;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  color: white;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background ${({ theme }) => theme.transitions.fast};

  &:hover { background: rgba(255, 255, 255, 0.2); }
`;
