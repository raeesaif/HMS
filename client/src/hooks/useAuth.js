import { authAPI } from "@/apis/authapi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useLogin = () => {
    return useMutation({
        mutationKey: ["login"],
        mutationFn: (data) => authAPI.login({ ...data })
    })
}

export const useGetMe = ()=>{
    return useQuery({
        queryKey:["me"],
        queryFn:()=>authAPI.getMe()
    })
}

export const useUpdateProfile = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => authAPI.updateProfile(data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["me"] })
    })
}
