import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/dashboard/Navbar";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-softBg">
      <Sidebar />

      <main className="flex-1 p-10">
        <Navbar />

        <div className="glass-card p-8 min-h-[70vh]">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
