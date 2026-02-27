import { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import toast from "react-hot-toast";

const ApproveCoordinators = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Mock pending coordinator requests
    setRequests([
      {
        id: 1,
        name: "Ananya Pillai",
        email: "ananya@college.edu",
        department: "CSE",
        status: "Pending",
      },
      {
        id: 2,
        name: "Karthik Raj",
        email: "karthik@college.edu",
        department: "IT",
        status: "Approved",
      },
      {
        id: 3,
        name: "Sneha Nair",
        email: "sneha@college.edu",
        department: "ECE",
        status: "Rejected",
      },
    ]);
  }, []);

  const updateStatus = (id, newStatus) => {
    const updated = requests.map((req) =>
      req.id === id ? { ...req, status: newStatus } : req,
    );

    setRequests(updated);
    toast.success(`Request ${newStatus.toLowerCase()}`);
  };

  const statusColor = (status) => {
    if (status === "Approved") return "text-green-600";
    if (status === "Rejected") return "text-red-500";
    return "text-yellow-600";
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-8">Coordinator Role Requests</h2>

      <Card>
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
                  key={req.id}
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
                      onClick={() => updateStatus(req.id, "Approved")}
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
                      onClick={() => updateStatus(req.id, "Rejected")}
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
    </div>
  );
};

export default ApproveCoordinators;
