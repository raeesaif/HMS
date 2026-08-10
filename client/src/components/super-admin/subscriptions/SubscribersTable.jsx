import { Users } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/shared/EmptyState';
import { StatusBadge } from '@/components/super-admin/StatusBadge';
import { hospitalStatusMap } from '@/components/super-admin/statusMaps';

const columns = ['Hospital', 'Plan', 'Start Date', 'Billing Cycle', 'Amount', 'Status', ''];

export function SubscribersTable({ subscribers, onView }) {
  if (subscribers.length === 0) {
    return <EmptyState icon={Users} title="No subscribers" description="No hospitals are subscribed to this plan yet." />;
  }

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-[820px]">
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
          {subscribers.map((hospital, index) => (
            <TableRow key={hospital.id} className={`border-b-0 hover:bg-transparent ${index % 2 ? 'bg-slate-50/70' : 'bg-white'}`}>
              <TableCell className="px-4 py-3.5 pl-5 text-sm font-medium text-slate-900">{hospital.name}</TableCell>
              <TableCell className="px-4 py-3.5 text-sm text-slate-600">{hospital.plan}</TableCell>
              <TableCell className="px-4 py-3.5 text-xs text-slate-500">{hospital.registrationDate}</TableCell>
              <TableCell className="px-4 py-3.5 text-xs text-slate-500">Monthly</TableCell>
              <TableCell className="px-4 py-3.5 text-sm text-slate-600">${hospital.planDetails?.monthlyPrice ?? 0}</TableCell>
              <TableCell className="px-4 py-3.5">
                <StatusBadge status={hospital.status} map={hospitalStatusMap} />
              </TableCell>
              <TableCell className="px-4 py-3.5 pr-5">
                <div className="flex justify-end">
                  <Button variant="ghost" size="sm" onClick={() => onView(hospital)}>
                    View
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
