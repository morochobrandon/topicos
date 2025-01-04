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
});

export const Chiste = mongoose.model("Chiste", chisteSchema);

