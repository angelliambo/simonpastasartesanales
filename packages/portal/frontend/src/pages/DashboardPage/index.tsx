import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetProfileQuery, useRequestDeletionMutation, useDeleteAccountMutation } from "../../services/api/userService";
import { logout } from "../../store/slices/authSlice";

import { AnimatedBackground } from "../../components/AnimatedBackground";
import { useTranslation } from "../../i18n/I18nProvider";
import { useSnackbar } from "../../components/ui/atoms/Snackbar";
import { ZnIcon } from "@design-sys/atoms/ZnIcon";
import {
  ThunderboltOutlined,
  HourglassOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  MessageOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import type { RootState } from "../../store/store";
import {
  PageContainer,
  Content,
  Title,
  StyledSubtitle,
  CustomCard,
  Row,
  Label,
  Value,
  CustomBadge,
  LoadingText,
  ErrorText,
  ActionButton,
  UpgradeButtonWrapper,
  RedCardTitle,
  RedSubtitle,
  DangerRequestButton,
  DeleteMsgText,
  DeleteConfirmInput,
  DeleteErrorText,
  SuccessMsgText
} from "./DashboardPage.styles";

const DashboardPage: React.FC = () => {
  const { t } = useTranslation();
  const authUser = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showSuccess, showError } = useSnackbar();
  const [deleteStep, setDeleteStep] = useState<'idle' | 'code' | 'done'>('idle');
  const [deleteCode, setDeleteCode] = useState('');
  const [deleteMsg, setDeleteMsg] = useState('');
  const [deleteErr, setDeleteErr] = useState('');
  const [requestDeletion] = useRequestDeletionMutation();
  const [confirmDeletion] = useDeleteAccountMutation();
  const { data, isLoading, error } = useGetProfileQuery(undefined, {
    skip: !token || !authUser?._id,
    refetchOnMountOrArgChange: true,
  });

  const profile = data?.profile;

  const [tickets, setTickets] = useState<any[]>([]);
  const [loadingTickets, setLoadingTickets] = useState(false);

  React.useEffect(() => {
    if (authUser?._id && token) {
      setLoadingTickets(true);
      fetch(`/api/support/tickets/${authUser._id}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(d => {
          if (d.success) {
            setTickets(d.tickets.slice(0, 5));
          }
        })
        .catch(err => console.error("Error loading tickets for dashboard:", err))
        .finally(() => setLoadingTickets(false));
    }
  }, [authUser, token]);

  const getPlanName = (plan?: string) => {
    if (plan === "god_mode") return "God Mode";
    if (plan === "trial") return "Prueba";
    return plan || "Free";
  };

  const getRemainingDays = (expiresAtStr?: string | null) => {
    if (!expiresAtStr) return null;
    const diff = new Date(expiresAtStr).getTime() - Date.now();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };

  const remainingDays = profile ? getRemainingDays((profile as any).expiresAt) : null;

  const handleRequestDelete = async () => {
    if (!authUser?.email) return;
    setDeleteErr('');
    try {
      const r = await requestDeletion({ email: authUser.email }).unwrap() as any;
      if (r.devCode) {
        setDeleteMsg(`📱 Código (dev): ${r.devCode}`);
        const actionName = `${t('pages.errors.actionRequestDeletion', 'Solicitud de código de eliminación')} (dev: ${r.devCode})`;
        showSuccess(t('pages.errors.actionSuccess', { action: actionName }));
      } else {
        const msg = t('pages.dashboard.codeSentMsg', 'Código enviado a tu correo.');
        setDeleteMsg(msg);
        showSuccess(t('pages.errors.actionSuccess', { action: t('pages.errors.actionRequestDeletion', 'Solicitud de código de eliminación') }));
      }
      setDeleteStep('code');
    } catch (err: any) {
      const errMsg = err.data?.error || t('pages.errors.actionError', { action: t('pages.errors.actionRequestDeletion', 'Solicitud de código de eliminación') });
      setDeleteErr(errMsg);
      showError(errMsg);
    }
  };

  const handleConfirmDelete = async () => {
    if (!authUser?.email || deleteCode.length < 4) return;
    setDeleteErr('');
    try {
      await confirmDeletion({ email: authUser.email, code: deleteCode }).unwrap();
      const msg = t('pages.dashboard.deleteSuccessMsg', 'Cuenta eliminada. Redirigiendo...');
      setDeleteMsg(msg);
      showSuccess(t('pages.errors.actionSuccess', { action: t('pages.errors.actionDeleteAccount', 'Eliminación definitiva de cuenta') }));
      setDeleteStep('done');
      setTimeout(() => { dispatch(logout()); navigate('/'); }, 2000);
    } catch (err: any) {
      const errMsg = err.data?.error || t('pages.errors.actionError', { action: t('pages.errors.actionDeleteAccount', 'Eliminación definitiva de cuenta') });
      setDeleteErr(errMsg);
      showError(errMsg);
    }
  };

  return (
    <PageContainer>
      <AnimatedBackground />
      <Content>
        <Title>{t('pages.dashboard.title', 'Dashboard')}</Title>
        <StyledSubtitle>{t('pages.dashboard.subtitle', 'Resumen de tu cuenta')}</StyledSubtitle>

        {isLoading && <LoadingText>{t('pages.dashboard.loading', 'Cargando perfil...')}</LoadingText>}
        {error && <ErrorText>{t('pages.dashboard.error', 'Error al cargar el perfil')}</ErrorText>}

        {profile && (
          <>
            <CustomCard title={t('pages.dashboard.accountInfo', 'Información de la Cuenta')}>
              <Row>
                <Label>{t('pages.dashboard.userIdLabel', 'Usuario N°')}</Label>
                <Value style={{ fontFamily: "monospace" }}>{profile._id}</Value>
              </Row>
              <Row>
                <Label>{t('pages.dashboard.emailLabel', 'Email')}</Label>
                <Value>{profile.email || (profile.emailHash ? `${profile.emailHash.slice(0, 16)}...` : '')}</Value>
              </Row>
              <Row>
                <Label>{t('pages.dashboard.planLabel', 'Plan')}</Label>
                <Value>
                  <CustomBadge $plan={profile.plan} style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                    {profile.plan === "god_mode" && <ZnIcon icon={ThunderboltOutlined} />}
                    {profile.plan === "trial" && <ZnIcon icon={HourglassOutlined} />}
                    {getPlanName(profile.plan)}
                  </CustomBadge>
                </Value>
              </Row>
              <Row>
                <Label>{t('pages.dashboard.roleLabel', 'Rol')}</Label>
                <Value>{profile.role}</Value>
              </Row>
              <Row>
                <Label>{t('pages.dashboard.memberSince', 'Miembro desde')}</Label>
                <Value>{new Date(profile.createdAt).toLocaleDateString('es-MX')}</Value>
              </Row>
              {profile.lastLogin && (
                <Row>
                  <Label>{t('pages.dashboard.lastAccess', 'Último acceso')}</Label>
                  <Value>{new Date(profile.lastLogin).toLocaleDateString('es-MX')}</Value>
                </Row>
              )}
            </CustomCard>

            <CustomCard title={t('pages.dashboard.licenseSection', 'Licencia')}>
              <Row>
                <Label>{t('pages.dashboard.statusLabel', 'Estado')}</Label>
                <Value>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                    {profile.isActive ? (
                      <>
                        <ZnIcon icon={CheckCircleOutlined} style={{ color: "#22c55e" }} />
                        {t('pages.dashboard.statusActive', 'Activa')}
                      </>
                    ) : (
                      <>
                        <ZnIcon icon={CloseCircleOutlined} style={{ color: "#ef4444" }} />
                        {t('pages.dashboard.statusInactive', 'Inactiva')}
                      </>
                    )}
                  </span>
                </Value>
              </Row>
              {(profile as any).expiresAt && (
                <Row>
                  <Label>{t('pages.dashboard.expiresLabel', 'Expira')}</Label>
                  <Value>{new Date((profile as any).expiresAt).toLocaleDateString('es-MX')}</Value>
                </Row>
              )}
              {remainingDays !== null && (
                <Row>
                  <Label>{t('pages.dashboard.daysRemaining', 'Días restantes')}</Label>
                  <Value>
                    {remainingDays > 0
                      ? t('pages.dashboard.daysRemainingText', '{{days}} días', { days: String(remainingDays) })
                      : t('pages.dashboard.expired', 'Vencida')}
                  </Value>
                </Row>
              )}
              {(profile.plan === 'free' || profile.plan === 'trial') && (
                <UpgradeButtonWrapper>
                  <ActionButton onClick={() => navigate('/pricing')}>{t('pages.dashboard.buyPremium', 'Adquirir Premium')}</ActionButton>
                </UpgradeButtonWrapper>
              )}
            </CustomCard>

            <CustomCard title={t('pages.dashboard.supportTicketsTitle', 'Tickets de Soporte Recientes')}>
              {loadingTickets ? (
                <LoadingText>{t('pages.dashboard.loadingTickets', 'Cargando tickets...')}</LoadingText>
              ) : tickets.length === 0 ? (
                <div style={{ color: "rgba(255,255,255,0.4)", padding: "1rem 0" }}>
                  {t('pages.dashboard.noTickets', 'No tienes ningún ticket de soporte registrado.')}{' '}
                  <span
                    onClick={() => navigate('/support')}
                    style={{ color: "#818cf8", cursor: "pointer", textDecoration: "underline" }}
                  >
                    {t('pages.dashboard.createTicketLink', 'Crear uno nuevo')}
                  </span>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "0.5rem" }}>
                  {tickets.map((t: any) => (
                    <div
                      key={t.ticketId}
                      onClick={() => navigate(`/support?ticketId=${t.ticketId}`)}
                      style={{
                        background: "rgba(255, 255, 255, 0.03)",
                        border: "1px solid rgba(255, 255, 255, 0.05)",
                        borderRadius: "8px",
                        padding: "1rem",
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(255, 255, 255, 0.06)";
                        e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
                        e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.05)";
                      }}
                    >
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <span style={{ fontFamily: "monospace", fontSize: "0.9rem", color: "#818cf8" }}>{t.ticketId}</span>
                          {!t.userRead && (
                            <span style={{
                              background: "#10b981",
                              color: "white",
                              fontSize: "0.65rem",
                              fontWeight: "bold",
                              padding: "2px 6px",
                              borderRadius: "4px",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "4px"
                            }}>
                              NUEVA RESPUESTA <ZnIcon icon={MessageOutlined} />
                            </span>
                          )}
                        </div>
                        <span style={{ fontWeight: !t.userRead ? 700 : 500, fontSize: "0.95rem" }}>{t.subject}</span>
                        <span style={{ fontSize: "0.8rem", color: "rgba(255, 255, 255, 0.4)" }}>
                          {new Date(t.createdAt).toLocaleDateString('es-MX', {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit"
                          })}
                        </span>
                      </div>

                      <span style={{
                        fontSize: "0.75rem",
                        fontWeight: "bold",
                        padding: "0.25rem 0.6rem",
                        borderRadius: "9999px",
                        background: t.status === "open" ? "rgba(59, 130, 246, 0.15)" : t.status === "in_progress" ? "rgba(245, 158, 11, 0.15)" : "rgba(107, 114, 128, 0.15)",
                        color: t.status === "open" ? "#60a5fa" : t.status === "in_progress" ? "#fbbf24" : "#9ca3af",
                        border: `1px solid ${t.status === "open" ? "rgba(59, 130, 246, 0.25)" : t.status === "in_progress" ? "rgba(245, 158, 11, 0.25)" : "rgba(107, 114, 128, 0.25)"}`
                      }}>
                        {t.status === "open" ? "Abierto" : t.status === "in_progress" ? "En progreso" : "Cerrado"}
                      </span>
                    </div>
                  ))}
                  <div style={{ textAlign: "right", marginTop: "0.5rem" }}>
                    <span
                      onClick={() => navigate('/support')}
                      style={{ color: "#818cf8", cursor: "pointer", textDecoration: "underline", fontSize: "0.9rem" }}
                    >
                      {t('pages.dashboard.viewAllTicketsLink', 'Ver y gestionar todos los tickets →')}
                    </span>
                  </div>
                </div>
              )}
            </CustomCard>

            <CustomCard>
              <RedCardTitle>{t('pages.dashboard.deleteAccountSection', 'Eliminar Cuenta')}</RedCardTitle>
              {deleteStep === 'idle' && (
                <>
                  <RedSubtitle>
                    {t('pages.dashboard.deleteAccountWarning', 'Esta acción eliminará tu cuenta y todos tus datos. No se puede deshacer.')}
                  </RedSubtitle>
                  <DangerRequestButton onClick={handleRequestDelete} style={{ display: "inline-flex", alignItems: "center", gap: "6px", justifyContent: "center" }}>
                    <ZnIcon icon={DeleteOutlined} /> {t('pages.dashboard.requestDeleteButton', 'Solicitar eliminación')}
                  </DangerRequestButton>
                </>
              )}
              {deleteStep === 'code' && (
                <>
                  <DeleteMsgText>{deleteMsg}</DeleteMsgText>
                  <DeleteConfirmInput
                    type="text"
                    placeholder={t('pages.dashboard.digitCodePlaceholder', 'Código de 6 dígitos')}
                    value={deleteCode}
                    onChange={(e) => setDeleteCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    maxLength={6}
                  />
                  {deleteErr && <DeleteErrorText>{deleteErr}</DeleteErrorText>}
                  <DangerRequestButton
                    onClick={handleConfirmDelete}
                    disabled={deleteCode.length < 4}
                    style={{ opacity: deleteCode.length < 4 ? 0.5 : 1 }}
                  >
                    {t('pages.dashboard.confirmDeleteButton', 'Confirmar eliminación')}
                  </DangerRequestButton>
                </>
              )}
              {deleteStep === 'done' && (
                <SuccessMsgText>{deleteMsg}</SuccessMsgText>
              )}
            </CustomCard>
          </>
        )}

        {!profile && !isLoading && !error && (
          <CustomCard title={t('pages.dashboard.wellcomeCardTitle', 'Bienvenido')}>
            <StyledSubtitle>{t('pages.dashboard.wellcomeCardSubtitle', 'Iniciá sesión para ver tu dashboard.')}</StyledSubtitle>
          </CustomCard>
        )}
      </Content>
    </PageContainer>
  );
};

export default DashboardPage;
