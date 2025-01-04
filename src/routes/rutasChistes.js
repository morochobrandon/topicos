import express from "express";
import {Chiste} from "./../models/chistes.js";

const router = express.Router();

//get para obtener un chiste

router.get("/", async (req, res) => {
  const { tipo } = req.query;

  if (!tipo) {
    return res.status(400).send({ error: "Parámetro tipo es requerido" });
  }

  try {
    if (tipo === "Chuck") {
      const response = await fetch("https://api.chucknorris.io/jokes/random");
      const data = await response.json();
      return res.status(200).send(data);
    } else if (tipo === "Dad") {
      const response = await fetch("https://icanhazdadjoke.com/", {
        headers: { Accept: "application/json" },
      });
      const data = await response.json();
      return res.status(200).send(data);
    } else if (tipo === "Propio") {
      const chiste = await Chiste.findOne();
      if (!chiste) {
        return res
          .status(200)
          .send({ message: "Aun no hay chistes, cree uno!" });
      }
      return res.status(200).send(chiste);
    } else {
      return res.status(400).send({ error: "Parámetro tipo no válido" });
    }
  } catch (err) {
    return res.status(500).send({ error: "Error al obtener el chiste" });
  }
});

export default router;