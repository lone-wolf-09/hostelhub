
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";
import Button from "../../../components/ui/Button";

function ComplaintDetails({ complaint, onClose, onStatusChange }) {
  if (!complaint) {
    return null;
  }

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
    <Card className="space-y-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-zinc-500">Complaint Details</p>
          <h2 className="mt-1 text-xl font-semibold">
            {complaint.title}
          </h2>
          <p className="mt-1 text-sm text-zinc-500">
            Complaint ID: {complaint.id}
          </p>
        </div>

        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge variant={priorityVariant[complaint.priority] || "default"}>
          {complaint.priority} Priority
        </Badge>

        <Badge variant={statusVariant[complaint.status] || "default"}>
          {complaint.status}
        </Badge>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-zinc-50 p-4">
          <p className="text-sm text-zinc-500">Student</p>
          <p className="mt-1 font-medium">{complaint.studentName}</p>
        </div>

        <div className="rounded-xl bg-zinc-50 p-4">
          <p className="text-sm text-zinc-500">Room</p>
          <p className="mt-1 font-medium">{complaint.room}</p>
        </div>

        <div className="rounded-xl bg-zinc-50 p-4">
          <p className="text-sm text-zinc-500">Category</p>
          <p className="mt-1 font-medium">{complaint.category}</p>
        </div>

        <div className="rounded-xl bg-zinc-50 p-4">
          <p className="text-sm text-zinc-500">Reported On</p>
          <p className="mt-1 font-medium">{complaint.createdAt}</p>
        </div>
      </div>

      <div>
        <h3 className="mb-2 font-semibold">Description</h3>
        <p className="rounded-xl border border-zinc-200 p-4 text-sm leading-6 text-zinc-600">
          {complaint.description}
        </p>
      </div>

      <div>
        <h3 className="mb-2 font-semibold">SLA Tracking</h3>
        <div
          className={`rounded-xl p-4 text-sm ${
            complaint.slaState === "Overdue"
              ? "bg-red-50 text-red-700"
              : complaint.slaState === "Resolved"
              ? "bg-emerald-50 text-emerald-700"
              : "bg-amber-50 text-amber-800"
          }`}
        >
          <p className="font-medium">{complaint.slaState}</p>
          <p className="mt-1">{complaint.slaMessage}</p>
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-700">
          Update complaint status
        </label>

        <select
          value={complaint.status}
          onChange={(event) =>
            onStatusChange(complaint.id, event.target.value)
          }
          className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-zinc-400"
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>
    </Card>
  );
}

export default ComplaintDetails;
