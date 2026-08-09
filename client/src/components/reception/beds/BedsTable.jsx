import { BedDouble } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/shared/EmptyState';
import { StatusBadge } from '@/components/reception/StatusBadge';
import { bedStatusMap } from '@/components/reception/statusMaps';
import { BedsActionsMenu } from './BedsActionsMenu';

const columns = ['Bed Number', 'Ward', 'Room', 'Type', 'Status', 'Patient', 'Admission', ''];

export function BedsTable({ beds, onAction, onClearFilters }) {
  if (beds.length === 0) {
    return (
      <EmptyState
        icon={BedDouble}
        title="No available beds"
        description="Try adjusting your filters."
        action={
          <Button variant="outline" onClick={onClearFilters}>
            Clear Filters
          </Button>
        }
      />
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-[920px]">
        <TableHeader className="bg-slate-50 [&_tr]:border-b-0">
          <TableRow className="hover:bg-transparent">
            {columns.map((label) => (
              <TableHead key={label || 'actions'} className="h-auto px-4 py-3 text-[11px] font-medium text-slate-500 first:pl-5 last:pr-5">
                {label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {beds.map((bed, index) => (
            <TableRow key={bed.id} className={`border-b-0 hover:bg-transparent ${index % 2 ? 'bg-slate-50/70' : 'bg-white'}`}>
              <TableCell className="px-4 py-3.5 pl-5 font-medium text-slate-900">{bed.bedNumber}</TableCell>
              <TableCell className="px-4 py-3.5 text-sm text-slate-600">{bed.ward}</TableCell>
              <TableCell className="px-4 py-3.5 text-sm text-slate-600">{bed.room}</TableCell>
              <TableCell className="px-4 py-3.5 text-xs text-slate-500">{bed.type}</TableCell>
              <TableCell className="px-4 py-3.5">
                <StatusBadge status={bed.status} map={bedStatusMap} />
              </TableCell>
              <TableCell className="px-4 py-3.5 text-sm text-slate-600">{bed.patientName ?? '—'}</TableCell>
              <TableCell className="px-4 py-3.5 text-xs text-slate-500">{bed.admissionDate ?? '—'}</TableCell>
              <TableCell className="px-4 py-3.5 pr-5">
                <div className="flex justify-end">
                  <BedsActionsMenu bed={bed} onAction={onAction} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
