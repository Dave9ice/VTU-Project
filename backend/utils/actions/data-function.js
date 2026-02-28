import axios from "axios";
import {
  loginInPlugin,
  updatePurchaseToken,
  updateToken,
} from "../helperFunctions.js";
import plugingToken from "../../models/pluging.js";

export const fetchPlugingData = async () => {
  const data = await plugingToken.find({});
  const token = data[0].token;
  try {
    const resp = await axios.get(`https://pluginng.com/api/get/plans`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // res.status(200).json({ msg: resp.data.status })
    // console.log(resp.data);
    return resp.data || [];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response.status === 401) {
        const token = await updateToken();
        const retryResp = await axios.get(
          "https://pluginng.com/api/get/plans",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        return retryResp.data || [];
      } else {
        console.log("error fetching pluging data:", error);
        throw new Error("internal server error");
      }
    } else {
      console.log("error fetching pluging data:", error);
      throw new Error("internal server error");
    }
  }
};

export const purchaseDataFn = async ({
  plan_id,
  phonenumber,
  subcategory_id,
  custom_reference,
}) => {
  const data = await plugingToken.find({});
  const token = data[1].purchasetoken;
  try {
    const resp = await axios.post(
      "https://pluginng.com/api/purchase/data",
      { plan_id, phonenumber, subcategory_id, custom_reference },
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return resp.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response.status === 401) {
        const token = await updatePurchaseToken();
        const retryResp = await axios.get(
          "https://pluginng.com/api/purchase/data",
          { plan_id, phonenumber, subcategory_id },
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        return retryResp.data;
      } else {
        console.log("error purchasing data:", error);
        throw new Error("internal server error");
      }
    } else {
      console.log("error purchasing data:", error);
      throw new Error("internal server error");
    }
  }
};
