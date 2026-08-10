import { Building2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/shared/EmptyState';
import { StatusBadge } from '@/components/super-admin/StatusBadge';
import { PlanBadge } from '@/components/super-admin/PlanBadge';
import { hospitalStatusMap } from '@/components/super-admin/statusMaps';
import { HospitalsActionsMenu } from './HospitalsActionsMenu';

const columns = ['Hospital', 'Code', 'Admin', 'Email', 'Phone', 'Subscription', 'Users', 'Registered', 'Status', ''];

export function HospitalsTable({ hospitals, onAction, onClearFilters }) {
  if (hospitals.length === 0) {
    return (
      <EmptyState
        icon={Building2}
        title="No hospitals found"
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
      <Table className="min-w-[1180px]">
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
          {hospitals.map((hospital, index) => (
            <TableRow key={hospital.id} className={`border-b-0 hover:bg-transparent ${index % 2 ? 'bg-slate-50/70' : 'bg-white'}`}>
              <TableCell className="px-4 py-3.5 pl-5 text-sm font-medium text-slate-900">{hospital.name}</TableCell>
              <TableCell className="px-4 py-3.5 font-mono text-xs text-slate-500">{hospital.code}</TableCell>
              <TableCell className="px-4 py-3.5 text-sm text-slate-600">{hospital.adminName}</TableCell>
              <TableCell className="px-4 py-3.5 text-xs text-slate-500">{hospital.email}</TableCell>
              <TableCell className="px-4 py-3.5 text-xs text-slate-500">{hospital.phone}</TableCell>
              <TableCell className="px-4 py-3.5">
                <PlanBadge plan={hospital.plan} />
              </TableCell>
              <TableCell className="px-4 py-3.5 text-sm text-slate-600">{hospital.totalUsers.toLocaleString()}</TableCell>
              <TableCell className="px-4 py-3.5 text-xs text-slate-500">{hospital.registrationDate}</TableCell>
              <TableCell className="px-4 py-3.5">
                <StatusBadge status={hospital.status} map={hospitalStatusMap} />
              </TableCell>
              <TableCell className="px-4 py-3.5 pr-5">
                <div className="flex justify-end">
                  <HospitalsActionsMenu hospital={hospital} onAction={onAction} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
