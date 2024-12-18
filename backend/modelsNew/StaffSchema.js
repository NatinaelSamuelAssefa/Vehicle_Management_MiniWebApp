import mongoose from "mongoose";

const StaffSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: Number },
  photo: { type: String }, 
  role: { type: String, default: "StaffUser" },
  gender: { type: String, enum: ["Male", "Female"] },
  workPosition: { type: String },
  appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
});

export default mongoose.model("Staff", StaffSchema);
