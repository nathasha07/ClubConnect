import { useEffect, useState } from "react";
import StatCard from "../../components/dashboard/StatCard";
import API from "../../services/api";

const StudentDashboard = () => {
  const [stats, setStats] = useState({
    clubsJoined: 0,
    eventsRegistered: 0,
    certificatesEarned: 0,
    dutyLeaves: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch my registrations
        const regResponse = await API.get("/registrations/my");
        const registrations = regResponse.data;

        // Count events registered
        const eventsRegistered = registrations.length;

        // Count approved certificates (assuming certificate is issued field)
        const certificatesEarned = registrations.filter(
          (reg) => reg.certificateIssued
        ).length;

        // TODO: Fetch actual clubs joined and duty leaves from respective endpoints
        setStats({
          clubsJoined: 0, // TODO: add clubs endpoint
          eventsRegistered,
          certificatesEarned,
          dutyLeaves: 0, // TODO: add duty leaves endpoint
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
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
