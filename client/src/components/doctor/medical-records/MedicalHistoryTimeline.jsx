import { useMemo, useState } from 'react';
import {
  ArrowRightLeft,
  BedDouble,
  CalendarClock,
  ClipboardEdit,
  ClipboardList,
  FlaskConical,
  HeartPulse,
  History,
  LogOut,
  Pill,
  Stethoscope,
  UserPlus,
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { EmptyState } from '@/shared/EmptyState';
import { TimelineSkeleton } from './LoadingSkeleton';

const timelineTypeMeta = {
  admitted: { label: 'Hospital Admission', icon: BedDouble, tone: 'bg-orange-100 text-orange-600' },
  discharged: { label: 'Discharge', icon: LogOut, tone: 'bg-emerald-100 text-emerald-600' },
  transfer: { label: 'Transfer', icon: ArrowRightLeft, tone: 'bg-orange-100 text-orange-600' },
  prescription: { label: 'Treatment Started', icon: Pill, tone: 'bg-amber-100 text-amber-600' },
  lab: { label: 'Lab Test', icon: FlaskConical, tone: 'bg-purple-100 text-purple-600' },
  vitals: { label: 'Vitals Recorded', icon: HeartPulse, tone: 'bg-rose-100 text-rose-600' },
  note: { label: 'Clinical Note', icon: ClipboardEdit, tone: 'bg-slate-200 text-slate-600' },
  registered: { label: 'Patient Registered', icon: UserPlus, tone: 'bg-sky-100 text-sky-600' },
  'follow-up': { label: 'Follow-up Scheduled', icon: CalendarClock, tone: 'bg-emerald-100 text-emerald-600' },
};

function buildTimelineEvents({ consultations, diagnoses, patientTimeline }) {
  const events = [
    ...consultations.map((consultation) => ({
      id: consultation.id,
      date: consultation.date,
      time: consultation.createdAt?.split(', ')[1] ?? '',
      eventType: 'Consultation',
      icon: Stethoscope,
      tone: 'bg-blue-100 text-blue-600',
      doctor: consultation.doctor,
      diagnosis: consultation.diagnosis,
      treatment: consultation.treatmentPlan,
      notes: consultation.clinicalNotes,
    })),
    ...diagnoses.map((diagnosis) => ({
      id: diagnosis.id,
      date: diagnosis.dateDiagnosed,
      time: '',
      eventType: 'Diagnosis',
      icon: ClipboardList,
      tone: 'bg-violet-100 text-violet-600',
      doctor: diagnosis.doctor,
      diagnosis: diagnosis.diagnosis,
      treatment: '—',
      notes: diagnosis.notes,
    })),
    ...patientTimeline.map((item, index) => {
      const meta = timelineTypeMeta[item.type] ?? { label: 'Event', icon: History, tone: 'bg-slate-200 text-slate-600' };
      return {
        id: `pt-${index}`,
        date: item.date,
        time: item.time,
        eventType: meta.label,
        icon: meta.icon,
        tone: meta.tone,
        doctor: item.performedBy,
        diagnosis: '—',
        treatment: item.description,
        notes: '',
      };
    }),
  ];

  return events.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function MedicalHistoryTimeline({ consultations = [], diagnoses = [], patientTimeline = [], isLoading = false }) {
  const [recordType, setRecordType] = useState('all');
  const [doctorFilter, setDoctorFilter] = useState('all');

  const events = useMemo(
    () => buildTimelineEvents({ consultations, diagnoses, patientTimeline }),
    [consultations, diagnoses, patientTimeline]
  );

  const recordTypeOptions = useMemo(() => [...new Set(events.map((event) => event.eventType))], [events]);
  const doctorOptions = useMemo(() => [...new Set(events.map((event) => event.doctor).filter(Boolean))], [events]);

  const filteredEvents = events.filter((event) => {
    const matchesType = recordType === 'all' || event.eventType === recordType;
    const matchesDoctor = doctorFilter === 'all' || event.doctor === doctorFilter;
    return matchesType && matchesDoctor;
  });

  if (isLoading) {
    return <TimelineSkeleton count={6} />;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <Select value={recordType} onValueChange={setRecordType}>
          <SelectTrigger className="w-full sm:w-48" aria-label="Filter by record type">
            <SelectValue placeholder="Record Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Record Types</SelectItem>
            {recordTypeOptions.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={doctorFilter} onValueChange={setDoctorFilter}>
          <SelectTrigger className="w-full sm:w-48" aria-label="Filter by doctor">
            <SelectValue placeholder="Doctor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Doctors</SelectItem>
            {doctorOptions.map((doctor) => (
              <SelectItem key={doctor} value={doctor}>
                {doctor}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filteredEvents.length === 0 ? (
        <EmptyState icon={History} title="No medical records found" description="No records match your current filters." />
      ) : (
        <div className="space-y-4">
          {filteredEvents.map((event) => (
            <div key={event.id} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className={`flex size-8 shrink-0 items-center justify-center rounded-full ${event.tone}`}>
                  <event.icon className="size-4" />
                </div>
                <div className="mt-1 w-px flex-1 bg-slate-200" />
              </div>
              <div className="min-w-0 flex-1 pb-4">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                  <p className="text-sm font-medium text-slate-900">{event.eventType}</p>
                  <span className="text-xs text-slate-400">
                    {event.date}
                    {event.time ? ` · ${event.time}` : ''}
                  </span>
                </div>
                <p className="text-xs text-slate-500">Performed by {event.doctor || 'Unknown'}</p>
                {event.diagnosis && event.diagnosis !== '—' && (
                  <p className="mt-1 text-xs text-slate-600">
                    <span className="text-slate-400">Diagnosis:</span> {event.diagnosis}
                  </p>
                )}
                {event.treatment && event.treatment !== '—' && (
                  <p className="mt-0.5 text-xs text-slate-600">
                    <span className="text-slate-400">Treatment:</span> {event.treatment}
                  </p>
                )}
                {event.notes && <p className="mt-0.5 text-xs italic text-slate-400">{event.notes}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
