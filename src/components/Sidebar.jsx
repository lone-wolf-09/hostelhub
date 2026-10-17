
const adminLinks = [
  "Overview",
  "Students",
  "Rooms",
  "Complaints",
  "Mess Menu",
  "Announcements",
  "Broken Property"
];

const studentLinks = [
  "Dashboard",
  "My Room",
  "Complaint Box",
  "Mess Menu",
  "Notices",
  "Important Contacts"
];

function Sidebar({ role, activePage, onNavigate }) {
  const links = role === "admin" ? adminLinks : studentLinks;

  return (
    <aside className="flex min-h-full w-full flex-col rounded-2xl bg-zinc-900 p-5 text-white lg:w-64">
      <div className="mb-8 flex items-center gap-3 px-2 pt-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-200 font-bold text-zinc-900">
          H
        </div>

        <div>
          <h2 className="text-lg font-bold">HostelHub</h2>
          <p className="text-xs text-zinc-400">Your hostel, simplified</p>
        </div>
      </div>

      <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-zinc-500">
        {role} Panel
      </p>

      <nav className="flex flex-col gap-2">
        {links.map((link) => (
          <button
            key={link}
            onClick={() => onNavigate(link)}
            className={`rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
              activePage === link
                ? "bg-white text-zinc-900"
                : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
            }`}
          >
            {link}
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-8">
        <p className="px-3 text-xs text-zinc-500">
          HostelHub · Pixel Wizard
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;
