import { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import toast from "react-hot-toast";
import API from "../../services/api";

const ApproveCoordinators = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        // TODO: Create /coordinators/pending endpoint to fetch pending requests
        toast.info("Coordinator approval endpoint not yet available");
        setLoading(false);
      } catch (error) {
        console.error("Error fetching coordinator requests:", error);
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      // TODO: Create PUT /coordinators/:id/approve endpoint
      const updated = requests.map((req) =>
        req._id === id ? { ...req, status: newStatus } : req
      );

      setRequests(updated);
      toast.success(`Request ${newStatus.toLowerCase()}`);
    } catch (error) {
      console.error("Error updating coordinator status:", error);
      toast.error("Failed to update status");
    }
  };

  const statusColor = (status) => {
    if (status === "Approved") return "text-green-600";
    if (status === "Rejected") return "text-red-500";
    return "text-yellow-600";
  };

  if (loading) {
    return <div className="text-center py-8">Loading coordinator requests...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-8">Coordinator Role Requests</h2>

      <Card>
        {requests.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No coordinator requests.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b">
                <tr>
                  <th className="py-3">Name</th>
                  <th>Email</th>
                  <th>Department</th>
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
                    <td className="py-3 font-medium">{req.name}</td>
                    <td>{req.email}</td>
                    <td>{req.department}</td>

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
        )}
      </Card>
    </div>
  );
};

export default ApproveCoordinators;
