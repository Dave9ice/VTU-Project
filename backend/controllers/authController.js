import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  CustomApiError,
  UnAuthorizeError,
  NotFoundError,
  UnauthenticatesError,
} from "../errors/index.js";
import User from "../models/user.js";
import crypto from "crypto";
import { attashCookiesToResponse } from "../utils/jwt.js";
import {
  sendForgotPasswordMail,
  sendVerificationMail,
} from "../utils/helperFunctions.js";
// REGISTER USER
const registerUser = async (req, res) => {
  const { password, firstName, lastName, email, phoneNumber } = req.body;
  if (!password || !firstName || !email || !lastName || !phoneNumber) {
    throw new BadRequestError("please provide all fields");
  }
  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    throw new BadRequestError("email already exist");
  }
  const verifiedToken = `${Math.floor(Math.random() * 10000)}`.padStart(4, "0");
  // let verifiedToken = crypto.randomBytes(40).toString("hex");
  const user = await User.create({
    firstName,
    lastName,
    password,
    email,
    phoneNumber,
    verifiedToken,
  });
  await sendVerificationMail({
    firstName: user.firstName,
    email: user.email,
    verifiedToken: user.verifiedToken,
  });
  res
    .status(StatusCodes.CREATED)
    .json({ msg: "please verify your email", email });
};

// VERIFY EMAIL

const verifyEmail = async (req, res) => {
  const { email, verifyToken } = req.body;
  const user = await User.findOne({ email });
  if (!email || !verifyToken) {
    throw new UnauthenticatesError("verification failed");
  }
  if (!user) {
    throw new UnauthenticatesError("verification failed");
  }
  if (user.verifiedToken !== verifyToken) {
    throw new UnauthenticatesError("verification failed");
  }

  user.verifiedToken = "";
  user.isVerified = true;
  user.verified = Date.now();

  await user.save();
  res
    .status(StatusCodes.OK)
    .json({ msg: "email verified succesfully,please login" });
};

// LOGIN USER

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatesError("invalid credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatesError("invalid credentials");
  }

  if (user.isVerified === false) {
    throw new UnauthenticatesError("please verify your email");
  }
  const tokenUser = { userID: user._id, role: user.role };
  attashCookiesToResponse({ res, user: tokenUser });
  const newUser = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    wallet: user.wallet,
    joinDate: user.createdAt,
    phoneNumber: user.phoneNumber,
    role: user.role,
  };
  res.status(StatusCodes.OK).json({ user: newUser });
};

// FORGOT PASSWORD REQUEST
const forgotPasswordRequest = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new BadRequestError("please provide email address");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new BadRequestError("user with that email does not exist");
  }
  // sent forgot mail
  const verifiedToken = crypto.randomBytes(40).toString("hex");
  user.verifiedToken = verifiedToken;
  await user.save();
  await sendForgotPasswordMail({
    firstName: user.firstName,
    email: user.email,
    verifiedToken,
  });
  res
    .status(StatusCodes.OK)
    .json({ msg: "check your email to reset your password" });
};

// FORGOT PASSWORD
const forgotPassword = async (req, res) => {
  const { password, confirmPassword, email, token } = req.body;
  if (!password || !confirmPassword || !email || !token) {
    throw new BadRequestError("please provide all fields");
  }
  if (password !== confirmPassword) {
    throw new BadRequestError("password does not match please retype password");
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw new BadRequestError("somthing went wrong");
  }
  if (token !== user.verifiedToken) {
    throw new BadRequestError("somthing went wrong");
  }

  user.password = password;
  user.verifiedToken = "";
  await user.save();
  // you can send email to user that email has been changed successfully
  res.status(StatusCodes.OK).json({ msg: "password has been changed" });
};

// RESET PASSWORD
const resetPassword = async (req, res) => {
  const { password, newPassword } = req.body;
  const userID = req.user.userID;
  console.log(userID);
  if (!password || !newPassword || !userID) {
    throw new BadRequestError("please provide all fields");
  }
  const user = await User.findOne({ _id: userID });
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new BadRequestError(
      "provide correct password, to be able to change your password",
    );
  }
  user.password = newPassword;
  await user.save();
  res.status(StatusCodes.OK).json({ msg: "password changed succesfully" });
};

// GET USER PROFILE
const getUserProfile = async (req, res) => {
  const userID = req.user.userID;
  if (!userID) {
    throw new UnauthenticatesError("unable to get user profile");
  }
  const user = await User.findOne({ _id: userID });
  if (!user) {
    throw new BadRequestError("could not get user profile");
  }
  const newUser = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    wallet: user.wallet,
    joinDate: user.createdAt,
    phoneNumber: user.phoneNumber,
    role: user.role,
  };
  res.status(StatusCodes.OK).json({ user: newUser });
};

// REQUEST OTP
const requestOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new BadRequestError("please provide email address");
  }
  const user = await User.findOne({ email });
  if (user.isVerified) {
    throw new BadRequestError("email address has already been verify");
  }
  const verifiedToken = `${Math.floor(Math.random() * 10000)}`.padStart(4, "0");
  user.verifiedToken = verifiedToken;
  await user.save();
  await sendVerificationMail({
    firstName: user.firstName,
    email: user.email,
    verifiedToken: user.verifiedToken,
  });
  res
    .status(StatusCodes.OK)
    .json({ msg: "otp code has been sent successfully" });
};
// LOGOUT USER
const logOutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    signed: true,
    path: "/",
  });
  res.status(StatusCodes.OK).json({ msg: "logged out successfully" });
};

export {
  registerUser,
  loginUser,
  verifyEmail,
  logOutUser,
  forgotPasswordRequest,
  forgotPassword,
  resetPassword,
  getUserProfile,
  requestOtp,
};
