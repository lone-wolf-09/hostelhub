
import { useState } from "react";
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";
import Input from "../../../components/ui/Input";
import EmptyState from "../../../components/ui/EmptyState";
import NoticeDetails from "./NoticeDetails";

const notices = [
  {
    id: 1,
    title: "Hostel Maintenance Schedule",
    category: "Maintenance",
    priority: "High",
    date: "2026-10-16",
    description:
      "Electrical maintenance will take place in the hostel corridors. Please cooperate with the maintenance staff.",
    audience: "All Students",
  },
  {
    id: 2,
    title: "Mess Committee Meeting",
    category: "Mess",
    priority: "Medium",
    date: "2026-10-15",
    description:
      "Students can share their food suggestions and concerns during the mess committee meeting.",
    audience: "All Students",
  },
  {
    id: 3,
    title: "Room Inspection Notice",
    category: "Discipline",
    priority: "High",
    date: "2026-10-14",
    description:
      "Routine room inspections will be conducted. Keep your room clean and follow hostel guidelines.",
    audience: "All Students",
  },
  {
    id: 4,
    title: "Sports Equipment Availability",
    category: "General",
    priority: "Low",
    date: "2026-10-12",
    description:
      "Students can contact the hostel office for information about available sports equipment.",
    audience: "All Students",
  },
];

const priorityOrder = { High: 1, Medium: 2, Low: 3 };

function StudentNotices() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedNotice, setSelectedNotice] = useState(null);

  const filteredNotices = notices
    .filter((notice) => {
      const matchesSearch =
        notice.title.toLowerCase().includes(search.toLowerCase()) ||
        notice.description.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || notice.category === category;

      return matchesSearch && matchesCategory;
    })
    .sort(
      (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
    );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Notices</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Stay updated with important hostel announcements.
        </p>
      </div>

      <Card>
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="Search notices"
            value={search}
            onChange={setSearch}
            placeholder="Search by title or description"
          />

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700">
              Category
            </label>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 outline-none focus:border-zinc-500"
            >
              <option value="All">All Categories</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Mess">Mess</option>
              <option value="Discipline">Discipline</option>
              <option value="General">General</option>
            </select>
          </div>
        </div>
      </Card>

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-zinc-900">
          All Announcements
        </h2>
        <span className="text-sm text-zinc-500">
          {filteredNotices.length} notices
        </span>
      </div>

      {filteredNotices.length === 0 ? (
        <EmptyState
          title="No notices found"
          message="Try changing your search or category filter."
        />
      ) : (
        <div className="space-y-4">
          {filteredNotices.map((notice) => (
            <Card key={notice.id}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <Badge
                      variant={
                        notice.priority === "High"
                          ? "danger"
                          : notice.priority === "Medium"
                            ? "warning"
                            : "info"
                      }
                    >
                      {notice.priority} Priority
                    </Badge>
                    <Badge variant="default">{notice.category}</Badge>
                  </div>

                  <h3 className="text-lg font-semibold text-zinc-900">
                    {notice.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-zinc-600">
                    {notice.description}
                  </p>

                  <p className="mt-3 text-xs text-zinc-500">
                    Published: {notice.date} · {notice.audience}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedNotice(notice)}
                  className="shrink-0 rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-100"
                >
                  Read Details
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {selectedNotice && (
        <NoticeDetails
          notice={selectedNotice}
          onClose={() => setSelectedNotice(null)}
        />
      )}
    </div>
  );
}

export default StudentNotices;
