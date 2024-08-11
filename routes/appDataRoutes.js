import { getApps } from "../controllers/appDataController.js";
import { Router } from "express";

const router = new Router();

router.get("/", getApps);

export default router;
