import styled, { keyframes } from "styled-components";
import { Card, Text, Button } from "../../../styles/mixins";

// ===== ANIMACIONES =====
export const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const slideInDesktop = keyframes`
  from { opacity: 0; transform: translateY(-20px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

export const slideInMobile = keyframes`
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
`;

// ===== COMPONENTES ESTILIZADOS =====
export const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeIn} 0.2s ease-out;
  padding: 16px;

  @media (max-width: ${({ theme }: { theme: any }) => theme.breakpoints.md}) {
    align-items: flex-end;
    justify-content: flex-end;
    padding: 0;
  }
`;

export const ModalCard = styled(Card)<{ $width?: string }>`
  position: relative;
  max-width: ${({ $width = "600px" }) => $width};
  max-height: 90vh;
  width: 100%;
  margin: 0 auto;
  border-radius: 16px;
  box-shadow: ${({ theme }: { theme: any }) => theme.shadows.medium};
  animation: ${slideInDesktop} 0.3s ease-out;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  @media (max-width: ${({ theme }: { theme: any }) => theme.breakpoints.md}) {
    max-width: 100%;
    width: 100%;
    height: 100%;
    max-height: 100vh;
    border-radius: 0;
    animation: ${slideInMobile} 0.3s ease-out;
  }
`;

export const SidebarContainer = ModalCard;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 24px 16px 24px;
  border-bottom: 1px solid ${({ theme }: { theme: any }) => theme.colors.border.light};
  background-color: ${({ theme }: { theme: any }) => theme.colors.background.surface};
  flex-shrink: 0;
`;

export const ModalTitle = styled(Text)`
  font-size: ${({ theme }: { theme: any }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }: { theme: any }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }: { theme: any }) => theme.colors.text.primary};
  margin: 0;
`;

export const CloseButton = styled(Button)`
  min-width: 32px;
  height: 32px;
  padding: 0;
  border-radius: 50%;
  font-size: ${({ theme }: { theme: any }) => theme.typography.fontSize.md};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  &:hover {
    background-color: ${({ theme }: { theme: any }) => theme.colors.background.card};
  }
`;

export const ModalBody = styled.div`
  flex: 1;
  padding: 24px;
  overflow-y: auto;
  overflow-x: hidden;

  /* Scrollbar personalizado */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }: { theme: any }) => theme.colors.background.card};
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }: { theme: any }) => theme.colors.border.normal};
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }: { theme: any }) => theme.colors.border.dark};
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid ${({ theme }: { theme: any }) => theme.colors.border.light};
  background-color: ${({ theme }: { theme: any }) => theme.colors.background.surface};
  flex-shrink: 0;

  @media (max-width: ${({ theme }: { theme: any }) => theme.breakpoints.sm}) {
    flex-direction: column-reverse;
    gap: 8px;

    button {
      width: 100%;
    }
  }
`;
