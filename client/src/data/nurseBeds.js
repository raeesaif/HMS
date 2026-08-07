export const bedWards = ['ICU', 'Emergency', 'General Ward', 'Pediatrics', 'Maternity', 'Surgery'];

export const bedStatuses = [
  { value: 'occupied', label: 'Occupied' },
  { value: 'available', label: 'Available' },
  { value: 'cleaning', label: 'Cleaning' },
  { value: 'reserved', label: 'Reserved' },
];

export const bedStatusUpdateOptions = [
  { value: 'occupied', label: 'Occupied' },
  { value: 'cleaning', label: 'Cleaning Required' },
  { value: 'available', label: 'Ready' },
  { value: 'isolation', label: 'Isolation' },
];

const patient = (overrides) => ({
  age: 0,
  gender: '',
  doctor: '',
  diagnosis: '',
  admissionDate: '',
  condition: 'stable',
  ...overrides,
});

export const nurseBedsData = [
  // ICU — 5 of 6 occupied/isolation (83%) to trigger "ICU Almost Full"
  {
    id: 'BED-ICU-01', bedNumber: 'ICU-01', ward: 'ICU', roomNumber: 'ICU Bay 1', status: 'occupied', assignedToday: false,
    patient: { id: 'P-20482', name: 'Kojo Antwi', ...patient({ age: 71, gender: 'Male', doctor: 'Dr. Sarpong', diagnosis: 'Post-stroke monitoring', admissionDate: '10 Jul 2026', condition: 'critical' }) },
  },
  {
    id: 'BED-ICU-02', bedNumber: 'ICU-02', ward: 'ICU', roomNumber: 'ICU Bay 2', status: 'occupied', assignedToday: false,
    patient: { id: 'P-20486', name: 'Kofi Duah', ...patient({ age: 63, gender: 'Male', doctor: 'Dr. Sarpong', diagnosis: 'COPD exacerbation', admissionDate: '08 Jul 2026', condition: 'critical' }) },
  },
  {
    id: 'BED-ICU-03', bedNumber: 'ICU-03', ward: 'ICU', roomNumber: 'ICU Bay 3', status: 'occupied', assignedToday: true,
    patient: { id: 'P-20489', name: 'Comfort Mensah', ...patient({ age: 58, gender: 'Female', doctor: 'Dr. Danso', diagnosis: 'Suspected sepsis, awaiting labs', admissionDate: '06 Aug 2026', condition: 'critical' }) },
  },
  {
    id: 'BED-ICU-04', bedNumber: 'ICU-04', ward: 'ICU', roomNumber: 'ICU Isolation 1', status: 'isolation', assignedToday: true,
    patient: { id: 'P-20490', name: 'Yaw Otoo', ...patient({ age: 55, gender: 'Male', doctor: 'Dr. Sarpong', diagnosis: 'Suspected MRSA infection', admissionDate: '06 Aug 2026', condition: 'observation' }) },
  },
  {
    id: 'BED-ICU-05', bedNumber: 'ICU-05', ward: 'ICU', roomNumber: 'ICU Bay 5', status: 'occupied', assignedToday: false,
    patient: { id: 'P-20491', name: 'Abena Tetteh', ...patient({ age: 67, gender: 'Female', doctor: 'Dr. Sarpong', diagnosis: 'Post-cardiac surgery monitoring', admissionDate: '02 Aug 2026', condition: 'observation' }) },
  },
  { id: 'BED-ICU-06', bedNumber: 'ICU-06', ward: 'ICU', roomNumber: 'ICU Bay 6', status: 'available', assignedToday: false, patient: null },

  // Emergency — 4 of 4 occupied (100%) to trigger "Ward Full"
  {
    id: 'BED-ER-01', bedNumber: 'ER-01', ward: 'Emergency', roomNumber: 'ER Bay 1', status: 'occupied', assignedToday: true,
    patient: { id: 'P-20484', name: 'Nana Asare', ...patient({ age: 46, gender: 'Male', doctor: 'Dr. Danso', diagnosis: 'Chest pain, ruling out MI', admissionDate: '06 Aug 2026', condition: 'critical' }) },
  },
  {
    id: 'BED-ER-02', bedNumber: 'ER-02', ward: 'Emergency', roomNumber: 'ER Bay 2', status: 'occupied', assignedToday: true,
    patient: { id: 'P-20492', name: 'Kwame Osei', ...patient({ age: 24, gender: 'Male', doctor: 'Dr. Danso', diagnosis: 'Road traffic accident, fractured femur', admissionDate: '06 Aug 2026', condition: 'observation' }) },
  },
  {
    id: 'BED-ER-03', bedNumber: 'ER-03', ward: 'Emergency', roomNumber: 'ER Bay 3', status: 'occupied', assignedToday: false,
    patient: { id: 'P-20493', name: 'Linda Appiah', ...patient({ age: 38, gender: 'Female', doctor: 'Dr. Danso', diagnosis: 'Severe migraine, IV fluids', admissionDate: '05 Aug 2026', condition: 'stable' }) },
  },
  {
    id: 'BED-ER-04', bedNumber: 'ER-04', ward: 'Emergency', roomNumber: 'ER Bay 4', status: 'occupied', assignedToday: false,
    patient: { id: 'P-20494', name: 'Isaac Ampofo', ...patient({ age: 51, gender: 'Male', doctor: 'Dr. Danso', diagnosis: 'Acute abdominal pain', admissionDate: '05 Aug 2026', condition: 'observation' }) },
  },

  // General Ward — 8 beds, mixed
  {
    id: 'BED-4B-01', bedNumber: '4B-01', ward: 'General Ward', roomNumber: 'Room 4B', status: 'occupied', assignedToday: false,
    patient: { id: 'P-20481', name: 'Ama Owusu', ...patient({ age: 34, gender: 'Female', doctor: 'Dr. Boateng', diagnosis: 'Hypertension follow-up', admissionDate: '12 Jul 2026', condition: 'stable' }) },
  },
  {
    id: 'BED-4B-06', bedNumber: '4B-06', ward: 'General Ward', roomNumber: 'Room 4B', status: 'occupied', assignedToday: false,
    patient: { id: 'P-20483', name: 'Yaa Serwaa', ...patient({ age: 7, gender: 'Female', doctor: 'Dr. Osei', diagnosis: 'Post-op appendectomy, day 2', admissionDate: '13 Jul 2026', condition: 'observation' }) },
  },
  {
    id: 'BED-4B-11', bedNumber: '4B-11', ward: 'General Ward', roomNumber: 'Room 4B', status: 'occupied', assignedToday: false,
    patient: { id: 'P-20485', name: 'Adjoa Frimpong', ...patient({ age: 52, gender: 'Female', doctor: 'Dr. Boateng', diagnosis: 'Type 2 diabetes management', admissionDate: '11 Jul 2026', condition: 'stable' }) },
  },
  {
    id: 'BED-MAT-09', bedNumber: 'MAT-09', ward: 'General Ward', roomNumber: 'Room 4B', status: 'occupied', assignedToday: false,
    patient: { id: 'P-20487', name: 'Efua Baidoo', ...patient({ age: 29, gender: 'Female', doctor: 'Dr. Quaye', diagnosis: 'Post-partum recovery', admissionDate: '14 Jul 2026', condition: 'stable' }) },
  },
  { id: 'BED-4B-03', bedNumber: '4B-03', ward: 'General Ward', roomNumber: 'Room 4B', status: 'available', assignedToday: false, patient: null },
  { id: 'BED-4B-08', bedNumber: '4B-08', ward: 'General Ward', roomNumber: 'Room 4B', status: 'available', assignedToday: false, patient: null },
  { id: 'BED-4B-13', bedNumber: '4B-13', ward: 'General Ward', roomNumber: 'Room 4B', status: 'cleaning', assignedToday: false, patient: null },
  { id: 'BED-4B-15', bedNumber: '4B-15', ward: 'General Ward', roomNumber: 'Room 4B', status: 'reserved', assignedToday: false, patient: null },

  // Pediatrics — 4 beds
  {
    id: 'BED-PED-14', bedNumber: '4B-14', ward: 'Pediatrics', roomNumber: 'Room 4B', status: 'occupied', assignedToday: false,
    patient: { id: 'P-20488', name: 'Kwabena Boadi', ...patient({ age: 19, gender: 'Male', doctor: 'Dr. Osei', diagnosis: 'Acute asthma exacerbation', admissionDate: '25 Jul 2026', condition: 'observation' }) },
  },
  {
    id: 'BED-PED-02', bedNumber: 'PED-02', ward: 'Pediatrics', roomNumber: 'Pediatric Ward', status: 'occupied', assignedToday: true,
    patient: { id: 'P-20495', name: 'Akosua Mensah', ...patient({ age: 4, gender: 'Female', doctor: 'Dr. Osei', diagnosis: 'Febrile seizure, observation', admissionDate: '06 Aug 2026', condition: 'observation' }) },
  },
  { id: 'BED-PED-03', bedNumber: 'PED-03', ward: 'Pediatrics', roomNumber: 'Pediatric Ward', status: 'available', assignedToday: false, patient: null },
  { id: 'BED-PED-04', bedNumber: 'PED-04', ward: 'Pediatrics', roomNumber: 'Pediatric Ward', status: 'reserved', assignedToday: false, patient: null },

  // Maternity — 4 beds
  {
    id: 'BED-MAT-01', bedNumber: 'MAT-01', ward: 'Maternity', roomNumber: 'Maternity Wing', status: 'occupied', assignedToday: true,
    patient: { id: 'P-20496', name: 'Gifty Owusu', ...patient({ age: 27, gender: 'Female', doctor: 'Dr. Quaye', diagnosis: 'Normal vaginal delivery, day 1', admissionDate: '06 Aug 2026', condition: 'stable' }) },
  },
  {
    id: 'BED-MAT-02', bedNumber: 'MAT-02', ward: 'Maternity', roomNumber: 'Maternity Wing', status: 'occupied', assignedToday: false,
    patient: { id: 'P-20497', name: 'Rebecca Yeboah', ...patient({ age: 31, gender: 'Female', doctor: 'Dr. Quaye', diagnosis: 'Pre-eclampsia monitoring', admissionDate: '04 Aug 2026', condition: 'observation' }) },
  },
  { id: 'BED-MAT-03', bedNumber: 'MAT-03', ward: 'Maternity', roomNumber: 'Maternity Wing', status: 'available', assignedToday: false, patient: null },
  { id: 'BED-MAT-04', bedNumber: 'MAT-04', ward: 'Maternity', roomNumber: 'Maternity Wing', status: 'cleaning', assignedToday: false, patient: null },

  // Surgery — 4 beds
  {
    id: 'BED-SUR-01', bedNumber: 'SUR-01', ward: 'Surgery', roomNumber: 'Surgical Recovery', status: 'occupied', assignedToday: false,
    patient: { id: 'P-20498', name: 'Kwesi Mensah', ...patient({ age: 58, gender: 'Male', doctor: 'Dr. Osei', diagnosis: 'Post-op tibia fracture repair', admissionDate: '03 Aug 2026', condition: 'stable' }) },
  },
  { id: 'BED-SUR-02', bedNumber: 'SUR-02', ward: 'Surgery', roomNumber: 'Surgical Recovery', status: 'cleaning', assignedToday: false, patient: null },
  { id: 'BED-SUR-03', bedNumber: 'SUR-03', ward: 'Surgery', roomNumber: 'Surgical Recovery', status: 'available', assignedToday: false, patient: null },
  { id: 'BED-SUR-04', bedNumber: 'SUR-04', ward: 'Surgery', roomNumber: 'Surgical Recovery', status: 'reserved', assignedToday: false, patient: null },
];
