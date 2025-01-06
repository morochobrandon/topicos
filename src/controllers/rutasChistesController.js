//import fetch from "node-fetch";
import { Chiste } from "./../models/chistes.js";

export const getChiste = async (req, res) => {
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
      const count = await Chiste.countDocuments();
      const random = Math.floor(Math.random() * count);
      const chiste = await Chiste.findOne().skip(random);
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
};
