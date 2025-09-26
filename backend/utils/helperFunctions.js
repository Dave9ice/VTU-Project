import User from "../models/user.js";
import { BadRequestError } from "../errors/index.js";
import axios from "axios";
import PluginToken from "../models/pluging.js";
import Transaction from "../models/transaction.js";

export const networakPrefixes = {
  MTN: [
    "0803",
    "0806",
    "0703",
    "0706",
    "0810",
    "O813",
    "0814",
    "O816",
    "0819",
    "0903",
    "0906",
    "0913",
    "0916",
  ],
  AIRTEL: [
    "0802",
    "0808",
    "0708",
    "0701",
    "0812",
    "0901",
    "0902",
    "0904",
    "0907",
    "0912",
  ],
  GLO: ["0805", "0807", "0811", "0705", "0815", "0905", "0915"],
  "9mobile": ["0809", "0817", "0818", "0909", "0908"],
};
export const detectNetwork = (phone) => {
  for (const [network, prefixes] of Object.entries(networakPrefixes)) {
    if (prefixes.some((prefix) => phone.startsWith(prefix))) {
      return network;
    }
  }
  return null;
};

export const verifyBalanceWithDb = async ({ amount, userID }) => {
  const user = await User.findOne({ _id: userID });
  if (Number(amount) > user.wallet) {
    throw new BadRequestError(
      "insufficient wallet balance please fund your wallet"
    );
  }
};

export const updateWallletBalance = async ({ amount, userID }) => {
  const user = await User.findOne({ _id: userID });
  user.wallet = user.wallet - Number(amount);
  await user.save();
  return user;
};

export const loginInPlugin = async () => {
  try {
    const resp = await axios.post("https://pluginng.com/api/login", {
      email: process.env.PLUGIN_NG_EMAIL,
      password: process.env.PLUGIN_NG_PASSWORD,
    });
    // console.log(resp.data);
    return resp.data.data.token;
  } catch (error) {
    throw new error();
  }
};

export const updateToken = async () => {
  const token = await loginInPlugin();
  await PluginToken.findOneAndUpdate(
    { _id: process.env.TOKEN_ID },
    { token },
    { new: true }
  );
  return token;
};

export const createTransationInDB = async ({
  amount,
  description,
  balance,
  type,
  phoneNumber,
  cardNumber,
  transactionReference,
  user,
}) => {
  return await Transaction.create({
    amount,
    description,
    balance,
    type,
    phoneNumber,
    user,
    cardNumber,
    transactionReference,
  });
};

export const sendVerificationMail = async ({
  verifiedToken,
  email,
  firstName,
}) => {
  const origin = "http://localhost:5173";
  const verifyEmail = `${origin}/verify-email?token=${verifiedToken}&email=${email}`;
  const message = `<p>Please confirm your email by clicking on the following link : 
  <a href="${verifyEmail}">Verify Email</a> </p>`;
  try {
    const resp = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: { name: "BiggieSubNg", email: "info@biggiesubng.com" },
        to: [{ email, name: firstName }],
        subject: "Welcome To BiggieSubNg",
        htmlContent: "<p>hello</p>",
      },
      {
        headers: {
          accept: "application/json",
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );
    // console.log("email sent:", resp.data);
    console.log(resp);
  } catch (error) {
    console.log("email error:", error?.response?.data || error.message);
  }
};
