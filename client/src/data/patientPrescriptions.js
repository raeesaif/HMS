import { getDoctorById } from '@/data/patientDoctors';

export const prescriptions = [
  {
    id: 'RX-3101',
    doctorId: 'DR-1024',
    medicine: 'Atorvastatin',
    strength: '20mg',
    dosage: '1 tablet',
    frequency: 'Once daily, at night',
    duration: '90 days',
    startDate: '09 Aug 2026',
    endDate: '07 Nov 2026',
    status: 'Active',
    instructions: 'Take with or without food. Avoid grapefruit juice.',
    issuedDate: '09 Aug 2026',
    refillsRemaining: 2,
  },
  {
    id: 'RX-3102',
    doctorId: 'DR-1024',
    medicine: 'Aspirin',
    strength: '75mg',
    dosage: '1 tablet',
    frequency: 'Once daily, morning',
    duration: '90 days',
    startDate: '09 Aug 2026',
    endDate: '07 Nov 2026',
    status: 'Active',
    instructions: 'Take after breakfast to reduce stomach irritation.',
    issuedDate: '09 Aug 2026',
    refillsRemaining: 2,
  },
  {
    id: 'RX-3080',
    doctorId: 'DR-1067',
    medicine: 'Hydrocortisone Cream',
    strength: '1%',
    dosage: 'Thin layer',
    frequency: 'Twice daily',
    duration: '14 days',
    startDate: '01 Aug 2026',
    endDate: '15 Aug 2026',
    status: 'Active',
    instructions: 'Apply to affected area only. Discontinue if irritation worsens.',
    issuedDate: '01 Aug 2026',
    refillsRemaining: 0,
  },
  {
    id: 'RX-2990',
    doctorId: 'DR-1024',
    medicine: 'Amoxicillin',
    strength: '500mg',
    dosage: '1 capsule',
    frequency: 'Three times daily',
    duration: '7 days',
    startDate: '10 Jun 2026',
    endDate: '17 Jun 2026',
    status: 'Completed',
    instructions: 'Complete the full course even if symptoms improve.',
    issuedDate: '10 Jun 2026',
    refillsRemaining: 0,
  },
  {
    id: 'RX-2850',
    doctorId: 'DR-1035',
    medicine: 'Metformin',
    strength: '500mg',
    dosage: '1 tablet',
    frequency: 'Twice daily',
    duration: '30 days',
    startDate: '01 Apr 2026',
    endDate: '01 May 2026',
    status: 'Expired',
    instructions: 'Take with meals.',
    issuedDate: '01 Apr 2026',
    refillsRemaining: 0,
  },
];

export function withPrescriptionDisplay(prescription) {
  const doctor = getDoctorById(prescription.doctorId);
  return { ...prescription, doctorName: doctor?.name ?? 'Unknown Doctor' };
}

export function getPrescriptions() {
  return prescriptions.map(withPrescriptionDisplay);
}
