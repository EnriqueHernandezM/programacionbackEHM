//////////////////////////3ER ENTREGA FINAL/////////////////
PARA ENTRAR A LA CARPETA DONDE ESTA EL SERVER: cd root/ngixNode/public
ejecutar con : npm run dev
////////////////////////////////////////////////////////////////////
PARA LOS FILTOS DE PRODUCTOS HICE UN BSCADOR QUE FUNCIONA CON LOS NOMBRES DE LOS PRODUCTOS
//////////////////////////////////////////////////////////////////////////////////////////////////////
Para los Mail y msjes adjunto pruebas por lo de que solo llegan a numeros registrados y me cambiaba el authToken y se rompe la app al no autenticar
////////////////////////////////////////////////////////////////////////////////////////////////////////
Email nuevo registro
![ss nuevo registo](https://github.com/EnriqueHernandezM/programacionbackEHM/blob/3erEntregaFinal/imagenesRead/nuevoRegistro.jpeg)
///////////////////////////////////////////////////////////////
Email Nuevo Pedido
![ss nuevo registo](https://github.com/EnriqueHernandezM/programacionbackEHM/blob/3erEntregaFinal/imagenesRead/nuevoPedido.jpeg)
////////////////////////////////////////////////////////////////////////////////
Mensjae a WSP
![ss nuevo registo](https://github.com/EnriqueHernandezM/programacionbackEHM/blob/3erEntregaFinal/imagenesRead/pedidoRecibW.jpeg)
//////////////////////////////////////////////////////////////////////////////////////////
Mensaje a cliente
![ss nuevo registo](https://github.com/EnriqueHernandezM/programacionbackEHM/blob/3erEntregaFinal/imagenesRead/mensajeAclient.jpeg)
////////////////////////////////////////////////////////////////////////////////////////////////
PARA ENCENDER EL SERVIDOR CON CLUSTER CAMBIAR LA VARIABLE DE ENTORNO: CLUSTER "ON"/"OF
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////PRUEBAS CON ARTILLERY
simulaMOS 30 usuarios enviando 100 peticiones AH LA RUTA DE PRODUCTOS CON EL USER YA LOGUADO
////////////////////////////////////////////////////// CON CLUSTER
artillery quick --count 30 -n 100 http://localhost:8080/productos > result_productosConCluster.txt
![TEST](https://github.com/EnriqueHernandezM/programacionbackEHM/blob/3erEntregaFinal/imagenesRead/productosConCluser.jpg)
//////////////////////////////////////////////////////////SIN CLUSTER
artillery quick --count 30 -n 100 http://localhost:8080/productos > result_productosSinCluster.txt
![TEST](https://github.com/EnriqueHernandezM/programacionbackEHM/blob/3erEntregaFinal/imagenesRead/productosSinCluster.jpg)
/////////////////////////////////////////

////////////////////////////////
//////////////////PARA MI
ESTAMOS EMPEZANDO A ACOMODAR LAS RUTAS EN EL SERVER ESTA PRODUCTOS Y PRODUCTOS API SEUIR CON ESO
PARA DESPUES AGRGAR LO DE LA RUTA INDEXZ
Y LUEGO VERIFICAR SI ESTA FUNCIONANDO PASSPORT
