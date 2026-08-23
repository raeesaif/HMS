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
