// Canonical receptionist identity. Every reception page reads front-desk
// staff details from this single source instead of duplicating them.

export const receptionistProfile = {
  id: 'REC-2031',
  employeeId: 'REC-2031',
  firstName: 'Neha',
  lastName: 'Kapoor',
  name: 'Neha Kapoor',
  avatarInitials: 'NK',
  role: 'Receptionist',
  department: 'Front Desk',
  email: 'neha.kapoor@medicore.hospital',
  phone: '+92 300 5566778',
  gender: 'Female',
  dateOfBirth: '21 Feb 1994',
  address: 'Flat 14, Block C, Askari Heights, Islamabad',
  profileImage: null,
  dutyStatus: 'Available',
  employmentType: 'Full-Time',
  joiningDate: '11 Jan 2021',
  employmentStatus: 'Active',
  currentShift: '08:00 AM - 04:00 PM',
  assignedLocation: 'Main Campus — Front Desk',
  supervisor: 'Mr. Faisal Anwar (Admin Manager)',
  emergencyContact: {
    name: 'Rohan Kapoor',
    relationship: 'Spouse',
    phone: '+92 300 1122009',
    alternatePhone: '+92 321 6677889',
    address: 'Flat 14, Block C, Askari Heights, Islamabad',
  },
};

export const receptionistAccountStatus = {
  status: 'Active',
  accountCreated: '11 Jan 2021',
  lastProfileUpdate: '30 Jul 2026, 02:40 PM',
  lastLogin: '09 Aug 2026, 07:48 AM',
  passwordLastChanged: '02 May 2026',
};

export const receptionistProfileActivity = [
  { id: 'rpact-1', action: 'Login Activity', date: '09 Aug 2026', time: '07:48 AM', performedBy: 'Neha Kapoor' },
  { id: 'rpact-2', action: 'Contact Information Updated', date: '30 Jul 2026', time: '02:40 PM', performedBy: 'Neha Kapoor' },
  { id: 'rpact-3', action: 'Password Changed', date: '02 May 2026', time: '10:05 AM', performedBy: 'Neha Kapoor' },
  { id: 'rpact-4', action: 'Profile Picture Updated', date: '14 Feb 2026', time: '09:12 AM', performedBy: 'Neha Kapoor' },
];

// Fields locked to Admin control — Profile page renders these read-only and
// routes correction requests through ProfileCorrectionDialog-style flows.
export const profileLockedFields = ['Employee ID', 'Role', 'Department', 'Employment Status', 'Joining Date'];
