import { useState } from 'react';
import { toast } from 'sonner';
import { Paperclip, X } from 'lucide-react';
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
import { clinicalNoteTypes } from '@/data/doctorMedicalRecords';

function ClinicalNoteForm({ patient, onOpenChange, onSave }) {
  const [noteType, setNoteType] = useState(clinicalNoteTypes[0]);
  const [content, setContent] = useState('');
  const [followUpInstructions, setFollowUpInstructions] = useState('');
  const [attachments, setAttachments] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files ?? []);
    setAttachments((current) => [...current, ...files.map((file) => file.name)]);
    event.target.value = '';
  };

  const removeAttachment = (name) => setAttachments((current) => current.filter((item) => item !== name));

  const handleSave = () => {
    if (!content.trim()) {
      toast.error('Clinical note cannot be empty');
      return;
    }
    onSave?.(patient.id, {
      noteType,
      content: content.trim(),
      followUpInstructions: followUpInstructions.trim(),
      attachments,
    });
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
              {clinicalNoteTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <FieldLabel>Clinical Note *</FieldLabel>
          <Textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            className="min-h-24 resize-none"
            placeholder="Document findings, observations, or clinical reasoning..."
          />
        </div>

        <div className="space-y-1">
          <FieldLabel>Follow-up Instructions</FieldLabel>
          <Textarea
            value={followUpInstructions}
            onChange={(event) => setFollowUpInstructions(event.target.value)}
            className="min-h-16 resize-none"
            placeholder="Instructions for the patient's next visit (optional)..."
          />
        </div>

        <div className="space-y-1">
          <FieldLabel>Attachments (optional)</FieldLabel>
          <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-slate-300 px-3 py-2 text-sm text-slate-500 hover:bg-slate-50">
            <Paperclip className="size-4" />
            Attach file
            <input type="file" multiple className="hidden" onChange={handleFileChange} />
          </label>
          {attachments.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {attachments.map((name) => (
                <span
                  key={name}
                  className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600"
                >
                  {name}
                  <button type="button" onClick={() => removeAttachment(name)} aria-label={`Remove ${name}`}>
                    <X className="size-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
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
