// Centralized status → badge className maps shared by the dashboard widgets
// and each full feature page, so every page renders the same status the
// same color instead of re-declaring these maps per component.

export const appointmentStatusMap = {
  Scheduled: 'border-transparent bg-blue-100 text-blue-600',
  'Checked In': 'border-transparent bg-violet-100 text-violet-600',
  'In Progress': 'border-transparent bg-blue-600 text-white',
  Completed: 'border-transparent bg-emerald-100 text-emerald-600',
  Cancelled: 'border-transparent bg-rose-100 text-rose-600',
  'No Show': 'border-transparent bg-slate-200 text-slate-600',
};

export const checkInStatusMap = {
  Waiting: 'border-transparent bg-amber-100 text-amber-600',
  'Checked In': 'border-transparent bg-violet-100 text-violet-600',
  'With Doctor': 'border-transparent bg-blue-600 text-white',
  Completed: 'border-transparent bg-emerald-100 text-emerald-600',
  'No Show': 'border-transparent bg-slate-200 text-slate-600',
};

export const bedStatusMap = {
  Available: 'border-transparent bg-emerald-100 text-emerald-600',
  Occupied: 'border-transparent bg-blue-100 text-blue-600',
  Reserved: 'border-transparent bg-amber-100 text-amber-600',
  Maintenance: 'border-transparent bg-slate-200 text-slate-600',
};

export const doctorStatusMap = {
  Available: 'border-transparent bg-emerald-100 text-emerald-600',
  Busy: 'border-transparent bg-amber-100 text-amber-600',
  'On Break': 'border-transparent bg-sky-100 text-sky-600',
  'Off Duty': 'border-transparent bg-slate-200 text-slate-600',
  'Emergency Only': 'border-transparent bg-rose-100 text-rose-600',
};

export const queueStatusMap = {
  Waiting: 'border-transparent bg-amber-100 text-amber-600',
  Called: 'border-transparent bg-blue-100 text-blue-600',
  'With Doctor': 'border-transparent bg-blue-600 text-white',
  Completed: 'border-transparent bg-emerald-100 text-emerald-600',
  Cancelled: 'border-transparent bg-rose-100 text-rose-600',
};

export const emergencyStatusMap = {
  Arrived: 'border-transparent bg-amber-100 text-amber-600',
  Waiting: 'border-transparent bg-amber-100 text-amber-600',
  'Doctor Assigned': 'border-transparent bg-blue-100 text-blue-600',
  Treatment: 'border-transparent bg-blue-600 text-white',
  Admitted: 'border-transparent bg-violet-100 text-violet-600',
  Discharged: 'border-transparent bg-emerald-100 text-emerald-600',
  Transferred: 'border-transparent bg-slate-200 text-slate-600',
};

export const invoiceStatusMap = {
  Paid: 'border-transparent bg-emerald-100 text-emerald-600',
  'Partially Paid': 'border-transparent bg-amber-100 text-amber-600',
  Pending: 'border-transparent bg-rose-100 text-rose-600',
  Cancelled: 'border-transparent bg-slate-200 text-slate-600',
};

export const notificationTypeMap = {
  Appointment: 'border-transparent bg-blue-100 text-blue-600',
  Patient: 'border-transparent bg-sky-100 text-sky-600',
  'Check-in': 'border-transparent bg-violet-100 text-violet-600',
  Queue: 'border-transparent bg-amber-100 text-amber-600',
  Bed: 'border-transparent bg-emerald-100 text-emerald-600',
  Emergency: 'border-transparent bg-rose-100 text-rose-600',
  Billing: 'border-transparent bg-orange-100 text-orange-600',
  System: 'border-transparent bg-slate-200 text-slate-600',
};
