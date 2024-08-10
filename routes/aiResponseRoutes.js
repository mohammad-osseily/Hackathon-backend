import { Router } from "express";
import AiResponse from "../models/AiResponse.js";


const router = new Router()

router.post('/create', AiResponse)

export default router