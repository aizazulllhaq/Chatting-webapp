import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constant.js";

export const checkAuthentication = (req, res, next) => {
  let accessToken;
  if (req.cookies) {
    accessToken = req.cookies?.accessToken;
  }

  req.user = null;

  if (!accessToken) return next();

  try {
    const user = jwt.verify(accessToken, JWT_SECRET);

    req.user = user;

    next();
  } catch (error) {
    return res.status(40).json({ message: "Invalid Token" });
  }
};

export const restrictFromSecureRoutes = (role = []) => {
  return (req, res, next) => {
    if (!req.user)
      return res.status(400).json({ message: "Please First Login" });

    if (!req.user.isVerified)
      return res.status(400).json({ message: "Please first verify your mail" });

    if (!role.includes(req.user.role))
      return res.status(400).json({ message: "Invalid Role" });

    next();
  };
};
