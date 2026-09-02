import { UsersRound } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EmptyState } from '@/shared/EmptyState';
import { PatientAvatar } from '@/components/reception/PatientAvatar';
import { PatientsActionsMenu } from './PatientsActionsMenu';

const columns = [
  'Patient ID',
  'Patient',
  'Age',
  'Gender',
  'Phone',
  'Blood Group',
  'Last Visit',
  'Status',
  '',
];

export function PatientsTable({ patients, onAction, onClearFilters }) {
  if (patients.length === 0) {
    return (
      <EmptyState
        icon={UsersRound}
        title="No patients found"
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
      <Table className="min-w-[920px]">
        <TableHeader className="bg-slate-50 [&_tr]:border-b-0">
          <TableRow className="hover:bg-transparent">
            {columns.map((label) => (
              <TableHead
                key={label || 'actions'}
                className="h-auto px-4 py-3 text-[11px] font-medium text-slate-500 first:pl-5 last:pr-5"
              >
                {label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map((patient, index) => (
            <TableRow
              key={patient.id}
              className={`border-b-0 hover:bg-transparent ${index % 2 ? 'bg-slate-50/70' : 'bg-white'}`}
            >
              <TableCell className="px-4 py-3.5 pl-5 font-mono text-xs text-slate-500">
                {patient.userId}
              </TableCell>
              <TableCell className="px-4 py-3.5">
                <div className="flex items-center gap-2.5">
                  <PatientAvatar name={patient.name} />
                  <span className="text-sm font-medium text-slate-900">
                    {patient.name}
                  </span>
                </div>
              </TableCell>
              <TableCell className="px-4 py-3.5 text-sm text-slate-600">
                {patient.age}
              </TableCell>
              <TableCell className="px-4 py-3.5 text-sm text-slate-600">
                {patient.gender}
              </TableCell>
              <TableCell className="px-4 py-3.5 text-sm text-slate-600">
                {patient.phone}
              </TableCell>
              <TableCell className="px-4 py-3.5 text-sm text-slate-600">
                {patient.bloodGroup}
              </TableCell>
              <TableCell className="px-4 py-3.5 text-xs text-slate-500">
                {patient.lastVisit}
              </TableCell>
              <TableCell className="px-4 py-3.5">
                <Badge
                  variant="outline"
                  className={
                    patient.status === 'Active'
                      ? 'border-transparent bg-emerald-100 text-emerald-600'
                      : 'border-transparent bg-slate-200 text-slate-600'
                  }
                >
                  {patient.status}
                </Badge>
              </TableCell>
              <TableCell className="px-4 py-3.5 pr-5">
                <div className="flex justify-end">
                  <PatientsActionsMenu patient={patient} onAction={onAction} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
