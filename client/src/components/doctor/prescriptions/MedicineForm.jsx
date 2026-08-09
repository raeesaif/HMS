import { Trash2 } from 'lucide-react';
import { FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { foodInstructions, medicineForms, medicineFrequencies, medicineRoutes } from '@/data/doctorPrescriptions';

export function MedicineForm({ medicine, index, onChange, onRemove, canRemove, errors = {} }) {
  const update = (field) => (event) => onChange(index, field, event.target.value);
  const updateSelect = (field) => (value) => onChange(index, field, value);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-900">Medicine {index + 1}</p>
        {canRemove && (
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="text-rose-500 hover:text-rose-600"
            onClick={() => onRemove(index)}
            aria-label={`Remove medicine ${index + 1}`}
          >
            <Trash2 className="size-4" />
          </Button>
        )}
      </div>

      <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <FieldLabel>Medicine Name *</FieldLabel>
          <Input
            value={medicine.name}
            onChange={update('name')}
            aria-invalid={errors.name}
            placeholder="e.g. Amlodipine"
          />
        </div>
        <div className="space-y-1">
          <FieldLabel>Generic Name</FieldLabel>
          <Input value={medicine.genericName} onChange={update('genericName')} placeholder="e.g. Amlodipine besylate" />
        </div>
        <div className="space-y-1">
          <FieldLabel>Dosage *</FieldLabel>
          <Input value={medicine.dosage} onChange={update('dosage')} aria-invalid={errors.dosage} placeholder="e.g. 5mg" />
        </div>
        <div className="space-y-1">
          <FieldLabel>Strength</FieldLabel>
          <Input value={medicine.strength} onChange={update('strength')} placeholder="e.g. 5mg" />
        </div>

        <div className="space-y-1">
          <FieldLabel>Form</FieldLabel>
          <Select value={medicine.form} onValueChange={updateSelect('form')}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select form" />
            </SelectTrigger>
            <SelectContent>
              {medicineForms.map((form) => (
                <SelectItem key={form} value={form}>
                  {form}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <FieldLabel>Route</FieldLabel>
          <Select value={medicine.route} onValueChange={updateSelect('route')}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select route" />
            </SelectTrigger>
            <SelectContent>
              {medicineRoutes.map((route) => (
                <SelectItem key={route} value={route}>
                  {route}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <FieldLabel>Frequency *</FieldLabel>
          <Select value={medicine.frequency} onValueChange={updateSelect('frequency')}>
            <SelectTrigger className="w-full" aria-invalid={errors.frequency}>
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              {medicineFrequencies.map((frequency) => (
                <SelectItem key={frequency} value={frequency}>
                  {frequency}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <FieldLabel>Duration *</FieldLabel>
          <Input
            value={medicine.duration}
            onChange={update('duration')}
            aria-invalid={errors.duration}
            placeholder="e.g. 30 days"
          />
        </div>

        <div className="space-y-1">
          <FieldLabel>Start Date</FieldLabel>
          <Input type="date" value={medicine.startDate} onChange={update('startDate')} />
        </div>
        <div className="space-y-1">
          <FieldLabel>End Date</FieldLabel>
          <Input type="date" value={medicine.endDate} onChange={update('endDate')} />
        </div>

        <div className="space-y-1">
          <FieldLabel>Quantity</FieldLabel>
          <Input value={medicine.quantity} onChange={update('quantity')} placeholder="e.g. 30 tablets" />
        </div>
        <div className="space-y-1">
          <FieldLabel>Before / After Food</FieldLabel>
          <Select value={medicine.beforeAfterFood} onValueChange={updateSelect('beforeAfterFood')}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {foodInstructions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1 sm:col-span-2">
          <FieldLabel>Special Instructions</FieldLabel>
          <Input
            value={medicine.specialInstructions}
            onChange={update('specialInstructions')}
            placeholder="e.g. Take at the same time each morning"
          />
        </div>
        <div className="space-y-1 sm:col-span-2">
          <FieldLabel>Notes</FieldLabel>
          <Textarea
            value={medicine.notes}
            onChange={update('notes')}
            className="min-h-16 resize-none"
            placeholder="Additional notes for the pharmacist or patient..."
          />
        </div>
      </div>
    </div>
  );
}
