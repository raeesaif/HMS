import { Badge } from '@/components/ui/badge';

const conditionStyles = {
  normal: 'bg-emerald-50 text-emerald-700 [a]:hover:bg-emerald-50',
  observation: 'bg-amber-50 text-amber-700 [a]:hover:bg-amber-50',
  critical: 'bg-red-50 text-red-700 [a]:hover:bg-red-50',
};

const conditionLabels = {
  normal: 'Normal',
  observation: 'Observation',
  critical: 'Critical',
};

export function VitalStatusBadge({ condition, className = '' }) {
  return (
    <Badge variant="outline" className={`border-transparent font-medium ${conditionStyles[condition]} ${className}`}>
      {conditionLabels[condition] ?? condition}
    </Badge>
  );
}
