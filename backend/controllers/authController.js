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

const registerUser = async (req, res) => {
  const { password, firstName, lastName, email, phoneNumber } = req.body;
  if (!password || !firstName || !email || !lastName || !phoneNumber) {
    throw new BadRequestError("please provide all fields");
  }
  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    throw new BadRequestError("email already exist");
  }
  let verifiedToken = crypto.randomBytes(40).toString("hex");
  const user = await User.create({
    firstName,
    lastName,
    password,
    email,
    phoneNumber,
    verifiedToken,
  });
  res.status(StatusCodes.CREATED).json({ msg: "please verify your email" });
};

const verifyEmail = async (req, res) => {
  const { email, verifyToken } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatesError("verification failed");
  }
  if (user.verifiedToken !== verifyToken) {
    throw new UnauthenticatesError("verification failed");
  }

  user.verifiedToken = "";
  user.isVerified = false;
  user.verified = Date.now();

  await user.save();
  res
    .status(StatusCodes.OK)
    .json({ msg: "email verified succesfully,please login" });
};
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
  const tokenUser = { userID: user._id };
  attashCookiesToResponse({ res, user: tokenUser });
  const newUser = { name: user.name, email: user.email, wallet: user.wallet };
  res.status(StatusCodes.OK).json({ user: newUser });
};

const logOutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
  res.status(StatusCodes.OK).json({ msg: "logged out successfully" });
};

export { registerUser, loginUser, verifyEmail, logOutUser };
