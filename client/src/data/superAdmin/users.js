import { getHospitalById } from './hospitals';

export const userRoleOptions = ['Hospital Admin', 'Doctor', 'Nurse', 'Receptionist', 'Patient'];
export const userStatusOptions = ['Active', 'Suspended', 'Invited'];

export const users = [
  { id: 'USR-1', name: 'James Whitfield', email: 'james.whitfield@medicoregeneral.com', role: 'Hospital Admin', hospitalId: 'HOSP-1001', status: 'Active', createdAt: '12 Jan 2023', lastLogin: '09 Aug 2026, 08:15 AM', avatarInitials: 'JW' },
  { id: 'USR-2', name: 'Sarah Mitchell', email: 'sarah.mitchell@medicoregeneral.com', role: 'Doctor', hospitalId: 'HOSP-1001', status: 'Active', createdAt: '03 Nov 2016', lastLogin: '09 Aug 2026, 07:48 AM', avatarInitials: 'SM' },
  { id: 'USR-3', name: 'Neha Kapoor', email: 'neha.kapoor@medicoregeneral.com', role: 'Receptionist', hospitalId: 'HOSP-1001', status: 'Active', createdAt: '11 Jan 2021', lastLogin: '09 Aug 2026, 07:20 AM', avatarInitials: 'NK' },
  { id: 'USR-4', name: 'Laura Bennett', email: 'laura.bennett@riversideclinic.org', role: 'Hospital Admin', hospitalId: 'HOSP-1002', status: 'Active', createdAt: '04 Mar 2024', lastLogin: '09 Aug 2026, 07:40 AM', avatarInitials: 'LB' },
  { id: 'USR-5', name: 'Ahmed Rahman', email: 'ahmed.rahman@riversideclinic.org', role: 'Doctor', hospitalId: 'HOSP-1002', status: 'Active', createdAt: '10 Mar 2024', lastLogin: '08 Aug 2026, 05:10 PM', avatarInitials: 'AR' },
  { id: 'USR-6', name: 'Michael Chen', email: 'michael.chen@sunrisepediatric.com', role: 'Hospital Admin', hospitalId: 'HOSP-1003', status: 'Active', createdAt: '28 Jul 2026', lastLogin: '08 Aug 2026, 06:20 PM', avatarInitials: 'MC' },
  { id: 'USR-7', name: 'Priya Nair', email: 'priya.nair@lakesideortho.com', role: 'Hospital Admin', hospitalId: 'HOSP-1004', status: 'Active', createdAt: '19 Sep 2023', lastLogin: '09 Aug 2026, 06:55 AM', avatarInitials: 'PN' },
  { id: 'USR-8', name: 'Tariq Javed', email: 'tariq.javed@lakesideortho.com', role: 'Nurse', hospitalId: 'HOSP-1004', status: 'Active', createdAt: '02 Oct 2023', lastLogin: '08 Aug 2026, 03:45 PM', avatarInitials: 'TJ' },
  { id: 'USR-9', name: 'Robert Kim', email: 'robert.kim@greenvalleyhealth.com', role: 'Hospital Admin', hospitalId: 'HOSP-1005', status: 'Suspended', createdAt: '02 Feb 2024', lastLogin: '22 Jun 2026, 02:10 PM', avatarInitials: 'RK' },
  { id: 'USR-10', name: 'Emily Foster', email: 'emily.foster@harborviewmaternity.com', role: 'Hospital Admin', hospitalId: 'HOSP-1006', status: 'Active', createdAt: '30 Nov 2022', lastLogin: '09 Aug 2026, 09:02 AM', avatarInitials: 'EF' },
  { id: 'USR-11', name: 'Daniel Osei', email: 'daniel.osei@northgatelabs.com', role: 'Hospital Admin', hospitalId: 'HOSP-1007', status: 'Invited', createdAt: '05 Aug 2026', lastLogin: '08 Aug 2026, 11:15 AM', avatarInitials: 'DO' },
  { id: 'USR-12', name: 'Sofia Alvarez', email: 'sofia.alvarez@eastwoodfamily.com', role: 'Hospital Admin', hospitalId: 'HOSP-1008', status: 'Suspended', createdAt: '14 Apr 2023', lastLogin: '30 Apr 2026, 09:30 AM', avatarInitials: 'SA' },
  { id: 'USR-13', name: 'Ali Ahmed', email: 'ali.ahmed@example.com', role: 'Patient', hospitalId: 'HOSP-1001', status: 'Active', createdAt: '14 Feb 2019', lastLogin: '09 Aug 2026, 07:20 PM', avatarInitials: 'AA' },
  { id: 'USR-14', name: 'Fatima Noor', email: 'fatima.noor@example.com', role: 'Patient', hospitalId: 'HOSP-1002', status: 'Active', createdAt: '02 Jun 2021', lastLogin: '07 Aug 2026, 04:12 PM', avatarInitials: 'FN' },
];

export function withUserDisplay(user) {
  const hospital = getHospitalById(user.hospitalId);
  return { ...user, hospitalName: hospital?.name ?? 'Unknown Hospital' };
}

export function getUsers() {
  return users.map(withUserDisplay);
}

export function getUserById(userId) {
  const user = users.find((item) => item.id === userId);
  return user ? withUserDisplay(user) : null;
}
