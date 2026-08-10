import { patientProfile } from '@/data/patient';

export function buildPrescriptionText(prescription) {
  const lines = [
    'MediCore Hospital',
    '--------------------------------',
    `Prescription ID: ${prescription.id}`,
    `Issued Date: ${prescription.issuedDate}`,
    '',
    `Doctor: ${prescription.doctorName}`,
    `Patient: ${patientProfile.name} (${patientProfile.id})`,
    '',
    `Medicine: ${prescription.medicine} ${prescription.strength}`,
    `Dosage: ${prescription.dosage}`,
    `Frequency: ${prescription.frequency}`,
    `Duration: ${prescription.duration}`,
    `Start Date: ${prescription.startDate}`,
    `End Date: ${prescription.endDate}`,
    prescription.instructions ? `Instructions: ${prescription.instructions}` : null,
  ].filter((line) => line !== null);

  return lines.join('\n');
}

export function printPrescription(prescription) {
  const text = buildPrescriptionText(prescription);
  const printWindow = window.open('', '_blank', 'width=700,height=900');
  if (!printWindow) return;
  printWindow.document.write(
    `<title>${prescription.id}</title><pre style="font-family: ui-monospace, monospace; font-size: 13px; white-space: pre-wrap; padding: 24px;">${text.replace(/</g, '&lt;')}</pre>`
  );
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
}
