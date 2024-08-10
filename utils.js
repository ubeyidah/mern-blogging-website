import { nanoid } from "nanoid";
import bcrypt from "bcrypt";
import Users from "./server/Schema/User.js";
import jwt from "jsonwebtoken";

const generateUserName = async (email) => {
  try {
    let userName = email.split("@")[0];
    const isUserNotUniqe = await Users.findOne({
      "personal_info.userName": userName,
    });
    if (isUserNotUniqe) {
      userName = userName + "-" + nanoid().substring(0, 4);
    }

    return userName;
  } catch (error) {
    console.log(error);
  }
};

const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.log("Error hashing password", error.message);
  }
};
const comparePassword = async (encriptedPassword, password) => {
  try {
    const isMatch = await bcrypt.compare(password, encriptedPassword);
    return isMatch;
  } catch (error) {
    console.log("Error compare password", error.message);
  }
};
const genTokenSetCookie = (id, res) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "21d" });
  res.cookie("blogToken", token, {
    httpOnly: true,
    secure: process.env.STATUS !== "dev",
    sameSite: "strict",
    maxAge: 21 * 24 * 60 * 60 * 1000,
  });
};

export { generateUserName, hashPassword, comparePassword, genTokenSetCookie };
