import express from "express";
import {
  loginUser,
  logOutUser,
  registerUser,
  verifyEmail,
} from "../controllers/authController.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logOutUser);
router.post("/verify-user", verifyEmail);

export default router;
