import mongoose, { Schema } from "mongoose";

const FundingSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    reference: { type: String, required: true, unique: true },
    status: {
      type: String,
      emum: ["PENDING", "PAID", "FAILED"],
      default: "PENDING",
    },
    paidAt: { type: Date },
    userID: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Funding", FundingSchema);
