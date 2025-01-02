import express from 'express';
import cors from 'cors';

const app = express();

const PORT = 3005;
app.use(cors({ origin: '*' }));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: false}));

app.listen(PORT, function(){
    console.log(`Api corriendo en http://localhost:${PORT}`);
})

app.get('/', (req, res) => {
    console.log('mi primer endpoint');
    res.status(200).send('Hola mundo , mi primera API');
})