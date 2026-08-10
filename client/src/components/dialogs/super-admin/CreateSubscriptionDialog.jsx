import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { PlanForm } from '@/components/super-admin/PlanForm';

export function CreateSubscriptionDialog({ open, onOpenChange, onSave }) {
  const handleSubmit = (payload) => {
    onSave(payload);
    onOpenChange(false);
    toast.success('Subscription plan created');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Subscription Plan</DialogTitle>
          <DialogDescription>Define pricing, limits, and feature access for a new plan.</DialogDescription>
        </DialogHeader>

        <PlanForm key={open ? 'open' : 'closed'} onSubmit={handleSubmit} submitLabel="Create Plan" />
      </DialogContent>
    </Dialog>
  );
}
