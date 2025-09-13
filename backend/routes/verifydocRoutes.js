import express from "express";
import {
  verifyBVNDocument,
  verifyNINDocument,
} from "../controllers/verifydocController.js";
import authenticateUser from "../middleware/authmiddleware.js";

const router = express.Router();

router.post("/bvn", authenticateUser, verifyBVNDocument);
router.post("/nin", authenticateUser, verifyNINDocument);

export default router;
