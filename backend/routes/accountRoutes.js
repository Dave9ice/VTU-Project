import express from "express";
import authenticateUser from "../middleware/authmiddleware.js";
import { createVisualAccount } from "../controllers/accountController.js";

const router = express.Router();

router.post("/create-dynamic-account", authenticateUser, createVisualAccount);

export default router;
