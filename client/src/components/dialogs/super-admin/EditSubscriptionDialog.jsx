import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { PlanForm } from '@/components/super-admin/PlanForm';

export function EditSubscriptionDialog({ plan, open, onOpenChange, onSave }) {
  if (!plan) return null;

  const handleSubmit = (payload) => {
    onSave(plan.id, payload);
    onOpenChange(false);
    toast.success('Subscription plan updated');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Subscription Plan</DialogTitle>
          <DialogDescription>Update pricing, limits, and feature access for {plan.name}.</DialogDescription>
        </DialogHeader>

        <PlanForm key={plan.id} plan={plan} onSubmit={handleSubmit} submitLabel="Save Changes" />
      </DialogContent>
    </Dialog>
  );
}
