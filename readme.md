Ruta para info: http://localhost:80##/info
Ruta para calcular numeros alatorios: /api/randoms?limite=50
el puerto por defecto sera 8080 o se puede enviar por argumento en consola
modo fork
pm2 start server.js -- --port=8080 --modo=fork
asi
pm2 start server.js --name="Server1Fork" --watch -- 8080 --modo=fork
cluster
pm2 start server.js --name="Server2Cluster" --watch -i max -- 8081 --modo=cluster
