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
  // const { txRef, charge_type, entity, status } = payload;
  const { tx_ref, narration, payment_type, status, id } = payload.data;
  const isVisualAccountPayment =
    payment_type === "bank_transfer" &&
    narration === "funding wallet" &&
    tx_ref.startsWith("TRX-");

  if (!isVisualAccountPayment && status === "successful") {
    return res.status(StatusCodes.OK).end();
  }
  // verify transaction
  try {
    const resp = await axios.get(
      `https://api.flutterwave.com/v3/transactions/${id}/verify`,
      {
        headers: {
          Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
        },
      },
    );
    const verifiedTransaction = resp.data.data;
    const { tx_ref, amount } = verifiedTransaction;
    console.log("verified transaction:", verifiedTransaction);
    const transaction = await Transaction.findOne({
      transactionReference: tx_id,
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

// {
//   event: 'charge.completed',
//   data: {
//     id: 1989714443,
//     tx_ref: 'TRX-1107127645779',
//     flw_ref: '100033260224131354281961124964',
//     device_fingerprint: 'N/A',
//     amount: 500,
//     currency: 'NGN',
//     charged_amount: 500,
//     app_fee: 10,
//     merchant_fee: 0,
//     processor_response: 'success',
//     auth_model: 'AUTH',
//     ip: '::ffff:172.16.89.192',
//     narration: 'funding wallet',
//     status: 'successful',
//     payment_type: 'bank_transfer',
//     created_at: '2026-02-24T13:17:10.000Z',
//     account_id: 3409262,
//     customer: {
//       id: 1307162154,
//       name: 'praise Boss',
//       phone_number: '08128905115',
//       email: 'flexybam23@gmail.com',
//       created_at: '2026-02-24T13:10:47.000Z'
//     }
//   }
// }
