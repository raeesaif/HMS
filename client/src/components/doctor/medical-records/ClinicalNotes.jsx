import { NotebookPen, Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { EmptyState } from '@/shared/EmptyState';
import { TimelineSkeleton } from './LoadingSkeleton';

function ClinicalNoteCard({ note }) {
  return (
    <Card className="rounded-xl border-border shadow-sm">
      <CardContent className="space-y-2 px-4 py-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Badge variant="outline" className="border-sky-200 text-sky-600">
            {note.noteType}
          </Badge>
          <span className="text-xs text-slate-400">
            {note.date} · {note.time}
          </span>
        </div>
        <p className="text-sm text-slate-800">{note.content}</p>
        {note.followUpInstructions && (
          <p className="text-xs text-slate-500">
            <span className="font-medium text-slate-600">Follow-up:</span> {note.followUpInstructions}
          </p>
        )}
        {note.attachments?.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {note.attachments.map((attachment) => (
              <span
                key={attachment}
                className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600"
              >
                <Paperclip className="size-3" />
                {attachment}
              </span>
            ))}
          </div>
        )}
        <p className="pt-1 text-xs text-slate-400">By {note.author}</p>
      </CardContent>
    </Card>
  );
}

export function ClinicalNotes({ notes, isLoading = false, onAddNote }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button size="sm" onClick={onAddNote}>
          <NotebookPen /> Add Clinical Note
        </Button>
      </div>

      {isLoading ? (
        <TimelineSkeleton count={3} />
      ) : notes.length === 0 ? (
        <EmptyState icon={NotebookPen} title="No clinical notes found" description="No clinical notes have been recorded for this patient yet." />
      ) : (
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          {notes.map((note) => (
            <ClinicalNoteCard key={note.id} note={note} />
          ))}
        </div>
      )}
    </div>
  );
}
