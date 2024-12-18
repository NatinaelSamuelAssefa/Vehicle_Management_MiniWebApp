import express from "express";
import {
  updateStaff,
  deleteStaff,
  getAllStaff,
  getSingleStaff,
} from "../Controllers/staffController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router();

router.get("/:id", authenticate, restrict(["StaffUser"]), getSingleStaff);
router.get("/", authenticate, restrict(["adminUser"]), getAllStaff);
router.put("/:id", authenticate, restrict(["StaffUser"]), updateStaff);
router.delete("/:id", authenticate, restrict(["StaffUser"]), deleteStaff); 

export default router;
