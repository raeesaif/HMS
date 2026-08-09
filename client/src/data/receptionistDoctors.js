// Doctor duty roster used across Dashboard, Doctors On Duty, and Appointments
// (for doctor selection). Cross-referenced by id from appointments/queue/emergency data.

export const doctorStatusOptions = ['Available', 'Busy', 'On Break', 'Off Duty', 'Emergency Only'];

export const doctorsOnDuty = [
  {
    id: 'DR-1024',
    name: 'Dr. Sarah Mitchell',
    department: 'Cardiology',
    specialization: 'Interventional Cardiology',
    shift: '08:00 AM - 04:00 PM',
    status: 'Available',
    currentPatients: 2,
    nextAvailableSlot: '11:30 AM',
  },
  {
    id: 'DR-1035',
    name: 'Dr. Imran Qureshi',
    department: 'Cardiology',
    specialization: 'General Cardiology',
    shift: '08:00 AM - 04:00 PM',
    status: 'Busy',
    currentPatients: 4,
    nextAvailableSlot: '01:15 PM',
  },
  {
    id: 'DR-1041',
    name: 'Dr. Ayesha Farooq',
    department: 'Pediatrics',
    specialization: 'General Pediatrics',
    shift: '09:00 AM - 05:00 PM',
    status: 'Available',
    currentPatients: 1,
    nextAvailableSlot: '10:45 AM',
  },
  {
    id: 'DR-1052',
    name: 'Dr. Bilal Siddiqui',
    department: 'Orthopedics',
    specialization: 'Sports Medicine',
    shift: '10:00 AM - 06:00 PM',
    status: 'On Break',
    currentPatients: 0,
    nextAvailableSlot: '12:00 PM',
  },
  {
    id: 'DR-1067',
    name: 'Dr. Hina Baig',
    department: 'Dermatology',
    specialization: 'Clinical Dermatology',
    shift: '08:00 AM - 02:00 PM',
    status: 'Off Duty',
    currentPatients: 0,
    nextAvailableSlot: 'Tomorrow, 08:00 AM',
  },
  {
    id: 'DR-1078',
    name: 'Dr. Usman Raza',
    department: 'Emergency Medicine',
    specialization: 'Trauma & Emergency',
    shift: '24-Hour On Call',
    status: 'Emergency Only',
    currentPatients: 3,
    nextAvailableSlot: 'On emergency duty',
  },
  {
    id: 'DR-1089',
    name: 'Dr. Sana Malik',
    department: 'Gynecology',
    specialization: 'Obstetrics & Gynecology',
    shift: '09:00 AM - 05:00 PM',
    status: 'Available',
    currentPatients: 1,
    nextAvailableSlot: '11:00 AM',
  },
  {
    id: 'DR-1093',
    name: 'Dr. Kamran Ali',
    department: 'Neurology',
    specialization: 'Clinical Neurology',
    shift: '08:00 AM - 04:00 PM',
    status: 'Busy',
    currentPatients: 3,
    nextAvailableSlot: '02:30 PM',
  },
];

export const departmentOptions = [...new Set(doctorsOnDuty.map((doctor) => doctor.department))];

export function getDoctorById(doctorId) {
  return doctorsOnDuty.find((doctor) => doctor.id === doctorId) ?? null;
}
