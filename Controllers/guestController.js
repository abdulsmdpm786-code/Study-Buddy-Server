import { userModel } from "../Models/userModels.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from "../Utilities/sendEmail.js";

const handleSignUP = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    if (
      userName.trim().length === 0 ||
      email.trim().length === 0 ||
      password.trim().length === 0
    ) {
      return res.status(400).json({ errMsg: "All fields are required" });
    }

    const existUser = await userModel.findOne({ email });

    if (existUser) {
      return res.status(400).json({ errMsg: "User Already Exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await userModel.create({
      name: userName,
      email: email,
      password: hashedPassword,
    });
    return res.status(200).json({ message: "User Created...." });
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json({ errMsg: error.message || "Internal Server Error" });
  }
};

const handleSignIn = async (req, res) => {
  try {
    console.log("in login section");

    const { email, password } = req.body;

    if (email.trim().length === 0 || password.trim().length === 0) {
      return res.status(400).json({ errMsg: "All fields are required" });
    }

    const findUser = await userModel.findOne({ email });
    if (!findUser) {
      return res.status(400).json({ errMsg: "User Not Found" });
    }

    const isMatch = await bcrypt.compare(password, findUser.password);
    if (!isMatch) {
      return res.status(400).json({ errMsg: "Invalid password" });
    }

    const token = jwt.sign(
      { id: findUser._id, role: findUser.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", 
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({ message: "Login Successful", findUser });
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json({ errMsg: error.message || "Internal Server Error" });
  }
};

const handleLogout = async (req, res) => {
  try {
    res.clearCookie("token", { path: "/" });
    return res.status(200).json({ message: "Logged out successfully" });
    console.log("Logged out");
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json({ errMsg: error.message || "Internal Server Error" });
  }
};

const handleAuth = async (req, res) => {
  console.log("working auth.....");

  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ isAuthenticated: false, message: "No token found..." });
  }
  console.log("token...", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("this is decoded.....", decoded);

    const user = await userModel.findById(decoded.id).select("-password");
    if (!user) {
      return res
        .status(401)
        .json({ isAuthenticated: false, message: "No user found..." });
    }

    return res.status(200).json({ isAuthenticated: true, user });
  } catch (error) {
    return res
      .status(401)
      .json({ isAuthenticated: false, message: "No token found..." });
  }
};

const registerUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    console.log(req.body);

    const userExists = await userModel.findOne({ email });
    console.log("email...", userExists);

    if (userExists) {
      return res.status(400).json({ errMsg: "Email already in use" });
    }

    const generateOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      name: userName,
      email,
      password: hashedPassword,
      otp: generateOtp,
      otpExpires: Date.now() + 10 * 60 * 1000,
    });

    console.log("email...",newUser.email);
    

    const message = `Hello ${userName},\n\nYour verification code is: ${generateOtp}\nThis code expires in 10 minutes.`;
    await sendEmail({
      email: newUser.email,
      subject: "Verify your account",
      message,
    });

    return res.status(201).json({ success: true, message: "OTP sent to email!" });
  } catch (error) {
    res.status(500).json({ errMsg: error.message });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ errMsg: "user not found" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ errMsg: "Invalid OTP code" });
    }

    if (user.otpExpires < Date.now()) {
      return res
        .status(400)
        .json({ errMsg: "OTP has expired. Please request a new one." });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res
      .status(200)
      .json({
        success: true,
        message: "Email verified successfully! You can now log in.",
      });
  } catch (error) {
    res.status(500).json({ errMsg: error.message });
  }
};

export {
  handleSignUP,
  handleSignIn,
  handleLogout,
  handleAuth,
  verifyOtp,
  registerUser,
};
