import express from "express";
import {
  updateVehicle,
  deleteVehicle,
  getAllVehicles,
  getSingleVehicle,
} from "../Controllers/vehiclesController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";
import reviewRouter from "./review.js";

const router = express.Router();

// Nested route
router.use("/:vehicleId/reviews", reviewRouter);

router.get("/:id", getSingleVehicle); // Get single vechele by ID
router.get("/", getAllVehicles); // Get all vehicles
router.put("/:id", updateVehicle); // Update vechele
router.delete("/:id", authenticate, restrict(["AdminUser"]), deleteVehicle); // Delete vechele (restricted)

export default router;
