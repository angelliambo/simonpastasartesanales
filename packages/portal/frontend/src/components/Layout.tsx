import React, { useMemo, useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Container } from "./ui/atoms/Container";
import { usePersonalization } from "../contexts/PersonalizationContext";
import { LanguageSelector } from "../i18n/LanguageSelector";
import { RootState } from "../store/store";
import { logout } from "../store/slices/authSlice";
import Button from "./ui/atoms/Button";
import RegisterModal from "./RegisterModal";
import { ZnIcon } from "@design-sys/atoms/ZnIcon";
import {
  SafetyOutlined,
  UserOutlined,
  LogoutOutlined,
  MenuOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { FEATURES } from "@factory/shared/config/features";
import { BRAND_CONFIG } from "@factory/shared/config/brand";
import { SUPPORTED_LOCALES } from "../i18n";

const TopBar = styled.header`
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

const AccessBtn = styled(Button)`
  background: ${({ theme }) => theme.gradients?.premium || 'linear-gradient(135deg, #3b82f6, #8b5cf6)'};
  color: ${({ theme }) => theme.colors.text.inverse || 'white'};
  border: none;
  font-weight: 600;
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;

const UserBadge = styled(Link)`
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

  &:hover { background: ${({ theme }) => theme.colors.primary[100]}; }
`;

const LogoutBtn = styled.button`
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
  
  &:hover {
    color: ${({ theme }) => theme.colors.error[500] || '#ef4444'};
    background: ${({ theme }) => `${theme.colors.text.primary}14` || 'rgba(255, 255, 255, 0.08)'};
  }
`;

const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const DesktopRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const HamburgerButton = styled.button`
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

const MobileSidebar = styled.div<{ $open: boolean }>`
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

const SidebarOverlay = styled.div<{ $open: boolean }>`
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

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  padding-bottom: 16px;
`;

const CloseButton = styled.button`
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

const SidebarNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SidebarNavLink = styled(Link)<{ $active?: boolean }>`
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

const NavLink = styled(Link) <{ $active?: boolean }>`
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

const LogoLink = styled(Link)`
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

const MainContent = styled.main`
  padding-top: 48px;
  position: relative;
  z-index: 1;
`;

const Layout: React.FC = React.memo(() => {
  const { accessibility } = usePersonalization();
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.auth.user);
  const location = useLocation();
  const [showRegister, setShowRegister] = useState<'email' | 'code' | false>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const accessibilityClasses = useMemo(() => {
    const classes = [];
    if (accessibility.highContrast) classes.push("high-contrast");
    if (accessibility.increasedSpacing) classes.push("increased-spacing");
    if (accessibility.reduceMotion) classes.push("reduce-motion");
    if (accessibility.disableAnimations) classes.push("no-animations");
    if (accessibility.dyslexiaSupport) classes.push("dyslexia-support");
    if (accessibility.readingGuide) classes.push("reading-guide");
    if (accessibility.focusIndicator) classes.push("focus-indicator");
    if (accessibility.keyboardNavigation) classes.push("keyboard-navigation");
    if (accessibility.textToSpeech) classes.push("text-to-speech");
    if (accessibility.colorBlindSupport && accessibility.colorBlindType) {
      classes.push(`colorblind-${accessibility.colorBlindType}`);
    }
    return classes.join(" ");
  }, [accessibility]);

  return (
    <div className={accessibilityClasses}>
      <TopBar>
        <LogoLink to="/" onClick={() => setIsMobileMenuOpen(false)}>{BRAND_CONFIG.siteName}</LogoLink>

        {location.pathname !== "/wellcome" && (
          <>
            <NavLinks>
              <NavLink to="/" $active={location.pathname === "/"}>Inicio</NavLink>

              {FEATURES.ENABLE_BILLING_LEMON && (
                <NavLink to="/pricing" $active={location.pathname === "/pricing"}>Planes</NavLink>
              )}

              {FEATURES.ENABLE_TICKETING_SYSTEM && (
                <NavLink to="/support" $active={location.pathname === "/support"}>Ayuda</NavLink>
              )}

              {FEATURES.ENABLE_GOOGLE_AUTH && token && (
                <NavLink to="/dashboard" $active={location.pathname === "/dashboard"}>Dashboard</NavLink>
              )}

              {FEATURES.ENABLE_GOOGLE_AUTH && (user?.isAdmin || user?.role === "admin") && (
                <NavLink to="/admin" $active={location.pathname === "/admin"}>
                  <ZnIcon icon={SafetyOutlined} /> Admin
                </NavLink>
              )}
            </NavLinks>

            <DesktopRight>
              {FEATURES.ENABLE_GOOGLE_AUTH && (
                token && user ? (
                  <>
                    <UserBadge to="/dashboard">
                      <ZnIcon icon={UserOutlined} /> {user.email?.split('@')[0] || 'User'}
                    </UserBadge>
                    <LogoutBtn onClick={() => dispatch(logout())}>
                      <ZnIcon icon={LogoutOutlined} />
                    </LogoutBtn>
                  </>
                ) : (
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <AccessBtn size="sm" onClick={() => setShowRegister('email')}>
                      Ingresar
                    </AccessBtn>
                  </div>
                )
              )}

              {SUPPORTED_LOCALES.length > 1 && <LanguageSelector />}
            </DesktopRight>

            <HamburgerButton onClick={() => setIsMobileMenuOpen(true)}>
              <ZnIcon icon={MenuOutlined} />
            </HamburgerButton>
          </>
        )}
      </TopBar>

      <SidebarOverlay $open={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(false)} />
      <MobileSidebar $open={isMobileMenuOpen}>
        <SidebarHeader>
          <LogoLink to="/" onClick={() => setIsMobileMenuOpen(false)}>{BRAND_CONFIG.siteName}</LogoLink>
          <CloseButton onClick={() => setIsMobileMenuOpen(false)}>
            <ZnIcon icon={CloseOutlined} />
          </CloseButton>
        </SidebarHeader>

        <SidebarNav>
          <SidebarNavLink to="/" $active={location.pathname === "/"} onClick={() => setIsMobileMenuOpen(false)}>
            Inicio
          </SidebarNavLink>

          {FEATURES.ENABLE_BILLING_LEMON && (
            <SidebarNavLink to="/pricing" $active={location.pathname === "/pricing"} onClick={() => setIsMobileMenuOpen(false)}>
              Planes
            </SidebarNavLink>
          )}

          {FEATURES.ENABLE_TICKETING_SYSTEM && (
            <SidebarNavLink to="/support" $active={location.pathname === "/support"} onClick={() => setIsMobileMenuOpen(false)}>
              Ayuda
            </SidebarNavLink>
          )}

          {FEATURES.ENABLE_GOOGLE_AUTH && token && (
            <SidebarNavLink to="/dashboard" $active={location.pathname === "/dashboard"} onClick={() => setIsMobileMenuOpen(false)}>
              Dashboard
            </SidebarNavLink>
          )}

          {FEATURES.ENABLE_GOOGLE_AUTH && (user?.isAdmin || user?.role === "admin") && (
            <SidebarNavLink to="/admin" $active={location.pathname === "/admin"} onClick={() => setIsMobileMenuOpen(false)}>
              Admin
            </SidebarNavLink>
          )}
        </SidebarNav>

        <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "16px" }}>
          {FEATURES.ENABLE_GOOGLE_AUTH && (
            token && user ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
                <UserBadge to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} style={{ margin: 0, flexGrow: 1 }}>
                  <ZnIcon icon={UserOutlined} /> {user.email?.split('@')[0] || 'User'}
                </UserBadge>
                <LogoutBtn onClick={() => { dispatch(logout()); setIsMobileMenuOpen(false); }} style={{ background: "rgba(0,0,0,0.05)", padding: "10px", borderRadius: "8px" }}>
                  <ZnIcon icon={LogoutOutlined} />
                </LogoutBtn>
              </div>
            ) : (
              <AccessBtn onClick={() => { setShowRegister('email'); setIsMobileMenuOpen(false); }} style={{ width: "100%" }}>
                Ingresar
              </AccessBtn>
            )
          )}

          {SUPPORTED_LOCALES.length > 1 && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <LanguageSelector />
            </div>
          )}
        </div>
      </MobileSidebar>

      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} initialStep={showRegister} />}

      <MainContent>
        <Container maxWidth="full" padding="none">
          <Outlet />
        </Container>
      </MainContent>
    </div>
  );
});

Layout.displayName = "Layout";

export default Layout;
