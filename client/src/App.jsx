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
import DoctorDashboard from './pages/DoctorDashboard/DoctorDashboard';
import ReceptionistDashboard from './pages/ReceptionistDashboard/ReceptionistDashboard';
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
            {/* Doctor Dashboard */}
            <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
            {/* Receptionist Dashboard */}
            <Route
              path="/receptionist/dashboard"
              element={<ReceptionistDashboard />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
