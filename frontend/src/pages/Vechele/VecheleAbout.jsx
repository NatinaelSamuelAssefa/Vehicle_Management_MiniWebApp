import { useState } from 'react';
import { BASE_URL } from "../../config";
import axios from 'axios';

const VecheleAbout = ({ name, about, brand, model, status, id }) => {
  const [selectedStatus, setSelectedStatus] = useState(status || "Available"); // Default to "Available"
  const [message, setMessage] = useState(""); // State to hold success or error message

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleApply = async () => {
    try {
      const response = await axios.patch(`${BASE_URL}/updateStat`, {
        id_vechele: id,
        status: selectedStatus,
      });
      setMessage(`Status updated successfully: ${response.data.message}`);
    } catch (error) {
      console.error("Error updating status:", error);
      setMessage(`Error updating status: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div>
      {/* About Section */}
      <div>
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2">
          About of
          <span className="text-irisBlueColor font-bold text-[24px] leading-9">
            {name}
          </span>
        </h3>
        <p className="text_para">{about}</p>
      </div>

      {/* Brand and Model Section */}
      <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">Brand</h3>
        <ul className="pt-4 md:p-5">
          <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end sm:gap-2 mb-[5px]">
            <div>
              <p className="text-[16px] leading-6 font-medium text-textColor">{brand}</p>
            </div>
          </li>
        </ul>

        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">Model</h3>
        <ul className="pt-4 md:p-5">
          <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end sm:gap-2 mb-[5px]">
            <div>
              <p className="text-[14px] leading-5 font-medium text-textColor">{model}</p>
            </div>
          </li>
        </ul>
      </div>

      {/* Status Section */}
      <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">Status Of The Vehicle</h3>
        <ul className="grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5">
          <li className="p-4 rounded bg-[#fff9ea]">
            <p className="text-[16px] leading-6 font-medium text-textColor">
              {status || "Status not available"}
            </p>

            {/* Radio Buttons */}
            <div className="mt-4">
              <label className="block mb-2">
                <input
                  type="radio"
                  name="status"
                  value="Available"
                  checked={selectedStatus === "Available"}
                  onChange={handleStatusChange}
                  className="mr-2"
                />
                Available
              </label>
              <label className="block mb-2">
                <input
                  type="radio"
                  name="status"
                  value="In Use"
                  checked={selectedStatus === "In Use"}
                  onChange={handleStatusChange}
                  className="mr-2"
                />
                In Use
              </label>
              <label className="block mb-2">
                <input
                  type="radio"
                  name="status"
                  value="Maintenance"
                  checked={selectedStatus === "Maintenance"}
                  onChange={handleStatusChange}
                  className="mr-2"
                />
                Maintenance
              </label>
            </div>

            {/* Apply Button */}
            <div className="mt-4">
              <button
                onClick={handleApply}
                className="py-2 px-6 bg-primaryColor text-white font-semibold rounded"
              >
                Apply
              </button>
            </div>

            {/* Display Message */}
            {message && (
              <p className={`mt-4 text-sm font-medium ${message.includes("Error") ? "text-red-600" : "text-green-600"}`}>
                {message}
              </p>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default VecheleAbout;
