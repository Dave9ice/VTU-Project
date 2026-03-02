import axios from "axios";
import {
  loginInPlugin,
  updatePurchaseToken,
  updateToken,
} from "../helperFunctions.js";
import PluginToken from "../../models/pluging.js";

export const verifyMeterNoFn = async ({ cardno, plan, type }) => {
  const data = await PluginToken.find({});
  const token = data[0].token;
  try {
    const resp = await axios.post(
      "https://pluginng.com/api/verify/card",
      { plan, cardno, type },
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return resp.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response.status === 401) {
        const token = await updateToken();
        const retryResp = await axios.post(
          "https://pluginng.com/api/verify/card",
          {
            plan,
            cardno,
            type,
          },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        // console.log(resp.data);
        return retryResp.data;
      } else {
        console.error("Error Verifying Meter No:", error);
        throw new Error("INTERNAL SERVER ERROR");
      }
    } else {
      console.error("Error Verifying Meter No:", error);
      throw new Error("INTERNAL SERVER ERROR");
    }
  }
};

export const fetchelectricPlan = async (provider) => {
  const data = await PluginToken.find({});
  const token = data[0].token;
  try {
    const resp = await axios.get(
      `https://pluginng.com/api/fetch/bouquet?plan=${provider}`,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return resp.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response.status === 401) {
        const token = await updateToken();
        const retryResp = await axios.get(
          `https://pluginng.com/api/fetch/bouquet?plan=${provider}`,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        // console.log(resp.data);
        return retryResp.data;
      } else {
        console.error("Error Fetching Electricity Plan:", error);
        throw new Error("INTERNAL SERVER ERROR");
      }
    } else {
      console.error("Error Fetching Electricity Plan:", error);
      throw new Error("INTERNAL SERVER ERROR");
    }
  }
};
export const buyElectricity = async ({
  plan,
  amount,
  serviceID,
  variation_code,
  cardno,
  phonenumber,
  custom_reference,
}) => {
  const data = await PluginToken.find({});
  const token = data[1].purchasetoken;

  try {
    const resp = await axios.post(
      "https://pluginng.com/api/purchase/electricity",
      {
        plan,
        amount,
        serviceID,
        variation_code,
        cardno,
        phonenumber,
        custom_reference,
      },
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return resp.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response.status === 401) {
        const token = await updatePurchaseToken();
        const retryResp = await axios.post(
          "https://pluginng.com/api/purchase/electricity",
          {
            plan,
            amount,
            serviceID,
            variation_code,
            cardno,
            phonenumber,
            custom_reference,
          },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        // console.log(resp.data);
        return retryResp.data;
      } else {
        console.error("Error Buying Electricity:", error);

        throw new Error("INTERNAL SERVER ERROR");
      }
    } else {
      console.error("Error Buying Electricity:", error);
      throw new Error("INTERNAL SERVER ERROR");
    }
  }
};

export const fetchElectricityFn = async (req, res) => {
  const data = await PluginToken.find({});
  const token = data[0].token;
  try {
    const resp = await axios.get(
      "https://pluginng.com/api/fetch/bouquet?plan=Electricity",
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return resp.data;
  } catch (error) {
    console.error("Error Fetching Electricity:", error);

    throw new Error("INTERNAL SERVER ERROR: unable to fetch elctricity plans");
  }
};
