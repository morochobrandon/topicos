//import fetch from "node-fetch";
import { Chiste } from "./../models/chistes.js";

//Brandon:
// Endpoint 1: Obtener un chiste Chuck, Dad o Propio

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

// Endpoint 2: Crear un nuevo chiste
const categoriasPermitidas = ["Dad joke", "Humor Negro", "Chistoso", "Malo"];

export const postChiste = async (req, res) => {
  try {
    const {
      texto,
      autor = "Se perdió en el Ávila como Led",
      puntaje,
      categoria,
    } = req.body;

    if (!texto || !puntaje || !categoria) {
      return res
        .status(400)
        .send({ error: "Texto, puntaje y categoría son requeridos" });
    }
    if (!categoriasPermitidas.includes(categoria)) {
      return res.status(400).send({
        error:
          "Categoría no válida. Las categorías permitidas son: Dad joke, Humor Negro, Chistoso, Malo",
      });
    }

    const nuevoChiste = new Chiste({ texto, autor, puntaje, categoria });
    await nuevoChiste.save();

    return res.status(201).send({ id: nuevoChiste._id });
  } catch (err) {
    return res.status(500).send({ error: "Error al guardar el chiste" });
  }
};

//Mario: 
// Endpoint 3: Actualizar cualquier campo de un chiste

export const putChiste = async (req, res) => {
  try {
    const { id } = req.params;
    const { texto, autor, puntaje, categoria } = req.body;
    const chiste = await Chiste.findById(id);   
    if (!chiste) {
      return res.status(404).json({ message: 'Chiste no encontrado' });
    }
    if (texto) {
      chiste.texto = texto;
    }
    if (autor) {
      chiste.autor = autor;
    }
    if (puntaje) {
      chiste.puntaje = puntaje;
    }
    if (categoria) {
      if (!categoriasPermitidas.includes(categoria)) { 
        return res.status(400).send({ error: 'Categoría no válida. Las categorías permitidas son: Dad joke, Humor Negro, Chistoso, Malo' });
      }
      chiste.categoria = categoria;
    }
    await chiste.save();
    return res.status(200).json(chiste);
  } catch (err) {
    return res.status(500).send({ error: 'Error al actualizar el chiste' });
  }
};


// Endpoint 4: Eliminar un chiste por su id
export const deleteChiste = async (req, res) => {
  const { id } = req.params;
  try {
    const chiste = await Chiste.findById(id);   
    if (!chiste) {
      return res.status(404).json({ message: 'Chiste no encontrado' });
    }
    await chiste.deleteOne(); 
    return res.status(200).send("Chiste eliminado con éxito (Gracias a Dios)");
  } catch (err) {
    return res.status(500).send({ error: 'Error al eliminar el chiste' });
  }
};

// Endpoint 5: Mostrar un chiste por su id
export const getChistePorId = async (req, res) => {
  try {
    const { id } = req.params;
    const chiste = await Chiste.findById(id);   
    if (!chiste) {
      return res.status(404).json({ message: 'Chiste no encontrado' });
    }
    return res.status(200).json(chiste);
  } catch (err) {
    return res.status(500).send({ error: 'Error al buscar el chiste, verifica la id' });
  }
};

// Eros: 
// Endpoint 6: Contar el número de chistes por categoría

export async function contarCategoria(req, res) {
  try {
    const { categoria } = req.params;
    if (!categoriasPermitidas.includes(categoria)) {
      return res.status(400).json({ error: "Categoría inválida" });
    }
    const count = await Chiste.countDocuments({ categoria });
    if (count === 0) {
      return res.status(404).json({ error: "No se encontraron chistes para la categoría especificada" });
    }
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la cantidad de chistes" });
  }
}

// Endpoint 7: Contar chistes por puntaje

export async function contarPuntaje(req, res) {
  try {
    const { puntaje } = req.params;

    if (typeof parseInt(puntaje) !== "number") {
      return res.status(400).json({ error: "El puntaje debe ser de tipo numerico" });
    }
    const count = await Chiste.countDocuments({ puntaje });
    if (count === 0) {
      return res.status(404).json({ error: "No se encontraron chistes con el puntaje especificado" });
    }
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la cantidad de chistes por puntaje" });
  }
}

// Extra
// Endpoint 8: Mostrar todos los chistes de una categoría

export async function mostrarChistesCategoria (req, res) {
  try {
    const { categoria } = req.params;
    if (!categoriasPermitidas.includes(categoria)) {
      return res.status(400).json({ error: "Categoría inválida" });
    }
    const chistes = await Chiste.find({ categoria });
    if (chistes.length === 0) {
      return res.status(404).json({ error: "No se encontraron chistes para la categoría especificada" });
    }
    res.status(200).json(chistes);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los chistes" });
  }
}

// Endpoint 9: Mostrar todos los chistes

export async function mostrarTodos (req, res) {
  try {
    const chistes = await Chiste.find();
    if (chistes.length === 0) {
      return res.status(404).json({ error: "No hay chistes en la base de datos" });
    }
    res.status(200).json(chistes);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los chistes" });
  }
}