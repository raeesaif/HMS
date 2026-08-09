import { FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export function ConsultationNotes({ values, onChange, disabled = false }) {
  const update = (field) => (event) => onChange(field, event.target.value);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="space-y-1 sm:col-span-2">
        <FieldLabel>Chief Complaint</FieldLabel>
        <Input
          value={values.chiefComplaint}
          onChange={update('chiefComplaint')}
          disabled={disabled}
          placeholder="e.g. Chest tightness during exercise"
        />
      </div>
      <div className="space-y-1 sm:col-span-2">
        <FieldLabel>Symptoms</FieldLabel>
        <Textarea
          value={values.symptoms}
          onChange={update('symptoms')}
          disabled={disabled}
          className="min-h-20 resize-none"
          placeholder="Describe reported symptoms..."
        />
      </div>
      <div className="space-y-1 sm:col-span-2">
        <FieldLabel>Clinical Notes</FieldLabel>
        <Textarea
          value={values.clinicalNotes}
          onChange={update('clinicalNotes')}
          disabled={disabled}
          className="min-h-20 resize-none"
          placeholder="Examination findings and observations..."
        />
      </div>
      <div className="space-y-1">
        <FieldLabel>Diagnosis *</FieldLabel>
        <Input
          value={values.diagnosis}
          onChange={update('diagnosis')}
          disabled={disabled}
          placeholder="e.g. Stable angina"
        />
      </div>
      <div className="space-y-1">
        <FieldLabel>Treatment Plan *</FieldLabel>
        <Input
          value={values.treatmentPlan}
          onChange={update('treatmentPlan')}
          disabled={disabled}
          placeholder="e.g. Start beta-blocker, recheck in 2 weeks"
        />
      </div>
      <div className="space-y-1 sm:col-span-2">
        <FieldLabel>Follow-up Instructions</FieldLabel>
        <Textarea
          value={values.followUpInstructions}
          onChange={update('followUpInstructions')}
          disabled={disabled}
          className="min-h-16 resize-none"
          placeholder="Instructions for the patient's next visit..."
        />
      </div>
    </div>
  );
}
