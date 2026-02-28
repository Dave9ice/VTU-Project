import axios from "axios";
import {
  loginInPlugin,
  updatePurchaseToken,
  updateToken,
} from "../helperFunctions.js";
import PluginToken from "../../models/pluging.js";

export const purchaseAirtimeFn = async ({
  amount,
  plan,
  subcategory_id,
  phonenumber,
  custom_reference,
}) => {
  const data = await PluginToken.find({});
  const token = data[1].purchasetoken;
  try {
    const resp = await axios.post(
      "https://pluginng.com/api/purchase/airtime",
      { amount, plan, subcategory_id, phonenumber, custom_reference },
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return resp.data;
  } catch (error) {
    // console.log(error);
    if (axios.isAxiosError(error)) {
      if (error.response.status === 401) {
        const token = await updatePurchaseToken();
        const retryResp = await axios.post(
          "https://pluginng.com/api/purchase/airtime",
          { amount, plan, subcategory_id, phonenumber, custom_reference },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        // console.log(resp.data);
        return retryResp.data;
      } else {
        console.log("error purhasing airtime", error);
        throw new Error(
          "internal server error: it seems this service is down we are working on it.. please try again later",
        );
      }
    } else {
      console.log("error purhasing airtime", error);
      throw new Error(
        "internal server error: it seems this service is down we are working on it.. please try again later",
      );
    }
  }
};
