export enum NotificationType {
  PROGRESS = "PROGRESS",
  ACHIEVEMENT = "ACHIEVEMENT",
  REMINDER = "REMINDER",
  SYSTEM = "SYSTEM",
  CONNECTION = "CONNECTION",
  SYNC = "SYNC",
  WARNING = "WARNING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

export enum NotificationPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  URGENT = "URGENT",
}

export enum NotificationCategory {
  ACTIVITIES = "ACTIVITIES",
  PROGRESS = "PROGRESS",
  ACHIEVEMENTS = "ACHIEVEMENTS",
  SYSTEM = "SYSTEM",
  CONNECTION = "CONNECTION",
  REMINDERS = "REMINDERS",
}

export interface Notification {
  id: string;
  title?: string;
  message: string;
  type: NotificationType;
  priority: NotificationPriority;
  category: NotificationCategory;
  read: boolean;
  timestamp: Date | string;
  duration?: number;
  actionUrl?: string;
  actionLabel?: string;
}

export interface NotificationPreferences {
  enabled: boolean;
  categories: Record<NotificationCategory, boolean>;
  types: Record<NotificationType, boolean>;
  priorities: Record<NotificationPriority, boolean>;
  sound: boolean;
  vibration: boolean;
  desktop: boolean;
  email: boolean;
  frequency: string;
  quietHours: {
    enabled: boolean;
    start: string;
    end: string;
  };
}

export interface SmartReminder {
  id: string;
  message: string;
  enabled: boolean;
  lastTriggered?: Date;
  nextTrigger?: Date;
}

export interface NotificationStats {
  total: number;
  unread: number;
  byCategory: Record<NotificationCategory, number>;
  byType: Record<NotificationType, number>;
  byPriority: Record<NotificationPriority, number>;
  readRate: number;
  averageResponseTime: number;
}

export interface NotificationContextType {
  notifications: Notification[];
  preferences: NotificationPreferences;
  stats: NotificationStats;
  smartReminders: SmartReminder[];
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read">) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
  updatePreferences: (preferences: Partial<NotificationPreferences>) => void;
  addSmartReminder: (reminder: Omit<SmartReminder, "id">) => void;
  updateSmartReminder: (id: string, updates: Partial<SmartReminder>) => void;
  removeSmartReminder: (id: string) => void;
  checkSmartReminders: () => void;
  getUnreadCount: () => number;
  getNotificationsByCategory: (category: NotificationCategory) => Notification[];
  getNotificationsByType: (type: NotificationType) => Notification[];
}
