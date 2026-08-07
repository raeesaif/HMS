import { FilterDropdown } from '@/shared/FilterDropdown';
import { Button } from '@/components/ui/button';
import { notificationPriorities, notificationStatuses, notificationTypes } from '@/data/nurseNotifications';

export function NotificationFilter({
  status,
  onStatusChange,
  priority,
  onPriorityChange,
  type,
  onTypeChange,
  onClear,
  hasActiveFilters,
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl border border-border bg-white p-3">
      <FilterDropdown label="Status" allLabel="All" value={status} onChange={onStatusChange} options={notificationStatuses} />
      <FilterDropdown
        label="Priority"
        allLabel="All Priorities"
        value={priority}
        onChange={onPriorityChange}
        options={notificationPriorities}
      />
      <FilterDropdown label="Type" allLabel="All Types" value={type} onChange={onTypeChange} options={notificationTypes} />
      {hasActiveFilters && (
        <Button variant="ghost" size="sm" onClick={onClear}>
          Clear filters
        </Button>
      )}
    </div>
  );
}
