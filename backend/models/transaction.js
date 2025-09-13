import mongoose, { Schema } from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    cardNumber: {
      type: String,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    transactionReference: {
      type: String,
      required: true,
    },
    balance: {
      type: String,
      required: true,
    },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", TransactionSchema);
