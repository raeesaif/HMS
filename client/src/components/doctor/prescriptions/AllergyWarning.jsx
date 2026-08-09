import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function AllergyWarning({ allergies = [] }) {
  if (allergies.length === 0) return null;

  return (
    <Alert variant="destructive">
      <AlertTriangle />
      <AlertTitle>Patient has a recorded allergy</AlertTitle>
      <AlertDescription>
        <p>
          Please review before prescribing: <span className="font-medium">{allergies.join(', ')}</span>
        </p>
        <p className="text-xs text-muted-foreground">
          Drug interaction and duplicate medication checks will appear here once connected to the pharmacy system.
        </p>
      </AlertDescription>
    </Alert>
  );
}
