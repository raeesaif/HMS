const ReportMetricCard = ({ label, value, trend, trendColor = 'text-blue-500' }) => {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.06)]">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
      <p className={`mt-2 text-sm ${trendColor}`}>{trend}</p>
    </div>
  );
};

export default ReportMetricCard;
