import { Camera } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const getInitials = (name) =>
  name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

export function ProfileAvatar({ name, avatarUrl, sizeClassName = 'size-20', onEditClick, className = '' }) {
  return (
    <div className={`relative inline-flex ${className}`}>
      <Avatar className={`${sizeClassName} text-lg`}>
        {avatarUrl && <AvatarImage src={avatarUrl} alt={name} />}
        <AvatarFallback className="bg-sky-100 text-sky-600">{getInitials(name)}</AvatarFallback>
      </Avatar>
      {onEditClick && (
        <Button
          type="button"
          size="icon-sm"
          variant="outline"
          className="absolute -right-1 -bottom-1 rounded-full bg-white shadow-sm"
          onClick={onEditClick}
        >
          <Camera className="size-3.5" />
          <span className="sr-only">Change photo</span>
        </Button>
      )}
    </div>
  );
}
