import express from "express";
//import {Chiste} from "./../models/chistes.js";
import {
  getChiste,
  postChiste,
} from "../controllers/rutasChistesController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Chiste:
 *       type: object
 *       required:
 *         - texto
 *         - puntaje
 *         - categoria
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the chistes
 *         texto:
 *           type: string
 *           description: The text of the chiste
 *         autor:
 *           type: string
 *           description: The author of the chiste
 *         puntaje:
 *           type: number
 *           description: The score of the chiste
 *         categoria:
 *           type: string
 *           description: The category of the chiste
 *       example:
 *         id: "677bea5b841043b29e98b54b"
 *         texto: "no es chiste , pero si quieres si es chiste"
 *         autor: "Brandon"
 *         puntaje: 5
 *         categoria: "Humor"
 */

/**
 * @swagger
 * tags:
 *   name: Chistes
 *   description: The Chistes managing API
 */

/**
 * @swagger
 * /api/v1/chiste:
 *   get:
 *     summary: Obtiene un chiste basado en el tipo especificado
 *     tags: [Chistes]
 *     parameters:
 *       - in: query
 *         name: tipo
 *         schema:
 *           type: string
 *         required: true
 *         description: El tipo de chiste a obtener (Chuck, Dad, Propio)
 *     responses:
 *       200:
 *         description: Chiste obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID del chiste
 *                 value:
 *                   type: string
 *                   description: El texto del chiste
 *       400:
 *         description: Parámetro tipo es requerido o no válido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Descripción del error
 *       500:
 *         description: Error al obtener el chiste
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Descripción del error
 */
router.get("/", getChiste);


router.post("/", postChiste);

export default router;