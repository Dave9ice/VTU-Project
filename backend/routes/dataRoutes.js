import express from "express";
import {
  getAllProvider,
  getSpecificData,
} from "../controllers/datacontroller.js";
import authenticateUser from "../middleware/authmiddleware.js";
const router = express.Router();

router.get("/", authenticateUser, getAllProvider);
router.get("/:id", authenticateUser, getSpecificData);
router.post("/purchase", authenticateUser);

export default router;
