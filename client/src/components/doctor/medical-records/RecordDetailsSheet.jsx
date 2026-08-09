import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

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

export function RecordDetailsSheet({ record, open, onOpenChange }) {
  if (!record) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full gap-0 overflow-y-auto p-0 sm:max-w-lg">
        <SheetHeader className="border-b border-slate-200 px-5 py-5">
          <SheetTitle>{record.recordType}</SheetTitle>
          <SheetDescription>
            {record.date} · {record.doctor}
          </SheetDescription>
        </SheetHeader>

        <Section title="Clinical details">
          <div className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
            <InfoField label="Diagnosis" value={record.diagnosis} />
            <InfoField label="Treatment" value={record.treatment} />
          </div>
          <div className="mt-3">
            <InfoField label="Clinical notes" value={record.clinicalNotes} />
          </div>
        </Section>

        <Section title="Related records">
          <div className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
            <InfoField label="Related prescription" value={record.relatedPrescription} />
            <InfoField label="Related lab report" value={record.relatedLabReport} />
          </div>
        </Section>

        <Section title="Follow-up">
          <InfoField label="Follow-up instructions" value={record.followUpInstructions} />
        </Section>
      </SheetContent>
    </Sheet>
  );
}
