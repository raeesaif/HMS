// Mock data for the Doctor Medical Records page. Records are keyed by
// patientId and joined against doctorPatients.js / doctorPrescriptions.js at
// render time — demographics and prescriptions are never duplicated here.

export const recordTypes = [
  'Consultation',
  'Admission',
  'Diagnosis',
  'Treatment',
  'Surgery',
  'Discharge',
  'Follow-up',
  'Lab',
  'Prescription',
  'Note',
];

export const diagnosisTypes = ['Primary', 'Secondary', 'Differential'];
export const diagnosisStatuses = ['Active', 'Resolved', 'Chronic'];
export const allergyTypes = ['Medication Allergy', 'Food Allergy', 'Environmental Allergy'];
export const allergySeverities = ['Mild', 'Moderate', 'Severe', 'Critical'];
export const clinicalNoteTypes = ['Consultation Note', 'Progress Note', 'Follow-up Note', 'Treatment Note', 'Observation'];
export const labReportStatuses = ['Normal', 'Abnormal', 'Pending'];

const EMPTY_RECORD = {
  consultations: [],
  diagnoses: [],
  labReports: [],
  vitalsHistory: [],
  allergyDetails: [],
  clinicalNotes: [],
};

export const medicalRecordsByPatient = {
  'PT-1042': {
    consultations: [
      {
        id: 'CON-5001',
        date: '08 Aug 2026',
        doctor: 'Dr. Sarah Mitchell',
        reasonForVisit: 'Follow-up on hypertension management',
        symptoms: 'Occasional dizziness in the morning',
        diagnosis: 'Essential hypertension — controlled',
        treatmentPlan: 'Continue current medication, reduce salt intake',
        followUpDate: '12 Sep 2026',
        clinicalNotes: 'BP well controlled on current regimen. Advised to monitor at home.',
        createdBy: 'Dr. Sarah Mitchell',
        createdAt: '08 Aug 2026, 09:22 AM',
      },
      {
        id: 'CON-4988',
        date: '12 Jul 2026',
        doctor: 'Dr. Sarah Mitchell',
        reasonForVisit: 'Routine blood pressure check',
        symptoms: 'None reported',
        diagnosis: 'Essential hypertension — controlled',
        treatmentPlan: 'Continue current medication',
        followUpDate: '08 Aug 2026',
        clinicalNotes: 'Stable. No medication changes required.',
        createdBy: 'Dr. Sarah Mitchell',
        createdAt: '12 Jul 2026, 10:05 AM',
      },
    ],
    diagnoses: [
      {
        id: 'DX-1001',
        diagnosis: 'Essential hypertension',
        type: 'Primary',
        dateDiagnosed: '14 Mar 2022',
        doctor: 'Dr. Sarah Mitchell',
        status: 'Chronic',
        notes: 'Well controlled with amlodipine and lifestyle changes.',
      },
      {
        id: 'DX-1002',
        diagnosis: 'Borderline dyslipidemia',
        type: 'Secondary',
        dateDiagnosed: '10 Jul 2026',
        doctor: 'Dr. Sarah Mitchell',
        status: 'Active',
        notes: 'Started on atorvastatin, recheck lipid profile in 3 months.',
      },
    ],
    labReports: [
      {
        id: 'LAB-7001',
        testName: 'Lipid Profile',
        testDate: '10 Jul 2026',
        result: 'LDL 142 mg/dL',
        referenceRange: '< 100 mg/dL',
        status: 'Abnormal',
        isAbnormal: true,
        doctor: 'Dr. Sarah Mitchell',
      },
      {
        id: 'LAB-6988',
        testName: 'Basic Metabolic Panel',
        testDate: '12 Jul 2026',
        result: 'Within normal limits',
        referenceRange: 'Normal',
        status: 'Normal',
        isAbnormal: false,
        doctor: 'Dr. Sarah Mitchell',
      },
    ],
    vitalsHistory: [
      { date: '08 Aug 2026', time: '09:15 AM', bp: '128/82', hr: '76 bpm', temp: '98.4°F', rr: '16/min', spo2: '98%', weight: '78 kg', height: '175 cm', recordedBy: 'N. Fatima', abnormal: [] },
      { date: '12 Jul 2026', time: '09:45 AM', bp: '132/86', hr: '80 bpm', temp: '98.2°F', rr: '16/min', spo2: '98%', weight: '79 kg', height: '175 cm', recordedBy: 'N. Fatima', abnormal: [] },
      { date: '02 Jun 2026', time: '10:00 AM', bp: '138/90', hr: '82 bpm', temp: '98.6°F', rr: '17/min', spo2: '97%', weight: '80 kg', height: '175 cm', recordedBy: 'N. Ahmed', abnormal: ['bp'] },
    ],
    allergyDetails: [
      { id: 'ALG-2001', name: 'Penicillin', type: 'Medication Allergy', reaction: 'Skin rash and hives', severity: 'Moderate', recordedDate: '14 Mar 2022', recordedBy: 'Dr. Sarah Mitchell' },
    ],
    clinicalNotes: [
      {
        id: 'NOTE-3001',
        noteType: 'Consultation Note',
        author: 'Dr. Sarah Mitchell',
        date: '08 Aug 2026',
        time: '09:22 AM',
        content: 'Patient reports occasional morning dizziness, likely postural. BP log reviewed and within target range.',
        followUpInstructions: 'Review in 4 weeks with home BP log',
        attachments: [],
      },
      {
        id: 'NOTE-2988',
        noteType: 'Progress Note',
        author: 'Dr. Sarah Mitchell',
        date: '12 Jul 2026',
        time: '10:10 AM',
        content: 'Lipid profile shows borderline high LDL. Discussed dietary changes and started statin therapy.',
        followUpInstructions: 'Recheck lipid profile in 3 months',
        attachments: ['lipid-profile-10jul2026.pdf'],
      },
    ],
  },
  'PT-0921': {
    consultations: [
      {
        id: 'CON-4990',
        date: '06 Aug 2026',
        doctor: 'Dr. Sarah Mitchell',
        reasonForVisit: 'Acute chest pain, admitted to ICU',
        symptoms: 'Diaphoresis, shortness of breath, chest pain 8/10',
        diagnosis: 'STEMI — acute coronary syndrome',
        treatmentPlan: 'Emergency PCI performed, ICU monitoring, cardiac rehab referral on discharge',
        followUpDate: '20 Aug 2026',
        clinicalNotes: 'ECG showed ST elevation. Emergency cath lab activated.',
        createdBy: 'Dr. Sarah Mitchell',
        createdAt: '06 Aug 2026, 10:05 AM',
      },
    ],
    diagnoses: [
      {
        id: 'DX-1003',
        diagnosis: 'STEMI — acute coronary syndrome',
        type: 'Primary',
        dateDiagnosed: '06 Aug 2026',
        doctor: 'Dr. Sarah Mitchell',
        status: 'Active',
        notes: 'Emergency PCI performed same day. ICU monitoring ongoing.',
      },
    ],
    labReports: [
      {
        id: 'LAB-7010',
        testName: 'Troponin',
        testDate: '06 Aug 2026',
        result: '2.4 ng/mL',
        referenceRange: '< 0.04 ng/mL',
        status: 'Abnormal',
        isAbnormal: true,
        doctor: 'Dr. Sarah Mitchell',
      },
      {
        id: 'LAB-7011',
        testName: 'ECG',
        testDate: '06 Aug 2026',
        result: 'ST elevation, anterior leads',
        referenceRange: 'Normal sinus rhythm',
        status: 'Abnormal',
        isAbnormal: true,
        doctor: 'Dr. Sarah Mitchell',
      },
    ],
    vitalsHistory: [
      { date: '08 Aug 2026', time: '08:50 AM', bp: '160/100', hr: '112 bpm', temp: '100.2°F', rr: '24/min', spo2: '88%', weight: '81 kg', height: '178 cm', recordedBy: 'N. Fatima', abnormal: ['bp', 'hr', 'spo2', 'rr'] },
      { date: '07 Aug 2026', time: '08:30 AM', bp: '150/96', hr: '104 bpm', temp: '99.4°F', rr: '22/min', spo2: '91%', weight: '81 kg', height: '178 cm', recordedBy: 'N. Fatima', abnormal: ['bp', 'hr', 'spo2'] },
      { date: '06 Aug 2026', time: '09:50 AM', bp: '168/104', hr: '118 bpm', temp: '100.8°F', rr: '26/min', spo2: '86%', weight: '81 kg', height: '178 cm', recordedBy: 'N. Ahmed', abnormal: ['bp', 'hr', 'spo2', 'rr', 'temp'] },
    ],
    allergyDetails: [],
    clinicalNotes: [
      {
        id: 'NOTE-3010',
        noteType: 'Treatment Note',
        author: 'Dr. Sarah Mitchell',
        date: '06 Aug 2026',
        time: '10:10 AM',
        content: 'Emergency PCI to LAD, single stent placed. Patient stabilized and transferred to ICU for monitoring.',
        followUpInstructions: 'Daily ICU rounds, high-intensity statin therapy started',
        attachments: ['cath-lab-report-06aug2026.pdf'],
      },
    ],
  },
  'PT-1121': {
    consultations: [
      {
        id: 'CON-4995',
        date: '08 Aug 2026',
        doctor: 'Dr. Sarah Mitchell',
        reasonForVisit: 'Annual cardiac checkup',
        symptoms: 'None reported',
        diagnosis: 'Coronary artery disease — post-stent, stable',
        treatmentPlan: 'Continue current regimen, annual cardiac checkup',
        followUpDate: '15 Feb 2027',
        clinicalNotes: 'No new symptoms. ECG unremarkable.',
        createdBy: 'Dr. Sarah Mitchell',
        createdAt: '08 Aug 2026, 10:20 AM',
      },
      {
        id: 'CON-4700',
        date: '15 Feb 2026',
        doctor: 'Dr. Sarah Mitchell',
        reasonForVisit: 'Post-stent follow-up',
        symptoms: 'None reported',
        diagnosis: 'Coronary artery disease — post-stent, stable',
        treatmentPlan: 'Continue clopidogrel, monitor for bleeding',
        followUpDate: '08 Aug 2026',
        clinicalNotes: 'Stent site healing well. No complications.',
        createdBy: 'Dr. Sarah Mitchell',
        createdAt: '15 Feb 2026, 09:00 AM',
      },
    ],
    diagnoses: [
      {
        id: 'DX-1010',
        diagnosis: 'Coronary artery disease',
        type: 'Primary',
        dateDiagnosed: '03 Nov 2021',
        doctor: 'Dr. Sarah Mitchell',
        status: 'Chronic',
        notes: 'Stent placement in 2021 (LAD). Stable since.',
      },
      {
        id: 'DX-1011',
        diagnosis: 'Type 2 diabetes',
        type: 'Secondary',
        dateDiagnosed: '20 Jan 2018',
        doctor: 'Dr. Sarah Mitchell',
        status: 'Chronic',
        notes: 'Managed with metformin, diabetic for 8 years.',
      },
    ],
    labReports: [
      {
        id: 'LAB-7020',
        testName: 'ECG',
        testDate: '10 Feb 2026',
        result: 'Normal sinus rhythm',
        referenceRange: 'Normal sinus rhythm',
        status: 'Normal',
        isAbnormal: false,
        doctor: 'Dr. Sarah Mitchell',
      },
    ],
    vitalsHistory: [
      { date: '08 Aug 2026', time: '10:05 AM', bp: '122/78', hr: '70 bpm', temp: '98.2°F', rr: '15/min', spo2: '99%', weight: '80 kg', height: '172 cm', recordedBy: 'N. Bushra', abnormal: [] },
      { date: '15 Feb 2026', time: '09:10 AM', bp: '126/80', hr: '74 bpm', temp: '98.4°F', rr: '16/min', spo2: '98%', weight: '81 kg', height: '172 cm', recordedBy: 'N. Bushra', abnormal: [] },
    ],
    allergyDetails: [
      { id: 'ALG-2010', name: 'Sulfa drugs', type: 'Medication Allergy', reaction: 'Difficulty breathing', severity: 'Severe', recordedDate: '03 Nov 2021', recordedBy: 'Dr. Sarah Mitchell' },
    ],
    clinicalNotes: [
      {
        id: 'NOTE-3020',
        noteType: 'Follow-up Note',
        author: 'Dr. Sarah Mitchell',
        date: '08 Aug 2026',
        time: '10:25 AM',
        content: 'Annual review unremarkable. Patient adherent to medication and diet plan.',
        followUpInstructions: 'Return in 6 months or sooner if symptomatic',
        attachments: [],
      },
    ],
  },
  'PT-1240': {
    consultations: [
      {
        id: 'CON-4850',
        date: '20 Jul 2026',
        doctor: 'Dr. Sarah Mitchell',
        reasonForVisit: 'Review of recent Holter monitor results',
        symptoms: 'Intermittent palpitation episodes, well tolerated',
        diagnosis: 'Paroxysmal atrial fibrillation',
        treatmentPlan: 'Continue anticoagulation, review Holter results at next visit',
        followUpDate: '09 Aug 2026',
        clinicalNotes: 'Holter confirmed intermittent AFib episodes. Continuing apixaban.',
        createdBy: 'Dr. Sarah Mitchell',
        createdAt: '20 Jul 2026, 11:15 AM',
      },
    ],
    diagnoses: [
      {
        id: 'DX-1020',
        diagnosis: 'Paroxysmal atrial fibrillation',
        type: 'Primary',
        dateDiagnosed: '02 Aug 2025',
        doctor: 'Dr. Sarah Mitchell',
        status: 'Active',
        notes: 'On anticoagulation therapy, monitoring episode frequency.',
      },
    ],
    labReports: [
      {
        id: 'LAB-7030',
        testName: 'Holter Monitor',
        testDate: '27 Jul 2026',
        result: 'Intermittent AFib episodes recorded',
        referenceRange: 'Normal sinus rhythm',
        status: 'Abnormal',
        isAbnormal: true,
        doctor: 'Dr. Sarah Mitchell',
      },
    ],
    vitalsHistory: [
      { date: '20 Jul 2026', time: '11:10 AM', bp: '118/76', hr: '88 bpm', temp: '98.3°F', rr: '16/min', spo2: '98%', weight: '63 kg', height: '165 cm', recordedBy: 'N. Ahmed', abnormal: [] },
    ],
    allergyDetails: [
      { id: 'ALG-2020', name: 'Iodine contrast', type: 'Medication Allergy', reaction: 'Facial swelling', severity: 'Moderate', recordedDate: '02 Aug 2025', recordedBy: 'Dr. Sarah Mitchell' },
    ],
    clinicalNotes: [
      {
        id: 'NOTE-3030',
        noteType: 'Observation',
        author: 'Dr. Sarah Mitchell',
        date: '20 Jul 2026',
        time: '11:20 AM',
        content: 'Patient tolerating anticoagulation well, no bleeding events reported.',
        followUpInstructions: 'Report any prolonged episodes or dizziness immediately',
        attachments: [],
      },
    ],
  },
};

export function getMedicalRecords(patientId) {
  return medicalRecordsByPatient[patientId] ?? EMPTY_RECORD;
}
