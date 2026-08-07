// Known cross-reactivity: an allergy to the key ingredient also risks a reaction
// to medicines containing any of the associated keywords.
const CROSS_REACTIVITY = {
  penicillin: ['ceftriaxone', 'cephalosporin', 'amoxicillin'],
  sulfa: ['sulfamethoxazole', 'sulfasalazine'],
};

const isOverdue = (record) => record.status === 'delayed';
const isMissed = (record) => record.status === 'missed';

function getAllergyMatch(record) {
  const drugText = `${record.medicineName} ${record.genericName}`.toLowerCase();
  return record.allergies.find((allergy) => {
    const allergyKey = allergy.toLowerCase();
    if (drugText.includes(allergyKey.split(' ')[0])) return true;
    const crossReactiveTerms = Object.entries(CROSS_REACTIVITY).find(([key]) => allergyKey.includes(key))?.[1] ?? [];
    return crossReactiveTerms.some((term) => drugText.includes(term));
  });
}

/**
 * Flags a scheduled medication that needs the nurse's attention.
 * Returns an array of { severity: 'critical' | 'warning', title, description }.
 */
export function getMedicationAlerts(record) {
  const alerts = [];

  if (isMissed(record)) {
    alerts.push({
      severity: 'critical',
      title: 'Missed Dose',
      description: `${record.medicineName} (${record.dosage}) scheduled for ${record.scheduledTime} was not administered.`,
    });
  }

  if (isOverdue(record)) {
    alerts.push({
      severity: 'warning',
      title: 'Medication Overdue',
      description: `${record.medicineName} was due at ${record.scheduledTime} and has not yet been given.`,
    });
  }

  const allergyMatch = getAllergyMatch(record);
  if (allergyMatch) {
    alerts.push({
      severity: 'critical',
      title: 'Drug Allergy Warning',
      description: `Patient has a documented ${allergyMatch} allergy — verify before administering ${record.medicineName}.`,
    });
  }

  if (record.isHighRisk) {
    alerts.push({
      severity: 'warning',
      title: 'High-Risk Medication',
      description: `${record.medicineName} requires an independent double-check before administration.`,
    });
  }

  return alerts;
}
