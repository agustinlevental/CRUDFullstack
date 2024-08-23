# Fullstack CRUD Application

Este proyecto es una aplicación Fullstack que utiliza **React.js** para el frontend y **.NET 8** con **Entity Framework** para crear una API Web siguiendo el enfoque *code-first*. La aplicación permite realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) en una base de datos.

## Estructura del Proyecto

El proyecto está organizado en dos carpetas principales:

- **Frontend:** Contiene la aplicación React.js.
- **sample-crud-be:** Contiene la solución .NET (`sample-crud-be.sln`) que implementa la API Web. - 

## Backend (API Web con .NET 8 y Entity Framework):

La API Web se creó utilizando .NET 8 y siguiendo el enfoque *code-first* de Entity Framework. En este enfoque, se definen primero las clases de los modelos de datos en el código C#, y luego Entity Framework se encarga de generar las tablas correspondientes en la base de datos. El backend maneja la lógica de negocio, las operaciones CRUD sobre la base de datos y responde a las solicitudes del frontend.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalados los siguientes programas:

- [Node.js](https://nodejs.org/)
- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Visual Studio 2022](https://visualstudio.microsoft.com/vs/) (o cualquier otro IDE compatible con .NET)

## Instrucciones para Ejecutar el Proyecto

### 1. Configuración del Frontend

1. Navega a la carpeta `Frontend`:
cd CRUDFullstack/CRUD/Frontend
2. Instala las dependencias necesarias:
npm install

3. Ejecuta el servidor de desarrollo:
npm run dev

4. El frontend estará disponible en http://localhost:3000.

### 2. Configuración del Backend
(resultará más fácil desde Visual Studio)

1. Abre la Solución sample-crud-be.sln disponible en CRUDFullstack\crudbe\sample-crud-be

2. Asegúrate de que IIS Express esté seleccionado como el servidor para ejecutar la API Web. (por defecto suele estar en http con un simbolo de play verde)

4. Haz clic en el botón de ejecución (play verde) o presiona F5 para iniciar la API Web.

5. La API Web abrirá el Swagger para testear los endpoints en https://localhost:44342/swagger/index.html

Ve al navegador http://localhost:3000 y presiona F5 para actualizar
