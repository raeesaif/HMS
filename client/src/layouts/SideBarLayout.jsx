// // import { useNavigate } from 'react-router-dom';
// // import { MdOutlineDashboard } from 'react-icons/md';
// // import { AiOutlineBranches } from 'react-icons/ai';
// // import { TfiPackage } from 'react-icons/tfi';
// // import { TbPackages } from 'react-icons/tb';
// // import { TbReportAnalytics } from 'react-icons/tb';
// // import { VscGraph } from 'react-icons/vsc';
// // import { RiBaseStationLine } from 'react-icons/ri';
// // import { MdOutlineSettings } from 'react-icons/md';
// // import { MdOutlineWarehouse } from 'react-icons/md';
// // import { TbTruck } from 'react-icons/tb';
// // import { LuUsersRound } from 'react-icons/lu';
// // import { NavLink } from 'react-router-dom';
// // import {
// //   Sidebar,
// //   SidebarHeader,
// //   SidebarMenu,
// //   SidebarMenuItem,
// //   SidebarMenuButton,
// //   SidebarFooter,
// //   SidebarContent,
// // } from '@/components/ui/sidebar';
// // import { Badge } from '@/components/ui/badge';
// // import { Bell, BellDotIcon, LogOut, Shirt } from 'lucide-react';

// // const SideBarLayout = () => {
// //   const navigate = useNavigate();

// //   const roleNavigation = {
// //     admin: [
// //       {
// //         icon: <MdOutlineDashboard />,
// //         name: 'DashBoard',
// //         path: '/admin/dashboard',
// //       },
// //       {
// //         icon: <AiOutlineBranches />,
// //         name: 'Branches',
// //         path: '/admin/branches',
// //       },
// //       { icon: <TfiPackage />, name: 'Products', path: '/admin/products' },
// //       { icon: <TbPackages />, name: 'Inventory', path: '/admin/inventory' },
// //       {
// //         icon: <MdOutlineWarehouse />,
// //         name: 'Warehouse',
// //         path: '/admin/warehouse',
// //       },
// //       { icon: <TbTruck />, name: 'Vendors', path: '/admin/vendors' },
// //       { icon: <LuUsersRound />, name: 'Users', path: '/admin/users' },
// //       {
// //         icon: <TbReportAnalytics />,
// //         name: 'Restock Orders',
// //         path: '/admin/restock-orders',
// //       },
// //       { icon: <VscGraph />, name: 'Reports', path: '/admin/reports' },
// //       {
// //         icon: <RiBaseStationLine />,
// //         name: 'Online Orders',
// //         path: '/admin/online-orders',
// //       },
// //       {
// //         icon: <MdOutlineSettings />,
// //         name: 'Settings',
// //         path: '/admin/settings',
// //       },
// //     ],
// //     branchmanager: [
// //       {
// //         icon: <MdOutlineDashboard />,
// //         name: 'DashBoard',
// //         path: '/branch-manager/dashboard',
// //       },
// //       {
// //         icon: <TfiPackage />,
// //         name: 'Products',
// //         path: '/branch-manager/products',
// //       },
// //       {
// //         icon: <TbPackages />,
// //         name: 'Inventory',
// //         path: '/branch-manager/inventory',
// //       },
// //       {
// //         icon: <TbReportAnalytics />,
// //         name: 'Orders',
// //         path: '/branch-manager/orders',
// //       },
// //       {
// //         icon: <VscGraph />,
// //         name: 'Sales Analytics',
// //         path: '/branch-manager/sales',
// //       },
// //       { icon: <BellDotIcon />, name: 'Alerts', path: '/branch-manager/alerts' },
// //       {
// //         icon: <MdOutlineSettings />,
// //         name: 'Settings',
// //         path: '/branch-manager/settings',
// //       },
// //     ],
// //     warehousemanager: [
// //       {
// //         icon: <MdOutlineDashboard />,
// //         name: 'DashBoard',
// //         path: '/warehouse-manager/dashboard',
// //       },
// //       {
// //         icon: <TfiPackage />,
// //         name: 'Products',
// //         path: '/warehouse-manager/products',
// //       },
// //       {
// //         icon: <TbPackages />,
// //         name: 'Inventory',
// //         path: '/warehouse-manager/inventory',
// //       },
// //       {
// //         icon: <MdOutlineWarehouse />,
// //         name: 'Warehouse',
// //         path: '/warehouse-manager/warehouse',
// //       },
// //       {
// //         icon: <TbReportAnalytics />,
// //         name: 'Restock Orders',
// //         path: '/warehouse-manager/restock-orders',
// //       },
// //       {
// //         icon: <VscGraph />,
// //         name: 'Reports',
// //         path: '/warehouse-manager/reports',
// //       },
// //       {
// //         icon: <MdOutlineSettings />,
// //         name: 'Settings',
// //         path: '/warehouse-manager/settings',
// //       },
// //     ],
// //     vendor: [
// //       {
// //         icon: <MdOutlineDashboard />,
// //         name: 'DashBoard',
// //         path: '/vendor/dashboard',
// //       },
// //       { icon: <TfiPackage />, name: 'Products', path: '/vendor/products' },
// //       { icon: <TbReportAnalytics />, name: 'Orders', path: '/vendor/orders' },
// //       {
// //         icon: <MdOutlineSettings />,
// //         name: 'Settings',
// //         path: '/vendor/settings',
// //       },
// //     ],
// //   };

