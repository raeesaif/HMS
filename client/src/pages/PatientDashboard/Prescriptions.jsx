import { useMemo, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Pagination } from '@/shared/Pagination';
import { ErrorState } from '@/components/patient/ErrorState';
import { TableSkeleton } from '@/components/patient/LoadingSkeleton';
import { PrescriptionsTable } from '@/components/patient/prescriptions/PrescriptionsTable';
import { PrescriptionDetailsDialog } from '@/components/dialogs/patient/PrescriptionDetailsDialog';
import { usePrescriptions } from '@/hooks/patient/usePrescriptions';
import { printPrescription } from '@/lib/patientPrescriptionPrint';

const PAGE_SIZE = 7;

const tabFilters = {
  active: (prescription) => prescription.status === 'Active',
  completed: (prescription) => prescription.status === 'Completed',
  expired: (prescription) => prescription.status === 'Expired',
};

const emptyMessages = {
  active: 'No active prescriptions.',
  completed: 'No completed prescriptions.',
  expired: 'No expired prescriptions.',
};

const Prescriptions = () => {
  const { prescriptions, isLoading, error, reload } = usePrescriptions();

  const [tab, setTab] = useState('active');
  const [page, setPage] = useState(1);
  const [activePrescription, setActivePrescription] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const filteredPrescriptions = useMemo(
    () => prescriptions.filter(tabFilters[tab]).sort((a, b) => new Date(b.issuedDate) - new Date(a.issuedDate)),
    [prescriptions, tab]
  );

  const totalPages = Math.max(1, Math.ceil(filteredPrescriptions.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginatedPrescriptions = filteredPrescriptions.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6">
      <section>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Prescriptions</h1>
        <p className="mt-1 text-sm text-slate-500">Review your medications prescribed by your care team.</p>
      </section>

      <Tabs value={tab} onValueChange={(value) => { setTab(value); setPage(1); }}>
        <TabsList>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>
      </Tabs>

      {error ? (
        <ErrorState onRetry={reload} />
      ) : (
        <Card className="gap-0 overflow-hidden rounded-xl border-border py-0 shadow-sm">
          {isLoading ? (
            <TableSkeleton rows={6} cols={8} />
          ) : (
            <PrescriptionsTable
              prescriptions={paginatedPrescriptions}
              onView={(prescription) => {
                setActivePrescription(prescription);
                setDetailsOpen(true);
              }}
              emptyMessage={emptyMessages[tab]}
            />
          )}

          {!isLoading && filteredPrescriptions.length > 0 && (
            <Pagination
              page={currentPage}
              totalPages={totalPages}
              onPageChange={setPage}
              showingLabel={`Showing ${(currentPage - 1) * PAGE_SIZE + 1}-${Math.min(currentPage * PAGE_SIZE, filteredPrescriptions.length)} of ${filteredPrescriptions.length} prescriptions`}
              className="border-t border-border px-5 py-4"
            />
          )}
        </Card>
      )}

      <PrescriptionDetailsDialog prescription={activePrescription} open={detailsOpen} onOpenChange={setDetailsOpen} onPrint={printPrescription} />
    </div>
  );
};

export default Prescriptions;
