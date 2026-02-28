import { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import API from "../../services/api";
import toast from "react-hot-toast";

const Clubs = () => {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        // TODO: Create GET /clubs endpoint in backend
        toast.info("Clubs endpoint not yet available");
        setLoading(false);
      } catch (error) {
        console.error("Error fetching clubs:", error);
        setLoading(false);
      }
    };

    fetchClubs();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading clubs...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-8">Available Clubs</h2>

      {clubs.length === 0 ? (
        <Card>
          <p className="text-gray-500 text-center py-8">
            No clubs available. Check back later!
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {clubs.map((club) => (
            <Card key={club._id}>
              <h3 className="text-xl font-semibold mb-2">{club.name}</h3>
              <p className="text-gray-600 mb-4">{club.description}</p>
              <button className="btn-primary">View Details</button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Clubs;
