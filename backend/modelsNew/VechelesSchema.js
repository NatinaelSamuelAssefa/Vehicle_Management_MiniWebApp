import mongoose from "mongoose";

const VechelesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  photo: { type: String },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  date: { type: Date, default: Date.now },
  about: { type: String },
  reviews: [{ type: mongoose.Types.ObjectId, ref: "Review" }],
  averageRating: { type: Number, default: 0 },
  totalRating: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ["Available", "In Use", "Maintenance"],
    default: "Available",
  },
});

export default mongoose.model("Vecheles", VechelesSchema);
