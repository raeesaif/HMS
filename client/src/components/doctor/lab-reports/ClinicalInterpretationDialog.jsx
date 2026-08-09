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
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

function InterpretationForm({ report, onOpenChange, onSave }) {
  const existing = report.interpretation;
  const [interpretation, setInterpretation] = useState(existing?.interpretation ?? '');
  const [followUpRecommendation, setFollowUpRecommendation] = useState(existing?.followUpRecommendation ?? '');
  const [additionalNotes, setAdditionalNotes] = useState(existing?.additionalNotes ?? '');

  const handleSave = () => {
    if (!interpretation.trim()) {
      toast.error('Clinical interpretation cannot be empty');
      return;
    }
    onSave(report.id, {
      interpretation: interpretation.trim(),
      followUpRecommendation: followUpRecommendation.trim(),
      additionalNotes: additionalNotes.trim(),
    });
    onOpenChange(false);
    toast.success('Clinical interpretation saved');
  };

  return (
    <>
      {existing && (
        <p className="text-xs text-slate-500">
          Last interpreted by {existing.interpretedBy} on {existing.interpretedAt}
        </p>
      )}

      <div className="space-y-4">
        <div className="space-y-1">
          <FieldLabel>Clinical Interpretation *</FieldLabel>
          <Textarea
            value={interpretation}
            onChange={(event) => setInterpretation(event.target.value)}
            className="min-h-24 resize-none"
            placeholder="Summarize your clinical interpretation of these results..."
          />
        </div>
        <div className="space-y-1">
          <FieldLabel>Follow-up Recommendation</FieldLabel>
          <Textarea
            value={followUpRecommendation}
            onChange={(event) => setFollowUpRecommendation(event.target.value)}
            className="min-h-16 resize-none"
            placeholder="Recommended next steps..."
          />
        </div>
        <div className="space-y-1">
          <FieldLabel>Additional Notes</FieldLabel>
          <Textarea
            value={additionalNotes}
            onChange={(event) => setAdditionalNotes(event.target.value)}
            className="min-h-16 resize-none"
            placeholder="Any additional notes (optional)..."
          />
        </div>
      </div>

      <DialogFooter>
        <DialogClose render={<Button type="button" variant="outline" />}>Cancel</DialogClose>
        <Button onClick={handleSave}>Save Interpretation</Button>
      </DialogFooter>
    </>
  );
}

export function ClinicalInterpretationDialog({ report, open, onOpenChange, onSave }) {
  if (!report) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Clinical Interpretation</DialogTitle>
          <DialogDescription>
            {report.id} · {report.testName}
          </DialogDescription>
        </DialogHeader>

        <InterpretationForm key={report.id} report={report} onOpenChange={onOpenChange} onSave={onSave} />
      </DialogContent>
    </Dialog>
  );
}
