import express from "express";
import { createBlog } from "../controllers/blog.controller.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = new express.Router();

router.post("/create-blog", protectRoute, createBlog);

export default router;
