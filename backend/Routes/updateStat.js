import express from 'express';
import Vechele from '../modelsNew/VechelesSchema.js';  
import { json } from 'express';

const router = express.Router();

// Middleware to parse incoming JSON data
router.use(json());

// Route to update vechele status
router.patch("/", async (req, res) => {
  const { id_vechele, status } = req.body;

  if (!id_vechele || !status) {
    return res.status(400).json({ message: "Vechele ID and status are required" });
  }

  try {
    // Find the vechele by id
    const vechele = await Vechele.findById(id_vechele);
    if (!vechele) {
      return res.status(404).json({ message: 'Vechele not found' });
    }

    // Update the status of the vechele
    vechele.status = status;

    // Save the updated vechele
    await vechele.save();

    // Send success response
    res.status(200).json({
      message: 'Status updated successfully',
      vechele: {
        id: vechele._id,
        status: vechele.status,
      },
    });
  } catch (error) {
    // Handle errors and send response
    console.error('Error updating status:', error);
    res.status(500).json({ message: 'Error updating status', error: error.message });
  }
});

export default router;
