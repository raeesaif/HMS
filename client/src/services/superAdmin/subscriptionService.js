import { plans, getPlanById } from '@/data/superAdmin/subscriptionPlans';
import { getHospitals } from '@/data/superAdmin/hospitals';
import { simulateRequest } from '@/services/apiClient';

export function fetchPlans() {
  return simulateRequest(plans);
}

export function fetchPlanSubscribers(planName) {
  return simulateRequest(getHospitals().filter((hospital) => hospital.plan === planName));
}

export function createPlan(payload) {
  return simulateRequest({ id: `plan-${Date.now()}`, status: 'Draft', ...payload });
}

export function updatePlan(planId, payload) {
  return simulateRequest({ id: planId, ...payload });
}

export function duplicatePlan(planId) {
  const plan = getPlanById(planId);
  return simulateRequest({ ...plan, id: `plan-${Date.now()}`, name: `${plan?.name} (Copy)`, status: 'Draft' });
}

export function archivePlan(planId) {
  return simulateRequest({ id: planId, status: 'Archived' });
}

export function activatePlan(planId) {
  return simulateRequest({ id: planId, status: 'Active' });
}
