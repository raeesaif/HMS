import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  fetchPlans,
  createPlan,
  updatePlan,
  duplicatePlan,
  archivePlan,
  activatePlan,
} from '@/services/superAdmin/subscriptionService';

const KEY = ['superAdmin', 'plans'];

export function usePlans() {
  return useQuery({ queryKey: KEY, queryFn: fetchPlans });
}

function useInvalidatingMutation(mutationFn) {
  const queryClient = useQueryClient();
  return useMutation({ mutationFn, onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY }) });
}

export function useCreatePlan() {
  return useInvalidatingMutation(createPlan);
}

export function useUpdatePlan() {
  return useInvalidatingMutation(({ planId, payload }) => updatePlan(planId, payload));
}

export function useDuplicatePlan() {
  return useInvalidatingMutation(duplicatePlan);
}

export function useArchivePlan() {
  return useInvalidatingMutation(archivePlan);
}

export function useActivatePlan() {
  return useInvalidatingMutation(activatePlan);
}
