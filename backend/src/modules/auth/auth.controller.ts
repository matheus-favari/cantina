import { Request, Response } from "express";
import registerService from "./auth.service";

const registerController = async (req: Request, res: Response) => {
  const result = await registerService(req.body);

  return res.status(201).json(result);
};

export default registerController;
