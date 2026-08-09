// Mock data for the Doctor Dashboard. Shaped to match component props 1:1
// so swapping these for API responses later is a drop-in change.

export const doctorProfile = {
  name: 'Sarah Mitchell',
  department: 'Cardiology',
  shift: '08:00 AM - 04:00 PM',
  availability: 'Available',
  avatarInitials: 'SM',

  // Extended fields for the Profile page — kept on the same object so every
  // page reads doctor identity from a single source.
  id: 'DOC-1024',
  employeeId: 'DOC-1024',
  firstName: 'Sarah',
  lastName: 'Mitchell',
  professionalTitle: 'Consultant Cardiologist',
  email: 'sarah.mitchell@medicore.hospital',
  phone: '+92 300 1122334',
  gender: 'Female',
  dateOfBirth: '14 May 1985',
  address: 'House 22, Street 6, F-8/2, Islamabad',
  profileImage: null,
  role: 'Doctor',
  specialization: 'Interventional Cardiology',
  qualification: 'MBBS, FCPS (Cardiology)',
  licenseNumber: 'PMC-48213',
  experience: '12 years',
  employmentType: 'Full-Time',
  joiningDate: '03 Nov 2016',
  employmentStatus: 'Active',
  currentShift: '08:00 AM - 04:00 PM',
  assignedLocation: 'Main Campus — Cardiology Wing',
  supervisor: 'Dr. Imran Qureshi (Head of Cardiology)',
  bio: 'Consultant cardiologist with 12 years of experience in interventional cardiology, specializing in coronary artery disease management and emergency cardiac care.',
  expertiseAreas: ['Coronary Artery Disease', 'Angioplasty & Stenting', 'Heart Failure Management', 'Preventive Cardiology'],
  emergencyContact: {
    name: 'Ahmed Mitchell',
    relationship: 'Spouse',
    phone: '+92 300 9988776',
    alternatePhone: '+92 321 4455667',
    address: 'House 22, Street 6, F-8/2, Islamabad',
  },
};

export const availabilityOptions = ['Available', 'Busy', 'On Break', 'Off Duty'];

export const doctorWorkSchedule = [
  { day: 'Monday', shift: 'Morning', startTime: '09:00 AM', endTime: '03:00 PM', isOff: false },
  { day: 'Tuesday', shift: 'Morning', startTime: '09:00 AM', endTime: '03:00 PM', isOff: false },
  { day: 'Wednesday', shift: null, startTime: null, endTime: null, isOff: true },
  { day: 'Thursday', shift: 'Evening', startTime: '02:00 PM', endTime: '08:00 PM', isOff: false },
  { day: 'Friday', shift: 'Morning', startTime: '09:00 AM', endTime: '03:00 PM', isOff: false },
  { day: 'Saturday', shift: null, startTime: null, endTime: null, isOff: true },
  { day: 'Sunday', shift: null, startTime: null, endTime: null, isOff: true },
];

export const doctorAccountStatus = {
  status: 'Active',
  accountCreated: '03 Nov 2016',
  lastProfileUpdate: '02 Aug 2026, 04:15 PM',
  lastLogin: '09 Aug 2026, 08:02 AM',
  passwordLastChanged: '15 Jun 2026',
};

export const doctorProfileActivity = [
  { id: 'pact-1', action: 'Login Activity', date: '09 Aug 2026', time: '08:02 AM', performedBy: 'Dr. Sarah Mitchell' },
  { id: 'pact-2', action: 'Contact Information Updated', date: '02 Aug 2026', time: '04:15 PM', performedBy: 'Dr. Sarah Mitchell' },
  { id: 'pact-3', action: 'Password Changed', date: '15 Jun 2026', time: '11:30 AM', performedBy: 'Dr. Sarah Mitchell' },
  { id: 'pact-4', action: 'Profile Picture Updated', date: '02 Mar 2026', time: '09:20 AM', performedBy: 'Dr. Sarah Mitchell' },
  { id: 'pact-5', action: 'Profile Updated', date: '02 Mar 2026', time: '09:15 AM', performedBy: 'Dr. Sarah Mitchell' },
];

