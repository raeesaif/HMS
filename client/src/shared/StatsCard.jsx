import { TrendingDown, TrendingUp } from 'lucide-react';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const colorMap = {
  green: {
    border: 'border-green-200',
    bg: 'bg-green-100',
    text: 'text-green-600',
  },
  blue: { border: 'border-blue-200', bg: 'bg-blue-100', text: 'text-blue-600' },
  red: { border: 'border-red-200', bg: 'bg-red-100', text: 'text-red-600' },
  yellow: {
    border: 'border-yellow-200',
    bg: 'bg-yellow-100',
    text: 'text-yellow-600',
  },
  purple: {
    border: 'border-purple-200',
    bg: 'bg-purple-100',
    text: 'text-purple-600',
  },
  pink: { border: 'border-pink-200', bg: 'bg-pink-100', text: 'text-pink-600' },
  gray: { border: 'border-gray-200', bg: 'bg-gray-100', text: 'text-gray-600' },
  cyan: { border: 'border-cyan-200', bg: 'bg-cyan-100', text: 'text-cyan-600' },
};

const StateCard = ({
  title = '',
  icon,
  color = 'gray',
  value = '',
  description = '',
  trend,
  comparison,
}) => {
  const c = colorMap[color] ?? colorMap.gray;
  const isDown = trend?.direction === 'down';
  return (
    <Card
      className={`border ${c.border} rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-gray-400">{title}</CardTitle>
          <span className="text-2xl font-bold">{value}</span>
          {description && (
            <CardDescription className={`mt-1 ${c.text}`}>
              {description}
            </CardDescription>
          )}
          {trend && (
            <div className="mt-1.5 flex items-center gap-1.5 text-xs">
              <span className={`inline-flex items-center gap-0.5 font-medium ${isDown ? 'text-rose-600' : 'text-emerald-600'}`}>
                {isDown ? <TrendingDown className="size-3.5" /> : <TrendingUp className="size-3.5" />}
                {trend.value}
              </span>
              {comparison && <span className="text-slate-400">{comparison}</span>}
            </div>
          )}
        </div>
        <div className={`py-3 px-3 rounded-lg ${c.bg} ${c.text} text-xl`}>
          {icon}
        </div>
      </CardHeader>
    </Card>
  );
};

export default StateCard;
