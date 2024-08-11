import {
  signinValidation,
  signupValidation,
} from "../validation/auth.validation.js";
import {
  comparePassword,
  generateUserName,
  genTokenSetCookie,
  hashPassword,
} from "../../utils.js";
import Users from "../Schema/User.js";

export const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const { error } = signupValidation.validate({ fullName, email, password });
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    const isEmailNotUnique = await Users.exists({
      "personal_info.email": email,
    });
    if (isEmailNotUnique)
      return res.status(400).json({ message: "Email already exists." });
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
    const userToSend = {
      userName: user.personal_info.userName,
      email: user.personal_info.email,
      profile_img: user.personal_info.profile_img,
    };
    genTokenSetCookie(user._id, res);
    res.status(201).json(userToSend);
  } catch (error) {
    console.log("Error: on signup => ", error.message);
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server error" });
  }
};
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { error } = signinValidation.validate({ email, password });
    if (error)
      return res.status(403).json({ message: error.details[0].message });
    const user = await Users.findOne({ "personal_info.email": email });
    if (!user)
      return res.status(404).json({ message: "Incorrect email adress" });
    const isMatch = await comparePassword(
      user.personal_info.password,
      password
    );

    if (!isMatch)
      return res.status(403).json({ message: "Incorrect password" });
    const userToSend = {
      userName: user.personal_info.userName,
      email: user.personal_info.email,
      profile_img: user.personal_info.profile_img,
    };
    genTokenSetCookie(user._id, res);
    res.status(200).json(userToSend);
  } catch (error) {
    console.log("Error: on signin => ", error.message);
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server error" });
  }
};
export const signout = (req, res) => {
  try {
    res.clearCookie("blogToken");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error: on singout => ", error.message);
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server error" });
  }
};
