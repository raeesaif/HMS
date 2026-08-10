import { Eye, Pill } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/shared/EmptyState';
import { StatusBadge } from '@/components/patient/StatusBadge';
import { prescriptionStatusMap } from '@/components/patient/statusMaps';

const columns = ['Prescription ID', 'Medicine', 'Doctor', 'Dosage', 'Frequency', 'Duration', 'Status', ''];

export function PrescriptionsTable({ prescriptions, onView, emptyMessage = 'No prescriptions found.' }) {
  if (prescriptions.length === 0) {
    return <EmptyState icon={Pill} title={emptyMessage} />;
  }

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-[920px]">
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
          {prescriptions.map((prescription, index) => (
            <TableRow key={prescription.id} className={`border-b-0 hover:bg-transparent ${index % 2 ? 'bg-slate-50/70' : 'bg-white'}`}>
              <TableCell className="px-4 py-3.5 pl-5 font-mono text-xs text-slate-500">{prescription.id}</TableCell>
              <TableCell className="px-4 py-3.5 text-sm font-medium text-slate-900">{prescription.medicine} {prescription.strength}</TableCell>
              <TableCell className="px-4 py-3.5 text-sm text-slate-600">{prescription.doctorName}</TableCell>
              <TableCell className="px-4 py-3.5 text-xs text-slate-500">{prescription.dosage}</TableCell>
              <TableCell className="px-4 py-3.5 text-xs text-slate-500">{prescription.frequency}</TableCell>
              <TableCell className="px-4 py-3.5 text-xs text-slate-500">{prescription.duration}</TableCell>
              <TableCell className="px-4 py-3.5">
                <StatusBadge status={prescription.status} map={prescriptionStatusMap} />
              </TableCell>
              <TableCell className="px-4 py-3.5 pr-5">
                <div className="flex justify-end">
                  <Button variant="ghost" size="sm" onClick={() => onView(prescription)}>
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
