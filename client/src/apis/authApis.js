import apiClient from "@/lib/apiClient";

export const authAPI = {
    login: async(data)=>{
        const response = await apiClient.post("/auth/login",data)
        // backend returns `token`, normalize to `accessToken`
        return { ...response.data, accessToken: response.data.token }
    },
    getMe: async()=>{
        const response = await apiClient.get("/auth/me")
        return response.data.data
    },
    updateProfile: async(data)=>{
        const response = await apiClient.patch("/auth/update-profile",data)
        return response.data

}
}
