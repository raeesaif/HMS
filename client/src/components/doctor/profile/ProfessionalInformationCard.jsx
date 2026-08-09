import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProfileField } from './ProfileField';
import { ProfileCorrectionRequest } from './ProfileCorrectionRequest';

export function ProfessionalInformationCard({ profile, onRequestCorrection }) {
  return (
    <Card className="rounded-xl border-border shadow-sm">
      <CardHeader className="pb-0">
        <CardTitle className="text-sm font-semibold">Professional Information</CardTitle>
      </CardHeader>
      <CardContent className="pt-3">
        <div className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
          <ProfileField label="Professional Name" value={`Dr. ${profile.name} — ${profile.professionalTitle}`} />
          <ProfileField label="Medical Specialty" value={profile.specialization} locked />
          <ProfileField label="Department" value={profile.department} locked />
          <ProfileField label="Qualification" value={profile.qualification} />
          <ProfileField label="License Number" value={profile.licenseNumber} locked />
          <ProfileField label="Years of Experience" value={profile.experience} />
        </div>

        <div className="mt-3">
          <ProfileField label="Professional Bio" value={profile.bio} />
        </div>

        <div className="mt-3">
          <p className="text-xs text-slate-500">Areas of Expertise</p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {profile.expertiseAreas.map((area) => (
              <Badge key={area} variant="outline" className="border-sky-200 text-sky-600">
                {area}
              </Badge>
            ))}
          </div>
        </div>

        <ProfileCorrectionRequest onRequest={onRequestCorrection} />
      </CardContent>
    </Card>
  );
}
