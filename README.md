Backend Sea Resort
¡Bienvenido al backend de Sea Resort! Este proyecto es una API robusta y escalable construida con Node.js y Express.js, diseñada para gestionar los servicios y la información de un resort. Utiliza una base de datos MongoDB para un almacenamiento de datos flexible y eficiente.

🚀 Características Principales
Autenticación de Usuarios: Gestión de usuarios y sesiones seguras.

Gestión de Habitaciones: Funcionalidades CRUD (Crear, Leer, Actualizar, Borrar) para las habitaciones del resort.

Conexión a MongoDB: Conexión y gestión de la base de datos a través de Mongoose.


Configuración Flexible: Utiliza archivos .env para la gestión de variables de entorno, facilitando la configuración en diferentes entornos (desarrollo, producción, etc.).


Servidor de Archivos: Sirve archivos estáticos y subidas de imágenes para el proyecto.

Logging de Solicitudes: Uso de morgan para el registro de solicitudes HTTP.

🛠️ Tecnologías y Dependencias
Node.js: Entorno de ejecución de JavaScript.

Express.js: Framework de servidor web.

Mongoose: Modelado de objetos para MongoDB.

dotenv: Carga de variables de entorno desde un archivo .env.

cors: Permite solicitudes de recursos de origen cruzado.

bcrypt / bcryptjs: Librerías para encriptación de contraseñas.

jsonwebtoken: Implementa tokens de autenticación (JWT).

morgan: Middleware de registro de solicitudes HTTP.

cookie-parser: Analiza las cookies adjuntas a la solicitud.

multer: Middleware para el manejo de multipart/form-data, utilizado para subir archivos.

nodemailer: Envío de correos electrónicos.

nodemon: Herramienta que monitorea cambios en el código y reinicia el servidor automáticamente durante el desarrollo.

⚙️ Configuración e Instalación
Prerrequisitos
Asegúrate de tener instalados los siguientes componentes:

Node.js (versión recomendada: 18 o superior)

npm (incluido con Node.js)

MongoDB (servidor local o acceso a una instancia remota)

Pasos de Instalación
Clona el repositorio en tu máquina local.

Navega al directorio del proyecto.

Instala las dependencias del proyecto:

Bash

npm install
Crea un archivo .env en la raíz del proyecto. Puedes usar el archivo 

.env.example como plantilla.

Configura las variables de entorno en tu archivo .env. Las siguientes variables son necesarias:


PORT: Puerto del servidor (ej: 4002).


FRONTEND_URL: URL de tu frontend para la configuración de CORS (ej: http://localhost:5173).


MONGODB_URI: URI de conexión a tu base de datos MongoDB (ej: mongodb://localhost:27017/Searesort).


SECRET_KEY_TOKEN: Una clave secreta para la generación de tokens JWT.


NODE_ENV: Entorno de la aplicación (development o production).

Variables para el envío de correos electrónicos (

MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS, MAIL_FROM).

▶️ Ejecución del Proyecto
Para iniciar el servidor, utiliza uno de los siguientes comandos:

Modo de Desarrollo:

Bash

npm run dev
Este comando utiliza nodemon para reiniciar automáticamente el servidor cada vez que se detectan cambios en los archivos. El servidor se ejecutará en el puerto especificado en tu archivo .env (o el puerto 3000 si no se especifica).

Modo de Producción:

Bash

npm start
Este comando inicia la aplicación en un entorno de producción utilizando Node.js.

📂 Estructura del Proyecto
app.js: Archivo principal de configuración de la aplicación Express. Aquí se configuran los middlewares y las rutas.

db.js: Contiene la lógica para la conexión a la base de datos MongoDB con Mongoose.

index.js: El punto de entrada de la aplicación. Aquí se inicia el servidor y se establece la conexión a la base de datos.

package.json: Archivo que gestiona las dependencias y scripts del proyecto.


.env: Archivo que almacena las variables de entorno (ignorado por Git).


.env.example: Un archivo de ejemplo para las variables de entorno requeridas.


.gitignore: Listado de archivos y directorios que Git debe ignorar.

🤝 Contribuciones
Las contribuciones son bienvenidas. Siéntete libre de abrir un pull request o un issue en el repositorio.

✍️ Autores

Nelson Juarez Rivas

Natividad Rodriguez

Lucia Gallardo

Santiago Nieva

José Perez

📄 Licencia
Este proyecto está bajo la licencia ISC.