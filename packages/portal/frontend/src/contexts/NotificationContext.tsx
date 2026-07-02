import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from "react";
import {
  Notification,
  NotificationType,
  NotificationPriority,
  NotificationCategory,
  NotificationPreferences,
  SmartReminder,
  NotificationStats,
  NotificationContextType,
} from "../types/notifications";

// Estado inicial
const initialState = {
  notifications: [] as Notification[],
  preferences: {
    enabled: true,
    categories: {
      [NotificationCategory.ACTIVITIES]: true,
      [NotificationCategory.PROGRESS]: true,
      [NotificationCategory.ACHIEVEMENTS]: true,
      [NotificationCategory.SYSTEM]: true,
      [NotificationCategory.CONNECTION]: true,
      [NotificationCategory.REMINDERS]: true,
    },
    types: {
      [NotificationType.PROGRESS]: true,
      [NotificationType.ACHIEVEMENT]: true,
      [NotificationType.REMINDER]: true,
      [NotificationType.SYSTEM]: true,
      [NotificationType.CONNECTION]: true,
      [NotificationType.SYNC]: true,
      [NotificationType.WARNING]: true,
      [NotificationType.SUCCESS]: true,
      [NotificationType.ERROR]: true,
    },
    priorities: {
      [NotificationPriority.LOW]: true,
      [NotificationPriority.MEDIUM]: true,
      [NotificationPriority.HIGH]: true,
      [NotificationPriority.URGENT]: true,
    },
    sound: true,
    vibration: true,
    desktop: true,
    email: false,
    frequency: "immediate" as const,
    quietHours: {
      enabled: false,
      start: "22:00",
      end: "08:00",
    },
  } as NotificationPreferences,
  smartReminders: [] as SmartReminder[],
};

// Tipos de acciones
type NotificationAction =
  | { type: "ADD_NOTIFICATION"; payload: Notification }
  | { type: "MARK_AS_READ"; payload: string }
  | { type: "MARK_ALL_AS_READ" }
  | { type: "REMOVE_NOTIFICATION"; payload: string }
  | { type: "CLEAR_ALL" }
  | { type: "UPDATE_PREFERENCES"; payload: Partial<NotificationPreferences> }
  | { type: "ADD_SMART_REMINDER"; payload: SmartReminder }
  | {
      type: "UPDATE_SMART_REMINDER";
      payload: { id: string; updates: Partial<SmartReminder> };
    }
  | { type: "REMOVE_SMART_REMINDER"; payload: string }
  | {
      type: "LOAD_DATA";
      payload: {
        notifications: Notification[];
        preferences: NotificationPreferences;
        smartReminders: SmartReminder[];
      };
    };

// Reducer
const notificationReducer = (
  state: typeof initialState,
  action: NotificationAction
) => {
  switch (action.type) {
    case "ADD_NOTIFICATION":
      return {
        ...state,
        notifications: [action.payload, ...state.notifications].slice(0, 100), // Mantener solo las últimas 100
      };

    case "MARK_AS_READ":
      return {
        ...state,
        notifications: state.notifications.map((notification) =>
          notification.id === action.payload
            ? { ...notification, read: true }
            : notification
        ),
      };

    case "MARK_ALL_AS_READ":
      return {
        ...state,
        notifications: state.notifications.map((notification) => ({
          ...notification,
          read: true,
        })),
      };

    case "REMOVE_NOTIFICATION":
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.id !== action.payload
        ),
      };

    case "CLEAR_ALL":
      return {
        ...state,
        notifications: [],
      };

    case "UPDATE_PREFERENCES":
      return {
        ...state,
        preferences: { ...state.preferences, ...action.payload },
      };

    case "ADD_SMART_REMINDER":
      return {
        ...state,
        smartReminders: [...state.smartReminders, action.payload],
      };

    case "UPDATE_SMART_REMINDER":
      return {
        ...state,
        smartReminders: state.smartReminders.map((reminder) =>
          reminder.id === action.payload.id
            ? { ...reminder, ...action.payload.updates }
            : reminder
        ),
      };

    case "REMOVE_SMART_REMINDER":
      return {
        ...state,
        smartReminders: state.smartReminders.filter(
          (reminder) => reminder.id !== action.payload
        ),
      };

    case "LOAD_DATA":
      return {
        ...state,
        notifications: action.payload.notifications,
        preferences: action.payload.preferences,
        smartReminders: action.payload.smartReminders,
      };

    default:
      return state;
  }
};

// Crear contexto
const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

// Hook para usar el contexto
export const useNotifications = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications debe ser usado dentro de NotificationProvider"
    );
  }
  return context;
};

