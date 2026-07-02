import styled, { keyframes } from "styled-components";
import Button from "../../components/ui/atoms/Button";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const scaleUp = keyframes`
  0% { transform: scale(0.8); opacity: 0; }
  100% { transform: scale(1.0); opacity: 1; }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4); }
  70% { box-shadow: 0 0 0 15px rgba(34, 197, 94, 0); }
  100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
`;

export const PageContainer = styled.div`
  min-height: 100vh;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1.5rem;
  box-sizing: border-box;
  position: relative;
  z-index: 1;
  font-family: "Outfit", "Inter", sans-serif;
`;

export const GlassCard = styled.div`
  background: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  width: 100%;
  max-width: 500px;
  padding: 3rem 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  text-align: center;
  animation: ${fadeIn} 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SpinnerContainer = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoadingSpinner = styled.div`
  width: 64px;
  height: 64px;
  border: 4px solid rgba(168, 85, 247, 0.1);
  border-top: 4px solid ${({ theme }) => theme.colors?.tertiary?.[500] || "#a855f7"};
  border-radius: 50%;
  animation: ${rotate} 1s linear infinite;
`;

export const SuccessIcon = styled.div`
  width: 64px;
  height: 64px;
  background: ${({ theme }) => theme.colors?.success?.[500] || "#22c55e"};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${scaleUp} 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards, ${pulse} 2s infinite;
  color: white;
  font-size: 2rem;
  font-weight: bold;
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  margin: 0 0 1rem;
  background: ${({ theme }) => theme.gradients?.brand || "linear-gradient(135deg, #60a5fa, #a78bfa, #f472b6)"};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
`;

export const Subtitle = styled.p`
  font-size: 1.05rem;
  color: ${({ theme }) => theme.colors?.text?.secondary || "#d4d4d8"};
  line-height: 1.6;
  margin: 0 0 2rem;
  max-width: 400px;
`;

export const ActionButton = styled(Button)`
  width: 100%;
  padding: 0.85rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 12px;
  transition: all 0.3s ease;
`;
