import { useState } from 'react';
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
import { FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { getPatientById } from '@/data/doctorPatients';
import { labTestPriorities, labTestTypes } from '@/data/doctorLabReports';
import { PatientSearch } from '@/components/doctor/prescriptions/PatientSearch';

const todayISO = () => new Date().toISOString().slice(0, 10);

function RequestForm({ prefillPatientId, onOpenChange, onSubmit }) {
  const [selectedPatient, setSelectedPatient] = useState(prefillPatientId ? getPatientById(prefillPatientId) : null);
  const [testCategory, setTestCategory] = useState('');
  const [testName, setTestName] = useState('');
  const [priority, setPriority] = useState('Routine');
  const [clinicalReason, setClinicalReason] = useState('');
  const [instructions, setInstructions] = useState('');
  const [requestedDate, setRequestedDate] = useState(todayISO());

  const handleSubmit = () => {
    if (!selectedPatient) {
      toast.error('Select a patient before submitting the request');
      return;
    }
    if (!testCategory || !testName.trim()) {
      toast.error('Test category and test name are required');
      return;
    }
    onSubmit({
      patientId: selectedPatient.id,
      testCategory,
      testName: testName.trim(),
      priority,
      clinicalReason: clinicalReason.trim(),
      instructions: instructions.trim(),
      requestedDate,
    });
    onOpenChange(false);
    toast.success(`Lab test requested for ${selectedPatient.name}`);
  };

  return (
    <>
      <div className="space-y-4">
        <div>
          <FieldLabel>Patient *</FieldLabel>
          <div className="mt-1">
            <PatientSearch selectedPatient={selectedPatient} onChange={setSelectedPatient} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <FieldLabel>Test Category *</FieldLabel>
            <Select value={testCategory} onValueChange={setTestCategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {labTestTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <FieldLabel>Test Name *</FieldLabel>
            <Input value={testName} onChange={(event) => setTestName(event.target.value)} placeholder="e.g. Complete Blood Count" />
          </div>
          <div className="space-y-1">
            <FieldLabel>Priority</FieldLabel>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {labTestPriorities.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <FieldLabel>Requested Date</FieldLabel>
            <Input type="date" value={requestedDate} onChange={(event) => setRequestedDate(event.target.value)} />
          </div>
        </div>

        <div className="space-y-1">
          <FieldLabel>Clinical Reason</FieldLabel>
          <Textarea
            value={clinicalReason}
            onChange={(event) => setClinicalReason(event.target.value)}
            className="min-h-16 resize-none"
            placeholder="Why is this test being requested..."
          />
        </div>
        <div className="space-y-1">
          <FieldLabel>Instructions</FieldLabel>
          <Textarea
            value={instructions}
            onChange={(event) => setInstructions(event.target.value)}
            className="min-h-16 resize-none"
            placeholder="Special instructions for the laboratory (optional)..."
          />
        </div>
      </div>

      <DialogFooter>
        <DialogClose render={<Button type="button" variant="outline" />}>Cancel</DialogClose>
        <Button onClick={handleSubmit}>Submit Request</Button>
      </DialogFooter>
    </>
  );
}

export function RequestLabTestDialog({ open, onOpenChange, prefillPatientId, onSubmit }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Request Lab Test</DialogTitle>
          <DialogDescription>Create a new laboratory test request for a patient.</DialogDescription>
        </DialogHeader>

        <RequestForm
          key={open ? (prefillPatientId ?? 'new') : 'closed'}
          prefillPatientId={prefillPatientId}
          onOpenChange={onOpenChange}
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
