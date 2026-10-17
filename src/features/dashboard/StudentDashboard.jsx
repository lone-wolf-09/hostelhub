
import { students, rooms } from "../../data/initialData";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import StudentQuickAction from "./StudentQuickAction";

function StudentDashboard({ onNavigate }) {
  const student = students[0];

  const room = rooms.find(
    (item) => item.id === student.roomId
  );

  const roommates = students.filter(
    (item) =>
      item.roomId === student.roomId &&
      item.id !== student.id
  );

  const occupiedBeds = room
    ? students.filter((item) => item.roomId === room.id).length
    : 0;

  const availableBeds = room
    ? Math.max(0, room.capacity - occupiedBeds)
    : 0;

  const disciplinaryRecords = student.disciplinaryHistory || [];

  return (
    <div className="space-y-6">
      <div>
        <p className="mb-1 text-sm text-zinc-500">
          Student Portal / Dashboard
        </p>

        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
          Welcome back, {student.name.split(" ")[0]} 👋
        </h1>

        <p className="mt-1 text-sm text-zinc-500">
          Here is your hostel information and today's overview.
        </p>
      </div>

      <Card className="overflow-hidden bg-zinc-900 text-white">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <Badge variant="success">Hostel Resident</Badge>

            <h2 className="mt-4 text-2xl font-semibold">
              {room
                ? `Block ${room.block} · Room ${room.number}`
                : "Room not assigned"}
            </h2>

            <p className="mt-2 text-sm text-zinc-300">
              {student.name} · {student.rollNumber}
            </p>

            {room && (
              <p className="mt-1 text-sm text-zinc-400">
                {room.floor} floor
              </p>
            )}
          </div>

          <div className="rounded-2xl border border-white/15 bg-white/10 p-5">
            <p className="text-sm text-zinc-300">Available beds</p>

            <p className="mt-1 text-4xl font-semibold">
              {availableBeds}
            </p>

            <p className="mt-1 text-xs text-zinc-400">
              {room
                ? `${occupiedBeds} of ${room.capacity} beds occupied`
                : "Contact the hostel office"}
            </p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <Card>
          <p className="text-sm text-zinc-500">My Roommates</p>

          <p className="mt-2 text-3xl font-semibold">
            {roommates.length}
          </p>

          <p className="mt-1 text-sm text-zinc-500">
            Other residents in your room
          </p>
        </Card>

        <Card>
          <p className="text-sm text-zinc-500">Room Facilities</p>

          <p className="mt-2 text-3xl font-semibold">
            {room?.appliances.length || 0}
          </p>

          <p className="mt-1 text-sm text-zinc-500">
            Listed appliances and facilities
          </p>
        </Card>

        <Card>
          <p className="text-sm text-zinc-500">
            Disciplinary History
          </p>

          <p className="mt-2 text-3xl font-semibold">
            {disciplinaryRecords.length}
          </p>

          <p className="mt-1 text-sm text-zinc-500">
            Recorded disciplinary actions
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Card>
          <div className="mb-5">
            <h2 className="text-lg font-semibold">My Room</h2>

            <p className="mt-1 text-sm text-zinc-500">
              Your roommates and provided appliances.
            </p>
          </div>

          {room ? (
            <>
              <div className="space-y-3">
                {roommates.length > 0 ? (
                  roommates.map((roommate) => (
                    <div
                      key={roommate.id}
                      className="flex items-center justify-between rounded-xl border border-zinc-200 p-3"
                    >
                      <div>
                        <p className="font-medium">
                          {roommate.name}
                        </p>

                        <p className="mt-1 text-xs text-zinc-500">
                          {roommate.rollNumber}
                        </p>
                      </div>

                      <Badge>Roommate</Badge>
                    </div>
                  ))
                ) : (
                  <p className="rounded-xl bg-zinc-50 p-4 text-sm text-zinc-500">
                    No other roommates assigned yet.
                  </p>
                )}
              </div>

              <div className="mt-5 border-t border-zinc-100 pt-4">
                <h3 className="mb-3 text-sm font-semibold">
                  Provided Appliances
                </h3>

                <div className="flex flex-wrap gap-2">
                  {room.appliances.map((appliance) => (
                    <Badge key={appliance}>{appliance}</Badge>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <p className="text-sm text-zinc-500">
              No room has been assigned. Please contact the hostel office.
            </p>
          )}
        </Card>

        <Card>
          <div className="mb-5">
            <h2 className="text-lg font-semibold">
              Disciplinary History
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Your recorded hostel disciplinary history.
            </p>
          </div>

          {disciplinaryRecords.length > 0 ? (
            <div className="space-y-3">
              {disciplinaryRecords.map((record) => (
                <div
                  key={record.id}
                  className="rounded-xl border border-amber-200 bg-amber-50/50 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-medium text-zinc-800">
                      {record.description}
                    </p>

                    <Badge variant="warning">Recorded</Badge>
                  </div>

                  <p className="mt-2 text-sm text-zinc-500">
                    Date: {record.date}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl bg-emerald-50 p-4">
              <p className="font-medium text-emerald-800">
                No past history of disciplinary actions
              </p>

              <p className="mt-1 text-sm text-emerald-700">
                You have no disciplinary records listed.
              </p>
            </div>
          )}
        </Card>
      </div>

      <Card>
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Quick Actions</h2>

          <p className="mt-1 text-sm text-zinc-500">
            Access common hostel services.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <StudentQuickAction
            icon="🛠️"
            title="Complaint Box"
            description="Report a maintenance issue or hostel concern."
            onClick={() => onNavigate?.("Complaint Box")}
          />

          <StudentQuickAction
            icon="🍽️"
            title="Mess Menu"
            description="Check meals and share food feedback."
            onClick={() => onNavigate?.("Mess Menu")}
          />

          <StudentQuickAction
            icon="📢"
            title="Notices"
            description="Read important hostel announcements."
            onClick={() => onNavigate?.("Notices")}
          />

          <StudentQuickAction
            icon="📞"
            title="Important Contacts"
            description="Find hostel staff and emergency helplines."
            onClick={() => onNavigate?.("Important Contacts")}
          />
        </div>
      </Card>
    </div>
  );
}

export default StudentDashboard;
