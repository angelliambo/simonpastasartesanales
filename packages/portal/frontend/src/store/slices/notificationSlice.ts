import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Notification {
  id: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
  read: boolean;
  timestamp: string;
  duration?: number;
}

interface NotificationState {
  items: Notification[];
  notifications: Notification[]; // Requerido por NotificationSystem.tsx
  unreadCount: number;
}

const initialState: NotificationState = {
  items: [],
  notifications: [],
  unreadCount: 0,
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.items.unshift(action.payload);
      state.notifications.unshift(action.payload);
      if (!action.payload.read) state.unreadCount++;
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const notif = state.items.find((n) => n.id === action.payload);
      if (notif && !notif.read) {
        notif.read = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((n) => n.id !== action.payload);
      state.notifications = state.notifications.filter((n) => n.id !== action.payload);
    },
    clearNotifications: (state) => {
      state.items = [];
      state.notifications = [];
      state.unreadCount = 0;
    },
    showSuccess: (state, action: PayloadAction<string>) => {
      const newNotif: Notification = {
        id: Math.random().toString(),
        message: action.payload,
        type: "success",
        read: false,
        timestamp: new Date().toISOString(),
        duration: 3000,
      };
      state.items.unshift(newNotif);
      state.notifications.unshift(newNotif);
      state.unreadCount++;
    },
    showError: (state, action: PayloadAction<string>) => {
      const newNotif: Notification = {
        id: Math.random().toString(),
        message: action.payload,
        type: "error",
        read: false,
        timestamp: new Date().toISOString(),
        duration: 4000,
      };
      state.items.unshift(newNotif);
      state.notifications.unshift(newNotif);
      state.unreadCount++;
    },
    reset: () => initialState,
  },
});

export const {
  addNotification,
  markAsRead,
  removeNotification,
  clearNotifications,
  showSuccess,
  showError,
  reset,
} = notificationSlice.actions;

export default notificationSlice.reducer;
