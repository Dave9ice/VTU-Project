import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors/index.js";
import Transaction from "../models/transaction.js";

export const gettransactionStatus = async (req, res) => {
  const { trx_ref } = req.query;
  const { userID } = req.user;
  const tx = await Transaction.findOne({
    transactionReference: trx_ref,
    user: userID,
  });
  if (!tx) {
    throw new NotFoundError("no transaction with found");
  }
  res.status(StatusCodes.OK).json({
    transaction: {
      status: tx.status,
      amount: tx.amount,
      walletBalance: tx.balance,
    },
  });
};

export const getUserTransaction = async (req, res) => {
  const { status, sort } = req.query;
  const user = req.user.userID;
  let queryObject = {
    user,
  };
  // SEARCH
  if (status) {
    queryObject.status = status;
  }
  let result = Transaction.find(queryObject).select(
    "amount transactionReference  status  createdAt channel -_id",
  );
  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);
  const tx = await result;
  const totalTX = await Transaction.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalTX / limit);
  res.status(StatusCodes.OK).json({ tx, numOfPages, totalTX });
};
