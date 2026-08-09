import { Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { EmptyState } from '@/shared/EmptyState';
import { StatusBadge } from '@/components/reception/StatusBadge';
import { PriorityBadge } from '@/components/reception/PriorityBadge';
import { TableSkeleton } from '@/components/reception/LoadingSkeleton';
import { emergencyStatusMap } from '@/components/reception/statusMaps';

export function EmergencyOverview({ emergencies = [], isLoading = false, onViewAll }) {
  return (
    <Card className="gap-0 overflow-hidden rounded-xl border-border py-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between border-b border-border px-5 py-5">
        <div>
          <CardTitle className="text-base font-semibold">Emergency Overview</CardTitle>
          <p className="mt-0.5 text-xs text-slate-500">{emergencies.length} emergency patients tracked</p>
        </div>
        <Button variant="outline" size="sm" onClick={onViewAll}>
          View All
        </Button>
      </CardHeader>

      {isLoading ? (
        <TableSkeleton rows={4} cols={4} />
      ) : emergencies.length === 0 ? (
        <EmptyState icon={Activity} title="No emergency patients" description="There are no active emergency arrivals." />
      ) : (
        <div className="overflow-x-auto">
          <Table className="min-w-[640px]">
            <TableHeader className="bg-slate-50 [&_tr]:border-b-0">
              <TableRow className="hover:bg-transparent">
                {['Patient', 'Priority', 'Arrival Time', 'Status'].map((label) => (
                  <TableHead key={label} className="h-auto px-4 py-3 text-[11px] font-medium text-slate-500 first:pl-5">
                    {label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {emergencies.map((entry, index) => (
                <TableRow key={entry.id} className={`border-b-0 hover:bg-transparent ${index % 2 ? 'bg-slate-50/70' : 'bg-white'}`}>
                  <TableCell className="px-4 py-3 pl-5 text-sm font-medium text-slate-900">{entry.patientName}</TableCell>
                  <TableCell className="px-4 py-3">
                    <PriorityBadge priority={entry.priority} />
                  </TableCell>
                  <TableCell className="px-4 py-3 text-xs text-slate-500">{entry.arrivalTime}</TableCell>
                  <TableCell className="px-4 py-3">
                    <StatusBadge status={entry.status} map={emergencyStatusMap} />
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
