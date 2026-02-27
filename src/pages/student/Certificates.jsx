import { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import toast from "react-hot-toast";

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    // Mock data — future API: GET /certificates/my
    setCertificates([
      {
        id: 1,
        eventTitle: "Hackathon 2026",
        date: "March 10, 2026",
        verificationCode: "CERT-2026-001",
        available: true,
      },
      {
        id: 2,
        eventTitle: "Robotics Workshop",
        date: "March 15, 2026",
        verificationCode: null,
        available: false,
      },
    ]);
  }, []);

  const handleDownload = (cert) => {
    if (!cert.available) {
      toast.error("Certificate not available");
      return;
    }

    // Mock download
    toast.success(`Downloading certificate for ${cert.eventTitle}`);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-8">My Certificates</h2>

      <div className="flex flex-col gap-6">
        {certificates.map((cert) => (
          <Card key={cert.id}>
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div>
                <h3 className="text-lg font-semibold">{cert.eventTitle}</h3>
                <p className="text-gray-500 text-sm">{cert.date}</p>
                {cert.available && (
                  <p className="text-xs text-gray-400 mt-1">
                    Verification Code: {cert.verificationCode}
                  </p>
                )}
              </div>

              <button
                onClick={() => handleDownload(cert)}
                className={`px-5 py-2 rounded-xl2 transition ${
                  cert.available
                    ? "btn-primary"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }`}
                disabled={!cert.available}
              >
                {cert.available ? "Download" : "Not Available"}
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Certificates;
