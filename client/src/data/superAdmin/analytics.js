export const revenueSeries = [
  { month: 'Mar', revenue: 3800, refunds: 120, net: 3680 },
  { month: 'Apr', revenue: 4100, refunds: 90, net: 4010 },
  { month: 'May', revenue: 4350, refunds: 150, net: 4200 },
  { month: 'Jun', revenue: 4600, refunds: 200, net: 4400 },
  { month: 'Jul', revenue: 4950, refunds: 149, net: 4801 },
  { month: 'Aug', revenue: 5200, refunds: 80, net: 5120 },
];

export const hospitalGrowthSeries = [
  { month: 'Mar', newHospitals: 2, active: 18, trial: 3, suspended: 1 },
  { month: 'Apr', newHospitals: 1, active: 19, trial: 3, suspended: 1 },
  { month: 'May', newHospitals: 3, active: 21, trial: 2, suspended: 1 },
  { month: 'Jun', newHospitals: 1, active: 21, trial: 2, suspended: 2 },
  { month: 'Jul', newHospitals: 2, active: 22, trial: 3, suspended: 2 },
  { month: 'Aug', newHospitals: 2, active: 24, trial: 2, suspended: 1 },
];

export const userGrowthSeries = [
  { month: 'Mar', users: 28400 },
  { month: 'Apr', users: 29850 },
  { month: 'May', users: 31200 },
  { month: 'Jun', users: 32780 },
  { month: 'Jul', users: 34500 },
  { month: 'Aug', users: 36945 },
];

export const subscriptionGrowthSeries = [
  { month: 'Mar', free: 3, basic: 9, professional: 5, enterprise: 3 },
  { month: 'Apr', free: 3, basic: 10, professional: 5, enterprise: 3 },
  { month: 'May', free: 4, basic: 10, professional: 6, enterprise: 3 },
  { month: 'Jun', free: 4, basic: 10, professional: 6, enterprise: 4 },
  { month: 'Jul', free: 4, basic: 11, professional: 6, enterprise: 4 },
  { month: 'Aug', free: 5, basic: 11, professional: 6, enterprise: 4 },
];

export const featureUsageSeries = [
  { feature: 'Appointments', usage: 18420 },
  { feature: 'Patients', usage: 21030 },
  { feature: 'Billing', usage: 9640 },
  { feature: 'Reports', usage: 5210 },
  { feature: 'Telemedicine', usage: 1120 },
  { feature: 'Advanced Analytics', usage: 2040 },
];

export const churnSeries = [
  { month: 'Mar', churnRate: 2.1, retentionRate: 97.9 },
  { month: 'Apr', churnRate: 1.8, retentionRate: 98.2 },
  { month: 'May', churnRate: 2.4, retentionRate: 97.6 },
  { month: 'Jun', churnRate: 1.9, retentionRate: 98.1 },
  { month: 'Jul', churnRate: 1.5, retentionRate: 98.5 },
  { month: 'Aug', churnRate: 1.3, retentionRate: 98.7 },
];

export const analyticsMetrics = {
  userGrowth: { value: '36,945', trend: { direction: 'up', value: '+7.1%' } },
  hospitalGrowth: { value: '24', trend: { direction: 'up', value: '+9.1%' } },
  patientGrowth: { value: '38,020', trend: { direction: 'up', value: '+5.4%' } },
  revenue: { value: '$5,200', trend: { direction: 'up', value: '+5.1%' } },
  mrr: { value: '$5,200', trend: { direction: 'up', value: '+5.1%' } },
  arr: { value: '$62,400', trend: { direction: 'up', value: '+12.4%' } },
  churn: { value: '1.3%', trend: { direction: 'down', value: '-0.2pt' } },
  retention: { value: '98.7%', trend: { direction: 'up', value: '+0.2pt' } },
  trialConversion: { value: '61%', trend: { direction: 'up', value: '+4pt' } },
  activeUsers: { value: '29,150', trend: { direction: 'up', value: '+6.3%' } },
};
