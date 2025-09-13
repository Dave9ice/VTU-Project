import express from "express";
import { getAirtime } from "../controllers/airtimeController.js";
import authenticateUser from "../middleware/authmiddleware.js";

const router = express.Router();

router.get("/", authenticateUser, getAirtime);

export default router;
