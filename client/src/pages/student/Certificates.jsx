import { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import toast from "react-hot-toast";
import API from "../../services/api";

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        // TODO: Create GET /certificates/my endpoint
        // For now, fetch registrations and check certificateIssued
        const response = await API.get("/registrations/my");
        const registrations = response.data;

        const certs = registrations
          .filter((reg) => reg.certificateIssued)
          .map((reg) => ({
            _id: reg._id,
            eventTitle: reg.event?.title || "Event",
            date: reg.event?.date
              ? new Date(reg.event.date).toLocaleDateString()
              : "Date TBD",
            verificationCode: `CERT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            available: true,
          }));

        setCertificates(certs);
      } catch (error) {
        console.error("Error fetching certificates:", error);
        toast.error("Failed to load certificates");
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  const handleDownload = (cert) => {
    if (!cert.available) {
      toast.error("Certificate not available");
      return;
    }

    // TODO: Create API endpoint to generate PDF or get certificate URL
    toast.success(`Downloading certificate for ${cert.eventTitle}`);
  };

  if (loading) {
    return <div className="text-center py-8">Loading certificates...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-8">My Certificates</h2>

      {certificates.length === 0 ? (
        <Card>
          <p className="text-gray-500 text-center py-8">
            No certificates earned yet.
          </p>
        </Card>
      ) : (
        <div className="flex flex-col gap-6">
          {certificates.map((cert) => (
            <Card key={cert._id}>
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
      )}
    </div>
  );
};

export default Certificates;
