export const REPORT_PERIODS = [
  'Last 7 months',
  'Last 3 months',
  'Last 30 days',
  'This year',
];

export const REPORT_METRICS = [
  {
    label: 'Avg. bed occupancy',
    value: '79%',
    trend: '+3.2% vs last quarter',
    trendColor: 'text-emerald-600',
  },
  {
    label: 'Patient satisfaction',
    value: '4.7 / 5',
    trend: '1,204 reviews',
    trendColor: 'text-blue-500',
  },
  {
    label: 'Avg. length of stay',
    value: '4.2 days',
    trend: '-0.4 days',
    trendColor: 'text-blue-500',
  },
  {
    label: 'Readmission rate',
    value: '6.8%',
    trend: '-1.1% YoY',
    trendColor: 'text-blue-500',
  },
];

export const revenueExpensesData = [
  { month: 'Jan', revenue: 280, expenses: 220 },
  { month: 'Feb', revenue: 320, expenses: 250 },
  { month: 'Mar', revenue: 360, expenses: 270 },
  { month: 'Apr', revenue: 400, expenses: 300 },
  { month: 'May', revenue: 430, expenses: 320 },
  { month: 'Jun', revenue: 460, expenses: 340 },
  { month: 'Jul', revenue: 500, expenses: 360 },
];

export const patientDistributionData = [
  { department: 'Cardiology', value: 320, color: '#0077B6' },
  { department: 'Pediatric', value: 240, color: '#29B6E8' },
  { department: 'Neurology', value: 190, color: '#22C55E' },
  { department: 'Oncology', value: 160, color: '#F97316' },
  { department: 'ER', value: 150, color: '#EF4444' },
];

export const bedOccupancyData = [
  { week: 'Wk 1', occupancy: 72 },
  { week: 'Wk 2', occupancy: 78 },
  { week: 'Wk 3', occupancy: 75 },
  { week: 'Wk 4', occupancy: 82 },
  { week: 'Wk 5', occupancy: 85 },
  { week: 'Wk 6', occupancy: 80 },
  { week: 'Wk 7', occupancy: 84 },
];

export const patientOutcomesData = [
  { month: 'Mar', recovered: 220, referred: 18, mortality: 5 },
  { month: 'Apr', recovered: 245, referred: 20, mortality: 6 },
  { month: 'May', recovered: 270, referred: 22, mortality: 5 },
  { month: 'Jun', recovered: 295, referred: 24, mortality: 7 },
  { month: 'Jul', recovered: 315, referred: 25, mortality: 5 },
];
