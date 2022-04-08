import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../utils/error";
import jwt from "jsonwebtoken";
import { jwtConfigs } from "../configs";

const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const auth = req.headers.authorization;

    if (!auth) {
      throw new ErrorHandler(401, "Missing header authorization");
    }

    const token = auth.split(" ")[1];

    jwt.verify(token, jwtConfigs.secretKey, (err, decode) => {
      if (err) {
        throw new ErrorHandler(401, "Unauthorized");
      }
      if (typeof decode !== "string" && decode) {
        req.uuid = decode.uuid;
        req.email = decode.email;
      }
    });
    next();
  } catch (e) {
    next(e);
  }
};
export default authenticateUser;
