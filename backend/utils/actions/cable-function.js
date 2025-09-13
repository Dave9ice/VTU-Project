import axios from "axios";
import { loginInPlugin, updateToken } from "../helperFunctions.js";
import PluginToken from "../../models/pluging.js";

export const fetchPlunginCable = async (cable) => {
  const data = await PluginToken.find({});
  const token = data[0].token;
  try {
    const resp = await axios.get(
      `https://pluginng.com/api/fetch/bouquet?plan=${cable}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return resp.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response.status === 401) {
        const token = await updateToken();
        const retryResp = await axios.get(
          `https://pluginng.com/api/fetch/bouquet?plan=${cable}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        return retryResp.data;
      } else {
        console.log(error);
        throw new Error(error);
      }
    } else {
      console.log(error);
      throw new Error(error);
    }
  }
};

export const verifyCableCardFn = async ({ cable, cableNumber }) => {
  const data = await PluginToken.find({});
  const token = data[0].token;
  try {
    const resp = await axios.post(
      "https://pluginng.com/api/verify/card",
      {
        plan: cable,
        cardno: cableNumber,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    // console.log(resp.data);
    return resp.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response.status === 401) {
        const token = await updateToken();
        const retryResp = await axios.post(
          "https://pluginng.com/api/verify/card",
          {
            plan: cable,
            cardno: cableNumber,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        // console.log(resp.data);
        return retryResp.data;
      } else {
        console.log(error);
        throw new Error(error);
      }
    } else {
      console.log(error);
      throw new Error(error);
    }
  }
};
export const purchaseCableFn = async ({
  plan,
  phonenumber,
  amount,
  cardno,
  variation_code,
  custom_reference,
}) => {
  const data = await PluginToken.find({});
  const token = data[0].token;
  try {
    const resp = await axios.post(
      "https://pluginng.com/api/purchase/cable",
      { plan, phonenumber, amount, cardno, variation_code, custom_reference },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return resp.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response.status === 401) {
        const token = await updateToken();
        const retryResp = await axios.post(
          "https://pluginng.com/api/purchase/cable",
          {
            plan,
            phonenumber,
            amount,
            cardno,
            variation_code,
            custom_reference,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        // console.log(resp.data);
        return retryResp.data;
      } else {
        console.log(error);
        throw new Error(error);
      }
    } else {
      console.log(error);
      throw new Error(error);
    }
  }
};
