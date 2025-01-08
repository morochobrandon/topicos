import { putChiste } from '../controllers/rutasChistesController.js';
import { Chiste } from './../models/chistes.js';

export async function testPutChiste() {
    //Este chiste se va a guardar en la base de datos
   try{
    const chiste = new Chiste({
        texto: 'Chiste inicial',
        autor: 'Autor inicial',
        puntaje: 5,
        categoria: 'Chistoso'
      });
      await chiste.save();
      // Este deberia ser el chiste despues del put
      const futuroChiste = {
        texto: 'Chiste actualizado',
        autor: 'Autor actualizado',
        puntaje: 8,
        categoria: 'Dad joke'
      };
      // Cuerpo de la peticion 
      const req = {
        params: { id: chiste._id },
        body: futuroChiste
      };
      // Respuesta del put
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
  
    await putChiste(req, res);
      // Verificar si el resultado es de tipo Chiste
      if (!(resultado instanceof Chiste)) {
        console.error("Error: El resultado no es de tipo Chiste");
      }
      if (resultado.texto !== futuroChiste.texto) {
        console.error(`Error: El texto del chiste no coincide. Esperado: ${futuroChiste.texto}, Obtenido: ${resultado.texto}`);
      }      
      if (resultado.autor !== futuroChiste.autor) {
        console.error(`Error: El autor del chiste no coincide. Esperado: ${futuroChiste.autor}, Obtenido: ${resultado.autor}`);
      }     
      if (resultado.puntaje !== futuroChiste.puntaje) {
        console.error(`Error: El puntaje del chiste no coincide. Esperado: ${futuroChiste.puntaje}, Obtenido: ${resultado.puntaje}`);
      }     
      if (resultado.categoria !== futuroChiste.categoria) {
        console.error(`Error: La categoría del chiste no coincide. Esperado: ${futuroChiste.categoria}, Obtenido: ${resultado.categoria}`);
      }

      console.log('Prueba Endpoint #3: Exitosa');

      await Chiste.deleteOne(chiste._id); 
   }
   catch(error){
    console.log("Error: prueba endpoint #3 fallida",error);
   }
}