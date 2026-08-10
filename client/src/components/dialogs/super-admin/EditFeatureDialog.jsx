import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { FeatureForm } from '@/components/super-admin/FeatureForm';

export function EditFeatureDialog({ feature, open, onOpenChange, onSave }) {
  if (!feature) return null;

  const handleSubmit = (payload) => {
    onSave(feature.id, payload);
    onOpenChange(false);
    toast.success('Feature updated');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Edit Feature</DialogTitle>
          <DialogDescription>Update {feature.name}&apos;s details and plan availability.</DialogDescription>
        </DialogHeader>

        <FeatureForm key={feature.id} feature={feature} onSubmit={handleSubmit} submitLabel="Save Changes" />
      </DialogContent>
    </Dialog>
  );
}
