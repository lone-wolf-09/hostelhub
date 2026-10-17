
import { useMemo, useState } from "react";
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import EmptyState from "../../../components/ui/EmptyState";
import PropertyDetails from "./PropertyDetails";

const initialProperties = [
  {
    id: "BP001",
    item: "Ceiling Fan",
    category: "Electrical",
    location: "Block A · Room 101",
    reportedAt: "2026-10-15",
    status: "Reported",
    assignedTo: "Hostel Electrician",
    description: "Fan is not rotating despite the power supply being available."
  },
  {
    id: "BP002",
    item: "Study Table",
    category: "Furniture",
    location: "Block B · Room 103",
    reportedAt: "2026-10-14",
    status: "In Progress",
    assignedTo: "Maintenance Team",
    description: "One leg of the table is broken and needs replacement."
  },
  {
    id: "BP003",
    item: "Bathroom Tap",
    category: "Plumbing",
    location: "Block A · Common Bathroom",
    reportedAt: "2026-10-13",
    status: "Reported",
    assignedTo: "",
    description: "Water continues to leak from the tap when it is closed."
  },
  {
    id: "BP004",
    item: "Tube Light",
    category: "Electrical",
    location: "Block B · Corridor",
    reportedAt: "2026-10-11",
    status: "Repaired",
    assignedTo: "Hostel Electrician",
    description: "Faulty tube light has been replaced."
  },
  {
    id: "BP005",
    item: "Room Door Lock",
    category: "Hardware",
    location: "Block A · Room 102",
    reportedAt: "2026-10-10",
    status: "In Progress",
    assignedTo: "Maintenance Team",
    description: "Door lock is jammed and does not close properly."
  }
];

function BrokenPropertyPage() {
  const [properties, setProperties] = useState(initialProperties);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [selectedProperty, setSelectedProperty] = useState(null);

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        property.item.toLowerCase().includes(searchText) ||
        property.location.toLowerCase().includes(searchText) ||
        property.id.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All" || property.status === statusFilter;

      const matchesCategory =
        categoryFilter === "All" || property.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [properties, search, statusFilter, categoryFilter]);

  function updateStatus(id, status) {
    setProperties((current) =>
      current.map((property) =>
        property.id === id ? { ...property, status } : property
      )
    );

    setSelectedProperty((current) =>
      current?.id === id ? { ...current, status } : current
    );
  }

  const reportedCount = properties.filter(
    (property) => property.status === "Reported"
  ).length;

  const inProgressCount = properties.filter(
    (property) => property.status === "In Progress"
  ).length;

  const repairedCount = properties.filter(
    (property) => property.status === "Repaired"
  ).length;

  const statusVariant = {
    Reported: "danger",
    "In Progress": "warning",
    Repaired: "success"
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="mb-1 text-sm text-zinc-500">
          Hostel Management / Property
        </p>

        <h1 className="text-2xl font-semibold tracking-tight">
          Broken Property Details
        </h1>

        <p className="mt-1 text-sm text-zinc-500">
          Track damaged assets and monitor repair progress.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <p className="text-sm text-zinc-500">Reported Issues</p>
          <p className="mt-2 text-3xl font-semibold text-red-600">
            {reportedCount}
          </p>
        </Card>

        <Card>
          <p className="text-sm text-zinc-500">Repairs In Progress</p>
          <p className="mt-2 text-3xl font-semibold">
            {inProgressCount}
          </p>
        </Card>

        <Card>
          <p className="text-sm text-zinc-500">Repaired</p>
          <p className="mt-2 text-3xl font-semibold text-emerald-700">
            {repairedCount}
          </p>
        </Card>
      </div>

      <Card>
        <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-3">
          <Input
            label="Search property"
            value={search}
            onChange={setSearch}
            placeholder="Item, location or ID..."
          />

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700">
              Repair status
            </label>

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm"
            >
              <option>All</option>
              <option>Reported</option>
              <option>In Progress</option>
              <option>Repaired</option>
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
              <option>Electrical</option>
              <option>Furniture</option>
              <option>Plumbing</option>
              <option>Hardware</option>
            </select>
          </div>
        </div>

        {filteredProperties.length === 0 ? (
          <EmptyState
            title="No property records found"
            message="Try changing the search or filters."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px] text-left text-sm">
              <thead>
                <tr className="border-b border-zinc-200 text-xs uppercase text-zinc-500">
                  <th className="pb-3 font-medium">Property</th>
                  <th className="pb-3 font-medium">Location</th>
                  <th className="pb-3 font-medium">Reported On</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Assigned To</th>
                  <th className="pb-3 font-medium">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredProperties.map((property) => (
                  <tr
                    key={property.id}
                    className="border-b border-zinc-100 last:border-0"
                  >
                    <td className="py-4">
                      <p className="font-medium">{property.item}</p>
                      <p className="mt-1 text-xs text-zinc-500">
                        {property.id} · {property.category}
                      </p>
                    </td>

                    <td className="py-4 text-zinc-600">
                      {property.location}
                    </td>

                    <td className="py-4 text-zinc-600">
                      {property.reportedAt}
                    </td>

                    <td className="py-4">
                      <Badge variant={statusVariant[property.status]}>
                        {property.status}
                      </Badge>
                    </td>

                    <td className="py-4 text-zinc-600">
                      {property.assignedTo || "Unassigned"}
                    </td>

                    <td className="py-4">
                      <Button
                        variant="outline"
                        onClick={() => setSelectedProperty(property)}
                      >
                        View details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {selectedProperty && (
        <PropertyDetails
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
          onStatusChange={updateStatus}
        />
      )}
    </div>
  );
}

export default BrokenPropertyPage;
