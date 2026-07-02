import { keyframes } from 'styled-components';

export const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const slideUp = keyframes`
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
`;

export const bounceIn = keyframes`
  0% { transform: scale(0); opacity: 0; }
  50% { transform: scale(1.05); }
  70% { transform: scale(0.9); }
  100% { transform: scale(1); opacity: 1; }
`;

export const pulse = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.6; }
  100% { opacity: 1; }
`;

export const shimmer = keyframes`
  from { left: -100%; }
  to { left: 100%; }
`;

export const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`;

export const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const heartBeat = keyframes`
  0% { transform: scale(1); }
  14% { transform: scale(1.3); }
  28% { transform: scale(1); }
  42% { transform: scale(1.3); }
  70% { transform: scale(1); }
`;

export const twinkle = keyframes`
  0%, 100% { opacity: 0.3; transform: scale(0.95); }
  50% { opacity: 1; transform: scale(1); }
`;

export const starsDrift = keyframes`
  from { background-position: 0 0; }
  to { background-position: 1000px 1000px; }
`;

export const aurora = keyframes`
  0% { transform: translate(0, 0) rotate(0deg); opacity: 0.5; }
  50% { transform: translate(30px, -20px) rotate(2deg); opacity: 0.8; }
  100% { transform: translate(-20px, 10px) rotate(-1deg); opacity: 0.6; }
`;

export const particleFall = keyframes`
  0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
  100% { transform: translateY(500px) rotate(720deg); opacity: 0; }
`;
