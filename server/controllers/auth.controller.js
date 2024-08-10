import { signinValidation } from "../validation/auth.validation.js";
import { generateUserName, hashPassword } from "../../utils.js";
import Users from "../Schema/User.js";

export const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const { error } = signinValidation.validate({ fullName, email, password });
    if (error)
      return res.status(403).json({ message: error.details[0].message });
    const isEmailNotUnique = await Users.exists({
      "personal_info.email": email,
    });
    if (isEmailNotUnique)
      return res.status(403).json({ message: "Email already exists." });
    const [hashedPassword, userName] = await Promise.all([
      hashPassword(password),
      generateUserName(email),
    ]);

    const user = await Users({
      personal_info: {
        fullName,
        userName,
        email,
        password: hashedPassword,
      },
    }).save();
    const userToSend = await Users.findById(user._id).select(
      "-personal_info.password"
    );
    res.status(201).json({ success: true, data: userToSend });
  } catch (error) {
    console.log("Error: on signup => ", error.message);
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server error" });
  }
};
export const signin = async (req, res) => {
  try {
  } catch (error) {}
};
export const signout = async (req, res) => {
  try {
  } catch (error) {}
};
