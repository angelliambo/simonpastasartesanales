import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import type { RootState } from "../../store/store";
import { ContactForm } from "../../components/ContactForm";
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
  BackBtn,
  UserNumberBox,
  UserNumberStrong,
  DetailHeaderRow,
  DetailLoadingText,
  DetailTitleWrapper,
  DetailSubject,
  ChatInput,
  ListSectionTitle,
  ListLoadingText,
  EmptyListMessage,
  CardBadgeWrapper,
  TicketNewMessageBadge,
  CardFooterRow,
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
      <PageContainer>
        <Content>
          <Title>Soporte y Contacto</Title>
          <Subtitle>
            Consultá tus tickets existentes o creá uno nuevo. Te responderemos a la brevedad.
          </Subtitle>

          {authUser && (
            <UserNumberBox>
              Tu número de usuario: <UserNumberStrong>Usuario N° {authUser._id}</UserNumberStrong>
            </UserNumberBox>
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
                  <DetailHeaderRow>
                    <BackBtn onClick={handleBack}>← Volver</BackBtn>
                    {loadingDetail ? (
                      <DetailLoadingText>Cargando conversación...</DetailLoadingText>
                    ) : (
                      selectedTicket && (
                        <DetailTitleWrapper>
                          <div>
                            <TicketId>{selectedTicket.ticketId}</TicketId>
                            <DetailSubject>{selectedTicket.subject}</DetailSubject>
                          </div>
                          <TicketStatus $status={selectedTicket.status}>
                            {getStatusLabel(selectedTicket.status)}
                          </TicketStatus>
                        </DetailTitleWrapper>
                      )
                    )}
                  </DetailHeaderRow>

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
                        <ChatInput
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Escribe tu respuesta aquí..."
                          disabled={sendingReply || selectedTicket.status === "closed"}
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
                  <ListSectionTitle>Tus Tickets de Soporte</ListSectionTitle>
                  {loadingTickets ? (
                    <ListLoadingText>Cargando tickets...</ListLoadingText>
                  ) : tickets.length === 0 ? (
                    <EmptyListMessage>
                      No tienes ningún ticket de soporte creado aún.
                    </EmptyListMessage>
                  ) : (
                    <TicketList>
                      {tickets.map((ticket) => (
                        <TicketCard key={ticket.ticketId} onClick={() => setSelectedTicketId(ticket.ticketId)}>
                          <TicketHeader>
                            <CardBadgeWrapper>
                              <TicketId>{ticket.ticketId}</TicketId>
                              {!ticket.userRead && (
                                <TicketNewMessageBadge>
                                  NUEVO MENSAJE 💬
                                </TicketNewMessageBadge>
                              )}
                            </CardBadgeWrapper>
                            <TicketDate>{formatDate(ticket.createdAt)}</TicketDate>
                          </TicketHeader>
                          <CardFooterRow>
                            <TicketSubject $unread={!ticket.userRead}>{ticket.subject}</TicketSubject>
                            <TicketStatus $status={ticket.status}>{getStatusLabel(ticket.status)}</TicketStatus>
                          </CardFooterRow>
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
