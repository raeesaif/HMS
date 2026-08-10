import { Eye, ScrollText } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/shared/EmptyState';
import { RoleBadge } from '@/components/super-admin/RoleBadge';
import { StatusBadge } from '@/components/super-admin/StatusBadge';
import { activityStatusMap } from '@/components/super-admin/statusMaps';

const columns = ['Timestamp', 'User', 'Role', 'Hospital', 'Action', 'Resource', 'Status', ''];

export function ActivityLogsTable({ logs, onView, onClearFilters }) {
  if (logs.length === 0) {
    return (
      <EmptyState
        icon={ScrollText}
        title="No activity logs found"
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
      <Table className="min-w-[1000px]">
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
          {logs.map((log, index) => (
            <TableRow key={log.id} className={`border-b-0 hover:bg-transparent ${index % 2 ? 'bg-slate-50/70' : 'bg-white'}`}>
              <TableCell className="px-4 py-3.5 pl-5 text-xs text-slate-500">{log.timestamp}</TableCell>
              <TableCell className="px-4 py-3.5 text-sm font-medium text-slate-900">{log.userName}</TableCell>
              <TableCell className="px-4 py-3.5">
                <RoleBadge role={log.role} />
              </TableCell>
              <TableCell className="px-4 py-3.5 text-sm text-slate-600">{log.hospitalName}</TableCell>
              <TableCell className="px-4 py-3.5 text-xs text-slate-500">{log.action}</TableCell>
              <TableCell className="px-4 py-3.5 text-xs text-slate-500">{log.resource}</TableCell>
              <TableCell className="px-4 py-3.5">
                <StatusBadge status={log.status} map={activityStatusMap} />
              </TableCell>
              <TableCell className="px-4 py-3.5 pr-5">
                <div className="flex justify-end">
                  <Button variant="ghost" size="icon-sm" title="View Details" aria-label="View Details" onClick={() => onView(log)}>
                    <Eye className="size-4" />
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
