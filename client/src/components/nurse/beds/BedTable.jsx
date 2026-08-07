import { BedDouble } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { EmptyState } from '@/shared/EmptyState';
import { ConditionBadge } from '@/shared/NurseDashboardComponents';
import { conditionStyles } from '@/data/nursePatients';
import { BedStatusBadge } from './BedStatusBadge';
import { BedActionsMenu } from './BedActionsMenu';

const columnLabels = [
  'Bed Number',
  'Ward',
  'Patient Name',
  'Patient ID',
  'Assigned Doctor',
  'Admission Date',
  'Bed Status',
  'Condition',
  'Actions',
];

export function BedTable({
  beds,
  onAction,
  emptyTitle = 'No bed assignments found.',
  emptyDescription = 'Adjust your search or filters to see more results.',
}) {
  if (beds.length === 0) {
    return <EmptyState icon={BedDouble} title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-[1150px]">
        <TableHeader className="bg-slate-50 [&_tr]:border-b-0">
          <TableRow className="hover:bg-transparent">
            {columnLabels.map((label) => (
              <TableHead
                key={label}
                className={`h-auto px-4 py-3 text-[11px] font-medium text-slate-500 first:pl-5 last:pr-5 ${
                  label === 'Actions' ? 'text-right' : ''
                }`}
              >
                {label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {beds.map((bed, index) => (
            <TableRow
              key={bed.id}
              className={`border-b-0 hover:bg-slate-50 ${index % 2 ? 'bg-slate-50/70' : 'bg-white'}`}
            >
              <TableCell className="px-4 py-3.5 pl-5 font-mono text-xs text-slate-500">{bed.bedNumber}</TableCell>
              <TableCell className="px-4 py-3.5 text-slate-600">{bed.ward}</TableCell>
              <TableCell className="px-4 py-3.5 font-medium text-slate-900">{bed.patient?.name ?? '—'}</TableCell>
              <TableCell className="px-4 py-3.5 font-mono text-xs text-slate-500">{bed.patient?.id ?? '—'}</TableCell>
              <TableCell className="px-4 py-3.5 text-slate-600">{bed.patient?.doctor ?? '—'}</TableCell>
              <TableCell className="px-4 py-3.5 text-xs text-slate-500">{bed.patient?.admissionDate ?? '—'}</TableCell>
              <TableCell className="px-4 py-3.5"><BedStatusBadge status={bed.status} /></TableCell>
              <TableCell className="px-4 py-3.5">
                {bed.patient ? (
                  <ConditionBadge condition={bed.patient.condition} style={conditionStyles[bed.patient.condition]} />
                ) : (
                  <span className="text-slate-400">—</span>
                )}
              </TableCell>
              <TableCell className="px-4 py-3.5 pr-5 text-right">
                <BedActionsMenu bed={bed} onAction={onAction} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
