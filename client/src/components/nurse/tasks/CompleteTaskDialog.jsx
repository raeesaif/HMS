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
import { Button } from '@/components/ui/button';

const nowTime = () => new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

function CompleteTaskForm({ task, onOpenChange, onConfirm }) {
  const [form, setForm] = useState({
    completionNotes: '',
    completionTime: nowTime(),
    patientResponse: '',
    complications: '',
  });

  const updateField = (field) => (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }));

  const canSubmit = form.completionNotes.trim() && form.completionTime.trim();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!canSubmit) return;
    onConfirm?.(task.id, form);
    toast.success(`${task.taskName} marked as completed for ${task.patientName}`);
    onOpenChange(false);
  };

  return (
    <form id="complete-task-form" onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1">
        <FieldLabel>Completion Notes</FieldLabel>
        <Textarea
          value={form.completionNotes}
          onChange={updateField('completionNotes')}
          placeholder="Describe what was done..."
          className="min-h-20 resize-none"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <FieldLabel>Completion Time</FieldLabel>
          <Input value={form.completionTime} onChange={updateField('completionTime')} placeholder="e.g. 10:35 AM" />
        </div>
        <div className="space-y-1">
          <FieldLabel>Patient Response</FieldLabel>
          <Input value={form.patientResponse} onChange={updateField('patientResponse')} placeholder="e.g. Tolerated well" />
        </div>
      </div>
      <div className="space-y-1">
        <FieldLabel>Complications (Optional)</FieldLabel>
        <Textarea
          value={form.complications}
          onChange={updateField('complications')}
          placeholder="Note any complications encountered, if applicable..."
          className="min-h-16 resize-none"
        />
      </div>
    </form>
  );
}

export function CompleteTaskDialog({ task, open, onOpenChange, onConfirm }) {
  if (!task) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Mark Task as Completed</DialogTitle>
          <DialogDescription>
            {task.taskName} · {task.patientName} · Bed {task.bed}
          </DialogDescription>
        </DialogHeader>

        <CompleteTaskForm key={task.id} task={task} onOpenChange={onOpenChange} onConfirm={onConfirm} />

        <DialogFooter>
          <DialogClose render={<Button type="button" variant="outline" />}>Cancel</DialogClose>
          <Button type="submit" form="complete-task-form">Mark as Completed</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
