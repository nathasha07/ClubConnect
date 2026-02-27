import { useEffect, useState } from "react";
import Card from "../../components/ui/Card";

const ParticipationHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Mock aggregated data
    setHistory([
      {
        id: 1,
        eventTitle: "Hackathon 2026",
        date: "March 10, 2026",
        attendance: "Present",
        certificate: "Issued",
        dutyLeave: "Approved",
      },
      {
        id: 2,
        eventTitle: "Robotics Workshop",
        date: "March 15, 2026",
        attendance: "Absent",
        certificate: "Not Eligible",
        dutyLeave: "Rejected",
      },
      {
        id: 3,
        eventTitle: "UI/UX Bootcamp",
        date: "March 18, 2026",
        attendance: "Pending",
        certificate: "Pending",
        dutyLeave: "Pending",
      },
    ]);
  }, []);

  const statusColor = (status) => {
    if (status === "Present" || status === "Issued" || status === "Approved")
      return "text-green-600";
    if (status === "Absent" || status === "Rejected") return "text-red-500";
    return "text-yellow-600";
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-8">Participation History</h2>

      <div className="flex flex-col gap-6">
        {history.map((item) => (
          <Card key={item.id}>
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
    </div>
  );
};

export default ParticipationHistory;
