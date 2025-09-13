import express from "express";
import { fetchCablePlans } from "../controllers/cableController.js";
import authenticateUser from "../middleware/authmiddleware.js";

const router = express.Router();

router.get("/:id", authenticateUser, fetchCablePlans);

export default router;
