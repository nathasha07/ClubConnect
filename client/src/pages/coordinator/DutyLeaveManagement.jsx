import { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import toast from "react-hot-toast";
import API from "../../services/api";

const DutyLeaveManagement = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        // TODO: Create /dutyleave endpoint to fetch duty leave requests
        // For now, this page has no backend support
        toast.info("Duty leave management endpoint not yet available");
        setLoading(false);
      } catch (error) {
        console.error("Error fetching duty leave requests:", error);
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      // TODO: Create PUT /dutyleave/:id endpoint
      const updated = requests.map((req) =>
        req._id === id ? { ...req, status: newStatus } : req
      );

      setRequests(updated);
      toast.success(`Duty leave ${newStatus.toLowerCase()}`);
    } catch (error) {
      console.error("Error updating duty leave:", error);
      toast.error("Failed to update status");
    }
  };

  const statusColor = (status) => {
    if (status === "Approved") return "text-green-600";
    if (status === "Rejected") return "text-red-500";
    return "text-yellow-600";
  };

  if (loading) {
    return (
      <div className="text-center py-8">Loading duty leave requests...</div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-8">Duty Leave Management</h2>

      {requests.length === 0 ? (
        <Card>
          <p className="text-gray-500 text-center py-8">
            No duty leave requests yet.
          </p>
        </Card>
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b">
                <tr>
                  <th className="py-3">Student</th>
                  <th>Register No</th>
                  <th>Event</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {requests.map((req) => (
                  <tr
                    key={req._id}
                    className="border-b hover:bg-lightPink/40 transition"
                  >
                    <td className="py-3">{req.studentName}</td>
                    <td>{req.registerNumber}</td>
                    <td>{req.eventTitle}</td>

                    <td className={`font-semibold ${statusColor(req.status)}`}>
                      {req.status}
                    </td>

                    <td className="flex gap-2 py-2">
                      <button
                        onClick={() => updateStatus(req._id, "Approved")}
                        disabled={req.status !== "Pending"}
                        className={`px-3 py-1 text-sm rounded-xl2 ${
                          req.status === "Pending"
                            ? "btn-primary"
                            : "bg-gray-300 text-gray-600 cursor-not-allowed"
                        }`}
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => updateStatus(req._id, "Rejected")}
                        disabled={req.status !== "Pending"}
                        className={`px-3 py-1 text-sm rounded-xl2 ${
                          req.status === "Pending"
                            ? "bg-red-500 text-white hover:bg-red-600"
                            : "bg-gray-300 text-gray-600 cursor-not-allowed"
                        }`}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
};

export default DutyLeaveManagement;
