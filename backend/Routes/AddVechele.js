import express from 'express';
import multer from 'multer';
import Vecheles from '../modelsNew/VechelesSchema.js';
import axios from 'axios';
import FormData from 'form-data'; // Import FormData
import fs from 'fs'; // Import fs for file handling
import dotenv from 'dotenv'; // Import dotenv to load .env variables

// Load environment variables
dotenv.config();

// Set up multer for file handling
const upload = multer({ dest: 'uploads/' }); // You can configure storage options here if needed

const router = express.Router(); 

// POST route to add vehicle
router.post('/', upload.single('vecheleImage'), async (req, res) => {
  try {
    const { name, brand, model, date, about, status } = req.body;
    const vecheleImage = req.file;

    // Check if the image was uploaded
    if (!vecheleImage) return res.status(400).json({ message: 'No image uploaded' });

    // Prepare form data to send to Cloudinary
    const formData = new FormData();
    formData.append('file', fs.createReadStream(vecheleImage.path)); // Read the file path for upload
    formData.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET); // Use environment variable for preset
    formData.append('cloud_name', process.env.CLOUDINARY_CLOUD_NAME); // Use environment variable for cloud name

    // Upload the image to Cloudinary
    const cloudinaryResponse = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`, 
      formData, 
      {
        headers: { 
          'Content-Type': 'multipart/form-data', 
          ...formData.getHeaders(),
        },
      }
    );

    const vecheleImageUrl = cloudinaryResponse.data.secure_url; // Get the uploaded image URL from Cloudinary

    // Create new vehicle entry in the database
    const newVechele = new Vecheles({
      name,
      brand,
      model,
      date,
      about,
      status,
      photo: vecheleImageUrl, // Store Cloudinary URL
    });

    await newVechele.save();
    res.status(201).json({ message: 'Vehicle added successfully', vechele: newVechele });
  } catch (error) {
    console.error('Error adding vehicle:', error);
    res.status(500).json({ message: 'Failed to add vehicle', error: error.message });
  }
});

export default router;
