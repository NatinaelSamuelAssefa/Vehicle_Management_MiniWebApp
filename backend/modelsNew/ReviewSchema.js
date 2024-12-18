import mongoose from "mongoose";
import Vehicle from "./VechelesSchema.js";

const ReviewSchema = new mongoose.Schema(
  {
    vechele: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicles",
      required: [true, "Vehicle ID is required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
      required: [true, "User ID is required"],
    },
    reviewText: {
      type: String,
      required: [true, "Review text is required"],
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
    },
  },
  { timestamps: true }
);

// Middleware to populate user details when fetching reviews
ReviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name photo", // Populate only name and photo fields
  });
  next();
});

// Static method to calculate and update average ratings for a vehicle
ReviewSchema.statics.calcAverageRatings = async function (vehicleId) {
  const stats = await this.aggregate([
    { $match: { vechele: vehicleId } },
    {
      $group: {
        _id: "$vechele",
        numOfRatings: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  if (stats.length > 0) {
    await Vehicle.findByIdAndUpdate(vehicleId, {
      totalRating: stats[0].numOfRatings,
      averageRating: stats[0].avgRating,
    });
  } else {
    // Reset the vehicle's ratings if no reviews exist
    await Vehicle.findByIdAndUpdate(vehicleId, {
      totalRating: 0,
      averageRating: 0,
    });
  }
};

// Post-save hook to update vehicle ratings when a new review is added
ReviewSchema.post("save", function () {
  this.constructor.calcAverageRatings(this.vechele);
});

// Post-remove hook to update vehicle ratings when a review is deleted
ReviewSchema.post("remove", function () {
  this.constructor.calcAverageRatings(this.vechele);
});

export default mongoose.model("Review", ReviewSchema);
