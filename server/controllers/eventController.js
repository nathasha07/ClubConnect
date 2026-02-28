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
      maxParticipants,
      club
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
      club,
      createdBy: req.user._id,   // Logged-in coordinator
      approvalStatus: "Pending"   // Default to pending
    });

    res.status(201).json({
      message: "Event created successfully. Awaiting admin approval.",
      event
    });

  } catch (error) {
    res.status(500).json({
      message: "Error creating event",
      error: error.message
    });
  }
};

// ✅ Get All Events (only approved events visible to students)
export const getEvents = async (req, res) => {
  try {
    const { all } = req.query; // if all=true, show all events (for admins)

    let query = all ? {} : { approvalStatus: "Approved" };

    const events = await Event.find(query)
      .populate("createdBy", "name email role")
      .populate("club", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(events);

  } catch (error) {
    res.status(500).json({
      message: "Error fetching events",
      error: error.message
    });
  }
};

// ✅ Get Pending Events (for admin approval)
export const getPendingEvents = async (req, res) => {
  try {
    const events = await Event.find({ approvalStatus: "Pending" })
      .populate("createdBy", "name email role")
      .populate("club", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(events);

  } catch (error) {
    res.status(500).json({
      message: "Error fetching pending events",
      error: error.message
    });
  }
};

// ✅ Approve Event (Admin Only)
export const approveEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { approvalComment } = req.body;

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    if (event.approvalStatus !== "Pending") {
      return res.status(400).json({
        message: "Only pending events can be approved"
      });
    }

    event.approvalStatus = "Approved";
    event.approvedBy = req.user._id;
    event.approvalComment = approvalComment;
    await event.save();

    res.status(200).json({
      message: "Event approved successfully",
      event
    });

  } catch (error) {
    res.status(500).json({
      message: "Error approving event",
      error: error.message
    });
  }
};

// ✅ Reject Event (Admin Only)
export const rejectEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { approvalComment } = req.body;

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    if (event.approvalStatus !== "Pending") {
      return res.status(400).json({
        message: "Only pending events can be rejected"
      });
    }

    event.approvalStatus = "Rejected";
    event.approvedBy = req.user._id;
    event.approvalComment = approvalComment;
    await event.save();

    res.status(200).json({
      message: "Event rejected successfully",
      event
    });

  } catch (error) {
    res.status(500).json({
      message: "Error rejecting event",
      error: error.message
    });
  }
};