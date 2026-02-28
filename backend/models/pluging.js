import mongoose from "mongoose";

const PluginSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      default: "",
    },
    purchasetoken: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

export default mongoose.model("PluginToken", PluginSchema);
