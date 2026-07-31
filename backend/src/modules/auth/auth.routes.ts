import { Router } from "express";
import registerController from "./auth.controller";
import { validate } from "../../middlewares/validate";
import { registerSchema } from "./auth.schema";

const routes = Router();

routes.post("/register", validate(registerSchema), registerController);

export default routes;
