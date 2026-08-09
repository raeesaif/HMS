import { Pencil } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProfileField } from './ProfileField';

export function EmergencyContactCard({ contact, onEdit }) {
  return (
    <Card className="rounded-xl border-border shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-0">
        <CardTitle className="text-sm font-semibold">Emergency Contact</CardTitle>
        <Button type="button" variant="ghost" size="sm" onClick={onEdit}>
          <Pencil /> Edit
        </Button>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-x-4 gap-y-3 pt-3 sm:grid-cols-2">
        <ProfileField label="Contact Name" value={contact.name} />
        <ProfileField label="Relationship" value={contact.relationship} />
        <ProfileField label="Phone Number" value={contact.phone} />
        <ProfileField label="Alternate Phone" value={contact.alternatePhone} />
        <div className="sm:col-span-2">
          <ProfileField label="Address" value={contact.address} />
        </div>
      </CardContent>
    </Card>
  );
}
