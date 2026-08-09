import {
  dashboardStats,
  dashboardAppointments,
  dashboardQueue,
  dashboardDoctors,
  dashboardEmergencies,
  dashboardPayments,
} from '@/data/receptionistDashboard';
import { simulateRequest } from '@/services/apiClient';

export function fetchDashboardData() {
  return simulateRequest({
    stats: dashboardStats,
    appointments: dashboardAppointments,
    queue: dashboardQueue,
    doctors: dashboardDoctors,
    emergencies: dashboardEmergencies,
    payments: dashboardPayments,
  });
}
