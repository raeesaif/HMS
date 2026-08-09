import { FilterX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FilterDropdown } from '@/shared/FilterDropdown';
import { AppointmentDatePicker } from '@/components/doctor/appointments/AppointmentDatePicker';
import { datePresets, labReportStatuses, labResultStatuses, labTestTypes } from '@/data/doctorLabReports';

const reportStatusOptions = labReportStatuses.map((status) => ({ value: status, label: status }));
const resultStatusOptions = labResultStatuses.map((status) => ({ value: status, label: status }));
const testTypeOptions = labTestTypes.map((type) => ({ value: type, label: type }));

export function LabReportFilters({
  reportStatus,
  onReportStatusChange,
  resultStatus,
  onResultStatusChange,
  testType,
  onTestTypeChange,
  datePreset,
  onDatePresetChange,
  customDate,
  onCustomDateChange,
  onClearFilters,
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      <FilterDropdown
        label="Report Status"
        allLabel="All Report Statuses"
        value={reportStatus}
        onChange={onReportStatusChange}
        options={reportStatusOptions}
        className="sm:w-48"
      />

      <FilterDropdown
        label="Result Status"
        allLabel="All Result Statuses"
        value={resultStatus}
        onChange={onResultStatusChange}
        options={resultStatusOptions}
        className="sm:w-44"
      />

      <FilterDropdown
        label="Test Type"
        allLabel="All Test Types"
        value={testType}
        onChange={onTestTypeChange}
        options={testTypeOptions}
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
