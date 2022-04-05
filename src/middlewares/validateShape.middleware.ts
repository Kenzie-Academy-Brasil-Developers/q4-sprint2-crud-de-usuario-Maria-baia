import { NextFunction, Request, Response } from "express";
import * as yup from "yup";

const validateShape =
  (schema: yup.AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = await schema.validate(req.body);
      req.validated = validated;
      next();
    } catch (e: any) {
      next({ statusCode: 400, message: e.errors[0] });
    }
  };

export default validateShape;
