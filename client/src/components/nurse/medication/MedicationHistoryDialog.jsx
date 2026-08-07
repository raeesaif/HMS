import { History } from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/shared/EmptyState';
import { MedicationStatusBadge } from './MedicationStatusBadge';

const columnLabels = ['Date', 'Medicine', 'Dose', 'Time', 'Administered By', 'Status', 'Notes'];

export function MedicationHistoryDialog({ medication, open, onOpenChange }) {
  if (!medication) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Medication History</DialogTitle>
          <DialogDescription>
            {medication.patientName} · {medication.patientId} · {medication.medicineName}
          </DialogDescription>
        </DialogHeader>

        {medication.history.length === 0 ? (
          <EmptyState icon={History} title="No previous administrations recorded yet." />
        ) : (
          <div className="max-h-96 overflow-y-auto rounded-lg border border-border">
            <Table>
              <TableHeader className="bg-slate-50 [&_tr]:border-b-0">
                <TableRow className="hover:bg-transparent">
                  {columnLabels.map((label) => (
                    <TableHead key={label} className="h-auto px-3 py-2.5 text-[11px] font-medium text-slate-500">
                      {label}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {medication.history.map((entry, index) => (
                  <TableRow key={`${entry.date}-${entry.time}`} className={`border-b-0 ${index % 2 ? 'bg-slate-50/70' : 'bg-white'}`}>
                    <TableCell className="px-3 py-2.5 text-xs text-slate-500">{entry.date}</TableCell>
                    <TableCell className="px-3 py-2.5 text-sm font-medium text-slate-900">{entry.medicine}</TableCell>
                    <TableCell className="px-3 py-2.5 text-slate-600">{entry.dose}</TableCell>
                    <TableCell className="px-3 py-2.5 text-slate-600">{entry.time}</TableCell>
                    <TableCell className="px-3 py-2.5 text-slate-600">{entry.administeredBy}</TableCell>
                    <TableCell className="px-3 py-2.5"><MedicationStatusBadge status={entry.status} /></TableCell>
                    <TableCell className="px-3 py-2.5 text-xs text-slate-500">{entry.notes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        <DialogFooter>
          <DialogClose render={<Button type="button" variant="outline" />}>Close</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
