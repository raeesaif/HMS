import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { PrescriptionForm } from './PrescriptionForm';

export function CreatePrescriptionSheet({ open, onOpenChange, prescription, onSaveDraft, onFinalize }) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full gap-0 overflow-y-auto p-0 sm:max-w-2xl">
        <SheetHeader className="border-b border-slate-200 px-5 py-5">
          <SheetTitle>{prescription ? 'Edit Prescription' : 'Create Prescription'}</SheetTitle>
          <SheetDescription>
            {prescription
              ? `Continue editing draft ${prescription.id}`
              : 'Select a patient, add clinical details, and prescribe medications.'}
          </SheetDescription>
        </SheetHeader>

        <div className="px-5 py-5">
          <PrescriptionForm
            key={prescription?.id ?? 'new'}
            initialPrescription={prescription}
            onOpenChange={onOpenChange}
            onSaveDraft={onSaveDraft}
            onFinalize={onFinalize}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
