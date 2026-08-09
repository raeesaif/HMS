import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PatientAvatar } from '@/components/reception/PatientAvatar';
import { patients } from '@/data/receptionistPatients';

export function PatientSelect({ selectedPatient, onChange, placeholder = 'Search by patient name or ID...' }) {
  const [query, setQuery] = useState('');

  if (selectedPatient) {
    return (
      <div className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5">
        <div className="flex items-center gap-3">
          <PatientAvatar name={selectedPatient.name} />
          <div>
            <p className="text-sm font-medium text-slate-900">{selectedPatient.name}</p>
            <p className="text-xs text-slate-500">
              {selectedPatient.id} · {selectedPatient.age} yrs · {selectedPatient.gender}
            </p>
          </div>
        </div>
        <Button type="button" variant="ghost" size="sm" onClick={() => onChange(null)}>
          <X /> Change
        </Button>
      </div>
    );
  }

  const results = query.trim()
    ? patients
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
        <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={placeholder} className="h-10 pl-9" />
      </div>
      {query.trim() &&
        (results.length > 0 ? (
          <div className="max-h-52 overflow-y-auto rounded-lg border border-slate-200">
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
                <PatientAvatar name={patient.name} size="size-8" />
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
