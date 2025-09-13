import axios from "axios";
import { StatusCodes } from "http-status-codes";
import { verifyCableCardFn } from "../utils/actions/cable-function.js";
import { verifyMeterNoFn } from "../utils/actions/electric-function.js";

const verifyCableCard = async (req, res) => {
  const { cable, cableNumber } = req.body;
  if (!cable | !cableNumber) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please provide cable number and cable" });
  }
  const {
    data: { content },
  } = await verifyCableCardFn({ cable, cableNumber });
  console.log(content);
  if (content.error) {
    res.status(StatusCodes.OK).json({ msg: content.error });
  } else res.status(StatusCodes.OK).json({ msg: content.Customer_Name });
};

const verifyMeterNo = async (req, res) => {
  const { plan, cardno, type } = req.body;
  if (!plan | !cardno | !type) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please provide card number and plan" });
  }
  const {
    data: { content },
  } = await verifyMeterNoFn({ plan, cardno, type });
  if (content.error) {
    res.status(StatusCodes.OK).json({ msg: content.error });
  } else res.status(StatusCodes.OK).json({ msg: content.Customer_Name });
};

export { verifyCableCard, verifyMeterNo };
