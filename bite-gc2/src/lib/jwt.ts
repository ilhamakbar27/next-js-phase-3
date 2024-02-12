import * as jose from "jose";
const SECRET_KEY = process.env.JWT_SECRET || "this-is-not-a-safe-key";
import jwt from "jsonwebtoken";

export const signToken = (payload: object) => jwt.sign(payload, SECRET_KEY);

export const verifyTokenJose = async <T>(token: string) => {
  const secretKey = new TextEncoder().encode(SECRET_KEY);
  const payloadJose = await jose.jwtVerify<T>(token, secretKey);
  return payloadJose.payload;
};
