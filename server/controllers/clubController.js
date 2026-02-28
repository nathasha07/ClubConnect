import Club from "../models/Club.js";
import User from "../models/User.js";

/* =====================================================
   🏢 CREATE CLUB (Admin Only)
===================================================== */
export const createClub = async (req, res) => {
  try {
    const { name, description, category, facultyCoordinator } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Club name is required"
      });
    }

    const existingClub = await Club.findOne({ name });
    if (existingClub) {
      return res.status(400).json({
        message: "Club with this name already exists"
      });
    }

    // If facultyCoordinator is provided as an email, look up the user
    let coordinatorId = facultyCoordinator;
    if (facultyCoordinator && !facultyCoordinator.match(/^[0-9a-fA-F]{24}$/)) {
      // It's an email, not an ObjectId
      const coordinator = await User.findOne({ email: facultyCoordinator });
      if (!coordinator) {
        return res.status(404).json({
          message: "Faculty coordinator not found"
        });
      }
      coordinatorId = coordinator._id;
    }

    const club = await Club.create({
      name,
      description,
      category,
      facultyCoordinator: coordinatorId || null
    });

    res.status(201).json({
      message: "Club created successfully",
      club
    });

  } catch (error) {
    console.error("Error creating club:", error);
    res.status(500).json({
      message: "Error creating club",
      error: error.message
    });
  }
};

/* =====================================================
   📋 GET ALL CLUBS
===================================================== */
export const getAllClubs = async (req, res) => {
  try {
    const clubs = await Club.find()
      .populate("facultyCoordinator", "name email")
      .populate("members", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(clubs);

  } catch (error) {
    res.status(500).json({
      message: "Error fetching clubs",
      error: error.message
    });
  }
};

/* =====================================================
   📖 GET CLUB BY ID
===================================================== */
export const getClubById = async (req, res) => {
  try {
    const { id } = req.params;

    const club = await Club.findById(id)
      .populate("facultyCoordinator", "name email")
      .populate("members", "name email");

    if (!club) {
      return res.status(404).json({
        message: "Club not found"
      });
    }

    res.status(200).json(club);

  } catch (error) {
    res.status(500).json({
      message: "Error fetching club",
      error: error.message
    });
  }
};

/* =====================================================
   ✏️ UPDATE CLUB
===================================================== */
export const updateClub = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, category, facultyCoordinator, status } = req.body;

    const club = await Club.findByIdAndUpdate(
      id,
      {
        name,
        description,
        category,
        facultyCoordinator,
        status
      },
      { new: true }
    ).populate("facultyCoordinator", "name email");

    if (!club) {
      return res.status(404).json({
        message: "Club not found"
      });
    }

    res.status(200).json({
      message: "Club updated successfully",
      club
    });

  } catch (error) {
    res.status(500).json({
      message: "Error updating club",
      error: error.message
    });
  }
};

/* =====================================================
   🗑️ DELETE CLUB
===================================================== */
export const deleteClub = async (req, res) => {
  try {
    const { id } = req.params;

    const club = await Club.findByIdAndDelete(id);

    if (!club) {
      return res.status(404).json({
        message: "Club not found"
      });
    }

    res.status(200).json({
      message: "Club deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Error deleting club",
      error: error.message
    });
  }
};

/* =====================================================
   👥 ADD MEMBER TO CLUB
===================================================== */
export const addMemberToClub = async (req, res) => {
  try {
    const { clubId, userId } = req.body;

    const club = await Club.findById(clubId);
    if (!club) {
      return res.status(404).json({
        message: "Club not found"
      });
    }

    if (club.members.includes(userId)) {
      return res.status(400).json({
        message: "User is already a member"
      });
    }

    club.members.push(userId);
    await club.save();

    res.status(200).json({
      message: "Member added successfully",
      club
    });

  } catch (error) {
    res.status(500).json({
      message: "Error adding member",
      error: error.message
    });
  }
};
