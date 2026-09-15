const generateTimeSlots = (
  shiftStart: string,
  shiftEnd: string,
  durationMinutes = 30
): string[] => {
  const slots: string[] = [];

  let [startHour, startMinute] = shiftStart.split(':').map(Number);
  const [endHour, endMinute] = shiftEnd.split(':').map(Number);

  const endTotalMinutes = endHour * 60 + endMinute;

  while (startHour * 60 + startMinute < endTotalMinutes) {
    const currentTotalMinutes = startHour * 60 + startMinute;
    const nextTotalMinutes = currentTotalMinutes + durationMinutes;

    if (nextTotalMinutes > endTotalMinutes) {
      break;
    }

    const currentHour = String(startHour).padStart(2, '0');
    const currentMinute = String(startMinute).padStart(2, '0');

    const nextHour = String(Math.floor(nextTotalMinutes / 60)).padStart(2, '0');
    const nextMinute = String(nextTotalMinutes % 60).padStart(2, '0');

    slots.push(`${currentHour}:${currentMinute} - ${nextHour}:${nextMinute}`);

    startHour = Math.floor(nextTotalMinutes / 60);
    startMinute = nextTotalMinutes % 60;
  }

  return slots;
};

export default generateTimeSlots;
