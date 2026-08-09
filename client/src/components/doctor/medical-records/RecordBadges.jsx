import { Badge } from '@/components/ui/badge';

const diagnosisStatusClass = {
  Active: 'border-transparent bg-emerald-100 text-emerald-600',
  Resolved: 'border-transparent bg-slate-200 text-slate-600',
  Chronic: 'border-transparent bg-amber-100 text-amber-600',
};

export function DiagnosisStatusBadge({ status }) {
  return <Badge variant="outline" className={diagnosisStatusClass[status] ?? ''}>{status}</Badge>;
}

const severityClass = {
  Mild: 'border-transparent bg-slate-200 text-slate-600',
  Moderate: 'border-transparent bg-amber-100 text-amber-600',
  Severe: 'border-transparent bg-orange-100 text-orange-600',
  Critical: 'border-transparent bg-rose-100 text-rose-600',
};

export function AllergySeverityBadge({ severity }) {
  return <Badge variant="outline" className={severityClass[severity] ?? ''}>{severity}</Badge>;
}

const labStatusClass = {
  Normal: 'border-transparent bg-emerald-100 text-emerald-600',
  Abnormal: 'border-transparent bg-rose-100 text-rose-600',
  Pending: 'border-transparent bg-amber-100 text-amber-600',
};

export function LabResultBadge({ status }) {
  return <Badge variant="outline" className={labStatusClass[status] ?? ''}>{status}</Badge>;
}
