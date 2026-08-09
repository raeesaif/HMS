import { FilterX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FilterDropdown } from '@/shared/FilterDropdown';
import { appointmentStatuses, appointmentTypes, datePresets } from '@/data/doctorAppointments';
import { AppointmentDatePicker } from './AppointmentDatePicker';

const statusOptions = appointmentStatuses.map((status) => ({ value: status, label: status }));
const typeOptions = appointmentTypes.map((type) => ({ value: type, label: type }));

export function AppointmentFilters({
  datePreset,
  onDatePresetChange,
  customDate,
  onCustomDateChange,
  status,
  onStatusChange,
  type,
  onTypeChange,
  onClearFilters,
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
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

      <FilterDropdown
        label="Status"
        allLabel="All Statuses"
        value={status}
        onChange={onStatusChange}
        options={statusOptions}
        className="sm:w-44"
      />

      <FilterDropdown
        label="Type"
        allLabel="All Types"
        value={type}
        onChange={onTypeChange}
        options={typeOptions}
        className="sm:w-44"
      />

      <Button variant="ghost" size="sm" className="text-slate-500" onClick={onClearFilters}>
        <FilterX /> Clear Filters
      </Button>
    </div>
  );
}
