import { Mail, Phone, GraduationCap, BadgeCheck, Clock, Building2, Briefcase } from 'lucide-react';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { patientsData } from '@/data/patients';

const TYPE_LABEL = {
  doctor: 'Doctor',
  nurse: 'Nurse',
  receptionist: 'Receptionist',
};

const ROLE_STYLES = {
  doctor: { avatarBg: 'bg-blue-50', avatarText: 'text-blue-600' },
  nurse: { avatarBg: 'bg-teal-50', avatarText: 'text-teal-600' },
  receptionist: { avatarBg: 'bg-violet-50', avatarText: 'text-violet-600' },
};

const STATUS_STYLES = {
  'On duty': { dot: 'bg-emerald-500', text: 'text-emerald-700', bg: 'bg-emerald-50' },
  'Off duty': { dot: 'bg-slate-400', text: 'text-slate-600', bg: 'bg-slate-100' },
};

const getInitials = (name) => {
  const cleaned = name.replace(/^Dr\.\s*/, '');
  return cleaned
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
};

const InfoRow = ({ icon: Icon, label, value }) => {
  if (!value) return null;
  return (
    <div className="flex items-start gap-2.5">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-wide text-slate-400">{label}</p>
        <p className="truncate text-sm font-medium text-slate-700">{value}</p>
      </div>
    </div>
  );
};

const StaffDetailsDialog = ({ open, onOpenChange, member, onEdit }) => {
  if (!member) return null;

  const roleStyle = ROLE_STYLES[member.type] ?? ROLE_STYLES.doctor;
  const statusStyle = STATUS_STYLES[member.status] ?? STATUS_STYLES['Off duty'];
  const isProfessional = member.type === 'doctor' || member.type === 'nurse';
  const assignedPatients =
    member.type === 'nurse'
      ? (member.assignedPatientIds ?? [])
          .map((id) => patientsData.find((patient) => patient.id === id))
          .filter(Boolean)
      : [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <div className="flex items-start gap-3">
            <span
              className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-lg font-semibold ${roleStyle.avatarBg} ${roleStyle.avatarText}`}
            >
              {getInitials(member.name)}
            </span>
            <div className="min-w-0 flex-1">
              <DialogTitle className="text-lg">{member.name}</DialogTitle>
              <DialogDescription>
                {member.role} · {TYPE_LABEL[member.type] ?? 'Staff'}
              </DialogDescription>
              <span
                className={`mt-1.5 inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${statusStyle.dot}`} />
                {member.status}
              </span>
            </div>
          </div>
        </DialogHeader>

        <div className="max-h-[60vh] space-y-5 overflow-y-auto pr-1">
          <section>
            <h4 className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Professional Information
            </h4>
            <div className="grid grid-cols-1 gap-3 rounded-xl bg-slate-50 p-3.5 sm:grid-cols-2">
              <InfoRow icon={Building2} label="Department" value={member.department} />
              <InfoRow icon={Briefcase} label="Role / Specialty" value={member.role} />
              {isProfessional && (
                <>
                  <InfoRow icon={GraduationCap} label="Qualification" value={member.qualification} />
                  <InfoRow icon={Clock} label="Experience" value={member.experience} />
                  <InfoRow icon={BadgeCheck} label="License Number" value={member.licenseNumber} />
                </>
              )}
            </div>
          </section>

          <section>
            <h4 className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Duty & Schedule
            </h4>
            <div className="grid grid-cols-2 gap-3 rounded-xl bg-slate-50 p-3.5">
              <InfoRow icon={Clock} label="Working Hours" value={member.shift} />
              <div className="flex items-start gap-2.5">
                <span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${statusStyle.dot}`} />
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-slate-400">Status</p>
                  <p className="text-sm font-medium text-slate-700">{member.status}</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h4 className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Contact Information
            </h4>
            <div className="grid grid-cols-1 gap-3 rounded-xl bg-slate-50 p-3.5 sm:grid-cols-2">
              <a
                href={`mailto:${member.email}`}
                className="flex items-center gap-2.5 text-sm text-blue-600 hover:underline"
              >
                <Mail className="h-4 w-4 shrink-0" />
                <span className="truncate">{member.email}</span>
              </a>
              <a
                href={`tel:${member.phone}`}
                className="flex items-center gap-2.5 text-sm text-blue-600 hover:underline"
              >
                <Phone className="h-4 w-4 shrink-0" />
                {member.phone}
              </a>
            </div>
          </section>

          {member.type === 'nurse' && (
            <section>
              <h4 className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Assigned Patients ({assignedPatients.length})
              </h4>
              {assignedPatients.length ? (
                <ul className="space-y-1.5 rounded-xl bg-slate-50 p-3.5">
                  {assignedPatients.map((patient) => (
                    <li
                      key={patient.id}
                      className="flex items-center justify-between text-sm text-slate-700"
                    >
                      <span>{patient.name}</span>
                      <span className="text-xs text-slate-400">{patient.id}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="rounded-xl bg-slate-50 p-3.5 text-sm text-slate-400">
                  No patients assigned yet.
                </p>
              )}
            </section>
          )}

          {member.bio && (
            <section>
              <h4 className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
                About
              </h4>
              <p className="rounded-xl bg-slate-50 p-3.5 text-sm leading-relaxed text-slate-600">
                {member.bio}
              </p>
            </section>
          )}
        </div>

        <DialogFooter>
          <DialogClose render={<Button type="button" variant="outline" />}>Close</DialogClose>
          <Button type="button" onClick={() => onEdit?.(member)}>
            Edit Profile
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StaffDetailsDialog;
