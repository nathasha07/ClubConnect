import Event from "../models/Event.js";

// ✅ Create Event (Coordinator Only)
export const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      venue,
      category,
      maxParticipants
    } = req.body;

    // Basic validation
    if (!title || !date) {
      return res.status(400).json({
        message: "Title and Date are required"
      });
    }

    const event = await Event.create({
      title,
      description,
      date,
      venue,
      category,
      maxParticipants,
      createdBy: req.user._id   // Logged-in coordinator
    });

    res.status(201).json({
      message: "Event created successfully",
      event
    });

  } catch (error) {
    res.status(500).json({
      message: "Error creating event",
      error: error.message
    });
  }
};

// ✅ Get All Events
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate("createdBy", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json(events);

  } catch (error) {
    res.status(500).json({
      message: "Error fetching events",
      error: error.message
    });
  }
};