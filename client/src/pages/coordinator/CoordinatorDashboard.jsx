import { useEffect, useState } from "react";
import StatCard from "../../components/dashboard/StatCard";
import API from "../../services/api";

const CoordinatorDashboard = () => {
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalRegistrations: 0,
    attendanceMarked: 0,
    certificatesIssued: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // TODO: Create a dedicated /coordinator/dashboard endpoint that returns these stats
        // For now, we can fetch events and calculate registration stats
        const eventsResponse = await API.get("/events");
        const events = eventsResponse.data;

        // TODO: Fetch registrations for coordinator's events to get accurate counts
        setStats({
          totalEvents: events.length,
          totalRegistrations: 0, // TODO: fetch from registrations endpoint
          attendanceMarked: 0, // TODO: fetch from attendance endpoint
          certificatesIssued: 0, // TODO: fetch from certificates endpoint
        });
      } catch (error) {
        console.error("Error fetching coordinator dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
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
