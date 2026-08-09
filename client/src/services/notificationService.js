import { notifications } from '@/data/receptionistNotifications';
import { simulateRequest } from '@/services/apiClient';

export function fetchNotifications() {
  return simulateRequest(notifications);
}

export function markNotificationAsRead(notificationId) {
  return simulateRequest({ id: notificationId, isRead: true });
}

export function markAllNotificationsAsRead() {
  return simulateRequest({ success: true });
}
