
import { useMemo, useState } from "react";
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import EmptyState from "../../../components/ui/EmptyState";
import AnnouncementEditor from "./AnnouncementEditor";

const initialAnnouncements = [
  {
    id: "ANN001",
    title: "Hostel curfew reminder",
    category: "Discipline",
    priority: "Important",
    audience: "All Students",
    description:
      "All residents are requested to return to the hostel before the prescribed curfew time.",
    publishedAt: "2026-10-15",
    expiryDate: "2026-10-31",
    status: "Published"
  },
  {
    id: "ANN002",
    title: "Water supply maintenance",
    category: "Maintenance",
    priority: "Urgent",
    audience: "Block A",
    description:
      "Water supply may be interrupted during scheduled maintenance. Please store water in advance.",
    publishedAt: "2026-10-15",
    expiryDate: "2026-10-20",
    status: "Published"
  },
  {
    id: "ANN003",
    title: "Updated weekly mess menu",
    category: "Mess",
    priority: "Normal",
    audience: "Mess Residents",
    description:
      "The updated weekly menu is available. Residents can check meal details in the Mess Menu section.",
    publishedAt: "2026-10-14",
    expiryDate: "2026-10-25",
    status: "Published"
  },
  {
    id: "ANN004",
    title: "Hostel meeting",
    category: "General",
    priority: "Important",
    audience: "All Students",
    description:
      "Residents are requested to attend the scheduled hostel meeting.",
    publishedAt: "2026-10-13",
    expiryDate: "2026-10-22",
    status: "Published"
  }
];

function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState(
    initialAnnouncements
  );
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);
  const [showEditor, setShowEditor] = useState(false);

  const filteredAnnouncements = useMemo(() => {
    return announcements
      .filter((announcement) => {
        const searchText = search.toLowerCase();

        const matchesSearch =
          announcement.title.toLowerCase().includes(searchText) ||
          announcement.description.toLowerCase().includes(searchText) ||
          announcement.category.toLowerCase().includes(searchText);

        const matchesPriority =
          priorityFilter === "All" ||
          announcement.priority === priorityFilter;

        const matchesCategory =
          categoryFilter === "All" ||
          announcement.category === categoryFilter;

        return matchesSearch && matchesPriority && matchesCategory;
      })
      .sort((a, b) => {
        const priorityOrder = {
          Urgent: 0,
          Important: 1,
          Normal: 2
        };

        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
  }, [announcements, search, priorityFilter, categoryFilter]);

  function saveAnnouncement(updatedAnnouncement) {
    setAnnouncements((current) => {
      const exists = current.some(
        (item) => item.id === updatedAnnouncement.id
      );

      if (exists) {
        return current.map((item) =>
          item.id === updatedAnnouncement.id
            ? updatedAnnouncement
            : item
        );
      }

      return [updatedAnnouncement, ...current];
    });

    setShowEditor(false);
    setEditingAnnouncement(null);
  }

  function deleteAnnouncement(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this announcement?"
    );

    if (!confirmed) {
      return;
    }

    setAnnouncements((current) =>
      current.filter((item) => item.id !== id)
    );
  }

  const urgentCount = announcements.filter(
    (item) => item.priority === "Urgent"
  ).length;

  const importantCount = announcements.filter(
    (item) => item.priority === "Important"
  ).length;

  const priorityVariant = {
    Urgent: "danger",
    Important: "warning",
    Normal: "default"
  };

  const categoryVariant = {
    Emergency: "danger",
    Maintenance: "warning",
    Mess: "success",
    Discipline: "info",
    Event: "info",
    General: "default"
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <p className="mb-1 text-sm text-zinc-500">
            Hostel Management / Announcements
          </p>

          <h1 className="text-2xl font-semibold tracking-tight">
            Noticeboard
          </h1>

          <p className="mt-1 text-sm text-zinc-500">
            Publish notices and keep residents informed.
          </p>
        </div>

        <Button
          onClick={() => {
            setEditingAnnouncement(null);
            setShowEditor(true);
          }}
        >
          + Create Announcement
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <p className="text-sm text-zinc-500">Total Announcements</p>
          <p className="mt-2 text-3xl font-semibold">
            {announcements.length}
          </p>
        </Card>

        <Card>
          <p className="text-sm text-zinc-500">Urgent Notices</p>
          <p className="mt-2 text-3xl font-semibold text-red-600">
            {urgentCount}
          </p>
        </Card>

        <Card>
          <p className="text-sm text-zinc-500">Important Notices</p>
          <p className="mt-2 text-3xl font-semibold">
            {importantCount}
          </p>
        </Card>
      </div>

      {showEditor && (
        <AnnouncementEditor
          announcement={editingAnnouncement}
          onSave={saveAnnouncement}
          onCancel={() => {
            setShowEditor(false);
            setEditingAnnouncement(null);
          }}
        />
      )}

      <Card>
        <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-3">
          <Input
            label="Search notices"
            value={search}
            onChange={setSearch}
            placeholder="Search by title or description..."
          />

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700">
              Priority
            </label>

            <select
              value={priorityFilter}
              onChange={(event) => setPriorityFilter(event.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm"
            >
              <option>All</option>
              <option>Urgent</option>
              <option>Important</option>
              <option>Normal</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700">
              Category
            </label>

            <select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm"
            >
              <option>All</option>
              <option>General</option>
              <option>Maintenance</option>
              <option>Mess</option>
              <option>Discipline</option>
              <option>Event</option>
              <option>Emergency</option>
            </select>
          </div>
        </div>

        {filteredAnnouncements.length === 0 ? (
          <EmptyState
            title="No announcements found"
            message="Try a different search or filter."
          />
        ) : (
          <div className="space-y-4">
            {filteredAnnouncements.map((announcement) => (
              <div
                key={announcement.id}
                className={`rounded-2xl border p-5 ${
                  announcement.priority === "Urgent"
                    ? "border-red-200 bg-red-50/40"
                    : announcement.priority === "Important"
                    ? "border-amber-200 bg-amber-50/30"
                    : "border-zinc-200 bg-white"
                }`}
              >
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                  <div className="flex-1">
                    <div className="mb-3 flex flex-wrap gap-2">
                      <Badge
                        variant={priorityVariant[announcement.priority]}
                      >
                        {announcement.priority === "Urgent" ? "⚠ " : ""}
                        {announcement.priority}
                      </Badge>

                      <Badge
                        variant={categoryVariant[announcement.category]}
                      >
                        {announcement.category}
                      </Badge>

                      <Badge>{announcement.audience}</Badge>
                    </div>

                    <h2 className="text-lg font-semibold text-zinc-900">
                      {announcement.title}
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-zinc-600">
                      {announcement.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-zinc-500">
                      <span>
                        Published: {announcement.publishedAt}
                      </span>

                      <span>
                        Expires: {announcement.expiryDate || "No expiry"}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 sm:flex-col">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setEditingAnnouncement(announcement);
                        setShowEditor(true);
                      }}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="danger"
                      onClick={() => deleteAnnouncement(announcement.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

export default AnnouncementsPage;
