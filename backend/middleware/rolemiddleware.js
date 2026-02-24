import { StatusCodes } from "http-status-codes";

const userRoleMiddleware = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(StatusCodes.FORBIDDEN).json({ msg: "access denied" });
  }
  next();
};

export default userRoleMiddleware;
