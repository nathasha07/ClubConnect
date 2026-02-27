import { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import toast from "react-hot-toast";

const ApproveClubs = () => {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    // Mock pending clubs
    setClubs([
      {
        id: 1,
        name: "AI Research Club",
        department: "CSE",
        facultyCoordinator: "Dr. Meera Nair",
        status: "Pending",
      },
      {
        id: 2,
        name: "Entrepreneurship Cell",
        department: "MBA",
        facultyCoordinator: "Prof. Arjun Rao",
        status: "Approved",
      },
      {
        id: 3,
        name: "Cyber Security Club",
        department: "IT",
        facultyCoordinator: "Dr. Raghav Menon",
        status: "Rejected",
      },
    ]);
  }, []);

  const updateStatus = (id, newStatus) => {
    const updated = clubs.map((club) =>
      club.id === id ? { ...club, status: newStatus } : club,
    );

    setClubs(updated);
    toast.success(`Club ${newStatus.toLowerCase()}`);
  };

  const statusColor = (status) => {
    if (status === "Approved") return "text-green-600";
    if (status === "Rejected") return "text-red-500";
    return "text-yellow-600";
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-8">Club Approval Requests</h2>

      <Card>
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
                  key={club.id}
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
                      onClick={() => updateStatus(club.id, "Approved")}
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
                      onClick={() => updateStatus(club.id, "Rejected")}
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
      </Card>
    </div>
  );
};

export default ApproveClubs;
