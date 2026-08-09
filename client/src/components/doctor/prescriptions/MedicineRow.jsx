export function MedicineRow({ medicine, index }) {
  return (
    <div className="rounded-lg border border-slate-200 px-3 py-2.5">
      <div className="flex items-baseline justify-between gap-2">
        <p className="text-sm font-medium text-slate-900">
          {index != null && <span className="text-slate-400">{index + 1}.</span>} {medicine.name}
          {medicine.strength && <span className="text-slate-500"> · {medicine.strength}</span>}
        </p>
        {medicine.form && <span className="text-xs text-slate-500">{medicine.form}</span>}
      </div>
      <p className="mt-1 text-xs text-slate-500">
        {medicine.dosage} · {medicine.frequency} · {medicine.route} · {medicine.duration}
      </p>
      {(medicine.specialInstructions || medicine.beforeAfterFood) && (
        <p className="mt-1 text-xs text-slate-500">
          {[medicine.beforeAfterFood, medicine.specialInstructions].filter(Boolean).join(' · ')}
        </p>
      )}
      {medicine.notes && <p className="mt-1 text-xs italic text-slate-400">{medicine.notes}</p>}
    </div>
  );
}
