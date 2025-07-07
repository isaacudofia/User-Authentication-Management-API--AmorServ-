import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { inputValidator } from "../validator/inputValidator.js";
import dotenv from "dotenv";
import User from "../model/userModel.js";
dotenv.config();

/**----------------USER REGISTRATION CONTROLLER----------------**/
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    inputValidator(email, password, name);
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res
        .status(400)
        .json({ message: "Email exist, please try another email..." });

    const hashedPassword = await bcrypt.hash(password, 10);

    //Register user in the database
    const registerUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User Registered Successfully...",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || "An error occured while registering user",
    });
  }
};

/**----------------USER LOGIN OR SIGN-IN CONTROLLER----------------**/
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    inputValidator(email, password);
    const findUser = await User.findOne({ email });
    if (!findUser)
      return res
        .status(400)
        .json({ message: "User does not exist, please sign up..." });

    //DE-ENCRYPT THE PASSWORD FOR CHECK IN THE DATABASE
    const correctPassword = await bcrypt.compare(password, findUser.password);

    if (!correctPassword)
      return res
        .status(400)
        .json({ message: "Invalid credentials when logging in user" });

    //GENERATE SIGNED TOKEN FOR MIDDLEWARE TO USE AND PROTECT SOME ROUTES
    const token = jwt.sign(
      {
        userID: findUser._id,
        userEmail: findUser.email,
        userName: findUser.name,
      },
      process.env.JWT_PRIVATE_KEY,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    //ALL CREDENTIALS (EMAIL AND PASSWORD) RESPONSES
    res.status(200).json({
      message: `${findUser.name} Logged-in Successfully...`,
      token,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || "An error occured while logging-in user",
    });
  }
};
