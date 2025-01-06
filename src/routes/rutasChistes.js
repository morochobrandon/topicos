import express from "express";
//import {Chiste} from "./../models/chistes.js";
import {
  getChiste,
  postChiste,
} from "../controllers/rutasChistesController.js";

const router = express.Router();

//get para obtener un chiste

router.get("/", getChiste);


router.post("/", postChiste);
export default router;