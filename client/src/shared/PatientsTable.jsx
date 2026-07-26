import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal, Phone, MoreVertical } from 'lucide-react';

import { DataTable } from '@/shared/DataTable';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DEPARTMENTS, PATIENT_STATUSES } from '@/constants/patient';
import { patientsData } from '@/data/patients';

const STATUS_STYLES = {
  Stable: { dot: 'bg-emerald-500', text: 'text-emerald-700', bg: 'bg-emerald-50' },
  Observation: { dot: 'bg-amber-500', text: 'text-amber-700', bg: 'bg-amber-50' },
  Critical: { dot: 'bg-red-500', text: 'text-red-700', bg: 'bg-red-50' },
  Discharged: { dot: 'bg-teal-500', text: 'text-teal-700', bg: 'bg-teal-50' },
};

const HeaderLabel = ({ children }) => (
  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
    {children}
  </span>
);

const getInitials = (name) =>
  name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

const NativeSelect = ({ className = '', children, ...props }) => (
  <select
    className={`h-9 shrink-0 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-600 outline-none transition-colors focus-visible:border-blue-400 focus-visible:ring-3 focus-visible:ring-blue-100 ${className}`}
    {...props}
  >
    {children}
  </select>
);

const buildPatientColumns = ({ onView, onEdit, onDelete }) => [
  {
    accessorKey: 'id',
    header: () => <HeaderLabel>Patient ID</HeaderLabel>,
    cell: (info) => <span className="font-medium text-blue-600">{info.getValue()}</span>,
  },
  {
    accessorKey: 'name',
    header: () => <HeaderLabel>Name</HeaderLabel>,
    cell: (info) => (
      <div className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-semibold text-blue-600">
          {getInitials(info.getValue())}
        </span>
        <span className="font-medium text-slate-800">{info.getValue()}</span>
      </div>
    ),
  },
  {
    id: 'ageSex',
    header: () => <HeaderLabel>Age / Sex</HeaderLabel>,
    cell: ({ row }) => (
      <span className="text-slate-600">
        {row.original.age} &middot; {row.original.sex}
      </span>
    ),
  },
  {
    accessorKey: 'phone',
    header: () => <HeaderLabel>Contact</HeaderLabel>,
    cell: (info) => (
      <span className="inline-flex items-center gap-1.5 text-slate-500">
        <Phone className="h-3.5 w-3.5" />
        {info.getValue()}
      </span>
    ),
  },
  {
    accessorKey: 'department',
    header: () => <HeaderLabel>Department</HeaderLabel>,
    cell: (info) => <span className="text-slate-600">{info.getValue()}</span>,
  },
  {
    accessorKey: 'doctor',
    header: () => <HeaderLabel>Doctor</HeaderLabel>,
    cell: (info) => <span className="text-slate-600">{info.getValue()}</span>,
  },
  {
    accessorKey: 'admitted',
    header: () => <HeaderLabel>Admitted</HeaderLabel>,
    cell: (info) => <span className="text-slate-500">{info.getValue()}</span>,
  },
  {
    accessorKey: 'status',
    header: () => <HeaderLabel>Status</HeaderLabel>,
    cell: (info) => {
      const status = info.getValue();
      const style = STATUS_STYLES[status] ?? STATUS_STYLES.Stable;
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
    header: () => <HeaderLabel>Actions</HeaderLabel>,
    cell: ({ row }) => (
      <div className="flex items-center gap-1.5">
        <Button size="sm" onClick={() => onView?.(row.original)}>
          View
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" />}>
            <MoreVertical className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => onEdit?.(row.original)}>Edit</DropdownMenuItem>
            <DropdownMenuItem variant="destructive" onClick={() => onDelete?.(row.original)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
];

const PatientsTable = ({ data = patientsData, totalCount = 12483, onView, onEdit, onDelete }) => {
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('all');
  const [status, setStatus] = useState('all');

  const columns = useMemo(
    () => buildPatientColumns({ onView, onEdit, onDelete }),
    [onView, onEdit, onDelete]
  );

  const filteredData = useMemo(() => {
    const query = search.trim().toLowerCase();
    return data.filter((patient) => {
      const matchesSearch =
        !query ||
        patient.name.toLowerCase().includes(query) ||
        patient.id.toLowerCase().includes(query) ||
        patient.phone.toLowerCase().includes(query);
      const matchesDepartment = department === 'all' || patient.department === department;
      const matchesStatus = status === 'all' || patient.status === status;
      return matchesSearch && matchesDepartment && matchesStatus;
    });
  }, [data, search, department, status]);

  return (
    <div className="w-full rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_1px_3px_rgba(15,23,42,0.06)]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, ID or phone"
            className="h-10 rounded-lg pl-9"
          />
        </div>
        <NativeSelect value={department} onChange={(e) => setDepartment(e.target.value)}>
          <option value="all">All departments</option>
          {DEPARTMENTS.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </NativeSelect>
        <NativeSelect value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="all">All statuses</option>
          {PATIENT_STATUSES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </NativeSelect>
        <Button variant="outline" className="h-9">
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      <div className="mt-4">
        <DataTable columns={columns} data={filteredData} />
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-400">
          Showing 1-{filteredData.length} of {totalCount.toLocaleString()}
        </p>
        <div className="flex items-center gap-1.5">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button size="sm">1</Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PatientsTable;
