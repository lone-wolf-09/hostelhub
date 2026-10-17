
import { useMemo, useState } from "react";
import { rooms, students } from "../../../data/initialData";
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import RoomDetails from "./RoomDetails";

function RoomsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedRoom, setSelectedRoom] = useState(null);

  const roomStats = rooms.map((room) => {
    const occupied = students.filter(
      (student) => student.roomId === room.id
    ).length;

    return {
      ...room,
      occupied,
      available: Math.max(0, room.capacity - occupied)
    };
  });

  const totalBeds = roomStats.reduce(
    (total, room) => total + room.capacity,
    0
  );

  const occupiedBeds = roomStats.reduce(
    (total, room) => total + room.occupied,
    0
  );

  const availableBeds = totalBeds - occupiedBeds;

  const filteredRooms = useMemo(() => {
    return roomStats.filter((room) => {
      const roomName = `${room.block}-${room.number}`.toLowerCase();

      const matchesSearch =
        roomName.includes(search.toLowerCase()) ||
        room.block.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "all" ||
        (filter === "available" && room.available > 0) ||
        (filter === "full" && room.available === 0);

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  function getRoomStatus(room) {
    if (room.available === 0) {
      return { label: "Full", variant: "danger" };
    }

    if (room.occupied === 0) {
      return { label: "Vacant", variant: "success" };
    }

    return { label: "Available beds", variant: "info" };
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="mb-1 text-sm text-zinc-500">
          Hostel Management / Rooms
        </p>

        <h1 className="text-2xl font-semibold tracking-tight">
          Room Allocation
        </h1>

        <p className="mt-1 text-sm text-zinc-500">
          Visualize occupancy, available beds and room facilities.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <p className="text-sm text-zinc-500">Total Rooms</p>
          <p className="mt-2 text-3xl font-semibold">{rooms.length}</p>
        </Card>

        <Card>
          <p className="text-sm text-zinc-500">Occupied Beds</p>
          <p className="mt-2 text-3xl font-semibold">{occupiedBeds}</p>
          <p className="mt-1 text-xs text-zinc-500">
            Out of {totalBeds} beds
          </p>
        </Card>

        <Card>
          <p className="text-sm text-zinc-500">Available Beds</p>
          <p className="mt-2 text-3xl font-semibold">{availableBeds}</p>
        </Card>
      </div>

      <Card>
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="flex-1">
            <Input
              label="Find a room"
              value={search}
              onChange={setSearch}
              placeholder="Search block or room number..."
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant={filter === "all" ? "primary" : "outline"}
              onClick={() => setFilter("all")}
            >
              All rooms
            </Button>

            <Button
              variant={filter === "available" ? "primary" : "outline"}
              onClick={() => setFilter("available")}
            >
              Available
            </Button>

            <Button
              variant={filter === "full" ? "primary" : "outline"}
              onClick={() => setFilter("full")}
            >
              Full
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredRooms.map((room) => {
            const status = getRoomStatus(room);
            const occupancy = room.capacity
              ? (room.occupied / room.capacity) * 100
              : 0;

            return (
              <div
                key={room.id}
                className="rounded-2xl border border-zinc-200 p-5 transition hover:border-zinc-400 hover:shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm text-zinc-500">
                      Block {room.block} · {room.floor} Floor
                    </p>

                    <h2 className="mt-1 text-xl font-semibold">
                      Room {room.number}
                    </h2>
                  </div>

                  <Badge variant={status.variant}>
                    {status.label}
                  </Badge>
                </div>

                <div className="my-5">
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-zinc-500">Occupancy</span>
                    <span className="font-medium">
                      {room.occupied}/{room.capacity} beds
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-zinc-100">
                    <div
                      className="h-full rounded-full bg-zinc-800"
                      style={{ width: `${occupancy}%` }}
                    />
                  </div>
                </div>

                <div className="mb-4 flex gap-2">
                  {Array.from({ length: room.capacity }).map((_, index) => (
                    <div
                      key={index}
                      className={`flex h-10 flex-1 items-center justify-center rounded-lg text-xs ${
                        index < room.occupied
                          ? "bg-zinc-800 text-white"
                          : "border border-dashed border-zinc-300 text-zinc-400"
                      }`}
                    >
                      {index < room.occupied ? "Used" : "Free"}
                    </div>
                  ))}
                </div>

                <p className="mb-4 text-sm text-zinc-500">
                  {room.available} bed(s) available
                </p>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setSelectedRoom(room)}
                >
                  View room details
                </Button>
              </div>
            );
          })}
        </div>

        {filteredRooms.length === 0 && (
          <p className="py-8 text-center text-sm text-zinc-500">
            No rooms match your search.
          </p>
        )}
      </Card>

      {selectedRoom && (
        <RoomDetails
          room={selectedRoom}
          students={students}
          onClose={() => setSelectedRoom(null)}
        />
      )}
    </div>
  );
}

export default RoomsPage;
