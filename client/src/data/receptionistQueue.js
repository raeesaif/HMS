export const queueStatusOptions = ['Waiting', 'Called', 'With Doctor', 'Completed', 'Cancelled'];
export const queuePriorityOptions = ['Normal', 'Urgent', 'Emergency'];

export const queue = [
  { id: 'Q-101', queueNumber: 'Q-101', patientId: 'PT-1042', patientName: 'Ali Ahmed', doctorId: 'DR-1024', doctorName: 'Dr. Sarah Mitchell', appointmentId: 'APT-5001', arrivalTime: '08:52 AM', waitingMinutes: 0, priority: 'Normal', status: 'Completed' },
  { id: 'Q-102', queueNumber: 'Q-102', patientId: 'PT-1088', patientName: 'Fatima Noor', doctorId: 'DR-1024', doctorName: 'Dr. Sarah Mitchell', appointmentId: 'APT-5002', arrivalTime: '09:20 AM', waitingMinutes: 5, priority: 'Normal', status: 'With Doctor' },
  { id: 'Q-103', queueNumber: 'Q-103', patientId: 'PT-1121', patientName: 'Bilal Khan', doctorId: 'DR-1035', doctorName: 'Dr. Imran Qureshi', appointmentId: 'APT-5003', arrivalTime: '09:45 AM', waitingMinutes: 22, priority: 'Normal', status: 'Waiting' },
  { id: 'Q-104', queueNumber: 'Q-104', patientId: 'PT-1177', patientName: 'Usman Tariq', doctorId: 'DR-1052', doctorName: 'Dr. Bilal Siddiqui', appointmentId: 'APT-5005', arrivalTime: '10:05 AM', waitingMinutes: 41, priority: 'Urgent', status: 'Waiting' },
  { id: 'Q-105', queueNumber: 'Q-105', patientId: 'PT-0921', patientName: 'Kamran Ali', doctorId: 'DR-1093', doctorName: 'Dr. Kamran Ali', appointmentId: 'APT-5007', arrivalTime: '10:12 AM', waitingMinutes: 12, priority: 'Emergency', status: 'Called' },
];

export function getQueueSummary(list) {
  const waiting = list.filter((entry) => entry.status === 'Waiting' || entry.status === 'Called');
  const avg = waiting.length
    ? Math.round(waiting.reduce((sum, entry) => sum + entry.waitingMinutes, 0) / waiting.length)
    : 0;
  const longest = waiting.reduce((max, entry) => (entry.waitingMinutes > (max?.waitingMinutes ?? -1) ? entry : max), null);
  return { waitingCount: waiting.length, averageWaitMinutes: avg, longestWaitingPatient: longest };
}
