import { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import API from "../../services/api";

const ParticipationHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // Fetch registrations and aggregate data
        const response = await API.get("/registrations/my");
        const registrations = response.data;

        const aggregated = registrations.map((reg) => ({
          _id: reg._id,
          eventTitle: reg.event?.title || "Event",
          date: reg.event?.date
            ? new Date(reg.event.date).toLocaleDateString()
            : "Date TBD",
          attendance: reg.attendance || "Pending",
          certificate: reg.certificateIssued ? "Issued" : "Not Eligible",
          dutyLeave: "Pending", // TODO: Fetch from duty leave endpoint
        }));

        setHistory(aggregated);
      } catch (error) {
        console.error("Error fetching participation history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const statusColor = (status) => {
    if (status === "Present" || status === "Issued" || status === "Approved")
      return "text-green-600";
    if (status === "Absent" || status === "Rejected") return "text-red-500";
    return "text-yellow-600";
  };

  if (loading) {
    return <div className="text-center py-8">Loading participation history...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-8">Participation History</h2>

      {history.length === 0 ? (
        <Card>
          <p className="text-gray-500 text-center py-8">
            No participation history yet.
          </p>
        </Card>
      ) : (
        <div className="flex flex-col gap-6">
          {history.map((item) => (
            <Card key={item._id}>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                <div>
                  <h3 className="font-semibold">{item.eventTitle}</h3>
                  <p className="text-sm text-gray-500">{item.date}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Attendance</p>
                  <p className={`font-semibold ${statusColor(item.attendance)}`}>
                    {item.attendance}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Certificate</p>
                  <p className={`font-semibold ${statusColor(item.certificate)}`}>
                    {item.certificate}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Duty Leave</p>
                  <p className={`font-semibold ${statusColor(item.dutyLeave)}`}>
                    {item.dutyLeave}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Final Status</p>
                  <p className="font-semibold text-primary">
                    {item.attendance === "Present" ? "Completed" : "Incomplete"}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ParticipationHistory;
