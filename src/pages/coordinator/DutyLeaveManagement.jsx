import { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import toast from "react-hot-toast";

const DutyLeaveManagement = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Mock data
    setRequests([
      {
        id: 1,
        studentName: "John Doe",
        registerNumber: "23CS001",
        eventTitle: "Hackathon 2026",
        status: "Pending",
      },
      {
        id: 2,
        studentName: "Priya Sharma",
        registerNumber: "23CS002",
        eventTitle: "Robotics Workshop",
        status: "Approved",
      },
      {
        id: 3,
        studentName: "Rahul Kumar",
        registerNumber: "23CS003",
        eventTitle: "UI/UX Bootcamp",
        status: "Rejected",
      },
    ]);
  }, []);

  const updateStatus = (id, newStatus) => {
    const updated = requests.map((req) =>
      req.id === id ? { ...req, status: newStatus } : req,
    );

    setRequests(updated);
    toast.success(`Duty leave ${newStatus.toLowerCase()}`);
  };

  const statusColor = (status) => {
    if (status === "Approved") return "text-green-600";
    if (status === "Rejected") return "text-red-500";
    return "text-yellow-600";
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-8">Duty Leave Management</h2>

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
                  key={req.id}
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

export default DutyLeaveManagement;
