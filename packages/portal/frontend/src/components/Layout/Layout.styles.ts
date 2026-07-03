import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from "../ui/atoms/Button";

export const TopBar = styled.header`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  padding: 8px 24px;
  background: ${({ theme }) => theme.colors.background.secondary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: background 0.3s cubic-bezier(0.16, 1, 0.3, 1);
`;

export const AccessBtn = styled(Button)<{ $isMobile?: boolean }>`
  background: ${({ theme }) => theme.gradients?.premium || 'linear-gradient(135deg, #3b82f6, #8b5cf6)'};
  color: ${({ theme }) => theme.colors.text.inverse || 'white'};
  border: none;
  font-weight: 600;
  ${({ $isMobile }) => $isMobile && `width: 100%;`}
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;

export const UserBadge = styled(Link)<{ $isMobile?: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  text-decoration: none;
  padding: 6px 14px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.primary[50]};
  transition: background 0.2s;
  ${({ $isMobile }) => $isMobile && `
    margin: 0;
    flex-grow: 1;
  `}

  &:hover { background: ${({ theme }) => theme.colors.primary[100]}; }
`;

export const LogoutBtn = styled.button<{ $isMobile?: boolean }>`
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.65);
  font-size: 16px;
  cursor: pointer;
  padding: 6px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: color 0.2s, background-color 0.2s;
  ${({ $isMobile }) => $isMobile && `
    background: rgba(0,0,0,0.05);
    padding: 10px;
    border-radius: 8px;
  `}
  
  &:hover {
    color: ${({ theme }) => theme.colors.error[500] || '#ef4444'};
    background: ${({ theme }) => `${theme.colors.text.primary}14` || 'rgba(255, 255, 255, 0.08)'};
  }
`;

export const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const DesktopRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const HamburgerButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 20px;
  cursor: pointer;
  padding: 6px;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: background-color 0.2s;

  &:hover {
    background: ${({ theme }) => `${theme.colors.text.primary}10`};
  }

  @media (max-width: 768px) {
    display: inline-flex;
  }
`;

export const MobileSidebar = styled.div<{ $open: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 280px;
  background: ${({ theme }) => theme.colors.background.secondary};
  border-left: 1px solid ${({ theme }) => theme.colors.border.light};
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.08);
  z-index: 1001;
  display: flex;
  flex-direction: column;
  padding: 24px;
  gap: 20px;
  transform: translateX(${({ $open }) => ($open ? "0" : "100%")});
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
`;

export const SidebarOverlay = styled.div<{ $open: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.35);
  z-index: 1000;
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
  transition: opacity 0.3s ease;
`;

export const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  padding-bottom: 16px;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 18px;
  cursor: pointer;
  padding: 6px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: background-color 0.2s, color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
    background: ${({ theme }) => `${theme.colors.text.primary}10`};
  }
`;

export const SidebarNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const SidebarNavLink = styled(Link)<{ $active?: boolean }>`
  font-size: 14px;
  font-weight: 500;
  color: ${({ $active, theme }) => ($active ? theme.colors.primary[500] : theme.colors.text.secondary)};
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 6px;
  transition: color 0.2s, background 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
    background: ${({ theme }) => `${theme.colors.text.primary}10`};
  }
`;

export const NavLink = styled(Link)<{ $active?: boolean }>`
  font-size: 13px;
  font-weight: 500;
  color: ${({ $active, theme }) => ($active ? (theme.colors.primary[400] || "#60a5fa") : (theme.colors.text.secondary || "rgba(255,255,255,0.65)"))};
  text-decoration: none;
  padding: 4px 10px;
  border-radius: 6px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  transition: color 0.2s, background 0.2s;
  &:hover { 
    color: ${({ theme }) => theme.colors.text.primary || '#fff'}; 
    background: ${({ theme }) => `${theme.colors.text.primary}10` || 'rgba(255,255,255,0.06)'}; 
  }
`;

export const LogoLink = styled(Link)`
  font-size: 16px;
  font-weight: 700;
  color: white;
  text-decoration: none;
  margin-right: auto;
  letter-spacing: 0.5px;
  background: ${({ theme }) => theme.gradients?.brand || 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #f472b6 100%)'};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const MainContent = styled.main`
  padding-top: 48px;
  position: relative;
  z-index: 1;
`;

// Wrappers locales para eliminar estilos en línea
export const AccessBtnWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const MobileActionsWrapper = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const MobileUserRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

export const MobileLangSelectorWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
