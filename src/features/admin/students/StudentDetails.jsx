
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";
import Button from "../../../components/ui/Button";

function StudentDetails({ student, room, onClose }) {
  if (!student) {
    return null;
  }

  return (
    <Card className="space-y-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-zinc-500">Student Profile</p>
          <h2 className="mt-1 text-xl font-semibold text-zinc-900">
            {student.name}
          </h2>
          <p className="mt-1 text-sm text-zinc-500">
            {student.rollNumber}
          </p>
        </div>

        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-zinc-50 p-4">
          <p className="text-sm text-zinc-500">Student ID</p>
          <p className="mt-1 font-medium">{student.id}</p>
        </div>

        <div className="rounded-xl bg-zinc-50 p-4">
          <p className="text-sm text-zinc-500">Assigned Room</p>
          <p className="mt-1 font-medium">
            {room ? `${room.block}-${room.number}` : "Not assigned"}
          </p>
        </div>
      </div>

      <div>
        <h3 className="mb-3 font-semibold text-zinc-900">
          Disciplinary History
        </h3>

        {student.disciplinaryHistory?.length > 0 ? (
          <div className="space-y-3">
            {student.disciplinaryHistory.map((record) => (
              <div
                key={record.id}
                className="flex items-start justify-between gap-3 rounded-xl border border-zinc-200 p-4"
              >
                <div>
                  <p className="font-medium text-zinc-800">
                    {record.description}
                  </p>
                  <p className="mt-1 text-sm text-zinc-500">
                    Date: {record.date}
                  </p>
                </div>

                <Badge variant="warning">Recorded</Badge>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl bg-emerald-50 p-4">
            <p className="font-medium text-emerald-800">
              No past history of disciplinary actions
            </p>
            <p className="mt-1 text-sm text-emerald-700">
              No disciplinary records are available for this student.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}

export default StudentDetails;
