import { UsersRound } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/shared/EmptyState';
import { PatientAvatar } from '@/components/reception/PatientAvatar';
import { StatusBadge } from '@/components/reception/StatusBadge';
import { PriorityBadge } from '@/components/reception/PriorityBadge';
import { queueStatusMap } from '@/components/reception/statusMaps';
import { QueueActionsMenu } from './QueueActionsMenu';

const columns = ['#', 'Patient', 'Doctor', 'Arrival Time', 'Waiting', 'Priority', 'Status', ''];

export function QueueTable({ queue, onAction, onClearFilters }) {
  if (queue.length === 0) {
    return (
      <EmptyState
        icon={UsersRound}
        title="No waiting patients"
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
      <Table className="min-w-[880px]">
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
          {queue.map((entry, index) => (
            <TableRow key={entry.id} className={`border-b-0 hover:bg-transparent ${index % 2 ? 'bg-slate-50/70' : 'bg-white'}`}>
              <TableCell className="px-4 py-3.5 pl-5 font-mono text-xs text-slate-500">{entry.queueNumber}</TableCell>
              <TableCell className="px-4 py-3.5">
                <div className="flex items-center gap-2.5">
                  <PatientAvatar name={entry.patientName} size="size-8" />
                  <span className="text-sm font-medium text-slate-900">{entry.patientName}</span>
                </div>
              </TableCell>
              <TableCell className="px-4 py-3.5 text-sm text-slate-600">{entry.doctorName}</TableCell>
              <TableCell className="px-4 py-3.5 text-sm text-slate-600">{entry.arrivalTime}</TableCell>
              <TableCell className="px-4 py-3.5 text-sm text-slate-600">{entry.waitingMinutes} min</TableCell>
              <TableCell className="px-4 py-3.5">
                <PriorityBadge priority={entry.priority} />
              </TableCell>
              <TableCell className="px-4 py-3.5">
                <StatusBadge status={entry.status} map={queueStatusMap} />
              </TableCell>
              <TableCell className="px-4 py-3.5 pr-5">
                <div className="flex justify-end">
                  <QueueActionsMenu entry={entry} onAction={onAction} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
