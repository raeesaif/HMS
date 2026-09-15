import { appointmentAPI } from '@/apis/appointmentApis';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useAppointmentsList = () => {
  return useQuery({
    queryKey: ['appointments'],
    queryFn: () => appointmentAPI.getAll(),
  });
};

export const useCreateAppointment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => appointmentAPI.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['appointments'] }),
  });
};
