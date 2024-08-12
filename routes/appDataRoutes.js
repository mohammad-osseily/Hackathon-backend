import { getApps, getReviewByAppName } from "../controllers/appDataController.js";
import { Router } from "express";
import { protect } from "../middleware/protectRoutes.js";

const router = new Router();

router.get("/", getApps);
router.get("/:appName/appReview",protect, getReviewByAppName);

export default router;
