// const express = require("express");
// const crypto = require("crypto");
// const axios = require("axios");
// const bodyParser = require("body-parser");

// const app = express();

// // Replace with your Monnify secret key for webhook signature verification
// const MONNIFY_SECRET_KEY = "your_monify_secret_key";
// // Replace with your Monnify API credentials
// const MONNIFY_API_KEY = "your_monify_api_key";
// const MONNIFY_API_SECRET = "your_monify_api_secret";
// // Base URL for Monnify API
// const MONNIFY_BASE_URL = "https://api.monnify.com/api/v1";

// // Middleware to parse raw body for signature verification
// app.use(
//   bodyParser.json({
//     verify: (req, res, buf) => {
//       req.rawBody = buf;
//     },
//   })
// );

// // In-memory storage to simulate a DB for demo (replace with your real DB)
// const processedTransactions = new Set();
// const users = {
//   // Example: accountReference => user object
//   USER123REF: { id: 1, name: "Alice", walletBalance: 1000 },
//   // Add your real users here
// };

// // Helper: Verify webhook signature from Monnify
// function verifySignature(rawBody, signature) {
//   const hash = crypto
//     .createHmac("sha512", MONNIFY_SECRET_KEY)
//     .update(rawBody)
//     .digest("hex");

//   return hash === signature;
// }

// // Helper: Verify transaction status with Monnify API
// async function verifyTransaction(transactionReference) {
//   try {
//     // Get Bearer token
//     const tokenResponse = await axios.post(`${MONNIFY_BASE_URL}/auth/login`, {
//       apiKey: MONNIFY_API_KEY,
//       secretKey: MONNIFY_API_SECRET,
//     });

//     const token = tokenResponse.data.responseBody.accessToken;

//     // Fetch transaction details
//     const txResponse = await axios.get(
//       `${MONNIFY_BASE_URL}/transactions/${transactionReference}`,
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );

//     return txResponse.data.responseBody;
//   } catch (err) {
//     console.error("Error verifying transaction:", err.message);
//     return null;
//   }
// }

// app.post("/monnify/webhook", async (req, res) => {
//   const signature = req.headers["x-signature"];
//   const rawBody = req.rawBody;

//   if (!verifySignature(rawBody, signature)) {
//     console.warn("Invalid webhook signature");
//     return res.status(401).send("Unauthorized");
//   }

//   const eventData = req.body;

//   // You can log event data for debugging:
//   console.log("Webhook received:", eventData);

//   const transactionRef = eventData.eventData.transactionReference;
//   const accountReference = eventData.eventData.accountReference; // reserved account reference or user reference
//   const amountPaid = eventData.eventData.amountPaid;
//   const paymentStatus = eventData.eventData.paymentStatus; // e.g., 'PAID'

//   // Idempotency: Check if this transaction was already processed
//   if (processedTransactions.has(transactionRef)) {
//     console.log(`Transaction ${transactionRef} already processed.`);
//     return res.status(200).send("Already processed");
//   }

//   if (paymentStatus !== "PAID") {
//     console.log(`Transaction ${transactionRef} status not PAID. Ignoring.`);
//     return res.status(200).send("Not a successful payment");
//   }

//   // Verify transaction status with Monnify API (extra security)
//   const verifiedTransaction = await verifyTransaction(transactionRef);
//   if (!verifiedTransaction || verifiedTransaction.paymentStatus !== "PAID") {
//     console.log(
//       `Transaction ${transactionRef} verification failed or not paid.`
//     );
//     return res.status(400).send("Transaction not verified");
//   }

//   // Find user by accountReference
//   const user = users[accountReference];
//   if (!user) {
//     console.warn(`User not found for accountReference: ${accountReference}`);
//     return res.status(400).send("User not found");
//   }

//   // All checks passed, credit user wallet
//   user.walletBalance += amountPaid;

//   // Mark transaction as processed to avoid duplicates
//   processedTransactions.add(transactionRef);

//   console.log(
//     `Credited user ${user.name} (ID: ${user.id}) with amount: ${amountPaid}. New balance: ${user.walletBalance}`
//   );

//   return res.status(200).send("Wallet funded successfully");
// });

// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Monnify webhook listener running on port ${PORT}`);
// });
