import Staff from "../modelsNew/StaffSchema.js";

// Update staff
export const updateStaff = async (req, res) => {
  const id = req.params.id;

  try {
    const staff = await Staff.findById(id);
    if (!staff) {
      return res.status(404).json({ success: false, message: "Staff not found" });
    }

    const updatedStaff = await Staff.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Staff updated successfully",
      data: updatedStaff,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update staff" });
  }
};

// Delete staff
export const deleteStaff = async (req, res) => {
  const id = req.params.id;

  try {
    const staff = await Staff.findById(id);
    if (!staff) {
      return res.status(404).json({ success: false, message: "Staff not found" });
    }

    await Staff.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Staff deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete staff" });
  }
};

// Get single user
export const getSingleStaff = async (req, res) => {
  const id = req.params.id;

  try {
    const staff = await Staff.findById(id).select("-password");
    if (!staff) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "Staff retrieved successfully",
      data: staff,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to retrieve user" });
  }
};

// Get all staff
export const getAllStaff = async (req, res) => {
  try {
    const staff = await Staff.find({}).select("-password");

    res.status(200).json({
      success: true,
      message: "Staff retrieved successfully",
      data: staff,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to retrieve staff" });
  }
};

// Get staff profile
export const getStaffProfile = async (req, res) => {
  const staffId = req.staffId;

  try {
    const staff = await Staff.findById(staffId);
    if (!staff) {
      return res.status(404).json({ success: false, message: "Staff not found" });
    }

    const { password, ...rest } = staff.toObject();

    res.status(200).json({
      success: true,
      message: "Profile retrieved successfully",
      data: rest,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to retrieve profile" });
  }
};
