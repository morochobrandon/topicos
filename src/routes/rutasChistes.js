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
      const count = await Chiste.countDocuments();
      const random = Math.floor(Math.random() * count);
      const chiste = await Chiste.findOne().skip(random);
      if (!chiste) {
        return res.status(200).send({ message: "Aun no hay chistes, cree uno!" });
      }
      return res.status(200).send(chiste);
    } else {
      return res.status(400).send({ error: "Parámetro tipo no válido" });
    }
  } catch (err) {
    return res.status(500).send({ error: "Error al obtener el chiste" });
  }

});

const categoriasPermitidas = ['Dad joke', 'Humor Negro', 'Chistoso', 'Malo'];
router.post('/', async (req, res) => {
    try {
        const { texto, autor = 'Se perdió en el Ávila como Led', puntaje, categoria } = req.body;



        if (!texto || !puntaje || !categoria) {
            return res.status(400).send({ error: 'Texto, puntaje y categoría son requeridos' });
        }        
        if (!categoriasPermitidas.includes(categoria)){
          return res.status(400).send({ error: 'Categoría no válida. Las categorías permitidas son: Dad joke, Humor Negro, Chistoso, Malo' });
        }


        const nuevoChiste = new Chiste({ texto, autor, puntaje, categoria });
        await nuevoChiste.save();

        return res.status(201).send({ id: nuevoChiste._id });
    } catch (err) {
        return res.status(500).send({ error: 'Error al guardar el chiste' });
    }
});

// Endpoint 3: Actualizar cualquier campo de un chiste

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { texto, autor, puntaje, categoria } = req.body;

  try {
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
});

export default router;

// Endpoint 4: Eliminar un chiste por su id

router.delete('/:id', async (req,res) => {
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
});

// Endpoint 5: Mostrar un chiste por su id

router.get('/:id', async (req,res) => {
  const { id } = req.params;
  try {
    const chiste = await Chiste.findById(id);   
    if (!chiste) {
      return res.status(404).json({ message: 'Chiste no encontrado' });
    }
    return res.status(200).json(chiste);
  } catch (err) {
    return res.status(500).send({ error: 'Error al buscar el chiste, verifica la id' });
  }
});