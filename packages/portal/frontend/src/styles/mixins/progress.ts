import styled from "styled-components";
import { AccessibilityProps } from "./types";
import { media } from "./responsive";

// ============================================================================
// COMPONENTES DE BARRAS DE PROGRESO
// ============================================================================

export const ProgressBarContainer = styled.div<{
  width?: string;
  height?: string;
  accessibility?: AccessibilityProps;
}>`
  width: ${({ width }) => width || "100%"};
  height: ${({ height, accessibility }) =>
    accessibility?.largeText ? "12px" : height || "8px"};
  background: ${({ theme, accessibility }) => theme.colors.background.surface};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  position: relative;
  border: ${({ theme, accessibility }) =>
    accessibility?.highContrast
      ? `1px solid ${theme.colors.border.normal}`
      : "none"};
`;

export const ProgressBarFill = styled.div<{
  progress: number;
  color?: string;
  accessibility?: AccessibilityProps;
}>`
  height: 100%;
  width: ${({ progress }) => Math.min(Math.max(progress, 0), 100)}%;
  background: ${({ theme, color, accessibility }) => {
    if (accessibility?.highContrast) return theme.colors.text.inverse;
    return color || theme.colors.primary[500];
  }};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: width 0.5s ease-in-out;
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ accessibility }) =>
      accessibility?.reducedMotion
        ? "none"
        : `linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          )`};
    animation: ${({ accessibility }) =>
      accessibility?.reducedMotion ? "none" : "shimmer 2s infinite"};
  }

  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
`;

export const ProgressBarLabel = styled.div<{
  accessibility?: AccessibilityProps;
}>`
  margin-bottom: ${({ theme, accessibility }) =>
    accessibility?.largeText ? theme.spacing.sm : "8px"};
  font-size: ${({ theme, accessibility }) =>
    accessibility?.largeText ? "16px" : "14px"};
  color: ${({ theme, accessibility }) =>
    accessibility?.highContrast
      ? theme.colors.text.inverse
      : theme.colors.text.primary};
  font-weight: 500;
`;

export const ProgressBarPercentage = styled.div<{
  accessibility?: AccessibilityProps;
}>`
  margin-top: ${({ theme, accessibility }) =>
    accessibility?.largeText ? theme.spacing.xs : "4px"};
  font-size: ${({ theme, accessibility }) =>
    accessibility?.largeText ? "14px" : "12px"};
  color: ${({ theme, accessibility }) => theme.colors.text.secondary};
  text-align: right;
`;

// ============================================================================
// COMPONENTES DE SISTEMA DE PUNTOS
// ============================================================================

export const PointsDisplay = styled.div<{
  size?: string;
  accessibility?: AccessibilityProps;
}>`
  display: flex;
  align-items: center;
  gap: ${({ theme, accessibility }) =>
    accessibility?.largeText ? theme.spacing.sm : "8px"};
  padding: ${({ theme, size, accessibility }) => {
    const basePadding =
      size === "small"
        ? "4px 8px"
        : size === "large"
        ? "12px 20px"
        : "8px 12px";
    return accessibility?.largeText
      ? `${parseInt(basePadding) * 1.5}px`
      : basePadding;
  }};
  background: ${({ theme, accessibility }) =>
    accessibility?.highContrast ? "#ffffff" : theme.colors.primary[500]};
  color: ${({ theme, accessibility }) =>
    accessibility?.highContrast ? theme.colors.text.inverse : "#ffffff"};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  font-weight: bold;
  font-size: ${({ theme, size, accessibility }) => {
    const baseSize =
      size === "small" ? "12px" : size === "large" ? "18px" : "14px";
    return accessibility?.largeText
      ? `${parseInt(baseSize) * 1.2}px`
      : baseSize;
  }};
  box-shadow: ${({ theme, accessibility }) => theme.shadows.medium};
  transition: all 0.3s ease;
  border: ${({ theme, accessibility }) =>
    accessibility?.highContrast
      ? `1px solid ${theme.colors.border.light}`
      : "none"};

  &:hover {
    transform: ${({ accessibility }) =>
      accessibility?.reducedMotion ? "none" : "translateY(-2px)"};
    box-shadow: ${({ theme, accessibility }) => theme.shadows.heavy};
  }
`;