// //   const role = 'admin';
// //   const navigation = roleNavigation[role] || roleNavigation.admin;

// //   const handleLogout = () => {
// //     navigate('/login');
// //   };
// //   return (
// //     <>
// //       <Sidebar collapsible="icon" style={{ '--sidebar': '#141821' }}>
// //         <SidebarHeader>
// //           <div className="flex items-center gap-2 px-2 py-2">
// //             {/* <a to="/" className="flex items-center gap-2">
// //                             <img src="/logo.png" alt="BusinessInvest" loading="lazy" className="h-8 w-auto" />
// //                         </a> */}
// //             <p className="bg-primary py-2 px-3 rounded-2xl">
// //               <Shirt />
// //             </p>
// //             <Badge className="bg-slate-800 text-white font-bold text-lg rounded-md px-2 py-1">
// //               Clothify ERP
// //             </Badge>
// //           </div>
// //         </SidebarHeader>
// //         <SidebarContent>
// //           <SidebarMenu className="px-2 py-8 ">
// //             {navigation?.map((project) => (
// //               <SidebarMenuItem key={project.name} className="py-2">
// //                 <NavLink to={project.path}>
// //                   {({ isActive }) => (
// //                     <SidebarMenuButton isActive={isActive} asChild>
// //                       <span>
// //                         {project.icon}
// //                         <span>{project.name}</span>
// //                       </span>
// //                     </SidebarMenuButton>
// //                   )}
// //                 </NavLink>
// //               </SidebarMenuItem>
// //             ))}
// //           </SidebarMenu>
// //         </SidebarContent>
// //         <SidebarFooter>
// //           <SidebarMenu>
// //             <SidebarMenuItem>
// //               <SidebarMenuButton
// //                 type="button"
// //                 onClick={handleLogout}
// //                 className="text-slate-300 hover:text-white hover:bg-white/10 cursor-pointer"
// //               >
// //                 <LogOut />
// //                 <span>Log out</span>
// //               </SidebarMenuButton>
// //             </SidebarMenuItem>
// //           </SidebarMenu>
// //         </SidebarFooter>
// //       </Sidebar>
// //     </>
// //   );
// // };

