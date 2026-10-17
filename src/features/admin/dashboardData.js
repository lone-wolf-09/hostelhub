export const dashboardStats = [
  {
    title: "Total Students",
    value: 5,
    detail: "Registered residents",
    icon: "👥",
  },
  {
    title: "Total Beds",
    value: 10,
    detail: "Across all rooms",
    icon: "🛏️",
  },
  {
    title: "Occupied Beds",
    value: 4,
    detail: "40% occupancy",
    icon: "🏠",
  },
  {
    title: "Pending Complaints",
    value: 6,
    detail: "Require attention",
    icon: "📋",
  },
];

export const recentActivities = [
  {
    id: 1,
    title: "New complaint reported",
    detail: "Fan not working · Room A-101",
    time: "10 minutes ago",
    status: "Urgent",
  },
  {
    id: 2,
    title: "Room allocation updated",
    detail: "Aarav Sharma · Room A-101",
    time: "35 minutes ago",
    status: "Completed",
  },
  {
    id: 3,
    title: "Mess menu updated",
    detail: "Dinner menu for today",
    time: "1 hour ago",
    status: "Updated",
  },
];

export const dashboardActivities = recentActivities;

export const dashboardComplaints = [
  {
    id: "C-104",
    title: "Fan not working",
    room: "A-101",
    priority: "High",
    status: "Pending",
    age: "2 hours ago",
  },
  {
    id: "C-103",
    title: "Water leakage",
    room: "B-204",
    priority: "Medium",
    status: "In Progress",
    age: "5 hours ago",
  },
  {
    id: "C-102",
    title: "Study table broken",
    room: "A-210",
    priority: "Low",
    status: "Resolved",
    age: "1 day ago",
  },
];

export const priorityIssues = [
  {
    id: 1,
    title: "Electrical issue",
    room: "Room A-101",
    priority: "High",
    status: "Pending",
  },
  {
    id: 2,
    title: "Bathroom cleaning",
    room: "Room B-103",
    priority: "Medium",
    status: "In Progress",
  },
  {
    id: 3,
    title: "Broken study table",
    room: "Room B-201",
    priority: "Low",
    status: "Pending",
  },
];
