import { Camera } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export function ProfileAvatar({ name, initials, imageUrl, onUpload, showUploadButton = true, className = '' }) {
  return (
    <div className={`relative inline-flex ${className}`}>
      <Avatar size="lg" className="size-20">
        {imageUrl && <AvatarImage src={imageUrl} alt={name} />}
        <AvatarFallback className="bg-sky-100 text-xl text-sky-600">{initials}</AvatarFallback>
      </Avatar>
      {showUploadButton && (
        <Button
          type="button"
          size="icon-sm"
          variant="outline"
          className="absolute -right-1 -bottom-1 rounded-full bg-white"
          onClick={onUpload}
          aria-label="Upload photo"
        >
          <Camera className="size-3.5" />
        </Button>
      )}
    </div>
  );
}
