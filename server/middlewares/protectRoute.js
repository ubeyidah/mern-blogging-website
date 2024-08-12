import jwt from "jsonwebtoken";
import Users from "../Schema/User.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.blogToken;
    if (!token)
      return res.status(401).json({ message: "Invalid token unauthorized" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded)
      return res.status(401).json({ message: "Invalid token unauthorized" });
    const user = await Users.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "user not found" });
    req.user = user;
    next();
  } catch (error) {
    console.log("Error: on protected route => ", error.message);
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

export default protectRoute;
