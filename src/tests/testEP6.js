import { Chiste } from "../models/chistes.js";
import { contarCategoria } from "../controllers/rutasChistesController.js";

export async function testContarCategoria() {
    try {
        const cant = await Chiste.countDocuments({ categoria: "Humor Negro" });
        const req = {
            params: {
                categoria: "Humor Negro"
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
        await contarCategoria(req, res);
        if (resultado.count !== cant) {
            throw new Error(`La cantidad de chistes no coincide. Esperado: ${cant}, Obtenido: ${resultado.count}`);
        }
        console.log('Prueba Endpoint #6: Exitosa');
    } catch (error) {
        console.error("Error durante la ejecución de la prueba (endpoint #6):", error.message);
    }
}