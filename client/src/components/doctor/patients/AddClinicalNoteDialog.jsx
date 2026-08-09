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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const noteTypes = ['Consultation', 'Follow-up', 'Observation', 'Treatment Plan', 'Other'];

function ClinicalNoteForm({ patient, onOpenChange, onSave }) {
  const [noteType, setNoteType] = useState(noteTypes[0]);
  const [note, setNote] = useState('');
  const [followUpInstructions, setFollowUpInstructions] = useState('');

  const handleSave = () => {
    if (!note.trim()) {
      toast.error('Clinical note cannot be empty');
      return;
    }
    onSave?.(patient.id, { noteType, note: note.trim(), followUpInstructions: followUpInstructions.trim() });
    onOpenChange(false);
    toast.success(`Clinical note added for ${patient.name}`);
  };

  return (
    <>
      <div className="space-y-4">
        <div className="space-y-1">
          <FieldLabel>Note Type</FieldLabel>
          <Select value={noteType} onValueChange={setNoteType}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {noteTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <FieldLabel>Clinical Note</FieldLabel>
          <Textarea
            value={note}
            onChange={(event) => setNote(event.target.value)}
            placeholder="Document findings, observations, or clinical reasoning..."
            className="min-h-24 resize-none"
          />
        </div>

        <div className="space-y-1">
          <FieldLabel>Follow-up Instructions</FieldLabel>
          <Textarea
            value={followUpInstructions}
            onChange={(event) => setFollowUpInstructions(event.target.value)}
            placeholder="Instructions for the patient's next visit (optional)..."
            className="min-h-16 resize-none"
          />
        </div>
      </div>

      <DialogFooter>
        <DialogClose render={<Button type="button" variant="outline" />}>Cancel</DialogClose>
        <Button onClick={handleSave}>Save Note</Button>
      </DialogFooter>
    </>
  );
}

export function AddClinicalNoteDialog({ patient, open, onOpenChange, onSave }) {
  if (!patient) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Clinical Note</DialogTitle>
          <DialogDescription>
            {patient.name} · {patient.id}
          </DialogDescription>
        </DialogHeader>

        <ClinicalNoteForm key={patient.id} patient={patient} onOpenChange={onOpenChange} onSave={onSave} />
      </DialogContent>
    </Dialog>
  );
}
