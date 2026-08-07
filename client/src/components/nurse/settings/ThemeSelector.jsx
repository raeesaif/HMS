import { Monitor, Moon, Sun } from 'lucide-react';
import { themeOptions } from '@/data/nurseSettings';

const themeIcons = { system: Monitor, light: Sun, dark: Moon };

export function ThemeSelector({ value, onChange }) {
  return (
    <div className="inline-flex rounded-lg border border-input p-1">
      {themeOptions.map((option) => {
        const Icon = themeIcons[option.value];
        const isActive = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            aria-pressed={isActive}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              isActive ? 'bg-primary text-primary-foreground' : 'text-slate-600 hover:bg-muted'
            }`}
          >
            <Icon className="size-3.5" />
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
