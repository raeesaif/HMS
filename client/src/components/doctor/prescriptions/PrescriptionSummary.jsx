import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MedicineRow } from './MedicineRow';

function Field({ label, value }) {
  return (
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-0.5 text-sm font-medium text-slate-900">{value || '—'}</p>
    </div>
  );
}

export function PrescriptionSummary({
  patient,
  doctorName,
  department,
  date,
  diagnosis,
  medicines,
  followUpRequired,
  followUpDate,
}) {
  return (
    <Card className="rounded-xl border-border shadow-sm">
      <CardHeader className="pb-0">
        <CardTitle className="text-sm font-semibold">Prescription Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-3">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Field label="Patient" value={patient?.name} />
          <Field label="Doctor" value={doctorName ? `Dr. ${doctorName} · ${department}` : undefined} />
          <Field label="Date" value={date} />
          <Field label="Follow-up" value={followUpRequired ? followUpDate || 'Date pending' : 'Not required'} />
        </div>

        <Field label="Diagnosis" value={diagnosis} />

        <div>
          <p className="text-xs text-slate-500">Medicines ({medicines.length})</p>
          {medicines.length > 0 ? (
            <div className="mt-1.5 space-y-2">
              {medicines.map((medicine, index) => (
                <MedicineRow key={medicine.id ?? index} medicine={medicine} index={index} />
              ))}
            </div>
          ) : (
            <p className="mt-0.5 text-sm text-slate-500">No medicines added yet.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
