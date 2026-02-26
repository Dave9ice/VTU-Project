import express from "express";
import {
  forgotPasswordRequest,
  forgotPassword,
  loginUser,
  logOutUser,
  registerUser,
  verifyEmail,
  resetPassword,
  getUserProfile,
} from "../controllers/authController.js";
import authenticateUser from "../middleware/authmiddleware.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logOutUser);
router.post("/verify-user", verifyEmail);
router.post("/password-forgot-request", forgotPasswordRequest);
router.post("/password-forgot", forgotPassword);
router.post("/password-reset", authenticateUser, resetPassword);
router.get("/user-profile", authenticateUser, getUserProfile);

export default router;
