import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  fetchSecurity,
  changePassword,
  enableTwoFactor,
  disableTwoFactor,
  signOutSession,
  signOutAllSessions,
} from '@/services/superAdmin/securityService';

const KEY = ['superAdmin', 'security'];

export function useSecurity() {
  return useQuery({ queryKey: KEY, queryFn: fetchSecurity });
}

function useInvalidatingMutation(mutationFn) {
  const queryClient = useQueryClient();
  return useMutation({ mutationFn, onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY }) });
}

export function useChangePassword() {
  return useMutation({ mutationFn: changePassword });
}

export function useEnableTwoFactor() {
  return useInvalidatingMutation(enableTwoFactor);
}

export function useDisableTwoFactor() {
  return useInvalidatingMutation(disableTwoFactor);
}

export function useSignOutSession() {
  return useInvalidatingMutation(signOutSession);
}

export function useSignOutAllSessions() {
  return useInvalidatingMutation(signOutAllSessions);
}
