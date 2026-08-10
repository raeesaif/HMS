import { Eye, MoreVertical, SquarePen, ShieldOff } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { StatusBadge } from '@/components/super-admin/StatusBadge';
import { PlanBadge } from '@/components/super-admin/PlanBadge';
import { hospitalStatusMap } from '@/components/super-admin/statusMaps';

const columns = ['Hospital', 'Admin', 'Plan', 'Users', 'Registered', 'Status', ''];

export function RecentHospitalsTable({ hospitals, onAction, onViewAll }) {
  return (
    <Card className="gap-0 overflow-hidden rounded-xl border-border py-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between border-b border-border px-5 py-5">
        <CardTitle className="text-base font-semibold">Recent Hospitals</CardTitle>
        <Button variant="outline" size="sm" onClick={onViewAll}>
          View All
        </Button>
      </CardHeader>
      <div className="overflow-x-auto">
        <Table className="min-w-[760px]">
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
                <TableCell className="px-4 py-3 pl-5 text-sm font-medium text-slate-900">{hospital.name}</TableCell>
                <TableCell className="px-4 py-3 text-sm text-slate-600">{hospital.adminName}</TableCell>
                <TableCell className="px-4 py-3">
                  <PlanBadge plan={hospital.plan} />
                </TableCell>
                <TableCell className="px-4 py-3 text-sm text-slate-600">{hospital.totalUsers.toLocaleString()}</TableCell>
                <TableCell className="px-4 py-3 text-xs text-slate-500">{hospital.registrationDate}</TableCell>
                <TableCell className="px-4 py-3">
                  <StatusBadge status={hospital.status} map={hospitalStatusMap} />
                </TableCell>
                <TableCell className="px-4 py-3 pr-5">
                  <DropdownMenu>
                    <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Hospital actions" />}>
                      <MoreVertical className="size-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onAction('view', hospital)}>
                        <Eye /> View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onAction('edit', hospital)}>
                        <SquarePen /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem variant="destructive" onClick={() => onAction('suspend', hospital)}>
                        <ShieldOff /> Suspend
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
