import { StatusCodes } from "http-status-codes";
import { fetchPlunginCable } from "../utils/actions/cable-function.js";

const fetchCablePlans = async (req, res) => {
  const { id: cable } = req.params;
  const { data: result } = await fetchPlunginCable(cable);

  res.status(StatusCodes.OK).json({ result });
};

export { fetchCablePlans };
