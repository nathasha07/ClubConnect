import { useEffect, useState } from "react";
import StatCard from "../../components/dashboard/StatCard";

const CoordinatorDashboard = () => {
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalRegistrations: 0,
    attendanceMarked: 0,
    certificatesIssued: 0,
  });

  useEffect(() => {
    // Mock stats
    setStats({
      totalEvents: 5,
      totalRegistrations: 132,
      attendanceMarked: 110,
      certificatesIssued: 95,
    });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      <StatCard title="Total Events" value={stats.totalEvents} />
      <StatCard title="Registrations" value={stats.totalRegistrations} />
      <StatCard title="Attendance Marked" value={stats.attendanceMarked} />
      <StatCard title="Certificates Issued" value={stats.certificatesIssued} />
    </div>
  );
};

export default CoordinatorDashboard;
