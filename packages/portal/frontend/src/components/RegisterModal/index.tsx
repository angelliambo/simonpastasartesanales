import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useSendTokenMutation, useVerifyTokenMutation } from '../../services/api/authService';
import { setCredentials } from '../../store/slices/authSlice';
import { useSnackbar } from '../ui/atoms/Snackbar';
import { useTranslation } from '../../i18n/I18nProvider';
import GoogleSignInButton from '../GoogleSignInButton';
import {
  Overlay, Card, CloseBtn, Title, Subtitle,
  Input, Button, Message, Loading, LegalDisclaimer, GoogleButtonContainer,
  DisabledGoogleButton, ToggleEmailLink,
} from './RegisterModal.styles';

interface RegisterModalProps {
  onClose: () => void;
  initialStep?: 'email' | 'code';
}

const RegisterModal: React.FC<RegisterModalProps> = ({ onClose, initialStep = 'email' }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { showSuccess, showInfo } = useSnackbar();
  const [sendToken, { isLoading: sending }] = useSendTokenMutation();
  const [verifyToken, { isLoading: verifying }] = useVerifyTokenMutation();

  const [step, setStep] = useState<'email' | 'code'>(initialStep === 'code' ? 'code' : 'email');
  const [showEmailForm, setShowEmailForm] = useState(initialStep === 'code');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');
  const G_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const handleSend = useCallback(async () => {
    if (!email.includes('@')) { setErr('Correo inválido'); return; }
    setErr(''); setMsg('');
    try {
      const result = await sendToken({ email }).unwrap();
      setStep('code');
      setMsg(result.devCode ? `📱 Código (dev): ${result.devCode}` : 'Código enviado a tu correo.');
    } catch (e: any) {
      setErr(e.data?.error || 'Error al enviar código');
    }
  }, [email, sendToken]);

  const handleVerify = useCallback(async () => {
    if (code.length < 4) { setErr('Código inválido'); return; }
    setErr(''); setMsg('Verificando...');
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
      onClose();
    } catch (e: any) {
      setErr(e.data?.error || 'Código incorrecto');
      setMsg('');
    }
  }, [email, code, verifyToken, dispatch, showSuccess, showInfo, onClose]);

  const renderGoogleButton = () => {
    console.log("🚀 ~ renderGoogleButton ~ G_ID:", G_ID)
    if (G_ID) {
      return (
        <GoogleButtonContainer>
          <GoogleSignInButton oneTap={false} size="large" onSuccess={onClose} />
        </GoogleButtonContainer>
      );
    }
    return (
      <GoogleButtonContainer>
        <DisabledGoogleButton disabled title="Google client ID no configurado en frontend .env">
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.797 2.717v2.258h2.91c1.702-1.567 2.683-3.874 2.683-6.615z" fill="#4285F4" />
            <path d="M9 18c2.43 0 4.47-.806 5.96-2.184l-2.91-2.258c-.807.54-1.837.86-3.05.86-2.345 0-4.33-1.584-5.036-3.711H.957v2.332C2.438 15.938 5.484 18 9 18z" fill="#34A853" />
            <path d="M3.964 10.707A5.406 5.406 0 0 1 3.6 9c0-.593.1-1.17.278-1.707V4.96H.957A8.995 8.995 0 0 0 0 9c0 1.61.424 3.12 1.167 4.437l2.797-2.17z" fill="#FBBC05" />
            <path d="M9 3.58c1.32 0 2.5.454 3.435 1.345l2.58-2.58C13.464.891 11.42 0 9 0 5.484 0 2.438 2.062.957 4.96l2.82 2.19C4.482 4.983 6.467 3.58 9 3.58z" fill="#EA4335" />
          </svg>
          Iniciar sesión con Google (No configurado)
        </DisabledGoogleButton>
      </GoogleButtonContainer>
    );
  };

  return (
    <Overlay onClick={onClose}>
      <Card onClick={(e) => e.stopPropagation()}>
        <CloseBtn onClick={onClose}>✕</CloseBtn>
        <Title>Ingresar a ZenithNexus</Title>
        <Subtitle>
          {step === 'code'
            ? 'Ingresá el código que enviamos a tu correo.'
            : showEmailForm
              ? 'Ingresá tu correo para recibir un código de acceso de un solo uso.'
              : 'Iniciá sesión de forma segura y rápida con tu cuenta de Google.'}
        </Subtitle>

        {(sending || verifying) && (
          <Loading>
            {sending ? '📧 Enviando código...' : '🔐 Verificando...'}
          </Loading>
        )}

        {!sending && !verifying && (
          <>
            {step !== 'code' && !showEmailForm && (
              <>
                {renderGoogleButton()}
                <ToggleEmailLink onClick={() => setShowEmailForm(true)}>
                  O ingresar con correo electrónico
                </ToggleEmailLink>
              </>
            )}

            {step === 'email' && showEmailForm && (
              <>
                <Input
                  type="email"
                  placeholder="tu@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  autoFocus
                />
                <Button onClick={handleSend}>Recibir código de acceso</Button>
                <ToggleEmailLink onClick={() => setShowEmailForm(false)}>
                  ← Volver a ingreso con Google
                </ToggleEmailLink>
              </>
            )}

            {step === 'code' && (
              <>
                <Input
                  type="text"
                  placeholder="Código de 6 dígitos"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
                  maxLength={6}
                  autoFocus
                />
                <Button onClick={handleVerify}>Ingresar</Button>
                <ToggleEmailLink
                  onClick={() => {
                    setStep('email');
                    setCode('');
                    setMsg('');
                    setErr('');
                    setShowEmailForm(true);
                  }}
                >
                  ← Cambiar correo
                </ToggleEmailLink>
              </>
            )}

            <LegalDisclaimer>
              Al continuar, aceptas nuestros{' '}
              <a href="/legal/terms" target="_blank" rel="noopener noreferrer">Términos y Condiciones</a>{' '}
              y nuestra{' '}
              <a href="/legal/privacy" target="_blank" rel="noopener noreferrer">Política de Privacidad</a>.
            </LegalDisclaimer>
          </>
        )}

        {msg && <Message>{msg}</Message>}
        {err && <Message $error>{err}</Message>}
      </Card>
    </Overlay>
  );
};

export default RegisterModal;