export const profileCorrectionFields = [
  'Employee ID',
  'Role',
  'Department',
  'Specialization',
  'License Number',
  'Joining Date',
  'Employment Status',
  'Qualification',
];

export const doctorStats = [
  {
    id: 'appointments',
    icon: 'calendar',
    tone: 'blue',
    value: 12,
    title: "Today's Appointments",
    description: 'Appointments scheduled today',
  },
  {
    id: 'waiting',
    icon: 'clock',
    tone: 'amber',
    value: 4,
    title: 'Waiting Patients',
    description: 'Patients waiting for consultation',
  },
  {
    id: 'completed',
    icon: 'check',
    tone: 'green',
    value: 8,
    title: 'Completed Consultations',
    description: 'Consultations completed today',
  },
  {
    id: 'patients',
    icon: 'users',
    tone: 'sky',
    value: 128,
    title: 'My Patients',
    description: 'Total patients under your care',
  },
  {
    id: 'critical',
    icon: 'alert',
    tone: 'red',
    value: 3,
    title: 'Critical Patients',
    description: 'Patients requiring immediate attention',
  },
  {
    id: 'labs',
    icon: 'flask',
    tone: 'purple',
    value: 5,
    title: 'Pending Lab Reports',
    description: 'Lab reports waiting for review',
  },
];

export const todaysAppointments = [
  { id: 'apt-1', time: '09:00 AM', patientName: 'Ali Ahmed', patientId: 'PT-1042', age: 54, gender: 'Male', type: 'Follow-up', status: 'Completed' },
  { id: 'apt-2', time: '09:30 AM', patientName: 'Fatima Noor', patientId: 'PT-1088', age: 39, gender: 'Female', type: 'Consultation', status: 'In Consultation' },
  { id: 'apt-3', time: '10:00 AM', patientName: 'Bilal Khan', patientId: 'PT-1121', age: 61, gender: 'Male', type: 'Check-up', status: 'Checked In' },
  { id: 'apt-4', time: '10:30 AM', patientName: 'Ayesha Raza', patientId: 'PT-1156', age: 28, gender: 'Female', type: 'New Patient', status: 'Waiting' },
  { id: 'apt-5', time: '11:00 AM', patientName: 'Usman Tariq', patientId: 'PT-1177', age: 45, gender: 'Male', type: 'Follow-up', status: 'Waiting' },
  { id: 'apt-6', time: '11:30 AM', patientName: 'Hina Farooq', patientId: 'PT-1203', age: 33, gender: 'Female', type: 'Consultation', status: 'Cancelled' },
];

export const upcomingAppointments = [
  { id: 'up-1', patientName: 'Zara Sheikh', time: '01:00 PM', type: 'Consultation', department: 'Cardiology', status: 'Upcoming' },
  { id: 'up-2', patientName: 'Imran Qureshi', time: '02:15 PM', type: 'Check-up', department: 'Cardiology', status: 'Upcoming' },
  { id: 'up-3', patientName: 'Sana Malik', time: '03:00 PM', type: 'Follow-up', department: 'Cardiology', status: 'Upcoming' },
  { id: 'up-4', patientName: 'Waqas Ahmed', time: '03:45 PM', type: 'New Patient', department: 'Cardiology', status: 'Upcoming' },
];

