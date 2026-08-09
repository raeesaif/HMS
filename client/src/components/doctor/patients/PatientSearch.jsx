import { SearchInput } from '@/shared/SearchInput';

export function PatientSearch({ value, onChange, className = '' }) {
  return (
    <SearchInput
      value={value}
      onChange={onChange}
      placeholder="Search by name, patient ID, or phone"
      className={className}
    />
  );
}
