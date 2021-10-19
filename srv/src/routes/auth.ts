import { Router } from "express";
import {
  currentUserController,
  loginController,
  logoutController,
  signupController,
} from "../controller/auth";

const router = Router();
router.post("/login", loginController);
router.post("/signup", signupController);
router.post("/logout", logoutController);
router.get("/current", currentUserController);
export { router as authRouter };
