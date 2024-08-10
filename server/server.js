import "dotenv/config";
import express from "express";
import connectDb from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(express.json());

// routes
app.use("/api/auth", authRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  connectDb();
  console.log(`Server start on => http://localhost:${port}`);
});
