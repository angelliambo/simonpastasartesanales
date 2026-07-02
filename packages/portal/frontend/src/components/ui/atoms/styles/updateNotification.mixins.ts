import styled from "styled-components";

export const UpdateNotificationContainer = styled.div<{ $isVisible: boolean }>`
  position: fixed;
  bottom: 80px;
  right: 20px;
  background: ${({ theme }: { theme: any }) => theme.colors.primary[500]};
  color: white;
  padding: 16px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: ${({ $isVisible }) => ($isVisible ? "flex" : "none")};
  align-items: center;
  gap: 12px;
  z-index: 1000;
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;
