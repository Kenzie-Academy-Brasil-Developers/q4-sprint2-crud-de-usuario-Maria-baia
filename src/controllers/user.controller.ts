import { Request, Response } from "express";
import UserRepository from "../repositories/user";
import serializeUser from "../services/serializeUser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jwtConfigs } from "../configs";

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await new UserRepository().createUser(req.validated);
    const response = serializeUser(user);

    return res.status(201).json(response);
  } catch (e) {
    return res.status(400).json({ message: "Email already registered" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  if (!req.user.isAdm && uuid !== req.user.uuid) {
    return res.status(401).json({ message: "Missing admin permissions" });
  }

  const result = await new UserRepository().deleteUser(uuid);

  return res.status(200).json({ message: "User deleted with success" });
};

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await new UserRepository().retrieveUsers();
  const response = users.map((user) => serializeUser(user));

  return res.status(200).json(response);
};

export const getUserProfile = async (req: Request, res: Response) => {
  const response = serializeUser(req.user);

  return res.status(200).json(response);
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.validated;
  const user = await new UserRepository().retrieveUserByEmail(email);

  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res.status(401).json({ message: "Wrong email/password" });
  }

  const { secretKey, expiresIn } = jwtConfigs;
  const token = jwt.sign({ email, uuid: user.uuid }, secretKey, { expiresIn });

  return res.status(200).json({ token });
};

export const updateUser = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  if (!req.user.isAdm && uuid !== req.user.uuid) {
    return res.status(401).json({ message: "Missing admin permissions" });
  }

  await new UserRepository().updateUser(uuid, req.validated);

  const user = await new UserRepository().retrieveUserById(uuid);
  const response = serializeUser(user);

  return res.status(200).json(response);
};
