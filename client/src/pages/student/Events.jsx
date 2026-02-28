import { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import toast from "react-hot-toast";
import API from "../../services/api";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRegistrations = async () => {
    try {
      const registrationsResponse = await API.get("/registrations/my");
      const regs = Array.isArray(registrationsResponse.data) ? registrationsResponse.data : [];
      const registeredEventIds = regs.map(reg => {
        // Handle both populated and non-populated event objects
        return typeof reg.event === 'object' ? reg.event._id : reg.event;
      });
      setRegisteredEvents(registeredEventIds);
      console.log("Registered events:", registeredEventIds);
    } catch (error) {
      console.error("Error fetching registrations:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all events
        const eventsResponse = await API.get("/events");
        setEvents(eventsResponse.data);
        console.log("Events loaded:", eventsResponse.data.length);

        // Fetch user's existing registrations
        await fetchRegistrations();
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load events");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRegister = async (eventId) => {
    if (registeredEvents.includes(eventId)) {
      toast.error("Already registered");
      return;
    }

    try {
      const response = await API.post("/registrations", { eventId });
      console.log("Registration response:", response.data);
      
      // Immediately refetch registrations to sync with server
      await fetchRegistrations();
      toast.success("Registered successfully");
    } catch (error) {
      console.error("Error registering:", error);
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading events...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-8">Upcoming Events</h2>

      {events.length === 0 ? (
        <p className="text-gray-500">No events available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {events.map((event) => (
            <Card key={event._id}>
              <h3 className="text-xl font-semibold mb-2">{event.title}</h3>

              <p className="text-sm text-gray-500 mb-2">
                Organized by {event.createdBy?.name || "Admin"}
              </p>

              <p className="text-gray-600 mb-1">
                📅 {new Date(event.date).toLocaleDateString()}
              </p>

              <p className="text-gray-600 mb-1">📍 {event.venue}</p>

              <p className="text-gray-500 mb-4">
                Max Capacity: {event.maxParticipants}
              </p>

              <button
                onClick={() => handleRegister(event._id)}
                className={`w-full py-2 rounded-xl2 transition ${
                  registeredEvents.includes(event._id)
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "btn-primary"
                }`}
                disabled={registeredEvents.includes(event._id)}
              >
                {registeredEvents.includes(event._id) ? "Registered" : "Register"}
              </button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;
