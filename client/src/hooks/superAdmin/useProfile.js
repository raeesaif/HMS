import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchProfile, updateProfile } from '@/services/superAdmin/profileService';

const KEY = ['superAdmin', 'profile'];

export function useSuperAdminProfile() {
  return useQuery({ queryKey: KEY, queryFn: fetchProfile });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation({ mutationFn: updateProfile, onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY }) });
}