// Provider
export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState);

  // Cargar datos del localStorage al inicializar
  useEffect(() => {
    const savedData = localStorage.getItem("notification-data");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        dispatch({
          type: "LOAD_DATA",
          payload: {
            notifications: parsed.notifications || [],
            preferences: parsed.preferences || initialState.preferences,
            smartReminders: parsed.smartReminders || [],
          },
        });
      } catch (error) {
        console.error("Error cargando datos de notificaciones:", error);
      }
    }
  }, []);

  // Guardar datos en localStorage cuando cambie el estado
  useEffect(() => {
    localStorage.setItem(
      "notification-data",
      JSON.stringify({
        notifications: state.notifications,
        preferences: state.preferences,
        smartReminders: state.smartReminders,
      })
    );
  }, [state]);

  // Funciones del contexto
  const addNotification = useCallback(
    (notification: Omit<Notification, "id" | "timestamp" | "read">) => {
      const newNotification: Notification = {
        ...notification,
        id: `notification-${Date.now()}-${Math.random()
          .toString(36)
          .substr(2, 9)}`,
        timestamp: new Date(),
        read: false,
      };

      // Verificar si la notificación está habilitada según las preferencias
      if (
        state.preferences.enabled &&
        state.preferences.types[notification.type] &&
        state.preferences.categories[notification.category] &&
        state.preferences.priorities[notification.priority]
      ) {
        dispatch({ type: "ADD_NOTIFICATION", payload: newNotification });
      }
    },
    [state.preferences]
  );

  const markAsRead = useCallback((id: string) => {
    dispatch({ type: "MARK_AS_READ", payload: id });
  }, []);

  const markAllAsRead = useCallback(() => {
    dispatch({ type: "MARK_ALL_AS_READ" });
  }, []);

  const removeNotification = useCallback((id: string) => {
    dispatch({ type: "REMOVE_NOTIFICATION", payload: id });
  }, []);

  const clearAll = useCallback(() => {
    dispatch({ type: "CLEAR_ALL" });
  }, []);

  const updatePreferences = useCallback(
    (preferences: Partial<NotificationPreferences>) => {
      dispatch({ type: "UPDATE_PREFERENCES", payload: preferences });
    },
    []
  );

  const addSmartReminder = useCallback(
    (reminder: Omit<SmartReminder, "id">) => {
      const newReminder: SmartReminder = {
        ...reminder,
        id: `reminder-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      };
      dispatch({ type: "ADD_SMART_REMINDER", payload: newReminder });
    },
    []
  );

  const updateSmartReminder = useCallback(
    (id: string, updates: Partial<SmartReminder>) => {
      dispatch({ type: "UPDATE_SMART_REMINDER", payload: { id, updates } });
    },
    []
  );

  const removeSmartReminder = useCallback((id: string) => {
    dispatch({ type: "REMOVE_SMART_REMINDER", payload: id });
  }, []);

  const checkSmartReminders = useCallback(() => {
    const now = new Date();
    state.smartReminders.forEach((reminder) => {
      if (
        reminder.enabled &&
        reminder.nextTrigger &&
        new Date(reminder.nextTrigger) <= now
      ) {
        addNotification({
          type: NotificationType.REMINDER,
          title: "Recordatorio",
          message: reminder.message,
          priority: NotificationPriority.MEDIUM,
          category: NotificationCategory.REMINDERS,
        });

        // Actualizar el próximo trigger
        updateSmartReminder(reminder.id, {
          lastTriggered: now,
          nextTrigger: new Date(now.getTime() + 24 * 60 * 60 * 1000), // 24 horas después
        });
      }
    });
  }, [state.smartReminders, addNotification, updateSmartReminder]);

  const getUnreadCount = useCallback(() => {
    return state.notifications.filter((n) => !n.read).length;
  }, [state.notifications]);

  const getNotificationsByCategory = useCallback(
    (category: NotificationCategory) => {
      return state.notifications.filter((n) => n.category === category);
    },
    [state.notifications]
  );

  const getNotificationsByType = useCallback(
    (type: NotificationType) => {
      return state.notifications.filter((n) => n.type === type);
    },
    [state.notifications]
  );

  // Calcular estadísticas
  const stats: NotificationStats = {
    total: state.notifications.length,
    unread: getUnreadCount(),
    byCategory: Object.values(NotificationCategory).reduce((acc, category) => {
      acc[category] = getNotificationsByCategory(category).length;
      return acc;
    }, {} as Record<NotificationCategory, number>),
    byType: Object.values(NotificationType).reduce((acc, type) => {
      acc[type] = getNotificationsByType(type).length;
      return acc;
    }, {} as Record<NotificationType, number>),
    byPriority: Object.values(NotificationPriority).reduce((acc, priority) => {
      acc[priority] = state.notifications.filter(
        (n) => n.priority === priority
      ).length;
      return acc;
    }, {} as Record<NotificationPriority, number>),
    readRate:
      state.notifications.length > 0
        ? (state.notifications.filter((n) => n.read).length /
            state.notifications.length) *
          100
        : 0,
    averageResponseTime: 0, // TODO: Implementar cálculo de tiempo de respuesta
  };

  const contextValue: NotificationContextType = {
    notifications: state.notifications,
    preferences: state.preferences,
    stats,
    smartReminders: state.smartReminders,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll,
    updatePreferences,
    addSmartReminder,
    updateSmartReminder,
    removeSmartReminder,
    checkSmartReminders,
    getUnreadCount,
    getNotificationsByCategory,
    getNotificationsByType,
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};

