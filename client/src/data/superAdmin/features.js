export const featureCategoryOptions = ['Clinical', 'Administration', 'Billing', 'Communication', 'Analytics', 'Security', 'Integrations', 'Other'];
export const featureStatusOptions = ['Enabled', 'Disabled', 'Beta'];

export const features = [
  { id: 'appointments', key: 'appointments', name: 'Appointments', description: 'Scheduling and management of patient appointments.', category: 'Clinical', status: 'Enabled', plans: ['Free', 'Basic', 'Professional', 'Enterprise'], enabledHospitals: 24, disabledHospitals: 0, usageCount: 18420 },
  { id: 'patients', key: 'patients', name: 'Patients', description: 'Patient registration and record management.', category: 'Clinical', status: 'Enabled', plans: ['Free', 'Basic', 'Professional', 'Enterprise'], enabledHospitals: 24, disabledHospitals: 0, usageCount: 21030 },
  { id: 'billing', key: 'billing', name: 'Billing', description: 'Invoicing and payment collection.', category: 'Billing', status: 'Enabled', plans: ['Basic', 'Professional', 'Enterprise'], enabledHospitals: 19, disabledHospitals: 5, usageCount: 9640 },
  { id: 'reports', key: 'reports', name: 'Reports', description: 'Operational and financial reporting.', category: 'Analytics', status: 'Enabled', plans: ['Basic', 'Professional', 'Enterprise'], enabledHospitals: 19, disabledHospitals: 5, usageCount: 5210 },
  { id: 'telemedicine', key: 'telemedicine', name: 'Telemedicine', description: 'Video consultations between doctors and patients.', category: 'Clinical', status: 'Beta', plans: ['Professional', 'Enterprise'], enabledHospitals: 8, disabledHospitals: 16, usageCount: 1120 },
  { id: 'inventory', key: 'inventory', name: 'Inventory', description: 'Pharmacy and medical supply inventory tracking.', category: 'Administration', status: 'Enabled', plans: ['Enterprise'], enabledHospitals: 4, disabledHospitals: 20, usageCount: 860 },
  { id: 'advanced-analytics', key: 'advanced-analytics', name: 'Advanced Analytics', description: 'Cross-department analytics and forecasting.', category: 'Analytics', status: 'Enabled', plans: ['Professional', 'Enterprise'], enabledHospitals: 8, disabledHospitals: 16, usageCount: 2040 },
  { id: 'communication', key: 'communication', name: 'Communication Center', description: 'SMS/email notifications to patients and staff.', category: 'Communication', status: 'Disabled', plans: ['Enterprise'], enabledHospitals: 4, disabledHospitals: 20, usageCount: 310 },
  { id: 'sso', key: 'sso', name: 'Single Sign-On', description: 'SAML/OAuth-based identity provider integration.', category: 'Security', status: 'Beta', plans: ['Enterprise'], enabledHospitals: 2, disabledHospitals: 22, usageCount: 45 },
  { id: 'api-access', key: 'api-access', name: 'API Access', description: 'Programmatic access to hospital data via REST API.', category: 'Integrations', status: 'Disabled', plans: ['Enterprise'], enabledHospitals: 1, disabledHospitals: 23, usageCount: 12 },
];

export function getFeatureById(featureId) {
  return features.find((feature) => feature.id === featureId) ?? null;
}
