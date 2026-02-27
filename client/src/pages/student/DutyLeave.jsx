import { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import toast from "react-hot-toast";

const DutyLeave = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Mock data — future API: GET /dutyleave/my
    setRequests([
      {
        id: 1,
        eventTitle: "Hackathon 2026",
        date: "March 10, 2026",
        status: "Approved",
        documentAvailable: true,
      },
      {
        id: 2,
        eventTitle: "Robotics Workshop",
        date: "March 15, 2026",
        status: "Pending",
        documentAvailable: false,
      },
      {
        id: 3,
        eventTitle: "UI/UX Bootcamp",
        date: "March 18, 2026",
        status: "Rejected",
        documentAvailable: false,
      },
    ]);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "text-green-600";
      case "Rejected":
        return "text-red-500";
      default:
        return "text-yellow-600";
    }
  };

  const handleDownload = (req) => {
    if (!req.documentAvailable) {
      toast.error("Document not available yet");
      return;
    }

    toast.success(`Downloading duty leave for ${req.eventTitle}`);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-8">Duty Leave Requests</h2>

      <div className="flex flex-col gap-6">
        {requests.map((req) => (
          <Card key={req.id}>
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div>
                <h3 className="text-lg font-semibold">{req.eventTitle}</h3>
                <p className="text-gray-500 text-sm">{req.date}</p>
              </div>

              <div className="flex items-center gap-8">
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p className={`font-semibold ${getStatusColor(req.status)}`}>
                    {req.status}
                  </p>
                </div>

                <button
                  onClick={() => handleDownload(req)}
                  disabled={!req.documentAvailable}
                  className={`px-5 py-2 rounded-xl2 transition ${
                    req.documentAvailable
                      ? "btn-primary"
                      : "bg-gray-300 text-gray-600 cursor-not-allowed"
                  }`}
                >
                  {req.documentAvailable ? "Download" : "Unavailable"}
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DutyLeave;
