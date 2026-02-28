import { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import API from "../../services/api";

const Registrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await API.get("/registrations/my");
        setRegistrations(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching registrations:", error);
        setRegistrations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Present":
        return "text-green-600";
      case "Absent":
        return "text-red-500";
      case "Approved":
        return "text-green-600";
      default:
        return "text-yellow-600";
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading registrations...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-8">My Event Registrations</h2>

      {registrations.length === 0 ? (
        <p className="text-gray-500">No registrations yet</p>
      ) : (
        <div className="flex flex-col gap-6">
          {registrations.map((reg) => (
            <Card key={reg._id}>
              <div className="flex justify-between items-center flex-wrap gap-4">
                <div>
                  <h3 className="text-lg font-semibold">
                    {reg.event?.title || "Event"}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {reg.event?.date
                      ? new Date(reg.event.date).toLocaleDateString()
                      : "Date TBD"}
                  </p>
                </div>

                <div className="flex gap-6 items-center">
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p
                      className={`font-semibold ${getStatusColor(
                        reg.status
                      )}`}
                    >
                      {reg.status}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Attendance</p>
                    <p className="font-semibold">
                      {reg.attendance || "Pending"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Certificate</p>
                    <p className="font-semibold">
                      {reg.certificateIssued ? "Issued" : "Not Issued"}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Registrations;
