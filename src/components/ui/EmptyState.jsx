
function EmptyState({
  title = "Nothing here yet",
  message = "There is no data to display.",
  action
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-white px-6 py-12 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-100 text-2xl">
        —
      </div>

      <h3 className="mt-4 text-lg font-semibold text-zinc-800">
        {title}
      </h3>

      <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-500">
        {message}
      </p>

      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export default EmptyState;
