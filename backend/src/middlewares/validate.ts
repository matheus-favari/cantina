import { NextFunction, Request, Response } from "express";
import z from "zod";

const validate = (schema: z.ZodSchema) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    schema.parse(req.body);

    next();
  };
};

export { validate };
