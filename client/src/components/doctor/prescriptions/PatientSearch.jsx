import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { doctorPatients } from '@/data/doctorPatients';

const getInitials = (name) =>
  name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

function SelectedPatientCard({ patient, onChange }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar size="lg">
            <AvatarFallback className="bg-sky-100 text-sky-600">{getInitials(patient.name)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold text-slate-900">{patient.name}</p>
            <p className="text-xs text-slate-500">
              {patient.id} · {patient.age} yrs · {patient.gender} · {patient.bloodGroup}
            </p>
          </div>
        </div>
        <Button type="button" variant="ghost" size="sm" onClick={() => onChange(null)}>
          <X /> Change
        </Button>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <p className="text-xs text-slate-500">Allergies</p>
          {patient.allergies.length > 0 ? (
            <div className="mt-1 flex flex-wrap gap-1.5">
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
          <p className="mt-0.5 text-sm text-slate-900">
            {patient.currentMedications.length > 0
              ? patient.currentMedications.map((med) => med.name).join(', ')
              : 'None recorded'}
          </p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Recent diagnosis</p>
          <p className="mt-0.5 text-sm text-slate-900">{patient.primaryDiagnosis || '—'}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Important medical alerts</p>
          <p className="mt-0.5 text-sm text-slate-900">{patient.importantNotes || 'None'}</p>
        </div>
      </div>
    </div>
  );
}

export function PatientSearch({ selectedPatient, onChange }) {
  const [query, setQuery] = useState('');

  if (selectedPatient) {
    return <SelectedPatientCard patient={selectedPatient} onChange={onChange} />;
  }

  const results = query.trim()
    ? doctorPatients
        .filter(
          (patient) =>
            patient.name.toLowerCase().includes(query.trim().toLowerCase()) ||
            patient.id.toLowerCase().includes(query.trim().toLowerCase())
        )
        .slice(0, 6)
    : [];

  return (
    <div className="space-y-2">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by patient name or ID..."
          className="h-10 pl-9"
        />
      </div>
      {query.trim() &&
        (results.length > 0 ? (
          <div className="max-h-56 overflow-y-auto rounded-lg border border-slate-200">
            {results.map((patient) => (
              <button
                key={patient.id}
                type="button"
                onClick={() => {
                  onChange(patient);
                  setQuery('');
                }}
                className="flex w-full items-center gap-3 border-b border-slate-100 px-3 py-2.5 text-left last:border-b-0 hover:bg-slate-50"
              >
                <Avatar size="sm">
                  <AvatarFallback className="bg-sky-100 text-sky-600">{getInitials(patient.name)}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-900">{patient.name}</p>
                  <p className="text-xs text-slate-500">
                    {patient.id} · {patient.age} yrs · {patient.gender}
                  </p>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <p className="px-1 text-xs text-slate-500">No patients match &ldquo;{query}&rdquo;.</p>
        ))}
    </div>
  );
}
