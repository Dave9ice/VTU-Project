import express from "express";
import authenticateUser from "../middleware/authmiddleware.js";
import { gettransactionStatus } from "../controllers/transactionController.js";

const router = express.Router();

router.get("/status", authenticateUser, gettransactionStatus);

export default router;
