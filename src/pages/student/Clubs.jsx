import { useEffect, useState } from "react";
import Card from "../../components/ui/Card";

const Clubs = () => {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    // Mock data
    setClubs([
      {
        id: 1,
        name: "Coding Club",
        description: "Learn algorithms, MERN stack, and hackathons.",
      },
      {
        id: 2,
        name: "Robotics Club",
        description: "Build robots and compete nationally.",
      },
      {
        id: 3,
        name: "Design Club",
        description: "UI/UX, Figma workshops, branding.",
      },
    ]);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-8">Available Clubs</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {clubs.map((club) => (
          <Card key={club.id}>
            <h3 className="text-xl font-semibold mb-2">{club.name}</h3>
            <p className="text-gray-600 mb-4">{club.description}</p>
            <button className="btn-primary">View Details</button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Clubs;
