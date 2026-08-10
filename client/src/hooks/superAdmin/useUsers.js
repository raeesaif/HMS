import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchUsers, updateUser, suspendUser, activateUser, resetUserPassword } from '@/services/superAdmin/userService';

const KEY = ['superAdmin', 'users'];

export function useUsers() {
  return useQuery({ queryKey: KEY, queryFn: fetchUsers });
}

function useInvalidatingMutation(mutationFn) {
  const queryClient = useQueryClient();
  return useMutation({ mutationFn, onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY }) });
}

export function useUpdateUser() {
  return useInvalidatingMutation(({ userId, payload }) => updateUser(userId, payload));
}

export function useSuspendUser() {
  return useInvalidatingMutation(suspendUser);
}

export function useActivateUser() {
  return useInvalidatingMutation(activateUser);
}

export function useResetUserPassword() {
  return useMutation({ mutationFn: resetUserPassword });
}
