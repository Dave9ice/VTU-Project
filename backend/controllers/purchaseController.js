import axios from "axios";
import { BadRequestError } from "../errors/index.js";

import {
  createTransationInDB,
  detectNetwork,
  updateWallletBalance,
  verifyBalanceWithDb,
} from "../utils/helperFunctions.js";
// import user from "../models/user.js";
import User from "../models/user.js";
import { buyElectricity } from "../utils/actions/electric-function.js";
import { purchaseCableFn } from "../utils/actions/cable-function.js";
import { purchaseAirtimeFn } from "../utils/actions/airtime-function.js";
import { purchaseDataFn } from "../utils/actions/data-function.js";
import { StatusCodes } from "http-status-codes";

const purchaseData = async (req, res) => {
  const { amount, phoneNumber, plan, subcategory_id, ported, provider } =
    req.body;
  const userID = req.user.userID;
  if (!amount || !phoneNumber || !plan || !subcategory_id || !provider) {
    throw new BadRequestError("please provide all fields");
  }
  const newProvider = provider.split(" ")[0];
  const newPlan = plan.split("-")[0];

  const network = detectNetwork(phoneNumber);
  if (newProvider !== network) {
    throw new BadRequestError(
      `${phoneNumber} is not an/a ${newProvider} number`
    );
  }

  const custom_reference = "TXN" + Date.now();
  await verifyBalanceWithDb(amount, userID);
  const result = await purchaseDataFn({
    plan_id: newPlan,
    phonenumber: phoneNumber,
    subcategory_id,
    custom_reference,
  });

  const user = await updateWallletBalance({ userID, amount });
  console.log(result);
  await createTransationInDB({
    amount,
    phoneNumber,
    type: "Data Purchase",
    transactionReference: custom_reference,
    balance: user.wallet,
    user: userID,
    description: result.data,
  });
  res.send(StatusCodes.OK).json({ msg: result.data });
};

const purchaseElectricity = async (req, res) => {
  const {
    amount,
    phonenumber,
    plan,
    cardno,
    variation_code,
    charge,
    // serviceID,
  } = req.body;
  // console.log(custom_reference);
  const userID = req.user.userID;
  if (
    !amount ||
    !phonenumber ||
    !plan ||
    !cardno ||
    !variation_code ||
    !charge
  ) {
    throw new BadRequestError("please provide complete info");
  }
  const newPlan = plan.split("-")[1].split(" ").join("-");
  const serviceID = plan.replace(/(\S)\s*-\s*(\S)/, "$1 - $2");
  const custom_reference = "TXN" + Date.now();

  await verifyBalanceWithDb({ amount: charge, userID });

  const result = await buyElectricity({
    amount,
    phonenumber,
    plan: newPlan,
    cardno,
    variation_code,
    serviceID,
    custom_reference,
  });

  console.log(result);

  const user = await updateWallletBalance({ userID, amount: charge });
  await createTransationInDB({
    phoneNumber: phonenumber,
    amount: charge,
    cardNumber: cardno,
    user: userID,
    type: "Electricity Purchase",
    balance: user.wallet,
    transactionReference: custom_reference,
    description: result.data,
  });
  console.log(result);
  res.send(StatusCodes.OK).json({ msg: result.data });
};

const purchaseCable = async (req, res) => {
  const { plan, phonenumber, amount, cardno, variation_code, charge } =
    req.body;
  // console.log(req.body);
  const userID = req.user.userID;
  if (
    !plan ||
    !phonenumber ||
    !amount ||
    !cardno ||
    !variation_code ||
    !charge
  ) {
    throw new BadRequestError("please provide all fields");
  }
  const custom_reference = "TXN" + Date.now();
  await verifyBalanceWithDb({ userID, amount: charge });
  const result = await purchaseCableFn({
    plan,
    phonenumber,
    amount,
    cardno,
    variation_code,
    custom_reference,
  });
  const user = await updateWallletBalance({ userID, amount: charge });
  await createTransationInDB({
    amount: charge,
    phoneNumber: phonenumber,
    cardNumber: cardno,
    balance: user.wallet,
    transactionReference: custom_reference,
    user: userID,
    type: "Cable Subscription",
    description: result.data,
  });

  res.staus(StatusCodes.OK).json({ msg: result.data });
};

const purchaseAirtime = async (req, res) => {
  const { amount, charge, phonenumber, subcategory_id, ported, provider } =
    req.body;
  const userID = req.user.userID;
  if (!amount || !charge || !phonenumber || !subcategory_id || !provider) {
    throw new BadRequestError("please provide all fields");
  }
  const custom_reference = "TXN" + Date.now();
  await verifyBalanceWithDb({ userID, amount: charge });
  const network = detectNetwork(phonenumber);
  if (provider !== network) {
    throw new BadRequestError(`${phonenumber} is not an/a ${provider} number`);
  }
  const result = await purchaseAirtimeFn({
    amount,
    subcategory_id,
    phonenumber,
    custom_reference,
  });

  const user = await updateWallletBalance({ userID, amount: charge });
  await createTransationInDB({
    amount: charge,
    phoneNumber: phonenumber,
    user: userID,
    type: "Airtime Purchase",
    transactionReference: custom_reference,
    balance: user.wallet,
    description: result.data,
  });
  console.log(result);
  res.status(StatusCodes.OK).json({ msg: result.data });
};
export { purchaseData, purchaseElectricity, purchaseCable, purchaseAirtime };
