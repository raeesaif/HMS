import { Button } from '@/components/ui/button';

export function SaveChangesBar({ onSave, onDiscard, saving = false }) {
  return (
    <div className="sticky bottom-4 z-10 flex flex-col items-center justify-between gap-3 rounded-xl border border-border bg-white p-4 shadow-lg sm:flex-row">
      <p className="text-sm font-medium text-slate-700">You have unsaved changes.</p>
      <div className="flex gap-2">
        <Button variant="outline" onClick={onDiscard} disabled={saving}>
          Discard
        </Button>
        <Button onClick={onSave} disabled={saving}>
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
}
