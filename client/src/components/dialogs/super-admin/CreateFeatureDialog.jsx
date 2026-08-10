import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { FeatureForm } from '@/components/super-admin/FeatureForm';

export function CreateFeatureDialog({ open, onOpenChange, onSave }) {
  const handleSubmit = (payload) => {
    onSave(payload);
    onOpenChange(false);
    toast.success('Feature created');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Create Feature</DialogTitle>
          <DialogDescription>Define a new platform feature and assign it to plans.</DialogDescription>
        </DialogHeader>

        <FeatureForm key={open ? 'open' : 'closed'} onSubmit={handleSubmit} submitLabel="Create Feature" />
      </DialogContent>
    </Dialog>
  );
}
