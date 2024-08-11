import express from "express";
import { createBlog } from "../controllers/blog.controller.js";
const router = new express.Router();
router.post("/create-blog", createBlog);
export default router;
