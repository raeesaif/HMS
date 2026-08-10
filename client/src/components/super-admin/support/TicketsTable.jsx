import { LifeBuoy } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/shared/EmptyState';
import { StatusBadge } from '@/components/super-admin/StatusBadge';
import { PriorityBadge } from '@/components/super-admin/PriorityBadge';
import { ticketStatusMap } from '@/components/super-admin/statusMaps';

const columns = ['Ticket ID', 'Hospital', 'User', 'Subject', 'Category', 'Priority', 'Status', 'Created', 'Assigned To', ''];

export function TicketsTable({ tickets, onView, onClearFilters }) {
  if (tickets.length === 0) {
    return (
      <EmptyState
        icon={LifeBuoy}
        title="No support tickets found"
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
      <Table className="min-w-[1100px]">
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
          {tickets.map((ticket, index) => (
            <TableRow
              key={ticket.id}
              onClick={() => onView(ticket)}
              className={`cursor-pointer border-b-0 hover:bg-slate-50 ${index % 2 ? 'bg-slate-50/70' : 'bg-white'}`}
            >
              <TableCell className="px-4 py-3.5 pl-5 font-mono text-xs text-slate-500">{ticket.id}</TableCell>
              <TableCell className="px-4 py-3.5 text-sm text-slate-600">{ticket.hospitalName}</TableCell>
              <TableCell className="px-4 py-3.5 text-sm text-slate-600">{ticket.userName}</TableCell>
              <TableCell className="max-w-[200px] truncate px-4 py-3.5 text-sm font-medium text-slate-900">{ticket.subject}</TableCell>
              <TableCell className="px-4 py-3.5 text-xs text-slate-500">{ticket.category}</TableCell>
              <TableCell className="px-4 py-3.5">
                <PriorityBadge priority={ticket.priority} />
              </TableCell>
              <TableCell className="px-4 py-3.5">
                <StatusBadge status={ticket.status} map={ticketStatusMap} />
              </TableCell>
              <TableCell className="px-4 py-3.5 text-xs text-slate-500">{ticket.createdAt}</TableCell>
              <TableCell className="px-4 py-3.5 text-xs text-slate-500">{ticket.assignedTo}</TableCell>
              <TableCell className="px-4 py-3.5 pr-5">
                <Button variant="ghost" size="sm" onClick={(event) => { event.stopPropagation(); onView(ticket); }}>
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