export const PointsIcon = styled.span<{
  size?: string;
  accessibility?: AccessibilityProps;
}>`
  font-size: ${({ size, accessibility }) => {
    const baseSize =
      size === "small" ? "14px" : size === "large" ? "20px" : "16px";
    return accessibility?.largeText
      ? `${parseInt(baseSize) * 1.2}px`
      : baseSize;
  }};
`;

export const PointsLabel = styled.span<{
  size?: string;
  accessibility?: AccessibilityProps;
}>`
  font-size: ${({ size, accessibility }) => {
    const baseSize =
      size === "small" ? "10px" : size === "large" ? "14px" : "12px";
    return accessibility?.largeText
      ? `${parseInt(baseSize) * 1.2}px`
      : baseSize;
  }};
  opacity: 0.8;
`;

// ============================================================================
// COMPONENTES DE LOGROS Y BADGES
// ============================================================================

export const AchievementBadgeContainer = styled.div<{
  $earned: boolean;
  size?: string;
  accessibility?: AccessibilityProps;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme, size, accessibility }) => {
    const basePadding =
      size === "small" ? "8px" : size === "large" ? "20px" : "12px";
    return accessibility?.largeText
      ? `${parseInt(basePadding) * 1.5}px`
      : basePadding;
  }};
  border-radius: 50%;
  width: ${({ size, accessibility }) => {
    const baseWidth =
      size === "small" ? "60px" : size === "large" ? "120px" : "80px";
    return accessibility?.largeText
      ? `${parseInt(baseWidth) * 1.2}px`
      : baseWidth;
  }};
  height: ${({ size, accessibility }) => {
    const baseHeight =
      size === "small" ? "60px" : size === "large" ? "120px" : "80px";
    return accessibility?.largeText
      ? `${parseInt(baseHeight) * 1.2}px`
      : baseHeight;
  }};
  background: ${({ theme, $earned, accessibility }) => {
    if (accessibility?.highContrast) {
      return $earned
        ? theme.colors.text.inverse
        : theme.colors.background.surface;
    }
    return $earned
      ? theme.colors.success[500]
      : theme.colors.background.surface;
  }};
  border: 3px solid
    ${({ theme, $earned, accessibility }) => {
      if (accessibility?.highContrast) return theme.colors.border.normal;
      return $earned ? theme.colors.success[500] : theme.colors.border.light;
    }};
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: ${({ accessibility }) =>
      accessibility?.reducedMotion ? "none" : "scale(1.05)"};
    box-shadow: ${({ theme, accessibility }) =>
      accessibility?.highContrast
        ? theme.shadows.medium
        : theme.shadows.medium};
  }

  ${({ theme, $earned, accessibility }) =>
    $earned &&
    `
    animation: ${accessibility?.reducedMotion ? "none" : "pulse 2s infinite"};
    
    @keyframes pulse {
      0% { box-shadow: 0 0 0 0 rgba(82, 196, 26, 0.7); }
      70% { box-shadow: 0 0 0 10px rgba(82, 196, 26, 0); }
      100% { box-shadow: 0 0 0 0 rgba(82, 196, 26, 0); }
    }
  `}
`;

export const AchievementIcon = styled.div<{
  size?: string;
  accessibility?: AccessibilityProps;
}>`
  font-size: ${({ size, accessibility }) => {
    const baseSize =
      size === "small" ? "20px" : size === "large" ? "40px" : "30px";
    return accessibility?.largeText
      ? `${parseInt(baseSize) * 1.2}px`
      : baseSize;
  }};
