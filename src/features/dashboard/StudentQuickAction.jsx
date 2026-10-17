
function StudentQuickAction({ icon, title, description, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-start gap-3 rounded-2xl border border-zinc-200 bg-white p-4 text-left transition hover:border-zinc-400 hover:shadow-sm"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-100 text-xl">
        {icon}
      </span>

      <span className="flex-1">
        <span className="block font-medium text-zinc-900">
          {title}
        </span>

        <span className="mt-1 block text-sm leading-5 text-zinc-500">
          {description}
        </span>
      </span>

      <span className="text-lg text-zinc-400">↗</span>
    </button>
  );
}

export default StudentQuickAction;
