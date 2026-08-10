import { patientProfile } from '@/data/patient';

export function buildLabReportText(report) {
  const lines = [
    'MediCore Hospital',
    '--------------------------------',
    `Report ID: ${report.id}`,
    `Test: ${report.testName}`,
    `Lab Department: ${report.labDepartment}`,
    `Ordered By: ${report.orderedBy}`,
    `Patient: ${patientProfile.name} (${patientProfile.id})`,
    `Sample Date: ${report.sampleDate}`,
    `Report Date: ${report.reportDate ?? 'Pending'}`,
    '',
    'Result:',
    ...(report.result.length
      ? report.result.map((row) => `  ${row.parameter}: ${row.value} (Reference: ${row.referenceRange})`)
      : ['  Report is still being processed.']),
    report.notes ? `\nNotes: ${report.notes}` : null,
  ].filter((line) => line !== null);

  return lines.join('\n');
}

export function printLabReport(report) {
  const text = buildLabReportText(report);
  const printWindow = window.open('', '_blank', 'width=700,height=900');
  if (!printWindow) return;
  printWindow.document.write(
    `<title>${report.id}</title><pre style="font-family: ui-monospace, monospace; font-size: 13px; white-space: pre-wrap; padding: 24px;">${text.replace(/</g, '&lt;')}</pre>`
  );
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
}

export function downloadLabReport(report) {
  const text = buildLabReportText(report);
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${report.id}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