`;

export const AchievementTooltip = styled.div<{
  accessibility?: AccessibilityProps;
}>`
  position: absolute;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
  background: ${({ theme, accessibility }) => theme.colors.background.card};
  border: 1px solid
    ${({ theme, accessibility }) =>
      accessibility?.highContrast
        ? theme.colors.border.normal
        : theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme, accessibility }) =>
    accessibility?.largeText ? theme.spacing.sm : "8px 12px"};
  font-size: ${({ theme, accessibility }) =>
    accessibility?.largeText ? "14px" : "12px"};
  color: ${({ theme, accessibility }) =>
    accessibility?.highContrast
      ? theme.colors.text.inverse
      : theme.colors.text.primary};
  white-space: nowrap;
  box-shadow: ${({ theme, accessibility }) => theme.shadows.medium};
  z-index: 1000;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
`;

export const AchievementTitle = styled.div<{
  accessibility?: AccessibilityProps;
}>`
  font-weight: bold;
  margin-bottom: ${({ theme, accessibility }) =>
    accessibility?.largeText ? theme.spacing.xs : "2px"};
`;

export const AchievementDescription = styled.div<{
  accessibility?: AccessibilityProps;
}>`
  font-size: ${({ theme, accessibility }) =>
    accessibility?.largeText ? "12px" : "10px"};
  color: ${({ theme, accessibility }) => theme.colors.text.secondary};
`;

export const AchievementDate = styled.div<{
  accessibility?: AccessibilityProps;
}>`
  font-size: ${({ theme, accessibility }) =>
    accessibility?.largeText ? "12px" : "10px"};
  color: ${({ theme, accessibility }) =>
    accessibility?.highContrast ? "#ffffff" : theme.colors.success[500]};
  margin-top: ${({ theme, accessibility }) =>
    accessibility?.largeText ? theme.spacing.xs : "2px"};
`;

// ============================================================================
// COMPONENTES DE CALENDARIO DE PROGRESO
// ============================================================================

export const CalendarContainer = styled.div<{
  accessibility?: AccessibilityProps;
}>`
  background: ${({ theme, accessibility }) => theme.colors.background.card};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid
    ${({ theme, accessibility }) =>
      accessibility?.highContrast
        ? theme.colors.border.normal
        : theme.colors.border.light};
  padding: ${({ theme, accessibility }) =>
    accessibility?.largeText ? theme.spacing.lg : theme.spacing.md};
  box-shadow: ${({ theme, accessibility }) => theme.shadows.medium};
`;

export const CalendarDay = styled.div<{
  isToday?: boolean;
  isCompleted?: boolean;
  isCurrentMonth?: boolean;
  accessibility?: AccessibilityProps;
}>`
  width: ${({ accessibility }) => (accessibility?.largeText ? "48px" : "40px")};
  height: ${({ accessibility }) =>
    accessibility?.largeText ? "48px" : "40px"};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  position: relative;
  font-size: ${({ accessibility }) =>
    accessibility?.largeText ? "16px" : "14px"};

  background: ${({ theme, isToday, isCompleted, accessibility }) => {
    if (accessibility?.highContrast) {
      if (isCompleted) return theme.colors.text.inverse;
      if (isToday) return theme.colors.text.inverse;
      return "transparent";
    }
    if (isCompleted) return theme.colors.success[500];
    if (isToday) return theme.colors.primary[500];
    return "transparent";
  }};

  color: ${({ theme, isToday, isCompleted, isCurrentMonth, accessibility }) => {
    if (accessibility?.highContrast) {
      if (isCompleted || isToday) return theme.colors.text.inverse;
      if (!isCurrentMonth) return theme.colors.text.secondary;
      return theme.colors.text.inverse;
    }
    if (isCompleted || isToday) return theme.colors.text.inverse;
    if (!isCurrentMonth) return theme.colors.text.secondary;
    return theme.colors.text.primary;
  }};

  &:hover {
    background: ${({ theme, accessibility }) =>
      accessibility?.highContrast
        ? theme.colors.text.inverse
        : theme.colors.primary[500]};
    color: ${({ theme }) => theme.colors.text.inverse};
    transform: ${({ accessibility }) =>
      accessibility?.reducedMotion ? "none" : "scale(1.1)"};
  }

  ${({ theme, isCompleted, accessibility }) =>
    isCompleted &&
    `
    &::after {
      content: '✓';
      position: absolute;
      top: -2px;
      right: -2px;
      background: ${
        accessibility?.highContrast
          ? theme.colors.text.inverse
          : theme.colors.success[500]
      };
      color: ${theme.colors.text.inverse};
      border-radius: 50%;
      width: ${accessibility?.largeText ? "20px" : "16px"};
      height: ${accessibility?.largeText ? "20px" : "16px"};
      font-size: ${accessibility?.largeText ? "12px" : "10px"};
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `}
`;

// ============================================================================
// COMPONENTES DE ESTADÍSTICAS Y DASHBOARD
// ============================================================================

export const ProgressStatsContainer = styled.div<{
  $accessibility?: AccessibilityProps;
}>`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme, $accessibility }) =>
    $accessibility?.largeText ? theme.spacing.lg : theme.spacing.md};
  margin: ${({ theme, $accessibility }) =>
      $accessibility?.largeText ? theme.spacing.lg : theme.spacing.md}
    0;

  @media ${media.mobile} {
    grid-template-columns: 1fr;
    gap: ${({ theme, $accessibility }) =>
      $accessibility?.largeText ? theme.spacing.md : theme.spacing.sm};
  }
