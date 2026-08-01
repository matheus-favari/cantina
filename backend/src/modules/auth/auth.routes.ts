import { Router } from "express";
import { loginController, registerController } from "./auth.controller";
import { validate } from "../../middlewares/validate";
import { loginSchema, registerSchema } from "./auth.schema";

const routes = Router();

routes.post("/register", validate(registerSchema), registerController);
routes.post("/login", validate(loginSchema), loginController);

export default routes;
