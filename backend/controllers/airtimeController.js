import { StatusCodes } from "http-status-codes";
import { fetchPlugingData } from "../utils/actions/data-function.js";

const getAirtime = async (req, res) => {
  const result = await fetchPlugingData();
  const airtime = result.filter((item) => item.category === "Airtime");
  res.status(StatusCodes.OK).json({ airtime });
};

export { getAirtime };
