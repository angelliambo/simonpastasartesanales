import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "../../i18n/I18nProvider";
import { RootState } from "../../store/store";
import { BRAND_CONFIG } from "@factory/shared/config/brand";
import GoogleSignInButton from "../../components/GoogleSignInButton";
import { useSendTokenMutation, useVerifyTokenMutation } from "../../services/api/authService";
import { setCredentials } from "../../store/slices/authSlice";
import { useSnackbar } from '@design-sys/atoms/Snackbar';
import {
  GlobalOutlined,
  CheckCircleOutlined,
  KeyOutlined,
  RocketOutlined,
} from "@ant-design/icons";
import {
  WelcomeContainer,
  WelcomeCard,
  WelcomeHeader,
  Logo,
  Title,
  Subtitle,
  CheckboxContainer,
  CheckboxInput,
  CheckboxLabel,
  ActionButton,
  FormContainer,
  FormInput,
  FormMessage,
  FormButton,
  ToggleLink,
  WelcomeCardBody,
  LanguageSelectorWrapper,
  LanguageSelectorLabel,
  Divider,
  StatusContainer,
  StatusTitleWrapper,
  StatusDescription,
  PendingTermsDescription,
  AuthDescription,
  AuthButtonsWrapper,
  GoogleButtonWrapper,
  ManualLoginTrigger,
  FormLoadingText,
  FormInstructionText,
  TermsWarningText,
  GlobalIcon,
  StatusIcon,
  StartIcon,
  KeyIcon,
} from "./WelcomePage.styles";
import LanguageSelector from "../../i18n/LanguageSelector";

const G_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || "";

