import { getHospitals, hospitalStatusOptions } from './hospitals';
import { users } from './users';
import { transactions, getBillingStats } from './billing';
import { activityLogs } from './activityLogs';
import { plans } from './subscriptionPlans';

const allHospitals = getHospitals();

const countByStatus = (status) => allHospitals.filter((hospital) => hospital.status === status).length;

export const dashboardStats = [
  { id: 'total-hospitals', icon: 'building', tone: 'blue', title: 'Total Hospitals', value: allHospitals.length, trend: { direction: 'up', value: '+9.1%' }, comparison: 'vs last month' },
  { id: 'active-hospitals', icon: 'check', tone: 'green', title: 'Active Hospitals', value: countByStatus('Active'), trend: { direction: 'up', value: '+4.3%' }, comparison: 'vs last month' },
  { id: 'trial-hospitals', icon: 'clock', tone: 'sky', title: 'Trial Hospitals', value: countByStatus('Trial'), trend: { direction: 'up', value: '+2' }, comparison: 'vs last month' },
  { id: 'suspended-hospitals', icon: 'alert', tone: 'red', title: 'Suspended Hospitals', value: countByStatus('Suspended'), trend: { direction: 'down', value: '-1' }, comparison: 'vs last month' },
  { id: 'total-users', icon: 'users', tone: 'purple', title: 'Total Users', value: users.length.toLocaleString(), trend: { direction: 'up', value: '+6.3%' }, comparison: 'vs last month' },
  { id: 'active-subscriptions', icon: 'creditcard', tone: 'blue', title: 'Active Subscriptions', value: allHospitals.filter((h) => h.status === 'Active' || h.status === 'Trial').length, trend: { direction: 'up', value: '+3' }, comparison: 'vs last month' },
  { id: 'monthly-revenue', icon: 'receipt', tone: 'green', title: 'Monthly Revenue', value: `$${getBillingStats(transactions).monthlyRevenue.toLocaleString()}`, trend: { direction: 'up', value: '+5.1%' }, comparison: 'vs last month' },
  { id: 'total-revenue', icon: 'receipt', tone: 'purple', title: 'Total Revenue', value: `$${getBillingStats(transactions).totalRevenue.toLocaleString()}`, trend: { direction: 'up', value: '+12.4%' }, comparison: 'vs last year' },
];

export const subscriptionDistribution = plans.map((plan) => {
  const subscriberCount = allHospitals.filter((h) => h.plan === plan.name).length;
  const revenue = allHospitals.filter((h) => h.plan === plan.name).length * plan.monthlyPrice;
  return {
    plan: plan.name,
    subscriberCount,
    percentage: Math.round((subscriberCount / allHospitals.length) * 100),
    revenue,
  };
});

export const recentHospitals = [...allHospitals]
  .sort((a, b) => new Date(b.registrationDate) - new Date(a.registrationDate))
  .slice(0, 5);

export const recentActivity = activityLogs.slice(0, 6);

export const systemHealth = [
  { id: 'api', name: 'API', status: 'Operational' },
  { id: 'database', name: 'Database', status: 'Operational' },
  { id: 'auth', name: 'Authentication', status: 'Operational' },
  { id: 'email', name: 'Email', status: 'Warning' },
  { id: 'storage', name: 'Storage', status: 'Operational' },
  { id: 'payments', name: 'Payment Gateway', status: 'Operational' },
];

export const dashboardQuickActions = [
  { id: 'qa-1', icon: 'building', label: 'Add Hospital', path: '/super-admin/hospitals' },
  { id: 'qa-2', icon: 'users', label: 'Create User', path: '/super-admin/users' },
  { id: 'qa-3', icon: 'creditcard', label: 'Create Subscription', path: '/super-admin/subscriptions' },
  { id: 'qa-4', icon: 'puzzle', label: 'Create Feature', path: '/super-admin/features' },
  { id: 'qa-5', icon: 'bell', label: 'Send Announcement', path: '/super-admin/notifications' },
];

export const dateFilterOptions = ['Today', '7 Days', '30 Days', '90 Days', 'This Year', 'Custom Range'];
