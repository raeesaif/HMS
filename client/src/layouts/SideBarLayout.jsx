import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
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
  LogOut,
  HeartPulse,
  User,
  Settings,
  FileText,
  TestTube,
  UsersRound,
} from 'lucide-react';
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarContent,
} from '@/components/ui/sidebar';

const SideBarLayout = () => {
  const navigate = useNavigate();

  const roleNavigation = {
    admin: [
      {
        icon: <LayoutDashboard size={18} />,
        name: 'Dashboard',
        path: '/admin/dashboard',
      },
      { icon: <Users size={18} />, name: 'Patients', path: '/admin/patients' },
      {
        icon: <Stethoscope size={18} />,
        name: 'Doctors & Staff',
        path: '/admin/staff',
      },
      {
        icon: <CalendarDays size={18} />,
        name: 'Appointments',
        path: '/admin/appointments',
      },
      {
        icon: <BedDouble size={18} />,
        name: 'Beds & Wards',
        path: '/admin/beds',
      },
      { icon: <Receipt size={18} />, name: 'Billing', path: '/admin/billing' },
      { icon: <Pill size={18} />, name: 'Pharmacy', path: '/admin/pharmacy' },
      {
        icon: <BarChart3 size={18} />,
        name: 'Reports',
        path: '/admin/reports',
      },
    ],
    doctor: [
      {
        icon: <LayoutDashboard size={18} />,
        name: 'Dashboard',
        path: '/doctor/dashboard',
      },
      {
        icon: <CalendarDays size={18} />,
        name: 'Appointments',
        path: '/doctor/appointments',
      },
      {
        icon: <Users size={18} />,
        name: 'My Patients',
        path: '/doctor/patients',
      },
      {
        icon: <ClipboardList size={18} />,
        name: 'Prescriptions',
        path: '/doctor/prescriptions',
      },
      {
        icon: <FileText size={18} />,
        name: 'Medical Records',
        path: '/doctor/medical-records',
      },
      {
        icon: <TestTube size={18} />,
        name: 'Lab Reports',
        path: '/doctor/lab-reports',
      },
      {
        icon: <Bell size={18} />,
        name: 'Notifications',
        path: '/doctor/notifications',
      },
      {
        icon: <User size={18} />,
        name: 'Profile',
        path: '/doctor/profile',
      },
      {
        icon: <Settings size={18} />,
        name: 'Settings',
        path: '/doctor/settings',
      },
    ],
    nurse: [
      {
        icon: <LayoutDashboard size={18} />,
        name: 'Dashboard',
        path: '/nurse/dashboard',
      },
      {
        icon: <Users size={18} />,
        name: 'Assigned Patients',
        path: '/nurse/patients',
      },
      {
        icon: <Activity size={18} />,
        name: 'Vitals Monitoring',
        path: '/nurse/vitals',
      },
      {
        icon: <Pill size={18} />,
        name: 'Medication Administration',
        path: '/nurse/medication',
      },
      {
        icon: <BedDouble size={18} />,
        name: 'Beds & Wards',
        path: '/nurse/beds',
      },
      {
        icon: <ClipboardList size={18} />,
        name: 'Tasks',
        path: '/nurse/tasks',
      },
      {
        icon: <Bell size={18} />,
        name: 'Notifications',
        path: '/nurse/notifications',
      },
      {
        icon: <User size={18} />,
        name: 'Profile',
        path: '/nurse/profile',
      },
      {
        icon: <Settings size={18} />,
        name: 'Settings',
        path: '/nurse/settings',
      },
    ],
    receptionist: [
      {
        icon: <LayoutDashboard size={18} />,
        name: 'Dashboard',
        path: '/reception/dashboard',
      },
      {
        icon: <Users size={18} />,
        name: 'Patients',
        path: '/reception/patients',
      },
      {
        icon: <CalendarDays size={18} />,
        name: 'Appointments',
        path: '/reception/appointments',
      },
      {
        icon: <ClipboardList size={18} />,
        name: 'Check-ins',
        path: '/reception/check-ins',
      },
      {
        icon: <BedDouble size={18} />,
        name: 'Bed Management',
        path: '/reception/beds',
      },
      {
        icon: <Stethoscope size={18} />,
        name: 'Doctors On Duty',
        path: '/reception/doctors',
      },
      {
        icon: <UsersRound size={18} />,
        name: 'Waiting Queue',
        path: '/reception/queue',
      },
      {
        icon: <Activity size={18} />,
        name: 'Emergency Patients',
        path: '/reception/emergency',
      },
      {
        icon: <Receipt size={18} />,
        name: 'Billing',
        path: '/reception/billing',
      },
      {
        icon: <Bell size={18} />,
        name: 'Notifications',
        path: '/reception/notifications',
      },
      {
        icon: <User size={18} />,
        name: 'Profile',
        path: '/reception/profile',
      },
      {
        icon: <Settings size={18} />,
        name: 'Settings',
        path: '/reception/settings',
      },
    ],
    patient: [
      {
        icon: <LayoutDashboard size={18} />,
        name: 'Dashboard',
        path: '/patient/dashboard',
      },
      {
        icon: <CalendarDays size={18} />,
        name: 'Appointments',
        path: '/patient/appointments',
      },
      {
        icon: <ClipboardList size={18} />,
        name: 'Medical Records',
        path: '/patient/medical-records',
      },
      {
        icon: <Pill size={18} />,
        name: 'Prescriptions',
        path: '/patient/prescriptions',
      },
      {
        icon: <TestTube size={18} />,
        name: 'Lab Reports',
        path: '/patient/lab-reports',
      },
      {
        icon: <Receipt size={18} />,
        name: 'Billing',
        path: '/patient/billing',
      },
      {
        icon: <Bell size={18} />,
        name: 'Notifications',
        path: '/patient/notifications',
      },
      {
        icon: <User size={18} />,
        name: 'Profile',
        path: '/patient/profile',
      },
      {
        icon: <Settings size={18} />,
        name: 'Settings',
        path: '/patient/settings',
      },
    ],
  };

  const roleLabel = {
    admin: 'Admin workspace',
    doctor: 'Doctor workspace',
    nurse: 'Nurse workspace',
    receptionist: 'Front desk workspace',
    patient: 'Patient workspace',
  };

  const role = 'doctor';
  // const navigation = roleNavigation[role] || roleNavigation.admin;
  const navigation = roleNavigation.doctor;
  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <>
      <Sidebar collapsible="icon" style={{ '--sidebar': '#0077B6' }}>
        <SidebarHeader className="border-b border-white/10">
          <div className="flex items-center gap-3 px-2 py-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#00B4D8]">
              <HeartPulse size={18} className="text-white" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-base font-bold text-white">MediCore</span>
              <span className="text-xs text-white/70">{roleLabel[role]}</span>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu className="gap-1 px-2 py-4">
            {navigation?.map((item) => (
              <SidebarMenuItem key={item.name}>
                <NavLink to={item.path}>
                  {({ isActive }) => (
                    <SidebarMenuButton
                      isActive={isActive}
                      className="text-white/80 hover:bg-white/10 hover:text-white data-[active=true]:bg-black/15 data-[active=true]:text-white data-[active=true]:font-semibold cursor-pointer "
                    >
                      <span className="flex items-center gap-3">
                        {item.icon}
                        <span>{item.name}</span>
                      </span>
                    </SidebarMenuButton>
                  )}
                </NavLink>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="border-t border-white/10">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                type="button"
                onClick={handleLogout}
                className="text-white/90 hover:bg-white/10 hover:text-white cursor-pointer"
              >
                <LogOut size={18} />
                <span className="font-semibold">Sign out</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </>
  );
};

export default SideBarLayout;
