import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import {routes} from "./routes/index.js"


const app = express();

const PORT = 3005;

app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));

const connectDB = () => {
  mongoose.connect('mongodb://localhost:27017/topicos')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));
}


app.listen(PORT, function () {
  connectDB();
  routes(app);
  console.log(`Api corriendo en http://localhost:${PORT}`);
});