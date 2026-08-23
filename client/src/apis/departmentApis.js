import apiClient from "@/lib/apiClient";

const normalize = (department) => ({ ...department, id: department._id });

export const departmentAPI = {
    getAll: async () => {
        const response = await apiClient.get("/departments");
        return response.data.data.map(normalize);
    },
    create: async (data) => {
        const response = await apiClient.post("/departments", data);
        return normalize(response.data.data);
    },
    update: async (departmentId, data) => {
        const response = await apiClient.patch(`/departments/${departmentId}`, data);
        return normalize(response.data.data);
    },
    remove: async (departmentId) => {
        const response = await apiClient.delete(`/departments/${departmentId}`);
        return response.data;
    },
};
