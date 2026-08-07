/**
 * Flags a task that needs the nurse's attention.
 * Returns an array of { severity: 'critical' | 'warning', title, description }.
 */
export function getTaskAlerts(task) {
  const alerts = [];

  if (task.priority === 'emergency') {
    alerts.push({
      severity: 'critical',
      title: 'Emergency Task',
      description: `${task.taskName} for ${task.patientName} is flagged as an emergency priority.`,
    });
  } else if (task.priority === 'high') {
    alerts.push({
      severity: 'warning',
      title: 'High Priority Task',
      description: `${task.taskName} for ${task.patientName} is a high priority task.`,
    });
  }

  if (task.status === 'overdue') {
    alerts.push({
      severity: 'critical',
      title: 'Overdue Task',
      description: `${task.taskName} was due at ${task.dueTime} and has not been completed.`,
    });
  } else if (task.dueSoon && task.status !== 'completed') {
    alerts.push({
      severity: 'warning',
      title: 'Task Due in 15 Minutes',
      description: `${task.taskName} for ${task.patientName} is due at ${task.dueTime}.`,
    });
  }

  return alerts;
}
