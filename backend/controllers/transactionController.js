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
