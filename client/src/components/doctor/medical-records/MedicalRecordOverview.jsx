import { CalendarClock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PatientMedicalSummary } from '@/components/doctor/patients/PatientMedicalSummary';
import { PatientVitalsCard } from '@/components/doctor/patients/PatientVitalsCard';
import { LabResultBadge } from './RecordBadges';

function RecentConsultationCard({ consultation }) {
  return (
    <Card className="rounded-xl border-border shadow-sm">
      <CardHeader className="pb-0">
        <CardTitle className="text-sm font-semibold">Recent Consultation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1.5 pt-3">
        {consultation ? (
          <>
            <p className="text-sm font-medium text-slate-900">
              {consultation.date} · {consultation.doctor}
            </p>
            <p className="text-xs text-slate-500">Reason: {consultation.reasonForVisit}</p>
            <p className="text-xs text-slate-500">Diagnosis: {consultation.diagnosis}</p>
          </>
        ) : (
          <p className="text-sm text-slate-500">No consultations recorded yet.</p>
        )}
      </CardContent>
    </Card>
  );
}

function RecentLabResultsCard({ labReports }) {
  return (
    <Card className="rounded-xl border-border shadow-sm">
      <CardHeader className="pb-0">
        <CardTitle className="text-sm font-semibold">Recent Lab Results</CardTitle>
      </CardHeader>
      <CardContent className="pt-3">
        {labReports.length > 0 ? (
          <div className="space-y-2">
            {labReports.slice(0, 3).map((lab) => (
              <div
                key={lab.id}
                className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2"
              >
                <div>
                  <p className="text-sm font-medium text-slate-900">{lab.testName}</p>
                  <p className="text-xs text-slate-500">
                    {lab.result} · {lab.testDate}
                  </p>
                </div>
                <LabResultBadge status={lab.status} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500">No lab results recorded yet.</p>
        )}
      </CardContent>
    </Card>
  );
}

function NextFollowUpCard({ nextAppointment, latestFollowUp }) {
  return (
    <Card className="rounded-xl border-border shadow-sm">
      <CardHeader className="pb-0">
        <CardTitle className="text-sm font-semibold">Next Follow-up</CardTitle>
      </CardHeader>
      <CardContent className="pt-3">
        <div className="flex items-center gap-2">
          <CalendarClock className="size-4 text-sky-600" />
          <p className="text-sm font-medium text-slate-900">
            {nextAppointment || latestFollowUp || 'No follow-up scheduled'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export function MedicalRecordOverview({ patient, consultations = [], labReports = [] }) {
  const mostRecentConsultation = consultations[0] ?? null;

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <PatientMedicalSummary patient={patient} />
      <div className="space-y-4">
        <PatientVitalsCard vitals={patient.vitals} />
        <RecentConsultationCard consultation={mostRecentConsultation} />
      </div>
      <RecentLabResultsCard labReports={labReports} />
      <NextFollowUpCard nextAppointment={patient.nextAppointment} latestFollowUp={mostRecentConsultation?.followUpDate} />
    </div>
  );
}
