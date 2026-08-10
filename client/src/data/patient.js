// Canonical patient identity. Every patient page reads this single
// record instead of duplicating demographic data across files.

export const patientProfile = {
  id: 'PT-1042',
  patientId: 'PT-1042',
  firstName: 'Ali',
  lastName: 'Ahmed',
  name: 'Ali Ahmed',
  avatarInitials: 'AA',
  dateOfBirth: '12 Mar 1972',
  age: 54,
  gender: 'Male',
  phone: '+92 301 2233445',
  email: 'ali.ahmed@example.com',
  address: 'House 8, Street 3, G-9/1, Islamabad',
  profileImage: null,
  bloodGroup: 'B+',
  registrationDate: '14 Feb 2019',
  patientStatus: 'Active',
  emergencyContact: {
    name: 'Zainab Ahmed',
    relationship: 'Spouse',
    phone: '+92 301 9988776',
    address: 'House 8, Street 3, G-9/1, Islamabad',
  },
};

export const patientAccountStatus = {
  status: 'Active',
  accountCreated: '14 Feb 2019',
  lastProfileUpdate: '28 Jul 2026, 05:10 PM',
  lastLogin: '09 Aug 2026, 07:20 PM',
  passwordLastChanged: '11 Apr 2026',
};

export const patientProfileActivity = [
  { id: 'ppact-1', action: 'Login Activity', date: '09 Aug 2026', time: '07:20 PM', performedBy: 'Ali Ahmed' },
  { id: 'ppact-2', action: 'Contact Information Updated', date: '28 Jul 2026', time: '05:10 PM', performedBy: 'Ali Ahmed' },
  { id: 'ppact-3', action: 'Password Changed', date: '11 Apr 2026', time: '09:45 AM', performedBy: 'Ali Ahmed' },
  { id: 'ppact-4', action: 'Profile Picture Updated', date: '02 Jan 2026', time: '11:05 AM', performedBy: 'Ali Ahmed' },
];

// Patient ID, registration date, blood group, and status are set by the
// hospital at registration and are read-only on the Profile page.
export const profileLockedFields = ['Patient ID', 'Registration Date', 'Blood Group', 'Patient Status'];
