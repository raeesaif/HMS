import { getDoctorById } from '@/data/patientDoctors';

export const visitTypeOptions = ['Consultation', 'Follow-up', 'Emergency', 'Procedure', 'Admission'];

export const medicalRecords = [
  {
    id: 'MR-4001',
    doctorId: 'DR-1024',
    date: '09 Aug 2026',
    visitType: 'Consultation',
    status: 'Finalized',
    diagnosis: 'Stable angina',
    clinicalNotes: 'Patient reports intermittent chest discomfort on exertion, relieved by rest. ECG shows no acute changes.',
    treatmentSummary: 'Continued on current cardiac medication regimen. Advised lifestyle modification.',
    followUpInstructions: 'Follow-up in 2 days for ECG review. Avoid strenuous activity until then.',
    attachments: [{ id: 'att-1', name: 'ECG_09Aug2026.pdf' }],
  },
  {
    id: 'MR-3998',
    doctorId: 'DR-1024',
    date: '20 Jul 2026',
    visitType: 'Follow-up',
    status: 'Finalized',
    diagnosis: 'Hypertension, controlled',
    clinicalNotes: 'Blood pressure well controlled on current medication. No new symptoms reported.',
    treatmentSummary: 'Continue current antihypertensive regimen.',
    followUpInstructions: 'Routine follow-up in 3 months.',
    attachments: [],
  },
  {
    id: 'MR-3950',
    doctorId: 'DR-1067',
    date: '01 Aug 2026',
    visitType: 'Consultation',
    status: 'Finalized',
    diagnosis: 'Contact dermatitis',
    clinicalNotes: 'Localized rash on forearm, likely allergic reaction to a new detergent. No signs of infection.',
    treatmentSummary: 'Topical corticosteroid cream prescribed for 2 weeks.',
    followUpInstructions: 'Follow-up in 2 weeks if symptoms persist. Avoid known irritant.',
    attachments: [{ id: 'att-2', name: 'Skin_Photo_01Aug2026.jpg' }],
  },
  {
    id: 'MR-3820',
    doctorId: 'DR-1035',
    date: '05 Jul 2026',
    visitType: 'Follow-up',
    status: 'Finalized',
    diagnosis: 'Coronary artery disease, stable',
    clinicalNotes: 'Routine review of coronary artery disease management. Patient asymptomatic.',
    treatmentSummary: 'No changes to current treatment plan.',
    followUpInstructions: 'Routine check-up in 6 months.',
    attachments: [],
  },
];

export function withRecordDisplay(record) {
  const doctor = getDoctorById(record.doctorId);
  return {
    ...record,
    doctorName: doctor?.name ?? 'Unknown Doctor',
    department: doctor?.department ?? '—',
  };
}

export function getMedicalRecords() {
  return medicalRecords.map(withRecordDisplay);
}
