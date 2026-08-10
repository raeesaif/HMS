import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProfileField } from './ProfileField';

export function EmergencyContactCard({ contact, onEdit }) {
  return (
    <Card className="rounded-xl border-border shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-0">
        <CardTitle className="text-sm font-semibold">Emergency Contact</CardTitle>
        <Button variant="ghost" size="sm" onClick={onEdit}>
          Edit
        </Button>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-x-4 gap-y-3 pt-3 sm:grid-cols-2">
        <ProfileField label="Name" value={contact?.name} />
        <ProfileField label="Relationship" value={contact?.relationship} />
        <ProfileField label="Phone" value={contact?.phone} />
        <ProfileField label="Address" value={contact?.address} />
      </CardContent>
    </Card>
  );
}
