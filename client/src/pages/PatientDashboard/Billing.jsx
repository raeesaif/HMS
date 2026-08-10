import { useMemo, useState } from 'react';
import { Card } from '@/components/ui/card';
import { SearchInput } from '@/shared/SearchInput';
import { FilterDropdown } from '@/shared/FilterDropdown';
import { PatientStatsCard } from '@/components/patient/PatientStatsCard';
import { FilterBar } from '@/components/patient/FilterBar';
import { ErrorState } from '@/components/patient/ErrorState';
import { StatsRowSkeleton, FiltersSkeleton, TableSkeleton } from '@/components/patient/LoadingSkeleton';
import { BillingTable } from '@/components/patient/billing/BillingTable';
import { InvoiceDetailsDialog } from '@/components/dialogs/patient/InvoiceDetailsDialog';
import { PaymentDialog } from '@/components/dialogs/patient/PaymentDialog';
import { PaymentHistoryDialog } from '@/components/dialogs/patient/PaymentHistoryDialog';
import { usePatientBilling } from '@/hooks/patient/usePatientBilling';
import { submitPayment } from '@/services/patient/billingService';
import { getBillingStats } from '@/data/patientBilling';
import { downloadInvoice } from '@/lib/patientInvoicePrint';

const statusOptions = ['Paid', 'Partially Paid', 'Pending', 'Overdue', 'Cancelled'];

const Billing = () => {
  const { invoices, stats, isLoading, error, reload } = usePatientBilling();

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');

  const [activeInvoice, setActiveInvoice] = useState(null);
  const [openDialog, setOpenDialog] = useState(null);

  const filteredInvoices = useMemo(() => {
    const query = search.trim().toLowerCase();
    return invoices.filter((invoice) => {
      const matchesSearch = !query || invoice.id.toLowerCase().includes(query) || invoice.description.toLowerCase().includes(query);
      const matchesStatus = status === 'all' || invoice.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [invoices, search, status]);

  const handleClearFilters = () => {
    setSearch('');
    setStatus('all');
  };

  const closeDialog = (next) => {
    if (!next) setOpenDialog(null);
  };

  const handleAction = (action, invoice) => {
    setActiveInvoice(invoice);
    if (action === 'download') {
      downloadInvoice(invoice);
      return;
    }
    setOpenDialog(action);
  };

  const handleSubmitPayment = (invoiceId, payload) => {
    submitPayment(invoiceId, payload);
  };

  const liveStats = stats ?? getBillingStats(invoices);

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6">
      <section>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Billing</h1>
        <p className="mt-1 text-sm text-slate-500">Review your invoices and make payments.</p>
      </section>

      {isLoading ? (
        <StatsRowSkeleton count={4} />
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <PatientStatsCard icon="billing" tone="red" value={`PKR ${liveStats.totalOutstanding.toLocaleString()}`} title="Total Outstanding" />
          <PatientStatsCard icon="billing" tone="green" value={`PKR ${liveStats.totalPaid.toLocaleString()}`} title="Total Paid" />
          <PatientStatsCard icon="billing" tone="amber" value={liveStats.pendingInvoices} title="Pending Invoices" />
          <PatientStatsCard
            icon="billing"
            tone="blue"
            value={liveStats.lastPayment ? `PKR ${liveStats.lastPayment.amount.toLocaleString()}` : '—'}
            title="Last Payment"
            description={liveStats.lastPayment?.date}
          />
        </section>
      )}

      {error ? (
        <ErrorState onRetry={reload} />
      ) : (
        <Card className="gap-0 overflow-hidden rounded-xl border-border py-0 shadow-sm">
          <div className="border-b border-border p-5">
            {isLoading ? (
              <FiltersSkeleton />
            ) : (
              <FilterBar>
                <SearchInput value={search} onChange={setSearch} placeholder="Search by invoice ID or description..." className="sm:w-72" />
                <FilterDropdown label="Status" value={status} onChange={setStatus} options={statusOptions.map((option) => ({ value: option, label: option }))} />
              </FilterBar>
            )}
          </div>

          {isLoading ? (
            <TableSkeleton rows={5} cols={8} />
          ) : (
            <BillingTable invoices={filteredInvoices} onAction={handleAction} onClearFilters={handleClearFilters} />
          )}
        </Card>
      )}

      <InvoiceDetailsDialog invoice={activeInvoice} open={openDialog === 'view'} onOpenChange={closeDialog} />
      <PaymentDialog invoice={activeInvoice} open={openDialog === 'pay'} onOpenChange={closeDialog} onSubmit={handleSubmitPayment} />
      <PaymentHistoryDialog invoice={activeInvoice} open={openDialog === 'history'} onOpenChange={closeDialog} />
    </div>
  );
};

export default Billing;
