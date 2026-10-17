
import { useMemo, useState } from "react";
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import EmptyState from "../../../components/ui/EmptyState";
import ComplaintDetails from "./ComplaintDetails";

const initialComplaints = [
  {
    id: "CMP001",
    studentName: "Aarav Sharma",
    room: "A-101",
    title: "Ceiling fan not working",
    category: "Electrical",
    priority: "High",
    status: "Pending",
    createdAt: "2026-10-15",
    description: "The ceiling fan has stopped working and needs repair.",
    slaHours: 4
  },
  {
    id: "CMP002",
    studentName: "Rohan Verma",
    room: "A-101",
    title: "Bathroom needs cleaning",
    category: "Cleanliness",
    priority: "Medium",
    status: "In Progress",
    createdAt: "2026-10-15",
    description: "The shared bathroom needs cleaning.",
    slaHours: 24
  },
  {
    id: "CMP003",
    studentName: "Kabir Singh",
    room: "A-102",
    title: "Broken study table",
    category: "Furniture",
    priority: "Low",
    status: "Resolved",
    createdAt: "2026-10-14",
    description: "One leg of the study table was broken.",
    slaHours: 48
  },
  {
    id: "CMP004",
    studentName: "Ishaan Gupta",
    room: "B-103",
    title: "Electrical switch sparking",
    category: "Electrical",
    priority: "High",
    status: "Pending",
    createdAt: "2026-10-13",
    description: "The switch sparks when turned on. It needs urgent inspection.",
    slaHours: 4
  },
  {
    id: "CMP005",
    studentName: "Arjun Mehta",
    room: "B-201",
    title: "Loud music at night",
    category: "Noise",
    priority: "Medium",
    status: "Pending",
    createdAt: "2026-10-12",
    description: "Loud music from a nearby room is disturbing residents.",
    slaHours: 24
  }
];

function getSlaInfo(complaint) {
  if (complaint.status === "Resolved") {
    return {
      state: "Resolved",
      message: "This complaint has been resolved."
    };
  }

  const reportedAt = new Date(
    `${complaint.createdAt}T09:00:00`
  ).getTime();

  const deadline =
    reportedAt + complaint.slaHours * 60 * 60 * 1000;

  const remaining = deadline - Date.now();

  if (remaining <= 0) {
    return {
      state: "Overdue",
      message: "The target resolution time has passed."
    };
  }

  const hours = Math.floor(remaining / (60 * 60 * 1000));
  const minutes = Math.floor(
    (remaining % (60 * 60 * 1000)) / (60 * 1000)
  );

  return {
    state: "Within SLA",
    message: `${hours}h ${minutes}m remaining`
  };
}

function ComplaintsPage() {
  const [complaints, setComplaints] = useState(() =>
    initialComplaints.map((complaint) => ({
      ...complaint,
      ...getSlaInfo(complaint)
    }))
  );

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const filteredComplaints = useMemo(() => {
    return complaints.filter((complaint) => {
      const searchText = search.toLowerCase();

      const matchesSearch = [
        complaint.id,
        complaint.title,
        complaint.studentName,
        complaint.room,
        complaint.category
      ].some((value) => value.toLowerCase().includes(searchText));

      const matchesStatus =
        statusFilter === "All" || complaint.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All" ||
        complaint.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [complaints, search, statusFilter, priorityFilter]);

  function updateStatus(id, status) {
    setComplaints((current) =>
      current.map((complaint) => {
        if (complaint.id !== id) {
          return complaint;
        }

        const updated = { ...complaint, status };

        return {
          ...updated,
          ...getSlaInfo(updated)
        };
      })
    );

    setSelectedComplaint((current) => {
      if (!current || current.id !== id) {
        return current;
      }

      const updated = { ...current, status };

      return {
        ...updated,
        ...getSlaInfo(updated)
      };
    });
  }

  const pendingCount = complaints.filter(
    (complaint) => complaint.status === "Pending"
  ).length;

  const inProgressCount = complaints.filter(
    (complaint) => complaint.status === "In Progress"
  ).length;

  const overdueCount = complaints.filter(
    (complaint) =>
      complaint.status !== "Resolved" &&
      getSlaInfo(complaint).state === "Overdue"
  ).length;

  const priorityVariant = {
    High: "danger",
    Medium: "warning",
    Low: "info"
  };

  const statusVariant = {
    Pending: "warning",
    "In Progress": "info",
    Resolved: "success"
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="mb-1 text-sm text-zinc-500">
          Hostel Management / Complaints
        </p>

        <h1 className="text-2xl font-semibold tracking-tight">
          Complaint Center
        </h1>

        <p className="mt-1 text-sm text-zinc-500">
          Track reported issues, resolution status and SLA deadlines.
        </p>
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
          <p className="text-sm text-zinc-500">Overdue SLA</p>
          <p className="mt-2 text-3xl font-semibold text-red-600">
            {overdueCount}
          </p>
        </Card>
      </div>

      <Card>
        <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-3">
          <Input
            label="Search complaints"
            value={search}
            onChange={setSearch}
            placeholder="Title, student, room or ID..."
          />

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700">
              Status
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
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
        </div>

        {filteredComplaints.length === 0 ? (
          <EmptyState
            title="No complaints found"
            message="Try changing your search or filters."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left text-sm">
              <thead>
                <tr className="border-b border-zinc-200 text-xs uppercase text-zinc-500">
                  <th className="pb-3 font-medium">Complaint</th>
                  <th className="pb-3 font-medium">Student / Room</th>
                  <th className="pb-3 font-medium">Priority</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">SLA</th>
                  <th className="pb-3 font-medium">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredComplaints.map((complaint) => {
                  const sla = getSlaInfo(complaint);

                  return (
                    <tr
                      key={complaint.id}
                      className="border-b border-zinc-100 last:border-0"
                    >
                      <td className="py-4">
                        <p className="font-medium">{complaint.title}</p>
                        <p className="mt-1 text-xs text-zinc-500">
                          {complaint.id} · {complaint.category}
                        </p>
                      </td>

                      <td className="py-4">
                        <p>{complaint.studentName}</p>
                        <p className="mt-1 text-xs text-zinc-500">
                          Room {complaint.room}
                        </p>
                      </td>

                      <td className="py-4">
                        <Badge variant={priorityVariant[complaint.priority]}>
                          {complaint.priority}
                        </Badge>
                      </td>

                      <td className="py-4">
                        <Badge variant={statusVariant[complaint.status]}>
                          {complaint.status}
                        </Badge>
                      </td>

                      <td className="py-4">
                        <Badge
                          variant={
                            sla.state === "Overdue"
                              ? "danger"
                              : sla.state === "Resolved"
                              ? "success"
                              : "warning"
                          }
                        >
                          {sla.state}
                        </Badge>

                        <p className="mt-1 text-xs text-zinc-500">
                          {sla.message}
                        </p>
                      </td>

                      <td className="py-4">
                        <Button
                          variant="outline"
                          onClick={() =>
                            setSelectedComplaint({
                              ...complaint,
                              ...sla
                            })
                          }
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {selectedComplaint && (
        <ComplaintDetails
          complaint={{
            ...selectedComplaint,
            ...getSlaInfo(selectedComplaint)
          }}
          onClose={() => setSelectedComplaint(null)}
          onStatusChange={updateStatus}
        />
      )}
    </div>
  );
}

export default ComplaintsPage;
