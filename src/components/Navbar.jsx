function Navbar({ role, page, userName, onRoleChange }) {
  return (
    <header className="mb-6 flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm text-zinc-500">
          HostelHub / {role === "admin" ? "Admin" : "Student"}
        </p>
        <h1 className="mt-1 text-2xl font-bold text-zinc-900">
          {page}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <select
          value={role}
          onChange={(event) => onRoleChange(event.target.value)}
          className="rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-800 outline-none focus:border-lime-500"
        >
          <option value="student">Student Portal</option>
          <option value="admin">Admin Panel</option>
        </select>

        <div className="hidden text-right sm:block">
          <p className="text-sm font-semibold text-zinc-900">
            {userName}
          </p>
          <p className="text-xs text-zinc-500">
            {role === "admin" ? "Administrator" : "Resident"}
          </p>
        </div>
      </div>
    </header>
  );
}

export default Navbar;