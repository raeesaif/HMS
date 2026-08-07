import { useState } from 'react';
import { toast } from 'sonner';
import { Pencil } from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { FieldLabel } from '@/components/ui/field';

export function NursingNotesDialog({ patient, open, onOpenChange, onAddNote, onEditLatestNote }) {
  const [newNote, setNewNote] = useState('');
  const [editingLatest, setEditingLatest] = useState(false);
  const [editText, setEditText] = useState('');

  const handleOpenChange = (next) => {
    onOpenChange(next);
    if (!next) {
      setNewNote('');
      setEditingLatest(false);
      setEditText('');
    }
  };

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    onAddNote?.(patient.id, newNote.trim());
    toast.success('Nursing note added');
    setNewNote('');
  };

  const startEditLatest = () => {
    setEditText(patient.nursingNotes[0]?.text ?? '');
    setEditingLatest(true);
  };

  const saveEditLatest = () => {
    onEditLatestNote?.(patient.id, editText.trim());
    toast.success('Latest note updated');
    setEditingLatest(false);
  };

  if (!patient) return null;

  const [latestNote, ...previousNotes] = patient.nursingNotes;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Nursing Notes</DialogTitle>
          <DialogDescription>
            {patient.name} · {patient.id} · Bed {patient.bed}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-1">
          <FieldLabel>Add note</FieldLabel>
          <Textarea
            value={newNote}
            onChange={(event) => setNewNote(event.target.value)}
            placeholder="Document your observations..."
            className="min-h-20 resize-none"
          />
          <div className="flex justify-end">
            <Button size="sm" className="mt-1" disabled={!newNote.trim()} onClick={handleAddNote}>
              Add Note
            </Button>
          </div>
        </div>

        <div className="max-h-64 space-y-3 overflow-y-auto border-t border-slate-200 pt-3">
          {latestNote ? (
            <div className="rounded-lg border border-sky-200 bg-sky-50/60 p-3">
              <div className="flex items-start justify-between gap-2">
                <p className="text-xs font-medium text-slate-500">
                  Latest · {latestNote.author} · {latestNote.timestamp}
                </p>
                {!editingLatest && (
                  <Button size="icon-xs" variant="ghost" onClick={startEditLatest}>
                    <Pencil className="size-3.5" />
                  </Button>
                )}
              </div>
              {editingLatest ? (
                <div className="mt-2 space-y-2">
                  <Textarea
                    value={editText}
                    onChange={(event) => setEditText(event.target.value)}
                    className="min-h-16 resize-none bg-white"
                  />
                  <div className="flex justify-end gap-2">
                    <Button size="sm" variant="ghost" onClick={() => setEditingLatest(false)}>
                      Cancel
                    </Button>
                    <Button size="sm" onClick={saveEditLatest}>
                      Save
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="mt-1.5 text-sm leading-5 text-slate-800">{latestNote.text}</p>
              )}
            </div>
          ) : (
            <p className="text-sm text-slate-500">No nursing notes recorded yet.</p>
          )}

          {previousNotes.length > 0 && (
            <div>
              <p className="mb-2 text-xs font-medium text-slate-500">Previous notes</p>
              <ul className="space-y-2">
                {previousNotes.map((note) => (
                  <li key={note.timestamp} className="rounded-lg border border-slate-200 p-3 text-sm">
                    <p className="text-xs font-medium text-slate-500">{note.author} · {note.timestamp}</p>
                    <p className="mt-1 leading-5 text-slate-800">{note.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <DialogFooter>
          <DialogClose render={<Button type="button" variant="outline" />}>Close</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
