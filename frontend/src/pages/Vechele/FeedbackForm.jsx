import React, { useState } from "react";
import { useParams } from "react-router-dom"; // For getting the vecheleId from the URL
import { AiFillStar } from "react-icons/ai"; // Importing star icon for rating
import { BASE_URL } from "../../config"; // Base URL for your API
import { toast } from "react-toastify"; // For showing toast notifications
import HashLoader from "react-spinners/HashLoader"; // Loading spinner component

const FeedbackForm = () => {
  const { id } = useParams();  // Get the vecheleId from the URL
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(false);  // To handle loading state

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that rating and reviewText are not empty
    if (rating === 0 || reviewText.trim() === "") {
      toast.error("Please provide a rating and review text.");
      return;
    }

    try {
      setLoading(true); // Set loading state to true
      const response = await fetch(`${BASE_URL}/vecheles/${id}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating,
          reviewText,
        }),
      });

      const data = await response.json();

      setLoading(false); // Set loading state to false after response

      if (response.ok) {
        toast.success("Review submitted successfully!");
      } else {
        toast.error(data.message || "Error submitting review.");
      }
    } catch (err) {
      console.error("Error:", err.message);
      setLoading(false); // Set loading state to false on error
      toast.error("Failed to submit review");
    }
  };

  return (
    <div> 
      <form onSubmit={handleSubmit}>
        <div>
        <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4 mt-0">
          Rate the overall experience of the vechele *
        </h3>
             
          <div>
            {[...Array(5).keys()].map((_, index) => {
              index += 1;
              return (
                <button
                  key={index}
                  type="button"
                  className={`${
                    index <= (rating || hover) ? "text-yellowColor" : "text-gray-400"
                  } bg-transparent border-none outline-none text-[22px] cursor-pointer`}
                  onClick={() => setRating(index)}
                  onMouseEnter={() => setHover(index)}
                  onMouseLeave={() => setHover(rating)}
                  onDoubleClick={() => {
                    setHover(0);
                    setRating(0);
                  }}
                >
                  <span>
                    <AiFillStar />
                  </span>
                </button>
              );
            })}
          </div>

        </div>

        <div>
          
        <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4 mt-0">
          Pin Comment on the vechele *
        </h3>
          <textarea
            id="reviewText"
            className="border border-solid border-[#0066ff34] focus:outline outline-primaryColor w-full px-2 py-3 rounded-md"
            rows="5"
            placeholder="Write your Comment"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="btn" disabled={loading}>
          {loading ? <HashLoader size={25} color="#fff" /> : "Submit Feedback"}
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
