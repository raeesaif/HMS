import { useState } from 'react';
import { FieldLabel, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { featureCategoryOptions, featureStatusOptions } from '@/data/superAdmin/features';
import { plans } from '@/data/superAdmin/subscriptionPlans';

export function FeatureForm({ feature, onSubmit, submitLabel = 'Save Feature' }) {
  const [form, setForm] = useState({
    name: feature?.name ?? '',
    description: feature?.description ?? '',
    category: feature?.category ?? '',
    key: feature?.key ?? '',
    status: feature?.status ?? 'Disabled',
  });
  const [selectedPlans, setSelectedPlans] = useState(feature?.plans ?? []);
  const [errors, setErrors] = useState({});

  const updateField = (field) => (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }));

  const togglePlan = (planName) => {
    setSelectedPlans((current) => (current.includes(planName) ? current.filter((name) => name !== planName) : [...current, planName]));
  };

  const handleSubmit = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = 'Feature name is required';
    if (!form.description.trim()) nextErrors.description = 'Description is required';
    if (!form.category) nextErrors.category = 'Select a category';
    if (!form.key.trim()) nextErrors.key = 'Feature key is required';

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    onSubmit({
      name: form.name.trim(),
      description: form.description.trim(),
      category: form.category,
      key: form.key.trim().toLowerCase().replace(/\s+/g, '-'),
      status: form.status,
      plans: selectedPlans,
    });
  };

  return (
    <>
      <div className="max-h-[65vh] space-y-4 overflow-y-auto pr-1">
        <div className="space-y-1">
          <FieldLabel>Feature Name *</FieldLabel>
          <Input value={form.name} onChange={updateField('name')} aria-invalid={!!errors.name} />
          {errors.name && <FieldError>{errors.name}</FieldError>}
        </div>
        <div className="space-y-1">
          <FieldLabel>Description *</FieldLabel>
          <Textarea value={form.description} onChange={updateField('description')} className="min-h-16 resize-none" aria-invalid={!!errors.description} />
          {errors.description && <FieldError>{errors.description}</FieldError>}
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <FieldLabel>Category *</FieldLabel>
            <Select value={form.category} onValueChange={(value) => setForm((prev) => ({ ...prev, category: value }))}>
              <SelectTrigger className="w-full" aria-invalid={!!errors.category}>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {featureCategoryOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && <FieldError>{errors.category}</FieldError>}
          </div>
          <div className="space-y-1">
            <FieldLabel>Feature Key *</FieldLabel>
            <Input value={form.key} onChange={updateField('key')} placeholder="e.g. telemedicine" aria-invalid={!!errors.key} />
            {errors.key && <FieldError>{errors.key}</FieldError>}
          </div>
        </div>

        <div className="space-y-1 sm:w-48">
          <FieldLabel>Status</FieldLabel>
          <Select value={form.status} onValueChange={(value) => setForm((prev) => ({ ...prev, status: value }))}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {featureStatusOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="border-t border-slate-100 pt-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Available Plans</p>
          <div className="flex flex-wrap gap-2">
            {plans.map((plan) => {
              const isSelected = selectedPlans.includes(plan.name);
              return (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => togglePlan(plan.name)}
                  className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                    isSelected ? 'border-sky-300 bg-sky-50 text-sky-700' : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  {plan.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <DialogFooter>
        <DialogClose render={<Button type="button" variant="outline" />}>Cancel</DialogClose>
        <Button onClick={handleSubmit}>{submitLabel}</Button>
      </DialogFooter>
    </>
  );
}
