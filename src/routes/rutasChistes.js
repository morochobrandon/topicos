import express from "express";
//import {Chiste} from "./../models/chistes.js";
import {
  deleteChiste,
  getChiste,
  getChistePorId,
  mostrarTodos,
  postChiste,
  putChiste
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

/**
 * @swagger
 * /api/v1/chiste:
 *   post:
 *     summary: Crea un nuevo chiste
 *     tags: [Chistes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               texto:
 *                 type: string
 *                 description: El texto del chiste
 *                 example: "Este es un chiste muy gracioso"
 *               autor:
 *                 type: string
 *                 description: El autor del chiste
 *                 example: "Juan Pérez"
 *               puntaje:
 *                 type: number
 *                 description: El puntaje del chiste
 *                 example: 5
 *               categoria:
 *                 type: string
 *                 description: La categoría del chiste
 *                 example: "Humor"
 *     responses:
 *       201:
 *         description: Chiste creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID del chiste creado
 *                 texto:
 *                   type: string
 *                   description: El texto del chiste
 *                 autor:
 *                   type: string
 *                   description: El autor del chiste
 *                 puntaje:
 *                   type: number
 *                   description: El puntaje del chiste
 *                 categoria:
 *                   type: string
 *                   description: La categoría del chiste
 *       400:
 *         description: Error en la solicitud
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Descripción del error
 *       500:
 *         description: Error al crear el chiste
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Descripción del error
 */
router.post("/", postChiste);

/**
 * @swagger
 * /api/v1/chiste/{id}:
 *   put:
 *     summary: Actualiza cualquiera de los campos de un chiste existente
 *     tags: [Chistes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del chiste a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               texto:
 *                 type: string
 *                 description: El texto actualizado del chiste
 *                 example: "Este es un chiste actualizado"
 *               autor:
 *                 type: string
 *                 description: El autor actualizado del chiste
 *                 example: "María Gómez"
 *               puntaje:
 *                 type: number
 *                 description: El puntaje actualizado del chiste
 *                 example: 4
 *               categoria:
 *                 type: string
 *                 description: La categoría actualizada del chiste
 *                 example: "Dad joke"
 *     responses:
 *       200:
 *         description: Chiste actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID del chiste actualizado
 *                 texto:
 *                   type: string
 *                   description: El texto actualizado del chiste
 *                 autor:
 *                   type: string
 *                   description: El autor actualizado del chiste
 *                 puntaje:
 *                   type: number
 *                   description: El puntaje actualizado del chiste
 *                 categoria:
 *                   type: string
 *                   description: La categoría actualizada del chiste
 *       400:
 *         description: Error en la solicitud (ID no válido o campos faltantes)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Descripción del error
 *       404:
 *         description: Chiste no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Descripción del error
 *       500:
 *         description: Error al actualizar el chiste
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Descripción del error
 */
router.put("/:id", putChiste);


/**
 * @swagger
 * /api/v1/chiste/{id}:
 *   delete:
 *     summary: Elimina un chiste por su ID
 *     tags: [Chistes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del chiste a eliminar
 *     responses:
 *       200:
 *         description: Chiste eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Chiste eliminado exitosamente"
 *       404:
 *         description: Chiste no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Chiste no encontrado"
 *       500:
 *         description: Error al eliminar el chiste
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Descripción del error
 */
router.delete("/:id", deleteChiste);



/**
 * @swagger
 * /api/v1/chistes:
 *   get:
 *     summary: Obtiene todos los chistes almacenados en la base de datos
 *     tags: [Chistes]
 *     responses:
 *       200:
 *         description: Lista de todos los chistes obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Chiste'
 *       404:
 *         description: No se encontraron chistes en la base de datos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No hay chistes en la base de datos"
 *       500:
 *         description: Error al obtener los chistes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error al obtener los chistes"
 */
router.get("/todos", mostrarTodos);


/* Fin Extra */

/**
 * @swagger
 * /api/v1/chiste/{id}:
 *   get:
 *     summary: Obtiene un chiste por su ID
 *     tags: [Chistes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del chiste a obtener
 *     responses:
 *       200:
 *         description: Chiste obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Chiste'
 *       404:
 *         description: Chiste no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Chiste no encontrado"
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
router.get("/:id", getChistePorId);

export default router;

