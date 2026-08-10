import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import Login from './auth/Login';
import ForgetPassword from './auth/ForgetPassword';
import Home from './pages/home/Home';
import { MainLayout } from './layouts/MainLayout';
import Dashboard from './pages/AdminDashboard/Dashboard';
import AdminPatients from './pages/AdminDashboard/AdminPatients';
import Appointments from './pages/AdminDashboard/Appointments';
import AdminStaff from './pages/AdminDashboard/AdminStaff';
import AdminBeds from './pages/AdminDashboard/AdminBeds';
import AdminBilling from './pages/AdminDashboard/AdminBilling';
import AdminPharmacy from './pages/AdminDashboard/AdminPharmacy';
import AdminReports from './pages/AdminDashboard/AdminReports';
import NurseDashboard from './pages/NurseDashboard/NurseDashboard';
import AssignedPatients from './pages/NurseDashboard/AssignedPatients';
import VitalsMonitoring from './pages/NurseDashboard/VitalsMonitoring';
import MedicationAdministration from './pages/NurseDashboard/MedicationAdministration';
import BedsWards from './pages/NurseDashboard/BedsWards';
import Tasks from './pages/NurseDashboard/Tasks';
import Notifications from './pages/NurseDashboard/Notifications';
import Profile from './pages/NurseDashboard/Profile';
import Settings from './pages/NurseDashboard/Settings';
import DoctorDashboard from './pages/DoctorDashboard/DoctorDashboard';
import DoctorAppointments from './pages/DoctorDashboard/Appointments';
import DoctorPatients from './pages/DoctorDashboard/Patients';
import DoctorPrescriptions from './pages/DoctorDashboard/Prescriptions';
import DoctorMedicalRecords from './pages/DoctorDashboard/MedicalRecords';
import DoctorNotifications from './pages/DoctorDashboard/Notifications';
import DoctorLabReports from './pages/DoctorDashboard/LabReports';
import DoctorProfile from './pages/DoctorDashboard/Profile';
import DoctorSettings from './pages/DoctorDashboard/Settings';
import ReceptionistDashboard from './pages/ReceptionistDashboard/ReceptionistDashboard';
import ReceptionPatients from './pages/ReceptionistDashboard/Patients';
import ReceptionAppointments from './pages/ReceptionistDashboard/Appointments';
import ReceptionCheckIns from './pages/ReceptionistDashboard/CheckIns';
import ReceptionBeds from './pages/ReceptionistDashboard/Beds';
import ReceptionDoctors from './pages/ReceptionistDashboard/Doctors';
import ReceptionQueue from './pages/ReceptionistDashboard/Queue';
import ReceptionEmergency from './pages/ReceptionistDashboard/Emergency';
import ReceptionBilling from './pages/ReceptionistDashboard/Billing';
import ReceptionNotifications from './pages/ReceptionistDashboard/Notifications';
import ReceptionProfile from './pages/ReceptionistDashboard/Profile';
import ReceptionSettings from './pages/ReceptionistDashboard/Settings';
import PatientDashboard from './pages/PatientDashboard/Dashboard';
import PatientAppointments from './pages/PatientDashboard/Appointments';
import PatientMedicalRecords from './pages/PatientDashboard/MedicalRecords';
import PatientPrescriptions from './pages/PatientDashboard/Prescriptions';
import PatientLabReports from './pages/PatientDashboard/LabReports';
import PatientBilling from './pages/PatientDashboard/Billing';
import PatientNotifications from './pages/PatientDashboard/Notifications';
import PatientProfile from './pages/PatientDashboard/Profile';
import PatientSettings from './pages/PatientDashboard/Settings';
import { SuperAdminLayout } from './layouts/SuperAdminLayout';
import SuperAdminDashboard from './pages/SuperAdminDashboard/Dashboard';
import SuperAdminHospitals from './pages/SuperAdminDashboard/Hospitals';
import SuperAdminUsers from './pages/SuperAdminDashboard/Users';
import SuperAdminSubscriptions from './pages/SuperAdminDashboard/Subscriptions';
import SuperAdminFeatures from './pages/SuperAdminDashboard/Features';
import SuperAdminBilling from './pages/SuperAdminDashboard/Billing';
import SuperAdminAnalytics from './pages/SuperAdminDashboard/Analytics';
import SuperAdminActivityLogs from './pages/SuperAdminDashboard/ActivityLogs';
import SuperAdminSupport from './pages/SuperAdminDashboard/Support';
import SuperAdminNotifications from './pages/SuperAdminDashboard/Notifications';
import SuperAdminSystemSettings from './pages/SuperAdminDashboard/SystemSettings';
import SuperAdminProfile from './pages/SuperAdminDashboard/Profile';
import SuperAdminSecurity from './pages/SuperAdminDashboard/Security';
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
          </Route>
          <Route element={<MainLayout />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/patients" element={<AdminPatients />} />
            <Route path="/admin/appointments" element={<Appointments />} />
            <Route path="/admin/staff" element={<AdminStaff />} />
            <Route path="/admin/beds" element={<AdminBeds />} />
            <Route path="/admin/billing" element={<AdminBilling />} />
            <Route path="/admin/pharmacy" element={<AdminPharmacy />} />
            <Route path="/admin/reports" element={<AdminReports />} />
            {/* Nurse Dashboard */}
            <Route path="/nurse/dashboard" element={<NurseDashboard />} />
            <Route path="/nurse/patients" element={<AssignedPatients />} />
            <Route path="/nurse/vitals" element={<VitalsMonitoring />} />
            <Route path="/nurse/medication" element={<MedicationAdministration />} />
            <Route path="/nurse/beds" element={<BedsWards />} />
            <Route path="/nurse/tasks" element={<Tasks />} />
            <Route path="/nurse/notifications" element={<Notifications />} />
            <Route path="/nurse/profile" element={<Profile />} />
            <Route path="/nurse/settings" element={<Settings />} />
            {/* Doctor Dashboard */}
            <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
            <Route path="/doctor/appointments" element={<DoctorAppointments />} />
            <Route path="/doctor/patients" element={<DoctorPatients />} />
            <Route path="/doctor/prescriptions" element={<DoctorPrescriptions />} />
            <Route path="/doctor/medical-records" element={<DoctorMedicalRecords />} />
            <Route path="/doctor/notifications" element={<DoctorNotifications />} />
            <Route path="/doctor/lab-reports" element={<DoctorLabReports />} />
            <Route path="/doctor/profile" element={<DoctorProfile />} />
            <Route path="/doctor/settings" element={<DoctorSettings />} />
            {/* Receptionist Dashboard */}
            <Route path="/reception/dashboard" element={<ReceptionistDashboard />} />
            <Route path="/reception/patients" element={<ReceptionPatients />} />
            <Route path="/reception/appointments" element={<ReceptionAppointments />} />
            <Route path="/reception/check-ins" element={<ReceptionCheckIns />} />
            <Route path="/reception/beds" element={<ReceptionBeds />} />
            <Route path="/reception/doctors" element={<ReceptionDoctors />} />
            <Route path="/reception/queue" element={<ReceptionQueue />} />
            <Route path="/reception/emergency" element={<ReceptionEmergency />} />
            <Route path="/reception/billing" element={<ReceptionBilling />} />
            <Route path="/reception/notifications" element={<ReceptionNotifications />} />
            <Route path="/reception/profile" element={<ReceptionProfile />} />
            <Route path="/reception/settings" element={<ReceptionSettings />} />
            {/* Patient Dashboard */}
            <Route path="/patient/dashboard" element={<PatientDashboard />} />
            <Route path="/patient/appointments" element={<PatientAppointments />} />
            <Route path="/patient/medical-records" element={<PatientMedicalRecords />} />
            <Route path="/patient/prescriptions" element={<PatientPrescriptions />} />
            <Route path="/patient/lab-reports" element={<PatientLabReports />} />
            <Route path="/patient/billing" element={<PatientBilling />} />
            <Route path="/patient/notifications" element={<PatientNotifications />} />
            <Route path="/patient/profile" element={<PatientProfile />} />
            <Route path="/patient/settings" element={<PatientSettings />} />
          </Route>
          <Route element={<SuperAdminLayout />}>
            {/* Super Admin */}
            <Route path="/super-admin/dashboard" element={<SuperAdminDashboard />} />
            <Route path="/super-admin/hospitals" element={<SuperAdminHospitals />} />
            <Route path="/super-admin/users" element={<SuperAdminUsers />} />
            <Route path="/super-admin/subscriptions" element={<SuperAdminSubscriptions />} />
            <Route path="/super-admin/features" element={<SuperAdminFeatures />} />
            <Route path="/super-admin/billing" element={<SuperAdminBilling />} />
            <Route path="/super-admin/analytics" element={<SuperAdminAnalytics />} />
            <Route path="/super-admin/activity-logs" element={<SuperAdminActivityLogs />} />
            <Route path="/super-admin/support" element={<SuperAdminSupport />} />
            <Route path="/super-admin/notifications" element={<SuperAdminNotifications />} />
            <Route path="/super-admin/system-settings" element={<SuperAdminSystemSettings />} />
            <Route path="/super-admin/profile" element={<SuperAdminProfile />} />
            <Route path="/super-admin/security" element={<SuperAdminSecurity />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
