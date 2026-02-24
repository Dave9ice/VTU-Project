import { UnauthenticatesError } from "../errors/index.js";
import { verifyToken } from "../utils/jwt.js";

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;
  if (!token) {
    throw new UnauthenticatesError("authentication invalid");
  }
  try {
    const { userID, role } = verifyToken({ token });
    req.user = { userID, role };
    next();
  } catch (error) {
    throw new UnauthenticatesError("authentication invalid");
  }
};

export default authenticateUser;
