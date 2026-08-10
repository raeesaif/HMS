import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchSystemSettings, updateSystemSettings } from '@/services/superAdmin/systemSettingsService';

const KEY = ['superAdmin', 'systemSettings'];

export function useSystemSettings() {
  return useQuery({ queryKey: KEY, queryFn: fetchSystemSettings });
}

export function useUpdateSystemSettings() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ section, payload }) => updateSystemSettings(section, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY }),
  });
}
