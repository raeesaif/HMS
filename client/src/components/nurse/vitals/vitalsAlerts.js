const parseSystolic = (bp) => Number(bp?.split('/')[0]);
const parseDiastolic = (bp) => Number(bp?.split('/')[1]);
const parseNumber = (value) => Number(String(value ?? '').replace(/[^\d.]/g, ''));

/**
 * Flags vitals that fall outside normal clinical ranges.
 * Returns an array of { severity: 'critical' | 'warning', title, description }.
 */
export function getVitalAlerts(vitals) {
  if (!vitals) return [];

  const alerts = [];
  const systolic = parseSystolic(vitals.bp);
  const diastolic = parseDiastolic(vitals.bp);
  const heartRate = parseNumber(vitals.hr);
  const temperature = parseNumber(vitals.temp);
  const respiratoryRate = parseNumber(vitals.rr);
  const oxygenSaturation = parseNumber(vitals.spo2);

  if (systolic >= 140 || diastolic >= 90) {
    alerts.push({
      severity: 'critical',
      title: 'Blood Pressure too High',
      description: `Reading of ${vitals.bp} is above the normal range (120/80).`,
    });
  } else if (systolic > 0 && systolic < 90) {
    alerts.push({
      severity: 'warning',
      title: 'Blood Pressure too Low',
      description: `Reading of ${vitals.bp} is below the normal range (120/80).`,
    });
  }

  if (heartRate > 100) {
    alerts.push({
      severity: 'warning',
      title: 'Heart Rate too High',
      description: `${vitals.hr} exceeds the normal resting range (60-100 bpm).`,
    });
  } else if (heartRate > 0 && heartRate < 60) {
    alerts.push({
      severity: 'warning',
      title: 'Heart Rate too Low',
      description: `${vitals.hr} is below the normal resting range (60-100 bpm).`,
    });
  }

  if (temperature >= 100.4) {
    alerts.push({
      severity: 'critical',
      title: 'High Fever',
      description: `Temperature of ${vitals.temp} indicates a fever.`,
    });
  } else if (temperature > 0 && temperature < 95) {
    alerts.push({
      severity: 'warning',
      title: 'Low Body Temperature',
      description: `Temperature of ${vitals.temp} is below normal.`,
    });
  }

  if (oxygenSaturation > 0 && oxygenSaturation < 94) {
    alerts.push({
      severity: 'critical',
      title: 'Low Oxygen Level',
      description: `SpO2 of ${vitals.spo2} is below the safe threshold (94%).`,
    });
  }

  if (respiratoryRate > 20) {
    alerts.push({
      severity: 'warning',
      title: 'Elevated Respiratory Rate',
      description: `${vitals.rr} is above the normal range (12-20/min).`,
    });
  } else if (respiratoryRate > 0 && respiratoryRate < 12) {
    alerts.push({
      severity: 'warning',
      title: 'Low Respiratory Rate',
      description: `${vitals.rr} is below the normal range (12-20/min).`,
    });
  }

  return alerts;
}
