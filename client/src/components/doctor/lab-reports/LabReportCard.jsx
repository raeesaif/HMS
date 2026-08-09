import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { getPatientById } from '@/data/doctorPatients';
import { LabReportStatusBadge } from './LabReportStatusBadge';
import { LabResultStatusBadge } from './LabResultStatusBadge';
import { LabReportActionsMenu } from './LabReportActionsMenu';

const getInitials = (name) =>
  name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

export function LabReportCard({ report, onAction }) {
  const patient = getPatientById(report.patientId);

  return (
    <Card className="rounded-xl border-border shadow-sm">
      <CardContent className="space-y-3 px-4 py-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <Avatar size="sm">
              <AvatarFallback className="bg-sky-100 text-sky-600">
                {getInitials(patient?.name ?? '—')}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-slate-900">{patient?.name ?? 'Unknown patient'}</p>
              <p className="text-xs text-slate-500">
                {report.id} · {report.testName}
              </p>
            </div>
          </div>
          <LabReportActionsMenu report={report} onAction={onAction} />
        </div>

        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500">
          <span>Requested {report.requestedDate}</span>
          {report.reportDate && (
            <>
              <span aria-hidden>·</span>
              <span>Reported {report.reportDate}</span>
            </>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <LabReportStatusBadge status={report.reportStatus} />
          <LabResultStatusBadge status={report.resultStatus} />
        </div>
      </CardContent>
    </Card>
  );
}
