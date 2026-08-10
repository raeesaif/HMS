import { Paperclip } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { StatusBadge } from '@/components/patient/StatusBadge';
import { recordStatusMap } from '@/components/patient/statusMaps';

function InfoField({ label, value }) {
  return (
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-0.5 text-sm font-medium text-slate-900">{value || '—'}</p>
    </div>
  );
}

export function MedicalRecordDetailsDialog({ record, open, onOpenChange }) {
  if (!record) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <StatusBadge status={record.status} map={recordStatusMap} />
          <DialogTitle>{record.diagnosis}</DialogTitle>
          <DialogDescription>{record.visitType} · {record.date}</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          <InfoField label="Doctor" value={record.doctorName} />
          <InfoField label="Department" value={record.department} />
          <InfoField label="Visit Date" value={record.date} />
          <InfoField label="Visit Type" value={record.visitType} />
        </div>

        <div>
          <p className="text-xs text-slate-500">Diagnosis</p>
          <p className="mt-0.5 text-sm text-slate-900">{record.diagnosis}</p>
        </div>

        <div>
          <p className="text-xs text-slate-500">Clinical Notes</p>
          <p className="mt-0.5 text-sm text-slate-900">{record.clinicalNotes}</p>
        </div>

        <div>
          <p className="text-xs text-slate-500">Treatment Summary</p>
          <p className="mt-0.5 text-sm text-slate-900">{record.treatmentSummary}</p>
        </div>

        <div>
          <p className="text-xs text-slate-500">Follow-up Instructions</p>
          <p className="mt-0.5 text-sm text-slate-900">{record.followUpInstructions || 'None'}</p>
        </div>

        {record.attachments.length > 0 && (
          <div>
            <p className="mb-1.5 text-xs text-slate-500">Attachments</p>
            <div className="space-y-1.5">
              {record.attachments.map((attachment) => (
                <div key={attachment.id} className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700">
                  <Paperclip className="size-3.5 text-slate-400" />
                  {attachment.name}
                </div>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
