import {
  dashboardStats,
  nextAppointment,
  dashboardMedicalRecords,
  dashboardPrescriptions,
  dashboardLabReports,
  dashboardBillingSummary,
  activityTimeline,
} from '@/data/patientDashboard';
import { simulateRequest } from '@/services/apiClient';

export function fetchDashboardData() {
  return simulateRequest({
    stats: dashboardStats,
    nextAppointment,
    medicalRecords: dashboardMedicalRecords,
    prescriptions: dashboardPrescriptions,
    labReports: dashboardLabReports,
    billingSummary: dashboardBillingSummary,
    activity: activityTimeline,
  });
}
