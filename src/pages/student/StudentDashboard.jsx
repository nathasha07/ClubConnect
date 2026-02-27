import { useEffect, useState } from "react";
import StatCard from "../../components/dashboard/StatCard";

const StudentDashboard = () => {
  const [stats, setStats] = useState({
    clubsJoined: 0,
    eventsRegistered: 0,
    certificatesEarned: 0,
    dutyLeaves: 0,
  });

  useEffect(() => {
    // Replace with real API later
    setStats({
      clubsJoined: 4,
      eventsRegistered: 12,
      certificatesEarned: 8,
      dutyLeaves: 3,
    });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      <StatCard title="Clubs Joined" value={stats.clubsJoined} />
      <StatCard title="Events Registered" value={stats.eventsRegistered} />
      <StatCard title="Certificates Earned" value={stats.certificatesEarned} />
      <StatCard title="Duty Leaves" value={stats.dutyLeaves} />
    </div>
  );
};

export default StudentDashboard;
