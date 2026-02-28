import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import StudentDashboard from "../../pages/student/StudentDashboard";
import CoordinatorDashboard from "../../pages/coordinator/CoordinatorDashboard";
import AdminDashboard from "../../pages/admin/AdminDashboard";

const RoleBasedDashboard = () => {
  const { user } = useContext(AuthContext);

  if (user?.role === "Admin") {
    return <AdminDashboard />;
  }

  if (user?.role === "Coordinator") {
    return <CoordinatorDashboard />;
  }

  return <StudentDashboard />;
};

export default RoleBasedDashboard;
