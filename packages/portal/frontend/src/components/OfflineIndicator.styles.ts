import styled from "styled-components";
import Text from '@design-sys/atoms/Text';

export const IndicatorContainer = styled.div<{
  $isVisible: boolean;
  $isOffline: boolean;
  $showSyncMessage: boolean;
  $position: "top" | "bottom";
}>`
  position: fixed;
  left: 50%;
  z-index: ${({ theme }) => theme.zIndex.sticky};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  transition: all ${({ theme }) => theme.transitions.normal};
  opacity: ${({ $isVisible, $showSyncMessage }) => ($isVisible || $showSyncMessage ? 1 : 0)};
  transform: ${({ $isVisible, $showSyncMessage }) =>
    $isVisible || $showSyncMessage
      ? "translateX(-50%) translateY(0)"
      : "translateX(-50%) translateY(-20px)"};
  
  background: ${({ $isOffline, $showSyncMessage, theme }) =>
    $isOffline
      ? theme.colors.error[500]
      : $showSyncMessage
      ? theme.colors.success[500]
      : "transparent"};
  color: ${({ theme }) => theme.colors.text.inverse};
  top: ${({ $position }) => ($position === "top" ? "80px" : "auto")};
  bottom: ${({ $position }) => ($position === "bottom" ? "20px" : "auto")};
`;

export const WhiteText = styled(Text)`
  color: ${({ theme }) => theme.colors.text.inverse};
`;
