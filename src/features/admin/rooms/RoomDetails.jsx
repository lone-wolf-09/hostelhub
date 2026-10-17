
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";
import Button from "../../../components/ui/Button";

function RoomDetails({ room, students, onClose }) {
  if (!room) {
    return null;
  }

  const residents = students.filter((student) =>
    room.studentIds.includes(student.id)
  );

  const availableBeds = Math.max(
    0,
    room.capacity - residents.length
  );

  return (
    <Card className="space-y-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-zinc-500">Room Details</p>
          <h2 className="mt-1 text-xl font-semibold">
            Block {room.block} · Room {room.number}
          </h2>
          <p className="mt-1 text-sm text-zinc-500">
            {room.floor} floor
          </p>
        </div>

        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div className="rounded-xl bg-zinc-50 p-4">
          <p className="text-sm text-zinc-500">Capacity</p>
          <p className="mt-1 text-2xl font-semibold">
            {room.capacity}
          </p>
        </div>

        <div className="rounded-xl bg-zinc-50 p-4">
          <p className="text-sm text-zinc-500">Occupied</p>
          <p className="mt-1 text-2xl font-semibold">
            {residents.length}
          </p>
        </div>

        <div className="col-span-2 rounded-xl bg-zinc-50 p-4 sm:col-span-1">
          <p className="text-sm text-zinc-500">Available</p>
          <p className="mt-1 text-2xl font-semibold">
            {availableBeds}
          </p>
        </div>
      </div>

      <div>
        <h3 className="mb-3 font-semibold">Room Occupancy</h3>

        <div className="flex gap-2">
          {Array.from({ length: room.capacity }).map((_, index) => (
            <div
              key={index}
              className={`flex h-12 flex-1 items-center justify-center rounded-xl border text-sm font-medium ${
                index < residents.length
                  ? "border-zinc-800 bg-zinc-800 text-white"
                  : "border-dashed border-zinc-300 bg-zinc-50 text-zinc-400"
              }`}
            >
              {index < residents.length ? "Occupied" : "Free"}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 font-semibold">Residents</h3>

        {residents.length > 0 ? (
          <div className="space-y-2">
            {residents.map((student) => (
              <div
                key={student.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-zinc-200 p-3"
              >
                <div>
                  <p className="font-medium">{student.name}</p>
                  <p className="mt-1 text-xs text-zinc-500">
                    {student.rollNumber}
                  </p>
                </div>

                <Badge variant="success">Resident</Badge>
              </div>
            ))}
          </div>
        ) : (
          <p className="rounded-xl bg-zinc-50 p-4 text-sm text-zinc-500">
            No students have been assigned to this room.
          </p>
        )}
      </div>

      <div>
        <h3 className="mb-3 font-semibold">Provided Appliances</h3>

        <div className="flex flex-wrap gap-2">
          {room.appliances.map((appliance) => (
            <Badge key={appliance}>{appliance}</Badge>
          ))}
        </div>
      </div>
    </Card>
  );
}

export default RoomDetails;
