import { Router } from "express";

const routes = Router();

routes.get("/health", (_, response) => {
  return response.json({
    status: "ok",
    service: "cantina-api",
  });
});

export default routes;
