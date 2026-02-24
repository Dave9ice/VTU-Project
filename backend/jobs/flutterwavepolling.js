import cron from "node-cron";
import Transaction from "../models/transaction.js";
import axios from "axios";
import User from "../models/user.js";

export const startFlutterwavePolling = () => {
  cron.schedule("*/30 * * * *", async () => {
    console.log("polling started");
    try {
      const pendingTxs = await Transaction.find({
        status: "Pending",
        provider: "flutterwave",
        channel: { $in: ["card", "virtual_account"] },
      }).limit(10);

      if (pendingTxs.length === 0)
        return console.log("no pending transaction to poll");
      for (const tx of pendingTxs) {
        // CARD PAYMENT
        if (tx.channel === "card" && tx.flwID) {
          try {
            const resp = await axios.get(
              `https://api.flutterwave.com/v3/transactions/${tx.flwID}/verify`,
              {
                headers: {
                  Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
                },
              },
            );
            const flwtx = resp.data.data;
            if (flwtx.status === "successful" && tx.status !== "Successful") {
              const user = await User.findOneAndUpdate(
                { _id: tx.user },
                { $inc: { wallet: flwtx.amount } },
                { new: true },
              );
              tx.verifiedvia = "polling";
              tx.status = "Successful";
              tx.balance = user.wallet;
              await tx.save();
              console.log("card wallet credited", tx.transactionReference);
            } else if (flwtx.status === "failed") {
              tx.status = "Failed";
              await tx.save();
            }
          } catch (error) {
            console.error(
              "card polling error:",
              error,
              tx.transactionReference,
            );
          }
          //   VIRSUAL ACCOUNT PAYMENT POLLING
        } else if (tx.channel === "virsual_account" && tx.accountNumber) {
          try {
            const resp = await axios.get(
              "https://api.flutterwave.com/v3/transactions",
              {
                headers: {
                  Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
                },
                params: {
                  status: "successful",
                  from: new Date(
                    Date.now() - 24 * 60 * 60 * 1000,
                  ).toISOString(),
                  to: new Date().toISOString(),
                },
              },
            );
            const transaction = resp.data.data;
            const matchTx = transaction.find(
              (t) => t.entity?.account_number === tx.accountNumber,
            );
            // check if it has expired
            const isExpired = Date.now() > tx.expiresAt;
            if (isExpired) {
              tx.verifiedvia = "polling";
              tx.status = "Expired";
              await tx.save();
            }
            if (matchTx && tx.status !== "Successful") {
              await User.findOneAndUpdate(
                { _id: tx.user },
                { $inc: { wallet: matchTx.amount } },
              );
              tx.verifiedvia = "polling";
              tx.status = "Successful";
              tx.flwID = matchTx.id;
              await tx.save();
              console.log("VA credited successfully:", tx.transactionReference);
            }
          } catch (error) {
            console.error("virsual_account polling error:", error);
          }
        }
      }
    } catch (error) {
      console.error("polling error:", error);
    }
  });
};
