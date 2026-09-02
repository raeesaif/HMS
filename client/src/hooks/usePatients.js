import { usePatientsList } from '@/hooks/useAuth';

const formatDate = (value) => {
  if (!value) return '—';
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? '—'
    : date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
};

const toReceptionPatient = (patient) => ({
  id: patient._id,
  userId: patient.userId,
  firstName: patient.firstName,
  lastName: patient.lastName,
  name: `${patient.firstName} ${patient.lastName}`,
  age: patient.age ?? '—',
  gender: patient.gender ? patient.gender.charAt(0).toUpperCase() + patient.gender.slice(1) : '—',
  phone: patient.phone ?? '—',
  email: patient.email ?? '',
  bloodGroup: patient.bloodGroup ?? '—',
  department: patient.department,
  doctor: patient.doctor,
  patientStatus: patient.patientStatus,
  admissionDate: patient.admissionDate,
  lastVisit: '—',
  registeredOn: formatDate(patient.createdAt),
  status: patient.isActive ? 'Active' : 'Inactive',
  address: patient.address ?? '',
  identification: patient.identification ?? '',
  emergencyContact: patient.emergencyContact ?? null,
});

export function usePatients() {
  const { data, isLoading, isError, refetch } = usePatientsList();

  return {
    patients: (data ?? []).map(toReceptionPatient),
    isLoading,
    error: isError,
    reload: refetch,
  };
}
