import { authAPI } from '@/apis/authApis';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/store/authstore';

export const useLogin = () => {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: (data) => authAPI.login({ ...data }),
  });
};

export const useGetMe = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  return useQuery({
    queryKey: ['me'],
    queryFn: () => authAPI.getMe(),
    enabled: Boolean(accessToken),
  });
};

export const useRegister = () => {
  return useMutation({
    mutationKey: ['register'],
    mutationFn: (data) => authAPI.register(data),
  });
};

export const useDoctors = (departmentId) => {
  return useQuery({
    queryKey: ['doctors', departmentId],
    queryFn: () => authAPI.getDoctors(departmentId),
    enabled: Boolean(departmentId),
  });
};

export const useDoctorsList = () => {
  return useQuery({
    queryKey: ['doctors', 'all'],
    queryFn: () => authAPI.getDoctors(),
  });
};

export const useNursesList = () => {
  return useQuery({
    queryKey: ['nurses'],
    queryFn: () => authAPI.getNurses(),
  });
};

export const useReceptionistsList = () => {
  return useQuery({
    queryKey: ['receptionists'],
    queryFn: () => authAPI.getReceptionists(),
  });
};

export const usePatientsList = () => {
  return useQuery({
    queryKey: ['patients'],
    queryFn: () => authAPI.getPatients(),
  });
};

export const useUpdatePassword = () => {
  return useMutation({
    mutationKey: ['update-password'],
    mutationFn: (data) => authAPI.updatePassword(data),
  });
};
