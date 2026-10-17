
import { useMemo, useState } from "react";
import { students, rooms } from "../../../data/initialData";
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import EmptyState from "../../../components/ui/EmptyState";
import StudentDetails from "./StudentDetails";

function StudentsPage() {
  const [search, setSearch] = useState("");
  const [roomFilter, setRoomFilter] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState(null);

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        student.name.toLowerCase().includes(searchText) ||
        student.rollNumber.toLowerCase().includes(searchText) ||
        student.id.toLowerCase().includes(searchText);

      const matchesRoom =
        roomFilter === "all"
          ? true
          : roomFilter === "unassigned"
          ? !student.roomId
          : student.roomId === roomFilter;

      return matchesSearch && matchesRoom;
    });
  }, [search, roomFilter]);

  const assignedCount = students.filter(
    (student) => student.roomId
  ).length;

  const unassignedCount = students.length - assignedCount;

  function getRoom(student) {
    return rooms.find((room) => room.id === student.roomId);
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="mb-1 text-sm text-zinc-500">
          Hostel Management / Students
        </p>

        <h1 className="text-2xl font-semibold tracking-tight">
          Students
        </h1>

        <p className="mt-1 text-sm text-zinc-500">
          Manage student records, room assignments and disciplinary history.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <p className="text-sm text-zinc-500">Total Students</p>
          <p className="mt-2 text-3xl font-semibold">{students.length}</p>
        </Card>

        <Card>
          <p className="text-sm text-zinc-500">Room Assigned</p>
          <p className="mt-2 text-3xl font-semibold">{assignedCount}</p>
        </Card>

        <Card>
          <p className="text-sm text-zinc-500">Unassigned</p>
          <p className="mt-2 text-3xl font-semibold">{unassignedCount}</p>
        </Card>
      </div>

      <Card>
        <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-end">
          <div className="flex-1">
            <Input
              label="Search students"
              value={search}
              onChange={setSearch}
              placeholder="Search by name, roll number or ID..."
            />
          </div>

          <div className="w-full md:w-56">
            <label className="mb-2 block text-sm font-medium text-zinc-700">
              Room assignment
            </label>

            <select
              value={roomFilter}
              onChange={(event) => setRoomFilter(event.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-zinc-400"
            >
              <option value="all">All students</option>
              <option value="unassigned">Unassigned students</option>

              {rooms.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.block}-{room.number}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filteredStudents.length === 0 ? (
          <EmptyState
            title="No students found"
            message="Try another name, roll number or room filter."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left text-sm">
              <thead>
                <tr className="border-b border-zinc-200 text-xs uppercase text-zinc-500">
                  <th className="pb-3 font-medium">Student</th>
                  <th className="pb-3 font-medium">Roll Number</th>
                  <th className="pb-3 font-medium">Room</th>
                  <th className="pb-3 font-medium">Disciplinary Records</th>
                  <th className="pb-3 font-medium">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.map((student) => {
                  const room = getRoom(student);
                  const recordCount =
                    student.disciplinaryHistory?.length || 0;

                  return (
                    <tr
                      key={student.id}
                      className="border-b border-zinc-100 last:border-0"
                    >
                      <td className="py-4">
                        <p className="font-medium text-zinc-900">
                          {student.name}
                        </p>
                        <p className="mt-1 text-xs text-zinc-500">
                          {student.id}
                        </p>
                      </td>

                      <td className="py-4 text-zinc-600">
                        {student.rollNumber}
                      </td>

                      <td className="py-4">
                        {room ? (
                          <Badge>
                            {room.block}-{room.number}
                          </Badge>
                        ) : (
                          <Badge variant="warning">Unassigned</Badge>
                        )}
                      </td>

                      <td className="py-4">
                        {recordCount > 0 ? (
                          <Badge variant="warning">
                            {recordCount} record(s)
                          </Badge>
                        ) : (
                          <Badge variant="success">Clear</Badge>
                        )}
                      </td>

                      <td className="py-4">
                        <Button
                          variant="outline"
                          onClick={() => setSelectedStudent(student)}
                        >
                          View details
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

      {selectedStudent && (
        <StudentDetails
          student={selectedStudent}
          room={getRoom(selectedStudent)}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </div>
  );
}

export default StudentsPage;
