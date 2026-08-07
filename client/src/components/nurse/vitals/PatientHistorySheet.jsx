import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { VitalsHistoryTimeline } from './VitalsHistoryTimeline';

export function PatientHistorySheet({ patient, open, onOpenChange }) {
  if (!patient) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full gap-0 overflow-y-auto p-0 sm:max-w-md">
        <SheetHeader className="border-b border-slate-200 px-5 py-5">
          <SheetTitle>Vitals History</SheetTitle>
          <SheetDescription>
            {patient.name} · {patient.id} · Bed {patient.bed}
          </SheetDescription>
        </SheetHeader>
        <div className="px-5 py-4">
          <VitalsHistoryTimeline history={patient.history} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
