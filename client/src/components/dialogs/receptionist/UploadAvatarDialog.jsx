import { useState } from 'react';
import { toast } from 'sonner';
import { Image as ImageIcon, Trash2, Upload } from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

function AvatarUploadForm({ profile, onOpenChange, onSave }) {
  const [preview, setPreview] = useState(profile.profileImage);

  const handleFileChange = (event) => {
    const selected = event.target.files?.[0];
    event.target.value = '';
    if (!selected) return;
    if (!selected.type.startsWith('image/')) {
      toast.error('Please select an image file (PNG, JPG, or WEBP)');
      return;
    }
    setPreview(URL.createObjectURL(selected));
  };

  const handleRemove = () => setPreview(null);

  const handleSave = () => {
    onSave(preview);
    onOpenChange(false);
    toast.success(preview ? 'Profile photo updated' : 'Profile photo removed');
  };

  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <Avatar size="lg" className="size-28">
          {preview && <AvatarImage src={preview} alt={profile.name} />}
          <AvatarFallback className="bg-sky-100 text-2xl text-sky-600">{profile.avatarInitials}</AvatarFallback>
        </Avatar>

        <div className="flex flex-wrap justify-center gap-2">
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-input bg-transparent px-3 py-2 text-sm font-medium transition-colors hover:bg-muted">
            <Upload className="size-4" />
            Upload Image
            <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </label>
          {preview && (
            <Button type="button" variant="outline" onClick={handleRemove}>
              <Trash2 /> Remove Image
            </Button>
          )}
        </div>

        <p className="flex items-center gap-1 text-center text-xs text-slate-500">
          <ImageIcon className="size-3.5" />
          Supports PNG, JPG, or WEBP up to 5MB.
        </p>
      </div>

      <DialogFooter>
        <DialogClose render={<Button type="button" variant="outline" />}>Cancel</DialogClose>
        <Button onClick={handleSave}>Save</Button>
      </DialogFooter>
    </>
  );
}

export function UploadAvatarDialog({ profile, open, onOpenChange, onSave }) {
  if (!profile) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Upload Profile Photo</DialogTitle>
          <DialogDescription>This photo is visible to staff across the hospital system.</DialogDescription>
        </DialogHeader>

        <AvatarUploadForm key={open ? 'open' : 'closed'} profile={profile} onOpenChange={onOpenChange} onSave={onSave} />
      </DialogContent>
    </Dialog>
  );
}
