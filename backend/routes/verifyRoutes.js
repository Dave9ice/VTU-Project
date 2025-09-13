import express from "express";
import {
  verifyCableCard,
  verifyMeterNo,
} from "../controllers/verifyController.js";

const router = express.Router();

router.post("/cable", verifyCableCard);
router.post("/meter", verifyMeterNo);

export default router;
