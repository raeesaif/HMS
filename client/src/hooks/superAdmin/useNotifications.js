import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchNotifications, createAnnouncement, markNotificationAsRead } from '@/services/superAdmin/notificationService';

const KEY = ['superAdmin', 'notifications'];

export function useNotifications() {
  return useQuery({ queryKey: KEY, queryFn: fetchNotifications });
}

function useInvalidatingMutation(mutationFn) {
  const queryClient = useQueryClient();
  return useMutation({ mutationFn, onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY }) });
}

export function useCreateAnnouncement() {
  return useInvalidatingMutation(createAnnouncement);
}

export function useMarkNotificationAsRead() {
  return useInvalidatingMutation(markNotificationAsRead);
}
