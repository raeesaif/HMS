import { AlertOctagon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

export function CriticalResultAlert({ report, onAction }) {
  return (
    <Alert variant="destructive">
      <AlertOctagon />
      <AlertTitle>Critical Laboratory Result</AlertTitle>
      <AlertDescription>
        <p>The patient has a critical laboratory result that requires clinical attention.</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button size="sm" variant="outline" onClick={() => onAction('view-patient', report)}>
            Review Patient
          </Button>
          <Button size="sm" variant="outline" onClick={() => onAction('view-medical-records', report)}>
            View Medical Records
          </Button>
          <Button size="sm" variant="outline" onClick={() => onAction('add-clinical-interpretation', report)}>
            Add Clinical Interpretation
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
}
