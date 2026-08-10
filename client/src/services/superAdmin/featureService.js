import { features } from '@/data/superAdmin/features';
import { simulateRequest } from '@/services/apiClient';

export function fetchFeatures() {
  return simulateRequest(features);
}

export function createFeature(payload) {
  return simulateRequest({ id: `feat-${Date.now()}`, status: 'Disabled', enabledHospitals: 0, disabledHospitals: 0, usageCount: 0, ...payload });
}

export function updateFeature(featureId, payload) {
  return simulateRequest({ id: featureId, ...payload });
}

export function enableFeature(featureId) {
  return simulateRequest({ id: featureId, status: 'Enabled' });
}

export function disableFeature(featureId) {
  return simulateRequest({ id: featureId, status: 'Disabled' });
}
