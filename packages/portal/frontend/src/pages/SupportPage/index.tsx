import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import type { RootState } from "../../store/store";
import { ContactForm } from "../../components/ContactForm";
import { AnimatedBackground } from "../../components/AnimatedBackground";
import { Input } from "../../components/ui/atoms/Input";
import Button from "../../components/ui/atoms/Button";
import { useSnackbar } from "../../components/ui/atoms/Snackbar";
import {
  PageContainer,
  Content,
  Title,
  Subtitle,
  CustomCard,
  TabContainer,
  Tab,
  TicketList,
  TicketCard,
  TicketHeader,
  TicketId,
  TicketSubject,
  TicketDate,
  TicketStatus,
  ChatContainer,
  ChatMessages,
  MessageWrapper,
  MessageBubble,
  MessageMeta,
  ChatInputArea,
  BackBtn
} from "./SupportPage.styles";

const SupportPage: React.FC = () => {
  const { showError } = useSnackbar();
  const authUser = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);

  const [searchParams, setSearchParams] = useSearchParams();
  const queryTicketId = searchParams.get("ticketId");

  const [activeTab, setActiveTab] = useState<"new_ticket" | "my_tickets">(queryTicketId ? "my_tickets" : "new_ticket");
  const [tickets, setTickets] = useState<any[]>([]);
  const [loadingTickets, setLoadingTickets] = useState(false);

  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(queryTicketId);
  const [selectedTicket, setSelectedTicket] = useState<any | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  useEffect(() => {
    if (queryTicketId) {
      setSelectedTicketId(queryTicketId);
      setActiveTab("my_tickets");
    }
  }, [queryTicketId]);

  const handleBack = () => {
    setSelectedTicketId(null);
    setSearchParams({});
  };

  const [replyText, setReplyText] = useState("");
  const [sendingReply, setSendingReply] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const fetchTickets = async () => {
    if (!authUser || !token) return;
    setLoadingTickets(true);
    try {
      const r = await fetch(`/api/support/tickets/${authUser._id}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const d = await r.json();
      if (d.success) {
        setTickets(d.tickets);
      }
    } catch (err) {
      console.error("Error fetching tickets:", err);
    } finally {
      setLoadingTickets(false);
    }
  };

  const fetchTicketDetail = async (ticketId: string) => {
    if (!token) return;
    setLoadingDetail(true);
    try {
      const r = await fetch(`/api/support/tickets/detail/${ticketId}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const d = await r.json();
      if (d.success) {
        setSelectedTicket(d.ticket);
        fetchTickets();
      }
    } catch (err) {
      console.error("Error fetching ticket detail:", err);
    } finally {
      setLoadingDetail(false);
    }
  };

  useEffect(() => {
    if (activeTab === "my_tickets" && authUser) {
      fetchTickets();
    }
  }, [activeTab, authUser]);

  useEffect(() => {
    if (selectedTicketId) {
      fetchTicketDetail(selectedTicketId);
    } else {
      setSelectedTicket(null);
    }
  }, [selectedTicketId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedTicket?.comments, loadingDetail]);

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedTicketId || !token) return;
    setSendingReply(true);
    try {
      const r = await fetch(`/api/support/tickets/detail/${selectedTicketId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ message: replyText.trim() }),
      });
      const d = await r.json();
      if (d.success) {
        setReplyText("");
        await fetchTicketDetail(selectedTicketId);
      } else {
        showError(d.error || "Error al enviar respuesta");
      }
    } catch (err: any) {
      showError(err.message || "Error al enviar respuesta");
    } finally {
      setSendingReply(false);
    }
  };

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

  return (
    <>
      <AnimatedBackground />
      <PageContainer>
        <Content>
          <Title>Soporte y Contacto</Title>
          <Subtitle>
            Consultá tus tickets existentes o creá uno nuevo. Te responderemos a la brevedad.
          </Subtitle>

          {authUser && (
            <div style={{
              marginBottom: "1.5rem",
              fontSize: "0.95rem",
              color: "#a78bfa",
              fontWeight: 600,
              backgroundColor: "rgba(167, 139, 250, 0.08)",
              border: "1px solid rgba(167, 139, 250, 0.2)",
              padding: "0.6rem 1.2rem",
              borderRadius: "10px",
              display: "inline-block"
            }}>
              Tu número de usuario: <strong style={{ color: "#ffffff", fontFamily: "monospace" }}>Usuario N° {authUser._id}</strong>
            </div>
          )}

          {authUser && (
            <TabContainer>
              <Tab $active={activeTab === "new_ticket"} onClick={() => { setActiveTab("new_ticket"); setSelectedTicketId(null); }}>
                Crear Nuevo Ticket
              </Tab>
              <Tab $active={activeTab === "my_tickets"} onClick={() => setActiveTab("my_tickets")}>
                Mis Tickets
              </Tab>
            </TabContainer>
          )}

          {activeTab === "new_ticket" ? (
            <ContactForm
              userId={authUser?._id}
              userEmail={authUser?.email}
              userName={authUser?.email ? authUser.email.split("@")[0] : ""}
              apiBaseUrl={process.env.REACT_APP_API_URL || "http://localhost:5000/api"}
            />
          ) : (
            <CustomCard>
              {selectedTicketId ? (
                <div>
                  <div style={{ marginBottom: "1rem", display: "flex", gap: "1rem", alignItems: "center" }}>
                    <BackBtn onClick={handleBack}>← Volver</BackBtn>
                    {loadingDetail ? (
                      <span style={{ color: "rgba(255,255,255,0.4)" }}>Cargando conversación...</span>
                    ) : (
                      selectedTicket && (
                        <div style={{ display: "flex", flex: 1, justifyContent: "space-between", alignItems: "center" }}>
                          <div>
                            <TicketId>{selectedTicket.ticketId}</TicketId>
                            <h2 style={{ fontSize: "1.2rem", margin: 0 }}>{selectedTicket.subject}</h2>
                          </div>
                          <TicketStatus $status={selectedTicket.status}>
                            {getStatusLabel(selectedTicket.status)}
                          </TicketStatus>
                        </div>
                      )
                    )}
                  </div>

                  {selectedTicket && (
                    <ChatContainer>
                      <ChatMessages>
                        {/* Mensaje original */}
                        <MessageWrapper $isAdmin={false}>
                          <MessageBubble $isAdmin={false}>
                            {selectedTicket.message}
                          </MessageBubble>
                          <MessageMeta>{formatDate(selectedTicket.createdAt)} (Mensaje original)</MessageMeta>
                        </MessageWrapper>

                        {/* Comentarios */}
                        {selectedTicket.comments?.map((c: any, idx: number) => {
                          const isAdmin = c.authorRole === "admin";
                          return (
                            <MessageWrapper key={idx} $isAdmin={isAdmin}>
                              <MessageBubble $isAdmin={isAdmin}>
                                {c.message}
                              </MessageBubble>
                              <MessageMeta>
                                {isAdmin ? "Soporte ZenithNexus" : "Tú"} — {formatDate(c.createdAt)}
                              </MessageMeta>
                            </MessageWrapper>
                          );
                        })}
                        <div ref={messagesEndRef} />
                      </ChatMessages>

                      <ChatInputArea onSubmit={handleSendReply}>
                        <Input
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Escribe tu respuesta aquí..."
                          disabled={sendingReply || selectedTicket.status === "closed"}
                          style={{ flex: 1 }}
                        />
                        <Button
                          type="submit"
                          disabled={sendingReply || !replyText.trim() || selectedTicket.status === "closed"}
                        >
                          {sendingReply ? "Enviando..." : "Responder"}
                        </Button>
                      </ChatInputArea>
                    </ChatContainer>
                  )}
                </div>
              ) : (
                <div>
                  <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>Tus Tickets de Soporte</h3>
                  {loadingTickets ? (
                    <span style={{ color: "rgba(255,255,255,0.4)" }}>Cargando tickets...</span>
                  ) : tickets.length === 0 ? (
                    <div style={{ color: "rgba(255,255,255,0.4)", textAlign: "center", padding: "2rem 0" }}>
                      No tienes ningún ticket de soporte creado aún.
                    </div>
                  ) : (
                    <TicketList>
                      {tickets.map((ticket) => (
                        <TicketCard key={ticket.ticketId} onClick={() => setSelectedTicketId(ticket.ticketId)}>
                          <TicketHeader>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                              <TicketId>{ticket.ticketId}</TicketId>
                              {!ticket.userRead && (
                                <span style={{
                                  background: "#10b981",
                                  color: "white",
                                  fontSize: "0.7rem",
                                  fontWeight: "bold",
                                  padding: "0.15rem 0.4rem",
                                  borderRadius: "4px",
                                }}>
                                  NUEVO MENSAJE 💬
                                </span>
                              )}
                            </div>
                            <TicketDate>{formatDate(ticket.createdAt)}</TicketDate>
                          </TicketHeader>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <TicketSubject style={{ fontWeight: !ticket.userRead ? "bold" : "normal" }}>{ticket.subject}</TicketSubject>
                            <TicketStatus $status={ticket.status}>{getStatusLabel(ticket.status)}</TicketStatus>
                          </div>
                        </TicketCard>
                      ))}
                    </TicketList>
                  )}
                </div>
              )}
            </CustomCard>
          )}
        </Content>
      </PageContainer>
    </>
  );
};

export default SupportPage;
