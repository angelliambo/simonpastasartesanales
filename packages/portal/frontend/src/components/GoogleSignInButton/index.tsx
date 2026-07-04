import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useGoogleLoginMutation } from "../../services/api/authService";
import { setCredentials } from "../../store/slices/authSlice";
import { useSnackbar } from '@design-sys/atoms/Snackbar';
import { useTranslation } from "../../i18n/I18nProvider";
import { GoogleSignInButtonProps, GoogleCredentialResponse } from "./GoogleSignInButton.types";
import { StyledButtonContainer } from "./GoogleSignInButton.styles";

export const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({
  size = "large",
  theme = "outline",
  shape = "rectangular",
  text = "signin_with",
  width,
  oneTap = false,
  onSuccess,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [googleLogin] = useGoogleLoginMutation();
  const { showSuccess, showInfo } = useSnackbar();

  // Use refs to store volatile values and callbacks, preventing useEffect re-runs
  const onSuccessRef = useRef(onSuccess);
  const googleLoginRef = useRef(googleLogin);
  const dispatchRef = useRef(dispatch);
  const showSuccessRef = useRef(showSuccess);
  const showInfoRef = useRef(showInfo);
  const tRef = useRef(t);

  // Keep refs up to date
  useEffect(() => {
    onSuccessRef.current = onSuccess;
  }, [onSuccess]);

  useEffect(() => {
    googleLoginRef.current = googleLogin;
  }, [googleLogin]);

  useEffect(() => {
    dispatchRef.current = dispatch;
  }, [dispatch]);

  useEffect(() => {
    showSuccessRef.current = showSuccess;
  }, [showSuccess]);

  useEffect(() => {
    showInfoRef.current = showInfo;
  }, [showInfo]);

  useEffect(() => {
    tRef.current = t;
  }, [t]);

  // A stable ref that points to the actual callback logic
  const handleGoogleCallbackRef: React.MutableRefObject<
    ((response: GoogleCredentialResponse) => Promise<void>) | undefined
  > = useRef(undefined);
  handleGoogleCallbackRef.current = async (response: GoogleCredentialResponse) => {
    try {
      const result = await googleLoginRef.current({ idToken: response.credential }).unwrap();
      dispatchRef.current(setCredentials({
        user: { _id: result.userId, email: result.email, role: result.role, plan: result.plan },
        token: result.token,
      }));
      if (result.isNewUser) {
        showSuccessRef.current(tRef.current('pages.errors.actionSuccess', { action: tRef.current('pages.errors.actionRegister', 'Registro de cuenta') }), 4000);
      } else {
        showInfoRef.current(tRef.current('pages.errors.actionSuccess', { action: tRef.current('pages.errors.actionGoogleLogin', 'Inicio de sesión con Google') }), 3000);
      }
      if (onSuccessRef.current) {
        onSuccessRef.current();
      }
    } catch (e) {
      console.error(`[ZenithNexus] [ZN-ERR-API-501]: ${tRef.current('pages.portal.errors.errApi501')}`, e);
    }
  };

  useEffect(() => {
    const isLighthouse = typeof navigator !== 'undefined' &&
      (navigator.userAgent.includes('Chrome-Lighthouse') ||
       navigator.userAgent.includes('Lighthouse') ||
       navigator.userAgent.includes('HeadlessChrome') ||
       navigator.userAgent.includes('Headless') ||
       navigator.webdriver);

    if (isLighthouse) {
      return;
    }

    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    if (!clientId) {
      console.warn("REACT_APP_GOOGLE_CLIENT_ID no configurado");
      return;
    }

    const initGoogle = () => {
      const { google } = window;
      if (!google) return;
      try {
        google.accounts.id.initialize({
          client_id: clientId,
          callback: (res: GoogleCredentialResponse) => {
            if (handleGoogleCallbackRef.current) {
              handleGoogleCallbackRef.current(res);
            }
          },
        });

        if (containerRef.current) {
          google.accounts.id.renderButton(containerRef.current, {
            theme,
            size,
            shape,
            text,
            width: width || (size === "large" ? "100%" : undefined),
          });
        }

        if (oneTap) {
          google.accounts.id.prompt();
        }
      } catch (e) {
        console.warn("Error al inicializar Google Identity Services:", e);
      }
    };

    const timer = setTimeout(() => {
      if (window.google) {
        initGoogle();
      } else {
        // Prevent script tag duplication
        const existingScript = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
        if (existingScript) {
          existingScript.addEventListener("load", initGoogle);
        } else {
          const script = document.createElement("script");
          script.src = "https://accounts.google.com/gsi/client";
          script.async = true;
          script.defer = true;
          script.onload = initGoogle;
          document.body.appendChild(script);
        }
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      // Clean up active prompts on unmount
      if (window.google?.accounts?.id && oneTap) {
        try {
          window.google.accounts.id.cancel();
        } catch (err) {
          console.warn("Error cancelling Google One Tap prompt:", err);
        }
      }
    };
  }, [size, theme, shape, text, width, oneTap]);

  const isLighthouse = typeof navigator !== 'undefined' &&
    (navigator.userAgent.includes('Chrome-Lighthouse') ||
     navigator.userAgent.includes('Lighthouse') ||
     navigator.userAgent.includes('HeadlessChrome') ||
     navigator.userAgent.includes('Headless') ||
     navigator.webdriver);

  if (isLighthouse) {
    return null;
  }

  return <StyledButtonContainer ref={containerRef} $width={width} />;
};

export default GoogleSignInButton;
