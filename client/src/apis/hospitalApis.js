import apiClient from "@/lib/apiClient";

const normalizeHospital = (hospital) => ({ ...hospital, id: hospital._id });

const STATUS_LABELS = {
  trial: "Trial",
  active: "Active",
  inactive: "Inactive",
  suspended: "Suspended",
  expired: "Expired",
};

const formatDate = (value) => {
  if (!value) return null;
  return new Date(value).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatAddress = (address = {}) =>
  [address.addressLine1, address.addressLine2, address.city, address.state, address.country, address.postalCode]
    .filter(Boolean)
    .join(", ");

const normalizeHospitalListItem = (hospital) => {
  const admin = hospital.admin || {};
  const totalUsers = hospital.totalUser ?? 0;

  return {
    id: hospital._id,
    name: hospital.hospitalName,
    code: hospital.hospitalCode,
    email: hospital.hospitalEmail,
    phone: hospital.hospitalPhone,
    address: formatAddress(hospital.address),
    addressLine1: hospital.address?.addressLine1,
    addressLine2: hospital.address?.addressLine2,
    city: hospital.address?.city,
    state: hospital.address?.state,
    country: hospital.address?.country,
    postalCode: hospital.address?.postalCode,
    adminFirstName: admin.firstName,
    adminLastName: admin.lastName,
    adminName: admin.firstName ? `${admin.firstName} ${admin.lastName}` : "—",
    adminEmail: admin.email,
    adminPhone: admin.phone,
    plan: null,
    planDetails: null,
    status: STATUS_LABELS[hospital.status] ?? hospital.status,
    users: { total: totalUsers },
    totalUsers,
    registrationDate: formatDate(hospital.createdAt),
    lastActivity: formatDate(hospital.updatedAt),
    trialEndsAt: formatDate(hospital.trialEndsAt),
  };
};

export const hospitalAPI = {
  create: async (payload) => {
    const response = await apiClient.post("/hospitals", payload);
    const { hospital, admin } = response.data.data;
    return { hospital: normalizeHospital(hospital), admin };
  },

  getAll: async ({ page = 1, limit = 100 } = {}) => {
    const response = await apiClient.get("/get-hospitals", { params: { page, limit } });
    const { hospitals } = response.data.data;
    return hospitals.map(normalizeHospitalListItem);
  },

  getById: async (id) => {
    const response = await apiClient.get(`/hospitals/${id}`);
    return normalizeHospitalListItem(response.data.data);
  },

  update: async (id, payload) => {
    const response = await apiClient.patch(`/hospitals/${id}`, payload);
    const { hospital, admin } = response.data.data;
    return { hospital: normalizeHospital(hospital), admin };
  },

  remove: async (id) => {
    await apiClient.delete(`/hospitals/${id}`);
    return { id };
  },
};