`;

export const StatCard = styled.div<{
  $accessibility?: AccessibilityProps;
}>`
  background: ${({ theme, $accessibility }) => theme.colors.background.card};
  border: 1px solid
    ${({ theme, $accessibility }) =>
      $accessibility?.highContrast
        ? theme.colors.border.normal
        : theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme, $accessibility }) =>
    $accessibility?.largeText ? theme.spacing.lg : theme.spacing.md};
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: ${({ theme, $accessibility }) =>
      $accessibility?.highContrast
        ? theme.shadows.medium
        : theme.shadows.medium};
    transform: ${({ $accessibility }) =>
      $accessibility?.reducedMotion ? "none" : "translateY(-2px)"};
  }
`;

export const StatNumber = styled.div<{
  color?: "primary" | "success" | "warning" | "error";
  $accessibility?: AccessibilityProps;
}>`
  font-size: ${({ $accessibility }) =>
    $accessibility?.largeText ? "32px" : "24px"};
  font-weight: bold;
  color: ${({ theme, color, $accessibility }) => {
    if ($accessibility?.highContrast) return theme.colors.text.inverse;
    switch (color) {
      case "success":
        return theme.colors.success[500];
      case "warning":
        return theme.colors.warning[500];
      case "error":
        return theme.colors.error[500];
      default:
        return theme.colors.primary[500];
    }
  }};
  margin-bottom: ${({ theme, $accessibility }) =>
    $accessibility?.largeText ? theme.spacing.xs : "4px"};
`;

export const StatLabel = styled.div<{
  $accessibility?: AccessibilityProps;
}>`
  font-size: ${({ theme, $accessibility }) =>
    $accessibility?.largeText ? "16px" : "14px"};
  color: ${({ theme, $accessibility }) => theme.colors.text.secondary};
  font-weight: 500;
`;

export const StatSubtext = styled.div<{
  $accessibility?: AccessibilityProps;
}>`
  font-size: ${({ theme, $accessibility }) =>
    $accessibility?.largeText ? "14px" : "12px"};
  color: ${({ theme, $accessibility }) => theme.colors.text.secondary};
  margin-top: ${({ theme, $accessibility }) =>
    $accessibility?.largeText ? theme.spacing.xs : "4px"};
`;

// ============================================================================
// COMPONENTES DE DASHBOARD DE PROGRESO
// ============================================================================

export const ProgressDashboardContainer = styled.div<{
  $accessibility?: AccessibilityProps;
}>`
  padding: ${({ theme, $accessibility }) =>
    $accessibility?.largeText ? theme.spacing.xl : theme.spacing.lg};

  @media ${media.mobile} {
    padding: ${({ theme, $accessibility }) =>
      $accessibility?.largeText ? theme.spacing.lg : theme.spacing.md};
  }
