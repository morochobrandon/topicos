import express from "express";
import rutasChistes from "./rutasChistes.js";
const router = express.Router();

export function routes(app) {
  console.log("Cargando rutas");
  app.use("/api/v1", router);
  router.use("/chiste", rutasChistes);
}
