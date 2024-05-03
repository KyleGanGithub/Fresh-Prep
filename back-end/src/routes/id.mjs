import { Router } from "express";
import IdHandler from "../handlers/id.mjs";

const router = Router();
router.get("/api/id", IdHandler.getUniqueId);

export default router;