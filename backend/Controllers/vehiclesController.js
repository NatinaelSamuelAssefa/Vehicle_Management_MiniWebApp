import Vehicles from "../modelsNew/VechelesSchema.js"; 
import mongoose from 'mongoose'; 

// Update Vechele Information
export const updateVehicle = async (req, res) => {
  const id = req.params.id;

  // Validate ObjectId format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid ID" });
  }

  try {
    const updatedVehicle = await Vehicles.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedVehicle) {
      return res.status(404).json({ success: false, message: "Vechele not found" });
    }

    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedVehicle,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update" });
  }
};

// Delete Vechele
export const deleteVehicle = async (req, res) => {
  const id = req.params.id;

  // Validate ObjectId format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid ID" });
  }

  try {
    const deletedVehicle = await Vehicles.findByIdAndDelete(id);

    if (!deletedVehicle) {
      return res.status(404).json({ success: false, message: "Vechele not found" });
    }

    res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete" });
  }
};

// Get Single Vechele by ID
export const getSingleVehicle = async (req, res) => {
  const id = req.params.id;

  // Validate ObjectId format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid ID" });
  }

  try {
    const vechele = await Vehicles.findById(id)
      .populate("reviews"); // Assuming 'reviews' is a populated field

    if (!vechele) {
      return res.status(404).json({ success: false, message: "Vechele not found" });
    }

    res.status(200).json({
      success: true,
      message: "Vechele Found",
      data: vechele,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching vechele" });
  }
};

// Get All Vehicles (Optional: With Search Query)
export const getAllVehicles = async (req, res) => {
  try {
    const query = req.query.query; // Capture query parameter
    let vehicles;

    if (query) {
      vehicles = await Vehicles.find({
        $or: [
          { name: { $regex: query, $options: "i" } }, // Search by name (case-insensitive)
          { model: { $regex: query, $options: "i" } }, // Search by model (case-insensitive)
        ],
      });
    } else {
      vehicles = await Vehicles.find(); // Fetch all vehicles
    }

    res.status(200).json({
      success: true,
      message: "Vehicles Found",
      data: vehicles,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Vehicles not found" });
  }
};

// Get Vechele Profile (Authenticated User Profile)
export const getVehicleProfile = async (req, res) => {
  const vehicleId = req.userId;

  // Validate ObjectId format
  if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
    return res.status(400).json({ success: false, message: "Invalid ID" });
  }

  try {
    const vechele = await Vehicles.findById(vehicleId);

    if (!vechele) {
      return res.status(404).json({ success: false, message: "Vechele not found" });
    }

    res.status(200).json({
      success: true,
      message: "Vechele profile fetched",
      data: vechele,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Something went wrong, cannot fetch profile" });
  }
};
