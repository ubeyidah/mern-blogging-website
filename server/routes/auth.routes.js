import express from "express";
import {
  signin,
  signout,
  signup,
  oauth,
} from "../controllers/auth.controller.js";
const router = new express.Router();

router.post("/signup", signup);
router.post("/oauth", oauth);
router.post("/signin", signin);
router.post("/signout", signout);
export default router;
