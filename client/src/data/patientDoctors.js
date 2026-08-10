// Minimal doctor directory used for appointment booking and to join
// doctor/department display fields onto appointments, records, prescriptions,
// and lab reports without duplicating doctor data in every file.

export const departmentOptions = ['Cardiology', 'Pediatrics', 'Orthopedics', 'Dermatology', 'General Medicine'];

export const doctors = [
  {
    id: 'DR-1024',
    name: 'Dr. Sarah Mitchell',
    department: 'Cardiology',
    specialization: 'Interventional Cardiology',
    location: 'Main Campus — Cardiology Wing, Room 204',
    availableSlots: {
      '11 Aug 2026': ['09:00 AM', '09:30 AM', '11:00 AM', '02:00 PM'],
      '12 Aug 2026': ['10:00 AM', '10:30 AM', '03:00 PM'],
    },
  },
  {
    id: 'DR-1035',
    name: 'Dr. Imran Qureshi',
    department: 'Cardiology',
    specialization: 'General Cardiology',
    location: 'Main Campus — Cardiology Wing, Room 206',
    availableSlots: {
      '11 Aug 2026': ['10:00 AM', '01:00 PM'],
      '13 Aug 2026': ['09:30 AM', '11:30 AM', '03:30 PM'],
    },
  },
  {
    id: 'DR-1041',
    name: 'Dr. Ayesha Farooq',
    department: 'Pediatrics',
    specialization: 'General Pediatrics',
    location: 'Main Campus — Pediatrics Wing, Room 112',
    availableSlots: {
      '11 Aug 2026': ['09:00 AM', '10:00 AM', '02:30 PM'],
      '12 Aug 2026': ['09:30 AM', '11:00 AM'],
    },
  },
  {
    id: 'DR-1052',
    name: 'Dr. Bilal Siddiqui',
    department: 'Orthopedics',
    specialization: 'Sports Medicine',
    location: 'Main Campus — Orthopedics Wing, Room 305',
    availableSlots: {
      '12 Aug 2026': ['10:00 AM', '12:00 PM', '03:00 PM'],
      '14 Aug 2026': ['09:00 AM', '01:30 PM'],
    },
  },
  {
    id: 'DR-1067',
    name: 'Dr. Hina Baig',
    department: 'Dermatology',
    specialization: 'Clinical Dermatology',
    location: 'Main Campus — Dermatology Clinic, Room 118',
    availableSlots: {
      '13 Aug 2026': ['09:00 AM', '10:30 AM'],
      '14 Aug 2026': ['11:00 AM', '02:00 PM'],
    },
  },
];

export function getDoctorById(doctorId) {
  return doctors.find((doctor) => doctor.id === doctorId) ?? null;
}
