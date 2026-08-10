import { Users as UsersIcon } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/shared/EmptyState';
import { StatusBadge } from '@/components/super-admin/StatusBadge';
import { RoleBadge } from '@/components/super-admin/RoleBadge';
import { userStatusMap } from '@/components/super-admin/statusMaps';
import { UsersActionsMenu } from './UsersActionsMenu';

const columns = ['User', 'Email', 'Role', 'Hospital', 'Status', 'Created At', 'Last Login', ''];

export function UsersTable({ users, onAction, onClearFilters }) {
  if (users.length === 0) {
    return (
      <EmptyState
        icon={UsersIcon}
        title="No users found"
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
      <Table className="min-w-[1020px]">
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
          {users.map((user, index) => (
            <TableRow key={user.id} className={`border-b-0 hover:bg-transparent ${index % 2 ? 'bg-slate-50/70' : 'bg-white'}`}>
              <TableCell className="px-4 py-3.5 pl-5 text-sm font-medium text-slate-900">{user.name}</TableCell>
              <TableCell className="px-4 py-3.5 text-xs text-slate-500">{user.email}</TableCell>
              <TableCell className="px-4 py-3.5">
                <RoleBadge role={user.role} />
              </TableCell>
              <TableCell className="px-4 py-3.5 text-sm text-slate-600">{user.hospitalName}</TableCell>
              <TableCell className="px-4 py-3.5">
                <StatusBadge status={user.status} map={userStatusMap} />
              </TableCell>
              <TableCell className="px-4 py-3.5 text-xs text-slate-500">{user.createdAt}</TableCell>
              <TableCell className="px-4 py-3.5 text-xs text-slate-500">{user.lastLogin}</TableCell>
              <TableCell className="px-4 py-3.5 pr-5">
                <div className="flex justify-end">
                  <UsersActionsMenu user={user} onAction={onAction} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
