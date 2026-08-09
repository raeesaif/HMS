import { Eye, NotebookPen, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { EmptyState } from '@/shared/EmptyState';
import { TableSkeleton } from './LoadingSkeleton';

export function ConsultationHistory({ consultations, isLoading = false, onViewConsultation, onAddNote }) {
  if (isLoading) {
    return <TableSkeleton cols={8} />;
  }

  if (consultations.length === 0) {
    return (
      <EmptyState
        icon={Stethoscope}
        title="No consultation history"
        description="This patient has no recorded consultations yet."
      />
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-[1050px]">
        <TableHeader className="bg-slate-50 [&_tr]:border-b-0">
          <TableRow className="hover:bg-transparent">
            {['Date', 'Doctor', 'Reason for Visit', 'Symptoms', 'Diagnosis', 'Treatment Plan', 'Follow-up Date', 'Actions'].map(
              (label) => (
                <TableHead
                  key={label}
                  className={`h-auto px-4 py-3 text-[11px] font-medium text-slate-500 first:pl-5 last:pr-5 ${
                    label === 'Actions' ? 'text-right' : ''
                  }`}
                >
                  {label}
                </TableHead>
              )
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {consultations.map((consultation, index) => (
            <TableRow
              key={consultation.id}
              className={`border-b-0 hover:bg-slate-50 ${index % 2 ? 'bg-slate-50/70' : 'bg-white'}`}
            >
              <TableCell className="px-4 py-3.5 pl-5 text-slate-900">{consultation.date}</TableCell>
              <TableCell className="px-4 py-3.5 text-slate-600">{consultation.doctor}</TableCell>
              <TableCell className="max-w-[160px] truncate px-4 py-3.5 text-slate-600" title={consultation.reasonForVisit}>
                {consultation.reasonForVisit}
              </TableCell>
              <TableCell className="max-w-[160px] truncate px-4 py-3.5 text-slate-600" title={consultation.symptoms}>
                {consultation.symptoms}
              </TableCell>
              <TableCell className="max-w-[160px] truncate px-4 py-3.5 text-slate-600" title={consultation.diagnosis}>
                {consultation.diagnosis}
              </TableCell>
              <TableCell className="max-w-[180px] truncate px-4 py-3.5 text-slate-600" title={consultation.treatmentPlan}>
                {consultation.treatmentPlan}
              </TableCell>
              <TableCell className="px-4 py-3.5 text-slate-600">{consultation.followUpDate || '—'}</TableCell>
              <TableCell className="px-4 py-3.5 pr-5">
                <div className="flex justify-end gap-1.5">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    title="View Consultation"
                    aria-label="View Consultation"
                    onClick={() => onViewConsultation(consultation)}
                  >
                    <Eye className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    title="Add Clinical Note"
                    aria-label="Add Clinical Note"
                    onClick={() => onAddNote(consultation)}
                  >
                    <NotebookPen className="size-4" />
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
