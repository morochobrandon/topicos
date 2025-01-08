import { Chiste } from "../models/chistes.js";
import { deleteChiste } from "../controllers/rutasChistesController.js";

export async function testDeleteChiste() {
    try {
        //Guardamos un chiste cualquiera en la base de datos
        const chiste = new Chiste({
            texto: 'Chiste loco y chistoso',
            autor: 'mantequilla',
            puntaje: 3,
            categoria: 'Chistoso'
          });
          
          await chiste.save();

        // Cuerpo de la petición
        const req = {
            params: {
                id: chiste._id 
            }
        };

        // Respuesta del delete
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
        
        await deleteChiste(req, res);
    
        const chisteEliminado = await Chiste.findById(chiste._id);
        if (chisteEliminado) {
            throw new Error('El chiste no fue eliminado correctamente');
        }

        console.log('Prueba Endpoint #4: Exitosa');

    } catch (error) {
        console.error("Error durante la ejecución de la prueba (endpoint #4):", error.message);
    }
}