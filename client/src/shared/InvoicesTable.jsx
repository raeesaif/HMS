import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';

import { DataTable } from '@/shared/DataTable';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { INVOICE_STATUSES } from '@/constants/billing';
import { invoicesData } from '@/data/invoices';

const STATUS_STYLES = {
  Paid: { dot: 'bg-emerald-500', text: 'text-emerald-700', bg: 'bg-emerald-50' },
  Pending: { dot: 'bg-amber-500', text: 'text-amber-700', bg: 'bg-amber-50' },
  Overdue: { dot: 'bg-red-500', text: 'text-red-700', bg: 'bg-red-50' },
};

const HeaderLabel = ({ children, className = '' }) => (
  <span
    className={`text-[11px] font-semibold uppercase tracking-wider text-slate-400 ${className}`}
  >
    {children}
  </span>
);

const formatAmount = (amount) =>
  `$${amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const NativeSelect = ({ className = '', children, ...props }) => (
  <select
    className={`h-9 shrink-0 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-600 outline-none transition-colors focus-visible:border-blue-400 focus-visible:ring-3 focus-visible:ring-blue-100 ${className}`}
    {...props}
  >
    {children}
  </select>
);

const buildInvoiceColumns = ({ onView, onRemind }) => [
  {
    accessorKey: 'id',
    header: () => <HeaderLabel>Invoice</HeaderLabel>,
    cell: (info) => (
      <span className="font-medium text-blue-600">{info.getValue()}</span>
    ),
  },
  {
    accessorKey: 'patient',
    header: () => <HeaderLabel>Patient</HeaderLabel>,
    cell: (info) => (
      <span className="font-medium text-slate-800">{info.getValue()}</span>
    ),
  },
  {
    accessorKey: 'date',
    header: () => <HeaderLabel>Date</HeaderLabel>,
    cell: (info) => <span className="text-slate-500">{info.getValue()}</span>,
  },
  {
    accessorKey: 'method',
    header: () => <HeaderLabel>Method</HeaderLabel>,
    cell: (info) => <span className="text-slate-500">{info.getValue()}</span>,
  },
  {
    accessorKey: 'amount',
    header: () => <HeaderLabel>Amount</HeaderLabel>,
    cell: (info) => (
      <span className="font-semibold text-slate-800">
        {formatAmount(info.getValue())}
      </span>
    ),
  },
  {
    accessorKey: 'status',
    header: () => <HeaderLabel>Status</HeaderLabel>,
    cell: (info) => {
      const status = info.getValue();
      const style = STATUS_STYLES[status] ?? STATUS_STYLES.Paid;
      return (
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${style.bg} ${style.text}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
          {status}
        </span>
      );
    },
  },
  {
    id: 'actions',
    header: () => <HeaderLabel className="block text-right">Actions</HeaderLabel>,
    cell: ({ row }) => {
      const invoice = row.original;
      const showRemind =
        invoice.status === 'Pending' || invoice.status === 'Overdue';
      return (
        <div className="flex items-center justify-end gap-1.5">
          <Button size="sm" onClick={() => onView?.(invoice)}>
            View
          </Button>
          {showRemind && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onRemind?.(invoice)}
            >
              Remind
            </Button>
          )}
        </div>
      );
    },
  },
];

const InvoicesTable = ({
  data = invoicesData,
  totalCount = 1204,
  onView,
  onRemind,
}) => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');

  const columns = useMemo(
    () => buildInvoiceColumns({ onView, onRemind }),
    [onView, onRemind]
  );

  const filteredData = useMemo(() => {
    const query = search.trim().toLowerCase();
    return data.filter((invoice) => {
      const matchesSearch =
        !query ||
        invoice.id.toLowerCase().includes(query) ||
        invoice.patient.toLowerCase().includes(query);
      const matchesStatus = status === 'all' || invoice.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [data, search, status]);

  return (
    <div className="w-full rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_1px_3px_rgba(15,23,42,0.06)]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-800">Recent invoices</h3>
          <p className="mt-0.5 text-sm text-slate-400">
            Sorted by date · {filteredData.length} of{' '}
            {totalCount.toLocaleString()}
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <NativeSelect value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="all">All statuses</option>
            {INVOICE_STATUSES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </NativeSelect>
          <div className="relative w-full sm:w-56">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search invoice..."
              className="h-9 rounded-lg pr-9"
            />
            <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
        </div>
      </div>

      <div className="mt-4">
        <DataTable columns={columns} data={filteredData} />
      </div>
    </div>
  );
};

export default InvoicesTable;
