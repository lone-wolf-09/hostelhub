
export const students = [
  {
    id: "ST001",
    name: "Aarav Sharma",
    rollNumber: "CS2026-01",
    roomId: "R101",
    disciplinaryHistory: []
  },
  {
    id: "ST002",
    name: "Rohan Verma",
    rollNumber: "CS2026-02",
    roomId: "R101",
    disciplinaryHistory: []
  },
  {
    id: "ST003",
    name: "Kabir Singh",
    rollNumber: "CS2026-03",
    roomId: "R102",
    disciplinaryHistory: []
  },
  {
    id: "ST004",
    name: "Arjun Mehta",
    rollNumber: "CS2026-04",
    roomId: null,
    disciplinaryHistory: []
  },
  {
    id: "ST005",
    name: "Ishaan Gupta",
    rollNumber: "CS2026-05",
    roomId: "R103",
    disciplinaryHistory: [
      {
        id: "D001",
        description: "Noise complaint",
        date: "2026-09-12"
      }
    ]
  }
];

export const rooms = [
  {
    id: "R101",
    block: "A",
    floor: "1st",
    number: "101",
    capacity: 3,
    studentIds: ["ST001", "ST002"],
    appliances: ["Bed", "Chair", "Fan", "Study Table"]
  },
  {
    id: "R102",
    block: "A",
    floor: "1st",
    number: "102",
    capacity: 2,
    studentIds: ["ST003"],
    appliances: ["Bed", "Chair", "Fan"]
  },
  {
    id: "R103",
    block: "B",
    floor: "2nd",
    number: "103",
    capacity: 3,
    studentIds: ["ST005"],
    appliances: ["Bed", "Chair", "Fan", "Study Table"]
  },
  {
    id: "R201",
    block: "B",
    floor: "2nd",
    number: "201",
    capacity: 2,
    studentIds: [],
    appliances: ["Bed", "Chair", "Fan"]
  }
];
