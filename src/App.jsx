
import { useState } from "react";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import AdminDashboard from "./features/admin/AdminDashboard";
import StudentsPage from "./features/admin/students/StudentsPage";
import RoomsPage from "./features/admin/rooms/RoomsPage";
import ComplaintsPage from "./features/admin/complaints/ComplaintsPage";
import MessMenuPage from "./features/admin/mess/MessMenuPage";
import AnnouncementsPage from "./features/admin/announcements/AnnouncementsPage";
import BrokenPropertyPage from "./features/admin/property/BrokenPropertyPage";

import StudentDashboard from "./features/dashboard/StudentDashboard";
import ComplaintBox from "./features/student/complaints/ComplaintBox";
import StudentMessPage from "./features/student/mess/StudentMessPage";
import StudentNotices from "./features/student/notices/StudentNotices";
import ImportantContacts from "./features/student/contacts/ImportantContacts";


function App() {
  const [role, setRole] = useState("student");
  const [activePage, setActivePage] = useState("Dashboard");

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setActivePage(newRole === "admin" ? "Overview" : "Dashboard");
  };

  const handleNavigate = (page) => {
    setActivePage(page);
  };

  const renderPage = () => {
    if (role === "admin") {
      switch (activePage) {
        case "Overview":
          return <AdminDashboard />;
        case "Students":
          return <StudentsPage />;
        case "Rooms":
          return <RoomsPage />;
        case "Complaints":
          return <ComplaintsPage />;
        case "Mess Menu":
          return <MessMenuPage />;
        case "Announcements":
          return <AnnouncementsPage />;
        case "Broken Property":
          return <BrokenPropertyPage />;
        default:
          return <AdminDashboard />;
      }
    }

    switch (activePage) {
      case "Dashboard":
        return <StudentDashboard onNavigate={handleNavigate} />;
      case "My Room":
        return <StudentDashboard onNavigate={handleNavigate} />;
      case "Complaint Box":
        return <ComplaintBox />;
      case "Mess Menu":
        return <StudentMessPage />;
      case "Notices":
        return <StudentNotices />;
      case "Important Contacts":
        return <ImportantContacts />;
      default:
        return <StudentDashboard onNavigate={handleNavigate} />;
    }
  };

  const pageTitle =
    activePage === "Overview" ? "Overview" : activePage;

  return (
    <div className="min-h-screen bg-zinc-100 md:flex">
      <Sidebar
        role={role}
        activePage={activePage}
        onNavigate={handleNavigate}
      />

      <div className="min-w-0 flex-1">
        <Navbar
          role={role}
          page={pageTitle}
          userName={role === "admin" ? "Hostel Admin" : "Aarav Sharma"}
          onRoleChange={handleRoleChange}
        />

        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            {renderPage()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
