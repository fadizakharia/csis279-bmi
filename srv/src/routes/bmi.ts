import { Router } from "express";
import {
  getUserBmiController,
  addBmiController,
  deleteBmiController,
} from "../controller/bmi";
const router = Router();

router.get("/bmi", getUserBmiController);
router.post("/bmi", addBmiController);
router.delete("/bmi", deleteBmiController);

export { router as bmiRouter };
