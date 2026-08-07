export const nurseTasksData = [
  { title: 'Administer Paracetamol 500mg · Bed 4B-04', due: '09:30', status: 'overdue' },
  { title: 'Change IV line · Bed 4B-06', due: '09:45', status: 'soon' },
  { title: 'Record vitals · Bed 4B-09', due: '10:00', status: 'soon' },
  { title: 'Assist wound dressing · Bed 4B-12', due: '10:30', done: true },
  { title: 'Insulin 6u · Bed 4B-01', due: '11:00', status: 'scheduled' },
];

export const wardPatientVitals = [
  { name: 'Ama Owusu', bed: '4B-01', hr: '78 bpm', bp: '120/80', temp: '36.8 C', spo2: '98%' },
  {
    name: 'Kojo Antwi',
    bed: '4B-04',
    hr: '118 bpm',
    bp: '165/104',
    temp: '38.9 C',
    spo2: '91%',
    tone: 'danger',
    spo2Tone: 'warning',
  },
  {
    name: 'Yaa Serwaa',
    bed: '4B-06',
    hr: '92 bpm',
    bp: '134/86',
    temp: '37.4 C',
    spo2: '96%',
    tone: 'warning',
  },
  { name: 'Efua Baidoo', bed: '4B-09', hr: '72 bpm', bp: '118/76', temp: '36.6 C', spo2: '99%' },
  { name: 'Nana Asare', bed: '4B-12', hr: '88 bpm', bp: '128/82', temp: '37.0 C', spo2: '97%' },
];

export const shiftHandoverNotes = [
  {
    bed: 'Bed 4B-04 · Kojo Antwi',
    text: 'Elevated BP overnight. Cardiology consulted. Continue Amlodipine, monitor q2h.',
  },
  {
    bed: 'Bed 4B-06 · Yaa Serwaa',
    text: 'Post-op day 2, wound clean. Pain 4/10, PRN paracetamol given at 06:20.',
  },
];
