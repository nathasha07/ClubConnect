import { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import toast from "react-hot-toast";

const EventRegistrations = () => {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    setRegistrations([
      {
        id: 1,
        studentName: "John Doe",
        registerNumber: "23CS001",
        attendance: "Present",
        certificateIssued: false,
      },
      {
        id: 2,
        studentName: "Priya Sharma",
        registerNumber: "23CS002",
        attendance: "Absent",
        certificateIssued: false,
      },
      {
        id: 3,
        studentName: "Rahul Kumar",
        registerNumber: "23CS003",
        attendance: "Present",
        certificateIssued: true,
      },
    ]);
  }, []);

  const toggleAttendance = (id) => {
    const updated = registrations.map((reg) =>
      reg.id === id
        ? {
            ...reg,
            attendance: reg.attendance === "Present" ? "Absent" : "Present",
          }
        : reg,
    );

    setRegistrations(updated);
    toast.success("Attendance updated");
  };

  const generateCertificate = (id) => {
    const updated = registrations.map((reg) =>
      reg.id === id ? { ...reg, certificateIssued: true } : reg,
    );

    setRegistrations(updated);
    toast.success("Certificate generated");
  };

  const statusColor = (status) => {
    if (status === "Present") return "text-green-600";
    if (status === "Absent") return "text-red-500";
    return "text-yellow-600";
  };

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
              {registrations.map((reg) => (
                <tr
                  key={reg.id}
                  className="border-b hover:bg-lightPink/40 transition"
                >
                  <td className="py-3">{reg.studentName}</td>
                  <td>{reg.registerNumber}</td>

                  <td
                    className={`font-semibold ${statusColor(reg.attendance)}`}
                  >
                    {reg.attendance}
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
                      onClick={() => toggleAttendance(reg.id)}
                      className="btn-primary px-3 py-1 text-sm"
                    >
                      Toggle
                    </button>

                    <button
                      onClick={() => generateCertificate(reg.id)}
                      disabled={
                        reg.attendance !== "Present" || reg.certificateIssued
                      }
                      className={`px-3 py-1 text-sm rounded-xl2 ${
                        reg.attendance === "Present" && !reg.certificateIssued
                          ? "btn-primary"
                          : "bg-gray-300 text-gray-600 cursor-not-allowed"
                      }`}
                    >
                      Generate
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

export default EventRegistrations;
