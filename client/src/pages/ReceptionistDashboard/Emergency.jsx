import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FilterDropdown } from '@/shared/FilterDropdown';
import { FilterBar } from '@/components/reception/FilterBar';
import { ErrorState } from '@/components/reception/ErrorState';
import { TableSkeleton } from '@/components/reception/LoadingSkeleton';
import { EmergencyTable } from '@/components/reception/emergency/EmergencyTable';
import { EmergencyPatientDialog } from '@/components/dialogs/receptionist/EmergencyPatientDialog';
import { EmergencyDetailsDialog } from '@/components/dialogs/receptionist/EmergencyDetailsDialog';
import { useEmergencyPatients } from '@/hooks/useEmergencyPatients';
import { registerEmergencyPatient } from '@/services/emergencyService';
import { emergencyPriorityOptions, emergencyStatusOptions } from '@/data/receptionistEmergency';

const Emergency = () => {
  const navigate = useNavigate();
  const { emergencyPatients, setEmergencyPatients, isLoading, error, reload } = useEmergencyPatients();

  const [priority, setPriority] = useState('all');
  const [status, setStatus] = useState('all');

  const [activeEntry, setActiveEntry] = useState(null);
  const [openDialog, setOpenDialog] = useState(null);

  const filteredPatients = useMemo(() => {
    return emergencyPatients.filter((entry) => {
      const matchesPriority = priority === 'all' || entry.priority === priority;
      const matchesStatus = status === 'all' || entry.status === status;
      return matchesPriority && matchesStatus;
    });
  }, [emergencyPatients, priority, status]);

  const handleClearFilters = () => {
    setPriority('all');
    setStatus('all');
  };

  const closeDialog = (next) => {
    if (!next) setOpenDialog(null);
  };

  const handleAction = (action, entry) => {
    setActiveEntry(entry);
    if (action === 'view-patient') {
      navigate('/reception/patients');
      return;
    }
    setOpenDialog(action);
  };

  const handleRegister = (payload) => {
    registerEmergencyPatient(payload).then((created) => {
      setEmergencyPatients((current) => [created, ...current]);
    });
  };

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6">
      <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Emergency Patients</h1>
          <p className="mt-1 text-sm text-slate-500">Register and track emergency arrivals. Diagnosis and treatment are recorded by clinical staff.</p>
        </div>
        <Button variant="destructive" onClick={() => setOpenDialog('register')}>
          <AlertTriangle /> Register Emergency Patient
        </Button>
      </section>

      {error ? (
        <ErrorState onRetry={reload} />
      ) : (
        <Card className="gap-0 overflow-hidden rounded-xl border-border py-0 shadow-sm">
          <div className="border-b border-border p-5">
            <FilterBar>
              <FilterDropdown label="Priority" value={priority} onChange={setPriority} options={emergencyPriorityOptions.map((option) => ({ value: option, label: option }))} />
              <FilterDropdown label="Status" value={status} onChange={setStatus} options={emergencyStatusOptions.map((option) => ({ value: option, label: option }))} />
            </FilterBar>
          </div>

          {isLoading ? (
            <TableSkeleton rows={4} cols={8} />
          ) : (
            <EmergencyTable emergencyPatients={filteredPatients} onAction={handleAction} onClearFilters={handleClearFilters} />
          )}
        </Card>
      )}

      <EmergencyPatientDialog open={openDialog === 'register'} onOpenChange={closeDialog} onSave={handleRegister} />
      <EmergencyDetailsDialog entry={activeEntry} open={openDialog === 'view-details'} onOpenChange={closeDialog} />
    </div>
  );
};

export default Emergency;
