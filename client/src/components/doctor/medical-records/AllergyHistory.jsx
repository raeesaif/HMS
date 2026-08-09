import { ShieldAlert } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { EmptyState } from '@/shared/EmptyState';
import { AllergySeverityBadge } from './RecordBadges';
import { TableSkeleton } from './LoadingSkeleton';

export function AllergyHistory({ allergyDetails, isLoading = false }) {
  if (isLoading) {
    return <TableSkeleton cols={6} />;
  }

  if (allergyDetails.length === 0) {
    return <EmptyState icon={ShieldAlert} title="No known allergies" description="No allergies have been recorded for this patient." />;
  }

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-[800px]">
        <TableHeader className="bg-slate-50 [&_tr]:border-b-0">
          <TableRow className="hover:bg-transparent">
            {['Allergy Name', 'Type', 'Reaction', 'Severity', 'Recorded Date', 'Recorded By'].map((label) => (
              <TableHead key={label} className="h-auto px-4 py-3 text-[11px] font-medium text-slate-500 first:pl-5 last:pr-5">
                {label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {allergyDetails.map((allergy, index) => (
            <TableRow key={allergy.id} className={`border-b-0 ${index % 2 ? 'bg-slate-50/70' : 'bg-white'}`}>
              <TableCell className="px-4 py-3.5 pl-5 font-medium text-slate-900">{allergy.name}</TableCell>
              <TableCell className="px-4 py-3.5 text-slate-600">{allergy.type}</TableCell>
              <TableCell className="px-4 py-3.5 text-slate-600">{allergy.reaction}</TableCell>
              <TableCell className="px-4 py-3.5">
                <AllergySeverityBadge severity={allergy.severity} />
              </TableCell>
              <TableCell className="px-4 py-3.5 text-slate-500">{allergy.recordedDate}</TableCell>
              <TableCell className="px-4 py-3.5 pr-5 text-slate-500">{allergy.recordedBy}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
