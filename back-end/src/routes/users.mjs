import { Router } from "express";
import UserHandler from "../handlers/users.mjs";

const router = Router();
router.get("/api/user/:_id", UserHandler.getUserById);
router.post("/api/user", UserHandler.saveUser);

export default router;