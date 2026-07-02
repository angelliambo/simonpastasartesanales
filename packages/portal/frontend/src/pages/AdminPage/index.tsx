import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { AnimatedBackground } from "../../components/AnimatedBackground";
import { useTranslation } from "../../i18n/I18nProvider";
import { setCredentials } from "../../store/slices/authSlice";
import { Input } from "../../components/ui/atoms/Input";
import { Select } from "../../components/ui/atoms/Select";
import { Switch } from "../../components/ui/atoms/Switch";
import Button from "../../components/ui/atoms/Button";
import { useSnackbar } from "../../components/ui/atoms/Snackbar";
import { ZnIcon } from "@design-sys/atoms/ZnIcon";
import {
  CopyOutlined,
  SaveOutlined,
  CloseOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  EditOutlined,
  KeyOutlined,
  DeleteOutlined,
  WarningOutlined,
  MailOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import {
  PageContainer,
  Content,
  Title,
  StyledSubtitle,
  CustomCard,
  LoadingText,
  StatsRow,
  StatBox,
  StatNumber,
  StatLabel,
  TableContainer,
  Table,
  Th,
  ThSortable,
  Td,
  DeleteBtn,
  CreateForm,
  CreateBtn,
  FilterBar,
  FilterBtn,
  PlanBadge,
  Pagination,
  PagInfo,
  PagTotal,
  MonospaceText,
  CopyButton,
  EmailContainer,
  Tr,
  TabContainer,
  Tab,
  ModalOverlay,
  ModalContent,
  ModalTitle,
  ModalFormGroup,
  ModalLabel,
  ModalTextarea,
  ModalActions
} from "./AdminPage.styles";

const AdminPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);
  const { showSuccess, showError } = useSnackbar();
  const [email, setEmail] = useState('');
  const [users, setUsers] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<{ plan: string; role: string; isActive: boolean }>({ plan: 'free', role: 'user', isActive: true });
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState<-1 | 1>(-1);
  const [filterPlan, setFilterPlan] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [page, setPage] = useState(1);
  const limit = 50;

  const [activeTab, setActiveTab] = useState<"users" | "tickets">("users");

  // Admin Tickets State
  const [adminTickets, setAdminTickets] = useState<any[]>([]);
  const [ticketsTotal, setTicketsTotal] = useState(0);
  const [ticketsTotalPages, setTicketsTotalPages] = useState(1);
  const [ticketsPage, setTicketsPage] = useState(1);
  const ticketsLimit = 50;
  const [ticketsLoading, setTicketsLoading] = useState(false);

  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<any | null>(null);
  const [selectedUserSummary, setSelectedUserSummary] = useState<any | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  const [adminReplyText, setAdminReplyText] = useState("");
  const [sendingAdminReply, setSendingAdminReply] = useState(false);

  const [ticketStatusFilter, setTicketStatusFilter] = useState("");
  const [ticketSearch, setTicketSearch] = useState("");
  const [ticketSearchInput, setTicketSearchInput] = useState("");
  const [ticketSortField, setTicketSortField] = useState("updatedAt");
  const [ticketSortOrder, setTicketSortOrder] = useState<"asc" | "desc">("desc");

  // On-behalf ticket creation states
  const [isCreateTicketModalOpen, setIsCreateTicketModalOpen] = useState(false);
  const [createTicketEmail, setCreateTicketEmail] = useState("");
  const [createTicketSubject, setCreateTicketSubject] = useState("");
  const [createTicketMessage, setCreateTicketMessage] = useState("");
  const [createTicketLoading, setCreateTicketLoading] = useState(false);

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleString("es-MX", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch {
      return dateStr;
    }
  };

  const getStatusLabel = (status: "open" | "in_progress" | "closed") => {
    if (status === "open") return "Abierto";
    if (status === "in_progress") return "En progreso";
    return "Cerrado";
  };

  const handleTicketSort = (field: string) => {
    if (ticketSortField === field) {
      setTicketSortOrder(o => o === "asc" ? "desc" : "asc");
    } else {
      setTicketSortField(field);
      setTicketSortOrder("desc");
    }
    setTicketsPage(1);
  };

  const fetchAdminTickets = async () => {
    if (!token) return;
    setTicketsLoading(true);
    try {
      const params = new URLSearchParams();
      if (ticketStatusFilter) params.set("status", ticketStatusFilter);
      if (ticketSearch.trim()) params.set("search", ticketSearch.trim());
      params.set("page", String(ticketsPage));
      params.set("limit", String(ticketsLimit));
      params.set("sortBy", ticketSortField);
      params.set("sortOrder", ticketSortOrder);

      const r = await fetch(`/api/admin/tickets?${params}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const d = await r.json();
      if (d.success) {
        setAdminTickets(d.tickets);
        setTicketsTotal(d.total);
        setTicketsTotalPages(d.totalPages);
      }
    } catch (err) {
      console.error("Error fetching tickets:", err);
    } finally {
      setTicketsLoading(false);
    }
  };

  const fetchAdminTicketDetail = async (ticketId: string) => {
    if (!token) return;
    setDetailLoading(true);
    try {
      const r = await fetch(`/api/admin/tickets/${ticketId}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const d = await r.json();
      if (d.success) {
        setSelectedTicket(d.ticket);
        setSelectedUserSummary(d.userSummary);
        fetchAdminTickets();
      }
    } catch (err) {
      console.error("Error fetching ticket detail:", err);
    } finally {
      setDetailLoading(false);
    }
  };

  const handleCreateTicketOnBehalf = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!createTicketEmail.trim() || !createTicketSubject.trim() || !createTicketMessage.trim()) {
      showError("Por favor completa todos los campos.");
      return;
    }
    setCreateTicketLoading(true);
    try {
      const r = await fetch("/api/admin/tickets/create-on-behalf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          email: createTicketEmail.trim(),
          subject: createTicketSubject.trim(),
          message: createTicketMessage.trim()
        })
      });
      const d = await r.json();
      if (d.success) {
        showSuccess(`Ticket ${d.ticket.ticketId} creado exitosamente.`);
        setIsCreateTicketModalOpen(false);
        setCreateTicketEmail("");
        setCreateTicketSubject("");
        setCreateTicketMessage("");
        fetchAdminTickets();
      } else {
        showError(d.error || "Ocurrió un error al crear el ticket.");
      }
    } catch (err: any) {
      showError(err.message || "Error de red.");
    } finally {
      setCreateTicketLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "tickets") {
      fetchAdminTickets();
    }
  }, [activeTab, ticketsPage, ticketStatusFilter, ticketSearch, ticketSortField, ticketSortOrder]);

  useEffect(() => {
    if (selectedTicketId) {
      fetchAdminTicketDetail(selectedTicketId);
    } else {
      setSelectedTicket(null);
      setSelectedUserSummary(null);
    }
  }, [selectedTicketId]);

  useEffect(() => {
    const t = setTimeout(() => { setTicketSearch(ticketSearchInput); setTicketsPage(1); }, 300);
    return () => clearTimeout(t);
  }, [ticketSearchInput]);

  const handleUpdateTicketStatus = async (ticketId: string, status: "open" | "in_progress" | "closed") => {
    if (!token) return;
    try {
      const r = await fetch(`/api/admin/tickets/${ticketId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      const d = await r.json();
      if (d.success) {
        showSuccess("Estado del ticket actualizado exitosamente");
        setSelectedTicket(prev => prev ? { ...prev, status: d.ticket.status } : null);
        setAdminTickets(prev => prev.map(tk => tk.ticketId === ticketId ? { ...tk, status: d.ticket.status } : tk));
      } else {
        showError(d.error || "Error al actualizar estado");
      }
    } catch (err: any) {
      showError(err.message || "Error al actualizar estado");
    }
  };

  const handleSendAdminReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminReplyText.trim() || !selectedTicketId || !token) return;
    setSendingAdminReply(true);
    try {
      const r = await fetch(`/api/admin/tickets/${selectedTicketId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ message: adminReplyText.trim() }),
      });
      const d = await r.json();
      if (d.success) {
        setAdminReplyText("");
        showSuccess("Respuesta enviada exitosamente");
        await fetchAdminTicketDetail(selectedTicketId);
        fetchAdminTickets();
      } else {
        showError(d.error || "Error al enviar respuesta");
      }
    } catch (err: any) {
      showError(err.message || "Error al enviar respuesta");
    } finally {
      setSendingAdminReply(false);
    }
  };

  const fetchUsers = () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search.length >= 3) params.set("search", search);
    params.set("sortField", sortField);
    params.set("sortOrder", String(sortOrder));
    if (filterPlan) params.set("plan", filterPlan);
    if (filterRole) params.set("role", filterRole);
    if (filterStatus) params.set("status", filterStatus);
    params.set("page", String(page));
    params.set("limit", String(limit));
    fetch(`/api/admin/users?${params}`, {
      headers: {
        ...(token ? { "Authorization": `Bearer ${token}` } : {})
      }
    })
      .then(r => r.json())
      .then(d => {
        if (d.success) {
          let sorted = d.users;
          if (search.length >= 3) {
            const lower = search.toLowerCase();
            sorted = [...d.users].filter((u: any) => {
              const id = u._id?.toLowerCase() || '';
              return id.includes(lower) || true;
            });
            sorted.sort((a: any, b: any) => {
              const aExact = a.email?.toLowerCase() === lower || a.plan === lower || a.role === lower ? 1 : 0;
              const bExact = b.email?.toLowerCase() === lower || b.plan === lower || b.role === lower ? 1 : 0;
              return bExact - aExact;
            });
          }
          setUsers(sorted);
          setTotal(d.total);
          setTotalPages(d.totalPages);
        }
      })
      .catch(() => { })
      .finally(() => setLoading(false));
  };

  const [searchInput, setSearchInput] = useState('');
  useEffect(() => {
    const t = setTimeout(() => { setSearch(searchInput); setPage(1); }, 300);
    return () => clearTimeout(t);
  }, [searchInput]);

  useEffect(() => { fetchUsers(); }, [search, sortField, sortOrder, page, filterPlan, filterRole, filterStatus]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    try {
      const r = await fetch("/api/admin/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ email: email.trim() }),
      });
      const d = await r.json();
      if (!d.success) throw new Error(d.error);
      showSuccess(t('pages.errors.actionSuccess', { action: `${t('pages.errors.actionCreateUser', 'Creación de usuario')}: ${email.trim()}` }));
      setEmail('');
      fetchUsers();
    } catch (err: any) {
      showError(`${t('pages.errors.actionError', { action: t('pages.errors.actionCreateUser', 'Creación de usuario') })}: ${err.message}`);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const r = await fetch(`/api/admin/users/${id}`, {
        method: "DELETE",
        headers: {
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        }
      });
      const d = await r.json();
      if (!d.success) throw new Error(d.error);
      showSuccess(t('pages.errors.actionSuccess', { action: t('pages.errors.actionDeleteUser', 'Eliminación de usuario') }));
      fetchUsers();
    } catch (err: any) {
      showError(`${t('pages.errors.actionError', { action: t('pages.errors.actionDeleteUser', 'Eliminación de usuario') })}: ${err.message}`);
    }
  };

  const startEdit = (u: any) => {
    setEditingId(u._id);
    setEditForm({ plan: u.plan, role: u.role, isActive: u.isActive !== false });
  };

  const saveEdit = async (id: string) => {
    try {
      const r = await fetch(`/api/admin/users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          ...editForm,
          isAdmin: editForm.role === 'admin'
        }),
      });
      const d = await r.json();
      if (!d.success) throw new Error(d.error);
      showSuccess(t('pages.errors.actionSuccess', { action: t('pages.errors.actionUpdateUser', 'Actualización de usuario') }));
      setEditingId(null);
      setUsers(prev => prev.map(u => u._id === id ? { ...u, ...editForm } : u));
    } catch (err: any) {
      showError(`${t('pages.errors.actionError', { action: t('pages.errors.actionUpdateUser', 'Actualización de usuario') })}: ${err.message}`);
    }
  };

  const cancelEdit = () => setEditingId(null);

  const handleLoginAs = async (id: string) => {
    try {
      const r = await fetch(`/api/admin/users/${id}/login-token`, {
        method: "POST",
        headers: {
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        }
      });
      const d = await r.json();
      if (!d.success) throw new Error(d.error);
      dispatch(setCredentials({
        user: { _id: d.userId, email: d.email, role: d.role, plan: d.plan, isAdmin: d.isAdmin },
        token: d.token,
      }));
      navigate("/dashboard");
    } catch (err: any) {
      showError(`${t('pages.errors.actionError', { action: t('pages.errors.actionLoginAs', 'Inicio de sesión suplantado') })}: ${err.message}`);
    }
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(prev => prev === 1 ? -1 : 1);
    } else {
      setSortField(field);
      setSortOrder(-1);
    }
    setPage(1);
  };

  return (
    <PageContainer>
      <AnimatedBackground />
      <Content>
        <Title>{t('pages.admin.title')}</Title>
        <StyledSubtitle>{t('pages.admin.subtitle')}</StyledSubtitle>
        <TabContainer>
          <Tab $active={activeTab === "users"} onClick={() => { setActiveTab("users"); setSelectedTicketId(null); }}>
            Usuarios
          </Tab>
          <Tab $active={activeTab === "tickets"} onClick={() => { setActiveTab("tickets"); setSelectedTicketId(null); }}>
            Tickets de Soporte
          </Tab>
        </TabContainer>

        {activeTab === "users" && (
          <>
            <CustomCard title={t('pages.admin.createUser')}>
              <CreateForm onSubmit={handleCreate}>
                <Input
                  placeholder={t('pages.admin.emailPlaceholder')}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <CreateBtn type="submit" variant="primary">{t('pages.admin.create')}</CreateBtn>
              </CreateForm>
            </CustomCard>

            {total > 0 && (
              <StatsRow>
                <StatBox><StatNumber>{total}</StatNumber><StatLabel>{t('pages.admin.statTotal')}</StatLabel></StatBox>
                <StatBox><StatNumber>{totalPages}</StatNumber><StatLabel>{t('pages.admin.statPages')}</StatLabel></StatBox>
                <StatBox><StatNumber>{users.filter(u => !u.deletedAt && u.isActive).length}</StatNumber><StatLabel>{t('pages.admin.statActive')}</StatLabel></StatBox>
                <StatBox><StatNumber>{users.filter(u => u.deletedAt).length}</StatNumber><StatLabel>{t('pages.admin.statDeleted')}</StatLabel></StatBox>
              </StatsRow>
            )}

            <CustomCard>
              <FilterBar>
                <div style={{ width: 250 }}>
                  <Input
                    type="text"
                    placeholder={t('pages.admin.searchPlaceholder')}
                    value={searchInput}
                    onChange={(e) => { setSearchInput(e.target.value); setPage(1); }}
                  />
                </div>
                <div style={{ width: 140 }}>
                  <Select
                    value={filterPlan}
                    onChange={(val) => { setFilterPlan(String(val)); setPage(1); }}
                    options={[
                      { value: "", label: t('pages.admin.filterAllPlans') },
                      { value: "free", label: "free" },
                      { value: "6_meses", label: "6_meses" },
                      { value: "1_ano", label: "1_ano" },
                      { value: "god_mode", label: "god_mode" }
                    ]}
                  />
                </div>
                <div style={{ width: 140 }}>
                  <Select
                    value={filterRole}
                    onChange={(val) => { setFilterRole(String(val)); setPage(1); }}
                    options={[
                      { value: "", label: t('pages.admin.filterAllRoles') },
                      { value: "user", label: "user" },
                      { value: "admin", label: "admin" }
                    ]}
                  />
                </div>
                <div style={{ width: 140 }}>
                  <Select
                    value={filterStatus}
                    onChange={(val) => { setFilterStatus(String(val)); setPage(1); }}
                    options={[
                      { value: "", label: t('pages.admin.filterAllStatuses') },
                      { value: "active", label: t('pages.admin.statusActive') },
                      { value: "inactive", label: t('pages.admin.statusInactive') },
                      { value: "deleted", label: t('pages.admin.statusDeleted') }
                    ]}
                  />
                </div>
              </FilterBar>

              {loading ? (
                <LoadingText>{t('pages.admin.loading')}</LoadingText>
              ) : users.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem 0', color: 'rgba(255,255,255,0.4)' }}>
                  {t('pages.admin.noResults', 'Sin resultados...')}
                </div>
              ) : (
                <TableContainer>
                  <Table>
                    <thead>
                      <tr>
                        <Th>{t('pages.admin.colId') || 'ID'}</Th>
                        <ThSortable onClick={() => handleSort('emailHash')}>{t('pages.admin.colEmail')} {sortField === 'emailHash' && (sortOrder === 1 ? '▲' : '▼')}</ThSortable>
                        <ThSortable onClick={() => handleSort('plan')}>{t('pages.admin.colPlan')} {sortField === 'plan' && (sortOrder === 1 ? '▲' : '▼')}</ThSortable>
                        <ThSortable onClick={() => handleSort('role')}>{t('pages.admin.colRole')} {sortField === 'role' && (sortOrder === 1 ? '▲' : '▼')}</ThSortable>
                        <Th>{t('pages.admin.colStatus')}</Th>
                        <ThSortable onClick={() => handleSort('createdAt')}>{t('pages.admin.colDate')} {sortField === 'createdAt' && (sortOrder === 1 ? '▲' : '▼')}</ThSortable>
                        <Th>{t('pages.admin.colActions')}</Th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((u) => (
                        <Tr key={u._id} style={u.deletedAt ? { opacity: 0.5 } : undefined}>
                          <Td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <MonospaceText style={{ fontSize: '0.75rem' }}>
                                {u._id ? `...${u._id.slice(-4)}` : "N/A"}
                              </MonospaceText>
                              {u._id && (
                                <CopyButton
                                  onClick={() => {
                                    navigator.clipboard.writeText(u._id);
                                    showSuccess(t('pages.errors.actionSuccess', { action: t('pages.admin.copyId', 'Copia de ID') }));
                                  }}
                                  title={t('pages.admin.copyId', 'Copiar ID')}
                                >
                                  <ZnIcon icon={CopyOutlined} />
                                </CopyButton>
                              )}
                            </div>
                          </Td>
                          <Td>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <EmailContainer
                                onClick={() => {
                                  navigator.clipboard.writeText(u.email || '');
                                  showSuccess(t('pages.errors.actionSuccess', { action: t('pages.errors.actionCopyEmail') }));
                                }}
                                title="Copiar email"
                              >
                                {u.email || `Hash: ${u.emailHash.slice(0, 10)}...`}
                              </EmailContainer>
                              <CopyButton
                                onClick={() => {
                                  navigator.clipboard.writeText(u.email || '');
                                  showSuccess(t('pages.errors.actionSuccess', { action: t('pages.errors.actionCopyEmail', 'Copia de dirección de correo') }));
                                }}
                                title="Copiar email"
                              >
                                <ZnIcon icon={CopyOutlined} />
                              </CopyButton>
                            </div>
                          </Td>
                          {editingId === u._id ? (
                            <>
                              <Td>
                                <Select
                                  value={editForm.plan}
                                  onChange={(val) => setEditForm(f => ({ ...f, plan: String(val) }))}
                                  options={[
                                    { value: "free", label: "free" },
                                    { value: "6_meses", label: "6_meses" },
                                    { value: "1_ano", label: "1_ano" },
                                    { value: "god_mode", label: "god_mode" }
                                  ]}
                                />
                              </Td>
                              <Td>
                                <Select
                                  value={editForm.role}
                                  onChange={(val) => setEditForm(f => ({ ...f, role: String(val) }))}
                                  options={[
                                    { value: "user", label: "user" },
                                    { value: "admin", label: "admin" }
                                  ]}
                                />
                              </Td>
                              <Td>
                                <Switch checked={editForm.isActive} onChange={(checked) => setEditForm(f => ({ ...f, isActive: checked }))} size="sm" />
                              </Td>
                              <Td>{new Date(u.createdAt).toLocaleDateString('es-MX')}</Td>
                              <Td>
                                <FilterBtn variant="primary" onClick={() => saveEdit(u._id)} style={{ marginRight: 4, padding: '4px 8px', fontSize: 14 }}>
                                  <ZnIcon icon={SaveOutlined} />
                                </FilterBtn>
                                <FilterBtn variant="secondary" onClick={cancelEdit} style={{ padding: '4px 8px', fontSize: 14 }}>
                                  <ZnIcon icon={CloseOutlined} />
                                </FilterBtn>
                              </Td>
                            </>
                          ) : (
                            <>
                              <Td><PlanBadge $plan={u.plan}>{u.plan}</PlanBadge></Td>
                              <Td>{u.role}</Td>
                              <Td>
                                {u.deletedAt ? (
                                  <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                                    <ZnIcon icon={CloseCircleOutlined} style={{ color: "#ef4444" }} /> Eliminado
                                  </span>
                                ) : u.isActive ? (
                                  <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                                    <ZnIcon icon={CheckCircleOutlined} style={{ color: "#22c55e" }} /> Activo
                                  </span>
                                ) : (
                                  <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                                    <ZnIcon icon={MinusCircleOutlined} style={{ color: "#9ca3af" }} /> Inactivo
                                  </span>
                                )}
                              </Td>
                              <Td>{new Date(u.createdAt).toLocaleDateString('es-MX')}</Td>
                              <Td>
                                <FilterBtn
                                  variant="secondary"
                                  onClick={() => {
                                    setCreateTicketEmail(u.email || "");
                                    setCreateTicketSubject("");
                                    setCreateTicketMessage("");
                                    setIsCreateTicketModalOpen(true);
                                  }}
                                  title="Crear Ticket a nombre de usuario"
                                  style={{ marginRight: 4, padding: '4px 8px', fontSize: 14 }}
                                >
                                  <span style={{ display: "inline-flex", alignItems: "center", gap: "2px" }}>
                                    <ZnIcon icon={MailOutlined} />+
                                  </span>
                                </FilterBtn>
                                <FilterBtn variant="primary" onClick={() => startEdit(u)} style={{ marginRight: 4, padding: '4px 8px', fontSize: 14 }}>
                                  <ZnIcon icon={EditOutlined} />
                                </FilterBtn>
                                <FilterBtn variant="warning" onClick={() => handleLoginAs(u._id)} style={{ marginRight: 4, padding: '4px 8px', fontSize: 14 }}>
                                  <ZnIcon icon={KeyOutlined} />
                                </FilterBtn>
                                <DeleteBtn variant="error" onClick={() => handleDelete(u._id)}>
                                  <ZnIcon icon={DeleteOutlined} />
                                </DeleteBtn>
                              </Td>
                            </>
                          )}
                        </Tr>
                      ))}
                    </tbody>
                  </Table>
                </TableContainer>
              )}

              {totalPages > 1 && (
                <Pagination>
                  <Button disabled={page <= 1} onClick={() => setPage(p => Math.max(1, p - 1))}>{t('pages.admin.pagPrev')}</Button>
                  <PagInfo>{t('pages.admin.pagPage')} {page} {t('pages.admin.pagOf')} {totalPages}</PagInfo>
                  <Button disabled={page >= totalPages} onClick={() => setPage(p => Math.min(totalPages, p + 1))}>{t('pages.admin.pagNext')}</Button>
                  <PagTotal>({total} {t('pages.admin.pagUsers')})</PagTotal>
                </Pagination>
              )}
            </CustomCard>
          </>
        )}

        {activeTab === "tickets" && (
          <div>
            {selectedTicketId ? (
              <CustomCard>
                <div style={{ marginBottom: "1.5rem", display: "flex", gap: "1rem", alignItems: "center" }}>
                  <Button variant="secondary" onClick={() => setSelectedTicketId(null)}>← Volver a lista</Button>
                  {detailLoading ? (
                    <span style={{ color: "rgba(255,255,255,0.4)" }}>Cargando conversación...</span>
                  ) : (
                    selectedTicket && (
                      <div style={{ display: "flex", flex: 1, justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <MonospaceText style={{ fontSize: "0.9rem", color: "#818cf8" }}>{selectedTicket.ticketId}</MonospaceText>
                          <h2 style={{ fontSize: "1.2rem", margin: 0 }}>{selectedTicket.subject}</h2>
                          <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)" }}>
                            De: {selectedTicket.name || "Sin nombre"} (
                            <span
                              style={{ textDecoration: "underline cursor", cursor: "pointer" }}
                              onClick={() => {
                                navigator.clipboard.writeText(selectedTicket.email);
                                showSuccess("Correo electrónico copiado");
                              }}
                            >
                              {selectedTicket.email}
                            </span>
                            )
                          </div>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.6)" }}>Estado:</span>
                          <Select
                            value={selectedTicket.status}
                            onChange={(val) => handleUpdateTicketStatus(selectedTicket.ticketId, val as any)}
                            options={[
                              { value: "open", label: "Abierto" },
                              { value: "in_progress", label: "En progreso" },
                              { value: "closed", label: "Cerrado" }
                            ]}
                          />
                        </div>
                      </div>
                    )
                  )}
                </div>

                {selectedTicket && (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "1.5rem" }}>
                    {/* Columna izquierda: Conversación */}
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <div style={{
                        display: "flex",
                        flexDirection: "column",
                        height: "450px",
                        background: "rgba(0, 0, 0, 0.2)",
                        border: "1px solid rgba(255,255,255,0.05)",
                        borderRadius: "12px",
                        overflow: "hidden",
                        marginBottom: "1rem"
                      }}>
                        <div style={{ flex: 1, padding: "1rem", overflowY: "auto", display: "flex", flexDirection: "column", gap: "1rem" }}>
                          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", width: "100%" }}>
                            <div style={{
                              maxWidth: "75%",
                              padding: "0.75rem 1rem",
                              borderRadius: "12px",
                              fontSize: "0.9rem",
                              lineHeight: "1.4",
                              background: "rgba(255,255,255,0.05)",
                              border: "1px solid rgba(255,255,255,0.1)",
                              color: "white",
                              whiteSpace: "pre-wrap"
                            }}>
                              {selectedTicket.message}
                            </div>
                            <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", marginTop: "0.25rem" }}>
                              {formatDate(selectedTicket.createdAt)} (Mensaje original)
                            </span>
                          </div>

                          {selectedTicket.comments?.map((c: any, idx: number) => {
                            const isAdmin = c.authorRole === "admin";
                            return (
                              <div key={idx} style={{ display: "flex", flexDirection: "column", alignItems: isAdmin ? "flex-end" : "flex-start", width: "100%" }}>
                                <div style={{
                                  maxWidth: "75%",
                                  padding: "0.75rem 1rem",
                                  borderRadius: "12px",
                                  fontSize: "0.9rem",
                                  lineHeight: "1.4",
                                  background: isAdmin ? "rgba(16, 185, 129, 0.1)" : "rgba(99, 102, 241, 0.15)",
                                  border: isAdmin ? "rgba(16, 185, 129, 0.2)" : "rgba(99, 102, 241, 0.25)",
                                  color: "white",
                                  whiteSpace: "pre-wrap"
                                }}>
                                  {c.message}
                                </div>
                                <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", marginTop: "0.25rem" }}>
                                  {isAdmin ? "Tú (Soporte)" : "Usuario"} — {formatDate(c.createdAt)}
                                </span>
                              </div>
                            );
                          })}
                        </div>

                        <form onSubmit={handleSendAdminReply} style={{ display: "flex", padding: "0.75rem", borderTop: "1px solid rgba(255,255,255,0.05)", gap: "0.5rem" }}>
                          <Input
                            value={adminReplyText}
                            onChange={(e) => setAdminReplyText(e.target.value)}
                            placeholder="Escribe tu respuesta de soporte aquí..."
                            disabled={sendingAdminReply || selectedTicket.status === "closed"}
                            style={{ flex: 1 }}
                          />
                          <Button type="submit" disabled={sendingAdminReply || !adminReplyText.trim() || selectedTicket.status === "closed"}>
                            {sendingAdminReply ? "Enviando..." : "Responder"}
                          </Button>
                        </form>
                      </div>
                    </div>

                    {/* Columna derecha: Resumen de Usuario */}
                    <div style={{
                      background: "rgba(255, 255, 255, 0.02)",
                      border: "1px solid rgba(255,255,255,0.05)",
                      borderRadius: "12px",
                      padding: "1rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                      height: "fit-content"
                    }}>
                      <h3 style={{ fontSize: "0.95rem", margin: 0, borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "0.5rem" }}>
                        Información del Cliente
                      </h3>

                      {selectedUserSummary ? (
                        <>
                          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.82rem" }}>
                            <div>
                              <span style={{ color: "rgba(255,255,255,0.4)" }}>Cuenta:</span>{" "}
                              {selectedUserSummary.hasAccount ? (
                                <span style={{ color: "#22c55e", fontWeight: "bold", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                                  Registrado <ZnIcon icon={CheckCircleOutlined} />
                                </span>
                              ) : (
                                <span style={{ color: "rgba(255,255,255,0.4)", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                                  No registrado <ZnIcon icon={WarningOutlined} style={{ color: "#eab308" }} />
                                </span>
                              )}
                            </div>
                            {selectedUserSummary.hasAccount && (
                              <>
                                <div style={{ wordBreak: "break-all" }}>
                                  <span style={{ color: "rgba(255,255,255,0.4)" }}>ID:</span>{" "}
                                  <span style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>{selectedUserSummary.userId}</span>
                                </div>
                                <div>
                                  <span style={{ color: "rgba(255,255,255,0.4)" }}>Rol:</span>{" "}
                                  <span style={{ textTransform: "capitalize" }}>{selectedUserSummary.role}</span>
                                </div>
                                <div>
                                  <span style={{ color: "rgba(255,255,255,0.4)" }}>Plan actual:</span>{" "}
                                  <PlanBadge $plan={selectedUserSummary.plan}>{selectedUserSummary.plan}</PlanBadge>
                                </div>
                                <div>
                                  <span style={{ color: "rgba(255,255,255,0.4)" }}>Estado:</span>{" "}
                                  {selectedUserSummary.isActive ? (
                                    <span style={{ color: "#22c55e" }}>Activa</span>
                                  ) : (
                                    <span style={{ color: "#ef4444" }}>Inactiva</span>
                                  )}
                                </div>
                                <div>
                                  <span style={{ color: "rgba(255,255,255,0.4)" }}>Email verif:</span>{" "}
                                  {selectedUserSummary.emailVerified ? (
                                    <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                                      Sí <ZnIcon icon={CheckCircleOutlined} style={{ color: "#22c55e" }} />
                                    </span>
                                  ) : (
                                    <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                                      No <ZnIcon icon={CloseCircleOutlined} style={{ color: "#ef4444" }} />
                                    </span>
                                  )}
                                </div>
                                <div>
                                  <span style={{ color: "rgba(255,255,255,0.4)" }}>Miembro desde:</span>{" "}
                                  <span>{new Date(selectedUserSummary.createdAt).toLocaleDateString("es-MX")}</span>
                                </div>
                              </>
                            )}
                          </div>

                          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "0.5rem" }}>
                            <h4 style={{ fontSize: "0.85rem", margin: "0 0 0.5rem 0", color: "rgba(255,255,255,0.6)" }}>
                              Historial de Licencias ({selectedUserSummary.licenses?.length || 0})
                            </h4>
                            {selectedUserSummary.licenses && selectedUserSummary.licenses.length > 0 ? (
                              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", maxHeight: "180px", overflowY: "auto" }}>
                                {selectedUserSummary.licenses.map((lic: any, idx: number) => (
                                  <div key={idx} style={{
                                    background: "rgba(255,255,255,0.02)",
                                    border: "1px solid rgba(255,255,255,0.05)",
                                    borderRadius: "8px",
                                    padding: "0.5rem",
                                    fontSize: "0.75rem"
                                  }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem" }}>
                                      <span style={{ fontWeight: "bold", color: "#818cf8" }}>{lic.plan}</span>
                                      <span style={{
                                        color: lic.status === "active" ? "#22c55e" : lic.status === "expired" ? "#ef4444" : "rgba(255,255,255,0.4)",
                                        textTransform: "capitalize"
                                      }}>{lic.status}</span>
                                    </div>
                                    <div style={{ color: "rgba(255,255,255,0.4)" }}>
                                      Pedido: #{lic.lemonOrderId}
                                    </div>
                                    {lic.expiresAt && (
                                      <div style={{ color: "rgba(255,255,255,0.4)" }}>
                                        Expira: {new Date(lic.expiresAt).toLocaleDateString("es-MX")}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)" }}>
                                Sin licencias asociadas.
                              </div>
                            )}
                          </div>
                        </>
                      ) : (
                        <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)" }}>
                          No hay cuenta asociada a este correo.
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CustomCard>
            ) : (
              <CustomCard>
                <div style={{ marginBottom: "1.5rem" }}>
                  <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>Búsqueda y Gestión de Tickets</h3>
                  <FilterBar>
                    <div style={{ width: 250 }}>
                      <Input
                        type="text"
                        placeholder="Buscar por ID, Email o Asunto..."
                        value={ticketSearchInput}
                        onChange={(e) => setTicketSearchInput(e.target.value)}
                      />
                    </div>
                    <div style={{ width: 160 }}>
                      <Select
                        value={ticketStatusFilter}
                        onChange={(val) => { setTicketStatusFilter(String(val)); setPage(1); }}
                        options={[
                          { value: "", label: "Todos los estados" },
                          { value: "open", label: "Abierto" },
                          { value: "in_progress", label: "En progreso" },
                          { value: "closed", label: "Cerrado" }
                        ]}
                      />
                    </div>
                    <FilterBtn
                      variant="primary"
                      onClick={() => {
                        setCreateTicketEmail("");
                        setCreateTicketSubject("");
                        setCreateTicketMessage("");
                        setIsCreateTicketModalOpen(true);
                      }}
                      style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: "6px" }}
                    >
                      Registrar Ticket <ZnIcon icon={PlusOutlined} />
                    </FilterBtn>
                  </FilterBar>
                </div>

                {ticketsLoading ? (
                  <LoadingText>Cargando tickets de soporte...</LoadingText>
                ) : adminTickets.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "2rem 0", color: "rgba(255,255,255,0.4)" }}>
                    No se encontraron tickets con los filtros actuales.
                  </div>
                ) : (
                  <TableContainer>
                    <Table>
                      <thead>
                        <tr>
                          <ThSortable onClick={() => handleTicketSort('ticketId')}>
                            ID Ticket {ticketSortField === 'ticketId' && (ticketSortOrder === 'asc' ? '▲' : '▼')}
                          </ThSortable>
                          <ThSortable onClick={() => handleTicketSort('subject')}>
                            Asunto {ticketSortField === 'subject' && (ticketSortOrder === 'asc' ? '▲' : '▼')}
                          </ThSortable>
                          <ThSortable onClick={() => handleTicketSort('email')}>
                            Usuario {ticketSortField === 'email' && (ticketSortOrder === 'asc' ? '▲' : '▼')}
                          </ThSortable>
                          <Th>ID Usuario</Th>
                          <ThSortable onClick={() => handleTicketSort('status')}>
                            Estado {ticketSortField === 'status' && (ticketSortOrder === 'asc' ? '▲' : '▼')}
                          </ThSortable>
                          <ThSortable onClick={() => handleTicketSort('updatedAt')}>
                            Última Actividad {ticketSortField === 'updatedAt' && (ticketSortOrder === 'asc' ? '▲' : '▼')}
                          </ThSortable>
                          <Th>Acciones</Th>
                        </tr>
                      </thead>
                      <tbody>
                        {adminTickets.map((ticket) => (
                           <Tr key={ticket.ticketId} style={{ background: !ticket.adminRead ? "rgba(239, 68, 68, 0.03)" : undefined }}>
                             <Td style={{ fontFamily: "monospace", color: "#818cf8" }}>
                               <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                 {ticket.ticketId}
                                 {!ticket.adminRead && (
                                   <span style={{
                                     background: "#ef4444",
                                     color: "white",
                                     fontSize: "0.65rem",
                                     fontWeight: "bold",
                                     padding: "2px 6px",
                                     borderRadius: "4px",
                                     display: "inline-flex",
                                     alignItems: "center",
                                     gap: "2px"
                                   }}>
                                     NUEVO <ZnIcon icon={MailOutlined} />
                                   </span>
                                 )}
                                </div>
                             </Td>
                             <Td style={{ fontWeight: !ticket.adminRead ? 700 : 600 }}>{ticket.subject}</Td>
                             <Td>
                               {ticket.name || "N/A"}
                               <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "2px" }}>
                                 <EmailContainer
                                   onClick={() => {
                                     navigator.clipboard.writeText(ticket.email || '');
                                     showSuccess(t('pages.errors.actionSuccess', { action: t('pages.errors.actionCopyEmail') }));
                                   }}
                                   title="Copiar email"
                                   style={{ fontSize: "0.75rem" }}
                                 >
                                   {ticket.email}
                                 </EmailContainer>
                                 <CopyButton
                                   onClick={() => {
                                     navigator.clipboard.writeText(ticket.email || '');
                                     showSuccess(t('pages.errors.actionSuccess', { action: t('pages.errors.actionCopyEmail', 'Copia de dirección de correo') }));
                                   }}
                                   title="Copiar email"
                                 >
                                   <ZnIcon icon={CopyOutlined} />
                                 </CopyButton>
                               </div>
                             </Td>
                             <Td>
                               <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                                 <MonospaceText style={{ fontSize: "0.75rem" }}>
                                   {ticket.userId ? `...${ticket.userId.slice(-4)}` : "N/A"}
                                 </MonospaceText>
                                 {ticket.userId && (
                                   <CopyButton
                                     onClick={() => {
                                       navigator.clipboard.writeText(ticket.userId);
                                       showSuccess(t('pages.errors.actionSuccess', { action: t('pages.admin.copyId', 'Copia de ID') }));
                                     }}
                                     title={t('pages.admin.copyId', 'Copiar ID')}
                                   >
                                     <ZnIcon icon={CopyOutlined} />
                                   </CopyButton>
                                 )}
                               </div>
                             </Td>
                            <Td>
                              <span style={{
                                fontSize: "0.75rem",
                                fontWeight: "bold",
                                padding: "0.25rem 0.6rem",
                                borderRadius: "9999px",
                                background: ticket.status === "open" ? "rgba(59, 130, 246, 0.15)" : ticket.status === "in_progress" ? "rgba(245, 158, 11, 0.15)" : "rgba(107, 114, 128, 0.15)",
                                color: ticket.status === "open" ? "#60a5fa" : ticket.status === "in_progress" ? "#fbbf24" : "#9ca3af",
                                border: `1px solid ${ticket.status === "open" ? "rgba(59, 130, 246, 0.25)" : ticket.status === "in_progress" ? "rgba(245, 158, 11, 0.25)" : "rgba(107, 114, 128, 0.25)"}`
                              }}>
                                {getStatusLabel(ticket.status)}
                              </span>
                            </Td>
                            <Td>{formatDate(ticket.updatedAt || ticket.createdAt)}</Td>
                            <Td>
                              <Button variant="primary" style={{ padding: "4px 8px", fontSize: 13, display: "inline-flex", alignItems: "center", gap: "4px" }} onClick={() => setSelectedTicketId(ticket.ticketId)}>
                                Atender <ZnIcon icon={MessageOutlined} />
                              </Button>
                            </Td>
                          </Tr>
                        ))}
                      </tbody>
                    </Table>
                  </TableContainer>
                )}

                {ticketsTotalPages > 1 && (
                  <Pagination>
                    <Button disabled={ticketsPage <= 1} onClick={() => setTicketsPage(p => Math.max(1, p - 1))}>Anterior</Button>
                    <PagInfo>Página {ticketsPage} de {ticketsTotalPages}</PagInfo>
                    <Button disabled={ticketsPage >= ticketsTotalPages} onClick={() => setTicketsPage(p => Math.min(ticketsTotalPages, p + 1))}>Siguiente</Button>
                    <PagTotal>({ticketsTotal} tickets)</PagTotal>
                  </Pagination>
                )}
              </CustomCard>
            )}
          </div>
        )}
      </Content>
      {isCreateTicketModalOpen && (
        <ModalOverlay onClick={() => setIsCreateTicketModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalTitle>Crear Ticket a Nombre de Usuario</ModalTitle>
            <form onSubmit={handleCreateTicketOnBehalf}>
              <ModalFormGroup>
                <ModalLabel>Email del Usuario</ModalLabel>
                <Input
                  type="email"
                  placeholder="usuario@dominio.com"
                  required
                  value={createTicketEmail}
                  onChange={(e) => setCreateTicketEmail(e.target.value)}
                />
              </ModalFormGroup>

              <ModalFormGroup>
                <ModalLabel>Asunto</ModalLabel>
                <Input
                  type="text"
                  placeholder="Asunto del problema..."
                  required
                  value={createTicketSubject}
                  onChange={(e) => setCreateTicketSubject(e.target.value)}
                />
              </ModalFormGroup>

              <ModalFormGroup>
                <ModalLabel>Descripción / Mensaje Inicial</ModalLabel>
                <ModalTextarea
                  placeholder="Escribe el mensaje o problema aquí..."
                  required
                  value={createTicketMessage}
                  onChange={(e) => setCreateTicketMessage(e.target.value)}
                />
              </ModalFormGroup>

              <ModalActions>
                <Button
                  variant="secondary"
                  type="button"
                  onClick={() => setIsCreateTicketModalOpen(false)}
                  disabled={createTicketLoading}
                >
                  Cancelar
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={createTicketLoading}
                >
                  {createTicketLoading ? "Creando..." : "Crear Ticket"}
                </Button>
              </ModalActions>
            </form>
          </ModalContent>
        </ModalOverlay>
      )}
    </PageContainer>
  );
};

export default AdminPage;
