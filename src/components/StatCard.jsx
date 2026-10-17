
function StatCard({ title, value, detail, icon, trend }) {
  return (
    <div className="rounded-2xl border border-zinc-200/70 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-zinc-500">{title}</p>
          <h3 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900">
            {value}
          </h3>
        </div>

        {icon && (
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-100 text-lg">
            {icon}
          </div>
        )}
      </div>

      {detail && (
        <p className="mt-4 text-sm text-zinc-500">{detail}</p>
      )}

      {trend && (
        <p className="mt-2 text-xs font-medium text-emerald-700">
          {trend}
        </p>
      )}
    </div>
  );
}

export default StatCard;
