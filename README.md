# AdoptMe - Pet Adoption Backend

AdoptMe es una aplicación backend desarrollada para la gestión de adopciones de mascotas. Proporciona endpoints para crear, listar y manejar usuarios, mascotas, y datos de adopciones. Incluye funcionalidades de mocking para generar datos de prueba.

## Características

- **Gestión de Usuarios y Mascotas:** CRUD de usuarios y mascotas.
- **Mocking de datos:** Endpoints para generar datos falsos de usuarios y mascotas usando Faker.
- **Autenticación:** Soporte para autenticación usando JWT.
- **Encriptación de contraseñas:** Las contraseñas de los usuarios están encriptadas con bcrypt.
- **Carga de archivos:** Permite la carga de archivos usando multer.
- **Paginación:** Soporte para paginación de usuarios.
- **Documentación Swagger:** La API está documentada usando Swagger.

## Tecnologías Utilizadas

- **Node.js**
- **Express**
- **MongoDB**
- **Docker**
- **Swagger (para la documentación de la API)**
- **Mocha y Chai (para pruebas unitarias)**
- **JWT** (JSON Web Tokens)
- **Bcrypt** (para la encriptación de contraseñas)
- **Multer** (para la carga de archivos)
- **Faker** (para generar datos de prueba)

## Requisitos Previos

- **Node.js** (versión mínima recomendada: 14)
- **Docker** y **Docker Compose**
- **MongoDB Atlas** o cualquier instancia de MongoDB para la base de datos

## Instalación y Configuración

1. Clona el repositorio:
   ```bash
   git clone https://github.com/jmSilva83/EntregaFinalBackend3.git
   
## Endpoints Principales
| Método | Endpoint               | Descripción                               |
|--------|-------------------------|-------------------------------------------|
| GET    | /adoptions              | Obtiene todas las adopciones              |
| GET    | /adoptions/:aid         | Obtiene una adopción por ID               |
| POST   | /adoptions/:uid/:pid    | Crea una nueva adopción                   |
| GET    | /pets                   | Obtiene todas las mascotas                |
| POST   | /pets                   | Crea una nueva mascota                    |
| PUT    | /pets/:pid              | Actualiza los datos de una mascota por ID |
| DELETE | /pets/:pid              | Elimina una mascota por ID                |
| GET    | /users                  | Obtiene todos los usuarios                |
| POST   | /users                  | Crea un nuevo usuario                     |
| PUT    | /users/:uid             | Actualiza los datos de un usuario por ID  |
| DELETE | /users/:uid             | Elimina un usuario por ID                 |
| GET    | /mockingusers           | Genera 50 usuarios falsos para pruebas    |
| GET    | /mockingpets            | Genera 10 mascotas falsas para pruebas    |
| POST   | /generateData           | Genera datos falsos de usuarios y mascotas|

