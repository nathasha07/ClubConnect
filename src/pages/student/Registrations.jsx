import { useEffect, useState } from "react";
import Card from "../../components/ui/Card";

const Registrations = () => {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    // Mock data — future API: GET /registrations/my
    setRegistrations([
      {
        id: 1,
        eventTitle: "Hackathon 2026",
        date: "March 10, 2026",
        attendance: "Present",
        certificate: true,
      },
      {
        id: 2,
        eventTitle: "Robotics Workshop",
        date: "March 15, 2026",
        attendance: "Absent",
        certificate: false,
      },
      {
        id: 3,
        eventTitle: "UI/UX Bootcamp",
        date: "March 18, 2026",
        attendance: "Pending",
        certificate: false,
      },
    ]);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Present":
        return "text-green-600";
      case "Absent":
        return "text-red-500";
      default:
        return "text-yellow-600";
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-8">My Event Registrations</h2>

      <div className="flex flex-col gap-6">
        {registrations.map((reg) => (
          <Card key={reg.id}>
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div>
                <h3 className="text-lg font-semibold">{reg.eventTitle}</h3>
                <p className="text-gray-500 text-sm">{reg.date}</p>
              </div>

              <div className="flex gap-6 items-center">
                <div>
                  <p className="text-sm text-gray-500">Attendance</p>
                  <p
                    className={`font-semibold ${getStatusColor(reg.attendance)}`}
                  >
                    {reg.attendance}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Certificate</p>
                  <p className="font-semibold">
                    {reg.certificate ? "Available" : "Not Eligible"}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Registrations;
