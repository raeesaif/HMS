import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { doctorPatients } from '@/data/doctorPatients';
import { PatientStatusBadge } from '@/components/doctor/patients/PatientStatusBadge';

const getInitials = (name) =>
  name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

export function PatientSearch({ onSelect, placeholder = 'Search by patient name, ID, or phone number...' }) {
  const [query, setQuery] = useState('');

  const results = query.trim()
    ? doctorPatients.filter((patient) => {
        const term = query.trim().toLowerCase();
        return (
          patient.name.toLowerCase().includes(term) ||
          patient.id.toLowerCase().includes(term) ||
          patient.phone.toLowerCase().includes(term)
        );
      })
    : [];

  return (
    <div className="space-y-2">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={placeholder}
          className="h-11 pl-9 text-sm"
        />
      </div>
      {query.trim() &&
        (results.length > 0 ? (
          <div className="max-h-80 overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-sm">
            {results.map((patient) => (
              <button
                key={patient.id}
                type="button"
                onClick={() => {
                  onSelect(patient);
                  setQuery('');
                }}
                className="flex w-full items-center gap-3 border-b border-slate-100 px-4 py-3 text-left last:border-b-0 hover:bg-slate-50"
              >
                <Avatar size="default">
                  <AvatarFallback className="bg-sky-100 text-sky-600">{getInitials(patient.name)}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-900">{patient.name}</p>
                  <p className="text-xs text-slate-500">
                    {patient.id} · {patient.age} yrs · {patient.gender} · {patient.bloodGroup}
                  </p>
                </div>
                <PatientStatusBadge status={patient.status} />
              </button>
            ))}
          </div>
        ) : (
          <p className="px-1 text-sm text-slate-500">No patients match &ldquo;{query}&rdquo;.</p>
        ))}
    </div>
  );
}
