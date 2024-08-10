import express from "express";
import { getReviewByAppName } from "../controllers/appDataController.js";


const router = express.Router();

router.get('/:appName/appReview', getReviewByAppName)

export default router;
