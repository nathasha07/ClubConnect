import { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import toast from "react-hot-toast";
import API from "../../services/api";

const ApproveClubs = () => {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        // TODO: Create /clubs endpoint in backend to fetch pending clubs
        toast.info("Clubs endpoint not yet available");
        setLoading(false);
      } catch (error) {
        console.error("Error fetching clubs:", error);
        setLoading(false);
      }
    };

    fetchClubs();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      // TODO: Create PUT /clubs/:id/approve endpoint
      const updated = clubs.map((club) =>
        club._id === id ? { ...club, status: newStatus } : club
      );

      setClubs(updated);
      toast.success(`Club ${newStatus.toLowerCase()}`);
    } catch (error) {
      console.error("Error updating club status:", error);
      toast.error("Failed to update club status");
    }
  };

  const statusColor = (status) => {
    if (status === "Approved") return "text-green-600";
    if (status === "Rejected") return "text-red-500";
    return "text-yellow-600";
  };

  if (loading) {
    return <div className="text-center py-8">Loading club requests...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-8">Club Approval Requests</h2>

      <Card>
        {clubs.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No club requests.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b">
                <tr>
                  <th className="py-3">Club Name</th>
                  <th>Department</th>
                  <th>Faculty Coordinator</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {clubs.map((club) => (
                  <tr
                    key={club._id}
                    className="border-b hover:bg-lightPink/40 transition"
                  >
                    <td className="py-3 font-medium">{club.name}</td>
                    <td>{club.department}</td>
                    <td>{club.facultyCoordinator}</td>

                    <td className={`font-semibold ${statusColor(club.status)}`}>
                      {club.status}
                    </td>

                    <td className="flex gap-2 py-2">
                      <button
                        onClick={() => updateStatus(club._id, "Approved")}
                        disabled={club.status !== "Pending"}
                        className={`px-3 py-1 text-sm rounded-xl2 ${
                          club.status === "Pending"
                            ? "btn-primary"
                            : "bg-gray-300 text-gray-600 cursor-not-allowed"
                        }`}
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => updateStatus(club._id, "Rejected")}
                        disabled={club.status !== "Pending"}
                        className={`px-3 py-1 text-sm rounded-xl2 ${
                          club.status === "Pending"
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

export default ApproveClubs;
