import express from "express";
import { profile } from "../controllers/profileController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/profile", auth, profile);

export default router;
