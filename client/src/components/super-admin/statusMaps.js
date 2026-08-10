// Centralized status → badge className maps shared across every Super Admin
// page, so the same status always renders the same color.

export const hospitalStatusMap = {
  Active: 'border-transparent bg-emerald-100 text-emerald-600',
  Trial: 'border-transparent bg-sky-100 text-sky-600',
  Suspended: 'border-transparent bg-rose-100 text-rose-600',
  Expired: 'border-transparent bg-slate-200 text-slate-600',
};

export const userStatusMap = {
  Active: 'border-transparent bg-emerald-100 text-emerald-600',
  Suspended: 'border-transparent bg-rose-100 text-rose-600',
  Invited: 'border-transparent bg-amber-100 text-amber-600',
};

export const subscriptionStatusMap = {
  Active: 'border-transparent bg-emerald-100 text-emerald-600',
  Archived: 'border-transparent bg-slate-200 text-slate-600',
  Draft: 'border-transparent bg-amber-100 text-amber-600',
};

export const featureStatusMap = {
  Enabled: 'border-transparent bg-emerald-100 text-emerald-600',
  Disabled: 'border-transparent bg-slate-200 text-slate-600',
  Beta: 'border-transparent bg-violet-100 text-violet-600',
};

export const transactionStatusMap = {
  Paid: 'border-transparent bg-emerald-100 text-emerald-600',
  Pending: 'border-transparent bg-amber-100 text-amber-600',
  Failed: 'border-transparent bg-rose-100 text-rose-600',
  Refunded: 'border-transparent bg-slate-200 text-slate-600',
};

export const activityStatusMap = {
  Success: 'border-transparent bg-emerald-100 text-emerald-600',
  Failed: 'border-transparent bg-rose-100 text-rose-600',
  Warning: 'border-transparent bg-amber-100 text-amber-600',
};

export const ticketStatusMap = {
  Open: 'border-transparent bg-sky-100 text-sky-600',
  'In Progress': 'border-transparent bg-blue-600 text-white',
  Waiting: 'border-transparent bg-amber-100 text-amber-600',
  Resolved: 'border-transparent bg-emerald-100 text-emerald-600',
};

export const ticketPriorityMap = {
  Low: 'border-transparent bg-slate-100 text-slate-600',
  Medium: 'border-transparent bg-amber-100 text-amber-600',
  High: 'border-transparent bg-orange-100 text-orange-600',
  Critical: 'border-transparent bg-rose-100 text-rose-600',
};

export const notificationStatusMap = {
  Sent: 'border-transparent bg-emerald-100 text-emerald-600',
  Scheduled: 'border-transparent bg-sky-100 text-sky-600',
  Draft: 'border-transparent bg-slate-200 text-slate-600',
};

export const systemHealthMap = {
  Operational: 'border-transparent bg-emerald-100 text-emerald-600',
  Warning: 'border-transparent bg-amber-100 text-amber-600',
  Down: 'border-transparent bg-rose-100 text-rose-600',
};
