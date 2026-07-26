const assignBeds = (segments) => {
  let bedNumber = 1;
  const beds = [];
  segments.forEach(({ status, count }) => {
    for (let i = 0; i < count; i += 1) {
      beds.push({ number: bedNumber, status });
      bedNumber += 1;
    }
  });
  return beds;
};

export const wardsData = [
  {
    id: 'general-a',
    name: 'General Ward A',
    beds: assignBeds([
      { status: 'available', count: 8 },
      { status: 'occupied', count: 10 },
      { status: 'reserved', count: 2 },
    ]),
  },
  {
    id: 'general-b',
    name: 'General Ward B',
    beds: assignBeds([
      { status: 'available', count: 5 },
      { status: 'occupied', count: 12 },
      { status: 'reserved', count: 3 },
    ]),
  },
  {
    id: 'icu',
    name: 'ICU',
    beds: assignBeds([
      { status: 'available', count: 2 },
      { status: 'occupied', count: 6 },
      { status: 'reserved', count: 1 },
      { status: 'critical', count: 3 },
    ]),
  },
  {
    id: 'maternity',
    name: 'Maternity',
    beds: assignBeds([
      { status: 'available', count: 6 },
      { status: 'occupied', count: 8 },
      { status: 'reserved', count: 2 },
    ]),
  },
  {
    id: 'pediatric',
    name: 'Pediatric',
    beds: assignBeds([
      { status: 'available', count: 7 },
      { status: 'occupied', count: 5 },
      { status: 'reserved', count: 2 },
    ]),
  },
  {
    id: 'post-op',
    name: 'Post-op',
    beds: assignBeds([
      { status: 'available', count: 4 },
      { status: 'occupied', count: 4 },
      { status: 'reserved', count: 1 },
      { status: 'critical', count: 1 },
    ]),
  },
];
