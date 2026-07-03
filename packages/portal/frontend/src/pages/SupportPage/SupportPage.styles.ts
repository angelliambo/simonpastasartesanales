import styled from "styled-components";
import Button from "../../components/ui/atoms/Button";
import { Card } from "../../components/ui/atoms/Card";

export const PageContainer = styled.div`
  min-height: 100vh;
  background: transparent;
  padding: 2rem 1.5rem;
  box-sizing: border-box;
  position: relative;
  z-index: 1;
`;

export const Content = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

export const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: 800;
  margin: 0 0 4px;
  background: linear-gradient(135deg, #60a5fa, #a78bfa, #f472b6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const Subtitle = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.text.tertiary};
  margin: 0 0 1.5rem;
`;

export const CustomCard = styled(Card)`
  margin-bottom: 1.5rem;
  background: rgba(255, 255, 255, 0.02) !important;
  border: 1px solid rgba(255, 255, 255, 0.05) !important;
  backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  border-radius: 16px !important;
  padding: 1.5rem;
`;

export const TabContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding-bottom: 0.5rem;
`;

export const Tab = styled.button<{ $active: boolean }>`
  background: ${({ $active }) => ($active ? "rgba(255, 255, 255, 0.05)" : "transparent")};
  border: 1px solid ${({ $active }) => ($active ? "rgba(255, 255, 255, 0.1)" : "transparent")};
  color: ${({ $active, theme }) => ($active ? theme.colors.text.primary : theme.colors.text.tertiary)};
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
    background: rgba(255, 255, 255, 0.03);
  }
`;

export const TicketList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const TicketCard = styled.div`
  background: rgba(255, 255, 255, 0.01);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 12px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.03);
    border-color: rgba(255, 255, 255, 0.1);
    transform: translateY(-1px);
  }
`;

export const TicketHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

export const TicketId = styled.span`
  font-family: monospace;
  font-size: 0.8rem;
  color: #818cf8;
`;

export const TicketSubject = styled.h3<{ $unread?: boolean }>`
  font-size: 1rem;
  font-weight: ${({ $unread }) => ($unread ? "bold" : "normal")};
  margin: 0;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const TicketDate = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.text.tertiary};
`;

export const TicketStatus = styled.span<{ $status: "open" | "in_progress" | "closed" }>`
  font-size: 0.75rem;
  font-weight: bold;
  padding: 0.25rem 0.6rem;
  border-radius: 9999px;
  background: ${({ $status }) => {
    if ($status === "open") return "rgba(59, 130, 246, 0.15)";
    if ($status === "in_progress") return "rgba(245, 158, 11, 0.15)";
    return "rgba(107, 114, 128, 0.15)";
  }};
  color: ${({ $status }) => {
    if ($status === "open") return "#60a5fa";
    if ($status === "in_progress") return "#fbbf24";
    return "#9ca3af";
  }};
  border: 1px solid ${({ $status }) => {
    if ($status === "open") return "rgba(59, 130, 246, 0.25)";
    if ($status === "in_progress") return "rgba(245, 158, 11, 0.25)";
    return "rgba(107, 114, 128, 0.25)";
  }};
`;

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 500px;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  overflow: hidden;
`;

export const ChatHeader = styled.div`
  padding: 1rem;
  background: rgba(255, 255, 255, 0.02);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ChatHeaderTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const ChatMessages = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const MessageWrapper = styled.div<{ $isAdmin: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ $isAdmin }) => ($isAdmin ? "flex-start" : "flex-end")};
  width: 100%;
`;

export const MessageBubble = styled.div<{ $isAdmin: boolean }>`
  max-width: 75%;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  font-size: 0.9rem;
  line-height: 1.4;
  word-break: break-word;
  white-space: pre-wrap;
  background: ${({ $isAdmin }) => ($isAdmin ? "rgba(16, 185, 129, 0.1)" : "rgba(99, 102, 241, 0.15)")};
  border: 1px solid ${({ $isAdmin }) => ($isAdmin ? "rgba(16, 185, 129, 0.2)" : "rgba(99, 102, 241, 0.25)")};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const MessageMeta = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.text.tertiary};
  margin-top: 0.25rem;
  padding: 0 0.25rem;
`;

export const ChatInputArea = styled.form`
  display: flex;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.01);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  gap: 0.5rem;
`;

export const BackBtn = styled(Button)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: ${({ theme }) => theme.colors.text.primary};

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

// Nuevos componentes estilizados semánticos
import { Input as AtomInput } from "../../components/ui/atoms/Input";

export const UserNumberBox = styled.div`
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
  color: #a78bfa;
  font-weight: 600;
  background-color: rgba(167, 139, 250, 0.08);
  border: 1px solid rgba(167, 139, 250, 0.2);
  padding: 0.6rem 1.2rem;
  border-radius: 10px;
  display: inline-block;
`;

export const UserNumberStrong = styled.strong`
  color: #ffffff;
  font-family: monospace;
`;

export const DetailHeaderRow = styled.div`
  margin-bottom: 1rem;
  display: flex;
  gap: 1rem;
  align-items: center;
`;

export const DetailLoadingText = styled.span`
  color: rgba(255, 255, 255, 0.4);
`;

export const DetailTitleWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
`;

export const DetailSubject = styled.h2`
  font-size: 1.2rem;
  margin: 0;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const ChatInput = styled(AtomInput)`
  flex: 1;
`;

export const ListSectionTitle = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const ListLoadingText = styled.span`
  color: rgba(255, 255, 255, 0.4);
`;

export const EmptyListMessage = styled.div`
  color: rgba(255, 255, 255, 0.4);
  text-align: center;
  padding: 2rem 0;
`;

export const CardBadgeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const TicketNewMessageBadge = styled.span`
  background: #10b981;
  color: white;
  font-size: 0.7rem;
  font-weight: bold;
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
`;

export const CardFooterRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
