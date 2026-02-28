import { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import toast from "react-hot-toast";
import API from "../../services/api";
import { useParams } from "react-router-dom";

const EventRegistrations = () => {
  const { eventId } = useParams();
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        // TODO: Replace hardcoded eventId with actual eventId from URL params
        const response = await API.get(
          `/registrations/event/${eventId || "sample-event-id"}`
        );
        setRegistrations(response.data);
      } catch (error) {
        console.error("Error fetching registrations:", error);
        toast.error("Failed to load registrations");
      } finally {
        setLoading(false);
      }
    };

    if (eventId) {
      fetchRegistrations();
    } else {
      setLoading(false);
    }
  }, [eventId]);

  const toggleAttendance = async (id, currentAttendance) => {
    const newAttendance = currentAttendance === "Present" ? "Absent" : "Present";

    try {
      await API.put(`/registrations/${id}/attendance`, {
        attendance: newAttendance,
      });

      const updated = registrations.map((reg) =>
        reg._id === id ? { ...reg, attendance: newAttendance } : reg
      );

      setRegistrations(updated);
      toast.success("Attendance updated");
    } catch (error) {
      console.error("Error updating attendance:", error);
      toast.error("Failed to update attendance");
    }
  };

  const generateCertificate = async (id) => {
    try {
      // TODO: Create endpoint to generate/issue certificate
      const updated = registrations.map((reg) =>
        reg._id === id ? { ...reg, certificateIssued: true } : reg
      );

      setRegistrations(updated);
      toast.success("Certificate generated");
    } catch (error) {
      console.error("Error generating certificate:", error);
      toast.error("Failed to generate certificate");
    }
  };

  const statusColor = (status) => {
    if (status === "Present") return "text-green-600";
    if (status === "Absent") return "text-red-500";
    return "text-yellow-600";
  };

  if (loading) {
    return <div className="text-center py-8">Loading registrations...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-8">Event Registrations</h2>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b">
              <tr>
                <th className="py-3">Student Name</th>
                <th>Register Number</th>
                <th>Attendance</th>
                <th>Certificate</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {registrations.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-4 text-center text-gray-500">
                    No registrations found
                  </td>
                </tr>
              ) : (
                registrations.map((reg) => (
                  <tr
                    key={reg._id}
                    className="border-b hover:bg-lightPink/40 transition"
                  >
                    <td className="py-3">{reg.student?.name || "N/A"}</td>
                    <td>
                      {reg.student?.registerNumber || reg.student?.email}
                    </td>

                    <td className={`font-semibold ${statusColor(reg.attendance || "Pending")}`}>
                      {reg.attendance || "Pending"}
                    </td>

                    <td className="font-semibold">
                      {reg.certificateIssued ? (
                        <span className="text-green-600">Issued</span>
                      ) : (
                        <span className="text-gray-500">Not Issued</span>
                      )}
                    </td>

                    <td className="flex gap-2 py-2">
                      <button
                        onClick={() =>
                          toggleAttendance(reg._id, reg.attendance)
                        }
                        className="btn-primary px-3 py-1 text-sm"
                      >
                        Toggle
                      </button>

                      <button
                        onClick={() => generateCertificate(reg._id)}
                        disabled={
                          reg.attendance !== "Present" ||
                          reg.certificateIssued
                        }
                        className={`px-3 py-1 text-sm rounded-xl2 ${
                          reg.attendance === "Present" &&
                          !reg.certificateIssued
                            ? "btn-primary"
                            : "bg-gray-300 text-gray-600 cursor-not-allowed"
                        }`}
                      >
                        Generate
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default EventRegistrations;
