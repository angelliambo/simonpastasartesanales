// Exportar todos los tipos
export * from "./auth";
export * from "./activities";

// Tipos generales del sistema
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalActivities: number;
  completedActivities: number;
  averageProgress: number;
  recentActivity: RecentActivity[];
}

export interface RecentActivity {
  id: string;
  userId: string;
  userName: string;
  activityName: string;
  timestamp: Date;
  status: string;
  score?: number;
}

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  actionUrl?: string;
}

export enum NotificationType {
  ACHIEVEMENT = "achievement",
  REMINDER = "reminder",
  PROGRESS_UPDATE = "progress_update",
  THERAPIST_MESSAGE = "therapist_message",
  PARENT_ALERT = "parent_alert",
  SYSTEM = "system",
}
