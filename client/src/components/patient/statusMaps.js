// Centralized status → badge className maps shared across the dashboard
// widgets and each full patient page.

export const appointmentStatusMap = {
  Scheduled: 'border-transparent bg-blue-100 text-blue-600',
  Confirmed: 'border-transparent bg-sky-100 text-sky-600',
  'Checked In': 'border-transparent bg-violet-100 text-violet-600',
  'In Progress': 'border-transparent bg-blue-600 text-white',
  Completed: 'border-transparent bg-emerald-100 text-emerald-600',
  Cancelled: 'border-transparent bg-rose-100 text-rose-600',
  'No Show': 'border-transparent bg-slate-200 text-slate-600',
};

export const recordStatusMap = {
  Finalized: 'border-transparent bg-emerald-100 text-emerald-600',
  Draft: 'border-transparent bg-amber-100 text-amber-600',
};

export const prescriptionStatusMap = {
  Active: 'border-transparent bg-emerald-100 text-emerald-600',
  Completed: 'border-transparent bg-blue-100 text-blue-600',
  Expired: 'border-transparent bg-slate-200 text-slate-600',
};

export const labReportStatusMap = {
  Ordered: 'border-transparent bg-slate-200 text-slate-600',
  'Sample Collected': 'border-transparent bg-amber-100 text-amber-600',
  Processing: 'border-transparent bg-blue-100 text-blue-600',
  Completed: 'border-transparent bg-emerald-100 text-emerald-600',
  Cancelled: 'border-transparent bg-rose-100 text-rose-600',
};

export const invoiceStatusMap = {
  Paid: 'border-transparent bg-emerald-100 text-emerald-600',
  'Partially Paid': 'border-transparent bg-amber-100 text-amber-600',
  Pending: 'border-transparent bg-slate-200 text-slate-600',
  Overdue: 'border-transparent bg-rose-100 text-rose-600',
  Cancelled: 'border-transparent bg-slate-200 text-slate-600',
};

export const notificationTypeMap = {
  Appointment: 'border-transparent bg-blue-100 text-blue-600',
  Prescription: 'border-transparent bg-amber-100 text-amber-600',
  Laboratory: 'border-transparent bg-violet-100 text-violet-600',
  Billing: 'border-transparent bg-orange-100 text-orange-600',
  'Medical Record': 'border-transparent bg-sky-100 text-sky-600',
  System: 'border-transparent bg-slate-200 text-slate-600',
};
