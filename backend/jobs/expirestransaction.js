import cron from "node-cron";
import Transaction from "../models/transaction.js";
export const startExpirePendingTransactions = () => {
  // Runs every 5 minutes
  cron.schedule("*/5 * * * *", async () => {
    try {
      console.log("Running expire pending transactions job...");

      const result = await Transaction.updateMany(
        {
          status: "Pending",
          expiresAt: { $lt: Date.now() },
        },
        {
          $set: { status: "Expired" },
        },
      );

      if (result.modifiedCount > 0) {
        console.log(`Expired ${result.modifiedCount} transactions`);
      }
    } catch (error) {
      console.error("Error expiring transactions:", error);
    }
  });
};

// module.exports = startExpirePendingTransactions;
