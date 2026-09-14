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
