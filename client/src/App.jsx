import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/ui/ProtectedRoute.jsx";
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import Login from "./pages/auth/Login.jsx";
import StudentDashboard from "./pages/student/StudentDashboard.jsx";
import Clubs from "./pages/student/Clubs.jsx";
import Events from "./pages/student/Events.jsx";
import Registrations from "./pages/student/Registrations.jsx";
import Certificates from "./pages/student/Certificates.jsx";
import DutyLeave from "./pages/student/DutyLeave.jsx";
import ParticipationHistory from "./pages/student/ParticipationHistory.jsx";

import CoordinatorDashboard from "./pages/coordinator/CoordinatorDashboard.jsx";
import RoleBasedDashboard from "./components/dashboard/RoleBasedDashboard.jsx";
import CreateEvent from "./pages/coordinator/CreateEvent.jsx";
import EventRegistrations from "./pages/coordinator/EventRegistrations.jsx";
import DutyLeaveManagement from "./pages/coordinator/DutyLeaveManagement.jsx";

import CreateClub from "./pages/admin/CreateClub.jsx";
import ViewClubs from "./pages/admin/ViewClubs.jsx";
import ApproveEvents from "./pages/admin/ApproveEvents.jsx";
import AdminAnalytics from "./pages/admin/AdminAnalytics.jsx";

import Home from "./pages/Home.jsx";
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<RoleBasedDashboard />} />
            <Route path="admin/clubs/create" element={<CreateClub />} />
            <Route path="admin/clubs" element={<ViewClubs />} />
            <Route path="admin/events/approve" element={<ApproveEvents />} />
            <Route path="admin/analytics" element={<AdminAnalytics />} />
            <Route path="events/create" element={<CreateEvent />} />
            <Route
              path="events/registrations"
              element={<EventRegistrations />}
            />
            <Route path="duty-leave/manage" element={<DutyLeaveManagement />} />
            <Route index element={<StudentDashboard />} />
            <Route path="clubs" element={<Clubs />} />
            <Route path="events" element={<Events />} />
            <Route path="registrations" element={<Registrations />} />
            <Route path="certificates" element={<Certificates />} />
            <Route path="duty-leave" element={<DutyLeave />} />
            <Route path="history" element={<ParticipationHistory />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
