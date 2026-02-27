import User from "../models/User.js";
import Event from "../models/Event.js";
import Registration from "../models/Registration.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: "Student" });
    const totalCoordinators = await User.countDocuments({ role: "Coordinator" });
    const totalEvents = await Event.countDocuments();
    const totalRegistrations = await Registration.countDocuments();

    res.json({
      totalStudents,
      totalCoordinators,
      totalEvents,
      totalRegistrations
    });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching dashboard data",
      error: error.message
    });
  }
};