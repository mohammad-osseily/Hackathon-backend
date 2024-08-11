import { getApps, getReviewByAppName } from "../controllers/appDataController.js";
import { Router } from "express";

const router = new Router();

router.get("/", getApps);
router.get("/:appName/appReview", getReviewByAppName);

export default router;
