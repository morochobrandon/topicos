import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import {routes} from "./routes/index.js"
import swaggerUI from "swagger-ui-express";
import specs from "./swagger/swagger.js";
const app = express();

dotenv.config();

const PORT = 3005;

app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));
app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(specs))

const connectDB = () => {
  const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOSTNAME,
    MONGO_PORT,
    MONGO_DB,
  } = process.env;

  const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;
  mongoose
    .connect(url)
    .then(function () {
      console.log("MongoDB conectado");
    })
    .catch(function (err) {
      console.log("Error en la conexion", err);
    });
};


app.listen(PORT, function () {
  connectDB();
  routes(app);
  console.log(`Api corriendo en http://localhost:${PORT}`);
});