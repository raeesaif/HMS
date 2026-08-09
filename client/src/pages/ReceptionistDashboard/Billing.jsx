import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { SearchInput } from '@/shared/SearchInput';
import { FilterDropdown } from '@/shared/FilterDropdown';
import { ReceptionStatsCard } from '@/components/reception/ReceptionStatsCard';
import { FilterBar } from '@/components/reception/FilterBar';
import { ErrorState } from '@/components/reception/ErrorState';
import { StatsRowSkeleton, FiltersSkeleton, TableSkeleton } from '@/components/reception/LoadingSkeleton';
import { BillingTable } from '@/components/reception/billing/BillingTable';
import { PaymentDialog } from '@/components/dialogs/receptionist/PaymentDialog';
import { InvoiceDetailsDialog } from '@/components/dialogs/receptionist/InvoiceDetailsDialog';
import { useBilling } from '@/hooks/useBilling';
import { collectPayment } from '@/services/billingService';
import { getBillingStats, invoiceStatusOptions } from '@/data/receptionistBilling';
import { printInvoice } from '@/lib/invoicePrint';

const Billing = () => {
  const { invoices, setInvoices, stats, isLoading, error, reload } = useBilling();

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');

  const [activeInvoice, setActiveInvoice] = useState(null);
  const [openDialog, setOpenDialog] = useState(null);

  const filteredInvoices = useMemo(() => {
    const query = search.trim().toLowerCase();
    return invoices.filter((invoice) => {
      const matchesSearch = !query || invoice.patientName.toLowerCase().includes(query) || invoice.id.toLowerCase().includes(query);
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
    if (action === 'print') {
      printInvoice(invoice);
      return;
    }
    setOpenDialog(action);
  };

  const handleCollectPayment = (invoiceId, payload) => {
    collectPayment(invoiceId, payload).then(() => {
      setInvoices((current) =>
        current.map((invoice) =>
          invoice.id === invoiceId
            ? {
                ...invoice,
                paid: payload.paid,
                remaining: payload.remaining,
                status: payload.status,
                paymentHistory: [
                  { id: `PMT-${Date.now()}`, ...payload.payment, collectedBy: 'Neha Kapoor' },
                  ...invoice.paymentHistory,
                ],
              }
            : invoice
        )
      );
      toast.success('Payment recorded');
    });
  };

  const liveStats = stats ?? getBillingStats(invoices);

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6">
      <section>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Billing</h1>
        <p className="mt-1 text-sm text-slate-500">Collect payments and review patient billing records.</p>
      </section>

      {isLoading ? (
        <StatsRowSkeleton count={4} />
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <ReceptionStatsCard icon="billing" tone="green" value={`PKR ${liveStats.todaysRevenue.toLocaleString()}`} title="Today's Revenue" />
          <ReceptionStatsCard icon="clock" tone="amber" value={liveStats.pendingBills} title="Pending Bills" />
          <ReceptionStatsCard icon="check" tone="blue" value={liveStats.paidBills} title="Paid Bills" />
          <ReceptionStatsCard icon="alert" tone="red" value={`PKR ${liveStats.outstandingAmount.toLocaleString()}`} title="Outstanding Amount" />
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
                <SearchInput value={search} onChange={setSearch} placeholder="Search by patient or invoice ID..." className="sm:w-72" />
                <FilterDropdown label="Status" value={status} onChange={setStatus} options={invoiceStatusOptions.map((option) => ({ value: option, label: option }))} />
              </FilterBar>
            )}
          </div>

          {isLoading ? (
            <TableSkeleton rows={6} cols={9} />
          ) : (
            <BillingTable invoices={filteredInvoices} onAction={handleAction} onClearFilters={handleClearFilters} />
          )}
        </Card>
      )}

      <PaymentDialog invoice={activeInvoice} open={openDialog === 'collect'} onOpenChange={closeDialog} onConfirm={handleCollectPayment} />
      <InvoiceDetailsDialog invoice={activeInvoice} open={openDialog === 'view'} onOpenChange={closeDialog} />
    </div>
  );
};

export default Billing;
