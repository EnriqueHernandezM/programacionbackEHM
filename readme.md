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
