import Registration from "../models/Registration.js";
import Event from "../models/Event.js";

/* =====================================================
   1️⃣ Student Registers for Event
===================================================== */
export const registerForEvent = async (req, res) => {
  try {
    const { eventId } = req.body;

    if (!eventId) {
      return res.status(400).json({
        message: "Event ID is required"
      });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    const existing = await Registration.findOne({
      student: req.user._id,
      event: eventId
    });

    if (existing) {
      return res.status(400).json({
        message: "You have already registered for this event"
      });
    }

    // Auto-approve registration (no coordinator approval needed)
    const registration = await Registration.create({
      student: req.user._id,
      event: eventId,
      status: "Approved"  // Auto-approve for students
    });

    // Populate event details in response
    const populatedReg = await Registration.findById(registration._id).populate("event", "title date venue _id");

    res.status(201).json({
      message: "Registration successful",
      data: populatedReg
    });

  } catch (error) {
    res.status(500).json({
      message: "Registration failed",
      error: error.message
    });
  }
};

/* =====================================================
   2️⃣ Approve Registration
===================================================== */
export const approveRegistration = async (req, res) => {
  try {
    const { id } = req.params;

    const registration = await Registration.findById(id);

    if (!registration) {
      return res.status(404).json({
        message: "Registration not found"
      });
    }

    if (registration.status !== "Pending") {
      return res.status(400).json({
        message: "Only pending registrations can be approved"
      });
    }

    registration.status = "Approved";
    await registration.save();

    res.json({
      message: "Registration approved successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Approval failed",
      error: error.message
    });
  }
};

/* =====================================================
   3️⃣ Reject Registration
===================================================== */
export const rejectRegistration = async (req, res) => {
  try {
    const { id } = req.params;

    const registration = await Registration.findById(id);

    if (!registration) {
      return res.status(404).json({
        message: "Registration not found"
      });
    }

    if (registration.status !== "Pending") {
      return res.status(400).json({
        message: "Only pending registrations can be rejected"
      });
    }

    registration.status = "Rejected";
    await registration.save();

    res.json({
      message: "Registration rejected successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Rejection failed",
      error: error.message
    });
  }
};

/* =====================================================
   4️⃣ Mark Attendance (Coordinator)
===================================================== */
export const markAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const { attendance } = req.body;

    if (!["Present", "Absent"].includes(attendance)) {
      return res.status(400).json({
        message: "Attendance must be Present or Absent"
      });
    }

    const registration = await Registration.findById(id);

    if (!registration) {
      return res.status(404).json({
        message: "Registration not found"
      });
    }

    if (registration.status !== "Approved") {
      return res.status(400).json({
        message: "Only approved students can be marked"
      });
    }

    registration.attendance = attendance;
    await registration.save();

    res.json({
      message: "Attendance updated successfully",
      data: registration
    });

  } catch (error) {
    res.status(500).json({
      message: "Error marking attendance",
      error: error.message
    });
  }
};

/* =====================================================
   5️⃣ Get Registrations for an Event
===================================================== */
export const getEventRegistrations = async (req, res) => {
  try {
    const { eventId } = req.params;

    const registrations = await Registration.find({
      event: eventId
    })
      .populate("student", "name email role")
      .populate("event", "title date")
      .sort({ createdAt: -1 });

    res.json({
      count: registrations.length,
      data: registrations
    });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching registrations",
      error: error.message
    });
  }
};

/* =====================================================
   6️⃣ Get Attendance for Event
===================================================== */
export const getAttendanceByEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    const attendanceList = await Registration.find({
      event: eventId
    })
      .populate("student", "name email")
      .select("student status attendance");

    res.json({
      count: attendanceList.length,
      data: attendanceList
    });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching attendance",
      error: error.message
    });
  }
};

/* =====================================================
   7️⃣ Student View Own Registrations
===================================================== */
export const getMyRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find({
      student: req.user._id
    })
      .populate("event", "title date venue _id")
      .sort({ createdAt: -1 });

    res.json(registrations);

  } catch (error) {
    res.status(500).json({
      message: "Error fetching your registrations",
      error: error.message
    });
  }
};