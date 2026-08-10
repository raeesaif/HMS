import { notifications } from '@/data/patientNotifications';
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

export function deleteNotification(notificationId) {
  return simulateRequest({ id: notificationId, deleted: true });
}
