import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  fetchHospitals,
  createHospital,
  updateHospital,
  suspendHospital,
  activateHospital,
  deleteHospital,
} from '@/services/superAdmin/hospitalService';

const KEY = ['superAdmin', 'hospitals'];

export function useHospitals() {
  return useQuery({ queryKey: KEY, queryFn: fetchHospitals });
}

function useInvalidatingMutation(mutationFn) {
  const queryClient = useQueryClient();
  return useMutation({ mutationFn, onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY }) });
}

export function useCreateHospital() {
  return useInvalidatingMutation(createHospital);
}

export function useUpdateHospital() {
  return useInvalidatingMutation(({ hospitalId, payload }) => updateHospital(hospitalId, payload));
}

export function useSuspendHospital() {
  return useInvalidatingMutation(suspendHospital);
}

export function useActivateHospital() {
  return useInvalidatingMutation(activateHospital);
}

export function useDeleteHospital() {
  return useInvalidatingMutation(deleteHospital);
}
