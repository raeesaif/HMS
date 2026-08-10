import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { EmptyState } from '@/shared/EmptyState';

export function ErrorState({ title = 'Unable to load information', description = 'Something went wrong while loading your data.', onRetry }) {
  return (
    <Card className="rounded-xl border-border shadow-sm">
      <CardContent className="py-16">
        <EmptyState
          icon={AlertTriangle}
          title={title}
          description={description}
          action={onRetry && <Button onClick={onRetry}>Try Again</Button>}
        />
      </CardContent>
    </Card>
  );
}