`;

export const ProgressDashboardTitle = styled.h2<{
  $accessibility?: AccessibilityProps;
}>`
  text-align: center;
  margin-bottom: ${({ theme, $accessibility }) =>
    $accessibility?.largeText ? theme.spacing.xl : theme.spacing.lg};
  color: ${({ theme, $accessibility }) =>
    $accessibility?.highContrast
      ? theme.colors.text.inverse
      : theme.colors.text.primary};
  font-size: ${({ $accessibility }) =>
    $accessibility?.largeText ? "32px" : "24px"};
`;

export const ProgressSection = styled.div<{
  accessibility?: AccessibilityProps;
}>`
  margin-bottom: ${({ theme, accessibility }) =>
    accessibility?.largeText ? theme.spacing.xl : theme.spacing.lg};
`;

export const ProgressSectionTitle = styled.h3<{
  accessibility?: AccessibilityProps;
}>`
  margin-bottom: ${({ theme, accessibility }) =>
    accessibility?.largeText ? theme.spacing.lg : theme.spacing.md};
  color: ${({ theme, accessibility }) =>
    accessibility?.highContrast
      ? theme.colors.text.inverse
      : theme.colors.text.primary};
  font-size: ${({ accessibility }) =>
    accessibility?.largeText ? "24px" : "18px"};
`;

// ============================================================================
// UTILIDADES Y HELPERS
// ============================================================================

export const ProgressUtils = {
  // Calcular porcentaje de progreso
  calculateProgress: (current: number, total: number) => {
    if (total === 0) return 0;
    return Math.min(Math.max((current / total) * 100, 0), 100);
  },

  // Formatear números con separadores
  formatNumber: (num: number) => {
    return num.toLocaleString();
  },

  // Obtener color según progreso
  getProgressColor: (progress: number, theme: any) => {
    if (progress >= 80) return theme.colors.success[500];
    if (progress >= 60) return theme.colors.warning[500];
    if (progress >= 40) return theme.colors.primary[500];
    return theme.colors.error[500];
  },

  // Calcular racha de días
  calculateStreak: (dates: string[]) => {
    if (dates.length === 0) return 0;

    const sortedDates = dates.sort(
      (a, b) => new Date(b).getTime() - new Date(a).getTime()
    );
    let streak = 0;
    let currentDate = new Date();

    for (const dateStr of sortedDates) {
      const date = new Date(dateStr);
      const diffTime = currentDate.getTime() - date.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === streak + 1) {
        streak++;
        currentDate = date;
      } else {
        break;
      }
    }

    return streak;
  },

  // Generar datos de progreso para gráficos
  generateProgressData: (data: any[], period: "week" | "month" | "year") => {
    const now = new Date();
    const periods = {
      week: 7,
      month: 30,
      year: 365,
    };

    const result = [];
    for (let i = periods[period] - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);

      const dayData = data.find(
        (d) => new Date(d.date).toDateString() === date.toDateString()
      );

      result.push({
        date: date.toISOString().split("T")[0],
        value: dayData ? dayData.value : 0,
      });
    }

    return result;
  },

  // Validar logros
  validateAchievements: (userData: any, achievements: any[]) => {
    const earnedAchievements = [];

    for (const achievement of achievements) {
      if (achievement.earned) continue;

      let earned = false;

      switch (achievement.type) {
        case "points":
          earned = userData.totalPoints >= achievement.requirement;
          break;
        case "streak":
          earned = userData.currentStreak >= achievement.requirement;
          break;
        case "games":
          earned = userData.gamesCompleted >= achievement.requirement;
          break;
        case "days":
          earned = userData.daysActive >= achievement.requirement;
          break;
      }

      if (earned) {
        earnedAchievements.push({
          ...achievement,
          earned: true,
          earnedDate: new Date().toISOString(),
        });
      }
    }

    return earnedAchievements;
  },
};
