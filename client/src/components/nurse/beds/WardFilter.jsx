import { FilterDropdown } from '@/shared/FilterDropdown';

export function WardFilter({ value, onChange, options }) {
  return <FilterDropdown label="Ward" allLabel="All Wards" value={value} onChange={onChange} options={options} />;
}
