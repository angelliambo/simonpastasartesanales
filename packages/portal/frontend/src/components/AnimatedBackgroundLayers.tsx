import React from "react";
import styled, { keyframes } from "styled-components";

// ============================================
// KEYFRAMES
// ============================================

const twinkle = keyframes`
  0%, 100% { opacity: 0.3; transform: scale(0.95); }
  50% { opacity: 1; transform: scale(1); }
`;

const driftSmall = keyframes`
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(-350px, -350px, 0); }
`;

const driftMedium = keyframes`
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(-550px, -550px, 0); }
`;

const driftLarge = keyframes`
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(-750px, -750px, 0); }
`;

const aurora = keyframes`
  0% { transform: translate3d(0, 0, 0) rotate(0deg); opacity: 0.5; }
  50% { transform: translate3d(30px, -20px, 0) rotate(2deg); opacity: 0.8; }
  100% { transform: translate3d(-20px, 10px, 0) rotate(-1deg); opacity: 0.6; }
`;

const float = keyframes`
  0%, 100% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(0, -20px, 0); }
`;

// ============================================
// STYLED COMPONENTS
// ============================================

const StarsBase = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-repeat: repeat;
  pointer-events: none;
`;

const StarsSmall = styled(StarsBase)`
  width: calc(100% + 350px);
  height: calc(100% + 350px);
  background-image: 
    radial-gradient(1px 1px at 20px 30px, #ffffff, transparent),
    radial-gradient(1.5px 1.5px at 100px 150px, #ffffff, transparent),
    radial-gradient(1px 1px at 200px 50px, #ffffff, transparent),
    radial-gradient(1.2px 1.2px at 300px 250px, #ffffff, transparent);
  background-size: 350px 350px;
  animation: ${twinkle} 4s ease-in-out infinite alternate, ${driftSmall} 120s linear infinite;
  opacity: 0.6;
`;

const StarsMedium = styled(StarsBase)`
  width: calc(100% + 550px);
  height: calc(100% + 550px);
  background-image: 
    radial-gradient(2px 2px at 50px 80px, rgba(255,255,255,0.8), transparent),
    radial-gradient(2.5px 2.5px at 250px 180px, rgba(255,255,255,0.1), transparent),
    radial-gradient(2px 2px at 450px 100px, rgba(255,255,255,0.7), transparent);
  background-size: 550px 550px;
  animation: ${twinkle} 6s ease-in-out infinite alternate-reverse, ${driftMedium} 90s linear infinite;
  opacity: 0.4;
`;

const StarsLarge = styled(StarsBase)`
  width: calc(100% + 750px);
  height: calc(100% + 750px);
  background-image:
    radial-gradient(3px 3px at 150px 200px, ${({ theme }) => theme.animatedBackground?.starColor || "#ffffff"}, transparent),
    radial-gradient(4px 4px at 400px 450px, ${({ theme }) => theme.animatedBackground?.starColorAlpha90 || "rgba(255,255,255,0.9)"}, transparent);
  background-size: 750px 750px;
  animation: ${twinkle} 8s ease-in-out infinite alternate, ${driftLarge} 60s linear infinite;
  opacity: 0.3;
`;

const AuroraLayer = styled.div`
  position: absolute;
  top: -20%;
  left: -20%;
  width: 140%;
  height: 140%;
  background:
    radial-gradient(ellipse at 30% 20%, ${({ theme }) => theme.animatedBackground?.auroraIndigo || 'rgba(99, 102, 241, 0.15)'} 0%, transparent 70%),
    radial-gradient(ellipse at 70% 80%, ${({ theme }) => theme.animatedBackground?.auroraTertiary || 'rgba(168, 85, 247, 0.12)'} 0%, transparent 70%),
    radial-gradient(ellipse at 50% 50%, ${({ theme }) => theme.animatedBackground?.auroraCyan || 'rgba(6, 182, 212, 0.08)'} 0%, transparent 70%);
  animation: ${aurora} 20s ease-in-out infinite alternate;
`;

const MountainsContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 250px;
  z-index: -1;
`;

const MountainGlow = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 150px;
  background: linear-gradient(to top, ${({ theme }) => {
    const base = theme.animatedBackground?.darkGradient3 || '#0f0c29';
    return `${base}cc 0%, transparent 100%`;
  }});
  z-index: 10;
`;

const Mountain = styled.div<{ $index: number }>`
  position: absolute;
  bottom: 0;
  ${({ $index, theme }) => {
    const g1 = theme.animatedBackground?.darkGradient3 || '#0f0c29';
    const g2 = theme.animatedBackground?.darkGradient2 || '#1a1a3e';
    const darker = '#0b091a';
    if ($index === 0) return `
      left: -5%;
      width: 60%;
      height: 200px;
      background: linear-gradient(135deg, ${g1} 0%, #1e1b4b 100%);
      clip-path: polygon(0% 100%, 45% 15%, 100% 100%);
      z-index: 2;
    `;
    if ($index === 1) return `
      left: 20%;
      width: 70%;
      height: 240px;
      background: linear-gradient(135deg, ${darker} 0%, ${g2} 100%);
      clip-path: polygon(0% 100%, 50% 0%, 100% 100%);
      z-index: 1;
    `;
    return `
      right: -10%;
      width: 65%;
      height: 180px;
      background: linear-gradient(135deg, ${g1} 0%, #1e1b4b 100%);
      clip-path: polygon(0% 100%, 55% 20%, 100% 100%);
      z-index: 3;
    `;
  }}
`;

const FloatingOrb = styled.div<{ $delay?: number }>`
  position: absolute;
  border-radius: 50%;
  animation: ${float} 8s ease-in-out infinite;
  animation-delay: ${({ $delay = 0 }) => $delay}s;
`;

const Orb1 = styled(FloatingOrb).attrs({ $delay: 0 })`
  width: 300px;
  height: 300px;
  top: 10%;
  left: 5%;
  background: radial-gradient(circle, ${({ theme }) => theme.animatedBackground?.auroraIndigo || "rgba(99, 102, 241, 0.15)"} 0%, transparent 70%);
`;

const Orb2 = styled(FloatingOrb).attrs({ $delay: -3 })`
  width: 250px;
  height: 250px;
  top: 50%;
  right: 5%;
  background: radial-gradient(circle, ${({ theme }) => theme.animatedBackground?.auroraTertiary || "rgba(168, 85, 247, 0.12)"} 0%, transparent 70%);
`;

const Orb3 = styled(FloatingOrb).attrs({ $delay: -6 })`
  width: 200px;
  height: 200px;
  bottom: 15%;
  left: 15%;
  background: radial-gradient(circle, ${({ theme }) => theme.animatedBackground?.auroraCyan || "rgba(6, 182, 212, 0.08)"} 0%, transparent 70%);
`;

// ============================================
// COMPONENT
// ============================================

interface AnimatedBackgroundLayersProps {
  showStars?: boolean;
  showAurora?: boolean;
  showOrbs?: boolean;
  showMountains?: boolean;
}

export const AnimatedBackgroundLayers: React.FC<AnimatedBackgroundLayersProps> = ({
  showStars = true,
  showAurora = true,
  showOrbs = true,
  showMountains = true,
}) => {
  return (
    <>
      {showStars && (
        <>
          <StarsSmall />
          <StarsMedium />
          <StarsLarge />
        </>
      )}
      {showAurora && <AuroraLayer />}
      {showOrbs && (
        <>
          <Orb1 />
          <Orb2 />
          <Orb3 />
        </>
      )}
      {showMountains && (
        <MountainsContainer>
          <Mountain $index={0} />
          <Mountain $index={1} />
          <Mountain $index={2} />
          <MountainGlow />
        </MountainsContainer>
      )}
    </>
  );
};

export default AnimatedBackgroundLayers;
