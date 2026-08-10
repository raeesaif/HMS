import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchFeatures, createFeature, updateFeature, enableFeature, disableFeature } from '@/services/superAdmin/featureService';

const KEY = ['superAdmin', 'features'];

export function useFeatures() {
  return useQuery({ queryKey: KEY, queryFn: fetchFeatures });
}

function useInvalidatingMutation(mutationFn) {
  const queryClient = useQueryClient();
  return useMutation({ mutationFn, onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY }) });
}

export function useCreateFeature() {
  return useInvalidatingMutation(createFeature);
}

export function useUpdateFeature() {
  return useInvalidatingMutation(({ featureId, payload }) => updateFeature(featureId, payload));
}

export function useEnableFeature() {
  return useInvalidatingMutation(enableFeature);
}

export function useDisableFeature() {
  return useInvalidatingMutation(disableFeature);
}
