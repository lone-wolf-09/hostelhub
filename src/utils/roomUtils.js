
export function getOccupiedBeds(rooms) {
  return rooms.reduce((total, room) => {
    return total + room.studentIds.length;
  }, 0);
}

export function getTotalBeds(rooms) {
  return rooms.reduce((total, room) => {
    return total + room.capacity;
  }, 0);
}

export function getAvailableBeds(rooms) {
  return getTotalBeds(rooms) - getOccupiedBeds(rooms);
}

export function getRoommates(studentId, students) {
  const student = students.find((item) => item.id === studentId);

  if (!student || !student.roomId) {
    return [];
  }

  return students.filter(
    (item) =>
      item.roomId === student.roomId &&
      item.id !== studentId
  );
}

export function getRoomOccupancy(room) {
  return Math.round(
    (room.studentIds.length / room.capacity) * 100
  );
}

