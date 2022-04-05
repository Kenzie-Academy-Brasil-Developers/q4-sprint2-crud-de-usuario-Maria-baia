import { Router } from "express";
import { loginUser } from "../controllers/user.controller";
import validateShape from "../middlewares/validateShape.middleware";
import login from "../models/login.models";
import usersRoute from "./users.routes";

const defaultRoute = Router();

defaultRoute.post("/login", validateShape(login), loginUser);

export { usersRoute, defaultRoute };
