import apiClient from "@/lib/apiClient";

const normalize = (specialty) => ({ ...specialty, id: specialty._id });

export const specialtyAPI = {
    getAll: async () => {
        const response = await apiClient.get("/specialties");
        return response.data.data.map(normalize);
    },
    create: async (data) => {
        const response = await apiClient.post("/specialties", data);
        return normalize(response.data.data);
    },
    update: async (specialtyId, data) => {
        const response = await apiClient.patch(`/specialties/${specialtyId}`, data);
        return normalize(response.data.data);
    },
    remove: async (specialtyId) => {
        const response = await apiClient.delete(`/specialties/${specialtyId}`);
        return response.data;
    },
};
