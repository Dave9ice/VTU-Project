import express from "express";
import { monnifyWebHook } from "../controllers/monnifyController.js";

const router = express.Router();

router.post("/", monnifyWebHook);

export default router;
