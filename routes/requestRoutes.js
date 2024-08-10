import express from "express";
import { createRequest } from "./../controllers/requestController.js";

import { protect } from "../middleware/protectRoutes.js";

const router = express.Router();

router.post("/", protect, createRequest);

export default router;
