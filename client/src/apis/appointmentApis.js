import apiClient from '@/lib/apiClient';

const TYPE_LABELS = {
  'follow-up': 'Follow-up',
  newPaitent: 'New Patient',
  consultation: 'Consultation',
  'check-up': 'Check-up',
  procedure: 'Procedure',
};

const STATUS_LABELS = {
  scheduled: 'Scheduled',
  confirmed: 'Confirmed',
  cancelled: 'Cancelled',
  rejected: 'Rejected',
  completed: 'Completed',
};

const PRIORITY_LABELS = {
  normal: 'Normal',
  urgent: 'Urgent',
  emergency: 'Emergency',
};

const personName = (person) =>
  person ? `${person.firstName ?? ''} ${person.lastName ?? ''}`.trim() || 'Unknown' : 'Unknown';

const formatDate = (value) =>
  value
    ? new Date(value).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })
    : '—';

const normalize = (appointment) => ({
  ...appointment,
  id: appointment.appointmentId,
  patientId: appointment.patient?._id ?? appointment.patient,
  doctorId: appointment.doctor?._id ?? appointment.doctor,
  departmentId: appointment.department?._id ?? appointment.department,
  patientName: personName(appointment.patient),
  doctorName: personName(appointment.doctor),
  department: appointment.department?.name ?? '—',
  date: formatDate(appointment.appointmentDate),
  time: appointment.appoinmentTime ?? '',
  type: TYPE_LABELS[appointment.appoinmentType] ?? appointment.appoinmentType ?? '—',
  status: STATUS_LABELS[appointment.status] ?? appointment.status,
  priority: PRIORITY_LABELS[appointment.priority] ?? appointment.priority,
});

export const appointmentAPI = {
  getAll: async () => {
    const response = await apiClient.get('/get-appoinment');
    return response.data.data.map(normalize);
  },
  create: async (data) => {
    const response = await apiClient.post('/appoinment', data);
    return normalize(response.data.data);
  },
};
