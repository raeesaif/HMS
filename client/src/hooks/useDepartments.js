import { departmentAPI } from "@/apis/departmentApis";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useDepartments = () => {
    return useQuery({
        queryKey: ["departments"],
        queryFn: () => departmentAPI.getAll()
    })
}

export const useCreateDepartment = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => departmentAPI.create(data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["departments"] })
    })
}

export const useUpdateDepartment = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ departmentId, payload }) => departmentAPI.update(departmentId, payload),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["departments"] })
    })
}

export const useDeleteDepartment = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (departmentId) => departmentAPI.remove(departmentId),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["departments"] })
    })
}
