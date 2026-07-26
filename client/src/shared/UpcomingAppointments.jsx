import { DataTable } from '@/shared/DataTable';

const appointmentsData = [

  {
    time: '09:30',
    patient: 'Ama Owusu',
    doctor: 'Dr. Boateng',
    department: 'Cardiology',
    status: 'Confirmed',
  },
  {
    time: '10:15',
    patient: 'Kwesi Mensah',
    doctor: 'Dr. Adjei',
    department: 'Orthopedic',
    status: 'Pending',
  },
  {
    time: '11:00',
    patient: 'Yaa Serwaa',
    doctor: 'Dr. Osei',
    department: 'Pediatric',
    status: 'Confirmed',
  },
  {
    time: '11:45',
    patient: 'Kojo Antwi',
    doctor: 'Dr. Sarpong',
    department: 'Neurology',
    status: 'Urgent',
  },
];

const STATUS_STYLES = {
  Confirmed: {
    dot: 'bg-emerald-500',
    text: 'text-emerald-700',
    bg: 'bg-emerald-50',
  },
  Pending: {
    dot: 'bg-amber-500',
    text: 'text-amber-700',
    bg: 'bg-amber-50',
  },
  Urgent: {
    dot: 'bg-red-500',
    text: 'text-red-700',
    bg: 'bg-red-50',
  },
};

const HeaderLabel = ({ children }) => (
  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
    {children}
  </span>
);

const appointmentColumns = [
  {
    accessorKey: 'time',
    header: () => <HeaderLabel>Time</HeaderLabel>,
    cell: (info) => (
      <span className="font-medium text-slate-800">{info.getValue()}</span>
    ),
  },
  {
    accessorKey: 'patient',
    header: () => <HeaderLabel>Patient</HeaderLabel>,
    cell: (info) => <span className="text-slate-700">{info.getValue()}</span>,
  },
  {
    accessorKey: 'doctor',
    header: () => <HeaderLabel>Doctor</HeaderLabel>,
    cell: (info) => <span className="text-slate-500">{info.getValue()}</span>,
  },
  {
    accessorKey: 'department',
    header: () => <HeaderLabel>Department</HeaderLabel>,
    cell: (info) => <span className="text-slate-500">{info.getValue()}</span>,
  },
  {
    accessorKey: 'status',
    header: () => <HeaderLabel>Status</HeaderLabel>,
    cell: (info) => {
      const status = info.getValue();
      const style = STATUS_STYLES[status] ?? STATUS_STYLES.Pending;
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
];

const UpcomingAppointments = ({
  data = appointmentsData,
  title = 'Upcoming appointments',
  subtitle = 'Next slots today',
  onViewAll,
}) => {
  return (
    <div className="w-full rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_1px_3px_rgba(15,23,42,0.06)]">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-800">{title}</h3>
          <p className="mt-0.5 text-sm text-slate-400">{subtitle}</p>
        </div>
        <button
          type="button"
          onClick={onViewAll}
          className="text-sm font-medium text-blue-500 hover:text-blue-600 cursor-pointer"
        >
          View all
        </button>
      </div>

      {/* Table (DataTable is used as-is, styling applied via wrapper selectors) */}
      <div
        className="
          [&>div]:rounded-none [&>div]:border-0
          [&_thead]:bg-slate-50
          [&_th]:h-11 [&_th]:border-slate-100
          [&_tbody_tr]:border-slate-100
          [&_td]:py-4
        "
      >
        <DataTable columns={appointmentColumns} data={data} />
      </div>
    </div>
  );
};

export default UpcomingAppointments;
