import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetProfileQuery, useRequestDeletionMutation, useDeleteAccountMutation } from "../../services/api/userService";
import { logout } from "../../store/slices/authSlice";

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
  SuccessMsgText,
  StatusTextWrapper,
  ActiveStatusIconWrapper,
  InactiveStatusIconWrapper,
  NoTicketsMessage,
  ActionLink,
  TicketsListWrapper,
  TicketListItem,
  TicketInfoWrapper,
  TicketHeaderWrapper,
  TicketIdText,
  NewResponseBadge,
  TicketSubjectText,
  TicketDateText,
  TicketStatusBadge,
  FooterAlignWrapper,
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
                <Value $isMonospace={true}>{profile._id}</Value>
              </Row>
              <Row>
                <Label>{t('pages.dashboard.emailLabel', 'Email')}</Label>
                <Value>{profile.email || (profile.emailHash ? `${profile.emailHash.slice(0, 16)}...` : '')}</Value>
              </Row>
              <Row>
                <Label>{t('pages.dashboard.planLabel', 'Plan')}</Label>
                <Value>
                  <CustomBadge $plan={profile.plan}>
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
                  <StatusTextWrapper>
                    {profile.isActive ? (
                      <>
                        <ActiveStatusIconWrapper>
                          <ZnIcon icon={CheckCircleOutlined} />
                        </ActiveStatusIconWrapper>
                        {t('pages.dashboard.statusActive', 'Activa')}
                      </>
                    ) : (
                      <>
                        <InactiveStatusIconWrapper>
                          <ZnIcon icon={CloseCircleOutlined} />
                        </InactiveStatusIconWrapper>
                        {t('pages.dashboard.statusInactive', 'Inactiva')}
                      </>
                    )}
                  </StatusTextWrapper>
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
                <NoTicketsMessage>
                  {t('pages.dashboard.noTickets', 'No tienes ningún ticket de soporte registrado.')}{' '}
                  <ActionLink onClick={() => navigate('/support')}>
                    {t('pages.dashboard.createTicketLink', 'Crear uno nuevo')}
                  </ActionLink>
                </NoTicketsMessage>
              ) : (
                <TicketsListWrapper>
                  {tickets.map((t: any) => (
                    <TicketListItem
                      key={t.ticketId}
                      onClick={() => navigate(`/support?ticketId=${t.ticketId}`)}
                    >
                      <TicketInfoWrapper>
                        <TicketHeaderWrapper>
                          <TicketIdText>{t.ticketId}</TicketIdText>
                          {!t.userRead && (
                            <NewResponseBadge>
                              NUEVA RESPUESTA <ZnIcon icon={MessageOutlined} />
                            </NewResponseBadge>
                          )}
                        </TicketHeaderWrapper>
                        <TicketSubjectText $unread={!t.userRead}>{t.subject}</TicketSubjectText>
                        <TicketDateText>
                          {new Date(t.createdAt).toLocaleDateString('es-MX', {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit"
                          })}
                        </TicketDateText>
                      </TicketInfoWrapper>

                      <TicketStatusBadge $status={t.status}>
                        {t.status === "open" ? "Abierto" : t.status === "in_progress" ? "En progreso" : "Cerrado"}
                      </TicketStatusBadge>
                    </TicketListItem>
                  ))}
                  <FooterAlignWrapper>
                    <ActionLink
                      onClick={() => navigate('/support')}
                      $fontSize="0.9rem"
                    >
                      {t('pages.dashboard.viewAllTicketsLink', 'Ver y gestionar todos los tickets →')}
                    </ActionLink>
                  </FooterAlignWrapper>
                </TicketsListWrapper>
              )}
            </CustomCard>

            <CustomCard>
              <RedCardTitle>{t('pages.dashboard.deleteAccountSection', 'Eliminar Cuenta')}</RedCardTitle>
              {deleteStep === 'idle' && (
                <>
                  <RedSubtitle>
                    {t('pages.dashboard.deleteAccountWarning', 'Esta acción eliminará tu cuenta y todos tus datos. No se puede deshacer.')}
                  </RedSubtitle>
                  <DangerRequestButton onClick={handleRequestDelete}>
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
                    $isSemiOpaque={deleteCode.length < 4}
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
