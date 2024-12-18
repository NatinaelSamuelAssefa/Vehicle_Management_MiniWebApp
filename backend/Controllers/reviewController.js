import Review from "../modelsNew/ReviewSchema.js"; // Import the review schema
import Vecheles from "../modelsNew/VechelesSchema.js"; // Import the vecheles schema (updated)

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ vehicle: req.params.vehicleId });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createReview = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    console.log("Request params:", req.params);

    const vecheleId = req.params.vecheleId;  // Use vecheleId from the URL parameters

    // Ensure the vecheleId is passed in the URL parameter
    if (!vecheleId) {
      return res.status(400).json({ success: false, message: "Vechele ID is required" });
    }

    // Ensure that the review fields are present in the request body
    if (!req.body.rating || !req.body.reviewText) {
      return res.status(400).json({ success: false, message: "Rating and review text are required" });
    }

    // Add the vechele ID to the review body
    req.body.vechele = vecheleId;

    // Create a new review document
    const newReview = new Review(req.body);
    const savedReview = await newReview.save();

    // Update the vechele's reviews array with the new review ID
    const updatedVechele = await Vecheles.findByIdAndUpdate(
      vecheleId,
      { $push: { reviews: savedReview._id } },
      { new: true }
    );

    if (!updatedVechele) {
      return res.status(404).json({ success: false, message: "Vechele not found" });
    }

    // Send success response with review data
    res.status(201).json({
      success: true,
      message: "Review submitted successfully",
      data: savedReview,
    });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ success: false, message: "Failed to submit review" });
  }
};

