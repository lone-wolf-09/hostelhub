
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";
import Button from "../../../components/ui/Button";

function PropertyDetails({ property, onClose, onStatusChange }) {
  if (!property) {
    return null;
  }

  const statusVariant = {
    Reported: "danger",
    "In Progress": "warning",
    Repaired: "success"
  };

  return (
    <Card className="space-y-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-zinc-500">Property Record</p>
          <h2 className="mt-1 text-xl font-semibold">
            {property.item}
          </h2>
          <p className="mt-1 text-sm text-zinc-500">
            ID: {property.id}
          </p>
        </div>

        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-zinc-50 p-4">
          <p className="text-sm text-zinc-500">Location</p>
          <p className="mt-1 font-medium">{property.location}</p>
        </div>

        <div className="rounded-xl bg-zinc-50 p-4">
          <p className="text-sm text-zinc-500">Category</p>
          <p className="mt-1 font-medium">{property.category}</p>
        </div>

        <div className="rounded-xl bg-zinc-50 p-4">
          <p className="text-sm text-zinc-500">Reported On</p>
          <p className="mt-1 font-medium">{property.reportedAt}</p>
        </div>

        <div className="rounded-xl bg-zinc-50 p-4">
          <p className="text-sm text-zinc-500">Assigned To</p>
          <p className="mt-1 font-medium">
            {property.assignedTo || "Not assigned"}
          </p>
        </div>
      </div>

      <div>
        <h3 className="mb-2 font-semibold">Damage Description</h3>
        <p className="rounded-xl border border-zinc-200 p-4 text-sm leading-6 text-zinc-600">
          {property.description}
        </p>
      </div>

      <div>
        <h3 className="mb-2 font-semibold">Repair Status</h3>

        <div className="mb-3">
          <Badge variant={statusVariant[property.status] || "default"}>
            {property.status}
          </Badge>
        </div>

        <select
          value={property.status}
          onChange={(event) =>
            onStatusChange(property.id, event.target.value)
          }
          className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm"
        >
          <option>Reported</option>
          <option>In Progress</option>
          <option>Repaired</option>
        </select>
      </div>
    </Card>
  );
}

export default PropertyDetails;
