import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import {routes} from "./routes/index.js"
import {testPutChiste} from "./tests/testEP3.js"
import { testGetChiste } from "./tests/testEP1.js";
import { testPostChiste } from "./tests/testEP2.js";
import { testDeleteChiste } from "./tests/testEP4.js";
import { testGetChistePorId } from "./tests/testEP5.js";
import { testContarCategoria } from "./tests/testEP6.js";
import { testContarPuntaje } from "./tests/testEP7.js";
import swaggerUI from "swagger-ui-express";
import specs from "./swagger/swagger.js";

const app = express();

const PORT = 3005;

app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));
app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(specs))

const connectDB = () => {
  mongoose.connect('mongodb://localhost:27017/topicos') 
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));
}


app.listen(PORT, function () {
  connectDB();
  routes(app);
  console.log(`Api corriendo en http://localhost:${PORT}`);
  testGetChiste(); // Prueba endpoint 1
  testPostChiste(); // Prueba endpoint 2
  testPutChiste(); // Prueba endpoint 3
  testDeleteChiste(); // Prueba endpoint 4
  testGetChistePorId();  // Prueba endpoint 5
  testContarCategoria(); // Prueba endpoint 6
  testContarPuntaje(); // Prueba endpoint 7
});