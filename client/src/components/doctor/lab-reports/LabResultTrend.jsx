import { Minus, TrendingDown, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function parseNumeric(value) {
  const num = Number.parseFloat(value);
  return Number.isFinite(num) ? num : null;
}

function buildTrends(currentReport, patientReports) {
  const priorReports = patientReports
    .filter(
      (report) =>
        report.id !== currentReport.id &&
        report.isoRequestedDate < currentReport.isoRequestedDate &&
        report.results.length > 0
    )
    .sort((a, b) => new Date(b.isoRequestedDate) - new Date(a.isoRequestedDate));

  const trends = [];
  currentReport.results.forEach((currentResult) => {
    for (const priorReport of priorReports) {
      const priorResult = priorReport.results.find((result) => result.test === currentResult.test);
      if (priorResult) {
        const prevNum = parseNumeric(priorResult.result);
        const currNum = parseNumeric(currentResult.result);
        let direction = 'flat';
        if (prevNum !== null && currNum !== null) {
          if (currNum > prevNum) direction = 'up';
          else if (currNum < prevNum) direction = 'down';
        }
        trends.push({
          test: currentResult.test,
          previousResult: priorResult.result,
          currentResult: currentResult.result,
          unit: currentResult.unit,
          date: priorReport.reportDate || priorReport.requestedDate,
          direction,
        });
        break;
      }
    }
  });
  return trends;
}

const trendIcons = { up: TrendingUp, down: TrendingDown, flat: Minus };

export function LabResultTrend({ currentReport, patientReports }) {
  const trends = buildTrends(currentReport, patientReports);

  if (trends.length === 0) return null;

  return (
    <Card className="rounded-xl border-border shadow-sm">
      <CardHeader className="pb-0">
        <CardTitle className="text-sm font-semibold">Result Trend</CardTitle>
        <p className="text-xs text-slate-500">Comparison with the most recent previous result</p>
      </CardHeader>
      <CardContent className="space-y-2 pt-3">
        {trends.map((trend) => {
          const Icon = trendIcons[trend.direction];
          return (
            <div key={trend.test} className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2">
              <div>
                <p className="text-sm font-medium text-slate-900">{trend.test}</p>
                <p className="text-xs text-slate-500">
                  Previous ({trend.date}): {trend.previousResult} {trend.unit}
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-900">
                <Icon className="size-4 text-slate-400" />
                {trend.currentResult} {trend.unit}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
