import { useEffect, useState } from "react";
import StatCard from "../../components/dashboard/StatCard";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalClubs: 0,
    totalEvents: 0,
    totalStudents: 0,
    totalCertificates: 0,
  });

  useEffect(() => {
    // Mock system-wide metrics
    setStats({
      totalClubs: 12,
      totalEvents: 48,
      totalStudents: 860,
      totalCertificates: 520,
    });
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
