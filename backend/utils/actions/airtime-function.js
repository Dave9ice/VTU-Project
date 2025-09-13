import axios from "axios";
import { loginInPlugin, updateToken } from "../helperFunctions.js";
import PluginToken from "../../models/pluging.js";

export const purchaseAirtimeFn = async ({
  amount,
  plan,
  subcategory_id,
  phonenumber,
  custom_reference,
}) => {
  const data = await PluginToken.find({});
  const token = data[0].token;
  try {
    const resp = await axios.post(
      "https://pluginng.com/api/purchase/airtime",
      { amount, plan, subcategory_id, phonenumber, custom_reference },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return resp.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response.status === 401) {
        const token = await updateToken();
        const retryResp = await axios.post(
          "https://pluginng.com/api/purchase/airtime",
          { amount, plan, subcategory_id, phonenumber, custom_reference },
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
