Ruta para info: http://localhost:80##/info
Ruta para calcular numeros alatorios: /api/randoms?limite=50
el puerto por defecto sera 8080 o se puede enviar por argumento en consola.

ENTREGA PROXY
RUTA PARA ENTRAR A CARPETA DONDE ESTA EL SERVER Y USAR PM2.
cd ngixNode/public
/////

////MODO FORK
pm2 start server.js --name="Server1Fork" --watch -- 8080 --modo=fork

pm2 start server.js --name="Server2fork" --watch -- 8082 --modo=fork
pm2 start server.js --name="Server3fork" --watch -- 8083 --modo=fork
pm2 start server.js --name="Server4fork" --watch -- 8084 --modo=fork
pm2 start server.js --name="Server5fork" --watch -- 8085 --modo=fork
encender NGINX EN root
./nginx.exe
/////////////////////////////SI MODIFICAMOS LACONFIG DE NGINX ./nginx.exe -s reload
probar con localhost/info y http://localhost/api/randoms para ver los puertos en uso
/////////PARA PROBAR EL CLUSTER UTILIZANDO EL MODULO NATIVO CLUSTER PASAR EL PARAMETRO EN CONSOLA BASH
ASI ESTARAN DISPONIBLES LOS PUERTOS DEL 80 A 85///////////
npm start 8081 prueba
AQUI agrege una condicional al principio del server para encender uno u otro mediante la consola

Y PROBAR ENESTA RUTA
http://localhost:8081/api/randoms
////
CERRAR NGIX ./nginx.exe -s quit
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
ENTREGA LOOGERS
/////Incorporar al proyecto de servidor de trabajo la compresión gzip./////
PARA VER INFO SIN GZIP
/infoSinCompresion//////////////
![info sin compression](https://github.com/EnriqueHernandezM/programacionbackEHM/blob/loggers/imagenesRead/infoSinCompresion.jpg)
CON GZIP
/infoConCompresion
![info Con Compresion](https://github.com/EnriqueHernandezM/programacionbackEHM/blob/loggers/imagenesRead/infoConCompression.jpg)
//////////////////////////////
En cuanto a Gzip probando varias veces me llego a pesar un poco mas el archivo comprimido lo que mejoraba era el tiempo de respuesta.
//////////////////////////////

1. El perfilamiento (profilling) del servidor, realizando el test con --prof de node.js. Analizar los resultados obtenidos luego de procesarlos con --prof-process.
   Utilizaremos como test de carga Artillery en línea de comandos, emulando 50 conexiones concurrentes con 20 request por cada una. Extraer un reporte con los resultados en archivo de texto//////////////////////////////////////
   INICIAMOS PROF
   node --prof server.js 8080
   ////////////////
   artillery quick --count 20 -n 50 http://localhost:8080/infoConLog > result_infoConLogArtill.txt
   ////////////////////////Resultado artillery con Log
   ![resultados artillery](https://github.com/EnriqueHernandezM/programacionbackEHM/blob/loggers/imagenesRead/resultadoArtClog.jpg)
   node --prof server.js 8080
   artillery quick --count 20 -n 50 http://localhost:8080/infoSinLog > result_infoSinLogArtill.txt
   ////////////////Resultado artillery sin Log
   ![res artillery Sin Log](https://github.com/EnriqueHernandezM/programacionbackEHM/blob/loggers/imagenesRead/resultadoArtSlog.jpg)
   ////////////////////////////////////////
   En los resulados que nos da artillery aunque en total ambos tardaron 21S. Se noto la diferencia en el max y el median
   ////////////////////////////////////////
   decodificamos en terminal windows bash no func. en vsc
   node --prof-process infoConLogArtill-v8.log > result_prof-infoConLogArtill.txt
   //////con Log
   ![prof con Logs](https://github.com/EnriqueHernandezM/programacionbackEHM/blob/loggers/imagenesRead/profConLog.jpg)
   node --prof-process infoSinLogArtill-v8.log > result_prof-infoSinLogArtill.txt
   //////Sin Log
   ![prof sin Log](https://github.com/EnriqueHernandezM/programacionbackEHM/blob/loggers/imagenesRead/profSinLog.jpg)
   ////////////////////////////////////////
   Resultados con --prof ---hay una diferencia de 555 ticks resultando con menos la ruta info sin logs
   ////////////////////////////////////////
   //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   Luego utilizaremos Autocannon en línea de comandos, emulando 100 conexiones concurrentes realizadas en un tiempo de 20 segundos. Extraer un reporte con los resultados (puede ser un print screen de la consola)
   //////////////instalamos autocannon globaL
   ///////con Log
   ![prueba de autocannon por consola](https://github.com/EnriqueHernandezM/programacionbackEHM/blob/loggers/imagenesRead/autocannonComandConLog.jpg)
   ////////Sin Log
   ![prueba de autocannon en cons si log](https://github.com/EnriqueHernandezM/programacionbackEHM/blob/loggers/imagenesRead/autocannonComandSinLog.jpg)
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
   El perfilamiento del servidor con el modo inspector de node.js --inspect (en chrome). Revisar el tiempo de los procesos menos performantes sobre el archivo fuente de inspección.
   //////
   node --inspect server.js
   ///
   chrome://inspect/#devices
   ////Con Logs
   ![inspect con Logs](https://github.com/EnriqueHernandezM/programacionbackEHM/blob/loggers/imagenesRead/inspectInfConLog.jpg)
   ////Sin Logs
   ![](https://github.com/EnriqueHernandezM/programacionbackEHM/blob/loggers/imagenesRead/inspectInfSinLog.jpg)
   ////////////////////////////////////////
   Resultados Con -inspect -= en ambos se nota una mayor carga ah la hora de responder con json y en la ruta que usa console.log acumula mas.
   ////////////////////////////////////////
   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 3) El diagrama de flama con 0x, emulando la carga con Autocannon con los mismos parámetros anteriores.
   ////////////////////////////////////////////////Cambiamos Scripts
   "test": " node benchmark.js",
   "start": "0x server.js",
   "dev": "nodemon server.js"
   //////////con Log
   ![grafica flama con log](https://github.com/EnriqueHernandezM/programacionbackEHM/blob/loggers/imagenesRead/gFlameConLog.jpg)
   ///////////Sin log
   ![grafica flama sin Log](https://github.com/EnriqueHernandezM/programacionbackEHM/blob/loggers/imagenesRead/gFlameSinLog.jpg)
   ////////////////////////////////////////
   Resultados con graficas de flama En cuanto la escala de colores hubo un ligero cambio que se nota mas cuando se usa console.log , al igual que se prolonga mas para concluir la funcion.
   Se vizualiza mas facil solo mostrando la parte de App
   ////////////////////////////////////////
   ////////C Log
   ![grafica flama con log](https://github.com/EnriqueHernandezM/programacionbackEHM/blob/loggers/imagenesRead/flamaAppClog.jpg)
   ////////S Log
   ![grafica flama con log](https://github.com/EnriqueHernandezM/programacionbackEHM/blob/loggers/imagenesRead/flamaAppSlog.jpg)
   ////// En general se nota la importanci en optimizar lo meorposible el codigo, y en este ejercicio pues la carga quepuede generar el que dejemosconsole.log activos.
