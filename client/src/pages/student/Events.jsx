import { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import toast from "react-hot-toast";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);

  useEffect(() => {
    // Mock event data
    setEvents([
      {
        id: 1,
        title: "Hackathon 2026",
        club: "Coding Club",
        date: "March 10, 2026",
        venue: "Auditorium",
        seats: 100,
      },
      {
        id: 2,
        title: "Robotics Workshop",
        club: "Robotics Club",
        date: "March 15, 2026",
        venue: "Lab 3",
        seats: 40,
      },
      {
        id: 3,
        title: "UI/UX Bootcamp",
        club: "Design Club",
        date: "March 18, 2026",
        venue: "Seminar Hall",
        seats: 60,
      },
    ]);
  }, []);

  const handleRegister = (eventId) => {
    if (registeredEvents.includes(eventId)) {
      toast.error("Already registered");
      return;
    }

    setRegisteredEvents([...registeredEvents, eventId]);
    toast.success("Registered successfully");
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-8">Upcoming Events</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {events.map((event) => (
          <Card key={event.id}>
            <h3 className="text-xl font-semibold mb-2">{event.title}</h3>

            <p className="text-sm text-gray-500 mb-2">
              Organized by {event.club}
            </p>

            <p className="text-gray-600 mb-1">📅 {event.date}</p>

            <p className="text-gray-600 mb-1">📍 {event.venue}</p>

            <p className="text-gray-500 mb-4">Seats Available: {event.seats}</p>

            <button
              onClick={() => handleRegister(event.id)}
              className={`w-full py-2 rounded-xl2 transition ${
                registeredEvents.includes(event.id)
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "btn-primary"
              }`}
              disabled={registeredEvents.includes(event.id)}
            >
              {registeredEvents.includes(event.id) ? "Registered" : "Register"}
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Events;
