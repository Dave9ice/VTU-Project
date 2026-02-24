import express from "express";
import { flutterwaveWebhook } from "../controllers/flutterwaveController.js";

const router = express.Router();

router.post("/", flutterwaveWebhook);

export default router;
