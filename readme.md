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

1. El perfilamiento (profilling) del servidor, realizando el test con --prof de node.js. Analizar los resultados obtenidos luego de procesarlos con --prof-process.
   Utilizaremos como test de carga Artillery en línea de comandos, emulando 50 conexiones concurrentes con 20 request por cada una. Extraer un reporte con los resultados en archivo de texto//////////////////////////////////////
   INICIAMOS PROF
   node --prof server.js 8080
   ////////////////
   artillery quick --count 20 -n 50 http://localhost:8080/infoConLog > result_infoConLogArtill.txt
   node --prof server.js 8080
   artillery quick --count 20 -n 50 http://localhost:8080/infoSinLog > result_infoSinLogArtill.txt
   decodificamos en terminal windows bash no func. en vs
   node --prof-process infoConLogArtill-v8.log > result_prof-infoConLogArtill.txt
   node --prof-process infoSinLogArtill-v8.log > result_prof-infoSinLogArtill.txt
   //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Cambiamos Scripts
   "test": " node benchmark.js",
   "start": "0x server.js",
   "dev": "nodemon server.js"
   //// Ejecutamos en terminal vsc
   npm start 8080
   ///y windows bash
   npm test
   ////////////////////////////////////////
   ////////////////////
   AHORA ANALIZAMOS CON NODE INSPECT.
   node --inspect server.js
   ///
   chrome://inspect/#devices
