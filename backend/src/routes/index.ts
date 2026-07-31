import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes";

const routes = Router();

routes.get("/health", (_, res) => {
  return res.json({
    status: "ok",
    service: "cantina-api",
  });
});

routes.use("/auth", authRoutes);

export default routes;
