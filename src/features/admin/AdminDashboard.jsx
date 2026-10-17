
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import StatCard from "../../components/StatCard";
import { students, rooms } from "../../data/initialData";
import {
  getOccupiedBeds,
  getTotalBeds,
  getAvailableBeds
} from "../../utils/roomUtils";
import {
  dashboardComplaints,
  dashboardActivities
} from "./dashboardData";


function AdminDashboard() {
  const totalStudents = students.length;
  const totalRooms = rooms.length;
  const occupiedBeds = getOccupiedBeds(rooms);
  const totalBeds = getTotalBeds(rooms);
  const availableBeds = getAvailableBeds(rooms);

  const pendingComplaints = dashboardComplaints.filter(
    (complaint) => complaint.status !== "Resolved"
  ).length;

  const occupancyRate = totalBeds
    ? Math.round((occupiedBeds / totalBeds) * 100)
    : 0;

  const getPriorityVariant = (priority) => {
    if (priority === "High") return "danger";
    if (priority === "Medium") return "warning";
    return "default";
  };

  const getStatusVariant = (status) => {
    if (status === "Resolved") return "success";
    if (status === "In Progress") return "info";
    return "warning";
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-zinc-500">
            HOSTEL OPERATIONS
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">
            HostelHub
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            A quick overview of what's happening across your hostel.
          </p>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white px-4 py-3">
          <p className="text-xs text-zinc-500">Today's overview</p>
          <p className="mt-1 font-medium">
            All hostel operations in one place
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Students"
          value={totalStudents}
          detail="Registered students"
          icon="users"
        />
        <StatCard
          title="Room Occupancy"
          value={`${occupancyRate}%`}
          detail={`${occupiedBeds} of ${totalBeds} beds occupied`}
          icon="bed-double"
        />
        <StatCard
          title="Available Beds"
          value={availableBeds}
          detail={`${totalRooms} rooms in the hostel`}
          icon="door-open"
        />
        <StatCard
          title="Open Complaints"
          value={pendingComplaints}
          detail="Need attention"
          icon="clipboard-list"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold">Complaint Overview</h2>
              <p className="mt-1 text-sm text-zinc-500">
                Recent issues reported by students
              </p>
            </div>
            <span className="rounded-lg bg-zinc-100 px-3 py-2 text-sm font-medium">
              {pendingComplaints} open
            </span>
          </div>

          <div className="mt-5 space-y-3">
            {dashboardComplaints.map((complaint) => (
              <div
                key={complaint.id}
                className="flex flex-col gap-3 rounded-xl border border-zinc-100 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <p className="font-medium">{complaint.title}</p>
                  <p className="mt-1 text-sm text-zinc-500">
                    Room {complaint.room} · {complaint.age}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Badge variant={getPriorityVariant(complaint.priority)}>
                      {complaint.priority} priority
                    </Badge>
                    <Badge variant={getStatusVariant(complaint.status)}>
                      {complaint.status}
                    </Badge>
                  </div>
                </div>
                <span className="text-xs text-zinc-400">
                  {complaint.id}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold">Room Occupancy</h2>
          <p className="mt-1 text-sm text-zinc-500">
            Bed usage across all rooms
          </p>

          <div className="mt-5">
            <div className="flex items-end justify-between">
              <span className="text-3xl font-semibold">{occupancyRate}%</span>
              <span className="text-sm text-zinc-500">
                {occupiedBeds}/{totalBeds} beds
              </span>
            </div>

            <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-zinc-100">
              <div
                className="h-full rounded-full bg-lime-600 transition-all"
                style={{ width: `${occupancyRate}%` }}
              />
            </div>

            <div className="mt-5 space-y-3">
              {rooms.map((room) => {
                const occupied = room.studentIds.length;
                const percentage = room.capacity
                  ? (occupied / room.capacity) * 100
                  : 0;

                return (
                  <div key={room.id}>
                    <div className="mb-1 flex justify-between text-sm">
                      <span className="font-medium">
                        Block {room.block} · Room {room.number}
                      </span>
                      <span className="text-zinc-500">
                        {occupied}/{room.capacity}
                      </span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-zinc-100">
                      <div
                        className="h-full rounded-full bg-zinc-800"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <div>
          <h2 className="text-lg font-semibold">Recent Activity</h2>
          <p className="mt-1 text-sm text-zinc-500">
            A snapshot of recent hostel updates
          </p>
        </div>

        <div className="mt-5 divide-y divide-zinc-100">
          {dashboardActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium">{activity.title}</p>
                <p className="mt-1 text-sm text-zinc-500">
                  {activity.detail}
                </p>
              </div>
              <span className="text-sm text-zinc-400">{activity.time}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default AdminDashboard;
