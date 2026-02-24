import { StatusCodes } from "http-status-codes";
import User from "../models/user.js";
import Transaction from "../models/transaction.js";

export const getUsersNo = async (req, res) => {
  const userCount = (await User.find({})).length;
  const transactionCount = (await Transaction.find({})).length;
  const pendingTransaction = (await Transaction.find({ status: "Pending" }))
    .length;
  const successfulTransaction = (
    await Transaction.find({ status: "Successful" })
  ).length;
  const successfulPayment = (
    await Transaction.find({ status: "Successful", provider: "flutterwave" })
  ).length;
  res.status(StatusCodes.OK).json({
    userCount,
    transactionCount,
    pendingTransaction,
    successfulTransaction,
    successfulPayment,
  });
};

export const getTransactions = async (req, res) => {
  const { status, trx_id, sort } = req.query;
  let queryObject = {};
  // SEARCH
  if (status && status !== "all") {
    queryObject.status = status;
  }
  if (trx_id) {
    ((queryObject.status = status),
      (queryObject.transactionReference = trx_id));
  }
  let transaction = Transaction.find(queryObject)
    .select(
      "amount transactionReference user status verifiedvia createdAt channel -_id",
    )
    .populate({ path: "user" });
  // SORT
  if (sort === "latest") {
    transaction = transaction.sort("-createdAt");
  }
  if (sort === "oldest") {
    transaction = transaction.sort("createdAt");
  }
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  const skip = (page - 1) * limit;
  transaction = transaction.skip(skip).limit(limit);
  const filteredTx = await transaction;
  const totalTX = await Transaction.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalTX / limit);
  const tx = filteredTx.map((item) => {
    const {
      channel,
      amount,
      transactionReference,
      verifiedvia,
      createdAt,
      status,
    } = item;
    const { email } = item?.user || {};
    const newobject = {
      paymentMethod: channel,
      amount,
      trx_id: transactionReference,
      verifiedvia,
      createdAt,
      status,
      user: email,
    };
    return newobject;
  });
  res.status(StatusCodes.OK).json({ tx, totalTX, numOfPages });
};
