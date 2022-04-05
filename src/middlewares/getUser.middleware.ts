import { NextFunction, Request, Response } from "express";
import UserRepository from "../repositories/user/index";

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  const user = await new UserRepository().retrieveUserById(req.uuid);
  req.user = user;
  next();
};

export default getUser;
