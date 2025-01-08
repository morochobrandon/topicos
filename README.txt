-----------------------------------------------------------------------------
*****************************************************************************
-----------------------------------------------------------------------------
******              ______               _                	       ******								
******              | ___ \             | |                            ******
******              | |_/ /___  __ _  __| |_ __ ___   ___ 	       ******
******              |    // _ \/ _` |/ _` | '_ ` _ \ / _ \	       ******
******              | |\ \  __/ (_| | (_| | | | | | |  __/	       ******
******              \_| \_\___|\__,_|\__,_|_| |_| |_|\___|	       ******

-----------------------------------------------------------------------------
*****************************************************************************
-----------------------------------------------------------------------------
VERSION 2. No docker
**************************** Integrantes  ***********************************

		- Eros dos Ramos -> E2R4M0S
		- Brandon Gutierrez -> morochobrandon
		- Mario Ramos -> MarioRamos0 && Mariecito 

******************* Cómo ejecutar la aplicación? ****************************

	1.Abra una terminal o consola de comandos.
	2. Navega hasta la carpeta "topicos".
	3. Ejecute los siguientes comandos:
	" npm install "
	" npm install cors "
	" npm install express "
	" npm install mongoose "
	" npm install swagger-jsdoc "
	" npm install swagger-ui-express "

	Para ejecutar: " node index.js "
	NOTA: Debes tener instalado node.js en tu equipo.
		  Recuerda agregar mongodb como variable de entorno en el path de 
		  tu computadora.

******************* Cómo funcionan los tests?    ****************************

   *   Las pruebas unitarias realizan una comparación entre la respuesta es- *
   * perada y la respuesta de la aplicación, de esta manera comprobamos si   *
   * los endpoints están funcionando correctamente.                          *

   Ejemplo: "testEP1.js"

   - En esta prueba se realizan tres peticiones simuladas, una por, ya que en
   cada tipo de chiste. En ese momento no se está utilizando express, por lo 
   que la función "getChiste" es incapaz de responder por sí sola.
   - Por esa razón realizamos una simulación del comportamiento del servidor
   creando dos objetos llamados req y res, que contienen los métodos con los 
   que normalmente express trabajan las peticiones. 
   - En este caso comparamos la estructura de cada tipo de chiste con la re-
   spuesta de cada petición.

	Recomendaciones:

	* Para el testEP7, crea manualmente algun chiste en la base de datos con 
	puntaje 100 o cambia este valor en la función.
	
******************** Cómo probar los endpoints? *****************************
-----------------------------------------------------------------------------
	1: GET: Para obtener un chiste, de tipo 'Chuck', 'Propio' o 'Dad' .

	1.1 Abrir Postman o Thunder Client
	1.2 Cree una petición 'GET' a 'localhost:27017api/v1/chiste/'
	1.3 Agregue un parámetro llamado 'tipo' y coloque en el apartado 'Value' 
		alguna de las siguientes opciones:
		1.3.1  'Chuck' : para obtener un chiste de Chuck Norris.
		1.3.2 'Dad' : para obtener un chiste "Dad".
		1.3.3 'Propio' : para obtener un chiste interno de la base de datos.
	1.4 Visualizar el chiste en la salida.
-----------------------------------------------------------------------------
	2. POST: Crear un nuevo chiste

	2.1 Abrir Postman o Thunder Client 
	2.2 Cree una petición 'POST' a 'localhost:27017/api/v1/chiste/' 
	2.3 Agregue un cuerpo de solicitud en formato JSON con la siguiente 
		* información:
		* texto: texto del chiste
		* autor: nombre de quien escribió el chiste (opcional, si no se 
		proporciona se utilizará "Se perdió en el Ávila como Led")
		* puntaje: puntaje del 1 al 10 para saber que tan bueno es
		* categoria: categoría del chiste (solo puede ser "Dad joke", 
		"Humor Negro", "Chistoso" o "Malo") 
	2.4 Ejemplo de cuerpo de solicitud:
		{
	  		"texto": "Este es un chiste muy gracioso",
	  		"autor": "Juan Pérez",
	 		"puntaje": 5,
	  		"categoria": "Humor"
		}
	2.5 Visualizar el chiste creado en la salida.
-----------------------------------------------------------------------------
	3. PUT: Actualizar cualquier campo de un chiste

	3.1 Abrir Postman o Thunder Client 
	3.2 Cree una petición 'PUT' a 'localhost:27017/api/v1/chiste/{id}' 
	3.3 Reemplazar {id} con el ID del chiste que se desea actualizar 
	3.4 Agregue un cuerpo de solicitud en formato JSON con la información 
		actualizada:
		* texto: texto del chiste (opcional)
		* autor: nombre de quien escribió el chiste (opcional)
		* puntaje: puntaje del 1 al 10 para saber que tan bueno es (opcional)
		* categoria: categoría del chiste (opcional, solo puede ser "Dad joke",
		 "Humor Negro", "Chistoso" o "Malo") 
	3.5 Ejemplo de cuerpo de solicitud:
		{
		  "texto": "Este es un chiste muy gracioso actualizado",
		  "autor": "María Gómez",
		  "puntaje": 4,
		  "categoria": "Dad joke"
		}

	3.6 Visualizar el chiste actualizado en la salida.
-----------------------------------------------------------------------------
	4. DELETE: Eliminar un chiste

	4.1 Abrir Postman o Thunder Client 
	4.2 Cree una petición 'DELETE' a 'localhost:27017/api/v1/chiste/{id}' 
	4.3 Reemplazar {id} con el ID del chiste que se desea eliminar 
	4.4 Visualizar el mensaje de confirmación de eliminación en la salida.
-----------------------------------------------------------------------------
	5. GET: Obtener un chiste por ID

	5.1 Abrir Postman o Thunder Client 
	5.2 Cree una petición 'GET' a 'localhost:27017/api/v1/chiste/{id}' 
	5.3 Reemplazar {id} con el ID del chiste que se desea obtener 
	5.4 Visualizar el chiste en la salida.
-----------------------------------------------------------------------------
	6. GET: Obtener la cantidad de chistes por categoría

	6.1 Abrir Postman o Thunder Client 
	6.2 Cree una petición 'GET' a 'localhost:27017/api/v1/chiste/categoria/{categoria}' 
	6.3 Reemplazar {categoria} con la categoría que se desea obtener 
	(solo puede ser "Dad joke", "Humor Negro", "Chistoso" o "Malo") 
	6.4 Visualizar la cantidad de chistes en la salida.
-----------------------------------------------------------------------------
	7. GET: Contar los chistes dado un puntaje

	7.1 Abrir Postman o Thunder Client 
	7.2 Cree una petición 'GET' a 'localhost:27017/api/v1/chiste/puntaje/{puntaje}' 
	7.3 Reemplazar {puntaje} con el puntaje que se desea obtener 
	7.4 Visualizar la cantidad de chistes en la salida.
-----------------------------------------------------------------------------

	---  NOTA: Decidimos agregar dos endpoints ya que facilitaban las  ---
	---        pruebas de los demás                                    ---

-----------------------------------------------------------------------------
	8. GET: Obtener todos los chistes

	8.1 Abrir Postman o Thunder Client
	8.2 Cree una petición 'GET' a 'localhost:27017/api/v1/chiste/todos'
	8.3 Visualizar todos los chistes en la salida.
-----------------------------------------------------------------------------

	9. GET: Obtener todos los chistes por categoria

	9.1 Abrir Postman o Thunder Client
	9.2 Cree una petición 'GET' a 'localhost:27017/api/v1/chiste/todos/{categoria}
	9.3 Reemplazar {categoria} con la categoria que se desea obtener.
	9.4 Visualizar todos los chistes de la categoria en la salida.