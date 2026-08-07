const ALMOST_FULL_THRESHOLD = 0.8;
const isOccupiedLike = (bed) => bed.status === 'occupied' || bed.status === 'isolation';

/**
 * Computes ward-wide and bed-specific alerts from the full bed roster.
 * Returns an array of { severity: 'critical' | 'warning', title, description }.
 */
export function getBedAlerts(beds) {
  const alerts = [];
  const wards = [...new Set(beds.map((bed) => bed.ward))];

  wards.forEach((ward) => {
    const wardBeds = beds.filter((bed) => bed.ward === ward);
    const occupied = wardBeds.filter(isOccupiedLike).length;
    const occupancy = occupied / wardBeds.length;

    if (occupancy >= 1) {
      alerts.push({
        severity: 'critical',
        title: 'Ward Full',
        description: `${ward} has no available beds (${occupied}/${wardBeds.length} occupied).`,
      });
    } else if (ward === 'ICU' && occupancy >= ALMOST_FULL_THRESHOLD) {
      alerts.push({
        severity: 'warning',
        title: 'ICU Almost Full',
        description: `ICU is at ${Math.round(occupancy * 100)}% capacity (${occupied}/${wardBeds.length} beds occupied).`,
      });
    } else if (occupancy >= ALMOST_FULL_THRESHOLD) {
      alerts.push({
        severity: 'warning',
        title: 'Ward Almost Full',
        description: `${ward} is at ${Math.round(occupancy * 100)}% capacity (${occupied}/${wardBeds.length} beds occupied).`,
      });
    }
  });

  const isolationBeds = beds.filter((bed) => bed.status === 'isolation');
  if (isolationBeds.length > 0) {
    alerts.push({
      severity: 'critical',
      title: 'Patient Needs Isolation',
      description: `${isolationBeds.length} bed${isolationBeds.length > 1 ? 's' : ''} on isolation precautions: ${isolationBeds
        .map((bed) => bed.bedNumber)
        .join(', ')}.`,
    });
  }

  const cleaningBeds = beds.filter((bed) => bed.status === 'cleaning');
  if (cleaningBeds.length > 0) {
    alerts.push({
      severity: 'warning',
      title: 'Bed Requires Cleaning',
      description: `${cleaningBeds.length} bed${cleaningBeds.length > 1 ? 's' : ''} awaiting cleaning: ${cleaningBeds
        .map((bed) => bed.bedNumber)
        .join(', ')}.`,
    });
  }

  return alerts;
}
