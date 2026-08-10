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
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { plans } from '@/data/superAdmin/subscriptionPlans';

function ChangePlanForm({ hospital, onOpenChange, onSave }) {
  const [plan, setPlan] = useState(hospital.plan);
  const [error, setError] = useState('');

  const handleSave = () => {
    if (!plan) {
      setError('Select a subscription plan');
      return;
    }
    onSave(hospital.id, { plan });
    onOpenChange(false);
    toast.success(`Subscription plan updated to ${plan}`);
  };

  return (
    <>
      <div className="space-y-4">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm">
          <p className="font-medium text-slate-900">{hospital.name}</p>
          <p className="text-xs text-slate-500">Current plan: {hospital.plan}</p>
        </div>
        <div className="space-y-1">
          <FieldLabel>New Subscription Plan *</FieldLabel>
          <Select value={plan} onValueChange={setPlan}>
            <SelectTrigger className="w-full" aria-invalid={!!error}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {plans.map((option) => (
                <SelectItem key={option.id} value={option.name}>
                  {option.name} — ${option.monthlyPrice}/mo
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {error && <FieldError>{error}</FieldError>}
        </div>
      </div>

      <DialogFooter>
        <DialogClose render={<Button type="button" variant="outline" />}>Cancel</DialogClose>
        <Button onClick={handleSave}>Change Plan</Button>
      </DialogFooter>
    </>
  );
}

export function ChangeHospitalPlanDialog({ hospital, open, onOpenChange, onSave }) {
  if (!hospital) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Change Subscription</DialogTitle>
          <DialogDescription>Move {hospital.name} to a different subscription plan.</DialogDescription>
        </DialogHeader>

        <ChangePlanForm key={hospital.id} hospital={hospital} onOpenChange={onOpenChange} onSave={onSave} />
      </DialogContent>
    </Dialog>
  );
}
