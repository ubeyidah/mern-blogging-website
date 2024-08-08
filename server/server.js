import express from "express";
import "dotenv/config";
import connectDb from "./config/db.js";

const app = express();

const port = 3000;
app.listen(port, () => {
  connectDb();
  console.log(`Server start on => http://localhost:${port}`);
});
