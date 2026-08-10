import { useMemo, useState } from 'react';
import { LifeBuoy } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SearchInput } from '@/shared/SearchInput';
import { FilterDropdown } from '@/shared/FilterDropdown';
import StatsCard from '@/shared/StatsCard';
import { FilterBar } from '@/components/super-admin/FilterBar';
import { ErrorState } from '@/components/super-admin/ErrorState';
import { StatsRowSkeleton, FiltersSkeleton, TableSkeleton } from '@/components/super-admin/LoadingSkeleton';
import { TicketsTable } from '@/components/super-admin/support/TicketsTable';
import { CreateSupportTicketDialog } from '@/components/dialogs/super-admin/CreateSupportTicketDialog';
import { TicketDetailsDialog } from '@/components/dialogs/super-admin/TicketDetailsDialog';
import {
  useTickets,
  useCreateTicket,
  useReplyToTicket,
  useAssignTicket,
  useUpdateTicketStatus,
  useUpdateTicketPriority,
} from '@/hooks/superAdmin/useSupport';
import { ticketCategoryOptions, ticketPriorityOptions, ticketStatusOptions, staffOptions } from '@/data/superAdmin/support';
import { hospitals } from '@/data/superAdmin/hospitals';

const Support = () => {
  const { data: tickets = [], isLoading, isError, refetch } = useTickets();

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [priority, setPriority] = useState('all');
  const [hospitalId, setHospitalId] = useState('all');
  const [assignedTo, setAssignedTo] = useState('all');
  const [category, setCategory] = useState('all');

  const [activeTicket, setActiveTicket] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  const createTicket = useCreateTicket();
  const replyToTicket = useReplyToTicket();
  const assignTicket = useAssignTicket();
  const updateStatus = useUpdateTicketStatus();
  const updatePriority = useUpdateTicketPriority();

  const filteredTickets = useMemo(() => {
    const query = search.trim().toLowerCase();
    return tickets.filter((ticket) => {
      const matchesSearch = !query || ticket.subject.toLowerCase().includes(query) || ticket.userName.toLowerCase().includes(query);
      const matchesStatus = status === 'all' || ticket.status === status;
      const matchesPriority = priority === 'all' || ticket.priority === priority;
      const matchesHospital = hospitalId === 'all' || ticket.hospitalId === hospitalId;
      const matchesAssigned = assignedTo === 'all' || ticket.assignedTo === assignedTo;
      const matchesCategory = category === 'all' || ticket.category === category;
      return matchesSearch && matchesStatus && matchesPriority && matchesHospital && matchesAssigned && matchesCategory;
    });
  }, [tickets, search, status, priority, hospitalId, assignedTo, category]);

  const stats = {
    open: tickets.filter((t) => t.status === 'Open').length,
    inProgress: tickets.filter((t) => t.status === 'In Progress').length,
    waiting: tickets.filter((t) => t.status === 'Waiting').length,
    resolved: tickets.filter((t) => t.status === 'Resolved').length,
    critical: tickets.filter((t) => t.priority === 'Critical').length,
  };

  const handleClearFilters = () => {
    setSearch('');
    setStatus('all');
    setPriority('all');
    setHospitalId('all');
    setAssignedTo('all');
    setCategory('all');
  };

  const activeTicketFresh = tickets.find((t) => t.id === activeTicket?.id) ?? activeTicket;

  const handleCreate = (payload) => createTicket.mutate(payload);
  const handleReply = (ticketId, message) => replyToTicket.mutate({ ticketId, message });
  const handleAssign = (ticketId, assignedToValue) => assignTicket.mutate({ ticketId, assignedTo: assignedToValue });
  const handleStatusChange = (ticketId, value) => updateStatus.mutate({ ticketId, status: value });
  const handlePriorityChange = (ticketId, value) => updatePriority.mutate({ ticketId, priority: value });

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6">
      <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Support</h1>
          <p className="mt-1 text-sm text-slate-500">Manage support tickets raised by hospitals on the platform.</p>
        </div>
        <Button onClick={() => setCreateOpen(true)}>
          <LifeBuoy /> Create Ticket
        </Button>
      </section>

      {isLoading ? (
        <StatsRowSkeleton count={5} />
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <StatsCard icon={<LifeBuoy className="size-5" />} color="blue" title="Open" value={stats.open} />
          <StatsCard icon={<LifeBuoy className="size-5" />} color="purple" title="In Progress" value={stats.inProgress} />
          <StatsCard icon={<LifeBuoy className="size-5" />} color="yellow" title="Waiting" value={stats.waiting} />
          <StatsCard icon={<LifeBuoy className="size-5" />} color="green" title="Resolved" value={stats.resolved} />
          <StatsCard icon={<LifeBuoy className="size-5" />} color="red" title="Critical" value={stats.critical} />
        </section>
      )}

      {isError ? (
        <ErrorState onRetry={refetch} />
      ) : (
        <Card className="gap-0 overflow-hidden rounded-xl border-border py-0 shadow-sm">
          <div className="border-b border-border p-5">
            {isLoading ? (
              <FiltersSkeleton />
            ) : (
              <FilterBar>
                <SearchInput value={search} onChange={setSearch} placeholder="Search tickets..." className="sm:w-56" />
                <FilterDropdown label="Status" value={status} onChange={setStatus} options={ticketStatusOptions.map((o) => ({ value: o, label: o }))} />
                <FilterDropdown label="Priority" value={priority} onChange={setPriority} options={ticketPriorityOptions.map((o) => ({ value: o, label: o }))} />
                <FilterDropdown label="Hospital" value={hospitalId} onChange={setHospitalId} options={hospitals.map((h) => ({ value: h.id, label: h.name }))} />
                <FilterDropdown label="Assigned" value={assignedTo} onChange={setAssignedTo} options={staffOptions.map((o) => ({ value: o, label: o }))} />
                <FilterDropdown label="Category" value={category} onChange={setCategory} options={ticketCategoryOptions.map((o) => ({ value: o, label: o }))} />
              </FilterBar>
            )}
          </div>

          {isLoading ? (
            <TableSkeleton rows={5} cols={10} />
          ) : (
            <TicketsTable
              tickets={filteredTickets}
              onView={(ticket) => {
                setActiveTicket(ticket);
                setDetailsOpen(true);
              }}
              onClearFilters={handleClearFilters}
            />
          )}
        </Card>
      )}

      <CreateSupportTicketDialog open={createOpen} onOpenChange={setCreateOpen} onSave={handleCreate} />
      <TicketDetailsDialog
        ticket={activeTicketFresh}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        onReply={handleReply}
        onAssign={handleAssign}
        onStatusChange={handleStatusChange}
        onPriorityChange={handlePriorityChange}
      />
    </div>
  );
};

export default Support;
