export interface UpdateNotificationProps {
  onUpdate: () => void;
  onDismiss: () => void;
  isVisible: boolean;
  /** ID único del componente (opcional) - se concatena con "update-notification-" */
  id?: string;
}
