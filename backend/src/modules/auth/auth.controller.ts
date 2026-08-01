import { Request, Response } from "express";
import { loginService, registerService } from "./auth.service";

const registerController = async (req: Request, res: Response) => {
  const result = await registerService(req.body);

  return res.status(201).json(result);
};

const loginController = async (req: Request, res: Response) => {
  const result = await loginService(req.body);

  return res.status(200).json(result);
};

export { loginController, registerController };
