import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/index.js";
// import { fetchPlugingData } from "../utils/api-data-logic.js";
import axios from "axios";
import { fetchPlugingData } from "../utils/actions/data-function.js";
const getAllProvider = async (req, res) => {
  const { data } = await fetchPlugingData();
  console.log(data);
  if (!data) {
    return res.status(500).json({ msg: "something went wrong" });
  }
  const provider = data
    .map((item) => item.title)
    .filter(
      (item) =>
        item.startsWith("MTN ") ||
        item.startsWith("GLO ") ||
        item.startsWith("AIRTEL") ||
        item.startsWith("9MOBILE")
    );

  res.status(StatusCodes.OK).json({ provider });
};

const getSpecificData = async (req, res) => {
  const { id: provider } = req.params;
  // console.log(provider);

  // const token = await loginIn();
  const { data } = await fetchPlugingData();
  const requestedProd = data.filter((product) => {
    const outerFilter = product.title === provider;
    if (outerFilter) {
      product.plan = product.plan.map((plansAmount) => {
        const { amount } = plansAmount;
        const newAmount = Math.ceil(Number(amount) * 1.03);
        return `${plansAmount.plan}-#${newAmount}`;
      });
      return true;
    }
    return false;
  });

  res.status(200).json({ data: requestedProd });
};

export { getAllProvider, getSpecificData };
