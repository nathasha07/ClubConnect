import { useState } from "react";
import Card from "../../components/ui/Card";
import toast from "react-hot-toast";

const CreateEvent = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    venue: "",
    maxParticipants: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.date || !form.venue) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);

    // Mock API call
    setTimeout(() => {
      toast.success("Event created successfully");
      setLoading(false);

      setForm({
        title: "",
        description: "",
        date: "",
        venue: "",
        maxParticipants: "",
      });
    }, 1000);
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
