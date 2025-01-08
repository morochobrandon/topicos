import { Chiste } from "../models/chistes.js";
import { postChiste } from "../controllers/rutasChistesController.js";


export async function testPostChiste() {
    try {
      // Testearemos todos las opciones del query: tipo
      const autor = 'Dijo nadie nunca';
      const texto = 'Base de datos es mi materia favorita';
      const puntaje = 8;
      const categoria = 'Malo';

      // Chiste que deberia ser introducido
      const ejPropio = {
        texto: 'Base de datos es mi materia favorita',
        autor: 'Dijo nadie nunca',
        puntaje: 8,
        categoria: 'Malo'
      };

      // Cuerpo de la petición
      const req = {
        body: ejPropio
      };

  
      // Respuesta del get
      let id;
      const res = {
            status: (code) => {
                return res; 
            },
            json: (data) => {
                id = data; 
                return data;
            },
            send: (data) => {
                id = data; 
                return data;
            }
        };
  
      // Llamada a postChiste
      await postChiste(req, res);

      const chiste = await Chiste.findById(id.id);
 
      if (!(chiste instanceof Chiste)) {
        throw new Error("Error: El resultado no es de tipo Chiste");
      }
      if (chiste.texto !== ejPropio.texto) {
        throw new Error(`Error: El texto del chiste no coincide. Esperado: ${ejPropio.texto}, Obtenido: ${chiste.texto}`);
      }

      if (chiste.autor !== ejPropio.autor) {
        throw new Error(`Error: El autor del chiste no coincide. Esperado: ${ejPropio.autor}, Obtenido: ${chiste.autor}`);
      }

      if (chiste.puntaje !== ejPropio.puntaje) {
        throw new Error(`Error: El puntaje del chiste no coincide. Esperado: ${ejPropio.puntaje}, Obtenido: ${chiste.puntaje}`);
      }

      if (chiste.categoria !== ejPropio.categoria) {
        throw new Error(`Error: La categoría del chiste no coincide. Esperado: ${ejPropio.categoria}, Obtenido: ${chiste.categoria}`);
      }
 
      await Chiste.deleteOne(chiste._id); 
      console.log('Prueba Endpoint #2: Exitosa');
    } catch (error) {

      console.error("Error durante la ejecución de la prueba:", error.message);
    }
  }