import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function SettingsNavigation({ sections, activeKey, onChange }) {
  return (
    <>
      <div className="sm:hidden">
        <Select value={activeKey} onValueChange={onChange}>
          <SelectTrigger className="w-full" aria-label="Settings section">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {sections.map((section) => (
              <SelectItem key={section.key} value={section.key}>
                {section.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <nav className="hidden w-56 shrink-0 space-y-1 sm:block">
        {sections.map((section) => {
          const isActive = section.key === activeKey;
          return (
            <button
              key={section.key}
              type="button"
              onClick={() => onChange(section.key)}
              aria-current={isActive}
              className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                isActive ? 'bg-sky-50 text-sky-700' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <section.icon className="size-4" />
              {section.label}
            </button>
          );
        })}
      </nav>
    </>
  );
}
