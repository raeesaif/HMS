// Centralized sidebar navigation for every role in the HMS. SideBarLayout
// reads from here instead of each role hardcoding its own nav list, so a
// new page only needs to be added in one place to show up in the sidebar.
//
// Shape per role:
//   - Most roles: a flat array of { icon, name, path } items, where `icon`
//     is an icon *component* (not a rendered element) — render it as
//     <item.icon size={18} /> at the call site. Keeping this a plain .js
//     module (no JSX) means it can be imported from anywhere without a
//     JSX-aware loader.
//   - Grouped roles (e.g. superAdmin): an array of { group, items } sections,
//     where items is the same { icon, name, path } shape. SideBarLayout
//     detects this shape (presence of `.group`) and renders section labels.

import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Stethoscope,
  BedDouble,
  Receipt,
  Pill,
  BarChart3,
  ClipboardList,
  Activity,
  Bell,
  User,
  Settings,
  FileText,
  TestTube,
  UsersRound,
  Building2,
  Layers,
  CreditCard,
  Puzzle,
  ScrollText,
  LifeBuoy,
  Settings2,
  ShieldCheck,
} from 'lucide-react';

export const roleNavigation = {
  admin: [
    { icon: LayoutDashboard, name: 'Dashboard', path: '/admin/dashboard' },
    { icon: Users, name: 'Patients', path: '/admin/patients' },
    { icon: Stethoscope, name: 'Doctors & Staff', path: '/admin/staff' },
    { icon: CalendarDays, name: 'Appointments', path: '/admin/appointments' },
    { icon: BedDouble, name: 'Beds & Wards', path: '/admin/beds' },
    { icon: Receipt, name: 'Billing', path: '/admin/billing' },
    { icon: Pill, name: 'Pharmacy', path: '/admin/pharmacy' },
    { icon: BarChart3, name: 'Reports', path: '/admin/reports' },
    { icon: Settings, name: 'Settings', path: '/admin/settings' },
  ],
  doctor: [
    { icon: LayoutDashboard, name: 'Dashboard', path: '/doctor/dashboard' },
    { icon: CalendarDays, name: 'Appointments', path: '/doctor/appointments' },
    { icon: Users, name: 'My Patients', path: '/doctor/patients' },
    { icon: ClipboardList, name: 'Prescriptions', path: '/doctor/prescriptions' },
    { icon: FileText, name: 'Medical Records', path: '/doctor/medical-records' },
    { icon: TestTube, name: 'Lab Reports', path: '/doctor/lab-reports' },
    { icon: Bell, name: 'Notifications', path: '/doctor/notifications' },
    { icon: User, name: 'Profile', path: '/doctor/profile' },
    { icon: Settings, name: 'Settings', path: '/doctor/settings' },
  ],
  nurse: [
    { icon: LayoutDashboard, name: 'Dashboard', path: '/nurse/dashboard' },
    { icon: Users, name: 'Assigned Patients', path: '/nurse/patients' },
    { icon: Activity, name: 'Vitals Monitoring', path: '/nurse/vitals' },
    { icon: Pill, name: 'Medication Administration', path: '/nurse/medication' },
    { icon: BedDouble, name: 'Beds & Wards', path: '/nurse/beds' },
    { icon: ClipboardList, name: 'Tasks', path: '/nurse/tasks' },
    { icon: Bell, name: 'Notifications', path: '/nurse/notifications' },
    { icon: User, name: 'Profile', path: '/nurse/profile' },
    { icon: Settings, name: 'Settings', path: '/nurse/settings' },
  ],
  receptionist: [
    { icon: LayoutDashboard, name: 'Dashboard', path: '/reception/dashboard' },
    { icon: Users, name: 'Patients', path: '/reception/patients' },
    { icon: CalendarDays, name: 'Appointments', path: '/reception/appointments' },
    { icon: ClipboardList, name: 'Check-ins', path: '/reception/check-ins' },
    { icon: BedDouble, name: 'Bed Management', path: '/reception/beds' },
    { icon: Stethoscope, name: 'Doctors On Duty', path: '/reception/doctors' },
    { icon: UsersRound, name: 'Waiting Queue', path: '/reception/queue' },
    { icon: Activity, name: 'Emergency Patients', path: '/reception/emergency' },
    { icon: Receipt, name: 'Billing', path: '/reception/billing' },
    { icon: Bell, name: 'Notifications', path: '/reception/notifications' },
    { icon: User, name: 'Profile', path: '/reception/profile' },
    { icon: Settings, name: 'Settings', path: '/reception/settings' },
  ],
  patient: [
    { icon: LayoutDashboard, name: 'Dashboard', path: '/patient/dashboard' },
    { icon: CalendarDays, name: 'Appointments', path: '/patient/appointments' },
    { icon: ClipboardList, name: 'Medical Records', path: '/patient/medical-records' },
    { icon: Pill, name: 'Prescriptions', path: '/patient/prescriptions' },
    { icon: TestTube, name: 'Lab Reports', path: '/patient/lab-reports' },
    { icon: Receipt, name: 'Billing', path: '/patient/billing' },
    { icon: Bell, name: 'Notifications', path: '/patient/notifications' },
    { icon: User, name: 'Profile', path: '/patient/profile' },
    { icon: Settings, name: 'Settings', path: '/patient/settings' },
  ],
  superAdmin: [
    {
      group: 'PLATFORM',
      items: [
        { icon: LayoutDashboard, name: 'Dashboard', path: '/super-admin/dashboard' },
        { icon: Building2, name: 'Hospitals', path: '/super-admin/hospitals' },
        { icon: Users, name: 'Users', path: '/super-admin/users' },
      ],
    },
    {
      group: 'CATALOG',
      items: [
        { icon: Layers, name: 'Department', path: '/super-admin/departments' },
        { icon: Stethoscope, name: 'Specialty', path: '/super-admin/specialties' },
      ],
    },
    {
      group: 'BUSINESS',
      items: [
        { icon: CreditCard, name: 'Subscriptions', path: '/super-admin/subscriptions' },
        { icon: Puzzle, name: 'Features', path: '/super-admin/features' },
        { icon: Receipt, name: 'Billing', path: '/super-admin/billing' },
      ],
    },
    {
      group: 'INSIGHTS',
      items: [
        { icon: BarChart3, name: 'Analytics', path: '/super-admin/analytics' },
        { icon: ScrollText, name: 'Activity Logs', path: '/super-admin/activity-logs' },
      ],
    },
    {
      group: 'MANAGEMENT',
      items: [
        { icon: LifeBuoy, name: 'Support', path: '/super-admin/support' },
        { icon: Bell, name: 'Notifications', path: '/super-admin/notifications' },
      ],
    },
    {
      group: 'SYSTEM',
      items: [
        { icon: Settings2, name: 'System Settings', path: '/super-admin/system-settings' },
        { icon: User, name: 'Profile', path: '/super-admin/profile' },
        { icon: ShieldCheck, name: 'Security', path: '/super-admin/security' },
      ],
    },
  ],
};

export const roleLabel = {
  admin: 'Admin workspace',
  doctor: 'Doctor workspace',
  nurse: 'Nurse workspace',
  receptionist: 'Front desk workspace',
  patient: 'Patient workspace',
  superAdmin: 'Super Admin',
};

// Flattened { path: name } lookup, used by SuperAdminLayout (and reusable by
// any layout) to resolve the current page title without re-walking groups.
export function flattenNavigation(navigation) {
  const isGrouped = Array.isArray(navigation) && navigation.length > 0 && 'group' in navigation[0];
  const items = isGrouped ? navigation.flatMap((section) => section.items) : (navigation ?? []);
  return items.reduce((map, item) => {
    map[item.path] = item.name;
    return map;
  }, {});
}
