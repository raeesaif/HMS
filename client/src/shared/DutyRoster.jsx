import { DataTable } from '@/shared/DataTable';

const HeaderLabel = ({ children }) => (
  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
    {children}
  </span>
);

const rosterColumns = [
  {
    accessorKey: 'day',
    header: () => <HeaderLabel>Day</HeaderLabel>,
    cell: (info) => <span className="font-semibold text-slate-800">{info.getValue()}</span>,
  },
  {
    accessorKey: 'morning',
    header: () => <HeaderLabel>Morning (08–14)</HeaderLabel>,
    cell: (info) => <span className="text-blue-600">{info.getValue()}</span>,
  },
  {
    accessorKey: 'afternoon',
    header: () => <HeaderLabel>Afternoon (14–20)</HeaderLabel>,
    cell: (info) => <span className="text-slate-600">{info.getValue()}</span>,
  },
  {
    accessorKey: 'night',
    header: () => <HeaderLabel>Night (20–08)</HeaderLabel>,
    cell: (info) => <span className="text-slate-600">{info.getValue()}</span>,
  },
];

const DutyRoster = ({
  data,
  title = 'Weekly duty roster',
  subtitle = 'Shift assignments — Cardiology unit',
}) => (
  <div className="w-full rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_1px_3px_rgba(15,23,42,0.06)]">
    <div className="mb-4">
      <h3 className="text-base font-bold text-slate-800">{title}</h3>
      <p className="mt-0.5 text-sm text-slate-400">{subtitle}</p>
    </div>
    <DataTable columns={rosterColumns} data={data} />
  </div>
);

export default DutyRoster;
