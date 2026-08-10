export const planStatusOptions = ['Active', 'Draft', 'Archived'];

export const plans = [
  {
    id: 'plan-free',
    name: 'Free',
    description: 'For small clinics evaluating the platform.',
    monthlyPrice: 0,
    yearlyPrice: 0,
    currency: 'USD',
    trialDays: 0,
    maxUsers: 5,
    maxDoctors: 2,
    maxNurses: 2,
    maxReceptionists: 1,
    maxPatients: 100,
    storageLimitGB: 1,
    status: 'Active',
    features: ['appointments', 'patients'],
  },
  {
    id: 'plan-basic',
    name: 'Basic',
    description: 'Core hospital management for single-location clinics.',
    monthlyPrice: 49,
    yearlyPrice: 490,
    currency: 'USD',
    trialDays: 14,
    maxUsers: 25,
    maxDoctors: 8,
    maxNurses: 10,
    maxReceptionists: 4,
    maxPatients: 2000,
    storageLimitGB: 10,
    status: 'Active',
    features: ['appointments', 'patients', 'billing', 'reports'],
  },
  {
    id: 'plan-professional',
    name: 'Professional',
    description: 'Advanced features for growing multi-department hospitals.',
    monthlyPrice: 149,
    yearlyPrice: 1490,
    currency: 'USD',
    trialDays: 14,
    maxUsers: 100,
    maxDoctors: 30,
    maxNurses: 40,
    maxReceptionists: 15,
    maxPatients: 15000,
    storageLimitGB: 50,
    status: 'Active',
    features: ['appointments', 'patients', 'billing', 'reports', 'telemedicine', 'advanced-analytics'],
  },
  {
    id: 'plan-enterprise',
    name: 'Enterprise',
    description: 'Full platform access for large hospital networks.',
    monthlyPrice: 399,
    yearlyPrice: 3990,
    currency: 'USD',
    trialDays: 30,
    maxUsers: 1000,
    maxDoctors: 300,
    maxNurses: 400,
    maxReceptionists: 100,
    maxPatients: 200000,
    storageLimitGB: 500,
    status: 'Active',
    features: ['appointments', 'patients', 'billing', 'reports', 'telemedicine', 'advanced-analytics', 'inventory', 'communication'],
  },
];

export function getPlanById(planId) {
  return plans.find((plan) => plan.id === planId) ?? null;
}

export function getPlanByName(name) {
  return plans.find((plan) => plan.name === name) ?? null;
}
