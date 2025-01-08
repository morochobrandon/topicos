import mongoose from "mongoose";

const chisteSchema = new mongoose.Schema({
  texto: {
    type: String,
    required: true,
  },
  autor: {
    type: String,
    required: true,
  },
  categoria: {
    type: String,
    required: true,
    enum: ['Dad joke', 'Humor Negro', 'Chistoso', 'Malo']
  },
  puntaje: {
    type: Number,
    required: true,
  }
});

export const Chiste = mongoose.model("Chiste", chisteSchema);

