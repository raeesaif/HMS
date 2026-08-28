import apiClient from "@/lib/apiClient";

const normalizeHospital = (hospital) => ({ ...hospital, id: hospital._id });

export const hospitalAPI = {
  create: async (payload) => {
    const response = await apiClient.post("/hospitals", payload);
    const { hospital, admin } = response.data.data;
    return { hospital: normalizeHospital(hospital), admin };
  },
};
