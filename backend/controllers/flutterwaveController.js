import { StatusCodes } from "http-status-codes";
import Transaction from "../models/transaction.js";
import User from "../models/user.js";
import axios from "axios";

export const flutterwaveWebhook = async (req, res) => {
  const secretHash = process.env.FLUTTERWAVE_SIGNATURE;
  const signature = req.headers["verif-hash"];
  // console.log(signature)
  if (!signature || signature !== secretHash) {
    return res.status(400).end();
  }
  const payload = req.body;
  console.log(payload);
  const { txRef, charge_type, entity, status } = payload;
  const isVisualAccountPayment =
    charge_type === "normal" &&
    entity?.account_number &&
    txRef.startsWith("TRX-");

  if (!isVisualAccountPayment && status === "successful") {
    return res.status(StatusCodes.OK).end();
  }
  // verify transaction
  try {
    const resp = await axios.get(
      `https://api.flutterwave.com/v3/transactions/${payload.id}/verify`,
      {
        headers: {
          Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
        },
      },
    );
    const verifiedTransaction = resp.data.data;
    const { tx_ref, amount } = verifiedTransaction;
    const transaction = await Transaction.findOne({
      transactionReference: tx_ref,
    });
    // check account expiry
    const isExpired = Date.now() > transaction.expiresAt;
    if (isExpired) {
      ((transaction.status = "Expired"), (transaction.verifiedvia = "webhook"));
      await transaction.save();
      return res.status(StatusCodes.OK).end();
    }
    // allready processed
    if (!transaction || transaction.status === "Successful") {
      console.log("already processed");
      return res.status(StatusCodes.OK).end();
    }
    // amount validation
    if (Number(amount) !== Number(transaction.amount)) {
      await Transaction.findOneAndUpdate(
        { transactionReference: tx_ref },
        { status: "Failed", verifiedvia: "webhook" },
      );
      res.status(StatusCodes.OK).end();
    }
    //   crediting wallet
    const user = await User.findOneAndUpdate(
      { _id: transaction.user },
      { $inc: { wallet: Number(amount) } },
      { new: true, runValidators: true },
    );
    await Transaction.findOneAndUpdate(
      { transactionReference: tx_ref },
      {
        status: "Successful",
        balance: Number(user.wallet),
        verifiedvia: "webhook",
      },
      { new: true, runValidators: true },
    );
    res.status(StatusCodes.OK).end();
  } catch (error) {
    console.error("could not verify webhook transaction", error);
    res.status(200).end();
  }

  // res.status(200).end();
};
