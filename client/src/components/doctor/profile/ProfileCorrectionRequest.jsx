import { PencilLine } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ProfileCorrectionRequest({ onRequest }) {
  return (
    <div className="mt-4 flex items-center justify-between gap-3 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-3 py-2.5">
      <p className="text-xs text-slate-500">Need something corrected in your hospital records?</p>
      <Button type="button" variant="outline" size="sm" onClick={onRequest}>
        <PencilLine /> Request Profile Correction
      </Button>
    </div>
  );
}
