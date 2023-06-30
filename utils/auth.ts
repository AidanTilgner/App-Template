import jwt, { SignOptions } from "jsonwebtoken";
import Logger from "./logger";

const secret = process.env.JWT_SECRET;

const jwtLogger = new Logger({ name: "JWT" });

export const generateToken = async (payload: any, options?: SignOptions) => {
  try {
    return jwt.sign(payload, secret as string, {
      expiresIn: "1h",
      ...options,
    });
  } catch (error) {
    jwtLogger.error(error);
    return undefined;
  }
};

export async function verifyToken<T>(token: string) {
  try {
    return jwt.verify(token, secret as string) as T;
  } catch (error) {
    jwtLogger.error(error);
    return undefined;
  }
}
