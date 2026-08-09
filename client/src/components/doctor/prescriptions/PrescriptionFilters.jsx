import { FilterX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FilterDropdown } from '@/shared/FilterDropdown';
import { AppointmentDatePicker } from '@/components/doctor/appointments/AppointmentDatePicker';
import { datePresets, prescriptionStatuses } from '@/data/doctorPrescriptions';

const statusOptions = prescriptionStatuses.map((status) => ({ value: status, label: status }));

export function PrescriptionFilters({
  status,
  onStatusChange,
  datePreset,
  onDatePresetChange,
  customDate,
  onCustomDateChange,
  onClearFilters,
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      <FilterDropdown
        label="Status"
        allLabel="All Statuses"
        value={status}
        onChange={onStatusChange}
        options={statusOptions}
        className="sm:w-44"
      />

      <Select value={datePreset} onValueChange={onDatePresetChange}>
        <SelectTrigger className="w-full sm:w-40" aria-label="Date range">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {datePresets.map((preset) => (
            <SelectItem key={preset.value} value={preset.value}>
              {preset.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {datePreset === 'custom' && (
        <AppointmentDatePicker date={customDate} onSelect={onCustomDateChange} className="w-full sm:w-44" />
      )}

      <Button variant="ghost" size="sm" className="text-slate-500" onClick={onClearFilters}>
        <FilterX /> Clear Filters
      </Button>
    </div>
  );
}
