import { getDoctorById } from '@/data/patientDoctors';

export const labReports = [
  {
    id: 'LAB-7001',
    testName: 'Lipid Profile',
    doctorId: 'DR-1024',
    labDepartment: 'Clinical Chemistry',
    sampleDate: '08 Aug 2026',
    reportDate: '09 Aug 2026',
    status: 'Completed',
    result: [
      { parameter: 'Total Cholesterol', value: '198 mg/dL', referenceRange: '< 200 mg/dL' },
      { parameter: 'LDL', value: '118 mg/dL', referenceRange: '< 130 mg/dL' },
      { parameter: 'HDL', value: '46 mg/dL', referenceRange: '> 40 mg/dL' },
      { parameter: 'Triglycerides', value: '142 mg/dL', referenceRange: '< 150 mg/dL' },
    ],
    notes: 'Results within acceptable range. Continue current statin therapy.',
  },
  {
    id: 'LAB-7002',
    testName: 'ECG',
    doctorId: 'DR-1024',
    labDepartment: 'Cardiology Diagnostics',
    sampleDate: '09 Aug 2026',
    reportDate: null,
    status: 'Processing',
    result: [],
    notes: '',
  },
  {
    id: 'LAB-6980',
    testName: 'Complete Blood Count (CBC)',
    doctorId: 'DR-1035',
    labDepartment: 'Hematology',
    sampleDate: '05 Jul 2026',
    reportDate: '06 Jul 2026',
    status: 'Completed',
    result: [
      { parameter: 'Hemoglobin', value: '14.2 g/dL', referenceRange: '13.5 - 17.5 g/dL' },
      { parameter: 'WBC Count', value: '6,800 /µL', referenceRange: '4,500 - 11,000 /µL' },
      { parameter: 'Platelet Count', value: '250,000 /µL', referenceRange: '150,000 - 450,000 /µL' },
    ],
    notes: 'All values within normal limits.',
  },
  {
    id: 'LAB-6950',
    testName: 'HbA1c',
    doctorId: 'DR-1035',
    labDepartment: 'Clinical Chemistry',
    sampleDate: '01 Jul 2026',
    reportDate: null,
    status: 'Ordered',
    result: [],
    notes: '',
  },
  {
    id: 'LAB-6900',
    testName: 'Skin Biopsy',
    doctorId: 'DR-1067',
    labDepartment: 'Pathology',
    sampleDate: '02 Aug 2026',
    reportDate: null,
    status: 'Cancelled',
    result: [],
    notes: 'Cancelled — clinical diagnosis was sufficient, biopsy not required.',
  },
];

export function withLabReportDisplay(report) {
  const doctor = getDoctorById(report.doctorId);
  return { ...report, orderedBy: doctor?.name ?? 'Unknown Doctor' };
}

export function getLabReports() {
  return labReports.map(withLabReportDisplay);
}
