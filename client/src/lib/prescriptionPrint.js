import { getPatientById } from '@/data/doctorPatients';
import { doctorProfile } from '@/data/doctor';

export function buildPrescriptionText(prescription) {
  const patient = getPatientById(prescription.patientId);

  const lines = [
    'MediCore Hospital',
    '--------------------------------',
    `Prescription ID: ${prescription.id}`,
    `Date: ${prescription.date}`,
    '',
    `Doctor: ${prescription.finalizedBy || prescription.createdBy}`,
    `Department: ${doctorProfile.department}`,
    '',
    `Patient: ${patient?.name ?? 'Unknown'} (${prescription.patientId})`,
    `Age / Gender: ${patient?.age ?? '—'} / ${patient?.gender ?? '—'}`,
    `Diagnosis: ${prescription.diagnosis || '—'}`,
    `Allergies: ${patient?.allergies?.length ? patient.allergies.join(', ') : 'None known'}`,
    '',
    'Medications:',
    ...(prescription.medicines.length
      ? prescription.medicines.map(
          (med, index) =>
            `  ${index + 1}. ${med.name}${med.strength ? ` ${med.strength}` : ''} — ${med.dosage}, ${med.frequency}, ${
              med.route || 'Oral'
            }, ${med.duration}${med.specialInstructions ? ` (${med.specialInstructions})` : ''}`
        )
      : ['  No medicines recorded']),
    '',
    prescription.clinicalNotes ? `Doctor Notes: ${prescription.clinicalNotes}` : null,
    prescription.followUpRequired ? `Follow-up Date: ${prescription.followUpDate || 'TBD'}` : null,
    prescription.followUpRequired && prescription.followUpInstructions
      ? `Follow-up Instructions: ${prescription.followUpInstructions}`
      : null,
  ].filter((line) => line !== null);

  return lines.join('\n');
}

export function printPrescription(prescription) {
  const text = buildPrescriptionText(prescription);
  const printWindow = window.open('', '_blank', 'width=700,height=900');
  if (!printWindow) return;
  printWindow.document.write(
    `<title>${prescription.id}</title><pre style="font-family: ui-monospace, monospace; font-size: 13px; white-space: pre-wrap; padding: 24px;">${text.replace(
      /</g,
      '&lt;'
    )}</pre>`
  );
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
}

export function downloadPrescription(prescription) {
  const text = buildPrescriptionText(prescription);
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${prescription.id}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
