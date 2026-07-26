export const CALENDAR_MONTH = { year: 2026, month: 6 }; // July (0-indexed)

export const calendarEvents = {
  3: [{ time: '09:30', label: 'A. Owusu · Cardio', color: 'green' }],
  5: [
    { time: '10:15', label: 'Y. Serwaa · Pedia', color: 'orange' },
    { time: '14:00', label: 'K. Antwi · Neuro', color: 'red' },
  ],
  8: [{ time: '11:00', label: 'E. Baidoo · OB', color: 'green' }],
  12: [
    { time: '08:45', label: 'K. Duah · Neuro', color: 'red' },
    { time: '13:20', label: 'N. Asare · Onco', color: 'orange' },
  ],
  14: [
    { time: '10:00', label: 'A. Frimpong · Cardio', color: 'green' },
    { time: '15:30', label: 'K. Mensah · Ortho', color: 'green' },
  ],
  18: [{ time: '09:00', label: 'Consultation clinic', color: 'blue' }],
  22: [{ time: '07:30', label: 'Surgery – Room 2', color: 'red' }],
  25: [{ time: '08:00', label: 'Vaccination day', color: 'blue' }],
};

export const todaysAppointments = [
  {
    time: '09:30',
    patient: 'Ama Owusu',
    doctor: 'Dr. Boateng',
    department: 'Cardiology',
    status: 'Confirmed',
  },
  {
    time: '10:15',
    patient: 'Kwesi Mensah',
    doctor: 'Dr. Adjei',
    department: 'Orthopedic',
    status: 'Pending',
  },
  {
    time: '11:00',
    patient: 'Yaa Serwaa',
    doctor: 'Dr. Osei',
    department: 'Pediatric',
    status: 'Confirmed',
  },
  {
    time: '13:20',
    patient: 'Nana Asare',
    doctor: 'Dr. Danso',
    department: 'Oncology',
    status: 'Pending',
  },
  {
    time: '14:00',
    patient: 'Kojo Antwi',
    doctor: 'Dr. Sarpong',
    department: 'Neurology',
    status: 'Urgent',
  },
  {
    time: '15:30',
    patient: 'Adjoa Frimpong',
    doctor: 'Dr. Boateng',
    department: 'Cardiology',
    status: 'Confirmed',
  },
];
