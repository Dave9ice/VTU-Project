import express from "express";
import {
  fetchElectricity,
  fetchMeterPlans,
} from "../controllers/meterController.js";
import authenticateUser from "../middleware/authmiddleware.js";

const router = express.Router();

router.get("/:id", authenticateUser, fetchMeterPlans);
router.get("/", authenticateUser, fetchElectricity);

export default router;
