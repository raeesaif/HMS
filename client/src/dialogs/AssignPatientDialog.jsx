import { useState } from 'react';
import { Search, UserPlus } from 'lucide-react';
import { toast } from 'sonner';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { patientsData } from '@/data/patients';

const AssignPatientForm = ({ nurse, onOpenChange, onSave }) => {
  const [selectedIds, setSelectedIds] = useState(nurse.assignedPatientIds ?? []);
  const [query, setQuery] = useState('');

  const filteredPatients = patientsData.filter((patient) => {
    const term = query.trim().toLowerCase();
    if (!term) return true;
    return (
      patient.name.toLowerCase().includes(term) ||
      patient.id.toLowerCase().includes(term) ||
      patient.department.toLowerCase().includes(term)
    );
  });

  const toggle = (patientId) => {
    setSelectedIds((prev) =>
      prev.includes(patientId) ? prev.filter((id) => id !== patientId) : [...prev, patientId]
    );
  };

  const handleSave = () => {
    onSave?.({ ...nurse, assignedPatientIds: selectedIds, patients: selectedIds.length });
    toast.success(`${selectedIds.length} patient(s) assigned to ${nurse.name}`);
    onOpenChange?.(false);
  };

  return (
    <DialogContent className="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle>Assign Patients to {nurse.name}</DialogTitle>
        <DialogDescription>
          Select the patients this nurse is responsible for. {selectedIds.length} selected.
        </DialogDescription>
      </DialogHeader>

      <div className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-2.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search patients by name, ID or department..."
          className="h-9 pl-8"
        />
      </div>

      <div className="max-h-80 space-y-1 overflow-y-auto rounded-xl border border-slate-100 p-2">
        {filteredPatients.length === 0 && (
          <p className="p-3 text-center text-sm text-slate-400">No patients found.</p>
        )}
        {filteredPatients.map((patient) => {
          const checked = selectedIds.includes(patient.id);
          return (
            <label
              key={patient.id}
              className="flex cursor-pointer items-center justify-between gap-3 rounded-lg px-2.5 py-2 hover:bg-slate-50"
            >
              <div className="flex items-center gap-2.5">
                <Checkbox checked={checked} onCheckedChange={() => toggle(patient.id)} />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-slate-700">{patient.name}</p>
                  <p className="text-xs text-slate-400">
                    {patient.id} · {patient.department}
                  </p>
                </div>
              </div>
              <span className="shrink-0 text-xs text-slate-400">{patient.status}</span>
            </label>
          );
        })}
      </div>

      <DialogFooter>
        <DialogClose render={<Button type="button" variant="outline" />}>Cancel</DialogClose>
        <Button type="button" onClick={handleSave}>
          <UserPlus className="h-4 w-4 mr-1.5" />
          Save Assignment
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

const AssignPatientDialog = ({ open, onOpenChange, nurse, onSave }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {nurse && (
        <AssignPatientForm key={nurse.id} nurse={nurse} onOpenChange={onOpenChange} onSave={onSave} />
      )}
    </Dialog>
  );
};

export default AssignPatientDialog;
