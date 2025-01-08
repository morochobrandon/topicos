import { Chiste } from './../models/chistes.js';
import { getChiste } from '../controllers/rutasChistesController.js';
import { esChisteChuck, esChisteDad } from './validarEstructuras.js';


export async function testGetChiste() {
    try {
      // Testearemos todos las opciones del query: tipo
      const tipoA = 'Chuck';
      const tipoB = 'Propio';
      const tipoC = 'Dad';
      const chiste = new Chiste({
        texto: 'Vivan las arepas',
        autor: 'Se perdio en el avila como Led',
        puntaje: 1,
        categoria: 'Dad joke'
      });
    await chiste.save();

      // Si el chiste es Chuck
      const ejChuck = {
        categories: [],
        created_at: "2020-01-05 13:42:26.991637",
        icon_url: "https://api.chucknorris.io/img/avatar/chuck-norris.png",
        id: "Yw2zxCdSSJWWGZQUWmd0pA",
        updated_at: "2020-01-05 13:42:26.991637",
        url: "https://api.chucknorris.io/jokes/Yw2zxCdSSJWWGZQUWmd0pA",
        value: "when a robber steal stuff from people they say its like taking candy from a baby. but when they steal from Chuck Norris it's not as easy as they think."
      };
  
      // Si el chiste es Propio
      const ejPropio = {
        texto: 'Chiste actualizado',
        autor: 'Autor actualizado',
        puntaje: 8,
        categoria: 'Dad joke'
      };
  
      // Si el chiste es Dad
      const ejDad = {
        id: "VDdxcp4ob",
        joke: "How do you make Lady Gaga cry? Poker face. ",
        status: 200
      };
  
      // Cuerpo de la petición
      const reqA = { query: { tipo: tipoA } };
      const reqB = { query: { tipo: tipoB } };
      const reqC = { query: { tipo: tipoC } };
  
      // Respuesta del get
      let resultado;
      let resultado2;
      let resultado3;

      const resA = {
          status: (code) => {
              return resA; 
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
      const resB = {
        status: (code) => {
            return resB; 
        },
        json: (data) => {
            resultado2 = data; 
            return data;
        },
        send: (data) => {
            resultado2 = data; 
            return data;
        }
    };
    const resC = {
        status: (code) => {
            return resC; 
        },
        json: (data) => {
            resultado3 = data; 
            return data;
        },
        send: (data) => {
            resultado3 = data; 
            return data;
        }
    };
  
      // Llamadas a getChiste
      await getChiste(reqA, resA);
      await getChiste(reqB, resB);
      await getChiste(reqC, resC);

      // Verificar si el resultado es un chiste de tipo Chiste Chuck
      if (!esChisteChuck(resultado, ejChuck)) {
        throw new Error("El primer resultado no es de tipo Chiste Chuck");
      }

      // Verificar si el resultado es de tipo Chiste
      if (!(resultado2 instanceof Chiste)) {
        throw new Error("El segundo resultado no es de tipo Chiste");
      }
  
      // Verificar si el resultado es un chiste de tipo Chiste Dad
      if (!esChisteDad(resultado3, ejDad)) {
        throw new Error("El tercer resultado no es de tipo Chiste Dad");
      }
  
      console.log('Prueba Endpoint #1: Exitosa');
  
      chiste.deleteOne();
    } catch (error) {
 
      console.error("Error durante la ejecución de la prueba (endpoint #1):", error.message);
    }
  }