// // export default SideBarLayout;
// import { useNavigate } from 'react-router-dom';
// import { NavLink } from 'react-router-dom';
// import {
//   LayoutDashboard,
//   CalendarCheck,
//   Users,
//   Stethoscope,
//   BedDouble,
//   CreditCard,
//   Pill,
//   FileBarChart,
//   ClipboardList,
//   Activity,
//   Bell,
//   Settings,
//   LogOut,
//   HeartPulse,
// } from 'lucide-react';
// import {
//   Sidebar,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuItem,
//   SidebarMenuButton,
//   SidebarFooter,
//   SidebarContent,
// } from '@/components/ui/sidebar';
// import { Badge } from '@/components/ui/badge';

// const SideBarLayout = () => {
//   const navigate = useNavigate();

//   const roleNavigation = {
//     admin: [
//       {
//         icon: <LayoutDashboard />,
//         name: 'Dashboard',
//         path: '/admin/dashboard',
//       },
//       { icon: <Users />, name: 'Patients', path: '/admin/patients' },
//       { icon: <Stethoscope />, name: 'Doctors & Staff', path: '/admin/staff' },
//       {
//         icon: <CalendarCheck />,
//         name: 'Appointments',
//         path: '/admin/appointments',
//       },
//       { icon: <BedDouble />, name: 'Bed / Ward', path: '/admin/beds' },
//       { icon: <CreditCard />, name: 'Billing', path: '/admin/billing' },
//       { icon: <Pill />, name: 'Pharmacy', path: '/admin/pharmacy' },
//       {
//         icon: <FileBarChart />,
//         name: 'Reports & Analytics',
//         path: '/admin/reports',
//       },
//       { icon: <Settings />, name: 'Settings', path: '/admin/settings' },
//     ],
//     doctor: [
//       {
//         icon: <LayoutDashboard />,
//         name: 'Dashboard',
//         path: '/doctor/dashboard',
//       },
//       {
//         icon: <CalendarCheck />,
//         name: 'Appointments',
//         path: '/doctor/appointments',
//       },
//       { icon: <Users />, name: 'My Patients', path: '/doctor/patients' },
//       {
//         icon: <ClipboardList />,
//         name: 'Prescriptions',
//         path: '/doctor/prescriptions',
//       },
//       { icon: <FileBarChart />, name: 'Reports', path: '/doctor/reports' },
//       { icon: <Settings />, name: 'Settings', path: '/doctor/settings' },
//     ],
//     nurse: [
//       {
//         icon: <LayoutDashboard />,
//         name: 'Dashboard',
//         path: '/nurse/dashboard',
//       },
//       { icon: <Users />, name: 'Assigned Patients', path: '/nurse/patients' },
//       { icon: <Activity />, name: 'Vitals Monitoring', path: '/nurse/vitals' },
//       {
//         icon: <Pill />,
//         name: 'Medication Schedule',
//         path: '/nurse/medication',
//       },
//       { icon: <BedDouble />, name: 'Bed / Ward', path: '/nurse/beds' },
//       { icon: <Settings />, name: 'Settings', path: '/nurse/settings' },
//     ],
//     receptionist: [
//       {
//         icon: <LayoutDashboard />,
//         name: 'Dashboard',
//         path: '/reception/dashboard',
//       },
//       {
//         icon: <CalendarCheck />,
//         name: "Today's Appointments",
//         path: '/reception/appointments',
//       },
//       {
//         icon: <ClipboardList />,
//         name: "Today's Check-ins",
//         path: '/reception/check-ins',
//       },
//       { icon: <BedDouble />, name: 'Available Beds', path: '/reception/beds' },
//       {
//         icon: <Stethoscope />,
//         name: 'Doctors On Duty',
//         path: '/reception/doctors',
//       },
//       { icon: <Users />, name: 'Waiting Queue', path: '/reception/queue' },
//       {
//         icon: <Activity />,
//         name: 'Emergency Patients',
//         path: '/reception/emergency',
//       },
//       {
//         icon: <CreditCard />,
//         name: 'Pending Bills',
//         path: '/reception/billing',
//       },
//       {
//         icon: <Users />,
//         name: 'New Registrations',
//         path: '/reception/registrations',
//       },
//       {
//         icon: <Bell />,
//         name: 'Notifications',
//         path: '/reception/notifications',
//       },
//       { icon: <Settings />, name: 'Settings', path: '/reception/settings' },
//     ],
//   };

