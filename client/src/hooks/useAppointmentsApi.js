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

export const useAvailableSlots = (doctorId, date) => {
  return useQuery({
    queryKey: ['appointment-slots', doctorId, date],
    queryFn: () => appointmentAPI.getAvailableSlots(doctorId, date),
    enabled: Boolean(doctorId && date),
  });
};
