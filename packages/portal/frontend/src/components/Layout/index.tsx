import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Container } from '@design-sys/atoms/Container';
import AppFooter from "../AppFooter";
import FloatingWhatsAppCTA from "../FloatingWhatsAppCTA";
import { LanguageSelector } from "../../i18n/LanguageSelector";
import { ThemeToggle } from "../ThemeToggle";
import { RootState } from "../../store/store";
import { logout } from "../../store/slices/authSlice";
import RegisterModal from "../RegisterModal";
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
import { SUPPORTED_LOCALES } from "../../i18n";
import { usePageTracking } from "../../hooks/usePageTracking";
import {
  TopBar,
  AccessBtn,
  UserBadge,
  LogoutBtn,
  NavLinks,
  DesktopRight,
  HamburgerButton,
  MobileSidebar,
  SidebarOverlay,
  SidebarHeader,
  CloseButton,
  SidebarNav,
  SidebarNavLink,
  NavLink,
  LogoLink,
  MainContent,
  AccessBtnWrapper,
  MobileActionsWrapper,
  MobileUserRow,
  MobileHeaderActions,
  PreferencesSection,
  PreferenceRow,
} from "./Layout.styles";

const Layout: React.FC = React.memo(() => {
  usePageTracking();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state: RootState) => state.auth);
  const [showRegister, setShowRegister] = useState<false | "email" | "code">(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <Container maxWidth="full" padding="none" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <TopBar>
        <LogoLink to="/">
          {BRAND_CONFIG.siteName}
        </LogoLink>

        <NavLinks>
          <NavLink to="/" $active={location.pathname === "/"}>
            Inicio
          </NavLink>

          {FEATURES.ENABLE_BILLING_LEMON && (
            <NavLink to="/pricing" $active={location.pathname === "/pricing"}>
              Planes
            </NavLink>
          )}

          {FEATURES.ENABLE_TICKETING_SYSTEM && (
            <NavLink to="/support" $active={location.pathname === "/support"}>
              Ayuda
            </NavLink>
          )}

          {FEATURES.ENABLE_GOOGLE_AUTH && token && (
            <NavLink to="/dashboard" $active={location.pathname === "/dashboard"}>
              Dashboard
            </NavLink>
          )}

          {FEATURES.ENABLE_GOOGLE_AUTH && (user?.isAdmin || user?.role === "admin") && (
            <NavLink to="/admin" $active={location.pathname === "/admin"}>
              <ZnIcon icon={SafetyOutlined} /> Admin
            </NavLink>
          )}
        </NavLinks>

        <DesktopRight>
          <ThemeToggle variant="icon" />
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
              <AccessBtnWrapper>
                <AccessBtn size="sm" onClick={() => setShowRegister('email')}>
                  Ingresar
                </AccessBtn>
              </AccessBtnWrapper>
            )
          )}

          {SUPPORTED_LOCALES.length > 1 && <LanguageSelector />}
        </DesktopRight>

        <MobileHeaderActions>
          <ThemeToggle variant="icon" />
          <HamburgerButton onClick={() => setIsMobileMenuOpen(true)}>
            <ZnIcon icon={MenuOutlined} />
          </HamburgerButton>
        </MobileHeaderActions>
      </TopBar>

      <SidebarOverlay $open={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(false)} />
      <MobileSidebar $open={isMobileMenuOpen}>
        <SidebarHeader>
          <LogoLink to="/" onClick={() => setIsMobileMenuOpen(false)}>
            {BRAND_CONFIG.siteName}
          </LogoLink>
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

        <MobileActionsWrapper>
          {FEATURES.ENABLE_GOOGLE_AUTH && (
            token && user ? (
              <MobileUserRow>
                <UserBadge to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} $isMobile={true}>
                  <ZnIcon icon={UserOutlined} /> {user.email?.split('@')[0] || 'User'}
                </UserBadge>
                <LogoutBtn onClick={() => { dispatch(logout()); setIsMobileMenuOpen(false); }} $isMobile={true}>
                  <ZnIcon icon={LogoutOutlined} />
                </LogoutBtn>
              </MobileUserRow>
            ) : (
              <AccessBtn onClick={() => { setShowRegister('email'); setIsMobileMenuOpen(false); }} $isMobile={true}>
                Ingresar
              </AccessBtn>
            )
          )}

          <PreferencesSection>
            <PreferenceRow>
              <span>Tema</span>
              <ThemeToggle variant="row" />
            </PreferenceRow>

            {SUPPORTED_LOCALES.length > 1 && (
              <PreferenceRow>
                <span>Idioma</span>
                <LanguageSelector dropUp={true} />
              </PreferenceRow>
            )}
          </PreferencesSection>
        </MobileActionsWrapper>
      </MobileSidebar>

      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} initialStep={showRegister} />}

      <MainContent>
        <Container maxWidth="full" padding="none">
          <Outlet />
        </Container>
      </MainContent>

      <AppFooter />
      <FloatingWhatsAppCTA />
    </Container>
  );
});

Layout.displayName = "Layout";

export default Layout;
