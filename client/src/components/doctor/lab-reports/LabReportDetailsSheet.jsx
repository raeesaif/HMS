import { ClipboardPlus, FileText, Pill } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { getPatientById } from '@/data/doctorPatients';
import { LabReportStatusBadge } from './LabReportStatusBadge';
import { LabResultStatusBadge } from './LabResultStatusBadge';
import { LabResultTable } from './LabResultTable';
import { CriticalResultAlert } from './CriticalResultAlert';
import { ReportAttachment } from './ReportAttachment';
import { LabResultTrend } from './LabResultTrend';
import { LabHistory } from './LabHistory';

function InfoField({ label, value }) {
  return (
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-0.5 text-sm font-medium text-slate-900">{value || '—'}</p>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="border-t border-slate-200 px-5 py-4">
      <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      <div className="mt-3">{children}</div>
    </div>
  );
}

export function LabReportDetailsSheet({ report, patientReports = [], open, onOpenChange, onAction, onSelectHistoryReport }) {
  if (!report) return null;

  const patient = getPatientById(report.patientId);
  const history = patientReports.filter((r) => r.id !== report.id);
  const isCritical = report.resultStatus === 'Critical';

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full gap-0 overflow-y-auto p-0 sm:max-w-xl">
        <SheetHeader className="border-b border-slate-200 px-5 py-5">
          <div className="flex items-center justify-between">
            <SheetTitle>{report.testName}</SheetTitle>
            <div className="flex gap-2">
              <LabReportStatusBadge status={report.reportStatus} />
              <LabResultStatusBadge status={report.resultStatus} />
            </div>
          </div>
          <SheetDescription>
            {report.id} · {report.reportDate || 'Report pending'}
          </SheetDescription>
        </SheetHeader>

        {isCritical && (
          <div className="px-5 pt-4">
            <CriticalResultAlert report={report} onAction={onAction} />
          </div>
        )}

        <Section title="Report information">
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            <InfoField label="Report ID" value={report.id} />
            <InfoField label="Test Name" value={report.testName} />
            <InfoField label="Requested Date" value={report.requestedDate} />
            <InfoField label="Sample Collection Date" value={report.sampleDate} />
            <InfoField label="Report Date" value={report.reportDate} />
            <InfoField label="Status" value={report.reportStatus} />
          </div>
        </Section>

        <Section title="Patient information">
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            <InfoField label="Patient Name" value={patient?.name} />
            <InfoField label="Patient ID" value={report.patientId} />
            <InfoField label="Age" value={patient?.age} />
            <InfoField label="Gender" value={patient?.gender} />
            <InfoField label="Blood Group" value={patient?.bloodGroup} />
          </div>
        </Section>

        <Section title="Ordering doctor">
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            <InfoField label="Doctor Name" value={report.orderingDoctor} />
            <InfoField label="Department" value={report.department} />
          </div>
        </Section>

        <Section title="Laboratory information">
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            <InfoField label="Laboratory Department" value={report.labDepartment} />
            <InfoField label="Technician" value={report.technician} />
            <InfoField label="Processed Date" value={report.processedDate} />
          </div>
        </Section>

        <Section title="Test results">
          <LabResultTable results={report.results} />
        </Section>

        {report.attachment && (
          <div className="px-5 py-4">
            <ReportAttachment attachment={report.attachment} reportId={report.id} />
          </div>
        )}

        <div className="px-5 py-4">
          <LabResultTrend currentReport={report} patientReports={patientReports} />
        </div>

        <div className="px-5 py-4">
          <LabHistory reports={history} onViewReport={onSelectHistoryReport} />
        </div>

        <Section title="Audit information">
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            <InfoField label="Requested By" value={report.audit.requestedBy} />
            <InfoField label="Requested At" value={report.audit.requestedAt} />
            <InfoField label="Sample Collected At" value={report.audit.sampleCollectedAt} />
            <InfoField label="Processed By" value={report.audit.processedBy} />
            <InfoField label="Processed At" value={report.audit.processedAt} />
            <InfoField label="Reviewed By" value={report.audit.reviewedBy} />
            <InfoField label="Reviewed At" value={report.audit.reviewedAt} />
            <InfoField label="Last Updated" value={report.audit.lastUpdated} />
          </div>
        </Section>

        {report.interpretation && (
          <Section title="Clinical interpretation">
            <InfoField label="Interpretation" value={report.interpretation.interpretation} />
            <div className="mt-3">
              <InfoField label="Follow-up recommendation" value={report.interpretation.followUpRecommendation} />
            </div>
            <div className="mt-3">
              <InfoField label="Additional notes" value={report.interpretation.additionalNotes} />
            </div>
            <p className="mt-3 text-xs text-slate-400">
              Interpreted by {report.interpretation.interpretedBy} · {report.interpretation.interpretedAt}
            </p>
          </Section>
        )}

        <SheetFooter className="flex-row flex-wrap justify-end gap-2 border-t border-slate-200">
          <Button variant="outline" onClick={() => onAction('view-medical-records', report)}>
            <FileText /> View Complete Medical Record
          </Button>
          <Button variant="outline" onClick={() => onAction('create-prescription', report)}>
            <Pill /> Create Prescription
          </Button>
          <Button onClick={() => onAction('add-clinical-interpretation', report)}>
            <ClipboardPlus /> Add Clinical Interpretation
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
