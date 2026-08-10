import { useState } from 'react';
import { FieldLabel, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { planStatusOptions } from '@/data/superAdmin/subscriptionPlans';
import { features } from '@/data/superAdmin/features';

const CURRENCY_OPTIONS = ['USD', 'EUR', 'GBP'];

export function PlanForm({ plan, onSubmit, submitLabel = 'Save Plan' }) {
  const [form, setForm] = useState({
    name: plan?.name ?? '',
    description: plan?.description ?? '',
    monthlyPrice: plan ? String(plan.monthlyPrice) : '',
    yearlyPrice: plan ? String(plan.yearlyPrice) : '',
    currency: plan?.currency ?? 'USD',
    trialDays: plan ? String(plan.trialDays) : '14',
    maxUsers: plan ? String(plan.maxUsers) : '',
    maxDoctors: plan ? String(plan.maxDoctors) : '',
    maxNurses: plan ? String(plan.maxNurses) : '',
    maxReceptionists: plan ? String(plan.maxReceptionists) : '',
    maxPatients: plan ? String(plan.maxPatients) : '',
    storageLimitGB: plan ? String(plan.storageLimitGB) : '',
    status: plan?.status ?? 'Draft',
  });
  const [selectedFeatures, setSelectedFeatures] = useState(plan?.features ?? []);
  const [errors, setErrors] = useState({});

  const updateField = (field) => (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }));

  const toggleFeature = (featureId, checked) => {
    setSelectedFeatures((current) => (checked ? [...current, featureId] : current.filter((id) => id !== featureId)));
  };

  const handleSubmit = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = 'Plan name is required';
    if (!form.description.trim()) nextErrors.description = 'Description is required';
    if (form.monthlyPrice === '' || Number(form.monthlyPrice) < 0) nextErrors.monthlyPrice = 'Enter a valid monthly price';
    if (form.maxUsers === '' || Number(form.maxUsers) <= 0) nextErrors.maxUsers = 'Enter a valid maximum user count';

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    onSubmit({
      name: form.name.trim(),
      description: form.description.trim(),
      monthlyPrice: Number(form.monthlyPrice),
      yearlyPrice: Number(form.yearlyPrice) || Number(form.monthlyPrice) * 10,
      currency: form.currency,
      trialDays: Number(form.trialDays) || 0,
      maxUsers: Number(form.maxUsers),
      maxDoctors: Number(form.maxDoctors) || 0,
      maxNurses: Number(form.maxNurses) || 0,
      maxReceptionists: Number(form.maxReceptionists) || 0,
      maxPatients: Number(form.maxPatients) || 0,
      storageLimitGB: Number(form.storageLimitGB) || 0,
      status: form.status,
      features: selectedFeatures,
    });
  };

  return (
    <>
      <div className="max-h-[65vh] space-y-4 overflow-y-auto pr-1">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1 sm:col-span-2">
            <FieldLabel>Plan Name *</FieldLabel>
            <Input value={form.name} onChange={updateField('name')} aria-invalid={!!errors.name} />
            {errors.name && <FieldError>{errors.name}</FieldError>}
          </div>
          <div className="space-y-1 sm:col-span-2">
            <FieldLabel>Description *</FieldLabel>
            <Textarea value={form.description} onChange={updateField('description')} className="min-h-16 resize-none" aria-invalid={!!errors.description} />
            {errors.description && <FieldError>{errors.description}</FieldError>}
          </div>
          <div className="space-y-1">
            <FieldLabel>Monthly Price *</FieldLabel>
            <Input type="number" min="0" value={form.monthlyPrice} onChange={updateField('monthlyPrice')} aria-invalid={!!errors.monthlyPrice} />
            {errors.monthlyPrice && <FieldError>{errors.monthlyPrice}</FieldError>}
          </div>
          <div className="space-y-1">
            <FieldLabel>Yearly Price</FieldLabel>
            <Input type="number" min="0" value={form.yearlyPrice} onChange={updateField('yearlyPrice')} placeholder="Defaults to 10x monthly" />
          </div>
          <div className="space-y-1">
            <FieldLabel>Currency</FieldLabel>
            <Select value={form.currency} onValueChange={(value) => setForm((prev) => ({ ...prev, currency: value }))}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CURRENCY_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <FieldLabel>Trial Days</FieldLabel>
            <Input type="number" min="0" value={form.trialDays} onChange={updateField('trialDays')} />
          </div>
        </div>

        <div className="border-t border-slate-100 pt-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Limits</p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div className="space-y-1">
              <FieldLabel>Maximum Users *</FieldLabel>
              <Input type="number" min="1" value={form.maxUsers} onChange={updateField('maxUsers')} aria-invalid={!!errors.maxUsers} />
              {errors.maxUsers && <FieldError>{errors.maxUsers}</FieldError>}
            </div>
            <div className="space-y-1">
              <FieldLabel>Maximum Doctors</FieldLabel>
              <Input type="number" min="0" value={form.maxDoctors} onChange={updateField('maxDoctors')} />
            </div>
            <div className="space-y-1">
              <FieldLabel>Maximum Nurses</FieldLabel>
              <Input type="number" min="0" value={form.maxNurses} onChange={updateField('maxNurses')} />
            </div>
            <div className="space-y-1">
              <FieldLabel>Maximum Receptionists</FieldLabel>
              <Input type="number" min="0" value={form.maxReceptionists} onChange={updateField('maxReceptionists')} />
            </div>
            <div className="space-y-1">
              <FieldLabel>Maximum Patients</FieldLabel>
              <Input type="number" min="0" value={form.maxPatients} onChange={updateField('maxPatients')} />
            </div>
            <div className="space-y-1">
              <FieldLabel>Storage Limit (GB)</FieldLabel>
              <Input type="number" min="0" value={form.storageLimitGB} onChange={updateField('storageLimitGB')} />
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Plan Features</p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {features.map((feature) => (
              <label key={feature.id} className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm">
                <Checkbox checked={selectedFeatures.includes(feature.id)} onCheckedChange={(checked) => toggleFeature(feature.id, checked)} />
                {feature.name}
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-1 sm:w-48">
          <FieldLabel>Status</FieldLabel>
          <Select value={form.status} onValueChange={(value) => setForm((prev) => ({ ...prev, status: value }))}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {planStatusOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <DialogFooter>
        <DialogClose render={<Button type="button" variant="outline" />}>Cancel</DialogClose>
        <Button onClick={handleSubmit}>{submitLabel}</Button>
      </DialogFooter>
    </>
  );
}
