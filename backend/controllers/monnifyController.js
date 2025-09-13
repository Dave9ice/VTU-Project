import axios from "axios";
import { StatusCodes } from "http-status-codes";
import User from "../models/user.js";
import Funding from "../models/funding.js";

export const monnifyWebHook = async (req, res) => {
  res.status(StatusCodes.OK).json({ received: true });

  try {
    const event = req.body;
    // console.log(event);
    if (event.eventType === "SUCCESSFUL_TRANSACTION") {
      const { transactionReference, amountPaid, paymentReference } =
        event.eventData;
      const tXreference = encodeURIComponent(transactionReference);
      const loginResp = await axios.post(
        "https://sandbox.monnify.com/api/v1/auth/login",
        {},
        {
          headers: {
            Authorization: `Basic ${Buffer.from(
              process.env.MONIFY_API_KEY + ":" + process.env.MONIFY_SECRET_KEY
            ).toString("base64")}`,
          },
        }
      );
      const accessToken = loginResp.data.responseBody.accessToken;
      const verifyResp = await axios.get(
        `https://sandbox.monnify.com/api/v2/transactions/${tXreference}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      // console.log(verifyResp.data);
      const {
        paymentStatus,
        amountPaid: amount,
        paymentMethod,
        transactionReference: reference,
        paidOn: paidAt,
        customer,
      } = verifyResp.data.responseBody;
      const userEmail = customer.email;
      if (verifyResp.data.requestSuccessful && paymentStatus === "PAID") {
        // const amount = verifyResp.data.responseBody.amountPaid;
        // const userEmail = verifyResp.data.responseBody.customer.email;
        // const paymentMethod = verifyResp.data.responseBody.paymentMethod;
        // const reference = verifyResp.data.responseBody.transactionReference;
        // const paidAt = verifyResp.data.responseBody.paidOn;
        const user = await User.findOne({ email: userEmail });
        user.wallet = user.wallet + Number(amount);
        await user.save({ validateBeforeSave: false });
        await Funding.create({
          amount,
          paymentMethod,
          reference,
          status: "SUCCESFULL",
          paidAt,
          userID: user._id,
        });
        return;
      }
      if (verifyResp.data.requestSuccessful && paymentStatus === "FAILED") {
        const user = await User.findOne({ email: userEmail });
        await Funding.create({
          amount,
          paymentMethod,
          reference,
          status: "FAILED",
          paidAt,
          userID: user._id,
        });
      }
    }
  } catch (error) {
    console.log("webhook error", error?.response?.data || error.message);
    throw new Error(error);
  }
};

export const fetchNINDetails = async (NIN) => {
  const loginResp = await axios.post(
    "https://sandbox.monnify.com/api/v1/auth/login",
    {},
    {
      headers: {
        Authorization: `Basic ${Buffer.from(
          process.env.MONIFY_API_KEY + ":" + process.env.MONIFY_SECRET_KEY
        ).toString("base64")}`,
      },
    }
  );
  const accessToken = loginResp.data.responseBody.accessToken;
  // console.log(accessToken);
  try {
    const resp = await axios.post(
      " https://sandbox.monnify.com/api/v1/vas/nin-verify",
      { nin: NIN },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return resp.data;
  } catch (error) {
    // console.log(error);
    console.log(error?.response?.data || error.message);
    throw new Error(error);
  }
};
