import jwt from "jsonwebtoken";
const createJWt = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

export const verifyToken = ({ token }) => {
  const verifiedJWTToken = jwt.verify(token, process.env.JWT_SECRET);
  return verifiedJWTToken;
};

export const attashCookiesToResponse = ({ res, user }) => {
  const token = createJWt({ payload: user });
  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(Date.now() + oneDay),
    signed: true,
    sameSite: "none",
  });
};
