import { StatusCodes } from "http-status-codes";

const errorHandlerMiddlware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "something went wrong please try agin later",
  };

  return res.status(customError.statusCode).json({ msg: customError.msg });
};

export default errorHandlerMiddlware;
