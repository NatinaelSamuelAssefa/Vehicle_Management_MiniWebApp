import React, { useState } from 'react';
import axios from 'axios';
import Loading from "../components/Loader/Loading"; // Assuming you have a loading component  

// Modal component
const Modal = ({ message, onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded shadow-md text-center w-80">
      <p>{message}</p>
      <button
        onClick={onClose}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        OK
      </button>
    </div>
  </div>

  /* 
  To display the status message in an alert with an "OK" button, 
  you can use the window.alert function or, for a more customized approach, 
  a modal dialog component. Here's how to use the window.alert method within your component.


  isModalOpen: This new state controls the visibility of the modal.
  Modal Component: A simple modal component with the status message and an "OK" button.
  closeModal Function: Closes the modal and clears the status message.
  Conditionally Render: The modal is conditionally rendered based on the 
  isModalOpen state, so it only appears after a form submission and can be closed with the "OK" button. 
  */
);

const AddVechele = () => {
  const [name, setname] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [date, setDate] = useState('');
  const [about, setAbout] = useState('');
  const [status, setStatus] = useState('');
  const [vecheleImage, setVecheleImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVecheleImage(file);
      setImagePreview(URL.createObjectURL(file)); // Preview the image
    }else {
      console.log("No file selected.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for validation if necessary

    setIsLoading(true); // Start loading

    const formData = new FormData();
    formData.append('name', name);
    formData.append('brand', brand);
    formData.append('model', model);
    formData.append('date', date);
    formData.append('about', about);
    if (vecheleImage) {
      formData.append('vecheleImage', vecheleImage); // Ensure this is a file
    } else {
      console.error("No file selected for upload.");
    }

    try {
      const response = await axios.post('http://localhost:5000/api/v1/addvechele', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setStatus(response.data.message);
      setIsModalOpen(true); // Open the modal with the success message
    } catch (error) {
      setStatus('Failed to add vechele');
      setIsModalOpen(true); // Open the modal with the error message
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section>
      <div className="px-4 mx-auto max-w-screen-md">
        <h2 className="heading text-center">Add a New vechele</h2>
        <p className="mb-8 lg:mb-16 font-light text-center text_para">
          Submit your vechele details below.
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="form_label">vechele Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setname(e.target.value)}
                placeholder="vechele Name"
                className="form_input mt-1 bordered-input"
              />
            </div>
            <div>
              <label htmlFor="brand" className="form_label">Brand</label>
              <input
                type="text"
                id="brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="vechele Brand"
                className="form_input mt-1 bordered-input"
              />
            </div>
            <div>
              <label htmlFor="model" className="form_label">Model</label>
              <input
                type="text"
                id="model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="vechele Model"
                className="form_input mt-1 bordered-input"
              />
            </div>
            <div>
              <label htmlFor="date" className="form_label">Manufacture Date</label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="form_input mt-1 bordered-input"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="about" className="form_label">About the vechele</label>
            <textarea
              rows="6"
              id="about"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="Provide details about the vehicle"
              className="form_input mt-1 bordered-input"
            />
          </div>

          <div>
            <label htmlFor="vecheleImage" className="form_label">Upload vechele Image</label>
            <input
              type="file"
              id="vecheleImage"
              accept="image/*"
              onChange={handleFileChange}
              className="form_input mt-1"
            />
            {imagePreview && <img src={imagePreview} alt="vechele Preview" className="w-full mt-2" />}
          </div>
          
          <div className="flex justify-end">
            <button type="submit" className="btn rounded sm:w-fit">Submit</button>
          </div>
        </form>

        {/* Show loading spinner at the bottom of the form */}
        {isLoading && <Loading />}

        {/* Display status message */}
        {isModalOpen && <Modal message={status} onClose={closeModal} />}
      </div>
    </section>
  );
};

export default AddVechele;
