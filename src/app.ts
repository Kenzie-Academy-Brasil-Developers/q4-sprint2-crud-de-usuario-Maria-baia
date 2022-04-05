import express, { NextFunction, Request, Response } from "express";
import { usersRoute, defaultRoute } from "./routes";
import { ErrorHandler, handleError } from "./utils/error";

const app = express();
app.use(express.json());
app.use(defaultRoute);
app.use("/users", usersRoute);
app.use(
  (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
    handleError(err, res);
  }
);

export default app;
