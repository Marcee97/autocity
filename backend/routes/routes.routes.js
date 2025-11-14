import {Router} from "express";
import { getLavados, prueba } from "../controllers/controls.js";

const router = Router();

router.post("/prueba", prueba)
router.get("/lavados", getLavados)

export default router;