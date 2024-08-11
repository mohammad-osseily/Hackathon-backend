import { Router } from "express";
import { createAiResponse, getAiResponse } from "../controllers/aiResponseController.js";


const router = new Router()

router.post('/create', createAiResponse)
router.get('/', getAiResponse)

export default router