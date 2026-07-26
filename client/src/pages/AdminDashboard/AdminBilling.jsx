import PageHeader from '@/shared/PageHeader';
import InvoicesTable from '@/shared/InvoicesTable';
import { Button } from '@/components/ui/button';
import { Download, Plus } from 'lucide-react';
import { BILLING_SUMMARY, invoicesData } from '@/data/invoices';

const AdminBilling = () => {
  return (
    <div className="min-h-screen bg-slate-100 -m-4 sm:-m-6 p-4 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PageHeader
          title="Billing & Invoicing"
          subtitle="Manage patient invoices, payments and insurance claims"
        />
        <div className="flex shrink-0 items-center gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New invoice
          </Button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {BILLING_SUMMARY.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.06)]"
          >
            <p className="text-sm text-slate-500">{item.label}</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{item.value}</p>
            <span
              className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ${item.badge}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${item.dot}`} />
              Live
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <InvoicesTable data={invoicesData} />
      </div>
    </div>
  );
};

export default AdminBilling;
