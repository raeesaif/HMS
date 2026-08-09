import { UsersRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { EmptyState } from '@/shared/EmptyState';
import { StatusBadge } from '@/components/reception/StatusBadge';
import { PriorityBadge } from '@/components/reception/PriorityBadge';
import { TableSkeleton } from '@/components/reception/LoadingSkeleton';
import { queueStatusMap } from '@/components/reception/statusMaps';

export function QueueOverview({ queue = [], isLoading = false, onViewAll }) {
  return (
    <Card className="gap-0 overflow-hidden rounded-xl border-border py-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between border-b border-border px-5 py-5">
        <div>
          <CardTitle className="text-base font-semibold">Waiting Queue</CardTitle>
          <p className="mt-0.5 text-xs text-slate-500">{queue.length} patients tracked</p>
        </div>
        <Button variant="outline" size="sm" onClick={onViewAll}>
          View Queue
        </Button>
      </CardHeader>

      {isLoading ? (
        <TableSkeleton rows={4} cols={5} />
      ) : queue.length === 0 ? (
        <EmptyState icon={UsersRound} title="No waiting patients" description="The queue is currently empty." />
      ) : (
        <div className="overflow-x-auto">
          <Table className="min-w-[640px]">
            <TableHeader className="bg-slate-50 [&_tr]:border-b-0">
              <TableRow className="hover:bg-transparent">
                {['#', 'Patient', 'Doctor', 'Priority', 'Status'].map((label) => (
                  <TableHead key={label} className="h-auto px-4 py-3 text-[11px] font-medium text-slate-500 first:pl-5">
                    {label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {queue.map((entry, index) => (
                <TableRow key={entry.id} className={`border-b-0 hover:bg-transparent ${index % 2 ? 'bg-slate-50/70' : 'bg-white'}`}>
                  <TableCell className="px-4 py-3 pl-5 font-mono text-xs text-slate-500">{entry.queueNumber}</TableCell>
                  <TableCell className="px-4 py-3 text-sm font-medium text-slate-900">{entry.patientName}</TableCell>
                  <TableCell className="px-4 py-3 text-sm text-slate-600">{entry.doctorName}</TableCell>
                  <TableCell className="px-4 py-3">
                    <PriorityBadge priority={entry.priority} />
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <StatusBadge status={entry.status} map={queueStatusMap} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </Card>
  );
}
