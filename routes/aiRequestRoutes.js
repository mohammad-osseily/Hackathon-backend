import express from "express";
import { createRequest } from "./../controllers/aiRequestController.js";

import { protect } from "../middleware/protectRoutes.js";

const router = express.Router();

router.post("/", protect, createRequest);
router.post("/get", protect, createRequest);

export default router;
