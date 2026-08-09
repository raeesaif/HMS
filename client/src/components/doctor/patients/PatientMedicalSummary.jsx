import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function Field({ label, value }) {
  return (
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-0.5 text-sm text-slate-900">{value || '—'}</p>
    </div>
  );
}

export function PatientMedicalSummary({ patient }) {
  return (
    <Card className="rounded-xl border-border shadow-sm">
      <CardHeader className="pb-0">
        <CardTitle className="text-sm font-semibold">Clinical Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 pt-3">
        <Field label="Current diagnosis" value={patient.primaryDiagnosis} />

        <div>
          <p className="text-xs text-slate-500">Allergies</p>
          {patient.allergies.length > 0 ? (
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {patient.allergies.map((allergy) => (
                <span key={allergy} className="rounded-full bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-600">
                  {allergy}
                </span>
              ))}
            </div>
          ) : (
            <p className="mt-0.5 text-sm text-slate-900">No known allergies</p>
          )}
        </div>

        <div>
          <p className="text-xs text-slate-500">Current medications</p>
          {patient.currentMedications.length > 0 ? (
            <ul className="mt-1.5 space-y-1">
              {patient.currentMedications.map((med) => (
                <li key={med.name} className="text-sm text-slate-900">
                  {med.name} <span className="text-slate-500">· {med.dosage}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-0.5 text-sm text-slate-900">No active medications</p>
          )}
        </div>

        <Field label="Recent symptoms" value={patient.recentSymptoms} />
        <Field label="Treatment plan" value={patient.treatmentPlan} />
        <Field label="Follow-up instructions" value={patient.followUpInstructions} />
        <Field label="Important medical notes" value={patient.importantNotes} />
      </CardContent>
    </Card>
  );
}
