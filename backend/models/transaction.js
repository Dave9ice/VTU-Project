import mongoose, { Schema } from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    channel: {
      type: String,
      enum: ["card", "virsual_account", "wallet"],
      default: "wallet",
    },
    accountNumber: { type: String },
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
    provider: {
      type: String,
      // default: "flutterwave",
    },
    flwID: {
      Type: String,
    },
    verifiedvia: {
      type: String,
      enum: ["webhook", "polling"],
      default: "webhook",
    },
    expiresAt: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Pending", "Failed", "Successful", "Expired"],
      default: "Pending",
    },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
);

export default mongoose.model("Transaction", TransactionSchema);
