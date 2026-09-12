import styled from "styled-components";
import { Link } from "@tanstack/react-router";
import Button from '@design-sys/atoms/Button';
import { Container } from '@design-sys/atoms/Container';

export const LayoutRoot = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  background: ${({ theme }) => theme.colors.background.primary};
`;

export const TopBar = styled.header`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.background.secondary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${({ theme }) => theme.zIndex.fixed};
  transition: background ${({ theme }) => theme.transitions.normal};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  }
`;

export const AccessBtn = styled(Button)<{ $isMobile?: boolean }>`
  background: ${({ theme }) => theme.gradients.premium};
  color: ${({ theme }) => theme.colors.text.inverse};
  border: none;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  ${({ $isMobile }) => $isMobile && `width: 100%;`}
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;

export const UserBadge = styled(Link)<{ $isMobile?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  text-decoration: none;
  padding: 6px 14px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.primary[50]};
  transition: background ${({ theme }) => theme.transitions.fast};
  ${({ $isMobile }) => $isMobile && `
    margin: 0;
    flex-grow: 1;
  `}

  &:hover { background: ${({ theme }) => theme.colors.primary[100]}; }
`;

export const LogoutBtn = styled.button<{ $isMobile?: boolean }>`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  cursor: pointer;
  padding: 6px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: color ${({ theme }) => theme.transitions.fast}, background-color ${({ theme }) => theme.transitions.fast};
  ${({ $isMobile }) => $isMobile && `
    background: rgba(0,0,0,0.05);
    padding: 10px;
    border-radius: 8px;
  `}
  
  &:hover {
    color: ${({ theme }) => theme.colors.error[500]};
    background: ${({ theme }) => theme.colors.background.tertiary};
  }
`;

export const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

export const DesktopRight = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

export const HamburgerButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  cursor: pointer;
  padding: 6px;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.background.tertiary};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: inline-flex;
  }
`;

export const MobileSidebar = styled.div<{ $open: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 280px;
  max-width: calc(100vw - 48px);
  background: ${({ theme }) => theme.colors.background.secondary};
  border-left: 1px solid ${({ theme }) => theme.colors.border.light};
  box-shadow: ${({ theme }) => theme.shadows.heavy};
  z-index: ${({ theme }) => theme.zIndex.modal + 1};
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.lg};
  gap: ${({ theme }) => theme.spacing.md};
  transform: translateX(${({ $open }) => ($open ? "0" : "100%")});
  transition: transform ${({ theme }) => theme.transitions.normal};
`;

export const SidebarOverlay = styled.div<{ $open: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.35);
  z-index: ${({ theme }) => theme.zIndex.modal};
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
  transition: opacity ${({ theme }) => theme.transitions.normal};
`;

export const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  cursor: pointer;
  padding: 6px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: background-color ${({ theme }) => theme.transitions.fast}, color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
    background: ${({ theme }) => theme.colors.background.tertiary};
  }
`;

export const SidebarNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const SidebarNavLink = styled(Link)<{ $active?: boolean }>`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ $active, theme }) => ($active ? theme.colors.primary[500] : theme.colors.text.secondary)};
  text-decoration: none;
  padding: 8px 12px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: color ${({ theme }) => theme.transitions.fast}, background ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
    background: ${({ theme }) => theme.colors.background.tertiary};
  }
`;

export const NavLink = styled(Link)<{ $active?: boolean }>`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ $active, theme }) => ($active ? theme.colors.primary[400] : theme.colors.text.secondary)};
  text-decoration: none;
  padding: 4px 10px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  display: inline-flex;
  align-items: center;
  gap: 4px;
  transition: color ${({ theme }) => theme.transitions.fast}, background ${({ theme }) => theme.transitions.fast};
  &:hover { 
    color: ${({ theme }) => theme.colors.text.primary}; 
    background: ${({ theme }) => theme.colors.background.tertiary}; 
  }
`;

export const LogoLink = styled(Link)`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.inverse};
  text-decoration: none;
  margin-right: auto;
  letter-spacing: 0.5px;
  background: ${({ theme }) => theme.gradients.brand};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 56px;
  position: relative;
  z-index: 1;
`;

export const InnerContentContainer = styled(Container)`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const AccessBtnWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const MobileActionsWrapper = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const MobileUserRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const MobileHeaderActions = styled.div`
  display: none;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
  }
`;

export const PreferencesSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  padding-top: ${({ theme }) => theme.spacing.xs};
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
`;

export const PreferenceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const MobileLangSelectorWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
