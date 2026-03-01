import express from "express";
import authenticateUser from "../middleware/authmiddleware.js";
import {
  gettransactionStatus,
  getUserTransaction,
} from "../controllers/transactionController.js";

const router = express.Router();

router.get("/status", authenticateUser, gettransactionStatus);
router.get("/", authenticateUser, getUserTransaction);

export default router;
