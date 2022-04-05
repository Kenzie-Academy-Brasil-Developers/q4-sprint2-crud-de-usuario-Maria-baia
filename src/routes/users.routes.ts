import { Router } from "express";
import {
  createUser,
  getAllUsers,
  getUserProfile,
  updateUser,
  deleteUser,
} from "../controllers/user.controller";
import { create, update } from "../models";
import {
  validateShape,
  authenticateUser,
  getUser,
  permission,
} from "../middlewares";

const usersRoute = Router();
usersRoute.post("", validateShape(create), createUser);
usersRoute.get("", authenticateUser, getUser, permission, getAllUsers);
usersRoute.get("/profile", authenticateUser, getUser, getUserProfile);
usersRoute.patch(
  "/:uuid",
  validateShape(update),
  authenticateUser,
  getUser,
  updateUser
);
usersRoute.delete("/:uuid", authenticateUser, getUser, deleteUser);

export default usersRoute;
