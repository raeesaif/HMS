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
import { FieldLabel, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';

function CatalogForm({ entityLabel, nameMaxLength, initialValues, onSave, isSubmitting }) {
  const [form, setForm] = useState({
    name: initialValues?.name ?? '',
    description: initialValues?.description ?? '',
    isActive: initialValues?.isActive ?? true,
  });
  const [errors, setErrors] = useState({});

  const handleSave = () => {
    const trimmedName = form.name.trim();
    const trimmedDescription = form.description.trim();
    const nextErrors = {};

    if (trimmedName.length < 2) nextErrors.name = `${entityLabel} name must be at least 2 characters`;
    else if (trimmedName.length > nameMaxLength) nextErrors.name = `${entityLabel} name must be at most ${nameMaxLength} characters`;

    if (trimmedDescription.length > 500) nextErrors.description = 'Description must be at most 500 characters';

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    onSave({
      name: trimmedName,
      description: trimmedDescription || undefined,
      isActive: form.isActive,
    });
  };

  return (
    <>
      <div className="space-y-4">
        <div className="space-y-1">
          <FieldLabel>{entityLabel} Name *</FieldLabel>
          <Input value={form.name} onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))} aria-invalid={!!errors.name} />
          {errors.name && <FieldError>{errors.name}</FieldError>}
        </div>
        <div className="space-y-1">
          <FieldLabel>Description</FieldLabel>
          <Textarea
            value={form.description}
            onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
            rows={3}
            aria-invalid={!!errors.description}
          />
          {errors.description && <FieldError>{errors.description}</FieldError>}
        </div>
        <div className="flex items-center justify-between">
          <FieldLabel htmlFor="catalog-form-active">Active</FieldLabel>
          <Switch id="catalog-form-active" checked={form.isActive} onCheckedChange={(checked) => setForm((prev) => ({ ...prev, isActive: checked }))} />
        </div>
      </div>

      <DialogFooter>
        <DialogClose render={<Button type="button" variant="outline" />}>Cancel</DialogClose>
        <Button onClick={handleSave} disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save'}
        </Button>
      </DialogFooter>
    </>
  );
}

export function CatalogFormDialog({
  open,
  onOpenChange,
  mode = 'create',
  entityLabel,
  nameMaxLength = 50,
  initialValues,
  onSave,
  isSubmitting = false,
}) {
  const isEdit = mode === 'edit';

  const handleSave = (payload) => {
    onSave(payload);
    onOpenChange(false);
    toast.success(`${entityLabel} ${isEdit ? 'updated' : 'created'} successfully`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEdit ? `Edit ${entityLabel}` : `Add ${entityLabel}`}</DialogTitle>
          <DialogDescription>
            {isEdit ? `Update this ${entityLabel.toLowerCase()}'s details.` : `Create a new ${entityLabel.toLowerCase()} for the platform.`}
          </DialogDescription>
        </DialogHeader>

        <CatalogForm
          key={open ? (initialValues?.id ?? 'create') : 'closed'}
          entityLabel={entityLabel}
          nameMaxLength={nameMaxLength}
          initialValues={initialValues}
          onSave={handleSave}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
}
