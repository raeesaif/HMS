export const currencyOptions = ['USD', 'EUR', 'GBP', 'PKR'];
export const timezoneOptions = ['UTC', 'America/Los_Angeles', 'America/New_York', 'Asia/Karachi'];
export const dateFormatOptions = ['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD'];
export const passwordPolicyOptions = ['Standard (8+ chars)', 'Strong (12+ chars, mixed case, symbol)', 'Strict (16+ chars, MFA required)'];
export const sessionDurationOptions = ['15 minutes', '30 minutes', '1 hour', '8 hours', '24 hours'];
export const emailProviderOptions = ['SMTP', 'SendGrid', 'Amazon SES', 'Postmark'];
export const paymentProviderOptions = ['Stripe', 'PayPal', 'Braintree'];
export const apiRateLimitOptions = ['100 req/min', '500 req/min', '1000 req/min', 'Unlimited'];
export const languageOptions = ['English', 'Urdu', 'Spanish', 'French'];

export const defaultSystemSettings = {
  general: {
    platformName: 'MediCore HMS',
    supportEmail: 'support@medicore.platform',
    supportPhone: '+1 800 555 0100',
    currency: 'USD',
    timezone: 'UTC',
    dateFormat: 'MM/DD/YYYY',
  },
  authentication: {
    passwordPolicy: 'Strong (12+ chars, mixed case, symbol)',
    sessionDuration: '1 hour',
    maxLoginAttempts: '5',
    accountLockoutMinutes: '30',
    passwordResetEnabled: true,
    emailVerificationRequired: true,
    twoFactorEnforced: false,
  },
  email: {
    provider: 'SendGrid',
    senderName: 'MediCore Platform',
    senderEmail: 'no-reply@medicore.platform',
    emailVerificationEnabled: true,
    passwordResetEnabled: true,
    welcomeEmailEnabled: true,
    notificationEmailEnabled: true,
  },
  notifications: {
    productAnnouncements: true,
    maintenanceAlerts: true,
    billingAlerts: true,
    securityAlerts: true,
  },
  storage: {
    provider: 'Amazon S3',
    defaultLimitGB: '10',
    currentUsageGB: '182',
  },
  payments: {
    provider: 'Stripe',
    currency: 'USD',
    paymentsEnabled: true,
    webhookConnected: true,
  },
  security: {
    ipAllowlistEnabled: false,
    bruteForceProtection: true,
    auditLogRetentionDays: '365',
  },
  maintenance: {
    maintenanceModeEnabled: false,
    maintenanceMessage: 'MediCore is currently undergoing scheduled maintenance. We will be back shortly.',
    scheduledFor: null,
  },
  api: {
    apiEnabled: true,
    rateLimit: '500 req/min',
    webhooksEnabled: true,
  },
  localization: {
    defaultLanguage: 'English',
    supportedLanguages: ['English', 'Urdu'],
  },
  branding: {
    primaryColor: '#0077B6',
    accentColor: '#00B4D8',
    logoUploaded: true,
  },
};
