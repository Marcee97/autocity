import {Router} from "express";
import { getLavados, prueba, testing } from "../controllers/controls.js";

const router = Router();
router.get("/", testing)
router.post("/prueba", prueba)
router.get("/lavados", getLavados)

export default router;