
import { useMemo, useState } from "react";
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import EmptyState from "../../../components/ui/EmptyState";
import ComplaintForm from "./ComplaintForm";

const initialComplaints = [
  {
    id: "CMP101",
    title: "Ceiling fan making noise",
    category: "Electrical",
    priority: "Medium",
    description: "The fan makes a loud noise when running.",
    status: "In Progress",
    createdAt: "2026-10-15"
  },
  {
    id: "CMP102",
    title: "Bathroom cleanliness",
    category: "Bathroom Cleanliness",
    priority: "High",
    description: "The shared bathroom needs cleaning.",
    status: "Pending",
    createdAt: "2026-10-16"
  },
  {
    id: "CMP103",
    title: "Broken study chair",
    category: "Furniture",
    priority: "Low",
    description: "The chair has a loose leg.",
    status: "Resolved",
    createdAt: "2026-10-12"
  }
];

function ComplaintBox() {
  const [complaints, setComplaints] = useState(initialComplaints);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const filteredComplaints = useMemo(() => {
    return complaints.filter((complaint) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        complaint.title.toLowerCase().includes(searchText) ||
        complaint.id.toLowerCase().includes(searchText) ||
        complaint.category.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All" ||
        complaint.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [complaints, search, statusFilter]);

  function submitComplaint(newComplaint) {
    setComplaints((current) => [newComplaint, ...current]);
    setShowForm(false);
  }

  const pendingCount = complaints.filter(
    (complaint) => complaint.status === "Pending"
  ).length;

  const inProgressCount = complaints.filter(
    (complaint) => complaint.status === "In Progress"
  ).length;

  const resolvedCount = complaints.filter(
    (complaint) => complaint.status === "Resolved"
  ).length;

  const statusVariant = {
    Pending: "warning",
    "In Progress": "info",
    Resolved: "success"
  };

  const priorityVariant = {
    High: "danger",
    Medium: "warning",
    Low: "default"
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <p className="mb-1 text-sm text-zinc-500">
            Student Portal / Complaint Box
          </p>

          <h1 className="text-2xl font-semibold tracking-tight">
            My Complaints
          </h1>

          <p className="mt-1 text-sm text-zinc-500">
            Report hostel issues and track their progress.
          </p>
        </div>

        <Button onClick={() => setShowForm((current) => !current)}>
          {showForm ? "Close Form" : "+ New Complaint"}
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <p className="text-sm text-zinc-500">Pending</p>
          <p className="mt-2 text-3xl font-semibold">{pendingCount}</p>
        </Card>

        <Card>
          <p className="text-sm text-zinc-500">In Progress</p>
          <p className="mt-2 text-3xl font-semibold">{inProgressCount}</p>
        </Card>

        <Card>
          <p className="text-sm text-zinc-500">Resolved</p>
          <p className="mt-2 text-3xl font-semibold">{resolvedCount}</p>
        </Card>
      </div>

      {showForm && (
        <ComplaintForm
          onSubmit={submitComplaint}
          onCancel={() => setShowForm(false)}
        />
      )}

      <Card>
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="flex-1">
            <Input
              label="Search complaints"
              value={search}
              onChange={setSearch}
              placeholder="Search by title, category or ID..."
            />
          </div>

          <div className="w-full sm:w-52">
            <label className="mb-2 block text-sm font-medium text-zinc-700">
              Filter by status
            </label>

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm"
            >
              <option>All</option>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Resolved</option>
            </select>
          </div>
        </div>

        {filteredComplaints.length === 0 ? (
          <EmptyState
            title="No complaints found"
            message="Try changing the search or status filter."
            action={
              <Button onClick={() => setShowForm(true)}>
                Submit a complaint
              </Button>
            }
          />
        ) : (
          <div className="space-y-3">
            {filteredComplaints.map((complaint) => (
              <div
                key={complaint.id}
                className="rounded-2xl border border-zinc-200 p-4"
              >
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                  <div className="flex-1">
                    <div className="mb-2 flex flex-wrap gap-2">
                      <Badge variant={statusVariant[complaint.status]}>
                        {complaint.status}
                      </Badge>

                      <Badge variant={priorityVariant[complaint.priority]}>
                        {complaint.priority} priority
                      </Badge>
                    </div>

                    <h2 className="font-semibold text-zinc-900">
                      {complaint.title}
                    </h2>

                    <p className="mt-1 text-sm text-zinc-500">
                      {complaint.category} · {complaint.id}
                    </p>

                    <p className="mt-2 text-xs text-zinc-400">
                      Submitted on {complaint.createdAt}
                    </p>
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => setSelectedComplaint(complaint)}
                  >
                    View details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {selectedComplaint && (
        <Card>
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm text-zinc-500">
                {selectedComplaint.id}
              </p>

              <h2 className="mt-1 text-lg font-semibold">
                {selectedComplaint.title}
              </h2>
            </div>

            <Button
              variant="outline"
              onClick={() => setSelectedComplaint(null)}
            >
              Close
            </Button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant={statusVariant[selectedComplaint.status]}>
              {selectedComplaint.status}
            </Badge>

            <Badge variant={priorityVariant[selectedComplaint.priority]}>
              {selectedComplaint.priority} priority
            </Badge>
          </div>

          <p className="mt-4 text-sm text-zinc-600">
            {selectedComplaint.description}
          </p>

          <p className="mt-3 text-sm text-zinc-500">
            Category: {selectedComplaint.category}
          </p>

          <p className="mt-1 text-sm text-zinc-500">
            Reported: {selectedComplaint.createdAt}
          </p>
        </Card>
      )}
    </div>
  );
}

export default ComplaintBox;
