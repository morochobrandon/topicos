import { Chiste } from "../models/chistes.js";
import { contarPuntaje } from "../controllers/rutasChistesController.js";

export async function testContarPuntaje() {
    try {
        const chiste = new Chiste({
            texto: 'Vinicius es el mejor del mundo ',
            autor: 'Eros Ramazzoti',
            puntaje: 100,
            categoria: 'Humor Negro'
          });
        await chiste.save();
        const cant = await Chiste.countDocuments({ puntaje: 100 });
        const req = {
            params: {
                puntaje: 100
            }
        };
        let resultado;
        const res = {
            status: (code) => {
                return res; 
            },
            json: (data) => {
                resultado = data; 
                return data;
            },
            send: (data) => {
                resultado = data; 
                return data;
            }
        };
        await contarPuntaje(req, res);
        if (resultado.count !== cant) {
            throw new Error(`La cantidad de chistes no coincide. Esperado: ${cant}, Obtenido: ${resultado.count}`);
        }
        console.log('Prueba Endpoint #7: Exitosa');
        await chiste.deleteOne();
    } catch (error) {
        console.error("Error durante la ejecución de la prueba (endpoint #7):", error.message);
    }
}