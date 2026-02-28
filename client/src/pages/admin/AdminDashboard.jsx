import { useEffect, useState } from "react";
import StatCard from "../../components/dashboard/StatCard";
import API from "../../services/api";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalClubs: 0,
    totalEvents: 0,
    totalStudents: 0,
    totalCertificates: 0,
  });

  useEffect(() => {
  const fetchDashboard = async () => {
    try {
      const res = await API.get("/admin/dashboard");

      setStats({
        totalClubs: 0, // we haven't created clubs model yet
        totalEvents: res.data.totalEvents,
        totalStudents: res.data.totalStudents,
        totalCertificates: 0, // later feature
      });

    } catch (error) {
      console.error("Error fetching dashboard:", error);
    }
  };

  fetchDashboard();
}, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-8">System Analytics</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard title="Total Clubs" value={stats.totalClubs} />
        <StatCard title="Total Events" value={stats.totalEvents} />
        <StatCard title="Total Students" value={stats.totalStudents} />
        <StatCard title="Certificates Issued" value={stats.totalCertificates} />
      </div>
    </div>
  );
};

export default AdminDashboard;
