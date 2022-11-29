# EmpresaRandomReto
Solución del reto propuesto por Sophos. Esta es una aplicación de alquiler de video juegos, la cual se desarrollo haciendo uso de las siguientes tecnologias:
* .NET 6.0 (backend)
* React (Frontend)
* Git (Versionamiento)
* SQL Server (Base de datos)

## Diseño de base de datos
### Modelo Relacional de la base de datos
![alt text](https://github.com/Carlosprimo/EmpresaRandomReto/blob/master/Images/Empresa%20random%20-%20Base%20de%20datos.drawio.png)
### Digrama entidad relación de la base de datos
![alt text](https://github.com/Carlosprimo/EmpresaRandomReto/blob/master/Images/Empresa%20random%20-%20Base%20de%20datos-P%C3%A1gina-2.drawio.png)

## Ejecución de la aplicación
Para iniciar la ejecución abrir un terminal e ir al dirreción donde clono o descargo el proyecto:
### Ejecución Frontend
Para la ejecución del frontend es necesario tener instalado la versión de NodeJs más actualizada.  
~~~
cd ./EmpresaRandomReto/GAMESHOP/
npm install 
npm run dev  
~~~
### Ejecución Backend
~~~
cd ./EmpresaRandomReto/BackendRetoSophos/BackendRetoSophos/
dotnet run
~~~
Sí desea ver el Swagger, debe abrir la URL mostrada en la terminal y addicionar /swagger/index.html A la URL.  
Ejemplo:  
https://localhost:7272/swagger/index.html  

### Llenado de la base de datos
Para realizar el llenado de la base de datos es necesario tener instaldo la base de datos <a href="https://www.microsoft.com/es-es/sql-server/sql-server-downloads" target="_blank">SQL SERVER</a> y tambien recomiendo descargar <a href="https://www.microsoft.com/es-es/sql-server/sql-server-downloads" target="_blank">SQL SERVER Management Studio (SSMS)</a>, puesto que facilita la ingesta de datos a la base de datos.  
Al tener instalado SSMS el llenado de la base de datos es solo abrir los archivos con ese programa y ejecutar. Al no tener un manejador de base de datos como SSMS instalado, la inserción de archivos se debe hacer mediante el terminal, para este forma recomiendo leer https://dba.stackexchange.com/questions/44101/importing-sql-server-database-from-a-sql-file  
## Diseño UX/UI
https://www.figma.com/file/LXUdPhpchguEpY5xZgIdxw/UX%2FUI-Reto-Sophos?node-id=0%3A1&t=ftADasRq8wdfByr4-1
