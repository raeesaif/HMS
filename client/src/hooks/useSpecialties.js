import { specialtyAPI } from "@/apis/specialtyApis";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useSpecialties = () => {
    return useQuery({
        queryKey: ["specialties"],
        queryFn: () => specialtyAPI.getAll()
    })
}

export const useCreateSpecialty = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => specialtyAPI.create(data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["specialties"] })
    })
}

export const useUpdateSpecialty = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ specialtyId, payload }) => specialtyAPI.update(specialtyId, payload),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["specialties"] })
    })
}

export const useDeleteSpecialty = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (specialtyId) => specialtyAPI.remove(specialtyId),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["specialties"] })
    })
}
