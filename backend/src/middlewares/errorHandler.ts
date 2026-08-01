import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError";
import { ZodError } from "zod";

const errorHandler = (error: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }

  if (error instanceof ZodError) {
    return res.status(400).json({
      message: "Dados inválidos",
      errors: error.issues.map((issue) => ({
        field: issue.path[0],
        message: issue.message,
      })),
    });
  }

  return res.status(500).json({
    message: "Erro interno do servidor",
  });
};

export default errorHandler;
