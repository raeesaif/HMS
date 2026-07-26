import zod from 'zod';

export const AppointmentSchema = zod.object({
  patient: zod.string().min(1, 'Patient name is required'),
  doctor: zod.string().min(1, 'Doctor is required'),
  department: zod.string().min(1, 'Select a department'),
  date: zod.string().min(1, 'Date is required'),
  time: zod.string().min(1, 'Time is required'),
  status: zod.string().min(1, 'Select a status'),
});
