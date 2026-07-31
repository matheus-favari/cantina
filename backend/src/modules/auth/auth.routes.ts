import { Router } from "express";
import registerController from "./auth.controller";

const routes = Router();

routes.post("/register", registerController);

export default routes;
