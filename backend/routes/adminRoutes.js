import express from "express";
import authenticateUser from "../middleware/authmiddleware.js";
import userRoleMiddleware from "../middleware/rolemiddleware.js";
import { getTransactions, getUsersNo } from "../controllers/adminController.js";

const router = express.Router();

router.get("/stats", authenticateUser, userRoleMiddleware, getUsersNo);
router.get(
  "/transactions",
  authenticateUser,
  userRoleMiddleware,
  getTransactions,
);

export default router;
