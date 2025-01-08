import { Chiste } from "../models/chistes.js";
import { getChistePorId } from "../controllers/rutasChistesController.js";

export async function testGetChistePorId() {
    try {
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
        
        // Respuesta del get
        let chisteResultado;
        const res = {
            status: (code) => {
                return res; 
            },
            json: (data) => {
                chisteResultado = data; 
                return data;
            },
            send: (data) => {
                chisteResultado = data; 
                return data;
            }
        };

        await getChistePorId(req, res);
 
        if (!(chisteResultado instanceof Chiste)) {
            throw new Error("El chiste obtenido no es de tipo 'Chiste' ");
        }
        if (chisteResultado.texto !== chiste.texto) {
            throw new Error(`El texto del chiste no coincide. Esperado: ${chiste.texto}, Obtenido: ${chisteResultado.texto}`);
        }

        if (chisteResultado.autor !== chiste.autor) {
            throw new Error(`El autor del chiste no coincide. Esperado: ${chiste.autor}, Obtenido: ${chisteResultado.autor}`);
        }

        if (chisteResultado.puntaje !== chiste.puntaje) {
            throw new Error(`El puntaje del chiste no coincide. Esperado: ${chiste.puntaje}, Obtenido: ${chisteResultado.puntaje}`);
        }

        if (chisteResultado.categoria !== chiste.categoria) {
            throw new Error(`La categoría del chiste no coincide. Esperado: ${chiste.categoria}, Obtenido: ${chisteResultado.categoria}`);
        }
        console.log('Prueba Endpoint #5: Exitosa');
        await chiste.deleteOne();
    } catch (error) {
        console.error("Error durante la ejecución de la prueba (endpoint #5):", error.message);
    }
}