import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { BedDouble } from 'lucide-react';
import { ConditionBadge } from '@/shared/NurseDashboardComponents';
import { conditionStyles } from '@/data/nursePatients';
import { BedStatusBadge } from './BedStatusBadge';

const getInitials = (name) =>
  name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

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

export function BedDetailsSheet({ bed, open, onOpenChange }) {
  if (!bed) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full gap-0 overflow-y-auto p-0 sm:max-w-lg">
        <SheetHeader className="border-b border-slate-200 px-5 py-5">
          <div className="flex items-center gap-3">
            <Avatar size="lg">
              {bed.patient ? (
                <AvatarFallback className="bg-sky-100 text-sky-600">{getInitials(bed.patient.name)}</AvatarFallback>
              ) : (
                <AvatarFallback className="bg-slate-100 text-slate-400">
                  <BedDouble className="size-5" />
                </AvatarFallback>
              )}
            </Avatar>
            <div>
              <SheetTitle>{bed.patient ? bed.patient.name : `Bed ${bed.bedNumber}`}</SheetTitle>
              <SheetDescription>
                Bed {bed.bedNumber} · {bed.ward} · {bed.roomNumber}
              </SheetDescription>
            </div>
          </div>
          <BedStatusBadge status={bed.status} className="mt-2 w-fit" />
        </SheetHeader>

        <Section title="Bed information">
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            <InfoField label="Bed number" value={bed.bedNumber} />
            <InfoField label="Ward" value={bed.ward} />
            <InfoField label="Room number" value={bed.roomNumber} />
          </div>
        </Section>

        {bed.patient ? (
          <Section title="Patient information">
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              <InfoField label="Patient name" value={bed.patient.name} />
              <InfoField label="Age" value={bed.patient.age} />
              <InfoField label="Gender" value={bed.patient.gender} />
              <InfoField label="Assigned doctor" value={bed.patient.doctor} />
              <InfoField label="Admission date" value={bed.patient.admissionDate} />
              <div>
                <p className="text-xs text-slate-500">Current condition</p>
                <div className="mt-1">
                  <ConditionBadge condition={bed.patient.condition} style={conditionStyles[bed.patient.condition]} />
                </div>
              </div>
            </div>
            <div className="mt-3">
              <p className="text-xs text-slate-500">Diagnosis</p>
              <p className="mt-0.5 text-sm font-medium text-slate-900">{bed.patient.diagnosis || '—'}</p>
            </div>
          </Section>
        ) : (
          <Section title="Patient information">
            <p className="text-sm text-slate-500">No patient currently assigned to this bed.</p>
          </Section>
        )}
      </SheetContent>
    </Sheet>
  );
}