export const WelcomePage: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedInUser = useSelector((state: RootState) => state.auth.user);
  const { showSuccess, showInfo } = useSnackbar();

  const [sendToken, { isLoading: sending }] = useSendTokenMutation();
  const [verifyToken, { isLoading: verifying }] = useVerifyTokenMutation();

  const [termsAccepted, setTermsAccepted] = useState(() => {
    return localStorage.getItem("zn-terms-accepted") === "true";
  });
  const [showManualForm, setShowManualForm] = useState(false);
  const [manualStep, setManualStep] = useState<'email' | 'code'>('email');
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const handleStart = () => {
    if (termsAccepted) {
      localStorage.setItem("zn-terms-accepted", "true");
      navigate("/dashboard");
    }
  };

  const handleSend = async () => {
    if (!email.includes('@')) { setErr(t('pages.wellcome.errorCorreoInvalido') || 'Correo inválido'); return; }
    setErr(''); setMsg('');
    try {
      const result = await sendToken({ email }).unwrap();
      setManualStep('code');
      setMsg(result.devCode ? `📱 ${t('pages.wellcome.codigoDev', { code: result.devCode })}` : t('pages.wellcome.codigoEnviadoACorreo') || 'Código enviado a tu correo.');
    } catch (e: any) {
      setErr(e.data?.error || t('pages.wellcome.errorEnviarCodigo') || 'Error al enviar código');
    }
  };

  const handleVerify = async () => {
    if (code.length < 4) { setErr(t('pages.wellcome.errorCodigoInvalido') || 'Código inválido'); return; }
    setErr(''); setMsg(t('pages.wellcome.verificando') || 'Verificando...');
    try {
      const result = await verifyToken({ email, code }).unwrap();
      dispatch(setCredentials({
        user: { _id: result.userId, email: result.email, role: result.role, plan: result.plan },
        token: result.token,
      }));
      if (result.isNewUser) {
        showSuccess(t('pages.errors.actionSuccess', { action: t('pages.errors.actionRegister', 'Registro de cuenta') }), 4000);
      } else {
        showInfo(t('pages.errors.actionSuccess', { action: t('pages.errors.actionLogin', 'Inicio de sesión') }), 3000);
      }
    } catch (e: any) {
      setErr(e.data?.error || t('pages.wellcome.errorCodigoIncorrecto') || 'Código incorrecto');
      setMsg('');
    }
  };

  const handleBackToSocial = () => {
    setShowManualForm(false);
    setManualStep('email');
    setEmail('');
    setCode('');
    setMsg('');
    setErr('');
  };

  return (
    <>
      <WelcomeContainer>
        <WelcomeCard variant="elevated">
          <WelcomeHeader>
            <Logo src={`${process.env.PUBLIC_URL}/assets/images/logo.png`} alt={BRAND_CONFIG.siteName} />
            <Title>{BRAND_CONFIG.siteName}</Title>
            <Subtitle>{t("pages.brandSlogan.slogan") || "Comunicación en su punto máximo."}</Subtitle>
          </WelcomeHeader>

          <WelcomeCardBody>
            {/* Language Selection */}
            <LanguageSelectorWrapper>
              <LanguageSelectorLabel>
                <GlobalIcon icon={GlobalOutlined} />
                {t("pages.wellcome.tituloIdioma") || "Selecciona tu idioma"}
              </LanguageSelectorLabel>
              <LanguageSelector />
            </LanguageSelectorWrapper>

            {/* Terms Acceptance Checkbox */}
            <CheckboxContainer>
              <CheckboxInput
                type="checkbox"
                checked={termsAccepted}
                onChange={e => setTermsAccepted(e.target.checked)}
              />
              <CheckboxLabel>
                <span>{t("pages.wellcome.aceptoTerminos") || "Acepto los"}</span>{" "}
                <Link to="/legal/terms" target="_blank" rel="noopener noreferrer">
                  {t("pages.wellcome.bodyTerminos") || "términos y condiciones"}
                </Link>{" "}
                {t("pages.wellcome.conectorY") || "y la"}{" "}
                <Link to="/legal/privacy" target="_blank" rel="noopener noreferrer">
                  {t("pages.wellcome.bodyPrivacidad") || "política de privacidad"}
                </Link>
              </CheckboxLabel>
            </CheckboxContainer>

            <Divider />

            {/* Authentication Flow Area */}
            {loggedInUser ? (
              <StatusContainer>
                {termsAccepted ? (
                  <>
                    <StatusTitleWrapper>
                      <StatusIcon icon={CheckCircleOutlined} size={28} />
                      {t("pages.wellcome.successTitulo") || "¡Cuenta Conectada!"}
                    </StatusTitleWrapper>
                    <StatusDescription>
                      {t("pages.wellcome.successOnboardingDesc") ||
                        `Hola, tu cuenta está conectada y la extensão se ha sincronizado correctamente.`}
                    </StatusDescription>
                  </>
                ) : (
                  <PendingTermsDescription>
                    {t("pages.wellcome.pendienteTerminos") || "Por favor, acepta los términos y condiciones para comenzar y sincronizar tu cuenta."}
                  </PendingTermsDescription>
                )}
                <ActionButton 
                  variant="primary" 
                  onClick={handleStart} 
                  disabled={!termsAccepted}
                >
                  {t("pages.wellcome.comenzarBtn") || "Comenzar"} <StartIcon icon={RocketOutlined} />
                </ActionButton>
              </StatusContainer>
            ) : (
              <WelcomeCardBody>
                <AuthDescription>
                  {t("pages.wellcome.conectarDesc") ||
                    "Inicia sesión o regístrate para sincronizar tu extensión y activar tu plan en todos tus navegadores. Al aceptar los términos y condiciones e iniciar sesión con Google o de forma manual, se creará automáticamente tu cuenta en nuestra base de datos si aún no dispones de una."}
                </AuthDescription>

                <AuthButtonsWrapper $termsAccepted={termsAccepted}>
                  {!showManualForm ? (
                    <>
                      {G_ID && (
                        <GoogleButtonWrapper>
                          <GoogleSignInButton size="large" text="continue_with" width="280px" oneTap={false} />
                        </GoogleButtonWrapper>
                      )}

                      <ManualLoginTrigger onClick={() => setShowManualForm(true)}>
                        <KeyIcon icon={KeyOutlined} /> {t("pages.wellcome.ingresarManual") || "Ingresar de forma manual"}
                      </ManualLoginTrigger>
                    </>
                  ) : (
                    <FormContainer>
                      {sending || verifying ? (
                        <FormLoadingText>
                          {sending ? `📧 ${t('pages.wellcome.enviandoCodigo')}` : `🔐 ${t('pages.wellcome.verificando')}`}
                        </FormLoadingText>
                      ) : (
                        <>
                          {manualStep === 'email' ? (
                            <>
                              <FormInput
                                type="email"
                                placeholder="tu@correo.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                autoFocus
                              />
                              <FormButton onClick={handleSend}>
                                {t('pages.wellcome.recibirCodigoBtn') || "Recibir código de acceso"}
                              </FormButton>
                              <ToggleLink onClick={handleBackToSocial}>
                                {t('pages.wellcome.volverGoogle') || "← Volver a ingreso con Google"}
                              </ToggleLink>
                            </>
                          ) : (
                            <>
                              <FormInstructionText>
                                {t('pages.wellcome.codigoEnviadoA', { email }) || `Código enviado a ${email}`}
                              </FormInstructionText>
                              <FormInput
                                type="text"
                                placeholder={t('pages.wellcome.placeholderCodigo') || "Código de 6 dígitos"}
                                value={code}
                                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
                                maxLength={6}
                                autoFocus
                              />
                              <FormButton onClick={handleVerify}>
                                {t('pages.wellcome.ingresarBtn') || "Ingresar"}
                              </FormButton>
                              <ToggleLink
                                onClick={() => {
                                  setManualStep('email');
                                  setCode('');
                                  setMsg('');
                                  setErr('');
                                }}
                              >
                                {t('pages.wellcome.cambiarCorreo') || "← Cambiar correo"}
                              </ToggleLink>
                              <ToggleLink onClick={handleBackToSocial}>
                                {t('pages.wellcome.volverGoogle') || "← Volver a ingreso con Google"}
                              </ToggleLink>
                            </>
                          )}
                        </>
                      )}

                      {msg && <FormMessage>{msg}</FormMessage>}
                      {err && <FormMessage $error>{err}</FormMessage>}
                    </FormContainer>
                  )}
                </AuthButtonsWrapper>

                {!termsAccepted && (
                  <TermsWarningText>
                    {t('pages.wellcome.advertenciaTerminos') || "* Por favor, acepta los términos y condiciones para continuar."}
                  </TermsWarningText>
                )}
              </WelcomeCardBody>
            )}
          </WelcomeCardBody>
        </WelcomeCard>
      </WelcomeContainer>
    </>
  );
};

export default WelcomePage;
