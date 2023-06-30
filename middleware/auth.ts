import { verifyToken } from "../utils/auth";
import { Request, Response, NextFunction } from "express";
import Logger from "../utils/logger";
import { getRequesterInfo } from "../utils/requests";

const authLogger = new Logger({ name: "Auth Middleware" });

export const checkToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const requesterInfo = getRequesterInfo(req);
    if (!token) {
      authLogger.warn("No token provided", JSON.stringify(requesterInfo));
      return res.status(401).json({
        message: "No token provided",
      });
    }
    const decoded = await verifyToken(token);
    if (!decoded) {
      authLogger.warn("Invalid token", JSON.stringify(requesterInfo));
      return res.status(401).json({
        message: "Invalid token",
      });
    }
    req.body.decoded = decoded;
    next();
  } catch (error) {
    authLogger.error(error, JSON.stringify(getRequesterInfo(req)));
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
