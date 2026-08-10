import { FileText, Eye } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/shared/EmptyState';
import { StatusBadge } from '@/components/patient/StatusBadge';
import { recordStatusMap } from '@/components/patient/statusMaps';

const columns = ['Date', 'Doctor', 'Department', 'Visit Type', 'Diagnosis', 'Status', ''];

export function MedicalRecordsTable({ records, onView, onClearFilters }) {
  if (records.length === 0) {
    return (
      <EmptyState
        icon={FileText}
        title="No medical records available."
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
      <Table className="min-w-[900px]">
        <TableHeader className="bg-slate-50 [&_tr]:border-b-0">
          <TableRow className="hover:bg-transparent">
            {columns.map((label) => (
              <TableHead key={label || 'actions'} className="h-auto px-4 py-3 text-[11px] font-medium text-slate-500 first:pl-5 last:pr-5">
                {label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.map((record, index) => (
            <TableRow key={record.id} className={`border-b-0 hover:bg-transparent ${index % 2 ? 'bg-slate-50/70' : 'bg-white'}`}>
              <TableCell className="px-4 py-3.5 pl-5 text-sm text-slate-900">{record.date}</TableCell>
              <TableCell className="px-4 py-3.5 text-sm text-slate-600">{record.doctorName}</TableCell>
              <TableCell className="px-4 py-3.5 text-xs text-slate-500">{record.department}</TableCell>
              <TableCell className="px-4 py-3.5 text-xs text-slate-500">{record.visitType}</TableCell>
              <TableCell className="px-4 py-3.5 text-sm text-slate-600">{record.diagnosis}</TableCell>
              <TableCell className="px-4 py-3.5">
                <StatusBadge status={record.status} map={recordStatusMap} />
              </TableCell>
              <TableCell className="px-4 py-3.5 pr-5">
                <div className="flex justify-end">
                  <Button variant="ghost" size="sm" onClick={() => onView(record)}>
                    <Eye /> View
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
