import express from "express";
//import {Chiste} from "./../models/chistes.js";
import { getChiste } from "../controllers/rutasChistesController.js";

const router = express.Router();

//get para obtener un chiste

router.get("/", getChiste);

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
export default router;