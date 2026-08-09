import { FilterX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FilterDropdown } from '@/shared/FilterDropdown';
import { ageGroups, genders, patientStatuses, sortOptions, wards } from '@/data/doctorPatients';

const statusOptions = patientStatuses.map((status) => ({ value: status, label: status }));
const genderOptions = genders.map((gender) => ({ value: gender, label: gender }));
const wardOptions = wards.map((ward) => ({ value: ward, label: ward }));

export function PatientFilters({
  status,
  onStatusChange,
  gender,
  onGenderChange,
  ageGroup,
  onAgeGroupChange,
  ward,
  onWardChange,
  sortBy,
  onSortByChange,
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

      <FilterDropdown
        label="Gender"
        allLabel="All Genders"
        value={gender}
        onChange={onGenderChange}
        options={genderOptions}
        className="sm:w-36"
      />

      <FilterDropdown
        label="Age Group"
        allLabel="All Ages"
        value={ageGroup}
        onChange={onAgeGroupChange}
        options={ageGroups}
        className="sm:w-40"
      />

      <FilterDropdown
        label="Ward"
        allLabel="All Wards"
        value={ward}
        onChange={onWardChange}
        options={wardOptions}
        className="sm:w-40"
      />

      <Select value={sortBy} onValueChange={onSortByChange}>
        <SelectTrigger className="w-full sm:w-44" aria-label="Sort by">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button variant="ghost" size="sm" className="text-slate-500" onClick={onClearFilters}>
        <FilterX /> Clear Filters
      </Button>
    </div>
  );
}
