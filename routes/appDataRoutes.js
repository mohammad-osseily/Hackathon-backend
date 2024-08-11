import { getPaginatedApps } from "../controllers/appDataController.js";
import { Router } from "express";

const router = new Router();

router.get("/", getPaginatedApps);

export default router;
