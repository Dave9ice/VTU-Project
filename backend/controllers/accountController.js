import axios from "axios";
import { BadRequestError } from "../errors/index.js";
import User from "../models/user.js";
import Transaction from "../models/transaction.js";

export const createVisualAccount = async (req, res) => {
  const { amount } = req.body;
  const { userID } = req.user;
  const user = await User.findOne({ _id: userID });
  if (!user || !amount || typeof amount !== "number") {
    throw new BadRequestError("no user found or amount");
  }
  const { firstName, lastName, email, phoneNumber, wallet } = user;
  const tx_ref = `TRX-${Math.floor(Date.now() * Math.random())}`;
  try {
    const resp = await axios.post(
      "https://api.flutterwave.com/v3/virtual-account-numbers",
      {
        email,
        amount,
        tx_ref,
        phonenumber: phoneNumber,
        firstname: firstName,
        lastname: lastName,
        narration: "funding wallet",
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
        },
      },
    );
    const {
      bank_name,
      account_number,
      expiry_date,
      amount: flw_amount,
    } = resp.data.data;
    console.log("create account number resp:", resp.data.data);
    const expiresIn = new Date(expiry_date + " UTC").getTime();
    console.log("expires date:", expiresIn);
    // create transaction
    await Transaction.create({
      type: "account funding",
      description: "account funding",
      transactionReference: tx_ref,
      user,
      amount: Number(flw_amount),
      phoneNumber,
      balance: wallet,
      channel: "virsual_account",
      accountNumber: account_number,
      provider: "flutterwave",
      expiresAt: expiresIn,
    });
    return res.status(200).json({
      account_Details: {
        bank_name,
        account_number,
        expiresIn,
        txRef: tx_ref,
        amount: Number(flw_amount),
      },
    });
  } catch (error) {
    console.log("could not generate account number", error);
  }
  res.status(400).json({ msg: "somthing went wrong please try again" });
};
