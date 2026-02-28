import { useState, useEffect } from "react";
import Card from "../../components/ui/Card";
import toast from "react-hot-toast";
import API from "../../services/api";

const CreateEvent = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    venue: "",
    maxParticipants: "",
    category: "",
    club: "",
  });

  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingClubs, setLoadingClubs] = useState(true);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        setLoadingClubs(true);
        const response = await API.get("/clubs");
        setClubs(response.data);
      } catch (error) {
        console.error("Error fetching clubs:", error);
        toast.error("Failed to load clubs");
      } finally {
        setLoadingClubs(false);
      }
    };

    fetchClubs();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.date || !form.venue) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      const response = await API.post("/events", {
        title: form.title,
        description: form.description,
        date: form.date,
        venue: form.venue,
        maxParticipants: parseInt(form.maxParticipants) || 0,
        category: form.category,
        club: form.club || undefined,
      });

      toast.success("Event created successfully! It is pending admin approval.");

      setForm({
        title: "",
        description: "",
        date: "",
        venue: "",
        maxParticipants: "",
        category: "",
        club: "",
      });
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error(error.response?.data?.message || "Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-8">Create New Event</h2>

      <Card>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Event Title *
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full p-3 rounded-xl2 border border-gray-200 focus:outline-primary"
              placeholder="Enter event title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              className="w-full p-3 rounded-xl2 border border-gray-200 focus:outline-primary"
              placeholder="Event description"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Date *</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full p-3 rounded-xl2 border border-gray-200 focus:outline-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Venue *</label>
              <input
                type="text"
                name="venue"
                value={form.venue}
                onChange={handleChange}
                className="w-full p-3 rounded-xl2 border border-gray-200 focus:outline-primary"
                placeholder="Event venue"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Max Participants
              </label>
              <input
                type="number"
                name="maxParticipants"
                value={form.maxParticipants}
                onChange={handleChange}
                className="w-full p-3 rounded-xl2 border border-gray-200 focus:outline-primary"
                placeholder="Enter maximum participants"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <input
                type="text"
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full p-3 rounded-xl2 border border-gray-200 focus:outline-primary"
                placeholder="Event category"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Associated Club (Optional)
            </label>
            {loadingClubs ? (
              <p className="text-sm text-gray-500">Loading clubs...</p>
            ) : (
              <select
                name="club"
                value={form.club}
                onChange={handleChange}
                className="w-full p-3 rounded-xl2 border border-gray-200 focus:outline-primary"
              >
                <option value="">Select a club (optional)</option>
                {clubs.map((club) => (
                  <option key={club._id} value={club._id}>
                    {club.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? "Creating..." : "Create Event"}
          </button>
        </form>
      </Card>
    </div>
  );
};

export default CreateEvent;
