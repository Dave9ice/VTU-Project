import { StatusCodes } from "http-status-codes";
import CustomApiError from "./custom-api.js";

class UnAuthorizeError extends CustomApiError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

export default UnAuthorizeError;
