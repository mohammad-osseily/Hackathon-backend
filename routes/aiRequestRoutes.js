import express from "express";
import { createRequest, getById } from "./../controllers/aiRequestController.js";

import { protect } from "../middleware/protectRoutes.js";

const router = express.Router();

router.post("/",protect, createRequest);
router.get("/get",protect, getById);

export default router;
