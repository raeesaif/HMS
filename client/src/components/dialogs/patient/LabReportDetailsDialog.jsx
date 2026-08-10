import { Clock3 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { StatusBadge } from '@/components/patient/StatusBadge';
import { labReportStatusMap } from '@/components/patient/statusMaps';
import { patientProfile } from '@/data/patient';

function InfoField({ label, value }) {
  return (
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-0.5 text-sm font-medium text-slate-900">{value || '—'}</p>
    </div>
  );
}

export function LabReportDetailsDialog({ report, open, onOpenChange }) {
  if (!report) return null;

  const isReady = report.status === 'Completed';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <StatusBadge status={report.status} map={labReportStatusMap} />
          <DialogTitle>{report.testName}</DialogTitle>
          <DialogDescription>{report.id} · {report.labDepartment}</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          <InfoField label="Patient" value={patientProfile.name} />
          <InfoField label="Ordered By" value={report.orderedBy} />
          <InfoField label="Sample Date" value={report.sampleDate} />
          <InfoField label="Report Date" value={report.reportDate} />
        </div>

        {isReady ? (
          <div>
            <p className="mb-2 text-xs font-medium text-slate-500">Result</p>
            <div className="overflow-x-auto rounded-lg border border-slate-200">
              <Table>
                <TableHeader className="bg-slate-50">
                  <TableRow>
                    <TableHead>Parameter</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Reference Range</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {report.result.map((row) => (
                    <TableRow key={row.parameter}>
                      <TableCell className="font-medium text-slate-900">{row.parameter}</TableCell>
                      <TableCell>{row.value}</TableCell>
                      <TableCell className="text-slate-500">{row.referenceRange}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {report.notes && (
              <div className="mt-3">
                <p className="text-xs text-slate-500">Notes</p>
                <p className="mt-0.5 text-sm text-slate-900">{report.notes}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-sm text-slate-500">
            <Clock3 className="size-4" />
            {report.status === 'Cancelled' ? 'This test was cancelled.' : 'Your report is currently being processed.'}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
