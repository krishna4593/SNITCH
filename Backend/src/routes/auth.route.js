import { Router } from "express";
import { loginUser, registerUser } from "../controllers/auth.controller.js";
import { loginValidator, registerValidator } from "../validator/auth.validator.js";

const router = Router();

router.post("/register", registerValidator, registerUser);
router.post("/login", loginValidator, loginUser);

export default router;
