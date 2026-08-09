const palette = [
  'bg-sky-100 text-sky-600',
  'bg-violet-100 text-violet-600',
  'bg-emerald-100 text-emerald-600',
  'bg-amber-100 text-amber-600',
  'bg-rose-100 text-rose-600',
];

function toneFor(seed = '') {
  const code = seed.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return palette[code % palette.length];
}

export function PatientAvatar({ name = '', size = 'size-9', className = '' }) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');

  return (
    <span className={`flex ${size} shrink-0 items-center justify-center rounded-full text-xs font-semibold ${toneFor(name)} ${className}`}>
      {initials || '?'}
    </span>
  );
}
