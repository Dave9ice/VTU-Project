import express from "express";
import authenticateUser from "../middleware/authmiddleware.js";
import {
  purchaseAirtime,
  purchaseCable,
  purchaseData,
  purchaseElectricity,
} from "../controllers/purchaseController.js";

const router = express.Router();

router.post("/data", authenticateUser, purchaseData);
router.post("/electricity", authenticateUser, purchaseElectricity);
router.post("/cable", authenticateUser, purchaseCable);
router.post("/airtime", authenticateUser, purchaseAirtime);

export default router;
