import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';


const app = express();


dotenv.config();

const PORT = 3005;
app.use(cors({ origin: '*' }));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: false}));

app.listen(PORT, function(){
    connectDB();
    console.log(`Api corriendo en http://localhost:${PORT}`);
  })



app.get('/', (req, res) => {
    console.log('mi primer endpoint');
    res.status(200).send('Hola mundo , mi primera API');
})

const connectDB = () => {
    const { 
        MONGO_USERNAME,
        MONGO_PASSWORD,
        MONGO_HOSTNAME, 
        MONGO_PORT,
        MONGO_DB
    } = process.env;

    const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;
    mongoose.connect(url).then(function(){
        console.log('MongoDB conectado');
    }).catch(function(err){
        console.log('Error en la conexion', err);
    });
}




import { User } from './user.js';

app.post('/', async (req, res) => {
    try{
        var data = req.body;

        var newUser = new User(data);

        await newUser.save();
        res.status(200).send({
            success: true,
            message: 'Usuario creado',
            outcome:[]
        });
    }catch(err){
        res.status(400).send({
            success: false,
            message: 'Error al crear el usuario',
            outcome: []
        });
    }
})

app.get('/usuarios', async (req, res) => {
    try{
        var usuarios = await User.find();
        res.status(200).send({
            success: true,
            message: 'Usuarios encontrados',
            outcome: [usuarios]
        });
    }catch(err){
        res.status(400).send({
            success: false,
            message: 'Error al buscar los usuarios',
            outcome: []
        });
    }
})