export const criticalPatients = [
  {
    id: 'cp-1',
    name: 'Kamran Ali',
    patientId: 'PT-0921',
    age: 67,
    gender: 'Male',
    ward: 'ICU',
    bed: 'ICU-04',
    condition: 'Critical',
    lastVital: { spo2: '88%', bp: '160/100' },
    assignedNurse: 'N. Fatima',
    lastUpdated: '5 min ago',
  },
  {
    id: 'cp-2',
    name: 'Rabia Hussain',
    patientId: 'PT-0955',
    age: 72,
    gender: 'Female',
    ward: 'ICU',
    bed: 'ICU-07',
    condition: 'Critical',
    lastVital: { spo2: '90%', bp: '155/95' },
    assignedNurse: 'N. Ahmed',
    lastUpdated: '12 min ago',
  },
  {
    id: 'cp-3',
    name: 'Tariq Javed',
    patientId: 'PT-1003',
    age: 58,
    gender: 'Male',
    ward: 'CCU',
    bed: 'CCU-02',
    condition: 'Critical',
    lastVital: { spo2: '91%', bp: '158/98' },
    assignedNurse: 'N. Bushra',
    lastUpdated: '20 min ago',
  },
];

export const pendingLabReports = [
  { id: 'lab-1', patientName: 'Ali Ahmed', testName: 'CBC', requestedDate: '08 Aug 2026', status: 'Pending Review' },
  { id: 'lab-2', patientName: 'Fatima Noor', testName: 'Lipid Profile', requestedDate: '07 Aug 2026', status: 'Pending Review' },
  { id: 'lab-3', patientName: 'Bilal Khan', testName: 'ECG', requestedDate: '07 Aug 2026', status: 'Ready' },
  { id: 'lab-4', patientName: 'Kamran Ali', testName: 'Troponin', requestedDate: '06 Aug 2026', status: 'Pending Review' },
  { id: 'lab-5', patientName: 'Rabia Hussain', testName: 'ABG', requestedDate: '06 Aug 2026', status: 'Ready' },
];

export const recentActivity = [
  { id: 'act-1', type: 'assigned', description: 'New patient assigned', patientName: 'Ayesha Raza', timestamp: '10 min ago' },
  { id: 'act-2', type: 'checked-in', description: 'Patient checked in', patientName: 'Bilal Khan', timestamp: '25 min ago' },
  { id: 'act-3', type: 'lab', description: 'Lab report uploaded', patientName: 'Ali Ahmed', timestamp: '45 min ago' },
  { id: 'act-4', type: 'prescription', description: 'Prescription created', patientName: 'Fatima Noor', timestamp: '1 hr ago' },
  { id: 'act-5', type: 'vitals', description: 'Patient vitals updated', patientName: 'Kamran Ali', timestamp: '1 hr ago' },
  { id: 'act-6', type: 'note', description: 'Doctor note added', patientName: 'Tariq Javed', timestamp: '2 hr ago' },
  { id: 'act-7', type: 'transfer', description: 'Patient transferred to ICU', patientName: 'Rabia Hussain', timestamp: '3 hr ago' },
];

export const quickActions = [
  { id: 'qa-1', icon: 'calendar', label: 'View Appointments', description: "See today's schedule", path: '/doctor/appointments' },
  { id: 'qa-2', icon: 'users', label: 'View Patients', description: 'Manage your patients', path: '/doctor/patients' },
  { id: 'qa-3', icon: 'prescription', label: 'Create Prescription', description: 'Write a new prescription', path: '/doctor/prescriptions' },
  { id: 'qa-4', icon: 'records', label: 'View Medical Records', description: 'Access patient records', path: '/doctor/medical-records' },
  { id: 'qa-5', icon: 'lab', label: 'Review Lab Reports', description: 'Check pending results', path: '/doctor/lab-reports' },
];

export const doctorAlerts = [
  { id: 'al-1', priority: 'Critical', message: 'Kamran Ali (ICU-04) requires immediate attention — SpO2 88%.', timestamp: '5 min ago' },
  { id: 'al-2', priority: 'High', message: 'New lab report available for Ali Ahmed (CBC).', timestamp: '20 min ago' },
  { id: 'al-3', priority: 'Medium', message: 'Rabia Hussain has abnormal vital signs — BP 155/95.', timestamp: '30 min ago' },
  { id: 'al-4', priority: 'Low', message: 'Follow-up appointment with Zara Sheikh is due today.', timestamp: '1 hr ago' },
];
