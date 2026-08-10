import { receivedNotifications, sentAnnouncements, scheduledAnnouncements } from '@/data/superAdmin/notifications';
import { simulateRequest } from '@/services/apiClient';

export function fetchNotifications() {
  return simulateRequest({ received: receivedNotifications, sent: sentAnnouncements, scheduled: scheduledAnnouncements });
}

export function createAnnouncement(payload) {
  const status = payload.schedule ? 'Scheduled' : 'Sent';
  return simulateRequest({ id: `ANN-${Date.now()}`, status, createdAt: new Date().toISOString(), ...payload });
}

export function markNotificationAsRead(notificationId) {
  return simulateRequest({ id: notificationId, isRead: true });
}
