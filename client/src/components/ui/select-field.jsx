import { FieldLabel } from '@/components/ui/field';

function SelectField({ label, error, className = '', children, ...props }) {
  return (
    <div className="space-y-1">
      <FieldLabel>{label}</FieldLabel>
      <select
        className={`h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30 ${className}`}
        {...props}
      >
        {children}
      </select>
      {error && <p className="text-destructive text-sm">{error.message}</p>}
    </div>
  );
}

export { SelectField };
