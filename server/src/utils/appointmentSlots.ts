const formatTime12Hour = (totalMinutes: number): string => {
  const hour24 = Math.floor(totalMinutes / 60);
  const minute = totalMinutes % 60;

  const period = hour24 >= 12 ? 'PM' : 'AM';
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;

  return `${String(hour12).padStart(2, '0')}:${String(minute).padStart(2, '0')} ${period}`;
};

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

    slots.push(
      `${formatTime12Hour(currentTotalMinutes)} - ${formatTime12Hour(nextTotalMinutes)}`
    );

    startHour = Math.floor(nextTotalMinutes / 60);
    startMinute = nextTotalMinutes % 60;
  }

  return slots;
};

export default generateTimeSlots;
