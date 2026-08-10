import { Eye, Megaphone } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/shared/EmptyState';
import { StatusBadge } from '@/components/super-admin/StatusBadge';
import { notificationStatusMap } from '@/components/super-admin/statusMaps';

const columns = ['Title', 'Type', 'Recipients', 'Created', 'Scheduled', 'Status', ''];

export function AnnouncementsTable({ announcements, onView, emptyMessage }) {
  if (announcements.length === 0) {
    return <EmptyState icon={Megaphone} title={emptyMessage} className="py-16" />;
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
          {announcements.map((announcement, index) => (
            <TableRow key={announcement.id} className={`border-b-0 hover:bg-transparent ${index % 2 ? 'bg-slate-50/70' : 'bg-white'}`}>
              <TableCell className="px-4 py-3.5 pl-5 text-sm font-medium text-slate-900">{announcement.title}</TableCell>
              <TableCell className="px-4 py-3.5 text-xs text-slate-500">{announcement.type}</TableCell>
              <TableCell className="px-4 py-3.5 text-xs text-slate-500">{announcement.recipients}</TableCell>
              <TableCell className="px-4 py-3.5 text-xs text-slate-500">{announcement.createdAt}</TableCell>
              <TableCell className="px-4 py-3.5 text-xs text-slate-500">{announcement.scheduledFor ?? '—'}</TableCell>
              <TableCell className="px-4 py-3.5">
                <StatusBadge status={announcement.status} map={notificationStatusMap} />
              </TableCell>
              <TableCell className="px-4 py-3.5 pr-5">
                <div className="flex justify-end">
                  <Button variant="ghost" size="icon-sm" title="View" aria-label="View" onClick={() => onView(announcement)}>
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
