import { ClipboardList } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/shared/EmptyState';
import { PatientAvatar } from '@/components/reception/PatientAvatar';
import { StatusBadge } from '@/components/reception/StatusBadge';
import { checkInStatusMap } from '@/components/reception/statusMaps';
import { CheckInsActionsMenu } from './CheckInsActionsMenu';

const columns = ['Patient', 'Doctor', 'Arrival Time', 'Check-in Time', 'Queue #', 'Status', ''];

export function CheckInsTable({ checkIns, onAction, onClearFilters }) {
  if (checkIns.length === 0) {
    return (
      <EmptyState
        icon={ClipboardList}
        title="No check-ins found"
        description="Try adjusting your search or filters."
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
      <Table className="min-w-[860px]">
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
          {checkIns.map((checkIn, index) => (
            <TableRow key={checkIn.id} className={`border-b-0 hover:bg-transparent ${index % 2 ? 'bg-slate-50/70' : 'bg-white'}`}>
              <TableCell className="px-4 py-3.5 pl-5">
                <div className="flex items-center gap-2.5">
                  <PatientAvatar name={checkIn.patientName} size="size-8" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">{checkIn.patientName}</p>
                    <p className="text-xs text-slate-500">{checkIn.appointmentDate} · {checkIn.appointmentTime}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="px-4 py-3.5 text-sm text-slate-600">{checkIn.doctorName}</TableCell>
              <TableCell className="px-4 py-3.5 text-sm text-slate-600">{checkIn.arrivalTime ?? '—'}</TableCell>
              <TableCell className="px-4 py-3.5 text-sm text-slate-600">{checkIn.checkInTime ?? '—'}</TableCell>
              <TableCell className="px-4 py-3.5 font-mono text-xs text-slate-500">{checkIn.queueNumber ?? '—'}</TableCell>
              <TableCell className="px-4 py-3.5">
                <StatusBadge status={checkIn.status} map={checkInStatusMap} />
              </TableCell>
              <TableCell className="px-4 py-3.5 pr-5">
                <div className="flex justify-end">
                  <CheckInsActionsMenu checkIn={checkIn} onAction={onAction} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