//   const role = 'admin';
//   const navigation = roleNavigation[role] || roleNavigation.admin;

//   const handleLogout = () => {
//     navigate('/login');
//   };

//   return (
//     <>
//       <Sidebar collapsible="icon" style={{ '--sidebar': '#0077B6' }}>
//         <SidebarHeader>
//           <div className="flex items-center gap-2 px-2 py-2">
//             <p className="bg-white py-2 px-3 rounded-2xl text-[#0077B6]">
//               <HeartPulse />
//             </p>
//             <Badge className="bg-[#00B4D8] text-white font-bold text-lg rounded-md px-2 py-1">
//               MediCore HMS
//             </Badge>
//           </div>
//         </SidebarHeader>
//         <SidebarContent>
//           <SidebarMenu className="px-2 py-8">
//             {navigation?.map((item) => (
//               <SidebarMenuItem key={item.name} className="py-2">
//                 <NavLink to={item.path}>
//                   {({ isActive }) => (
//                     <SidebarMenuButton
//                       isActive={isActive}
//                       asChild
//                       className="text-slate-200 hover:text-white hover:bg-white/10 data-[active=true]:bg-white data-[active=true]:text-[#0077B6] data-[active=true]:font-semibold flex-row items-center gap-2"
//                     >
//                       <span className="flex items-center gap-2">
//                         {item.icon}
//                         <span>{item.name}</span>
//                       </span>
//                     </SidebarMenuButton>
//                   )}
//                 </NavLink>
//               </SidebarMenuItem>
//             ))}
//           </SidebarMenu>
//         </SidebarContent>
//         <SidebarFooter>
//           <SidebarMenu>
//             <SidebarMenuItem>
//               <SidebarMenuButton
//                 type="button"
//                 onClick={handleLogout}
//                 className="text-slate-200 hover:text-white hover:bg-[#EF4444]/20 cursor-pointer"
//               >
//                 <LogOut />
//                 <span>Log out</span>
//               </SidebarMenuButton>
//             </SidebarMenuItem>
//           </SidebarMenu>
//         </SidebarFooter>
//       </Sidebar>
//     </>
//   );
// };

// export default SideBarLayout;
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
        icon: <BarChart3 size={18} />,
        name: 'Reports',
        path: '/doctor/reports',
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
        name: 'Medication Schedule',
        path: '/nurse/medication',
      },
      {
        icon: <BedDouble size={18} />,
        name: 'Beds & Wards',
        path: '/nurse/beds',
      },
    ],
    receptionist: [
      {
        icon: <LayoutDashboard size={18} />,
        name: 'Dashboard',
        path: '/reception/dashboard',
      },
      {
        icon: <CalendarDays size={18} />,
        name: "Today's Appointments",
        path: '/reception/appointments',
      },
      {
        icon: <ClipboardList size={18} />,
        name: "Today's Check-ins",
        path: '/reception/check-ins',
      },
      {
        icon: <BedDouble size={18} />,
        name: 'Available Beds',
        path: '/reception/beds',
      },
      {
        icon: <Stethoscope size={18} />,
        name: 'Doctors On Duty',
        path: '/reception/doctors',
      },
      {
        icon: <Users size={18} />,
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
        name: 'Pending Bills',
        path: '/reception/billing',
      },
      {
        icon: <Users size={18} />,
        name: 'New Registrations',
        path: '/reception/registrations',
      },
      {
        icon: <Bell size={18} />,
        name: 'Notifications',
        path: '/reception/notifications',
      },
    ],
  };

  const roleLabel = {
    admin: 'Admin workspace',
    doctor: 'Doctor workspace',
    nurse: 'Nurse workspace',
    receptionist: 'Front desk workspace',
  };

  const role = 'admin';
  const navigation = roleNavigation[role] || roleNavigation.admin;

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
                      asChild
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
