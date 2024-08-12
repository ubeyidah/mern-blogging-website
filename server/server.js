import "dotenv/config";
import express from "express";
import connectDb from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import blogRoutes from "./routes/blog.routes.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());
// routes
app.use("/api/auth", authRoutes);
app.use("/api/blog", blogRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  connectDb();
  console.log(`Server start on => http://localhost:${port}`);
});
